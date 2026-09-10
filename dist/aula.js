(function(root){
  'use strict';
  root.createEnglishAula=function({icon}){
    const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const labels={home:'Inicio del aula',lessons:'Clases y entregas',materials:'Vocabularios',chats:'Chats grupales',forums:'Foros',tests:'Exámenes',video:'Videoconferencia',members:'Integrantes',settings:'Configuración'};
    const symbols={home:'home',lessons:'book-open',materials:'languages',chats:'message-circle',forums:'messages-square',tests:'clipboard-check',video:'video',members:'users',settings:'settings'};
    const kinds={lessons:'lesson',materials:'vocabulary',chats:'chat',forums:'forum',tests:'exam'};
    const kindNames={lesson:'Clase',vocabulary:'Vocabulario',chat:'Chat grupal',forum:'Foro',exam:'Examen'};
    const date=n=>n?new Intl.DateTimeFormat('es',{dateStyle:'medium',timeStyle:'short'}).format(new Date(n)):'Sin fecha límite';
    const localDate=n=>n?new Date(n-new Date(n).getTimezoneOffset()*60000).toISOString().slice(0,16):'';
    const timeZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
    const btn=(text,action='',attrs='',style='aula-btn')=>`<button type="button" class="${style}" ${action?`data-av-action="${action}"`:''} ${attrs}>${text}</button>`;
    const tag=(text,kind='')=>`<span class="aula-tag ${kind}">${esc(text)}</span>`;
    const blank=(title,body)=>`<div class="aula-empty">${icon('book-open')}<h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
    const field=(label,name,type='text',value='',extra='')=>`<label class="aula-field"><span>${esc(label)}</span><input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;
    const textArea=(label,name,value='',extra='')=>`<label class="aula-field"><span>${esc(label)}</span><textarea name="${name}" ${extra}>${esc(value)}</textarea></label>`;
    const select=(label,name,items,value='')=>`<label class="aula-field"><span>${esc(label)}</span><select name="${name}">${items.map(o=>`<option value="${esc(o.id)}" ${o.id===value?'selected':''}>${esc(o.title)}</option>`).join('')}</select></label>`;
    const submit=label=>`<button type="submit" class="aula-btn aula-primary">${label}</button>`;
    const dueField=n=>field('Fecha y hora límite de entrega','due','datetime-local',localDate(n))+`<small class="aula-muted">Hora local: ${esc(timeZone)}. Sin fecha, la entrega permanece abierta.</small>`;
    let host=null,route='',serial=0,session=null,catalog={materials:[],examSources:[]},classes=[],room=null,tab='home',detail=null,members=[],authMode='login',busy=false,pollTimer=null,roomTimer=null,practice=null;
    let video=null;
    const teacher=()=>room?.class.role==='teacher';
    async function api(path,method='GET',body){
      if(location.protocol==='file:')throw new Error('Para usar Aula virtual, inicia el servidor con «node servidor.js» y abre http://localhost:8080.');
      const raw=body instanceof File;
      const response=await fetch(`/api/aula/${path}`,{method,credentials:'same-origin',headers:method==='GET'?{}:{'X-English-Request':'aula','Content-Type':raw?'application/octet-stream':'application/json',...(raw?{'X-Filename':encodeURIComponent(body.name)}:{})},...(body===undefined?{}:{body:raw?body:JSON.stringify(body)})});
      let value;try{value=await response.json();}catch{throw new Error('El servidor del aula no está disponible. Inicia English con «node servidor.js».');}
      if(!response.ok){const error=new Error(value.error||'No se pudo completar la operación.');error.status=response.status;throw error;}return value;
    }
    function notice(message,error=false){const node=host?.querySelector('#aula-notice');if(node){node.textContent=message;node.className=`aula-notice ${error?'is-error':'is-success'}`;node.hidden=!message;}}
    function shell(content){if(!host)return;host.innerHTML=`<section class="aula" aria-label="Aula virtual"><div id="aula-notice" class="aula-notice" role="status" aria-live="polite" hidden></div>${content}</section>`;}
    function accountBar(){return session?.user?`<div class="aula-account"><span>${icon('users')} ${esc(session.user.name)}</span>${session.mode==='siwc'?'<a class="aula-text" href="/signout-with-chatgpt?return_to=%2F%23%2Faula">Cerrar sesión</a>':btn('Cerrar sesión','logout','','aula-text')}</div>`:'';}
    function landing(){
      shell(`${accountBar()}<div class="aula-hero"><div><p class="aula-eyebrow">ENGLISH · APRENDEMOS JUNTOS</p><h1>Aula virtual<span>Tu clase, más cerca.</span></h1><p>Un lugar para enseñar, practicar y avanzar en compañía. Con todos los recursos de English a mano.</p><div class="aula-hero-pills"><span>${icon('book-open')} Clases y materiales</span><span>${icon('message-circle')} Comunidad</span><span>${icon('clipboard-check')} Tu progreso</span></div></div><div class="aula-mascot"><img src="english-mascot.png" alt="English te da la bienvenida al aula" width="230" height="230"><span>Let's learn together!</span></div></div>
      <div class="aula-entry-grid"><a class="aula-entry" href="#/aula/profesores"><span class="aula-entry-icon">${icon('graduation-cap')}</span><p class="aula-eyebrow">ENSEÑA A TU MANERA</p><h2>Profesores</h2><p>Crea tu aula, prepara clases y acompaña a tus estudiantes en cada paso.</p><span class="aula-entry-link">Entrar como profesor ${icon('arrow-right')}</span></a><a class="aula-entry aula-student-entry" href="#/aula/estudiantes"><span class="aula-entry-icon">${icon('backpack')}</span><p class="aula-eyebrow">CADA DÍA, UN PASO MÁS</p><h2>Estudiantes</h2><p>Introduce el código de tu profesor y encuentra tus clases, actividades y compañeros.</p><span class="aula-entry-link">Entrar como estudiante ${icon('arrow-right')}</span></a></div><p class="aula-footnote">${icon('shield-check')} Cada aula tiene su propio acceso. Tú eliges con quién aprender.</p>`);
    }
    function authForm(){
      if(session.mode==='siwc')return `<div class="aula-panel"><h2>Tu cuenta para el aula</h2><p>Inicia sesión para crear un aula o unirte a la de tu profesor.</p><a class="aula-btn aula-primary" href="/signin-with-chatgpt?return_to=${encodeURIComponent('/#/aula/'+route)}">Continuar con ChatGPT ${icon('arrow-right')}</a></div>`;
      const registration=authMode==='register';
      return `<div class="aula-panel"><div class="aula-inline"><h2>${registration?'Crea tu cuenta':'Inicia sesión'}</h2>${btn(registration?'Ya tengo cuenta':'Crear cuenta','auth-mode','','aula-text')}</div><form data-av-form="auth" class="aula-form">${registration?field('Tu nombre','name','text','','required minlength="2" maxlength="80" autocomplete="name"'):''}${field('Correo electrónico','email','email','','required maxlength="254" autocomplete="email"')}${field('Contraseña','password','password','','required minlength="12" maxlength="200" autocomplete="'+(registration?'new-password':'current-password')+'"')}<small class="aula-muted">${registration?'Usa al menos 12 caracteres. Conserva tu contraseña para volver a entrar.':'Usa la cuenta con la que creaste o te uniste al aula.'}</small>${submit(registration?'Crear mi cuenta':'Entrar')}</form></div>`;
    }
    function rolePage(){
      const isTeacher=route==='profesores';const existing=classes.filter(c=>c.role===(isTeacher?'teacher':'student'));
      shell(`<a class="aula-back" href="#/aula">${icon('arrow-left')} Aula virtual</a>${accountBar()}<div class="aula-page-heading"><p class="aula-eyebrow">${isTeacher?'ESPACIO PARA ENSEÑAR':'ESPACIO PARA APRENDER'}</p><h1>${isTeacher?'Profesores':'Estudiantes'}</h1><p>${isTeacher?'Dale un nombre a tu aula y empieza a preparar la próxima clase.':'El código de tu profesor es la llave para entrar a tu aula.'}</p></div><div class="aula-role-layout">${!session.user?authForm():`<div class="aula-panel"><h2>${isTeacher?'Crear un aula':'Unirme a un aula'}</h2><form data-av-form="${isTeacher?'create-class':'join-class'}" class="aula-form">${isTeacher?field('Nombre del aula','name','text','','required minlength="2" maxlength="100" placeholder="Ej. English A1 · Grupo de los viernes"'):field('Código del aula','code','text','','required minlength="10" maxlength="14" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Código de 10 caracteres"')}${submit(isTeacher?'Crear aula '+icon('plus'):'Unirme al aula '+icon('arrow-right'))}</form></div>`}<div class="aula-panel aula-role-note"><h2>${isTeacher?'Todo listo para tu próxima clase':'Tu aprendizaje, organizado'}</h2><ul><li>${isTeacher?'Comparte clases, archivos y vocabularios de English.':'Consulta las actividades que tu profesor habilite.'}</li><li>${isTeacher?'Configura exámenes y fechas de entrega.':'Entrega tus tareas y revisa tus resultados.'}</li><li>${isTeacher?'Activa chats, foros y videoconferencias.':'Conversa, pregunta y aprende con tu grupo.'}</li></ul></div></div>${session.user?`<div class="aula-section-title"><h2>Mis aulas</h2><span>${existing.length}</span></div><div class="aula-cards">${existing.map(c=>`<a class="aula-panel aula-class-card" href="#/aula/c-${esc(c.id)}">${tag(isTeacher?'Profesor':'Estudiante')}<h3>${esc(c.name)}</h3><p>Entrar al aula ${icon('arrow-right')}</p></a>`).join('')||blank('Aquí estarán tus aulas',isTeacher?'Crea tu primera aula con el formulario de arriba.':'Introduce un código para unirte a tu primera aula.')}</div>`:''}`);
    }
    function roomView(){
      if(!room)return;clearTimeout(pollTimer);
      const c=room.class;const tabs=Object.keys(labels).filter(k=>k==='home'||(teacher()?true:c.access[k]));
      const live=room.conferences.filter(v=>v.state==='active').length;
      shell(`${accountBar()}<a class="aula-back" href="#/aula/${teacher()?'profesores':'estudiantes'}">${icon('arrow-left')} Mis aulas</a><header class="aula-room-hero"><div><p class="aula-eyebrow">${teacher()?'TU ESPACIO PARA ENSEÑAR':'TU ESPACIO PARA APRENDER'}</p><h1>${esc(c.name)}</h1><p>${teacher()?'Prepara, comparte y acompaña. Todo empieza con una buena clase.':'Un nuevo día para practicar inglés y avanzar con tu grupo.'}</p>${tag(teacher()?'Profesor':'Estudiante','light')}</div><div class="aula-room-code">${teacher()?`<span>Código para estudiantes</span><strong>${esc(c.code)}</strong>${btn(icon('copy')+' Copiar código','copy-code','','aula-btn aula-light')}`:`${icon('graduation-cap')}<strong>Let's do this!</strong><span>Un poquito cada día.</span>`}</div></header><div class="aula-workspace"><nav class="aula-nav" aria-label="Secciones del aula">${tabs.map(k=>btn(`${icon(symbols[k])}<span>${labels[k]}</span>${k==='video'&&live?'<i class="aula-live-dot"></i>':''}`,'tab',`data-tab="${k}" ${tab===k?'aria-current="page"':''}`,'aula-nav-button')).join('')}</nav><div class="aula-main"><div id="aula-live-hint"></div>${detail?detailView():tabView()}</div></div>`);
      if(detail&&['chat','forum'].includes(detail.resource.kind))startMessages();
    }
    function sectionHeader(title,body,extra=''){return `<div class="aula-section-title"><div><h2>${esc(title)}</h2>${body?`<p>${esc(body)}</p>`:''}</div>${extra}</div>`;}
    function resourceCard(r){
      const submission=room.submissions.find(s=>s.resource_id===r.id&&s.user_id===session.user.id);
      const late=r.due&&Date.now()>r.due;
      return `<article class="aula-panel aula-resource"><div class="aula-inline">${tag(kindNames[r.kind])}${teacher()?tag(r.enabled?'Publicado':'Borrador',r.enabled?'green':''):submission?tag(submission.grade===null?'Entregado':`${submission.grade}/100`,'green'):''}</div><h3>${esc(r.title)}</h3><p>${esc(r.body.slice(0,160))||'Abre el contenido para empezar.'}</p>${r.due?`<small class="${late?'aula-deadline-past':'aula-muted'}">${icon('calendar')} ${late?'Plazo finalizado · ':''}${date(r.due)}</small>`:''}<div class="aula-card-actions">${btn('Abrir '+icon('arrow-right'),'resource',`data-id="${r.id}"`,'aula-text')}${teacher()?btn(r.enabled?'Ocultar':'Publicar','toggle-resource',`data-id="${r.id}" data-enabled="${r.enabled?'false':'true'}"`,'aula-text'):''}</div></article>`;
    }
    function tabView(){
      if(tab==='home'){
        const pending=room.resources.filter(r=>['lesson','exam'].includes(r.kind)&&r.enabled&&!room.submissions.some(s=>s.resource_id===r.id&&s.user_id===session.user.id)&&(!r.due||r.due>=Date.now()));
        const agenda=room.resources.filter(r=>r.due&&r.enabled).sort((a,b)=>a.due-b.due);
        return `<div class="aula-stat-grid"><div><span>${teacher()?'Clases preparadas':'Actividades pendientes'}</span><strong>${teacher()?room.resources.filter(r=>r.kind==='lesson').length:pending.length}</strong>${icon('book-open')}</div><div><span>Entregas ${teacher()?'recibidas':'realizadas'}</span><strong>${room.submissions.length}</strong>${icon('clipboard-check')}</div><div><span>Conferencias activas</span><strong>${room.conferences.filter(v=>v.state==='active').length}</strong>${icon('video')}</div></div>${sectionHeader('Tu siguiente paso',teacher()?'Prepara una clase y publícala cuando esté lista.':'Aquí encontrarás las actividades de tu aula.',teacher()?btn('Crear una clase '+icon('plus'),'tab','data-tab="lessons"','aula-btn aula-primary'):btn('Actualizar','refresh'))}<div class="aula-cards">${(teacher()?room.resources:pending).slice(0,4).map(resourceCard).join('')||blank(teacher()?'Tu aula está esperando su primera clase':'Estás al día',teacher()?'Entra a Clases y entregas para preparar el contenido.':'Las nuevas actividades aparecerán aquí cuando el profesor las publique.')}</div>${sectionHeader('Agenda de entregas','Fechas en tu zona horaria: '+timeZone)}<div class="aula-panel aula-agenda">${agenda.map(r=>`<div><div><strong>${esc(r.title)}</strong><span>${kindNames[r.kind]}</span></div><span>${date(r.due)}</span>${btn('Ver','resource',`data-id="${r.id}"`,'aula-text')}</div>`).join('')||'<p class="aula-muted">Todavía no hay fechas de entrega.</p>'}</div>`;
      }
      if(tab==='members')return membersView();
      if(tab==='settings')return settingsView();
      if(tab==='video')return videoView();
      const kind=kinds[tab];const resources=room.resources.filter(r=>r.kind===kind);
      return `${sectionHeader(labels[tab],teacher()?'Los borradores solo son visibles para ti. Publica el contenido cuando esté listo.':'Contenido compartido por tu profesor.')}${teacher()?createForm(kind):''}<div class="aula-cards">${resources.map(resourceCard).join('')||blank('Aún no hay contenido',teacher()?'Prepara el primero con el formulario de arriba.':'Tu profesor publicará aquí el material de esta sección.')}</div>`;
    }
    function createForm(kind){
      const vocab=catalog.materials.filter(m=>m.id.startsWith('vocab:'));
      return `<details class="aula-panel aula-create"><summary>${icon('plus')} ${kind==='lesson'?'Preparar una clase':kind==='vocabulary'?'Compartir vocabulario':kind==='chat'?'Crear un chat grupal':kind==='forum'?'Publicar un foro':'Configurar un examen'}</summary><form data-av-form="create-resource" data-kind="${kind}" class="aula-form">${field('Título','title','text','','required minlength="2" maxlength="140"')}${textArea(kind==='forum'?'Tema y pregunta para el grupo':kind==='chat'?'Descripción del grupo':'Instrucciones o contenido de la clase','body','','maxlength="12000" rows="4"')}${kind==='vocabulary'?select('Vocabulario de English','material',vocab):kind==='lesson'?select('Material de apoyo de English','material',[{id:'',title:'Sin material asociado'},...catalog.materials]):''}${kind==='exam'?`<div class="aula-form-row">${select('Banco de preguntas','source',catalog.examSources)}${field('Cantidad de preguntas','count','number','10','required min="5" max="30"')}</div><p class="aula-muted">Preguntas de opción múltiple con corrección automática. Un intento por estudiante; calificación sobre 100.</p>`:''}${['lesson','exam'].includes(kind)?dueField(null):''}<label class="aula-check"><input name="enabled" type="checkbox"> Publicar ahora para los estudiantes</label><div>${submit('Guardar '+kindNames[kind].toLowerCase())}</div>${kind==='lesson'?'<small class="aula-muted">Después de guardar, abre la clase para adjuntar archivos.</small>':''}</form></details>`;
    }
    function settingsView(){const c=room.class;return `${sectionHeader('Configura tu aula','Decide qué áreas pueden utilizar los estudiantes.')}<form data-av-form="settings" class="aula-panel aula-form">${field('Nombre del aula','name','text',c.name,'required minlength="2" maxlength="100"')}<fieldset><legend>Áreas habilitadas para estudiantes</legend><div class="aula-permissions">${Object.keys(kinds).concat('video').map(k=>`<label class="aula-check"><input type="checkbox" name="${k}" ${c.access[k]?'checked':''}>${icon(symbols[k])} ${labels[k]}</label>`).join('')}</div></fieldset><label class="aula-check"><input type="checkbox" name="joining" ${c.joining?'checked':''}> Permitir nuevos integrantes con el código</label>${submit('Guardar configuración')}</form><div class="aula-panel"><h3>Código de acceso</h3><p>Genera otro código si el actual ya no debe utilizarse. Los integrantes que ya entraron conservan su acceso.</p>${btn('Generar nuevo código','rotate-code')}</div>`;}
    function membersView(){return `${sectionHeader('Integrantes','Solo tú puedes ver los correos y administrar el acceso.')}<div class="aula-panel aula-table-wrap"><table class="aula-table"><thead><tr><th>Estudiante</th><th>Correo</th><th>Se unió</th><th>Acceso</th></tr></thead><tbody>${members.map(m=>`<tr><td>${esc(m.name)}</td><td>${esc(m.email)}</td><td>${date(m.joined)}</td><td>${btn(m.active?'Suspender':'Restablecer','member',`data-id="${m.id}" data-active="${m.active?'false':'true'}"`,'aula-text')}</td></tr>`).join('')}</tbody></table>${members.length?'':blank('Tu grupo empieza aquí','Comparte el código para que tus estudiantes se unan.')}</div>`;}
    function videoCards(){return room.conferences.map(v=>`<article class="aula-panel aula-conference"><div>${tag(v.state==='active'?'Activa':'Finalizada',v.state==='active'?'green':'')}<h3>${esc(v.title)}</h3><p>${date(v.created)}${v.ended?' · Finalizó '+date(v.ended):''}</p></div><div class="aula-card-actions">${v.state==='active'?`${btn(icon('video')+' Entrar','join-video',`data-id="${v.id}"`,'aula-btn aula-primary')}${teacher()?btn('Finalizar','end-video',`data-id="${v.id}"`,'aula-btn aula-danger'):''}`:''}</div></article>`).join('')||blank('Todavía no hay conferencias',teacher()?'Inicia una sala para encontrarte con tu grupo.':'Aquí verás las salas activas y las que ya finalizaron.');}
    function videoView(){return `${sectionHeader('Videoconferencia','Conecta con tu grupo, practica y resuelve dudas en directo.')}<div id="aula-call" class="aula-call" hidden></div><div id="aula-video-lobby">${teacher()?`<form data-av-form="start-video" class="aula-panel aula-form">${field('Nombre de la videoconferencia','title','text','Clase en directo','required minlength="2" maxlength="120"')}${submit('Iniciar videoconferencia '+icon('video'))}</form>`:''}<p class="aula-muted">Hasta 6 personas a la vez. Se solicitará permiso para usar tu cámara y micrófono al entrar.</p><div id="aula-conferences">${videoCards()}</div></div>`;}
    function fileList(files){return files.length?`<ul class="aula-files">${files.map(f=>`<li>${icon('file-text')}<a href="/api/aula/files/${f.id}">${esc(f.name)}</a><small>${(f.size/1024/1024).toFixed(2)} MB</small>${teacher()||f.owner_id===session.user.id?btn('Eliminar','delete-file',`data-id="${f.id}"`,'aula-text'):''}</li>`).join('')}</ul>`:'';}
    function uploadForm(){return `<form data-av-form="upload" class="aula-upload"><label class="aula-field"><span>Adjuntar archivo</span><input type="file" name="file" required accept=".pdf,.txt,.png,.jpg,.jpeg,.mp3,.mp4,.docx,.pptx"></label><small class="aula-muted">Hasta 15 MB por archivo · máximo 5 archivos.</small>${submit('Subir archivo')}</form>`;}
    function materialView(material){
      if(!material)return '';
      if(material.words)return `<div class="aula-panel"><div class="aula-section-title"><h3>Material de English · ${material.words.length} palabras</h3>${btn('Practicar palabras','practice','','aula-btn aula-primary')}</div><div id="aula-practice"></div><div class="aula-word-grid">${material.words.map(w=>`<div><div><strong lang="en">${esc(w.en)}</strong>${btn(icon('volume-2'),'speak',`data-text="${esc(w.en)}" aria-label="Escuchar ${esc(w.en)}"`,'aula-sound')}</div>${w.past?`<small>${esc(w.past)} · ${esc(w.participle)}</small>`:''}<span>${esc(w.es)}</span></div>`).join('')}</div></div>`;
      return `<div class="aula-panel aula-reading"><p class="aula-eyebrow">MATERIAL DE ENGLISH</p><h3>${esc(material.title)}</h3><p class="aula-pre" ${material.text?'lang="en"':''}>${esc(material.body||material.text)}</p>${material.en?`<blockquote lang="en">${esc(material.en)}</blockquote><p>${esc(material.es)}</p>`:''}${material.translation?`<details><summary>Ver traducción</summary><p>${esc(material.translation)}</p></details>`:''}</div>`;
    }
    function detailView(){
      const r=detail.resource;const mine=detail.submissions.find(s=>s.user_id===session.user.id);const closed=r.due&&Date.now()>r.due;
      return `${btn(icon('arrow-left')+' Volver','back-resource','','aula-back')}<div class="aula-panel"><div class="aula-inline">${tag(kindNames[r.kind])}${teacher()?tag(r.enabled?'Publicado':'Borrador',r.enabled?'green':''):''}</div><h2>${esc(r.title)}</h2><p class="aula-pre">${esc(r.body)}</p>${r.due?`<p class="${closed?'aula-deadline-past':'aula-muted'}">${icon('calendar')} ${closed?'Plazo finalizado · ':''}Entrega: ${date(r.due)}</p>`:''}${fileList(detail.files.filter(f=>!f.submission_id))}</div>${teacher()?`<details class="aula-panel"><summary>Editar ${kindNames[r.kind].toLowerCase()}</summary><form data-av-form="edit-resource" class="aula-form">${field('Título','title','text',r.title,'required minlength="2" maxlength="140"')}${textArea('Contenido e instrucciones','body',r.body,'maxlength="12000"')}${['lesson','exam'].includes(r.kind)?dueField(r.due):''}<label class="aula-check"><input type="checkbox" name="enabled" ${r.enabled?'checked':''}> Publicado para estudiantes</label>${submit('Guardar cambios')}</form>${r.kind==='lesson'?uploadForm():''}</details>`:''}${materialView(detail.material)}${r.kind==='lesson'&&!teacher()?`<div class="aula-panel"><h3>Mi entrega</h3>${mine?`<p>${tag('Entregado','green')} ${date(mine.updated)} ${mine.grade===null?'':tag(mine.grade+'/100','green')}</p>${mine.feedback?`<p class="aula-feedback">${esc(mine.feedback)}</p>`:''}`:''}${closed?`<p class="aula-muted">La entrega está cerrada.</p>${mine?`<p class="aula-pre">${esc(mine.body)}</p>`:''}`:`<form data-av-form="submission" class="aula-form">${textArea('Tu respuesta','body',mine?.body||'','required maxlength="12000" rows="5"')}${submit(mine?'Actualizar entrega':'Entregar actividad')}</form>`}${mine?fileList(detail.files.filter(f=>f.submission_id===mine.id))+(closed?'':uploadForm()):''}</div>`:''}${r.kind==='exam'?examView(mine,closed):''}${['chat','forum'].includes(r.kind)?`<div class="aula-panel aula-discussion"><h3>${r.kind==='chat'?'Conversación del grupo':'Respuestas del foro'}</h3><div id="aula-messages" class="aula-messages" role="log" aria-live="polite">${messagesHTML(detail.messages)}</div><form data-av-form="message" class="aula-form">${textArea('Escribe al grupo','body','','required maxlength="3000" rows="2"')}${submit('Enviar '+icon('send'))}</form></div>`:''}${teacher()&&['lesson','exam'].includes(r.kind)?submissionsView():''}`;
    }
    function examView(mine,closed){
      if(!teacher()&&mine)return `<div class="aula-panel aula-result">${icon('clipboard-check')}<h3>Examen entregado</h3><strong>${mine.grade} <small>/100</small></strong><p>Entregado el ${date(mine.created)}. Tu profesor puede revisar tu resultado.</p>${mine.feedback?`<p>${esc(mine.feedback)}</p>`:''}</div>`;
      if(!teacher()&&closed)return blank('El examen está cerrado','La fecha de entrega ya terminó.');
      return `<div class="aula-panel"><h3>${teacher()?'Vista del profesor · respuestas incluidas':'Mi examen'}</h3><p class="aula-muted">${teacher()?'Las soluciones no se envían a los estudiantes.':'Tienes un intento. Revisa tus respuestas antes de entregar.'}</p><form data-av-form="exam" class="aula-form">${(detail.questions||[]).map((q,i)=>`<fieldset class="aula-question"><legend>${i+1}. ${esc(q.prompt)}</legend>${q.options.map((o,j)=>`<label class="aula-answer"><input type="radio" name="q${i}" value="${j}" ${teacher()?'disabled':'required'}>${esc(o)}${teacher()&&q.answer===j?tag('Correcta','green'):''}</label>`).join('')}</fieldset>`).join('')}${teacher()?'':submit('Entregar examen')}</form></div>`;
    }
    function submissionsView(){return `<div class="aula-panel"><h3>Entregas recibidas · ${detail.submissions.length}</h3>${detail.submissions.map(s=>`<details class="aula-submission"><summary><span>${esc(s.name)} · ${date(s.updated)}</span>${tag(s.grade===null?'Por revisar':s.grade+'/100',s.grade===null?'':'green')}</summary>${detail.resource.kind==='lesson'?`<p class="aula-pre">${esc(s.body)}</p>`:`<ol>${JSON.parse(s.body).map((a,i)=>`<li>${esc(detail.questions?.[i]?.prompt)}<br><strong>${esc(detail.questions?.[i]?.options[a])}</strong></li>`).join('')}</ol>`}${fileList(detail.files.filter(f=>f.submission_id===s.id))}<form data-av-form="grade" data-id="${s.id}" class="aula-form">${field('Calificación sobre 100','grade','number',s.grade??'','min="0" max="100" step="1"')}${textArea('Comentario para el estudiante','feedback',s.feedback,'maxlength="3000"')}${submit('Guardar revisión')}</form></details>`).join('')||'<p class="aula-muted">Las entregas de tus estudiantes aparecerán aquí.</p>'}</div>`;}
    function messagesHTML(messages){return messages.map(m=>`<article class="aula-message ${m.user_id===session.user.id?'mine':''}" data-message="${m.id}"><div><strong>${esc(m.name)}</strong><time>${date(m.created)}</time></div><p>${esc(m.body)}</p></article>`).join('');}
    function startMessages(){
      clearTimeout(pollTimer);const id=detail?.resource.id;const token=serial;
      pollTimer=setTimeout(async()=>{if(!host?.isConnected||id!==detail?.resource.id||token!==serial)return;try{
        const after=detail.messages.at(-1)?.id||0;const response=await api(`resources/${id}/messages?after=${after}`);if(id!==detail?.resource.id||token!==serial)return;
        if(response.messages.length){detail.messages.push(...response.messages);const log=host.querySelector('#aula-messages');if(log){log.insertAdjacentHTML('beforeend',messagesHTML(response.messages));log.scrollTop=log.scrollHeight;}}
        startMessages();
      }catch(e){notice(e.message,true);}},3000);
    }
    async function refreshRoom(redraw=true){
      const id=room?.class.id;if(!id)return;const token=serial;const next=await api('classes/'+id);if(token!==serial||room?.class.id!==id)return;
      room=next;if(detail){detail=await api('resources/'+detail.resource.id);if(token!==serial)return;}
      if(redraw)roomView();
    }
    async function openResource(id){
      const token=serial;const next=await api('resources/'+id);if(token!==serial)return;detail=next;practice=null;roomView();
    }
    function practiceView(){
      const target=host?.querySelector('#aula-practice');if(!target||!practice)return;
      const w=practice.words[practice.index%practice.words.length];target.innerHTML=`<div class="aula-flashcard"><p>PALABRA ${practice.index%practice.words.length+1} DE ${practice.words.length}</p><strong lang="en">${esc(w.en)}</strong>${practice.reveal?`<span>${esc(w.es)}</span>`:'<span>¿Recuerdas su significado?</span>'}<div>${btn(icon('volume-2')+' Escuchar','speak',`data-text="${esc(w.en)}"`)}${btn(practice.reveal?'Siguiente palabra':'Mostrar traducción',practice.reveal?'practice-next':'practice-reveal','','aula-btn aula-primary')}</div></div>`;
    }
    async function click(event){
      const target=event.target.closest('[data-av-action]');if(!target||!host?.contains(target))return;event.preventDefault();const action=target.dataset.avAction;
      if(busy)return;
      try{
        if(action==='auth-mode'){authMode=authMode==='login'?'register':'login';rolePage();return;}
        if(action==='logout'){await video?.leave();await api('auth/logout','POST',{});session.user=null;room=null;classes=[];location.hash='#/aula';if(route==='')landing();return;}
        if(action==='copy-code'){try{await navigator.clipboard.writeText(room.class.code);notice('Código copiado. Compártelo con tus estudiantes.');}catch{notice('Código del aula: '+room.class.code);}return;}
        if(action==='speak'){if(!('speechSynthesis' in window)){notice('Tu navegador no tiene lectura de voz disponible.',true);return;}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(target.dataset.text);utterance.lang='en-US';utterance.rate=.8;speechSynthesis.speak(utterance);return;}
        if(action.startsWith('practice')){if(action==='practice')practice={words:detail.material.words,index:0,reveal:false};if(action==='practice-reveal')practice.reveal=true;if(action==='practice-next'){practice.index++;practice.reveal=false;}practiceView();return;}
        if(action==='tab'){await video?.leave();tab=target.dataset.tab;detail=null;clearTimeout(pollTimer);if(tab==='members')members=(await api(`classes/${room.class.id}/members`)).members;await refreshRoom();return;}
        if(action==='back-resource'){detail=null;clearTimeout(pollTimer);await refreshRoom();return;}
        if(action==='resource'){await openResource(target.dataset.id);return;}
        if(action==='refresh'){await refreshRoom();return;}
        if(action==='retry'){await mount(host,route,true);return;}
        if(action==='toggle-resource'){await api(`resources/${target.dataset.id}`,'PATCH',{enabled:target.dataset.enabled==='true'});await refreshRoom();return;}
        if(action==='member'){await api(`classes/${room.class.id}/members/${target.dataset.id}`,'PATCH',{active:target.dataset.active==='true'});members=(await api(`classes/${room.class.id}/members`)).members;roomView();return;}
        if(action==='rotate-code'){await api(`classes/${room.class.id}`,'PATCH',{rotateCode:true});await refreshRoom();notice('Nuevo código generado. El anterior ya no permite unirse.');return;}
        if(action==='delete-file'){await api(`files/${target.dataset.id}`,'DELETE',{});await refreshRoom();return;}
        if(action==='join-video'){
          if(!video)video=root.createAulaVideo({api,icon,esc,onError:message=>notice(message,true),onEnded:async()=>{try{await refreshRoom();}catch(e){notice(e.message,true);}}});
          await video.join(target.dataset.id,host.querySelector('#aula-call'),host.querySelector('#aula-video-lobby'),session.user);return;
        }
        if(action==='end-video'){if(!confirm('¿Finalizar esta videoconferencia para todo el grupo?'))return;await api(`conferences/${target.dataset.id}/end`,'POST',{});await video?.leave();await refreshRoom();return;}
      }catch(e){notice(e.message,true);}
    }
    async function submitForm(event){
      const form=event.target.closest('[data-av-form]');if(!form||!host?.contains(form))return;event.preventDefault();event.stopPropagation();if(busy)return;
      const f=new FormData(form);const value=Object.fromEntries(f);const action=form.dataset.avForm;
      const token=serial;
      const call=async(...args)=>{const result=await api(...args);if(token!==serial){const error=new Error('Vista cerrada');error.cancelled=true;throw error;}return result;};
      const button=form.querySelector('[type="submit"]');busy=true;if(button)button.disabled=true;notice('Guardando…');
      try{
        if(action==='auth'){const result=await call(`auth/${authMode}`,'POST',value);session.user=result.user;classes=(await call('classes')).classes;catalog=await call('catalog');rolePage();}
        if(action==='create-class'){const result=await call('classes','POST',value);location.hash='#/aula/c-'+result.class.id;}
        if(action==='join-class'){const result=await call('join','POST',value);location.hash='#/aula/c-'+result.id;}
        if(action==='create-resource'){
          const result=await call(`classes/${room.class.id}/resources`,'POST',{...value,kind:form.dataset.kind,count:Number(value.count),enabled:f.has('enabled'),due:value.due?new Date(value.due).getTime():null});
          await refreshRoom(false);await openResource(result.id);
        }
        if(action==='edit-resource'){await call(`resources/${detail.resource.id}`,'PATCH',{...value,enabled:f.has('enabled'),...(f.has('due')?{due:value.due?new Date(value.due).getTime():null}:{})});await refreshRoom();}
        if(action==='settings'){const access=Object.fromEntries(Object.keys(kinds).concat('video').map(k=>[k,f.has(k)]));await call(`classes/${room.class.id}`,'PATCH',{name:value.name,access,joining:f.has('joining')});await refreshRoom();}
        if(action==='submission'||action==='exam'){
          const payload=action==='exam'?{answers:detail.questions.map((_,i)=>Number(value['q'+i]))}:{body:value.body};
          await call(`resources/${detail.resource.id}/submissions`,'POST',payload);await refreshRoom();
        }
        if(action==='grade'){await call(`submissions/${form.dataset.id}`,'PATCH',{grade:value.grade===''?null:Number(value.grade),feedback:value.feedback});await refreshRoom();}
        if(action==='upload'){const file=f.get('file');if(!file?.size)throw new Error('Selecciona un archivo.');if(file.size>15*1024*1024)throw new Error('El archivo supera el máximo de 15 MB.');await call(`resources/${detail.resource.id}/files`,'POST',file);await refreshRoom();}
        if(action==='message'){await call(`resources/${detail.resource.id}/messages`,'POST',{body:value.body});form.reset();clearTimeout(pollTimer);const next=await call('resources/'+detail.resource.id);detail.messages=next.messages;host.querySelector('#aula-messages').innerHTML=messagesHTML(next.messages);const log=host.querySelector('#aula-messages');log.scrollTop=log.scrollHeight;startMessages();}
        if(action==='start-video'){await call(`classes/${room.class.id}/conferences`,'POST',{title:value.title});await refreshRoom();}
        if(token===serial)notice(action==='message'?'Mensaje enviado.':'Guardado correctamente.');
      }catch(e){if(!e.cancelled&&token===serial)notice(e.message,true);}finally{busy=false;if(button?.isConnected)button.disabled=false;}
    }
    function scheduleRoom(){
      clearTimeout(roomTimer);const token=serial;
      roomTimer=setTimeout(async()=>{if(!room||!host?.isConnected||token!==serial)return;
        try{const fresh=await api('classes/'+room.class.id);if(token!==serial)return;
          const previouslyAllowed=room.class.access;room.class=fresh.class;room.conferences=fresh.conferences;
          if(!teacher()&&((tab!=='home'&&!room.class.access[tab]&&previouslyAllowed[tab])||(detail&&!fresh.resources.some(r=>r.id===detail.resource.id)))){await video?.leave();detail=null;tab='home';room=fresh;roomView();notice('Tu profesor ha actualizado las áreas disponibles.');}
          else if(tab==='video'&&!video?.active){const list=host.querySelector('#aula-conferences');if(list)list.innerHTML=videoCards();}
          else if(room.conferences.some(v=>v.state==='active')){const hint=host.querySelector('#aula-live-hint');if(hint&&tab!=='video')hint.innerHTML=`<div class="aula-live-banner">${icon('video')} Hay una videoconferencia activa. ${btn('Ir a la sala','tab','data-tab="video"','aula-text')}</div>`;}
          else {const hint=host.querySelector('#aula-live-hint');if(hint)hint.innerHTML='';}
        }catch(e){if([401,403,404].includes(e.status)){await video?.leave();room=null;detail=null;shell(`<div class="aula-panel"><h1>Acceso al aula</h1><p>${esc(e.message)}</p><a class="aula-btn" href="#/aula">Volver a Aula virtual</a></div>`);return;}notice(e.message,true);}
        scheduleRoom();
      },10000);
    }
    async function mount(node,nextRoute='',force=false){
      if(!force&&host===node&&route===nextRoute&&node.querySelector('.aula'))return;
      leave();host=node;route=nextRoute;const token=++serial;host.addEventListener('click',click);host.addEventListener('submit',submitForm);
      shell('<div class="aula-empty" role="status"><h1>Aula virtual</h1><p>Conectando con tu espacio de aprendizaje…</p></div>');
      try{
        const current=await api('session');if(token!==serial)return;session=current;
        if(session.user){const results=await Promise.all([api('classes'),api('catalog')]);if(token!==serial)return;classes=results[0].classes;catalog=results[1];}
        if(route.startsWith('c-')){
          if(!session.user){location.hash='#/aula/estudiantes';return;}
          room=await api('classes/'+route.slice(2));if(token!==serial)return;tab='home';detail=null;roomView();scheduleRoom();
        }else if(['profesores','estudiantes'].includes(route))rolePage();else landing();
      }catch(e){if(token!==serial)return;shell(`<a class="aula-back" href="#/inicio">${icon('arrow-left')} Inicio</a><div class="aula-panel"><h1>Aula virtual</h1><p>${esc(e.message)}</p>${btn('Volver a intentar','retry','','aula-btn aula-primary')}</div>`);}
    }
    function leave(){serial++;clearTimeout(pollTimer);clearTimeout(roomTimer);video?.leave();host?.removeEventListener('click',click);host?.removeEventListener('submit',submitForm);host=null;room=null;detail=null;practice=null;}
    return {mount,leave,api};
  };
})(globalThis);
