'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const full=require('../dist/full-verbs.js');

test('Full Verbs: every lesson is complete, reachable and gradeable',()=>{
  assert.equal(full.data.lessons.length,17);
  assert.equal(full.data.lessons.reduce((n,l)=>n+l.practice.length,0),68);
  const ids=new Set(full.data.lessons.map(l=>l.id));
  assert.equal(ids.size,17);
  const overview=full.renderOverview();
  for(const lesson of full.data.lessons){
    assert(overview.includes(`href="#/grammars/full-verbs/${lesson.id}"`));
    assert(ids.has(lesson.contrast.id),lesson.id+' contrast');
    assert(lesson.sources.every(key=>full.data.sources[key]?.url.startsWith('https://')));
    assert(lesson.definition.length>=2&&lesson.uses.length>=3&&lesson.rules.length>=3);
    assert.deepEqual(lesson.forms.map(f=>f[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    assert.equal(lesson.practice.length,4);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    assert.equal(full.grade(lesson.id,answers).correct,4,lesson.id);
    const html=full.renderLesson(lesson.id);
    assert(!html.includes('undefined'),lesson.id);
    for(const part of ['definition','uses','structures','rules','contrast','errors','practice'])assert(html.includes(`id="vt-${part}"`));
    const htmlIds=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(htmlIds).size,htmlIds.length,lesson.id+' duplicate IDs');
    assert(html.includes('data-vt-rate="0.65"'));
  }
});

test('Full Verbs: common learner errors are rejected',()=>{
  const fixtures=[
    ['main-verbs','She can study tonight.','She can studies tonight.'],
    ['third-person-s','Maria has two sisters.','Maria have two sisters.'],
    ['irregular-verbs','Did they come early?','Did they came early?'],
    ['past-participle','She has taken the bus.','She has took the bus.'],
    ['phrasal-verbs','Pick it up, please.','Pick up it, please.']
  ];
  for(const [id,good,bad] of fixtures){
    const lesson=full.data.lessons.find(l=>l.id===id);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    answers[3]=good;assert.equal(full.grade(id,answers).correct,4,id);
    answers[3]=bad;assert.equal(full.grade(id,answers).correct,3,id);
  }
});

test('Full Verbs scripts are wired before main script',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
  assert(html.indexOf('full-verbs-data.js')>=0);
  assert(html.indexOf('full-verbs.js')>html.indexOf('full-verbs-data.js'));
  assert(html.indexOf('full-verbs.js')<html.indexOf('src="script.js"'));
  const publicFiles=require('../server/public-files.cjs');
  assert(publicFiles.includes('full-verbs-data.js'));
  assert(publicFiles.includes('full-verbs.js'));
  assert(publicFiles.includes('auxiliary-verbs-data.js'));
  assert(publicFiles.includes('auxiliary-verbs.js'));
  const script=fs.readFileSync(path.join(__dirname,'../dist/script.js'),'utf8');
  assert(script.includes('createEnglishFullVerbs'));
  assert(script.includes("ui.detail==='full-verbs'"));
  assert(script.includes("globalThis.EnglishFullVerbs.data.lessons.length+' lecciones'"));
});
