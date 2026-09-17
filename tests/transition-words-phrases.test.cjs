
'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const course=require('../dist/transition-words-phrases.js');

test('transition-words-phrases: lessons are complete, reachable and gradeable',()=>{
  assert.equal(course.data.lessons.length,15);
  assert.equal(course.data.lessons.reduce((n,l)=>n+l.practice.length,0),60);
  const ids=new Set(course.data.lessons.map(l=>l.id)); assert.equal(ids.size,15);
  const overview=course.renderOverview();
  for(const l of course.data.lessons){
    assert(overview.includes(`href="#/grammars/transition-words-phrases/${l.id}"`));
    assert(ids.has(l.contrast.id),l.id+' contrast');
    assert(l.sources.every(k=>course.data.sources[k]?.url.startsWith('https://')));
    assert(l.definition.length>=2&&l.uses.length>=3&&l.rules.length>=3);
    assert.deepEqual(l.forms.map(f=>f[0]),['Afirmativa','Negativa','Pregunta','Pregunta con WH']);
    assert.equal(l.practice.length,4);
    const answers=l.practice.map(q=>q.choices?q.answer:q.answers[0]);
    assert.equal(course.grade(l.id,answers).correct,4,l.id);
    const html=course.renderLesson(l.id); assert(!html.includes('undefined'),l.id);
    for(const part of ['definition','uses','structures','rules','contrast','errors','practice'])assert(html.includes(`id="vt-${part}"`));
    assert(html.includes('data-vt-rate="0.65"'));
  }
});

test('transition-words-phrases: scripts are wired before main script',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8');
  assert(html.indexOf('transition-words-phrases-data.js')>=0);
  assert(html.indexOf('transition-words-phrases.js')>html.indexOf('transition-words-phrases-data.js'));
  assert(html.indexOf('transition-words-phrases.js')<html.indexOf('src="script.js"'));
  const publicFiles=require('../server/public-files.cjs');
  assert(publicFiles.includes('transition-words-phrases-data.js')); assert(publicFiles.includes('transition-words-phrases.js'));
  const script=fs.readFileSync(path.join(__dirname,'../dist/script.js'),'utf8');
  assert(script.includes('createEnglishTransitionWords')); assert(script.includes("ui.detail==='transition-words-phrases'"));
  assert(script.includes('globalThis.EnglishTransitionWords.data.lessons.length'));
});
