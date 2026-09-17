
'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./transition-words-phrases-data.js'):root.ENGLISH_TRANSITION_WORDS;
  const groups=[["foundations", "Fundamentos", "Comprende qué hacen las transiciones y qué no hacen."], ["relations", "Relaciones lógicas", "Adición, contraste, causa, ejemplo, comparación, concesión y alternativas."], ["organization", "Organización del discurso", "Secuencia, tiempo, énfasis y cierre."], ["mechanics", "Posición, puntuación y registro", "Usa transiciones con puntuación y nivel de formalidad adecuados."]];
  const course=root.createEnglishGrammarCourse(data,{
    title:"Transition Words and Phrases",baseRoute:'#/grammars/transition-words-phrases',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Pistas y patrones útiles',
    markerCaution:"Una transición correcta debe encajar en significado, estructura, puntuación y registro. No añadas conectores solo para hacer el texto “más formal”.",
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses transition-words-phrases"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Transition Words and Phrases</h1><p>Aprende a conectar ideas con claridad usando transiciones de adición, contraste, resultado, ejemplo, secuencia, resumen y otras relaciones discursivas.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Ruta recomendada:</strong> empieza por la primera lección y avanza por los bloques. Cada tema mantiene la misma estructura de las secciones anteriores: definición, usos, estructuras, ejemplos bilingües con audio, reglas, comparación, errores frecuentes y cuatro actividades autocorregibles.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar</summary><div><p><strong>No memorices una traducción aislada.</strong> Pregúntate qué relación existe entre las dos ideas: ¿suma, contraste, causa, ejemplo, secuencia o conclusión?</p><p>Después revisa la puntuación y el registro. <span lang="en">But</span> y <span lang="en">however</span> pueden expresar contraste, pero no se puntúan igual.</p></div></details>
        ${groups.map(([id,name,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="transition-words-phrases-family-${id}"><div class="vt-family-heading"><div><h2 id="transition-words-phrases-family-${id}">${name}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
      </section>`;
    }
  });
  root.EnglishTransitionWords=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishTransitionWords=host=>course.createController(host);
})(globalThis);
