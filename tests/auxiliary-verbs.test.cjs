'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const auxiliary=require('../dist/auxiliary-verbs.js');

test('Auxiliary Verbs: every lesson is complete, reachable and gradeable',()=>{
  assert.equal(auxiliary.data.lessons.length,14);
  const ids=new Set(auxiliary.data.lessons.map(l=>l.id));
  assert.equal(ids.size,14);
  const overview=auxiliary.renderOverview();
  for(const lesson of auxiliary.data.lessons){
    assert(overview.includes(`href="#/grammars/auxiliary-verbs/${lesson.id}"`));
    assert(ids.has(lesson.contrast.id));
    assert(lesson.sources.every(key=>auxiliary.data.sources[key]?.url.startsWith('https://')));
    assert(lesson.definition.length>=2&&lesson.uses.length>=3&&lesson.rules.length>=3);
    assert.deepEqual(lesson.forms.map(f=>f[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    assert.equal(lesson.practice.length,4);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    assert.equal(auxiliary.grade(lesson.id,answers).correct,4,lesson.id);
    const html=auxiliary.renderLesson(lesson.id);
    assert(!html.includes('undefined'));
    for(const part of ['definition','uses','structures','rules','contrast','errors','practice'])assert(html.includes(`id="vt-${part}"`));
    const htmlIds=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(htmlIds).size,htmlIds.length,lesson.id+' duplicate IDs');
    assert(html.includes('data-vt-rate="0.65"'));
  }
});

test('Auxiliary Verbs: common learner errors are rejected',()=>{
  const fixtures=[
    ['do-auxiliary','Did Ana call you?','Did Ana called you?'],
    ['can-could','She can drive at night.','She can drives at night.'],
    ['must','She must finish today.','She must to finish today.'],
    ['modal-perfect','He could have gone earlier.','He could have went earlier.'],
    ['semi-modal-alternatives','She will be able to drive next year.','She will can drive next year.']
  ];
  for(const [id,good,bad] of fixtures){
    const lesson=auxiliary.data.lessons.find(l=>l.id===id);
    const answers=lesson.practice.map(q=>q.choices?q.answer:q.answers[0]);
    answers[3]=good;assert.equal(auxiliary.grade(id,answers).correct,4,id);
    answers[3]=bad;assert.equal(auxiliary.grade(id,answers).correct,3,id);
  }
});

test('Auxiliary Verbs scripts are wired before main script',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
  assert(html.indexOf('auxiliary-verbs-data.js')>=0);
  assert(html.indexOf('auxiliary-verbs.js')>html.indexOf('auxiliary-verbs-data.js'));
  assert(html.indexOf('auxiliary-verbs.js')<html.indexOf('src="script.js"'));
  const script=fs.readFileSync(path.join(__dirname,'../dist/script.js'),'utf8');
  assert(script.includes('createEnglishAuxiliary'));
  assert(script.includes("ui.detail==='auxiliary-verbs'"));
  assert(script.includes("globalThis.EnglishAuxiliary.data.lessons.length+' lecciones'"));
});
