'use strict';
(function(root){
  const isNode=typeof module!=='undefined'&&module.exports;
  if(isNode)require('./verb-tenses.js');
  const data=isNode?require('./full-verbs-data.js'):root.ENGLISH_FULL_VERBS;
  const groups=[
    ['foundations','Fundamentos','Reconoce el verbo principal y domina las formas que sostienen todas las estructuras.'],
    ['forms','Formas del verbo','Controla tercera persona, pasado, participio e -ing con verbos regulares e irregulares.'],
    ['objects','Objetos y complementos','Entiende qué necesita un verbo después: objeto directo, receptor o complemento del sujeto.'],
    ['patterns','Patrones verbales','Aprende qué forma debe seguir a cada verbo: to-infinitive, -ing o infinitivo sin to.'],
    ['multiword','Verbos de varias palabras','Trabaja phrasal verbs y la posición correcta de nombres y pronombres.']
  ];
  const formTable=[
    ['Base','work','go','write'],['3.ª persona','works','goes','writes'],['Past','worked','went','wrote'],['Past participle','worked','gone','written'],['-ing','working','going','writing']
  ];
  const patternTable=[
    ['modal + base','can go','sin to'],['verb + to-infinitive','want to go','to + base'],['verb + -ing','enjoy going','forma -ing'],['verb + object + to-infinitive','tell me to go','objeto + to + base'],['make/let + object + base','make me go','objeto + base']
  ];
  const course=root.createEnglishGrammarCourse(data,{
    title:'Full Verbs',baseRoute:'#/grammars/full-verbs',indexLabel:'Todas las lecciones',groups,
    markersTitle:'Señales y patrones útiles',
    markerCaution:'Los patrones verbales dependen de la construcción y del significado. Aprende el verbo junto con la forma que puede seguirlo y confirma los usos nuevos en un buen diccionario.',
    overview({data,groups,route,esc,icon}){
      return `<section class="verb-tenses full-verbs"><div class="back-link"><a class="text-link" href="#/grammars">${icon('arrow-left')} Volver a Grammars</a></div>
        <div class="page-heading"><div><div class="eyebrow">GRAMMARS · PASO A PASO</div><h1 lang="en">Full Verbs</h1><p>Domina los verbos principales: sus cinco formas, los objetos que admiten y los patrones que construyen con otros verbos.</p></div><span class="vt-count">${data.lessons.length} lecciones · ${data.lessons.reduce((n,l)=>n+l.practice.length,0)} actividades</span></div>
        <div class="vt-orientation"><p><strong>Empieza por What Are Full Verbs?</strong> y después estudia las cinco formas. Luego pasa a objetos, complementos y patrones verbales. Cada lección mantiene el mismo sistema de Verb Tenses y Passive Voice: definición, usos, estructuras, ejemplos traducidos con audio, errores frecuentes y cuatro actividades autocorregibles.</p><div class="vt-key" aria-label="Guía de colores"><span class="vt-key-definition">Definición</span><span class="vt-key-structure">Estructuras</span><span class="vt-key-example">Ejemplos</span><span class="vt-key-tip">Claves</span><span class="vt-key-error">Errores</span></div></div>
        <details class="vt-foundations"><summary>Antes de empezar: las cinco formas de un verbo</summary><div>
          <p><strong>Un verbo principal puede cambiar de forma según la estructura.</strong> En inglés conviene aprender base, tercera persona, pasado, participio y forma -ing. En los verbos irregulares, pasado y participio pueden ser diferentes.</p>
          <div class="vt-table-wrap" role="region" aria-label="Cinco formas de verbos" tabindex="0"><table><thead><tr><th>Forma</th><th lang="en">work</th><th lang="en">go</th><th lang="en">write</th></tr></thead><tbody>${formTable.map(([name,...cells])=>`<tr><th scope="row">${esc(name)}</th>${cells.map(cell=>`<td lang="en">${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
          <p><strong>No memorices una forma aislada.</strong> Con un verbo irregular, aprende la familia completa: <span lang="en">go–went–gone</span>, <span lang="en">write–wrote–written</span>. Después identifica qué forma pide la estructura.</p>
          <a class="text-link" href="#/grammars/verb-tenses">Repasar Verb Tenses ${icon('arrow-right')}</a><br><a class="text-link" href="#/grammars/auxiliary-verbs">Repasar Auxiliary Verbs ${icon('arrow-right')}</a>
        </div></details>
        ${groups.map(([id,title,description])=>{const lessons=data.lessons.filter(l=>l.group===id);return `<section class="vt-family" aria-labelledby="full-family-${id}"><div class="vt-family-heading"><div><h2 id="full-family-${id}">${title}</h2><p>${description}</p></div><span>${lessons.length} ${lessons.length===1?'lección':'lecciones'}</span></div><div class="vt-grid">${lessons.map(lesson=>`<a class="vt-lesson-card" href="${route(lesson.id)}"><span class="vt-card-label">${esc(lesson.spanish)}</span><h3 lang="en">${esc(lesson.title)}</h3><p>${esc(lesson.summary)}</p><div class="vt-card-formula">${esc(lesson.forms[0][1])}</div><span class="vt-open">Abrir lección ${icon('chevron-right')}</span></a>`).join('')}</div></section>`;}).join('')}
        <details class="vt-foundations"><summary>Tabla rápida: patrones que debes reconocer</summary><div><p>La palabra que aparece antes del segundo verbo suele decidir su forma. Estos patrones son un mapa inicial; cada verbo debe aprenderse con sus construcciones reales.</p><div class="vt-table-wrap" role="region" aria-label="Patrones verbales principales" tabindex="0"><table><thead><tr><th>Patrón</th><th>Ejemplo</th><th>Forma siguiente</th></tr></thead><tbody>${patternTable.map(([pattern,en,note])=>`<tr><th scope="row">${esc(pattern)}</th><td lang="en">${esc(en)}</td><td>${esc(note)}</td></tr>`).join('')}</tbody></table></div><p>Más adelante, la subsección <strong>State & Dynamic Verbs</strong> profundizará en la diferencia entre verbos de estado y verbos de acción. Aquí nos concentramos en la forma y en la construcción del verbo principal.</p></div></details>
      </section>`;
    }
  });
  root.EnglishFullVerbs=course;
  if(isNode)module.exports=course;
  if(typeof document!=='undefined')root.createEnglishFullVerbs=host=>course.createController(host);
})(globalThis);
