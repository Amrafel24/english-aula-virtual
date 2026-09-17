'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./state-dynamic-verbs-data.js'):root.ENGLISH_STATE_DYNAMIC;
  const groups=[
    ['foundations','Fundamentos','Entiende la diferencia esencial entre estado y acción antes de estudiar los grupos y excepciones.'],
    ['states','Familias de state verbs','Reconoce pensamientos, sentimientos, posesión y percepción que normalmente se expresan en formas simples.'],
    ['dynamic','Dynamic verbs en contexto','Usa acciones, eventos y procesos con simple o continuous según el enfoque.'],
    ['dual','Verbos con dos comportamientos','Observa cómo el significado transforma think, have, see, taste, be, measure y weigh.'],
    ['advanced','Uso flexible y énfasis','Aprende las excepciones reales sin convertirlas en una regla demasiado amplia.']
  ];
  const contrastTable=[
    ['I know the answer.','state','conocimiento'],
    ['I am writing an email.','dynamic','acción en progreso'],
    ['I think it is good.','state','opinión'],
    ['I am thinking about it.','dynamic','consideración activa'],
    ['The soup tastes good.','state/linking','propiedad percibida'],
    ['The chef is tasting the soup.','dynamic','acción deliberada']
  ];
  const flexibleTable=[
    ['have','I have a car.','I am having lunch.'],
    ['think','I think you are right.','I am thinking about moving.'],
    ['see','I see a bird.','I am seeing my doctor tomorrow.'],
    ['taste','It tastes sweet.','She is tasting it.'],
    ['be','He is rude.','He is being rude.']
  ];
  const course=root.createEnglishGrammarCourse(data,{
    title:'State & Dynamic Verbs',baseRoute:'#/grammars/state-dynamic-verbs',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Pistas de significado y contexto',
    markerCaution:'Las palabras de tiempo ayudan, pero no deciden por sí solas. Primero identifica qué significa el verbo en esa oración y si presenta un estado, una acción o un proceso.',
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses state-dynamic-verbs"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">State & Dynamic Verbs</h1><p>Distingue estados, acciones y verbos que cambian de comportamiento según su significado.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Empieza por State vs Dynamic Verbs.</strong> Después estudia simple vs continuous y las familias de state verbs. La parte más importante llega en los verbos de doble comportamiento: no memorices que una palabra “siempre” es stative o dynamic; aprende qué significa en cada contexto.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar: state no significa “permanente”</summary><div>
          <p><strong>State</strong> describe cómo es, qué sabe, qué siente, qué posee o cómo se percibe una situación. Un estado puede ser temporal: <span lang="en">I need help right now</span>. <strong>Dynamic</strong> describe una acción, evento o proceso y puede enfocarse como algo en desarrollo: <span lang="en">I am working right now</span>.</p>
          <div class="vt-table-wrap" role="region" aria-label="Contraste entre verbos de estado y dinámicos" tabindex="0"><table><thead><tr><th>Ejemplo</th><th>Lectura</th><th>Idea</th></tr></thead><tbody>${contrastTable.map(([en,type,note])=>`<tr><td lang="en">${esc(en)}</td><td>${esc(type)}</td><td>${esc(note)}</td></tr>`).join('')}</tbody></table></div>
          <p><strong>La prueba decisiva es el significado.</strong> Palabras como <span lang="en">now</span> no obligan a usar continuous: <span lang="en">I know it now</span> sigue siendo natural porque <span lang="en">know</span> expresa un estado.</p>
          <a class="text-link" href="#/grammars/verb-tenses">Repasar Verb Tenses ${icon('arrow-right')}</a><br><a class="text-link" href="#/grammars/full-verbs">Repasar Full Verbs ${icon('arrow-right')}</a>
        </div></details>
        ${groups.map(([id,title,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="sd-family-${id}"><div class="vt-family-heading"><div><h2 id="sd-family-${id}">${title}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
        <details class="vt-foundations"><summary>Tabla rápida: verbos que cambian según el significado</summary><div><p>Estos contrastes resumen el principio central de la subsección. El mismo verbo puede comportarse de manera diferente si cambia lo que significa.</p><div class="vt-table-wrap" role="region" aria-label="Verbos state y dynamic según significado" tabindex="0"><table><thead><tr><th>Verbo</th><th>State / simple</th><th>Dynamic / continuous posible</th></tr></thead><tbody>${flexibleTable.map(([verb,state,dynamic])=>`<tr><th scope="row" lang="en">${esc(verb)}</th><td lang="en">${esc(state)}</td><td lang="en">${esc(dynamic)}</td></tr>`).join('')}</tbody></table></div><p>La sección <strong>Flexible & Emphatic Progressive Uses</strong> explica por qué algunas formas progresivas son posibles y por qué otras, como <span lang="en">I am knowing</span>, siguen sin ser naturales en el uso estándar.</p></div></details>
      </section>`;
    }
  });
  root.EnglishStateDynamic=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishStateDynamic=host=>course.createController(host);
})(globalThis);
