'use strict';
(function(root){
  // Shared lesson layout and practice controller for the grammar courses.
  function createCourse(data,options={}) {
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups=options.groups||[['present','Presente','Lo habitual, lo que ocurre y lo que conecta con ahora.'],['past','Pasado','Hechos, procesos y relaciones entre momentos anteriores.'],['future','Futuro','Predicciones, procesos y metas vistas desde el futuro.'],['extra','Una construcción más','Completa tu base para expresar planes e intenciones.']];
  const byId=new Map(data.lessons.map(lesson=>[lesson.id,lesson]));
  const baseRoute=options.baseRoute||'#/grammars/verb-tenses';
  const courseTitle=options.title||'Verb Tenses';
  const indexLabel=options.indexLabel||'Todos los tiempos';
  const route=id=>baseRoute+(id?'/'+id:'');
  const normalizeAnswer=value=>String(value??'').normalize('NFC').toLowerCase().replace(/[‘’]/g,"'").replace(/\s+/g,' ').trim().replace(/[.!?]+$/,'').trim();
  function grade(lessonId,answers=[]) {
    const lesson=byId.get(lessonId);if(!lesson)throw new Error('Lección no encontrada.');
    const results=lesson.practice.map((question,i)=>{
      const value=answers[i];
      const answered=question.choices?value!==undefined&&value!==null&&String(value).trim()!==''&&Number.isInteger(Number(value))&&Number(value)>=0&&Number(value)<question.choices.length:normalizeAnswer(value).length>0;
      const correct=answered&&(question.choices?Number(value)===question.answer:question.answers.some(answer=>normalizeAnswer(answer)===normalizeAnswer(value)));
      return {answered,correct,expected:question.choices?question.choices[question.answer]:question.answers[0],explanation:question.explanation};
    });
    return {results,total:results.length,answered:results.filter(r=>r.answered).length,correct:results.filter(r=>r.correct).length};
  }
  const iconFallback=()=>'';
  function audioButtons(text,icon=iconFallback){
    return `<span class="vt-audio"><button type="button" data-vt-speak="${esc(text)}" data-vt-rate="0.85" aria-label="Escuchar: ${esc(text)}">${icon('volume-2')}<span>Escuchar</span></button><button type="button" data-vt-speak="${esc(text)}" data-vt-rate="0.65" aria-label="Escuchar más lento: ${esc(text)}">Lento</button></span>`;
  }
  function example(en,es,icon=iconFallback,note='') {
    return `<div class="vt-example"><span class="vt-label">Ejemplo</span><p lang="en" class="vt-english">${esc(en)}</p><p class="vt-translation">${esc(es)}</p>${note?`<p class="vt-example-note">${esc(note)}</p>`:''}${audioButtons(en,icon)}</div>`;
  }
  function renderOverview(icon=iconFallback) {
    if(options.overview)return options.overview({data,groups,route,esc,icon});
    return `<section class="verb-tenses"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
      <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Verb Tenses</h1><p>Entiende cuándo ocurre una acción y cómo quieres presentarla.</p></div><span class="vt-count">12 tiempos + be going to</span></div>
      <div class="vt-orientation"><p><strong>Empieza por Present Simple</strong> si estás construyendo tu base. Cada lección combina explicación, ejemplos con audio y cuatro actividades con corrección.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
      <details class="vt-foundations"><summary>Antes de empezar: cómo leer las estructuras</summary><div><p><strong>Sujeto</strong> es quien realiza la acción o de quien hablamos: I, you, Ana, the students. El <strong>complemento</strong> añade información: qué, dónde o cuándo.</p><div class="vt-table-wrap" role="region" aria-label="Formas del verbo" tabindex="0"><table><thead><tr><th>Forma</th><th>Qué significa</th><th lang="en">work</th><th lang="en">go</th></tr></thead><tbody><tr><th>Base</th><td>Verbo sin terminaciones</td><td lang="en">work</td><td lang="en">go</td></tr><tr><th>Pasado</th><td>Forma del pasado simple</td><td lang="en">worked</td><td lang="en">went</td></tr><tr><th>Participio</th><td>Forma usada después de have en los perfectos</td><td lang="en">worked</td><td lang="en">gone</td></tr><tr><th>Forma -ing</th><td>Forma usada con be en los continuos</td><td lang="en">working</td><td lang="en">going</td></tr></tbody></table></div><p><strong>Simple</strong> presenta hechos o situaciones; <strong>continuous</strong> enfoca el proceso; <strong>perfect</strong> conecta con un punto de referencia; <strong>perfect continuous</strong> combina conexión y proceso. Perfect no significa «sin errores» ni obliga siempre a que la situación haya terminado.</p><p><strong>WH</strong> representa palabras como what, where, when, why, who y how. Las fórmulas de las lecciones muestran preguntas habituales; las preguntas por el sujeto, como Who called?, pueden tener otro orden.</p><p>El esquema de doce es una organización didáctica de formas y aspectos. El inglés distingue morfológicamente presente y pasado y usa varias construcciones para expresar futuro. En todas estas lecciones trabajamos principalmente la voz activa.</p><a class="text-link" href="#/verbos">Consultar verbos regulares e irregulares ${icon('arrow-right')}</a></div></details>
      ${groups.map(([id,title,description])=>`<section class="vt-family" aria-labelledby="vt-family-${id}"><div class="vt-family-heading"><div><h2 id="vt-family-${id}">${title}</h2><p>${description}</p></div><span>${id==='extra'?'Complemento':'4 tiempos'}</span></div><div class="vt-grid">${data.lessons.filter(lesson=>lesson.group===id).map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`).join('')}
    </section>`;
  }
  function quiz(lesson,attempt={answers:[]}) {
    return `<form id="vt-practice-form" novalidate><p>Completa las cuatro actividades y comprueba tus respuestas. En las respuestas escritas, las mayúsculas y la puntuación final no afectan la corrección.</p>${lesson.practice.map((q,i)=>`<fieldset class="vt-question" data-vt-question="${i}"><legend><span>${i+1}</span> ${esc(q.prompt)}</legend>${q.choices?`<div class="vt-options">${q.choices.map((option,j)=>`<label><input type="radio" name="vt-answer-${i}" value="${j}" data-vt-answer="${i}" ${String(attempt.answers[i])===String(j)?'checked':''} aria-describedby="vt-feedback-${i}"><span lang="${q.choiceLang||'en'}">${esc(option)}</span></label>`).join('')}</div>`:`<label class="vt-written-label" for="vt-answer-${i}">Tu respuesta en inglés</label><input id="vt-answer-${i}" class="text-input" name="vt-answer-${i}" data-vt-answer="${i}" type="text" lang="en" autocomplete="off" spellcheck="false" maxlength="220" value="${esc(attempt.answers[i]||'')}" aria-describedby="vt-feedback-${i}">`}<div id="vt-feedback-${i}" class="vt-feedback" aria-live="polite"></div></fieldset>`).join('')}<div class="vt-quiz-actions"><button class="primary-button" type="submit">Comprobar respuestas</button><button class="outline-button" type="button" data-vt-reset>Reiniciar práctica</button></div><p class="vt-score" data-vt-status role="status" aria-live="polite"></p><p class="vt-session-note">La práctica se conserva mientras mantengas esta página abierta.</p></form>`;
  }
  function renderLesson(id,icon=iconFallback,attempt={answers:[]}) {
    const lesson=byId.get(id);
    if(!lesson)return `<section class="verb-tenses"><div class="card empty-state"><h1>Lección no encontrada</h1><p>Elige una lección del índice.</p><a class="primary-button" href="${baseRoute}">Volver a ${esc(courseTitle)}</a></div></section>`;
    const at=data.lessons.indexOf(lesson),previous=data.lessons[at-1],next=data.lessons[at+1];
    const jumps=[['definition','Definición'],['uses','Usos'],['structures','Estructuras'],['rules','Claves'],['contrast','Comparación'],['errors','Errores'],['practice','Práctica']];
    return `<section class="verb-tenses" data-vt-lesson="${id}"><div class="vt-top-row"><a class="text-link" href="${baseRoute}">${icon('arrow-left')} ${esc(indexLabel)}</a><label for="vt-lesson-select">Cambiar de lección <select id="vt-lesson-select">${groups.map(([key,name])=>`<optgroup label="${name}">${data.lessons.filter(l=>l.group===key).map(l=>`<option value="${l.id}" ${l.id===id?'selected':''}>${esc(l.title)}</option>`).join('')}</optgroup>`).join('')}</select></label></div>
      <div class="page-heading vt-title"><div><div class="eyebrow">GRAMMARS / ${esc(courseTitle.toUpperCase())} / ${lesson.group==='extra'?'COMPLEMENTO':groups.find(g=>g[0]===lesson.group)[1].toUpperCase()}</div><h1 lang="en">${esc(lesson.title)}</h1><p>${esc(lesson.spanish)} · ${esc(lesson.summary)}</p></div></div>
      <nav class="vt-jump-nav" aria-label="Partes de la lección">${jumps.map(([key,label])=>`<button type="button" data-vt-jump="vt-${key}">${label}</button>`).join('')}</nav>
      <div class="vt-panels"><section id="vt-definition" class="vt-panel vt-definition" aria-labelledby="vt-definition-title"><h2 id="vt-definition-title" tabindex="-1">${icon('book-open')} Definición</h2>${lesson.definition.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="vt-time-idea"><h3>La idea en tres pasos</h3><ol>${lesson.timeline.map(label=>`<li>${esc(label)}</li>`).join('')}</ol></div></section>
      <section id="vt-uses" class="vt-panel" aria-labelledby="vt-uses-title"><h2 id="vt-uses-title" tabindex="-1">${icon('lightbulb')} Cuándo se usa</h2><div class="vt-uses">${lesson.uses.map(([name,detail,en,es],i)=>`<article><h3><span class="vt-use-number">${i+1}</span>${esc(name)}</h3><p>${esc(detail)}</p>${example(en,es,icon)}</article>`).join('')}</div></section>
      <section id="vt-structures" class="vt-panel vt-structures" aria-labelledby="vt-structures-title"><h2 id="vt-structures-title" tabindex="-1">${icon('layers')} Cómo se construye</h2><p>Observa el auxiliar, el orden de las palabras y la forma del verbo principal.</p><div class="vt-forms">${lesson.forms.map(([name,formula,en,es])=>`<article><h3>${esc(name)}</h3><p class="vt-formula">${esc(formula)}</p>${example(en,es,icon)}</article>`).join('')}</div><h3 class="vt-subheading">${esc(lesson.agreementTitle||"Según el sujeto")}</h3><dl class="vt-agreement">${lesson.agreement.map(([subject,form])=>`<div><dt>${esc(subject)}</dt><dd lang="en">${esc(form)}</dd></div>`).join('')}</dl><div class="vt-short-answers"><h3>Respuestas cortas</h3>${example(lesson.shortAnswers[0],'',icon)}<div class="vt-answer-pair"><p><strong>Sí</strong><span lang="en">${esc(lesson.shortAnswers[1])}</span></p><p><strong>No</strong><span lang="en">${esc(lesson.shortAnswers[2])}</span></p></div><p>${esc(lesson.shortAnswers[3])}</p></div></section>
      <section id="vt-rules" class="vt-panel vt-tips" aria-labelledby="vt-rules-title"><h2 id="vt-rules-title" tabindex="-1">${icon('info')} Claves para usarlo bien</h2><div class="vt-rules">${lesson.rules.map(([name,text])=>`<article><h3>${esc(name)}</h3><p>${esc(text)}</p></article>`).join('')}</div><h3 class="vt-subheading">${esc(options.markersTitle||"Expresiones que suelen acompañarlo")}</h3><dl class="vt-markers">${lesson.markers.map(([en,es])=>`<div><dt lang="en">${esc(en)}</dt><dd>${esc(es)}</dd></div>`).join('')}</dl><p class="vt-caution">${esc(options.markerCaution||"Estas expresiones son pistas, no reglas automáticas. Primero identifica el contexto y lo que quieres comunicar.")}</p>${lesson.activeId?`<a class="text-link" href="#/grammars/verb-tenses/${esc(lesson.activeId)}">Repasar este tiempo en Verb Tenses ${icon("arrow-right")}</a>`:""}</section>
      <section id="vt-contrast" class="vt-panel" aria-labelledby="vt-contrast-title"><h2 id="vt-contrast-title" tabindex="-1">${icon('git-compare')} ${esc(lesson.contrast.title)}</h2><div class="vt-comparison">${lesson.contrast.pairs.map(([en,es,note])=>example(en,es,icon,note)).join('')}</div><p>${esc(lesson.contrast.note)}</p><a class="text-link" href="${route(lesson.contrast.id)}">Repasar ${esc(byId.get(lesson.contrast.id)?.title||'la otra lección')} ${icon('arrow-right')}</a></section>
      <section id="vt-errors" class="vt-panel vt-errors" aria-labelledby="vt-errors-title"><h2 id="vt-errors-title" tabindex="-1">${icon('circle-alert')} Errores frecuentes</h2><p>Fíjate en las correcciones para expresar los significados de esta lección.</p>${lesson.mistakes.map(([wrong,right,why])=>`<article class="vt-mistake"><p class="vt-wrong"><strong>Revisar</strong><span lang="en">${esc(wrong)}</span></p><p class="vt-right"><strong>Corrección</strong><span lang="en">${esc(right)}</span></p><p>${esc(why)}</p>${audioButtons(right,icon)}</article>`).join('')}</section>
      <section id="vt-practice" class="vt-panel vt-practice" aria-labelledby="vt-practice-title"><h2 id="vt-practice-title" tabindex="-1">${icon('pencil-line')} Ponlo en práctica</h2><div data-vt-quiz>${quiz(lesson,attempt)}</div></section>
      <details class="vt-sources"><summary>Referencias para ampliar esta lección</summary><p>Explicaciones y ejercicios redactados para English. Puedes profundizar en estas referencias gramaticales:</p><ul>${lesson.sources.map(key=>`<li><a href="${esc(data.sources[key].url)}" target="_blank" rel="noopener noreferrer">${esc(data.sources[key].title)}</a></li>`).join('')}</ul></details>
      <nav class="vt-lesson-navigation" aria-label="Navegación entre lecciones">${previous?`<a class="outline-button" href="${route(previous.id)}">${icon('arrow-left')}<span><small>Anterior</small><span lang="en">${esc(previous.title)}</span></span></a>`:`<a class="outline-button" href="${baseRoute}">${esc(indexLabel)}</a>`}${next?`<a class="primary-button" href="${route(next.id)}"><span><small>Siguiente</small><span lang="en">${esc(next.title)}</span></span>${icon('arrow-right')}</a>`:`<a class="primary-button" href="${baseRoute}">Volver al índice ${icon('arrow-right')}</a>`}</nav></div></section>`;
  }
  function createController(host){
    const attempts=new Map();let element=null,currentId='';
    const currentAttempt=()=>{if(!attempts.has(currentId))attempts.set(currentId,{answers:[],result:null});return attempts.get(currentId);};
    function paintFeedback() {
      if(!element||!byId.has(currentId))return;
      const attempt=currentAttempt();
      byId.get(currentId).practice.forEach((q,i)=>{
        const result=attempt.result?.results[i];const field=element.querySelector(`[data-vt-question="${i}"]`);
        field.classList.toggle('is-correct',!!result?.correct);field.classList.toggle('is-incorrect',!!result&&!result.correct);
        const box=element.querySelector('#vt-feedback-'+i);
        box.innerHTML=result?`<strong>${result.correct?'Correcto':'Revisa esta respuesta'}</strong>${!result.correct?`<p>Respuesta: <span lang="${q.choiceLang||'en'}">${esc(result.expected)}</span></p>`:''}<p>${esc(result.explanation)}</p>`:'';
      });
      const status=element.querySelector('[data-vt-status]');
      status.textContent=attempt.result?`${attempt.result.correct} de ${attempt.result.total} respuestas correctas. ${attempt.result.correct===attempt.result.total?'¡Buen trabajo! Ya puedes continuar.':'Lee las explicaciones y vuelve a intentarlo.'}`:'';
    }
    function setAnswer(event){
      const input=event.target;
      if(!input.hasAttribute('data-vt-answer')||!byId.has(currentId))return;
      const i=Number(input.dataset.vtAnswer),attempt=currentAttempt();
      if(!Number.isInteger(i)||!byId.get(currentId).practice[i])return;
      attempt.answers[i]=input.value;attempt.result=null;paintFeedback();
    }
    function onClick(event){
      const button=event.target.closest('button');if(!button||!element?.contains(button))return;
      if(button.dataset.vtSpeak)host.speak(button.dataset.vtSpeak,Number(button.dataset.vtRate)||0.85);
      if(button.dataset.vtJump){
        const target=element.querySelector('#'+button.dataset.vtJump);if(!target)return;
        target.querySelector('h2')?.focus({preventScroll:true});
        target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
      }
      if(button.hasAttribute('data-vt-reset')&&byId.has(currentId)){
        attempts.set(currentId,{answers:[],result:null});
        element.querySelector('[data-vt-quiz]').innerHTML=quiz(byId.get(currentId),currentAttempt());
        element.querySelector('[data-vt-answer]')?.focus();
      }
    }
    function mount(container,lessonId=''){
      if(element?.isConnected&&element.parentElement===container&&currentId===lessonId)return;
      currentId=lessonId;
      container.innerHTML=lessonId?renderLesson(lessonId,host.icon,currentAttempt()):renderOverview(host.icon);
      element=container.querySelector('.verb-tenses');
      element.addEventListener('click',onClick);
      element.addEventListener('input',setAnswer);
      element.addEventListener('change',event=>{
        if(event.target.id==='vt-lesson-select'&&byId.has(event.target.value))root.location.hash=route(event.target.value);
        else setAnswer(event);
      });
      element.addEventListener('submit',event=>{
        if(event.target.id!=='vt-practice-form'||!byId.has(currentId))return;
        event.preventDefault();const attempt=currentAttempt(),result=grade(currentId,attempt.answers);
        if(result.answered<result.total){
          element.querySelector('[data-vt-status]').textContent='Completa las cuatro actividades antes de comprobar.';
          element.querySelector(`[data-vt-answer="${result.results.findIndex(r=>!r.answered)}"]`)?.focus();return;
        }
        attempt.result=result;paintFeedback();
      });
      if(lessonId&&byId.has(lessonId))paintFeedback();
    }
    function leave(){element=null;}
    return {mount,leave};
  }
  return {data,normalizeAnswer,grade,renderOverview,renderLesson,createController};
  }
  root.createEnglishGrammarCourse=createCourse;
  const data=typeof module!=='undefined'&&module.exports?require('./verb-tenses-data.js'):root.ENGLISH_TENSES;
  root.EnglishTenses=createCourse(data);
  if(typeof module!=='undefined'&&module.exports)module.exports=root.EnglishTenses;
  if(typeof document!=='undefined')root.createEnglishTenses=host=>root.EnglishTenses.createController(host);
})(globalThis);
