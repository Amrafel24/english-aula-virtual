
'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./compound-sentences-data.js'):root.ENGLISH_COMPOUND_SENTENCES;
  const groups=[["foundations", "Fundamentos", "Reconoce cláusulas independientes y cómo se combinan."], ["coordination", "Coordinadores", "Domina FANBOYS y el significado de cada relación."], ["punctuation", "Puntuación", "Usa comas, punto y coma y adverbios conjuntivos correctamente."], ["errors", "Errores frecuentes", "Evita comma splices y run-ons."], ["advanced", "Construcciones avanzadas", "Trabaja paralelismo, correlativos y coordinación frente a subordinación."]];
  const course=root.createEnglishGrammarCourse(data,{
    title:"Compound Sentences",baseRoute:'#/grammars/compound-sentences',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Pistas y patrones útiles',
    markerCaution:"Los coordinadores expresan relaciones distintas. No los intercambies solo porque todos “unen” oraciones.",
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses compound-sentences"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Compound Sentences</h1><p>Aprende a unir ideas completas con coordinación, puntuación y conectores adecuados sin crear comma splices ni run-ons.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Ruta recomendada:</strong> empieza por la primera lección y avanza por los bloques. Cada tema mantiene la misma estructura de las secciones anteriores: definición, usos, estructuras, ejemplos bilingües con audio, reglas, comparación, errores frecuentes y cuatro actividades autocorregibles.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar</summary><div><p><strong>Primero identifica las cláusulas.</strong> Si ambos lados tienen sujeto + verbo y forman ideas completas, estás trabajando con cláusulas independientes.</p><p>Después elige si quieres coordinarlas como iguales o subordinar una de ellas.</p></div></details>
        ${groups.map(([id,name,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="compound-sentences-family-${id}"><div class="vt-family-heading"><div><h2 id="compound-sentences-family-${id}">${name}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
      </section>`;
    }
  });
  root.EnglishCompoundSentences=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishCompoundSentences=host=>course.createController(host);
})(globalThis);
