'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const tenses=require('../dist/verb-tenses.js');

test('Tiempos: doce lecciones, going to y referencias navegables sin secciones vacías',()=>{
  const expected=['present-simple','present-continuous','present-perfect','present-perfect-continuous','past-simple','past-continuous','past-perfect','past-perfect-continuous','future-simple','future-continuous','future-perfect','future-perfect-continuous','be-going-to'];
  assert.deepEqual(tenses.data.lessons.map(l=>l.id),expected);
  assert.equal(tenses.data.lessons.filter(l=>l.group!=='extra').length,12);
  const overview=tenses.renderOverview();
  for(const lesson of tenses.data.lessons){
    assert(overview.includes('href="#/grammars/verb-tenses/'+lesson.id+'"'));
    assert(expected.includes(lesson.contrast.id));
    assert(lesson.sources.every(key=>tenses.data.sources[key]?.url.startsWith('https://')));
    assert(lesson.definition.length>=2&&lesson.uses.length>=3&&lesson.rules.length>=3);
    assert.deepEqual(lesson.forms.map(form=>form[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    const html=tenses.renderLesson(lesson.id);
    for(const section of ['definition','uses','structures','rules','contrast','errors','practice'])assert(html.includes(`id="vt-${section}"`));
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,lesson.id+' tiene IDs duplicados');
    assert(!html.includes('undefined'));
    assert(html.includes('data-vt-rate="0.65"'));
    assert.equal(lesson.practice.length,4);
  }
  assert(tenses.renderLesson('unknown').includes('Lección no encontrada'));
});

test('Corrección: tercera persona, negación y contracciones con escritura flexible',()=>{
  const result=tenses.grade('present-simple',['1','2','1','  SHE DOESN’T WORK ON SUNDAYS!!!  ']);
  assert.equal(result.correct,4);
  assert.equal(result.answered,4);
  assert.equal(tenses.grade('present-simple',[1,2,1,'She does not works on Sundays.']).correct,3);
  assert.equal(tenses.grade('present-simple',[1,2,1,'She does not work on Sundays']).correct,4);
});

test('Corrección: preguntas, pasados y auxiliares perfectos',()=>{
  assert.equal(tenses.grade('past-simple',[2,1,1,'She did not watch the movie.']).correct,4);
  assert.equal(tenses.grade('past-perfect',[1,2,1,'Had she finished?']).correct,4);
  assert.equal(tenses.grade('future-perfect',[1,2,1,'They won’t have finished.']).correct,4);
  assert.equal(tenses.grade('future-perfect-continuous',[2,1,1,'Will they have been studying?']).correct,4);
  assert.equal(tenses.grade('be-going-to',[1,2,1,"He's not going to study."]).correct,4);
  const error=tenses.grade('past-simple',[2,1,1,'She did not watched the movie.']).results[3];
  assert.equal(error.correct,false);
  assert.match(error.expected,/did not watch/);
  assert.match(error.explanation,/sin -ed/);
});

test('Corrección: preguntas incompletas no se convierten en respuestas acertadas',()=>{
  const missing=tenses.grade('future-continuous',[]);
  assert.equal(missing.answered,0);assert.equal(missing.correct,0);
  const invalid=tenses.grade('present-simple',[' ',99,'word','?!']);
  assert.equal(invalid.answered,0);assert.equal(invalid.correct,0);
  assert.throws(()=>tenses.grade('unknown',[]),/no encontrada/);
  const html=tenses.renderLesson('present-simple',undefined,{answers:[1,2,1,'<img src=x onerror=alert(1)>']});
  assert(!html.includes('<img'));
  assert(html.includes('&lt;img'));
});

test('Navegación: enlaces directos conservan la tercera parte de la ruta',()=>{
  const script=fs.readFileSync(path.join(__dirname,'../dist/script.js'),'utf8');
  const start=script.indexOf('  function navigate() {');
  const end=script.indexOf('  function showDialog(',start);
  const context={location:{hash:'#/grammars/verb-tenses/past-perfect'},ui:{},views:new Set(['inicio','grammars','diccionario']),matchMedia:()=>({matches:false}),render(){},window:{scrollTo(){}}};
  vm.createContext(context);vm.runInContext(script.slice(start,end),context);
  context.navigate();assert.equal(context.ui.view,'grammars');assert.equal(context.ui.detail,'verb-tenses');assert.equal(context.ui.lesson,'past-perfect');
  context.location.hash='#/diccionario';context.navigate();assert.equal(context.ui.view,'diccionario');assert.equal(context.ui.lesson,'');
  context.location.hash='#/grammars/verb-tenses';context.navigate();assert.equal(context.ui.lesson,'');
});

test('Node: entrega datos, interfaz y estilos de Verb Tenses',async t=>{
  const server=require('../servidor.js').createApp(path.join(__dirname,'../dist'));
  t.after(()=>server.close());
  for(const file of ['verb-tenses-data.js','verb-tenses.js','verb-tenses.css'])await new Promise((resolve,reject)=>{
    const headers={};let status=200;
    const response={setHeader(k,v){headers[k]=v;},writeHead(code,h={}){status=code;Object.assign(headers,h);},end(body){try{assert.equal(status,200);assert.match(headers['Content-Type'],file.endsWith('.css')?/text\/css/:/text\/javascript/);assert.deepEqual(body,fs.readFileSync(path.join(__dirname,'../dist',file)));resolve();}catch(e){reject(e);}}};
    server.emit('request',{url:'/'+file,method:'GET',headers:{}},response);
  });
});
