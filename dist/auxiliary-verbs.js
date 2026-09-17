'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./auxiliary-verbs-data.js'):root.ENGLISH_AUXILIARY;
  const groups=[
    ['foundations','Fundamentos','Comprende qué hace un auxiliar y cómo controla preguntas, negativas y cadenas verbales.'],
    ['primary','Auxiliares principales','Domina be, have y do: la maquinaria básica de tiempos, voz, preguntas y negación.'],
    ['ability-permission','Capacidad, permiso y posibilidad','Aprende a distinguir can, could, may y might según la intención.'],
    ['obligation-advice','Obligación, necesidad y consejo','Compara must, should, ought to, have to y need to sin confundir prohibición con ausencia de necesidad.'],
    ['future-politeness','Futuro, hipótesis y cortesía','Usa will, would y shall para decisiones, situaciones hipotéticas, ofertas y propuestas.'],
    ['advanced','Construcciones avanzadas','Controla el orden de los modales, los perfectos modales y alternativas flexibles.']
  ];
  const primary=[
    ['BE','am / is / are · was / were','continuous; passive','She is studying. · The door was opened.','Está estudiando. · La puerta fue abierta.'],
    ['HAVE','have / has · had','perfect aspect','She has finished.','Ella ha terminado.'],
    ['DO','do / does · did','questions; negatives; emphasis','Does she work? · I do understand.','¿Trabaja? · Sí entiendo.']
  ];
  const modals=[
    ['can / could','capacidad, permiso, posibilidad, peticiones','She can swim. · Could you help?'],
    ['may / might','posibilidad y permiso formal','It might rain. · May I come in?'],
    ['must','obligación fuerte, prohibición, deducción','You must leave. · She must be home.'],
    ['should / ought to','consejo y expectativa','You should rest.'],
    ['will / would','futuro, voluntad, hipótesis, cortesía','I will call. · Would you help?'],
    ['shall','ofertas y propuestas, especialmente con I/we','Shall we start?']
  ];
  const course=root.createEnglishGrammarCourse(data,{
    title:'Auxiliary Verbs',baseRoute:'#/grammars/auxiliary-verbs',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Señales y patrones útiles',
    markerCaution:'Las palabras auxiliares pueden tener más de una función. No decidas el significado por una sola palabra: observa la estructura completa, el verbo que sigue y el contexto.',
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses auxiliary-verbs"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Auxiliary Verbs</h1><p>Domina <span lang="en">be, have, do</span> y los modales para construir preguntas, negativas, tiempos, voz y matices de significado.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Empieza por What Are Auxiliary Verbs?</strong> Después estudia <span lang="en">BE, HAVE</span> y <span lang="en">DO</span>. Cuando esos tres estén claros, pasa a los modales. Cada lección incluye definición, usos, estructuras, ejemplos traducidos con audio, errores frecuentes y cuatro actividades autocorregibles.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar: auxiliar, verbo principal y cadena verbal</summary><div>
          <p><strong>El verbo principal aporta el significado léxico.</strong> En <span lang="en">She can swim</span>, <span lang="en">swim</span> expresa la acción y <span lang="en">can</span> añade capacidad. En <span lang="en">She has been studying</span>, <span lang="en">studying</span> es el verbo principal y <span lang="en">has been</span> forma parte de la cadena auxiliar.</p>
          <p><strong>El primer auxiliar es especialmente importante.</strong> Normalmente es el que se mueve al principio de una pregunta y el que recibe <span lang="en">not</span>: <span lang="en">She has been studying → Has she been studying? → She has not been studying.</span></p>
          <p><strong>No uses DO automáticamente.</strong> <span lang="en">Do/does/did</span> aparece como apoyo en muchos simples cuando no existe otro auxiliar. Si ya tienes <span lang="en">be</span>, <span lang="en">have</span> auxiliar o un modal, usa ese auxiliar: <span lang="en">Is she working? Has she finished? Can she come?</span></p>
          <p><strong>Verbo base</strong> significa la forma sin terminaciones: <span lang="en">go, work, study</span>. Los modales centrales suelen ir seguidos de esta forma: <span lang="en">can go, should work, might study</span>.</p>
          <div class="vt-table-wrap" role="region" aria-label="Los tres auxiliares principales" tabindex="0"><table><thead><tr><th>Auxiliar</th><th>Formas clave</th><th>Función frecuente</th><th>Ejemplo</th><th>Traducción</th></tr></thead><tbody>${primary.map(([name,forms,use,en,es])=>`<tr><th scope="row" lang="en">${name}</th><td lang="en">${esc(forms)}</td><td>${esc(use)}</td><td lang="en">${esc(en)}</td><td>${esc(es)}</td></tr>`).join('')}</tbody></table></div>
          <a class="text-link" href="#/grammars/verb-tenses">Repasar Verb Tenses ${icon('arrow-right')}</a><br><a class="text-link" href="#/grammars/passive-voice">Repasar Passive Voice ${icon('arrow-right')}</a>
        </div></details>
        ${groups.map(([id,title,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="aux-family-${id}"><div class="vt-family-heading"><div><h2 id="aux-family-${id}">${title}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
        <details class="vt-foundations"><summary>Tabla rápida: los modales más importantes</summary><div><p>Los modales centrales normalmente no llevan <span lang="en">-s</span> en tercera persona, no usan <span lang="en">do</span> para formar preguntas o negativas y van seguidos de verbo base.</p><div class="vt-table-wrap" role="region" aria-label="Resumen de modales" tabindex="0"><table><thead><tr><th>Modal</th><th>Ideas frecuentes</th><th>Ejemplo</th></tr></thead><tbody>${modals.map(([modal,meaning,en])=>`<tr><th scope="row" lang="en">${esc(modal)}</th><td>${esc(meaning)}</td><td lang="en">${esc(en)}</td></tr>`).join('')}</tbody></table></div><p>Una misma forma puede expresar más de una idea. Por ejemplo, <span lang="en">must</span> puede indicar obligación o una deducción fuerte; <span lang="en">could</span> puede hablar de capacidad pasada, posibilidad o cortesía.</p></div></details>
      </section>`;
    }
  });
  root.EnglishAuxiliary=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishAuxiliary=host=>course.createController(host);
})(globalThis);
