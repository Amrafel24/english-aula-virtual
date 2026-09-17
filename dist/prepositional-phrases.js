
'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./prepositional-phrases-data.js'):root.ENGLISH_PREPOSITIONAL_PHRASES;
  const groups=[["foundations", "Fundamentos", "Comprende la anatomía de la frase preposicional y qué puede servir de complemento."], ["time", "Tiempo", "Domina relaciones temporales frecuentes y sus contrastes."], ["place", "Lugar y movimiento", "Expresa posición, cercanía, dirección y relaciones espaciales."], ["function", "Función y significado", "Distingue compañía, instrumento, medio, causa y propósito."], ["patterns", "Patrones léxicos", "Aprende combinaciones con adjetivos, verbos y registros formales."]];
  const course=root.createEnglishGrammarCourse(data,{
    title:"Prepositional Phrases",baseRoute:'#/grammars/prepositional-phrases',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Pistas y patrones útiles',
    markerCaution:"Las preposiciones tienen muchos usos idiomáticos. Estas pistas ayudan a reconocer patrones, pero las combinaciones nuevas deben aprenderse en contexto.",
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses prepositional-phrases"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Prepositional Phrases</h1><p>Aprende a expresar tiempo, lugar, movimiento, causa, medio y otras relaciones con frases preposicionales completas.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Ruta recomendada:</strong> empieza por la primera lección y avanza por los bloques. Cada tema mantiene la misma estructura de las secciones anteriores: definición, usos, estructuras, ejemplos bilingües con audio, reglas, comparación, errores frecuentes y cuatro actividades autocorregibles.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar</summary><div><p><strong>Una preposición no se aprende sola.</strong> Estudia la combinación completa y observa el complemento: <span lang="en">in the room</span>, <span lang="en">with her</span>, <span lang="en">before leaving</span>.</p><p>Cuando dudes, piensa primero en la relación que quieres expresar y después comprueba la combinación en contexto.</p></div></details>
        ${groups.map(([id,name,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="prepositional-phrases-family-${id}"><div class="vt-family-heading"><div><h2 id="prepositional-phrases-family-${id}">${name}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
      </section>`;
    }
  });
  root.EnglishPrepositionalPhrases=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishPrepositionalPhrases=host=>course.createController(host);
})(globalThis);
