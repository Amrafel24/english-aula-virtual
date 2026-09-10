// API de Aula virtual: misma autorización en Node/SQLite y Sites/D1.
export const AREAS = ['lessons','materials','chats','forums','tests','video'];
const areaFor = {lesson:'lessons',vocabulary:'materials',chat:'chats',forum:'forums',exam:'tests'};
const MAX_FILE = 15 * 1024 * 1024;
export class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
export const fail=(status,message)=>{throw new HttpError(status,message);};
export const uid=()=>crypto.randomUUID();
export const json=(value,status=200,headers={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
export const str=(value,min=1,max=160)=>{if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)fail(400,`Escribe entre ${min} y ${max} caracteres.`);return value.trim();};
export async function readBytes(request,max){
  if(Number(request.headers.get('content-length'))>max)fail(413,'El archivo o mensaje es demasiado grande.');
  const reader=request.body?.getReader(); if(!reader)return new Uint8Array();
  const chunks=[];let size=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();fail(413,'El archivo o mensaje es demasiado grande.');}chunks.push(value);}}
  finally{reader.releaseLock();}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}return bytes;
}
export async function readJSON(request){
  if(!request.headers.get('content-type')?.startsWith('application/json'))fail(415,'Se esperaba una solicitud JSON.');
  try{const value=JSON.parse(new TextDecoder().decode(await readBytes(request,128000)));if(!value||typeof value!=='object'||Array.isArray(value))fail(400,'Solicitud no válida.');return value;}catch(e){if(e instanceof HttpError)throw e;fail(400,'Solicitud no válida.');}
}
export const first=(db,sql,...args)=>db.prepare(sql).bind(...args).first();
export const all=async(db,sql,...args)=>(await db.prepare(sql).bind(...args).all()).results;
export const run=(db,sql,...args)=>db.prepare(sql).bind(...args).run();
export async function videoIceConfig(env,user,now=Date.now()){
  let servers;
  try{
    servers=JSON.parse(env.ENGLISH_ICE_SERVERS||'[]');
    if(!Array.isArray(servers)||servers.length>10)throw new Error();
    for(const s of servers){const urls=Array.isArray(s.urls)?s.urls:[s.urls];if(!urls.length||urls.some(u=>typeof u!=='string'||!/^stuns?:|^turns?:/.test(u)))throw new Error();}
    if(env.ENGLISH_TURN_SECRET){
      const urls=JSON.parse(env.ENGLISH_TURN_URLS||'[]');if(!Array.isArray(urls)||!urls.length||urls.some(u=>typeof u!=='string'||!/^turns?:/.test(u)))throw new Error();
      const username=`${Math.floor(now/1000)+3600}:${user.id}`;
      const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.ENGLISH_TURN_SECRET),{name:'HMAC',hash:'SHA-1'},false,['sign']);
      const signed=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(username)));
      servers.push({urls,username,credential:btoa(String.fromCharCode(...signed))});
    }
  }catch{fail(503,'La conexión de las videoconferencias no está configurada correctamente. Contacta con el administrador.');}
  return servers;
}
export async function rate(db,key,max,windowMs,now=Date.now()){
  const row=await first(db,`INSERT INTO aula_limits(id,hits,expires) VALUES(?,1,?) ON CONFLICT(id) DO UPDATE SET hits=CASE WHEN expires<=? THEN 1 ELSE hits+1 END, expires=CASE WHEN expires<=? THEN excluded.expires ELSE expires END RETURNING hits`,key,now+windowMs,now,now);
  if(row.hits>max)fail(429,'Has hecho demasiados intentos. Espera unos minutos e inténtalo de nuevo.');
}
export function checkOrigin(request){
  if(['GET','HEAD'].includes(request.method))return;
  const origin=request.headers.get('origin');
  if(!origin||origin!==new URL(request.url).origin||request.headers.get('x-english-request')!=='aula')fail(403,'Solicitud de otro origen bloqueada. Recarga English.');
}
function due(value){if(value===null||value===''||value===undefined)return null;const n=Number(value);if(!Number.isSafeInteger(n)||n<0||n>4102444800000)fail(400,'Fecha de entrega no válida.');return n;}
function boolean(value){if(typeof value!=='boolean')fail(400,'Selecciona una opción válida.');return value?1:0;}
function code(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';const bytes=crypto.getRandomValues(new Uint8Array(10));return Array.from(bytes,b=>chars[b%chars.length]).join('');}
function shuffle(array){const a=[...array];for(let i=a.length-1;i>0;i--){const n=crypto.getRandomValues(new Uint32Array(1))[0];const j=n%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function pickQuestion(prompt,answer,distractors){const options=shuffle([answer,...shuffle([...new Set(distractors)].filter(x=>x!==answer)).slice(0,3)]);return {prompt,options,answer:options.indexOf(answer)};}
export function materialCatalog(data){return [
  ...data.categories.map(c=>({id:`vocab:${c.id}`,title:c.name,type:'Vocabulario',count:c.words.length})),
  ...data.grammar.map((g,i)=>({id:`grammar:${i}`,title:g.title,type:'Gramática'})),
  ...data.readings.map((r,i)=>({id:`reading:${i}`,title:r.title,type:'Lectura'})),
  {id:'verbs:regular',title:'Verbos regulares',type:'Verbos',count:data.regularVerbs.length},
  {id:'verbs:irregular',title:'Verbos irregulares',type:'Verbos',count:data.irregularVerbs.length}
];}
function materialData(data,id){
  const [type,key]=id.split(':');
  if(type==='vocab')return {type,words:data.categories.find(c=>c.id===key).words};
  if(type==='grammar')return {type,...data.grammar[Number(key)]};
  if(type==='reading')return {type,...data.readings[Number(key)]};
  return {type,words:(key==='regular'?data.regularVerbs:data.irregularVerbs).map(([en,past,participle,es])=>({en,past,participle,es}))};
}
export function examQuestions(data,source,count){
  let bank;
  if(source==='exercises')bank=data.exercises.map(q=>({prompt:q.question,options:q.options,answer:q.answer}));
  else if(source==='verbs:regular'||source==='verbs:irregular'){
    const verbs=source.endsWith('irregular')?data.irregularVerbs:data.regularVerbs;
    bank=verbs.map(v=>pickQuestion(`¿Cuál es el pasado de «${v[0]}» (${v[3]})?`,v[1],verbs.map(x=>x[1])));
  }else{const c=data.categories.find(c=>`vocab:${c.id}`===source);if(!c)fail(400,'Selecciona un vocabulario válido.');bank=c.words.map(w=>pickQuestion(`¿Qué significa «${w.en}»?`,w.es,c.words.map(x=>x.es)));}
  if(!Number.isInteger(count)||count<5||count>Math.min(30,bank.length))fail(400,'El examen debe tener entre 5 y 30 preguntas.');
  return shuffle(bank).slice(0,count);
}
export function createAula({db,storage,auth,data,iceServers=async()=>[],now=()=>Date.now(),diagnose=()=>{}}){
  const catalog=materialCatalog(data);
  async function classAccess(id,user,teacherOnly=false){
    const c=await first(db,'SELECT * FROM aula_classrooms WHERE id=?',id);
    if(!c)fail(404,'Aula no encontrada.');
    c.role=c.teacher_id===user.id?'teacher':'student';c.access=JSON.parse(c.access);
    if(c.role!=='teacher'){
      const member=await first(db,'SELECT active FROM aula_members WHERE class_id=? AND user_id=?',id,user.id);
      if(!member?.active)fail(403,'No tienes acceso a esta aula. Pide un código a tu profesor.');
      if(teacherOnly)fail(403,'Esta acción corresponde al profesor.');
    }
    return c;
  }
  async function resourceAccess(id,user,teacherOnly=false){
    const r=await first(db,'SELECT * FROM aula_resources WHERE id=?',id);
    if(!r)fail(404,'Recurso no encontrado.');const c=await classAccess(r.class_id,user,teacherOnly);
    if(c.role==='student'&&(!r.enabled||!c.access[areaFor[r.kind]]))fail(403,'Tu profesor no ha habilitado este recurso.');
    r.settings=JSON.parse(r.settings);return {r,c};
  }
  function publicResource(r,teacher){const copy={...r,settings:typeof r.settings==='string'?JSON.parse(r.settings):r.settings};if(r.kind==='exam'&&!teacher){copy.settings={source:copy.settings.source,count:copy.settings.count};}return copy;}
  function publicClass(c){const copy={...c};if(c.role!=='teacher'){delete copy.code;delete copy.joining;}return copy;}
  function checkDue(r){if(r.due!==null&&now()>r.due)fail(409,'La fecha de entrega ya terminó. Pide una ampliación al profesor.');}
  async function conferenceAccess(id,user,active=true){const c=await first(db,'SELECT * FROM aula_conferences WHERE id=?',id);if(!c)fail(404,'Videoconferencia no encontrada.');const room=await classAccess(c.class_id,user);if(room.role==='student'&&!room.access.video)fail(403,'Videoconferencia deshabilitada por el profesor.');if(active&&c.state!=='active')fail(409,'La videoconferencia ha finalizado.');return {c,room};}
  async function peerAccess(conferenceId,peerId,user){const p=await first(db,'SELECT * FROM aula_peers WHERE id=? AND conference_id=? AND user_id=? AND seen>?',peerId,conferenceId,user.id,now()-45000);if(!p)fail(403,'Vuelve a entrar a la videoconferencia.');return p;}
  async function handler(request){
    checkOrigin(request);
    const url=new URL(request.url);const parts=url.pathname.replace(/^\/api\/aula\/?/,'').split('/').filter(Boolean);const method=request.method;
    if(!db)fail(503,'El aula no está conectada todavía. Contacta con el administrador.');
    const authResponse=await auth.handle?.(request,parts);if(authResponse)return authResponse;
    const user=await auth.user(request);
    if(parts[0]==='session'&&method==='GET')return json({user:user?{id:user.id,name:user.name,email:user.email}:null,mode:auth.mode});
    if(!user)fail(401,'Inicia sesión para entrar al aula.');
    if(method!=='GET'&&!['signals','poll'].includes(parts[2]))await rate(db,`write:${user.id}`,120,60000,now());
    if(parts[0]==='catalog'&&method==='GET')return json({materials:catalog,examSources:[...catalog.filter(c=>c.id.startsWith('vocab:')||c.id.startsWith('verbs:')),{id:'exercises',title:'Gramática · ejercicios de English'}]});
    if(parts[0]==='classes'&&parts.length===1){
      if(method==='GET'){
        const rows=await all(db,`SELECT c.*,CASE WHEN c.teacher_id=? THEN 'teacher' ELSE 'student' END AS role FROM aula_classrooms c WHERE c.teacher_id=? OR c.id IN(SELECT class_id FROM aula_members WHERE user_id=? AND active=1) ORDER BY c.created DESC`,user.id,user.id,user.id);
        return json({classes:rows.map(c=>publicClass({...c,access:JSON.parse(c.access)}))});
      }
      if(method==='POST'){
        const b=await readJSON(request);await rate(db,`create:${user.id}`,20,86400000,now());
        const c={id:uid(),name:str(b.name,2,100),teacher_id:user.id,code:code(),access:Object.fromEntries(AREAS.map(k=>[k,true])),created:now()};
        await run(db,'INSERT INTO aula_classrooms(id,name,teacher_id,code,access,created) VALUES(?,?,?,?,?,?)',c.id,c.name,c.teacher_id,c.code,JSON.stringify(c.access),c.created);
        return json({class:{...c,role:'teacher',joining:1}},201);
      }
    }
    if(parts[0]==='join'&&method==='POST'){
      await rate(db,`join:${user.id}`,12,600000,now());const b=await readJSON(request);const value=str(b.code,10,14).replace(/[\s-]/g,'').toUpperCase();
      const c=await first(db,'SELECT * FROM aula_classrooms WHERE code=? AND joining=1',value);
      if(!c)fail(404,'El código no es válido o el aula ya no acepta integrantes.');
      const member=await first(db,'SELECT active FROM aula_members WHERE class_id=? AND user_id=?',c.id,user.id);
      if(member&&!member.active)fail(403,'Tu acceso está suspendido. Contacta con el profesor.');
      if(c.teacher_id!==user.id)await run(db,'INSERT INTO aula_members(class_id,user_id,joined) VALUES(?,?,?) ON CONFLICT(class_id,user_id) DO NOTHING',c.id,user.id,now());
      return json({id:c.id});
    }
    if(parts[0]==='classes'&&parts[1]){
      const c=await classAccess(parts[1],user);const teacher=c.role==='teacher';
      if(parts.length===2&&method==='GET'){
        const resources=await all(db,'SELECT * FROM aula_resources WHERE class_id=? ORDER BY created DESC',c.id);
        const submissions=await all(db,`SELECT s.id,s.resource_id,s.user_id,s.grade,s.feedback,s.created,s.updated,u.name FROM aula_submissions s JOIN aula_resources r ON r.id=s.resource_id JOIN aula_users u ON u.id=s.user_id WHERE r.class_id=?${teacher?'':' AND s.user_id=?'}`,c.id,...teacher?[]:[user.id]);
        const visible=resources.filter(r=>teacher||(r.enabled&&c.access[areaFor[r.kind]]));const ids=new Set(visible.map(r=>r.id));
        const conferences=teacher||c.access.video?await all(db,'SELECT * FROM aula_conferences WHERE class_id=? ORDER BY created DESC LIMIT 30',c.id):[];
        return json({class:publicClass(c),resources:visible.map(r=>publicResource(r,teacher)),submissions:submissions.filter(s=>ids.has(s.resource_id)),conferences});
      }
      if(parts.length===2&&method==='PATCH'){
        if(!teacher)fail(403,'Solo el profesor puede configurar el aula.');const b=await readJSON(request);
        const access={...c.access};if(b.access){for(const key of AREAS)if(key in b.access)access[key]=!!boolean(b.access[key]);}
        const join=b.joining===undefined?c.joining:boolean(b.joining);const newCode=b.rotateCode===true?code():c.code;
        await run(db,'UPDATE aula_classrooms SET name=?,access=?,joining=?,code=? WHERE id=?',b.name===undefined?c.name:str(b.name,2,100),JSON.stringify(access),join,newCode,c.id);
        return json({ok:true,code:newCode});
      }
      if(parts[2]==='members'){
        if(!teacher)fail(403,'La información de los integrantes es privada para el profesor.');
        if(method==='GET')return json({members:await all(db,'SELECT u.id,u.name,u.email,m.joined,m.active FROM aula_members m JOIN aula_users u ON u.id=m.user_id WHERE m.class_id=? ORDER BY m.joined',c.id)});
        if(method==='PATCH'&&parts[3]){const b=await readJSON(request);await run(db,'UPDATE aula_members SET active=? WHERE class_id=? AND user_id=?',boolean(b.active),c.id,parts[3]);return json({ok:true});}
      }
      if(parts[2]==='resources'&&method==='POST'){
        if(!teacher)fail(403,'Solo el profesor puede crear contenido.');const b=await readJSON(request);
        if(!Object.hasOwn(areaFor,b.kind))fail(400,'Tipo de recurso no válido.');
        const material=b.material?str(b.material):null;
        if(material&&!catalog.some(m=>m.id===material))fail(400,'Material no encontrado.');
        if(b.kind==='vocabulary'&&!material?.startsWith('vocab:'))fail(400,'Selecciona un vocabulario para compartir.');
        let settings={};if(b.kind==='exam'){settings={source:str(b.source),count:Number(b.count)};settings.questions=examQuestions(data,settings.source,settings.count);}
        const id=uid();await run(db,'INSERT INTO aula_resources(id,class_id,kind,title,body,material,settings,enabled,due,created,updated) VALUES(?,?,?,?,?,?,?,?,?,?,?)',id,c.id,b.kind,str(b.title,2,140),str(b.body??'',0,12000),material,JSON.stringify(settings),boolean(b.enabled??false),['lesson','exam'].includes(b.kind)?due(b.due):null,now(),now());
        return json({id},201);
      }
      if(parts[2]==='conferences'&&method==='POST'){
        if(!teacher)fail(403,'Solo el profesor puede iniciar la conferencia.');const b=await readJSON(request);
        if(await first(db,"SELECT id FROM aula_conferences WHERE class_id=? AND state='active'",c.id))fail(409,'Ya hay una videoconferencia activa.');
        const id=uid();await run(db,"INSERT INTO aula_conferences(id,class_id,title,state,created) VALUES(?,?,?,'active',?)",id,c.id,str(b.title,2,120),now());return json({id},201);
      }
    }
    if(parts[0]==='resources'&&parts[1]){
      const {r,c}=await resourceAccess(parts[1],user);const teacher=c.role==='teacher';
      if(parts.length===2&&method==='GET'){
        const submissions=await all(db,`SELECT s.*,u.name FROM aula_submissions s JOIN aula_users u ON u.id=s.user_id WHERE resource_id=?${teacher?'':' AND user_id=?'} ORDER BY s.created`,r.id,...teacher?[]:[user.id]);
        const files=await all(db,`SELECT id,submission_id,name,size,owner_id,created FROM aula_files WHERE resource_id=?${teacher?'':' AND (submission_id IS NULL OR owner_id=?)'}`,r.id,...teacher?[]:[user.id]);
        let questions;
        if(r.kind==='exam'&&(teacher||!submissions.length))questions=r.settings.questions.map(q=>teacher?q:{prompt:q.prompt,options:q.options});
        const msgs=['chat','forum'].includes(r.kind)?await all(db,'SELECT m.id,m.user_id,m.body,m.created,u.name FROM aula_messages m JOIN aula_users u ON u.id=m.user_id WHERE resource_id=? ORDER BY m.id DESC LIMIT 100',r.id):[];
        return json({resource:publicResource(r,teacher),material:r.material?materialData(data,r.material):null,submissions,files,questions,messages:msgs.reverse()});
      }
      if(parts.length===2&&method==='PATCH'){
        if(!teacher)fail(403,'Solo el profesor puede editar el contenido.');const b=await readJSON(request);
        await run(db,'UPDATE aula_resources SET title=?,body=?,enabled=?,due=?,updated=? WHERE id=?',b.title===undefined?r.title:str(b.title,2,140),b.body===undefined?r.body:str(b.body,0,12000),b.enabled===undefined?r.enabled:boolean(b.enabled),b.due===undefined?r.due:due(b.due),now(),r.id);return json({ok:true});
      }
      if(parts[2]==='messages'&&method==='GET'){
        if(!['chat','forum'].includes(r.kind))fail(400,'Este recurso no tiene conversación.');
        const after=Number(url.searchParams.get('after')||0);if(!Number.isSafeInteger(after)||after<0)fail(400,'Cursor no válido.');
        return json({messages:await all(db,'SELECT m.id,m.user_id,m.body,m.created,u.name FROM aula_messages m JOIN aula_users u ON u.id=m.user_id WHERE resource_id=? AND m.id>? ORDER BY m.id LIMIT 100',r.id,after)});
      }
      if(parts[2]==='messages'&&method==='POST'){
        if(!['chat','forum'].includes(r.kind))fail(400,'Este recurso no tiene conversación.');const b=await readJSON(request);
        await rate(db,`message:${user.id}`,30,60000,now());await run(db,'INSERT INTO aula_messages(resource_id,user_id,body,created) VALUES(?,?,?,?)',r.id,user.id,str(b.body,1,3000),now());return json({ok:true},201);
      }
      if(parts[2]==='submissions'&&method==='POST'){
        if(teacher||!['lesson','exam'].includes(r.kind))fail(403,'Esta entrega corresponde a los estudiantes.');checkDue(r);const b=await readJSON(request);
        let body,grade=null;
        if(r.kind==='exam'){
          const questions=r.settings.questions;
          if(!Array.isArray(b.answers)||b.answers.length!==questions.length||b.answers.some((a,i)=>!Number.isInteger(a)||a<0||a>=questions[i].options.length))fail(400,'Responde todas las preguntas antes de entregar.');
          grade=Math.round(100*b.answers.filter((a,i)=>a===questions[i].answer).length/questions.length);body=JSON.stringify(b.answers);
          if(await first(db,'SELECT id FROM aula_submissions WHERE resource_id=? AND user_id=?',r.id,user.id))fail(409,'Ya has entregado este examen.');
          await run(db,'INSERT INTO aula_submissions(id,resource_id,user_id,body,grade,created,updated) VALUES(?,?,?,?,?,?,?)',uid(),r.id,user.id,body,grade,now(),now());
        }else{
          body=str(b.body,1,12000);
          await run(db,'INSERT INTO aula_submissions(id,resource_id,user_id,body,created,updated) VALUES(?,?,?,?,?,?) ON CONFLICT(resource_id,user_id) DO UPDATE SET body=excluded.body,grade=NULL,feedback=\'\',updated=excluded.updated',uid(),r.id,user.id,body,now(),now());
        }
        return json({submission:await first(db,'SELECT * FROM aula_submissions WHERE resource_id=? AND user_id=?',r.id,user.id)},201);
      }
      if(parts[2]==='files'&&method==='POST'){
        if(r.kind!=='lesson')fail(400,'Solo las clases admiten archivos.');
        if(!storage)fail(503,'El almacenamiento de archivos no está conectado. Tu texto sigue disponible.');
        let submission=null;
        if(!teacher){checkDue(r);submission=await first(db,'SELECT id FROM aula_submissions WHERE resource_id=? AND user_id=?',r.id,user.id);if(!submission)fail(409,'Guarda primero el texto de tu entrega.');}
        const count=await first(db,'SELECT COUNT(*) AS total FROM aula_files WHERE resource_id=? AND owner_id=?',r.id,user.id);if(count.total>=5)fail(409,'Máximo 5 archivos por clase y persona.');
        let filename;try{filename=decodeURIComponent(request.headers.get('x-filename')||'');}catch{fail(400,'Nombre de archivo no válido.');}
        filename=str(filename,1,150).replace(/[\\/\x00-\x1f\x7f]/g,'_');
        const ext=filename.split('.').pop().toLowerCase();const mimes={pdf:'application/pdf',txt:'text/plain',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',mp3:'audio/mpeg',mp4:'video/mp4',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation'};
        if(!Object.hasOwn(mimes,ext))fail(400,'Usa PDF, TXT, PNG, JPG, MP3, MP4, DOCX o PPTX.');const bytes=await readBytes(request,MAX_FILE);if(!bytes.length)fail(400,'El archivo está vacío.');
        const id=uid();await storage.put(id,bytes);
        try{const saved=await first(db,'INSERT INTO aula_files(id,resource_id,submission_id,owner_id,name,mime,size,created) SELECT ?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM aula_files WHERE resource_id=? AND owner_id=?)<5 RETURNING id',id,r.id,submission?.id||null,user.id,filename,mimes[ext],bytes.length,now(),r.id,user.id);if(!saved)fail(409,'Máximo 5 archivos por clase y persona.');}catch(e){await storage.delete(id);throw e;}
        return json({id},201);
      }
    }
    if(parts[0]==='submissions'&&parts[1]&&method==='PATCH'){
      const s=await first(db,'SELECT * FROM aula_submissions WHERE id=?',parts[1]);if(!s)fail(404,'Entrega no encontrada.');await resourceAccess(s.resource_id,user,true);
      const b=await readJSON(request);const grade=b.grade===null?null:Number(b.grade);if(grade!==null&&(!Number.isInteger(grade)||grade<0||grade>100))fail(400,'La nota debe estar entre 0 y 100.');
      await run(db,'UPDATE aula_submissions SET grade=?,feedback=? WHERE id=?',grade,str(b.feedback??'',0,3000),s.id);return json({ok:true});
    }
    if(parts[0]==='files'&&parts[1]){
      const file=await first(db,'SELECT * FROM aula_files WHERE id=?',parts[1]);if(!file)fail(404,'Archivo no encontrado.');const {r,c}=await resourceAccess(file.resource_id,user);
      if(file.submission_id&&c.role!=='teacher'&&file.owner_id!==user.id)fail(403,'Esta entrega es privada.');
      if(method==='GET'){
        const object=await storage?.get(file.id);if(!object)fail(503,'No se pudo recuperar el archivo. Vuelve a intentarlo.');
        return new Response(object.body||object,{headers:{'Content-Type':'application/octet-stream','Content-Length':String(file.size),'Content-Disposition':`attachment; filename="archivo.${file.name.split('.').pop()}"; filename*=UTF-8''${encodeURIComponent(file.name).replace(/'/g,'%27')}`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"sandbox; default-src 'none'"}});
      }
      if(method==='DELETE'){
        if(file.owner_id!==user.id&&c.role!=='teacher')fail(403,'No puedes eliminar este archivo.');if(c.role!=='teacher')checkDue(r);
        await storage?.delete(file.id);await run(db,'DELETE FROM aula_files WHERE id=?',file.id);return json({ok:true});
      }
    }
    if(parts[0]==='conferences'&&parts[1]){
      const {c,room}=await conferenceAccess(parts[1],user,parts[2]!=='leave');
      if(parts[2]==='end'&&method==='POST'){
        if(room.role!=='teacher')fail(403,'Solo el profesor puede finalizar la conferencia.');
        await db.batch([db.prepare("UPDATE aula_conferences SET state='ended',ended=? WHERE id=?").bind(now(),c.id),db.prepare('DELETE FROM aula_peers WHERE conference_id=?').bind(c.id),db.prepare('DELETE FROM aula_signals WHERE conference_id=?').bind(c.id)]);return json({ok:true});
      }
      if(parts[2]==='join'&&method==='POST'){
        const b=await readJSON(request);const peerId=str(b.peerId,36,36);if(!/^[a-f0-9-]{36}$/.test(peerId))fail(400,'Conexión no válida.');
        await run(db,'DELETE FROM aula_peers WHERE conference_id=? AND seen<=?',c.id,now()-45000);
        const mine=await first(db,'SELECT id FROM aula_peers WHERE conference_id=? AND user_id=?',c.id,user.id);if(mine&&mine.id!==peerId)fail(409,'Ya estás conectado en otra pestaña. Sal de ella o espera 45 segundos.');
        const inserted=await first(db,`INSERT INTO aula_peers(id,conference_id,user_id,seen) SELECT ?,?,?,? WHERE (SELECT COUNT(*) FROM aula_peers WHERE conference_id=?)<6 ON CONFLICT(id) DO UPDATE SET seen=excluded.seen WHERE aula_peers.user_id=excluded.user_id AND aula_peers.conference_id=excluded.conference_id RETURNING id`,peerId,c.id,user.id,now(),c.id);
        if(!inserted)fail(409,'Esta sala admite 6 participantes simultáneos.');
        return json({peerId,iceServers:await iceServers(user),maxParticipants:6});
      }
      if(parts[2]==='leave'&&method==='POST'){
        const b=await readJSON(request);await run(db,'DELETE FROM aula_peers WHERE id=? AND user_id=? AND conference_id=?',str(b.peerId),user.id,c.id);return json({ok:true});
      }
      if(parts[2]==='ice'&&method==='GET'){
        await peerAccess(c.id,url.searchParams.get('peer'),user);return json({iceServers:await iceServers(user)});
      }
      if(parts[2]==='poll'&&method==='GET'){
        const peerId=url.searchParams.get('peer');await peerAccess(c.id,peerId,user);
        await run(db,'UPDATE aula_peers SET seen=? WHERE id=?',now(),peerId);
        await run(db,'DELETE FROM aula_signals WHERE conference_id=? AND created<?',c.id,now()-120000);
        const after=Number(url.searchParams.get('after')||0);if(!Number.isSafeInteger(after)||after<0)fail(400,'Cursor no válido.');
        const peers=await all(db,`SELECT p.id,p.user_id,u.name FROM aula_peers p JOIN aula_users u ON u.id=p.user_id WHERE p.conference_id=? AND p.seen>? AND (p.user_id=? OR EXISTS(SELECT 1 FROM aula_members m WHERE m.class_id=? AND m.user_id=p.user_id AND m.active=1))`,c.id,now()-45000,room.teacher_id,room.id);
        const signals=await all(db,'SELECT id,sender,body FROM aula_signals WHERE conference_id=? AND receiver=? AND id>? ORDER BY id LIMIT 100',c.id,peerId,after);
        return json({peers,signals:signals.map(s=>({...s,body:JSON.parse(s.body)}))});
      }
      if(parts[2]==='signals'&&method==='POST'){
        await rate(db,`signal:${user.id}`,300,60000,now());const b=await readJSON(request);await peerAccess(c.id,b.sender,user);
        const receiver=await first(db,'SELECT id,user_id FROM aula_peers WHERE id=? AND conference_id=? AND seen>?',str(b.receiver),c.id,now()-45000);if(!receiver)fail(404,'El participante salió de la sala.');
        await classAccess(room.id,{id:receiver.user_id});
        if(!b.body||!['description','candidate'].includes(b.body.type))fail(400,'Señal no válida.');const payload=JSON.stringify(b.body);if(payload.length>60000)fail(413,'Señal demasiado grande.');
        await run(db,'INSERT INTO aula_signals(conference_id,sender,receiver,body,created) VALUES(?,?,?,?,?)',c.id,b.sender,b.receiver,payload,now());return json({ok:true});
      }
    }
    fail(404,'Acción no encontrada.');
  }
  return async request=>{try{return await handler(request);}catch(e){if(e instanceof HttpError)return json({error:e.message},e.status);if(/UNIQUE constraint failed/.test(e.message))return json({error:'Esta acción ya se realizó. Actualiza el aula.'},409);diagnose(e);return json({error:'No se pudo completar la operación. Conserva tu texto y vuelve a intentarlo.'},503);}};
}
