/* English game: reglas y física independientes de la pantalla. Sin dependencias. */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.EnglishRunner = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const RULES = Object.freeze({goal:10, strikes:3, speed:175, gravity:1350, jumpSpeed:590,
    height:440, ground:354, sprite:116, wordY:126, wordHeight:54, interval:2.65});
  const normalize = value => String(value).normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
  function unique(words) {
    const used=new Set();
    return words.filter(word=>{const key=normalize(word.en);if(!key||used.has(key))return false;used.add(key);return true;});
  }
  function shuffled(items, random) {
    const result=items.slice();
    for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  }
  function makePools(categories, categoryId) {
    const category=categories.find(c=>c.id===categoryId);
    if(!category)throw new Error('Elige un vocabulario válido.');
    const targets=unique(category.words), keys=new Set(targets.map(w=>normalize(w.en)));
    // Una palabra compartida con la categoría elegida nunca se usa como distractor.
    const distractors=unique(categories.filter(c=>c.id!==categoryId).flatMap(c=>c.words))
      .filter(word=>!keys.has(normalize(word.en)));
    if(targets.length<RULES.goal||!distractors.length)throw new Error('Este vocabulario no tiene suficientes palabras para jugar.');
    return {category,targets,distractors};
  }
  function createGame({categories,categoryId,difficulty='easy',width=1000,random=Math.random,measureWord}={}) {
    if(difficulty!=='easy')throw new Error('Medium y Hard: coming soon.');
    const pools=makePools(categories,categoryId);
    const player={x:76,y:RULES.ground-RULES.sprite,vy:0,grounded:true};
    const state={phase:'running',category:pools.category,difficulty,score:0,strikes:0,
      time:0,width:Math.max(450,width),words:[],player,history:[]};
    let targetDeck=[],otherDeck=[],kinds=[],serial=0,nextSpawn=RULES.interval;
    function take(correct) {
      if(correct){if(!targetDeck.length)targetDeck=shuffled(pools.targets,random);return targetDeck.pop();}
      if(!otherDeck.length)otherDeck=shuffled(pools.distractors,random);
      return otherDeck.pop();
    }
    function spawn(first=false) {
      if(!kinds.length)kinds=shuffled([true,true,false],random);
      const correct=first?true:kinds.pop(), word=take(correct);
      const measured=measureWord?measureWord(word.en):word.en.length*14;
      state.words.push({id:++serial,word,correct,x:first?Math.max(state.width*.65,player.x+300):state.width+32,
        y:RULES.wordY,width:Math.max(108,Math.min(320,measured+36)),height:RULES.wordHeight,resolved:false,hitAt:0});
    }
    function jump() {
      if(state.phase!=='running'||!player.grounded)return false;
      player.vy=-RULES.jumpSpeed;player.grounded=false;return true;
    }
    function collide(word) {
      return !player.grounded && player.x+98>word.x && player.x+22<word.x+word.width
        && player.y+14<word.y+word.height && player.y+100>word.y;
    }
    function step(delta) {
      const events=[];
      if(state.phase!=='running'||!Number.isFinite(delta)||delta<=0)return events;
      // Pasos pequeños evitan atravesar palabras incluso en una pantalla lenta.
      let remaining=Math.min(delta,.1);
      while(remaining>0&&state.phase==='running') {
        const dt=Math.min(remaining,1/120);remaining-=dt;state.time+=dt;
        if(!player.grounded){player.vy+=RULES.gravity*dt;player.y+=player.vy*dt;
          if(player.y>=RULES.ground-RULES.sprite){player.y=RULES.ground-RULES.sprite;player.vy=0;player.grounded=true;}}
        nextSpawn-=dt;if(nextSpawn<=0){spawn();nextSpawn+=RULES.interval;}
        for(const item of state.words){
          item.x-=RULES.speed*dt;
          if(item.resolved||!collide(item))continue;
          item.resolved=true;item.hitAt=state.time;
          if(item.correct)state.score++;else state.strikes++;
          const event={type:item.correct?'correct':'wrong',item,score:state.score,strikes:state.strikes};
          state.history.push({en:item.word.en,es:item.word.es,correct:item.correct});events.push(event);
          if(state.score===RULES.goal){state.phase='won';events.push({type:'won'});break;}
          if(state.strikes===RULES.strikes){state.phase='lost';events.push({type:'lost'});break;}
        }
        state.words=state.words.filter(word=>word.x+word.width>-24);
      }
      return events;
    }
    function pause(){if(state.phase==='running'){state.phase='paused';return true;}return false;}
    function resume(){if(state.phase==='paused'){state.phase='running';return true;}return false;}
    function resize(newWidth){if(Number.isFinite(newWidth))state.width=Math.max(450,newWidth);}
    spawn(true);
    return {state,pools,jump,step,pause,resume,resize};
  }
  return {RULES,normalize,makePools,createGame};
});
