/* Match the Pairs: importado del juego proporcionado por el usuario. */
'use strict';
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory;
  else root.createMatchPairs = factory;
})(typeof globalThis !== 'undefined' ? globalThis : this, function ({
  data: D, esc, link, action, render, isActive,
  document = globalThis.document, window = globalThis.window, timers = globalThis, random = Math.random
}) {
  const $ = selector => document.querySelector(selector);
  const setTimeout = (callback, delay) => timers.setTimeout(callback, delay);
  const clearTimeout = handle => timers.clearTimeout(handle);
  let matchPairsGame = null, matchPairsSound = true, feedbackTimer = null;
  function shuffleMatchItems(items) {
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy;
  }
  function createMatchPairsGame() {
    const categories=shuffleMatchItems(D.categories),usedEn=new Set(),usedEs=new Set(),pairs=[];
    const key=value=>String(value).normalize('NFKC').trim().toLocaleLowerCase();
    for(const category of categories){
      const candidates=shuffleMatchItems(category.words);
      const word=candidates.find(item=>!usedEn.has(key(item.en))&&!usedEs.has(key(item.es)));
      if(!word)continue;
      const index=pairs.length;usedEn.add(key(word.en));usedEs.add(key(word.es));
      pairs.push({pairId:`pair-${index}-${category.id}-${word.id||index}`,categoryId:category.id,categoryName:category.name,en:word.en,es:word.es});
      if(pairs.length===10)break;
    }
    if(pairs.length!==10)throw new Error('Se necesitan 10 categorías con palabras distintas para jugar.');
    const cards=shuffleMatchItems(pairs.flatMap(pair=>[
      {...pair,cardId:`${pair.pairId}-en`,side:'en',text:pair.en},
      {...pair,cardId:`${pair.pairId}-es`,side:'es',text:pair.es}
    ])).map((card,index)=>({...card,index,flipped:false,matched:false}));
    return {cards,movesLeft:20,movesUsed:0,matches:0,streak:0,bestStreak:0,firstIndex:null,secondIndex:null,locked:false,finished:false,won:false,timer:null,audioContext:null};
  }
  function ensureMatchPairsGame() { if(!matchPairsGame)matchPairsGame=createMatchPairsGame(); return matchPairsGame; }
  function clearMatchPairsTimer(){if(matchPairsGame?.timer){clearTimeout(matchPairsGame.timer);matchPairsGame.timer=null;}}
  function leaveMatchPairs(){
    clearMatchPairsTimer();clearTimeout(feedbackTimer);feedbackTimer=null;
    const game=matchPairsGame;if(!game)return;
    if(game.secondIndex!==null){
      for(const index of [game.firstIndex,game.secondIndex])if(index!==null&&!game.cards[index].matched)game.cards[index].flipped=false;
      game.firstIndex=game.secondIndex=null;
    }
    if(game.matches===10||game.movesLeft===0){game.finished=true;game.won=game.matches===10;}
    game.locked=game.finished;
  }
  function scheduleMatchFinish(game,won){
    game.locked=true;
    game.timer=setTimeout(()=>{
      if(matchPairsGame!==game)return;
      if(!isActive()){leaveMatchPairs();return;}
      finishMatchPairs(won);
    },650);
  }
  function matchPairsTone(kind='flip') {
    if(!matchPairsSound)return;
    try{
      const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;
      const game=ensureMatchPairsGame(),ctx=game.audioContext||new AudioContext();game.audioContext=ctx;if(ctx.state==='suspended')void ctx.resume().catch(()=>{});
      const now=ctx.currentTime,notes=kind==='match'?[523.25,659.25,783.99]:kind==='wrong'?[220,164.81]:kind==='win'?[523.25,659.25,783.99,1046.5]:kind==='lose'?[196,164.81,130.81]:[420];
      notes.forEach((frequency,i)=>{const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=kind==='wrong'||kind==='lose'?'sawtooth':kind==='flip'?'triangle':'sine';osc.frequency.setValueAtTime(frequency,now+i*.07);gain.gain.setValueAtTime(.0001,now+i*.07);gain.gain.exponentialRampToValueAtTime(kind==='flip'?.035:.105,now+i*.07+.01);gain.gain.exponentialRampToValueAtTime(.0001,now+i*.07+(kind==='flip'?.06:.13));osc.connect(gain);gain.connect(ctx.destination);osc.start(now+i*.07);osc.stop(now+i*.07+(kind==='flip'?.08:.16));});
    }catch{}
  }
  function matchCardMarkup(card) {
    return `<button type="button" class="match-tile ${card.flipped?'is-flipped':''} ${card.matched?'is-matched':''}" data-action="match-card" data-index="${card.index}" aria-label="${card.flipped||card.matched?esc(card.text)+', '+(card.side==='en'?'inglés':'español'):'Ficha oculta '+(card.index+1)}" ${card.matched||matchPairsGame?.finished?'disabled':''}><span class="match-tile-inner" aria-hidden="true"><span class="match-tile-face match-tile-back"><span class="match-question">?</span><small>ENGLISH</small></span><span class="match-tile-face match-tile-front"><span class="match-lang">${card.side.toUpperCase()}</span><strong lang="${card.side==='en'?'en':'es'}">${esc(card.text)}</strong><small>${esc(card.categoryName)}</small></span></span></button>`;
  }
  function matchPairsPage() {
    const game=ensureMatchPairsGame();
    const progress=game.matches*10;
    return `<div class="back-link">${link('Volver a Juegos','juegos','text-link','arrow-left')}</div><section class="match-title-zone"><div><span class="match-kicker">MEMORY VOCABULARY CHALLENGE</span><h1>Match the Pairs</h1><p>Encuentra cada palabra en inglés y su traducción al español antes de agotar tus movimientos.</p></div><div class="match-title-actions">${action(matchPairsSound?'Sonido ON':'Sonido OFF','match-sound',`aria-pressed="${matchPairsSound}"`,`outline-button ${matchPairsSound?'':'muted'}`,'volume-2')}${action('Nueva partida','match-new','','primary-button','rotate-ccw')}</div></section><section class="match-shell"><div class="match-hud"><article><span>Movimientos</span><strong id="match-moves">${game.movesLeft}</strong><small>restantes de 20</small></article><article><span>Parejas</span><strong id="match-score">${game.matches}<b>/10</b></strong><small>encontradas</small></article><article><span>Racha</span><strong id="match-streak">${game.streak?`×${game.streak}`:'—'}</strong><small>parejas seguidas</small></article><article><span>Tablero</span><strong>4 × 5</strong><small>20 fichas</small></article></div><div class="match-progress-head"><span>Progreso de la misión</span><b id="match-progress-text">${game.matches} / 10</b></div><div class="match-progress-bar" role="progressbar" aria-label="Parejas encontradas" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${game.matches}"><span id="match-progress-fill" style="width:${progress}%"></span></div><div class="match-board-wrap"><div class="match-board-top"><div><span class="match-live-dot"></span><b>${game.finished?(game.won?'COMPLETADO':'GAME OVER'):'PARTIDA ACTIVA'}</b></div><small>Un movimiento = revelar dos fichas</small></div><div id="match-board" class="match-board ${game.finished?'is-finished':''}" aria-label="Tablero Match the Pairs">${game.cards.map(matchCardMarkup).join('')}</div><div id="match-feedback" class="match-feedback" aria-live="polite"></div>${game.finished?`<div role="status" aria-live="polite" class="match-result ${game.won?'win':'lose'}"><span>${game.won?'🏆':'⌛'}</span><h2>${game.won?'¡Todas las parejas!':'Sin movimientos'}</h2><p>${game.won?`Completaste las 10 parejas usando <strong>${game.movesUsed}</strong> movimientos. Mejor racha: <strong>×${Math.max(1,game.bestStreak)}</strong>.`:`Encontraste <strong>${game.matches} de 10</strong> parejas. Mezcla las fichas e inténtalo otra vez.`}</p>${action('JUGAR DE NUEVO','match-new','','primary-button','rotate-ccw')}</div>`:''}</div><div class="match-tip-strip"><span>💡</span><p><strong>Consejo:</strong> recuerda tanto la palabra como su posición. Las 10 parejas proceden de categorías distintas del vocabulario de English.</p></div></section>`;
  }
  function updateMatchPairsHud() {
    const game=matchPairsGame;if(!game)return;
    const moves=$('#match-moves');if(moves)moves.textContent=String(game.movesLeft);
    const score=$('#match-score');if(score)score.innerHTML=`${game.matches}<b>/10</b>`;
    const streak=$('#match-streak');if(streak)streak.textContent=game.streak?`×${game.streak}`:'—';
    const progress=$('#match-progress-text');if(progress)progress.textContent=`${game.matches} / 10`;
    const fill=$('#match-progress-fill');if(fill)fill.style.width=`${game.matches*10}%`;
    document.querySelector('.match-progress-bar')?.setAttribute('aria-valuenow',String(game.matches));
  }
  function showMatchFeedback(kind,heading,text) {
    const box=$('#match-feedback');if(!box)return;
    clearTimeout(feedbackTimer);
    box.className=`match-feedback show ${kind}`;box.innerHTML=`<strong>${esc(heading)}</strong><span>${esc(text)}</span>`;
    box.getAnimations?.().forEach(animation=>{animation.currentTime=0;});
    feedbackTimer=setTimeout(()=>{if(box.isConnected)box.className='match-feedback';feedbackTimer=null;},760);
  }
  function finishMatchPairs(won) {
    const game=matchPairsGame;if(!game||game.finished)return;
    clearMatchPairsTimer();game.finished=true;game.won=won;game.locked=true;matchPairsTone(won?'win':'lose');
    render();
    document.querySelector('.match-result button')?.focus({preventScroll:true});
  }
  function flipMatchCard(index) {
    const game=matchPairsGame;if(!isActive()||!game||game.finished||game.locked||game.movesLeft<=0)return;
    const card=game.cards[index];if(!card||card.matched||card.flipped)return;
    card.flipped=true;matchPairsTone('flip');
    const tile=document.querySelector(`.match-tile[data-index="${index}"]`);tile?.classList.add('is-flipped');tile?.setAttribute('aria-label',`${card.text}, ${card.side==='en'?'inglés':'español'}`);
    if(game.firstIndex===null){game.firstIndex=index;return;}
    game.secondIndex=index;game.locked=true;game.movesUsed++;game.movesLeft=Math.max(0,20-game.movesUsed);
    const first=game.cards[game.firstIndex],second=game.cards[game.secondIndex],isMatch=first.pairId===second.pairId&&first.side!==second.side;
    updateMatchPairsHud();
    if(isMatch){
      first.matched=second.matched=true;game.matches++;game.streak++;game.bestStreak=Math.max(game.bestStreak,game.streak);matchPairsTone('match');
      document.querySelector(`.match-tile[data-index="${first.index}"]`)?.classList.add('is-matched');
      document.querySelector(`.match-tile[data-index="${second.index}"]`)?.classList.add('is-matched');
      for(const item of [first,second]){const node=document.querySelector(`.match-tile[data-index="${item.index}"]`);if(node)node.disabled=true;}
      showMatchFeedback('good','MATCH!',game.streak>=2?`Racha ×${game.streak}`:'Pareja encontrada');
      game.firstIndex=game.secondIndex=null;game.locked=false;updateMatchPairsHud();
      if(game.matches>=10){scheduleMatchFinish(game,true);return;}
      if(game.movesLeft<=0)scheduleMatchFinish(game,false);
      return;
    }
    game.streak=0;matchPairsTone('wrong');showMatchFeedback('bad','NO MATCH','Memoriza las posiciones');updateMatchPairsHud();
    game.timer=setTimeout(()=>{
      if(!matchPairsGame||matchPairsGame!==game)return;
      first.flipped=second.flipped=false;
      document.querySelector(`.match-tile[data-index="${first.index}"]`)?.classList.remove('is-flipped');
      document.querySelector(`.match-tile[data-index="${second.index}"]`)?.classList.remove('is-flipped');
      for(const item of [first,second])document.querySelector(`.match-tile[data-index="${item.index}"]`)?.setAttribute('aria-label',`Ficha oculta ${item.index+1}`);
      game.firstIndex=game.secondIndex=null;game.locked=false;game.timer=null;
      if(game.movesLeft<=0)finishMatchPairs(false);
    },850);
  }
  function newMatchPairsGame() {
    clearMatchPairsTimer();clearTimeout(feedbackTimer);feedbackTimer=null;
    try{const audio=matchPairsGame?.audioContext;if(audio&&audio.state!=='closed')void audio.close().catch(()=>{});}catch{}
    matchPairsGame=createMatchPairsGame();render();
    document.querySelector('.match-tile')?.focus({preventScroll:true});
  }
  function toggleMatchPairsSound(button) {
    matchPairsSound=!matchPairsSound;button.textContent=matchPairsSound?'Sonido ON':'Sonido OFF';button.classList.toggle('muted',!matchPairsSound);
    button.setAttribute('aria-pressed',String(matchPairsSound));
    if(matchPairsSound&&matchPairsGame?.audioContext?.state==='suspended')void matchPairsGame.audioContext.resume().catch(()=>{});
  }
  return {
    page: matchPairsPage, flip: flipMatchCard, newGame: newMatchPairsGame,
    toggleSound: toggleMatchPairsSound, leave: leaveMatchPairs,
    get state() { return matchPairsGame; }
  };
});
