'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const stateDynamic=require('../dist/state-dynamic-verbs.js');

test('State & Dynamic Verbs: every lesson is complete, reachable and gradeable',()=>{
  assert.equal(stateDynamic.data.lessons.length,16);
  assert.equal(stateDynamic.data.lessons.reduce((n,l)=>n+l.practice.length,0),64);
  const ids=new Set(stateDynamic.data.lessons.map(l=>l.id));
  assert.equal(ids.size,16);
  const overview=stateDynamic.renderOverview();
  for(const lesson of stateDynamic.data.lessons){
    assert(overview.includes(`href="#/grammars/state-dynamic-verbs/${lesson.id}"`));
    assert(ids.has(lesson.contrast.id),lesson.id+' contrast');
    assert(lesson.sources.every(key=>stateDynamic.data.sources[key]?.url.startsWith('https://')));
    assert(lesson.definition.length>=2&&lesson.uses.length>=3&&lesson.rules.length>=3);
    assert.deepEqual(lesson.forms.map(f=>f[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    assert.equal(lesson.practice.length,4);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    assert.equal(stateDynamic.grade(lesson.id,answers).correct,4,lesson.id);
    const html=stateDynamic.renderLesson(lesson.id);
    assert(!html.includes('undefined'),lesson.id);
    for(const part of ['definition','uses','structures','rules','contrast','errors','practice'])assert(html.includes(`id="vt-${part}"`));
    const htmlIds=[...html.matchAll(/\\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(htmlIds).size,htmlIds.length,lesson.id+' duplicate IDs');
    assert(html.includes('data-vt-rate="0.65"'));
  }
});

test('State & Dynamic Verbs: common learner errors are rejected',()=>{
  const fixtures=[
    ['state-vs-dynamic','I understand the question.','I am understanding the question.'],
    ['think-state-action','I am thinking about moving.','I think about moving right now.'],
    ['have-state-action','We are having dinner.','We have dinner right now.'],
    ['be-state-action','You are being unfair.','You being unfair.'],
    ['measure-weigh','He is measuring the wall.','He measures the wall right now.']
  ];
  for(const [id,good,bad] of fixtures){
    const lesson=stateDynamic.data.lessons.find(l=>l.id===id);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    answers[3]=good;assert.equal(stateDynamic.grade(id,answers).correct,4,id);
    answers[3]=bad;assert.equal(stateDynamic.grade(id,answers).correct,3,id);
  }
});

test('State & Dynamic Verbs scripts are wired before main script',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
  assert(html.indexOf('state-dynamic-verbs-data.js')>=0);
  assert(html.indexOf('state-dynamic-verbs.js')>html.indexOf('state-dynamic-verbs-data.js'));
  assert(html.indexOf('state-dynamic-verbs.js')<html.indexOf('src="script.js"'));
  const publicFiles=require('../server/public-files.cjs');
  assert(publicFiles.includes('state-dynamic-verbs-data.js'));
  assert(publicFiles.includes('state-dynamic-verbs.js'));
  const script=fs.readFileSync(path.join(__dirname,'../dist/script.js'),'utf8');
  assert(script.includes('createEnglishStateDynamic'));
  assert(script.includes("ui.detail==='state-dynamic-verbs'"));
  assert(script.includes("globalThis.EnglishStateDynamic.data.lessons.length+' lecciones'"));
});

test('State & Dynamic Verbs overview teaches meaning before labels',()=>{
  const html=stateDynamic.renderOverview();
  assert(html.includes('state no significa “permanente”'));
  assert(html.includes('I think it is good.'));
  assert(html.includes('I am thinking about it.'));
  assert(html.includes('I am knowing'));
});
