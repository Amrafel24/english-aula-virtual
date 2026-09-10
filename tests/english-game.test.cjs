'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const data=require('../dist/english-data.js');
const Runner=require('../dist/english-game-engine.js');
function random(seed=23){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
function create(categoryId='jobs',width=1000){return Runner.createGame({categories:data.categories,categoryId,width,random:random()});}
function run(game,wanted,rate=60,stopAfterHit=false){
  const events=[];
  for(let frame=0;frame<rate*140&&game.state.phase==='running';frame++){
    const p=game.state.player;
    const next=game.state.words.find(w=>!w.resolved&&w.correct===wanted&&w.x>p.x+98&&w.x<p.x+158);
    if(next&&p.grounded)game.jump();
    events.push(...game.step(1/rate));
    if(stopAfterHit&&events.some(e=>e.item))break;
  }
  return events;
}
test('todos los vocabularios de la página son jugables y no penalizan palabras compartidas',()=>{
  assert.equal(data.categories.length,26);
  assert.equal(data.categories.reduce((n,c)=>n+c.words.length,0),1040);
  for(const category of data.categories){
    const {targets,distractors}=Runner.makePools(data.categories,category.id);
    const keys=new Set(targets.map(w=>Runner.normalize(w.en)));
    assert(targets.length>=10);assert(distractors.length>0);
    for(const word of distractors)assert(!keys.has(Runner.normalize(word.en)),`${category.name}: ${word.en}`);
  }
});
test('diez saltos acertados ganan en móvil y escritorio, a distintas tasas de cuadros',()=>{
  for(const width of [500,1000])for(const rate of [30,60,120]){
    const game=create('jobs',width),events=run(game,true,rate);
    assert.equal(game.state.phase,'won',`${width}px / ${rate}fps`);
    assert.equal(game.state.score,10);assert.equal(game.state.strikes,0);
    assert.equal(events.filter(e=>e.type==='won').length,1);
    assert.equal(new Set(game.state.history.map(w=>w.en)).size,10);
    const before=JSON.stringify(game.state);game.jump();game.step(1);
    assert.equal(JSON.stringify(game.state),before,'La victoria detiene la partida.');
  }
});
test('tocar tres palabras incorrectas pierde, sin perder antes del tercer strike',()=>{
  const game=create('casa');
  for(let count=1;count<=3;count++){
    run(game,false,60,true);assert.equal(game.state.strikes,count);
    assert.equal(game.state.phase,count===3?'lost':'running');
  }
  assert.equal(game.state.score,0);assert.equal(game.state.words.filter(w=>w.resolved&&!w.correct).length,1);
});
test('una palabra solo cuenta una vez durante el contacto y no hay doble salto',()=>{
  const game=create();run(game,true,60,true);assert.equal(game.state.score,1);
  assert.equal(game.jump(),false);
  for(let i=0;i<20;i++)game.step(1/120);
  assert.equal(game.state.score,1);
});
test('dejar pasar palabras no resta puntos ni suma strikes',()=>{
  const game=create();for(let i=0;i<60*50;i++)game.step(1/60);
  assert.equal(game.state.score,0);assert.equal(game.state.strikes,0);assert.equal(game.state.phase,'running');
});
test('la pausa congela la física y el reinicio comienza desde cero',()=>{
  const game=create();game.jump();game.step(.1);game.pause();
  const before=JSON.stringify(game.state);game.step(8);assert.equal(game.jump(),false);
  assert.equal(JSON.stringify(game.state),before);assert.equal(game.resume(),true);game.step(.1);
  assert.notEqual(JSON.stringify(game.state),before);
  const next=create();assert.equal(next.state.score,0);assert.equal(next.state.strikes,0);assert.equal(next.state.time,0);
});
test('Medium y Hard están bloqueados y la velocidad no cambia durante Easy',()=>{
  for(const difficulty of ['medium','hard'])assert.throws(()=>Runner.createGame({categories:data.categories,categoryId:'jobs',difficulty}),/coming soon/);
  const game=create(),first=game.state.words[0],x=first.x;
  game.step(.1);assert(Math.abs((x-first.x)-Runner.RULES.speed*.1)<.001);
  assert.equal(Runner.RULES.strikes,3);assert.equal(Runner.RULES.goal,10);
});
test('el contenido anterior se conserva exactamente al compartir los datos',()=>{
  const previous=cp.execFileSync('git',['show','42dfbd75298256166fee217eeaf6df3df3c01107:dist/script.js'],{cwd:root,encoding:'utf8',maxBuffer:2e6});
  const sandbox={module:{exports:{}}};vm.runInNewContext(previous,sandbox);
  assert.equal(JSON.stringify(data),JSON.stringify(sandbox.module.exports.data));
  assert.equal(JSON.stringify(require('../dist/script.js').data),JSON.stringify(data));
});
test('los scripts clásicos comparten los datos sin require en el navegador',()=>{
  const sandbox={};vm.createContext(sandbox);
  for(const file of ['english-data.js','script.js','english-game-engine.js'])vm.runInContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),sandbox);
  assert.equal(sandbox.ENGLISH_DATA.categories.length,26);assert.equal(sandbox.EnglishRunner.RULES.goal,10);
});
test('el servidor opcional entrega la página y todos los archivos nuevos con sus tipos',async()=>{
  const server=require('../servidor.js').createApp(path.join(root,'dist'));
  const expected={'english-game.html':'text/html','english-game.css':'text/css','english-game.js':'text/javascript','english-game-engine.js':'text/javascript','english-data.js':'text/javascript','english-mascot.png':'image/png','match-pairs.js':'text/javascript','match-pairs.css':'text/css'};
  for(const [file,type] of Object.entries(expected))await new Promise((resolve,reject)=>{
    const headers={};let status=200;
    const response={setHeader(k,v){headers[k]=v;},writeHead(code,h={}){status=code;Object.assign(headers,h);},end(body){try{assert.equal(status,200);assert(headers['Content-Type'].startsWith(type));assert.deepEqual(body,fs.readFileSync(path.join(root,'dist',file)));resolve();}catch(e){reject(e);}}};
    server.emit('request',{url:'/'+file,method:'GET',headers:{}},response);
  });
  server.close();
});
