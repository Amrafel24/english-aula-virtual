'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const passive=require('../dist/passive-voice.js');
const tenses=require('../dist/verb-tenses.js');

test('Passive Voice: every lesson is complete, reachable and has a valid answer key',()=>{
  assert.equal(passive.data.lessons.length,16);
  const ids=new Set(passive.data.lessons.map(l=>l.id));
  assert.equal(ids.size,16);
  const overview=passive.renderOverview();
  for(const lesson of passive.data.lessons){
    assert(overview.includes(`href="#/grammars/passive-voice/${lesson.id}"`));
    assert(ids.has(lesson.contrast.id));
    assert(lesson.sources.every(key=>passive.data.sources[key]?.url.startsWith('https://')));
    assert(lesson.definition.length>=2&&lesson.uses.length>=3&&lesson.rules.length>=3);
    assert(lesson.uses.every(row=>row.length===4&&row.every(Boolean)));
    assert.deepEqual(lesson.forms.map(f=>f[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    assert(lesson.forms.every(row=>row.length===4&&row.every(Boolean)));
    if(lesson.activeId)assert(tenses.data.lessons.some(l=>l.id===lesson.activeId));
    const html=passive.renderLesson(lesson.id);
    assert(!html.includes('undefined'));
    for(const part of ['definition','uses','structures','rules','contrast','errors','practice']){
      assert(html.includes(`id="vt-${part}"`),lesson.id+' missing '+part);
    }
    const htmlIds=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(htmlIds).size,htmlIds.length,lesson.id+' duplicate IDs');
    assert.equal(lesson.practice.length,4);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    assert.equal(passive.grade(lesson.id,answers).correct,4,lesson.id);
    assert(html.includes('data-vt-rate="0.65"'));
  }
  assert(passive.renderLesson('missing').includes('Volver a Passive Voice'));
});

test('Written practice accepts equivalent typography and contractions, rejecting incorrect grammar',()=>{
  const fixtures=[
    ['present-simple',' THE SHIRTS AREN’T WASHED HERE!!! ','The shirts is not washed here.'],
    ['present-continuous','Is the car being repaired?','Is the car been repaired?'],
    ['present-perfect',"The homework hasn't been checked.",'The homework has not checked.'],
    ['future-perfect',"The report won't have been completed by Friday.",'The report will not has been completed by Friday.'],
    ['get-passive',"Luis didn't get invited.",'Luis did not got invited.'],
    ['reporting-passives','He is believed to live here.','He is believed live here.']
  ];
  for(const [id,correct,incorrect] of fixtures){
    const answers=passive.data.lessons.find(l=>l.id===id).practice.map(q=>q.choices?q.answer:q.answers[0]);
    answers[3]=correct;assert.equal(passive.grade(id,answers).correct,4,id);
    answers[3]=incorrect;const result=passive.grade(id,answers);
    assert.equal(result.correct,3,id);
    assert(result.results[3].explanation&&result.results[3].expected);
  }
});

test('Missing answers and learner input cannot produce a false score or inject markup',()=>{
  const result=passive.grade('present-simple',[' ',99,'word','?!']);
  assert.equal(result.answered,0);assert.equal(result.correct,0);
  assert.throws(()=>passive.grade('missing'),/no encontrada/);
  const html=passive.renderLesson('present-simple',undefined,{answers:[0,1,2,'<img src=x onerror=alert(1)>']});
  assert(!html.includes('<img'));assert(html.includes('&lt;img'));
  assert.notStrictEqual(passive.data,tenses.data);
  assert(tenses.renderLesson('present-simple').includes('GRAMMARS / VERB TENSES /'));
  assert(passive.renderLesson('present-simple').includes('GRAMMARS / PASSIVE VOICE /'));
});

test('Node serves all Passive Voice scripts with the expected content and MIME type',async t=>{
  const directory=path.join(__dirname,'../dist');
  const server=require('../servidor.js').createApp(directory);
  t.after(()=>server.close());
  for(const file of ['passive-voice-data.js','passive-voice.js'])await new Promise((resolve,reject)=>{
    const headers={};let status=200;
    const response={
      setHeader(k,v){headers[k]=v;},
      writeHead(code,h={}){status=code;Object.assign(headers,h);},
      end(body){try{
        assert.equal(status,200);assert.match(headers['Content-Type'],/text\/javascript/);
        assert.deepEqual(body,fs.readFileSync(path.join(directory,file)));resolve();
      }catch(error){reject(error);}}
    };
    server.emit('request',{url:'/'+file,method:'GET',headers:{}},response);
  });
  const html=fs.readFileSync(path.join(directory,'index.html'),'utf8');
  assert(html.indexOf('verb-tenses.js')<html.indexOf('passive-voice.js'));
  assert(html.indexOf('passive-voice.js')<html.indexOf('src="script.js"'));
});
