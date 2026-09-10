/* Pantalla de English game: Canvas, controles, menú y sonidos. JavaScript puro. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const canvas=$('game-canvas'),ctx=canvas.getContext('2d'),menu=$('game-menu');
  const pauseDialog=$('pause-dialog'),resultDialog=$('result-dialog');
  const selector=$('category-select'),startButton=$('start-button');
  const D=globalThis.ENGLISH_DATA,Runner=globalThis.EnglishRunner;
  if(!ctx||!D?.categories?.length||!Runner){
    $('game-error').hidden=false;
    $('game-error').textContent='No se pudo cargar el juego. Conserva todos los archivos de English en la misma carpeta y vuelve a abrirlo.';
    return;
  }
  const R=Runner.RULES,mascot=new Image(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let game=null,worldWidth=1000,lastTime=0,frameId=0,resultTimer=0,ready=false;
  let muted=false,audioContext=null,particles=[];
  const FONT='600 28px system-ui, -apple-system, Segoe UI, sans-serif';
  function applyTheme(){
    try{
      const preference=JSON.parse(localStorage.getItem('english.pure.v1')||'{}');
      const theme=D.themes.find(t=>t.id===preference.palette)||D.themes[0];
      const root=document.documentElement;
      root.classList.toggle('dark',!!preference.dark);
      root.style.setProperty('--primary',theme.color);root.style.setProperty('--brand-deep',theme.deep);
      root.style.setProperty('--accent',`color-mix(in srgb, ${theme.color} 12%, var(--card))`);
    }catch{/* Se puede jugar sin almacenamiento. */}
  }
  function fitCanvas(){
    const rect=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.max(1,Math.round(rect.width*ratio));canvas.height=Math.max(1,Math.round(rect.height*ratio));
    worldWidth=Math.max(450,rect.width/Math.max(1,rect.height)*R.height);
    if(game)game.resize(worldWidth);
    draw();
  }
  function announce(message,kind=''){
    $('game-feedback').textContent=message;
    $('game-feedback').className=kind?'is-'+kind:'';
  }
  function updateScore(){
    const s=game?.state,score=s?.score||0,strikes=s?.strikes||0;
    $('score-value').textContent=score;$('score-progress').value=score;
    [...$('strike-marks').children].forEach((node,i)=>node.classList.toggle('is-strike',i<strikes));
    $('strike-marks').setAttribute('aria-label',`${strikes} de ${R.strikes} strikes`);
    if(s)$('category-label').textContent=s.category.name;
    const running=s?.phase==='running';
    $('jump-button').disabled=!running;$('pause-button').disabled=!running;
    $('game-state').textContent=running?'En carrera':s?.phase==='paused'?'En pausa':s?.phase==='won'?'¡Meta alcanzada!':s?.phase==='lost'?'Partida terminada':'Listo para jugar';
  }
  function unlockAudio(){
    if(muted)return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      if(!Audio){$('sound-button').textContent='Sonido no disponible';$('sound-button').disabled=true;return;}
      if(!audioContext)audioContext=new Audio();
      if(audioContext.state==='suspended')void audioContext.resume().catch(()=>{});
    }catch{audioContext=null;}
  }
  function sound(kind){
    if(muted||!audioContext||audioContext.state!=='running')return;
    try{
      const now=audioContext.currentTime;
      const notes=kind==='wrong'?[180]:kind==='win'?[523.25,659.25,783.99,1046.5]:kind==='jump'?[300]:[659.25,880];
      notes.forEach((frequency,i)=>{
        const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
        const at=now+i*.09,duration=kind==='wrong'?.28:kind==='jump'?.065:.13;
        oscillator.type=kind==='wrong'?'triangle':'sine';oscillator.frequency.setValueAtTime(frequency,at);
        if(kind==='wrong')oscillator.frequency.exponentialRampToValueAtTime(75,at+duration);
        if(kind==='jump')oscillator.frequency.exponentialRampToValueAtTime(500,at+duration);
        gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(kind==='jump'?.035:.11,at+.012);
        gain.gain.exponentialRampToValueAtTime(.0001,at+duration);
        oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(at);oscillator.stop(at+duration+.025);
        oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};
      });
    }catch{/* Los resultados visuales siguen disponibles si el audio se interrumpe. */}
  }
  function startGame(){
    if(!ready)return;
    clearTimeout(resultTimer);$('menu-error').hidden=true;
    try{
      ctx.font=FONT;
      game=Runner.createGame({categories:D.categories,categoryId:selector.value,difficulty:'easy',width:worldWidth,
        measureWord:text=>ctx.measureText(text).width});
      particles=[];lastTime=0;
      for(const dialog of [menu,pauseDialog,resultDialog])if(dialog.open)dialog.close();
      unlockAudio();updateScore();
      announce(`¡Vamos! Toca palabras de ${game.state.category.name}.`);
      canvas.focus({preventScroll:true});draw();
    }catch(error){$('menu-error').textContent=error.message;$('menu-error').hidden=false;}
  }
  function resumeGame(){
    if(!game||!game.resume())return;
    if(menu.open)menu.close();if(pauseDialog.open)pauseDialog.close();
    lastTime=0;updateScore();unlockAudio();canvas.focus({preventScroll:true});
  }
  function pauseGame(){
    if(!game||!game.pause())return;
    updateScore();if(!menu.open&&!resultDialog.open)pauseDialog.showModal();
  }
  function updateSelection(){
    const category=D.categories.find(c=>c.id===selector.value);
    if(!category)return;
    $('category-hint').textContent=`${category.words.length} palabras · ${category.words.slice(0,3).map(w=>w.en).join(' · ')}`;
    if(!game)$('category-label').textContent=category.name;
  }
  function openMenu(){
    clearTimeout(resultTimer);if(game)game.pause();
    if(pauseDialog.open)pauseDialog.close();if(resultDialog.open)resultDialog.close();
    $('menu-resume').hidden=game?.state.phase!=='paused';
    if(ready)startButton.textContent=game?'Empezar nueva partida':'Empezar a correr';
    updateSelection();updateScore();if(!menu.open)menu.showModal();
  }
  function jump(){
    if(menu.open||pauseDialog.open||resultDialog.open)return;
    unlockAudio();if(game?.jump())sound('jump');
  }
  function showResult(){
    const s=game?.state;if(!s||!['won','lost'].includes(s.phase)||menu.open)return;
    const won=s.phase==='won';
    resultDialog.classList.toggle('is-lost',!won);
    $('result-symbol').textContent=won?'✓':'×';
    $('result-kicker').textContent=won?'OBJETIVO COMPLETADO':'OTRA CARRERA, OTRA OPORTUNIDAD';
    $('result-title').textContent=won?'¡Diez palabras, una victoria!':'Esta vez no pudo ser';
    $('result-description').textContent=won?`Reconociste 10 palabras de ${s.category.name}. ¡Tu inglés sigue avanzando!`:`Acumulaste los 3 strikes. Llevabas ${s.score} de 10 aciertos en ${s.category.name}. Inténtalo otra vez.`;
    $('result-score').textContent=`${s.score} / ${R.goal}`;$('result-strikes').textContent=`${s.strikes} / ${R.strikes}`;
    resultDialog.showModal();if(won)sound('win');
  }
  function handleEvents(events){
    for(const event of events){
      if(event.type==='correct'||event.type==='wrong'){
        const correct=event.type==='correct',word=event.item.word;
        announce(`${correct?'✓ Correcto':'× Strike'} · ${word.en} — ${word.es}${correct?'':'. No pertenece a '+game.state.category.name+'.'}`,correct?'correct':'wrong');
        sound(event.type);updateScore();
        if(!reduced.matches)for(let i=0;i<12;i++)particles.push({x:game.state.player.x+65,y:event.item.y+30,
          vx:(Math.random()-.5)*170,vy:-80-Math.random()*130,age:0,color:correct?'#73efb8':'#ff7e96'});
      }
      if(event.type==='won'||event.type==='lost'){
        updateScore();clearTimeout(resultTimer);resultTimer=setTimeout(showResult,650);
      }
    }
  }
  function roundBox(x,y,width,height,radius,fill,stroke){
    ctx.beginPath();ctx.roundRect(x,y,width,height,radius);ctx.fillStyle=fill;ctx.fill();
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke();}
  }
  function drawWord(item){
    const color=!item.resolved?'#ffffff':item.correct?'#73efb8':'#ff7e96';
    const fill=!item.resolved?'#203d68':item.correct?'#164c43':'#5c283f';
    ctx.save();
    if(item.resolved){ctx.shadowColor=color;ctx.shadowBlur=15;}
    roundBox(item.x,item.y,item.width,item.height,13,fill,item.resolved?color:'#8eb4ea6b');
    ctx.shadowBlur=0;ctx.font=FONT;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=color;
    ctx.fillText(item.word.en,item.x+item.width/2,item.y+item.height/2+1,item.width-28);
    if(item.resolved){ctx.font='700 24px system-ui';ctx.fillText(item.correct?'✓':'×',item.x+item.width/2,item.y-18);}
    ctx.restore();
  }
  function drawCharacter(player,time,running){
    if(!ready)return;
    const airborne=!player.grounded;
    const bob=running&&!airborne&&!reduced.matches?Math.sin(time*20)*2.1:0;
    const tilt=airborne?-.065:running&&!reduced.matches?Math.sin(time*10)*.024:0;
    ctx.save();ctx.fillStyle='#060f274f';ctx.beginPath();
    ctx.ellipse(player.x+58,R.ground+4,airborne?24:36,5,0,0,Math.PI*2);ctx.fill();
    if(running&&!airborne&&!reduced.matches){
      ctx.strokeStyle='#b4d0ff50';ctx.lineWidth=2;
      for(let i=0;i<3;i++){const p=(time*1.8+i/3)%1;ctx.globalAlpha=1-p;ctx.beginPath();ctx.moveTo(player.x+28-p*52,R.ground-2-i*4);ctx.lineTo(player.x+13-p*52,R.ground-2-i*4);ctx.stroke();}
      ctx.globalAlpha=1;
    }
    ctx.translate(player.x+58,player.y+69+bob);ctx.rotate(tilt);
    ctx.drawImage(mascot,-58,-58,R.sprite,R.sprite);ctx.restore();
  }
  function draw(){
    if(!canvas.width||!canvas.height)return;
    ctx.setTransform(canvas.width/worldWidth,0,0,canvas.height/R.height,0,0);
    const sky=ctx.createLinearGradient(0,0,worldWidth,R.height);sky.addColorStop(0,'#12233e');sky.addColorStop(.6,'#224676');sky.addColorStop(1,'#315c8c');
    ctx.fillStyle=sky;ctx.fillRect(0,0,worldWidth,R.height);
    const time=game?.state.time||0,motion=reduced.matches?0:time;
    ctx.strokeStyle='#90b6ff0b';ctx.lineWidth=1;
    for(let x=-(motion*12%64);x<worldWidth;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,R.ground);ctx.stroke();}
    for(let y=24;y<R.ground;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(worldWidth,y);ctx.stroke();}
    ctx.fillStyle='#b9d5f370';
    for(let i=0;i<14;i++){const x=((i*163+45-motion*5)%worldWidth+worldWidth)%worldWidth;ctx.fillRect(x,28+(i*53)%66,2,2);}
    ctx.fillStyle='#101f36';ctx.fillRect(0,R.ground,worldWidth,R.height-R.ground);
    ctx.fillStyle='#9bc4f6';ctx.fillRect(0,R.ground,worldWidth,2);
    ctx.fillStyle='#2c4262';ctx.fillRect(0,R.ground+10,worldWidth,1);
    const offset=(time*R.speed)%100;
    ctx.fillStyle='#5d7da54d';for(let x=-offset;x<worldWidth;x+=100)ctx.fillRect(x,R.ground+38,38,3);
    ctx.strokeStyle='#45638422';for(let x=-offset*1.3;x<worldWidth;x+=120){ctx.beginPath();ctx.moveTo(x,R.ground+65);ctx.lineTo(x+65,R.height);ctx.stroke();}
    if(game){
      for(const item of game.state.words)drawWord(item);
      drawCharacter(game.state.player,time,game.state.phase==='running');
    }else{
      const category=D.categories.find(c=>c.id===selector.value)||D.categories[0];
      drawWord({x:worldWidth*.45,y:R.wordY,width:160,height:R.wordHeight,word:category.words[0],resolved:false});
      drawCharacter({x:76,y:R.ground-R.sprite,grounded:true},0,false);
    }
    for(const particle of particles){ctx.globalAlpha=Math.max(0,1-particle.age/.7);ctx.fillStyle=particle.color;ctx.fillRect(particle.x,particle.y,4,4);}
    ctx.globalAlpha=1;
  }
  function frame(timestamp){
    const dt=lastTime?Math.min((timestamp-lastTime)/1000,.1):0;lastTime=timestamp;
    if(game?.state.phase==='running'&&!document.hidden)handleEvents(game.step(dt));
    if(!menu.open&&!pauseDialog.open&&!resultDialog.open){
      for(const p of particles){p.age+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=260*dt;}
      particles=particles.filter(p=>p.age<.7);
    }
    draw();frameId=requestAnimationFrame(frame);
  }
  for(const category of D.categories){const option=document.createElement('option');option.value=category.id;option.textContent=category.name;selector.append(option);}
  applyTheme();updateSelection();fitCanvas();
  $('game-options').addEventListener('submit',event=>{event.preventDefault();startGame();});
  selector.addEventListener('change',()=>{updateSelection();draw();});
  $('pause-button').addEventListener('click',pauseGame);$('menu-button').addEventListener('click',openMenu);
  $('resume-button').addEventListener('click',resumeGame);$('menu-resume').addEventListener('click',resumeGame);
  $('pause-menu').addEventListener('click',openMenu);$('result-menu').addEventListener('click',openMenu);
  $('retry-button').addEventListener('click',startGame);
  $('jump-button').addEventListener('click',()=>{canvas.focus({preventScroll:true});jump();});
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0&&event.pointerType==='mouse')return;event.preventDefault();canvas.focus({preventScroll:true});jump();});
  $('sound-button').addEventListener('click',()=>{muted=!muted;$('sound-button').textContent=muted?'Sonido: silenciado':'Sonido: activado';$('sound-button').setAttribute('aria-pressed',String(!muted));if(!muted){unlockAudio();sound('correct');}});
  document.addEventListener('keydown',event=>{
    if(event.repeat||event.ctrlKey||event.altKey||event.metaKey)return;
    if(menu.open||pauseDialog.open||resultDialog.open)return;
    if(/^(INPUT|SELECT|TEXTAREA|BUTTON|A)$/.test(event.target.tagName))return;
    if(['Space','ArrowUp','KeyW'].includes(event.code)){event.preventDefault();jump();}
    else if(event.code==='KeyP'||event.code==='Escape'){event.preventDefault();pauseGame();}
  });
  menu.addEventListener('cancel',event=>{event.preventDefault();if(game?.state.phase==='paused')resumeGame();});
  pauseDialog.addEventListener('cancel',event=>{event.preventDefault();resumeGame();});
  resultDialog.addEventListener('cancel',event=>{event.preventDefault();openMenu();});
  document.addEventListener('visibilitychange',()=>{lastTime=0;if(document.hidden)pauseGame();});
  window.addEventListener('blur',pauseGame);
  window.addEventListener('resize',fitCanvas);
  window.addEventListener('storage',event=>{if(event.key==='english.pure.v1')applyTheme();});
  window.addEventListener('pagehide',()=>{pauseGame();cancelAnimationFrame(frameId);clearTimeout(resultTimer);if(audioContext?.state==='running')void audioContext.suspend().catch(()=>{});});
  window.addEventListener('pageshow',event=>{if(event.persisted){lastTime=0;cancelAnimationFrame(frameId);frameId=requestAnimationFrame(frame);}});
  mascot.onload=()=>{ready=true;startButton.disabled=false;startButton.textContent='Empezar a correr';draw();};
  mascot.onerror=()=>{$('menu-error').textContent='No se pudo cargar el personaje. Comprueba que english-mascot.png esté en la misma carpeta.';$('menu-error').hidden=false;startButton.textContent='No se pudo cargar el personaje';};
  mascot.src='english-mascot.png';
  openMenu();frameId=requestAnimationFrame(frame);
})();
