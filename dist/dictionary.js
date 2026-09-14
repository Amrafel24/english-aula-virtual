'use strict';
// Dictionary interface and search logic. HTML/CSS/JS only; no external API or keys.
(function (root) {
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const POS = {n:'Sustantivo',pn:'Nombre propio',v:'Verbo',adj:'Adjetivo',adv:'Adverbio',pronoun:'Pronombre',preposition:'Preposición',conjunction:'Conjunción',interjection:'Interjección',phraseologicalUnit:'Expresión',proverb:'Proverbio',determiner:'Determinante',article:'Artículo',numeral:'Numeral',prefix:'Prefijo',suffix:'Sufijo',particle:'Partícula',postposition:'Posposición',symbol:'Símbolo'};
  const seeds = ['learn','house','job','journey','friend','challenge','hello','practice'];
  const validSavedWord = word => !!word && /^dict-[a-f0-9]{16}-[a-f0-9]{8}$/.test(word.id) && typeof word.en === 'string' && word.en.length > 0 && word.en.length <= 200 && typeof word.es === 'string' && word.es.length > 0 && word.es.length <= 2000;
  function fingerprint(text) {
    let hash = 2166136261;
    for (const char of text) { hash ^= char.codePointAt(0); hash = Math.imul(hash, 16777619); }
    return (hash >>> 0).toString(16).padStart(8,'0');
  }
  function snapshot(record, translations) {
    const es = translations.join('; ').slice(0,2000);
    if (record.studyWord && normalize(es) === normalize(record.studyWord.es)) return record.studyWord;
    if (record.local) return record.studyWord;
    return {id:`dict-${record.key}-${fingerprint(es)}`,en:record.en,es,category:'Diccionario'};
  }
  function editDistance(a,b) {
    let before = null, previous = Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++) {
      const current = [i];
      for(let j=1;j<=b.length;j++) {
        current[j] = Math.min(current[j-1]+1,previous[j]+1,previous[j-1]+(a[i-1]===b[j-1]?0:1));
        if(before && i>1 && j>1 && a[i-1]===b[j-2] && a[i-2]===b[j-1]) current[j]=Math.min(current[j],before[j-2]+1);
      }
      before=previous;previous=current;
    }
    return previous[b.length];
  }
  function createIndex(data, study = {}) {
    const rows = data.rows.map(([key,en,translations,pos]) => ({key,id:'dict-'+key,en,translations,pos,enKey:normalize(en),esKey:'\u0001'+translations.map(normalize).join('\u0001')+'\u0001'}));
    const byId = new Map(rows.map(r=>[r.id,r]));
    const byTerm = new Map(rows.map(r=>[r.enKey,r]));
    for(const category of study.categories || []) for(const word of category.words) {
      const key=normalize(word.en);
      let record=byTerm.get(key);
      if(!record) {
        record={key:word.id,id:word.id,en:word.en,translations:[word.es],pos:[],enKey:key,esKey:'\u0001'+normalize(word.es)+'\u0001',local:true};
        rows.push(record);byTerm.set(key,record);byId.set(record.id,record);
      }
      if(!record.studyWord) record.studyWord=word;
      record.esKey+='\u0001'+normalize(word.es)+'\u0001';
      (record.categories ||= new Set()).add(category.name);
    }
    const aliases = new Map();
    for(const verb of [...(study.regularVerbs || []),...(study.irregularVerbs || [])]) {
      const record=byTerm.get(normalize(verb[0]));if(!record)continue;
      record.verb=verb;
      record.esKey+='\u0001'+normalize(verb[3])+'\u0001';
      for(const form of verb.slice(1,3).flatMap(v=>v.split(/\s*\/\s*/))) {
        const key=normalize(form);if(key===record.enKey)continue;
        if(!aliases.has(key))aliases.set(key,[]);
        aliases.get(key).push(record);
      }
    }
    function search(query,language='both',part='') {
      const q=normalize(String(query).slice(0,80));
      if(!q)return {matches:seeds.map(s=>byTerm.get(s)).filter(r=>r&&(!part||r.pos.includes(part))),suggestions:[]};
      const ranked=[];
      const aliasRows=new Set(language==='es'?[]:aliases.get(q)||[]);
      for(const row of rows) {
        if(part&&!row.pos.includes(part))continue;
        let score=Infinity;
        if(language!=='es') {
          if(row.enKey===q)score=0;
          else if(aliasRows.has(row))score=1;
          else if(row.enKey.startsWith(q))score=3;
          else if(row.enKey.includes(' '+q)||row.enKey.includes('-'+q))score=5;
          else if(row.enKey.includes(q))score=7;
        }
        if(language!=='en') {
          if(row.esKey.includes('\u0001'+q+'\u0001'))score=Math.min(score,2);
          else if(row.esKey.includes('\u0001'+q))score=Math.min(score,4);
          else if(row.esKey.includes(' '+q))score=Math.min(score,6);
          else if(row.esKey.includes(q))score=Math.min(score,8);
        }
        if(Number.isFinite(score))ranked.push({row,score});
      }
      ranked.sort((a,b)=>a.score-b.score || a.row.en.length-b.row.en.length || a.row.en.localeCompare(b.row.en,'en'));
      let suggestions=[];
      if(!ranked.length && language!=='es' && q.length>=3 && q.length<=32) {
        suggestions=rows.filter(r=>r.enKey[0]===q[0]&&Math.abs(r.enKey.length-q.length)<=2&&(!part||r.pos.includes(part)))
          .map(row=>({row,distance:editDistance(q,row.enKey)})).filter(r=>r.distance<=(q.length<5?1:2))
          .sort((a,b)=>a.distance-b.distance||a.row.en.length-b.row.en.length).slice(0,5).map(r=>r.row.en);
      }
      return {matches:ranked.map(r=>r.row),suggestions};
    }
    return {rows,byId,byTerm,search,count:rows.length};
  }

  root.EnglishDictionary = {normalize,createIndex,snapshot,validSavedWord,editDistance};
  if(typeof module!=='undefined'&&module.exports)module.exports=root.EnglishDictionary;
  if(typeof document==='undefined')return;

  const assetPromises = new Map();
  function loadAsset(filename,read) {
    if(read())return Promise.resolve(read());
    if(assetPromises.has(filename))return assetPromises.get(filename);
    const promise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      const timer=setTimeout(()=>finish(new Error('La descarga tardó demasiado. Comprueba tu conexión y vuelve a intentar.')),30000);
      function finish(error) {
        clearTimeout(timer);script.onload=null;script.onerror=null;script.remove();
        if(error)reject(error);else resolve(read());
      }
      script.src=new URL(filename,document.baseURI).href;
      script.async=true;
      script.onload=()=>finish(read()?null:new Error('No se pudo leer el diccionario. Vuelve a intentar.'));
      script.onerror=()=>finish(new Error('No se pudo cargar el diccionario. Comprueba tu conexión y vuelve a intentar.'));
      document.head.append(script);
    }).catch(error=>{assetPromises.delete(filename);throw error;});
    assetPromises.set(filename,promise);return promise;
  }
  root.createEnglishDictionary = function(host) {
    let element=null,index=null,indexPromise=null,query='',language='both',part='',matches=[],suggestions=[],selected=null,groups=null;
    let offset=0,timer=null,selectionToken=0,mountToken=0,choices=new Map();
    const pageSize=25;
    const $=s=>element?.querySelector(s);
    const icon=host.icon;
    const button=(label,attrs='',kind='outline-button')=>`<button type="button" class="${kind}" ${attrs}>${label}</button>`;
    function ensureIndex() {
      if(index)return Promise.resolve(index);
      if(!indexPromise)indexPromise=loadAsset('dictionary-index.js',()=>root.ENGLISH_DICTIONARY_INDEX)
        .then(data=>{index=createIndex(data,host.data);return index;}).catch(e=>{indexPromise=null;throw e;});
      return indexPromise;
    }
    function shell() {
      return `<section class="dictionary" aria-label="Diccionario de inglés">
        <div class="page-heading dictionary-heading"><div><div class="eyebrow">ENGLISH / ESPAÑOL</div><h1>Diccionario</h1><p>Encuentra la palabra. Comprende sus significados.</p></div><a class="outline-button" href="#/listas">${icon('folder-heart')} Mis listas</a></div>
        <form id="dictionary-search-form" class="dictionary-search" role="search" aria-label="Buscar en el diccionario">
          <label for="dictionary-query" class="sr-only">Palabra en inglés o español</label>
          <div class="dictionary-input-row">${icon('search')}<input id="dictionary-query" type="search" name="dictionary-query" placeholder="Escribe una palabra en inglés o español…" value="${escape(query)}" maxlength="80" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="search" aria-describedby="dictionary-hint"><button type="submit" class="primary-button">Buscar</button></div>
          <div class="dictionary-filters"><label for="dictionary-language">Buscar en <select id="dictionary-language"><option value="both" ${language==='both'?'selected':''}>Inglés y español</option><option value="en" ${language==='en'?'selected':''}>Inglés</option><option value="es" ${language==='es'?'selected':''}>Español</option></select></label><label for="dictionary-part">Tipo <select id="dictionary-part"><option value="">Todos</option>${Object.entries(POS).map(([key,label])=>`<option value="${key}" ${part===key?'selected':''}>${label}</option>`).join('')}</select></label><span id="dictionary-hint">${index?index.count.toLocaleString('es-DO')+' palabras y expresiones':'Cargando las palabras…'}</span></div>
        </form>
        <div class="dictionary-layout"><section class="dictionary-results" aria-label="Resultados de búsqueda"><div class="dictionary-results-heading"><h2 id="dictionary-results-title">Para empezar</h2><span id="dictionary-result-count" role="status" aria-live="polite"></span></div><div id="dictionary-result-list" aria-busy="true"><p class="dictionary-message">Preparando el diccionario…</p></div><div id="dictionary-pagination"></div></section><article id="dictionary-detail" class="dictionary-detail" aria-label="Significados de la palabra" aria-busy="true"><div class="dictionary-message">${icon('book-open')}<p>Las palabras y sus traducciones aparecerán aquí.</p></div></article></div>
        <footer class="dictionary-attribution"><details><summary>Fuentes del diccionario</summary><p>Datos de <a href="https://www.wikdict.com/" target="_blank" rel="noopener noreferrer">WikDict</a> y <a href="https://freedict.org/" target="_blank" rel="noopener noreferrer">FreeDict</a>, edición 23 de noviembre de 2025, a partir de las contribuciones de Wiktionary. Adaptados para English bajo <a href="dictionary-license.txt" target="_blank" rel="noopener">CC BY-SA 3.0</a>. Las traducciones pueden variar según el contexto; las definiciones se muestran en inglés.</p></details></footer>
      </section>`;
    }
    function preview(record) { return record.studyWord?.es || record.verb?.[3] || record.translations.slice(0,4).join('; '); }
    function paintResults() {
      if(!element)return;
      const focused=document.activeElement?.dataset.dictWord;
      const scrollTop=$('#dictionary-result-list').scrollTop;
      $('#dictionary-results-title').textContent=normalize(query)?'Resultados':'Para empezar';
      $('#dictionary-result-count').textContent=matches.length.toLocaleString('es-DO')+(matches.length===1?' palabra':' palabras');
      $('#dictionary-result-list').setAttribute('aria-busy','false');
      $('#dictionary-result-list').innerHTML=matches.slice(offset,offset+pageSize).map(r=>`<button type="button" class="dictionary-result ${selected?.id===r.id?'is-selected':''}" data-dict-word="${escape(r.id)}" ${selected?.id===r.id?'aria-current="true"':''}><span lang="en">${escape(r.en)}</span><small>${escape(preview(r))}</small>${icon('chevron-right')}</button>`).join('') || `<div class="dictionary-message"><p>No encontramos «${escape(query)}»${part?' con ese tipo de palabra':''}.</p><p>Revisa la escritura o prueba otra forma de la palabra.</p>${suggestions.length?`<strong>Quizás quisiste decir:</strong><div class="dictionary-suggestions">${suggestions.map(s=>button(escape(s),`data-dict-query="${escape(s)}"`,'dictionary-chip')).join('')}</div>`:''}</div>`;
      $('#dictionary-pagination').innerHTML=matches.length>pageSize?`<span>${offset+1}–${Math.min(offset+pageSize,matches.length)} de ${matches.length.toLocaleString('es-DO')}</span><div>${button(icon('chevron-left'),`data-dict-page="-1" aria-label="Resultados anteriores" ${offset===0?'disabled':''}`,'icon-button')}${button(icon('chevron-right'),`data-dict-page="1" aria-label="Resultados siguientes" ${offset+pageSize>=matches.length?'disabled':''}`,'icon-button')}</div>`:'';
      $('#dictionary-result-list').scrollTop=scrollTop;
      if(focused)element.querySelector(`[data-dict-word="${focused}"]`)?.focus({preventScroll:true});
    }
    function saveButton(word,label='Guardar significado') {
      choices.set(word.id,word);
      const saved=host.isSaved(word.id);
      return button(icon('heart')+`<span>${saved?'En mis listas':label}</span>`,`data-dict-save="${escape(word.id)}" data-dict-save-label="${escape(label)}" aria-label="Guardar ${escape(word.en)}: ${escape(word.es)} en mis listas"`,'dictionary-save'+(saved?' is-saved':''));
    }
    function refreshSaved() {
      element?.querySelectorAll('[data-dict-save]').forEach(button=>{
        const saved=host.isSaved(button.dataset.dictSave);
        button.classList.toggle('is-saved',saved);
        button.querySelector('span').textContent=saved?'En mis listas':button.dataset.dictSaveLabel;
      });
    }
    function senseMarkup(sense) {
      const word=snapshot(selected,sense.t);
      return `<li class="dictionary-sense"><div class="dictionary-sense-top"><h4>${escape(sense.t.join(' · '))}</h4>${saveButton(word)}</div>${sense.d.length?`<ul class="dictionary-definitions" lang="en">${sense.d.map(d=>`<li>${escape(d)}</li>`).join('')}</ul>`:''}</li>`;
    }
    function paintDetail() {
      if(!element||!selected||!groups)return;
      choices=new Map();
      const translation=preview(selected);
      const word=selected.studyWord || snapshot(selected,[translation]);
      const phonetics=[...new Set(groups.flatMap(g=>g.i))];
      const source=selected.local?'Vocabularios de English':'WikDict / FreeDict';
      $('#dictionary-detail').setAttribute('aria-busy','false');
      $('#dictionary-detail').innerHTML=`<div class="dictionary-word-header"><span class="dictionary-word-label">ENGLISH</span><h2 lang="en" tabindex="-1" id="dictionary-word-title">${escape(selected.en)}</h2><div class="dictionary-audio">${button(icon('volume-2')+' Escuchar',`data-dict-speak="${escape(selected.en)}" data-dict-rate="0.85"`,'dictionary-audio-button')}${button(icon('volume-2')+' Más lento',`data-dict-speak="${escape(selected.en)}" data-dict-rate="0.65"`,'dictionary-audio-button')}</div></div>
        <div class="dictionary-translation"><span>ESPAÑOL</span><p>${escape(translation)}</p>${saveButton(word, 'Guardar palabra')}${selected.categories?`<small>En tus vocabularios: ${escape([...selected.categories].join(', '))}</small>`:''}</div>
        ${selected.verb?`<section class="dictionary-verb"><h3>Formas verbales</h3><dl>${['Presente','Pasado','Participio'].map((label,i)=>`<div><dt>${label}</dt><dd lang="en">${escape(selected.verb[i])}${button(icon('volume-2'),`data-dict-speak="${escape(selected.verb[i])}" aria-label="Escuchar ${escape(selected.verb[i])}"`,'icon-button')}</dd></div>`).join('')}</dl></section>`:''}
        <div class="dictionary-meanings-heading"><h3>Significados</h3><span>Definiciones en inglés</span></div>
        ${groups.map(group=>`<section class="dictionary-meaning"><h3>${escape(POS[group.p]||'Palabra o expresión')}</h3><ol>${group.s.slice(0,3).map(senseMarkup).join('')}</ol>${group.s.length>3?`<details><summary>Ver ${group.s.length-3} acepciones más</summary><ol start="4">${group.s.slice(3).map(senseMarkup).join('')}</ol></details>`:''}</section>`).join('')}
        ${phonetics.length?`<details class="dictionary-phonetics"><summary>Variantes fonéticas registradas</summary><div lang="en">${phonetics.map(p=>`<span>${escape(p)}</span>`).join('')}</div></details>`:''}
        <div class="dictionary-source">${icon('book-open')}<span>${escape(source)}</span><a href="https://en.wiktionary.org/wiki/${encodeURIComponent(selected.en)}#English" target="_blank" rel="noopener noreferrer">Consultar Wiktionary ${icon('arrow-up-right')}</a></div>`;
    }
    async function selectWord(record,scroll=false) {
      if(!element||!record)return;
      const token=++selectionToken;
      selected=record;groups=null;paintResults();
      $('#dictionary-detail').setAttribute('aria-busy','true');
      $('#dictionary-detail').innerHTML=`<div class="dictionary-message"><strong lang="en">${escape(record.en)}</strong><p>Cargando significados…</p></div>`;
      try {
        const pack=record.local?null:await loadAsset(`dictionary-pack-${record.key[0]}.js`,()=>root.ENGLISH_DICTIONARY_PACKS?.[record.key[0]]);
        if(token!==selectionToken||!element)return;
        groups=record.local?[{p:'',i:[],s:[{t:[record.studyWord.es],d:[]}]}]:pack[record.key];
        if(!groups)throw new Error('No pudimos encontrar los significados. Vuelve a intentar.');
        paintDetail();
        if(scroll&&matchMedia('(max-width:767px)').matches) {
          $('#dictionary-word-title')?.focus({preventScroll:true});
          $('#dictionary-detail').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
        }
      } catch(error) {
        if(token!==selectionToken||!element)return;
        $('#dictionary-detail').setAttribute('aria-busy','false');
        $('#dictionary-detail').innerHTML=`<div class="dictionary-message" role="status"><p>${escape(error.message)}</p>${button('Volver a intentar','data-dict-retry="detail"')}</div>`;
      }
    }
    function performSearch() {
      if(!index||!element)return;
      query=$('#dictionary-query').value.trim().slice(0,80);
      language=$('#dictionary-language').value;part=$('#dictionary-part').value;
      ({matches,suggestions}=index.search(query,language,part));offset=0;
      $('#dictionary-result-list').scrollTop=0;
      if(matches.length)selectWord(matches[0]);
      else {
        selected=null;groups=null;selectionToken++;choices.clear();paintResults();
        $('#dictionary-detail').setAttribute('aria-busy','false');
        $('#dictionary-detail').innerHTML=`<div class="dictionary-message">${icon('search')}<h2>Prueba otra palabra</h2><p>Puedes buscar en inglés o español. Por ejemplo, «house» o «casa».</p><a class="text-link" href="https://${language==='es'?'es':'en'}.wiktionary.org/wiki/${encodeURIComponent(query)}" target="_blank" rel="noopener noreferrer">Consultar «${escape(query)}» en Wiktionary ${icon('arrow-up-right')}</a></div>`;
      }
    }
    async function initialize() {
      const token=++mountToken;
      try {
        await ensureIndex();if(token!==mountToken||!element)return;
        $('#dictionary-hint').textContent=index.count.toLocaleString('es-DO')+' palabras y expresiones';
        performSearch();
      } catch(error) {
        if(token!==mountToken||!element)return;
        $('#dictionary-hint').textContent='No se pudo cargar la base de palabras';
        $('#dictionary-result-list').setAttribute('aria-busy','false');
        $('#dictionary-detail').setAttribute('aria-busy','false');
        $('#dictionary-result-list').innerHTML=`<div class="dictionary-message" role="status"><p>${escape(error.message)}</p>${button('Volver a intentar','data-dict-retry="index"')}</div>`;
      }
    }
    function onClick(event) {
      const button=event.target.closest('button');if(!button||!element?.contains(button))return;
      if(button.dataset.dictWord)selectWord(index?.byId.get(button.dataset.dictWord),true);
      if(button.dataset.dictSave) {const word=choices.get(button.dataset.dictSave);if(word)host.saveWord(word);}
      if(button.dataset.dictSpeak)host.speak(button.dataset.dictSpeak,Number(button.dataset.dictRate)||0.85);
      if(button.dataset.dictQuery) {$('#dictionary-query').value=button.dataset.dictQuery;performSearch();$('#dictionary-query').focus();}
      if(button.dataset.dictPage) {
        offset=Math.max(0,Math.min(Math.floor((matches.length-1)/pageSize)*pageSize,offset+Number(button.dataset.dictPage)*pageSize));
        paintResults();$('#dictionary-result-list').scrollTop=0;
        $('#dictionary-result-list button')?.focus({preventScroll:true});
      }
      if(button.dataset.dictRetry==='index')initialize();
      if(button.dataset.dictRetry==='detail')selectWord(selected);
    }
    function mount(container) {
      if(element?.isConnected&&element.parentElement===container) {refreshSaved();return;}
      container.innerHTML=shell();element=container.querySelector('.dictionary');
      element.addEventListener('click',onClick);
      $('#dictionary-search-form').addEventListener('submit',event=>{event.preventDefault();clearTimeout(timer);performSearch();});
      $('#dictionary-query').addEventListener('input',event=>{clearTimeout(timer);if(!event.isComposing)timer=setTimeout(performSearch,180);});
      $('#dictionary-query').addEventListener('compositionend',()=>{clearTimeout(timer);timer=setTimeout(performSearch,180);});
      $('#dictionary-language').addEventListener('change',performSearch);
      $('#dictionary-part').addEventListener('change',performSearch);
      element.addEventListener('keydown',event=>{
        if(event.target.id==='dictionary-query'&&event.key==='ArrowDown') {event.preventDefault();$('#dictionary-result-list button')?.focus();}
        const row=event.target.closest('[data-dict-word]');
        if(row&&['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
          event.preventDefault();const buttons=[...element.querySelectorAll('[data-dict-word]')],at=buttons.indexOf(row);
          const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:Math.max(0,Math.min(buttons.length-1,at+(event.key==='ArrowDown'?1:-1)));
          buttons[next]?.focus();
        }
      });
      initialize();
    }
    function leave() {clearTimeout(timer);mountToken++;selectionToken++;element=null;}
    return {mount,leave};
  };
})(globalThis);
