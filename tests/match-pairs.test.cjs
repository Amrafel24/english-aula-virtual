'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const create=require('../dist/match-pairs.js');
const data=require('../dist/english-data.js');
function harness(seed=8){
  let active=true,serial=0,renders=0;
  const pending=new Map();
  const timers={setTimeout(fn){pending.set(++serial,fn);return serial;},clearTimeout(id){pending.delete(id);}};
  const api=create({data,esc:String,link:()=>'',action:()=>'',render(){renders++;},isActive:()=>active,
    document:{querySelector(){return null;}},window:{},timers,
    random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}});
  api.page();
  function flush(){const jobs=[...pending];pending.clear();for(const [,fn]of jobs)fn();}
  function mismatch(){const cards=api.state.cards.filter(c=>!c.matched);const a=cards[0],b=cards.find(c=>c.pairId!==a.pairId);api.flip(a.index);api.flip(b.index);}
  function pair(){const cards=api.state.cards.filter(c=>!c.matched),a=cards[0],b=cards.find(c=>c.pairId===a.pairId&&c.side!==a.side);api.flip(a.index);api.flip(b.index);}
  return {api,flush,mismatch,pair,pending,setActive(value){active=value;},get renders(){return renders;}};
}
test('se importan 20 fichas, 10 traducciones únicas y 10 categorías del catálogo compartido',()=>{
  for(let seed=1;seed<=20;seed++){
    const {api}=harness(seed),s=api.state;
    assert.equal(s.cards.length,20);assert.equal(s.movesLeft,20);
    const english=s.cards.filter(c=>c.side==='en'),spanish=s.cards.filter(c=>c.side==='es');
    assert.equal(english.length,10);assert.equal(spanish.length,10);
    assert.equal(new Set(english.map(c=>c.categoryId)).size,10);
    assert.equal(new Set(english.map(c=>c.text.toLowerCase())).size,10);
    assert.equal(new Set(spanish.map(c=>c.text.toLowerCase())).size,10);
    for(const card of english){
      const counterpart=spanish.find(c=>c.pairId===card.pairId);assert(counterpart);
      assert(data.categories.find(c=>c.id===card.categoryId).words.some(w=>w.en===card.text&&w.es===counterpart.text));
    }
    assert.equal((api.page().match(/class="match-tile /g)||[]).length,20);
  }
});
test('un movimiento son dos fichas distintas y se bloquea la tercera durante un fallo',()=>{
  const h=harness(),s=h.api.state;
  h.api.flip(-1);h.api.flip(0);h.api.flip(0);assert.equal(s.movesUsed,0);
  const other=s.cards.find(c=>c.pairId!==s.cards[0].pairId);h.api.flip(other.index);
  assert.equal(s.movesUsed,1);assert.equal(s.movesLeft,19);assert.equal(s.locked,true);
  const third=s.cards.find(c=>!c.flipped);h.api.flip(third.index);assert.equal(third.flipped,false);
  h.flush();assert.equal(s.locked,false);assert.equal(s.cards.filter(c=>c.flipped).length,0);
});
test('se gana al encontrar 10 parejas y las parejas ya resueltas no vuelven a contar',()=>{
  const h=harness();
  for(let n=1;n<=10;n++){h.pair();assert.equal(h.api.state.matches,n);const found=h.api.state.cards.find(c=>c.matched);h.api.flip(found.index);assert.equal(h.api.state.matches,n);}
  assert.equal(h.api.state.locked,true);h.flush();
  assert.equal(h.api.state.finished,true);assert.equal(h.api.state.won,true);
  assert.equal(h.api.state.movesUsed,10);assert.equal(h.api.state.bestStreak,10);
});
test('se pierde al agotar 20 movimientos y la racha se reinicia al fallar',()=>{
  const h=harness();h.pair();assert.equal(h.api.state.streak,1);
  for(let i=0;i<19;i++){h.mismatch();h.flush();}
  assert.equal(h.api.state.finished,true);assert.equal(h.api.state.won,false);
  assert.equal(h.api.state.movesLeft,0);assert.equal(h.api.state.matches,1);assert.equal(h.api.state.streak,0);
});
test('el acierto del movimiento 20 gana; un acierto incompleto en el 20 bloquea más jugadas',()=>{
  const win=harness();for(let i=0;i<10;i++){win.mismatch();win.flush();}
  for(let i=0;i<10;i++)win.pair();win.flush();
  assert.equal(win.api.state.won,true);assert.equal(win.api.state.movesUsed,20);
  const lose=harness();for(let i=0;i<19;i++){lose.mismatch();lose.flush();}
  lose.pair();assert.equal(lose.api.state.movesLeft,0);assert.equal(lose.api.state.locked,true);
  const next=lose.api.state.cards.find(c=>!c.matched);lose.api.flip(next.index);assert.equal(next.flipped,false);
  lose.flush();assert.equal(lose.api.state.won,false);assert.equal(lose.api.state.finished,true);
});
test('salir durante el retraso de un fallo permite volver sin un tablero bloqueado',()=>{
  const h=harness();h.mismatch();assert.equal(h.api.state.locked,true);
  h.setActive(false);h.api.leave();assert.equal(h.pending.size,0);assert.equal(h.api.state.locked,false);
  assert.equal(h.api.state.movesUsed,1);assert.equal(h.api.state.cards.filter(c=>c.flipped).length,0);
  h.setActive(true);h.api.page();h.pair();assert.equal(h.api.state.matches,1);
});
test('salir después de la última pareja conserva la victoria y reiniciar cancela tareas anteriores',()=>{
  const h=harness();for(let i=0;i<10;i++)h.pair();h.setActive(false);h.api.leave();
  assert.equal(h.api.state.won,true);assert.equal(h.api.state.finished,true);assert.equal(h.pending.size,0);
  h.setActive(true);h.api.newGame();h.mismatch();const old=h.api.state;h.api.newGame();h.flush();
  assert.notEqual(h.api.state,old);assert.equal(h.api.state.movesLeft,20);assert.equal(h.api.state.matches,0);assert.equal(h.api.state.locked,false);
});
