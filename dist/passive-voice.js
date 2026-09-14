'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./passive-voice-data.js'):root.ENGLISH_PASSIVE;
  const groups=[
    ['foundations','Fundamentos','Entiende el enfoque de la pasiva y aprende a transformar una oración.'],
    ['present','Presente','Hábitos, procesos en curso y acciones conectadas con ahora.'],
    ['past','Pasado','Hechos terminados, procesos y acciones anteriores a otro pasado.'],
    ['future','Futuro','Anuncios, planes y resultados que se habrán alcanzado.'],
    ['advanced','Otras construcciones','Modales, get, infinitivos y formas de comunicar lo que se cree o se dice.']
  ];
  const reference=[
    ['present-simple','am / is / are + participio','The room is cleaned daily.','La habitación se limpia a diario.'],
    ['present-continuous','am / is / are + being + participio','The room is being cleaned.','La habitación se está limpiando.'],
    ['present-perfect','have / has + been + participio','The room has been cleaned.','La habitación ha sido limpiada.'],
    ['past-simple','was / were + participio','The room was cleaned yesterday.','La habitación fue limpiada ayer.'],
    ['past-continuous','was / were + being + participio','The room was being cleaned.','La habitación se estaba limpiando.'],
    ['past-perfect','had + been + participio','The room had been cleaned.','La habitación había sido limpiada.'],
    ['future-simple','will + be + participio','The room will be cleaned.','La habitación será limpiada.'],
    ['be-going-to','am / is / are + going to + be + participio','The room is going to be cleaned.','La habitación se va a limpiar.'],
    ['future-perfect','will + have + been + participio','The room will have been cleaned.','La habitación habrá sido limpiada.'],
    ['modal-passives','modal + be + participio','The room must be cleaned.','La habitación debe limpiarse.'],
    ['modal-perfect-passives','modal + have + been + participio','The room should have been cleaned.','La habitación debería haberse limpiado.']
  ];
  const course=root.createEnglishGrammarCourse(data,{
    title:'Passive Voice',baseRoute:'#/grammars/passive-voice',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Palabras y expresiones útiles',
    markerCaution:'Estas expresiones ayudan a interpretar el contexto. Ninguna palabra aislada obliga a usar la voz pasiva: identifica quién recibe la acción, el tiempo y la intención del mensaje.',
    overview({data,groups,route,esc,icon}){
      const byId=new Map(data.lessons.map(lesson=>[lesson.id,lesson]));
      return `<section class="verb-tenses passive-voice"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Passive Voice</h1><p>Aprende a destacar a quien recibe una acción y a conservar el tiempo del mensaje.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Empieza por Active &amp; Passive Voice.</strong> Continúa con la transformación de oraciones y practica cada tiempo. Todas las lecciones incluyen explicación, ejemplos traducidos con audio y cuatro actividades con corrección.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar: sujeto, agente y participio</summary><div>
          <p><strong>El sujeto pasivo recibe la acción.</strong> En <span lang="en">The story is written by Ana</span>, <span lang="en">the story</span> es el sujeto, <span lang="en">is written</span> es el verbo en pasiva y Ana es la agente, la persona que escribe.</p>
          <p><strong>Patrón de partida:</strong> receptor + <span lang="en">be</span> en el tiempo necesario + participio pasado. Añade <span lang="en">by + agente</span> si su identidad aporta información. Conserva los complementos de tiempo y lugar al transformar la oración.</p>
          <div class="vt-table-wrap" role="region" aria-label="Verbos y participios útiles" tabindex="0"><table><thead><tr><th scope="col">Verbo base</th><th scope="col">Pasado simple</th><th scope="col">Participio</th><th scope="col">Significado</th></tr></thead><tbody>${[['clean','cleaned','cleaned','limpiar'],['write','wrote','written','escribir'],['give','gave','given','dar'],['choose','chose','chosen','elegir'],['build','built','built','construir'],['send','sent','sent','enviar']].map(([base,past,participle,meaning])=>`<tr><th scope="row" lang="en">${base}</th><td lang="en">${past}</td><td lang="en">${participle}</td><td>${meaning}</td></tr>`).join('')}</tbody></table></div>
          <p><strong>Be, being y been:</strong> <span lang="en">be</span> aparece tras <span lang="en">will</span>, un modal o <span lang="en">to</span>; <span lang="en">being</span> aparece en los continuos pasivos; <span lang="en">been</span> aparece en los perfectos. En las lecciones avanzadas verás otros usos de estas formas.</p>
          <p><strong>WH</strong> representa <span lang="en">what, when, where, why, who</span> y <span lang="en">how</span>. Las fórmulas muestran preguntas habituales; si preguntas por el sujeto completo, el orden puede ser distinto: <span lang="en">Who was invited?</span></p>
          <p><strong>No todos los verbos admiten esta transformación.</strong> <span lang="en">Arrive</span> y <span lang="en">happen</span> no tienen objeto en sus usos habituales. Tampoco todo <span lang="en">be + -ed</span> es una acción pasiva: algunas construcciones describen estados.</p>
          <a class="text-link" href="#/verbos">Repasar verbos y participios ${icon('arrow-right')}</a>
        </div></details>
        ${groups.map(([id,title,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="pv-family-${id}"><div class="vt-family-heading"><div><h2 id="pv-family-${id}">${title}</h2><p>${description}</p></div><span>${lessons.length} lecciones</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
        <details class="vt-foundations"><summary>Tabla de consulta: las formas pasivas más habituales</summary><div><p>El participio <span lang="en">cleaned</span> no cambia. Observa cómo se construye el grupo de auxiliares para mantener el tiempo y el aspecto.</p><div class="vt-table-wrap" role="region" aria-label="Comparación de las estructuras pasivas" tabindex="0"><table><thead><tr><th scope="col">Lección</th><th scope="col">Estructura</th><th scope="col">Ejemplo en inglés</th><th scope="col">Traducción</th></tr></thead><tbody>${reference.map(([id,formula,en,es])=>`<tr><th scope="row"><a class="text-link" lang="en" href="${route(id)}">${esc(byId.get(id).title)}</a></th><td>${esc(formula)}</td><td lang="en">${esc(en)}</td><td>${esc(es)}</td></tr>`).join('')}</tbody></table></div><p>Las traducciones con <strong>se</strong> suelen resultar más naturales en español. La estructura inglesa sigue necesitando sus auxiliares.</p></div></details>
        <details class="vt-foundations"><summary>¿Qué pasa con los otros tiempos continuos de Verb Tenses?</summary><div>
          <p>La voz pasiva puede combinarse con más cadenas verbales, pero algunas son poco frecuentes y resultan pesadas. Conviene dominar primero las formas de las lecciones y reconocer las siguientes sin forzarlas en la conversación.</p>
          <div class="vt-table-wrap" role="region" aria-label="Formas pasivas poco frecuentes" tabindex="0"><table><thead><tr><th scope="col">Forma</th><th scope="col">Cadena pasiva</th></tr></thead><tbody><tr><th scope="row" lang="en">Present Perfect Continuous</th><td>have / has been being + participio</td></tr><tr><th scope="row" lang="en">Past Perfect Continuous</th><td>had been being + participio</td></tr><tr><th scope="row" lang="en">Future Continuous</th><td>will be being + participio</td></tr><tr><th scope="row" lang="en">Future Perfect Continuous</th><td>will have been being + participio</td></tr></tbody></table></div>
          <p>Por ejemplo, <span lang="en">The road has been being repaired for two hours</span> es posible, pero normalmente es más claro decir <span lang="en">They have been repairing the road for two hours</span> (llevan dos horas reparando la carretera). La activa conserva el proceso y la duración.</p>
          <p>No elimines <span lang="en">being</span> de forma automática: podrías cambiar el aspecto y el significado. Elige una reformulación que conserve lo que quieres comunicar.</p><a class="text-link" href="#/grammars/verb-tenses">Repasar los tiempos y aspectos ${icon('arrow-right')}</a>
        </div></details>
      </section>`;
    }
  });
  root.EnglishPassive=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishPassive=host=>course.createController(host);
})(globalThis);
