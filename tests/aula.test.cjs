'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs');const os=require('node:os');const path=require('node:path');
const {openDatabase,createNodeAula}=require('../server/aula-node.cjs');
const data=require('../dist/english-data.js');
async function fixture(t){
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'english-aula-'));const db=openDatabase(path.join(temp,'aula.sqlite'));
  const {createAula}=await import('../server/aula-core.mjs');let clock=Date.now();
  const users={teacher:{id:'teacher',name:'Profesora Elena',email:'elena@example.test'},student:{id:'student',name:'Juan',email:'juan@example.test'},other:{id:'other',name:'Ana',email:'ana@example.test'},outsider:{id:'outsider',name:'Otro profesor',email:'otro@example.test'}};
  for(const u of Object.values(users))db.sqlite.prepare('INSERT INTO aula_users(id,name,email,created) VALUES(?,?,?,?)').run(u.id,u.name,u.email,clock);
  const blobs=new Map();const storage={put:async(id,v)=>blobs.set(id,v),get:async id=>blobs.get(id),delete:async id=>blobs.delete(id)};
  const api=createAula({db,storage,data,auth:{mode:'test',user:async req=>users[req.headers.get('x-test-user')]||null},now:()=>clock,diagnose:e=>{throw e;}});
  async function req(user,url,method='GET',body,extra={}){
    const headers={'x-test-user':user||'','origin':'https://english.test','x-english-request':'aula','content-type':'application/json',...extra};
    const response=await api(new Request('https://english.test/api/aula/'+url,{method,headers,...body===undefined?{}:{body:body instanceof Uint8Array?body:JSON.stringify(body)}}));
    return {status:response.status,body:response.headers.get('content-type')?.startsWith('application/json')?await response.json():await response.text(),headers:response.headers};
  }
  const created=await req('teacher','classes','POST',{name:'English A1'});assert.equal(created.status,201);const room=created.body.class;
  t.after(()=>{db.close();fs.rmSync(temp,{recursive:true,force:true});});
  return {db,req,room,users,blobs,setTime:n=>{clock=n;},get time(){return clock;},join:async who=>{assert.equal((await req(who,'join','POST',{code:room.code})).status,200);},resource:async fields=>{const r=await req('teacher',`classes/${room.id}/resources`,'POST',{kind:'lesson',title:'Primera clase',body:'Practica inglés',enabled:true,...fields});assert.equal(r.status,201,JSON.stringify(r.body));return r.body.id;}};
}
test('Aulas: identidad, código obligatorio, aislamiento y control de integrantes',async t=>{
  const f=await fixture(t);const {req,room}=f;
  assert.match(room.code,/^[A-Z2-9]{10}$/);
  assert.equal((await req(null,'classes')).status,401);
  assert.equal((await req('student',`classes/${room.id}`)).status,403);
  assert.equal((await req('student','join','POST',{code:'AAAAAAAAAA'})).status,404);
  await f.join('student');
  const view=await req('student',`classes/${room.id}`);assert.equal(view.status,200);assert.equal(view.body.class.role,'student');assert.equal(view.body.class.code,undefined);
  assert.equal((await req('student',`classes/${room.id}/members`)).status,403);
  assert.equal((await req('outsider',`classes/${room.id}`)).status,403);
  assert.equal((await req('student',`classes/${room.id}/resources`,'POST',{kind:'lesson',title:'Ataque'})).status,403);
  const members=await req('teacher',`classes/${room.id}/members`);assert.equal(members.body.members[0].email,'juan@example.test');
  await req('teacher',`classes/${room.id}/members/student`,'PATCH',{active:false});
  assert.equal((await req('student',`classes/${room.id}`)).status,403);
  assert.equal((await req('student','join','POST',{code:room.code})).status,403);
  await req('teacher',`classes/${room.id}/members/student`,'PATCH',{active:true});
  assert.equal((await req('student',`classes/${room.id}`)).status,200);
});
test('Publicación: borradores y áreas deshabilitadas protegidos también por la API',async t=>{
  const f=await fixture(t);await f.join('student');const {req,room}=f;
  const draft=await f.resource({enabled:false});const vocab=await f.resource({kind:'vocabulary',material:'vocab:jobs'});
  assert.equal((await req('student',`resources/${draft}`)).status,403);
  let view=await req('student',`classes/${room.id}`);assert.equal(view.body.resources.length,1);
  assert.equal((await req('student',`resources/${vocab}`)).body.material.words.length,40);
  assert.equal((await req('student',`resources/${draft}`,'PATCH',{enabled:true})).status,403);
  await req('teacher',`resources/${draft}`,'PATCH',{enabled:true});assert.equal((await req('student',`resources/${draft}`)).status,200);
  await req('teacher',`classes/${room.id}`,'PATCH',{access:{lessons:false,materials:false}});
  assert.equal((await req('student',`resources/${draft}`)).status,403);
  assert.equal((await req('student',`resources/${vocab}`)).status,403);
  view=await req('student',`classes/${room.id}`);assert.equal(view.body.resources.length,0);
  assert.equal((await req('teacher',`resources/${draft}`)).status,200);
});
test('Entregas: fecha en servidor, actualización, nota y archivos privados',async t=>{
  const f=await fixture(t);await f.join('student');await f.join('other');const {req}=f;
  const deadline=f.time+3600000;const lesson=await f.resource({due:deadline});
  let s=await req('student',`resources/${lesson}/submissions`,'POST',{body:'My house has a garden.'});assert.equal(s.status,201);const sid=s.body.submission.id;
  const uploaded=await req('student',`resources/${lesson}/files`,'POST',new TextEncoder().encode('My homework'),{'content-type':'application/octet-stream','x-filename':'tarea.txt'});assert.equal(uploaded.status,201);
  const file=uploaded.body.id;
  assert.equal((await req('teacher',`files/${file}`)).body,'My homework');assert.equal((await req('other',`files/${file}`)).status,403);assert.equal((await req('outsider',`files/${file}`)).status,403);
  const other=await req('other',`resources/${lesson}`);assert.equal(other.body.submissions.length,0);assert.equal(other.body.files.length,0);
  await req('teacher',`submissions/${sid}`,'PATCH',{grade:90,feedback:'Buen trabajo.'});
  assert.equal((await req('student',`resources/${lesson}`)).body.submissions[0].grade,90);
  await req('student',`resources/${lesson}/submissions`,'POST',{body:'Revised answer'});
  assert.equal((await req('student',`resources/${lesson}`)).body.submissions[0].grade,null);
  f.setTime(deadline+1);
  assert.equal((await req('student',`resources/${lesson}/submissions`,'POST',{body:'Late'})).status,409);
  assert.equal((await req('student',`resources/${lesson}/files`,'POST',new Uint8Array([1]),{'x-filename':'t.txt'})).status,409);
  assert.equal((await req('student',`files/${file}`,'DELETE',{})).status,409);
  await req('teacher',`resources/${lesson}`,'PATCH',{due:deadline+86400000});
  assert.equal((await req('student',`resources/${lesson}/submissions`,'POST',{body:'Extended deadline'})).status,201);
  const lessonFile=await req('teacher',`resources/${lesson}/files`,'POST',new TextEncoder().encode('lesson'),{'x-filename':'clase.txt'});
  assert.equal((await req('other',`files/${lessonFile.body.id}`)).status,200);
  await req('teacher',`resources/${lesson}`,'PATCH',{enabled:false});
  assert.equal((await req('student',`files/${file}`)).status,403);
});
test('Exámenes: banco de English, respuestas ocultas, un intento y corrección en servidor',async t=>{
  const f=await fixture(t);await f.join('student');const {req}=f;
  const exam=await f.resource({kind:'exam',source:'vocab:jobs',count:10});
  const solution=(await req('teacher',`resources/${exam}`)).body.questions;
  const student=(await req('student',`resources/${exam}`)).body;assert.equal(student.questions.length,10);
  assert.ok(student.questions.every(q=>!('answer'in q)));assert.equal(student.resource.settings.questions,undefined);
  assert.equal((await req('student',`resources/${exam}/submissions`,'POST',{answers:[0]})).status,400);
  const result=await req('student',`resources/${exam}/submissions`,'POST',{answers:solution.map(q=>q.answer),grade:0});
  assert.equal(result.status,201);assert.equal(result.body.submission.grade,100);
  assert.equal((await req('student',`resources/${exam}/submissions`,'POST',{answers:solution.map(q=>q.answer)})).status,409);
  assert.equal((await req('student',`resources/${exam}`)).body.questions,undefined);
  const {examQuestions}=await import('../server/aula-core.mjs');
  for(const source of ['exercises','verbs:regular','verbs:irregular',...data.categories.map(c=>'vocab:'+c.id)]){
    const questions=examQuestions(data,source,5);assert.equal(questions.length,5);for(const q of questions){assert.ok(q.options.length>=3);assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);}
  }
});
test('Chats y foros: conversaciones compartidas solo dentro del aula y con controles del profesor',async t=>{
  const f=await fixture(t);await f.join('student');await f.join('other');const {req,room}=f;
  for(const kind of ['chat','forum']){
    const resource=await f.resource({kind});await req('student',`resources/${resource}/messages`,'POST',{body:'Hello, everyone!'});
    const messages=await req('other',`resources/${resource}/messages?after=0`);assert.equal(messages.body.messages[0].name,'Juan');assert.equal(messages.body.messages[0].body,'Hello, everyone!');
    assert.equal((await req('outsider',`resources/${resource}/messages`)).status,403);
    await req('teacher',`resources/${resource}`,'PATCH',{enabled:false});
    assert.equal((await req('student',`resources/${resource}/messages`,'POST',{body:'Blocked'})).status,403);
  }
  await req('teacher',`classes/${room.id}`,'PATCH',{access:{chats:false}});
  const chat=await f.resource({kind:'chat'});assert.equal((await req('student',`resources/${chat}/messages`)).status,403);
});
test('Videoconferencia: inicio, señalización privada, revocación y finalización',async t=>{
  const f=await fixture(t);await f.join('student');await f.join('other');const {req,room}=f;
  assert.equal((await req('student',`classes/${room.id}/conferences`,'POST',{title:'No autorizado'})).status,403);
  const start=await req('teacher',`classes/${room.id}/conferences`,'POST',{title:'Speaking en directo'});assert.equal(start.status,201);const id=start.body.id;
  assert.equal((await req('teacher',`classes/${room.id}/conferences`,'POST',{title:'Duplicada'})).status,409);
  assert.equal((await req('outsider',`conferences/${id}/join`,'POST',{peerId:crypto.randomUUID()})).status,403);
  const p1=crypto.randomUUID(),p2=crypto.randomUUID();
  assert.equal((await req('teacher',`conferences/${id}/join`,'POST',{peerId:p1})).status,200);
  assert.equal((await req('student',`conferences/${id}/join`,'POST',{peerId:p2})).status,200);
  const sent=await req('teacher',`conferences/${id}/signals`,'POST',{sender:p1,receiver:p2,body:{type:'description',description:{type:'offer',sdp:'test-sdp'}}});assert.equal(sent.status,200);
  const poll=await req('student',`conferences/${id}/poll?peer=${p2}`);assert.equal(poll.body.peers.length,2);assert.equal(poll.body.signals[0].body.description.sdp,'test-sdp');
  assert.equal((await req('other',`conferences/${id}/poll?peer=${p2}`)).status,403);
  assert.equal((await req('student',`conferences/${id}/signals`,'POST',{sender:p1,receiver:p2,body:{type:'candidate'}})).status,403);
  await req('teacher',`classes/${room.id}/members/student`,'PATCH',{active:false});
  assert.equal((await req('student',`conferences/${id}/poll?peer=${p2}`)).status,403);
  assert.equal((await req('teacher',`conferences/${id}/poll?peer=${p1}`)).body.peers.length,1);
  await req('teacher',`conferences/${id}/end`,'POST',{});
  assert.equal((await req('teacher',`conferences/${id}/poll?peer=${p1}`)).status,409);
  const final=(await req('teacher',`classes/${room.id}`)).body.conferences[0];assert.equal(final.state,'ended');assert.ok(final.ended);
});
test('Código: rotación, cierre de inscripciones y límite de intentos',async t=>{
  const f=await fixture(t);const {req,room}=f;
  const rotated=await req('teacher',`classes/${room.id}`,'PATCH',{rotateCode:true});assert.notEqual(rotated.body.code,room.code);
  assert.equal((await req('student','join','POST',{code:room.code})).status,404);
  assert.equal((await req('student','join','POST',{code:rotated.body.code})).status,200);
  await req('teacher',`classes/${room.id}`,'PATCH',{joining:false});assert.equal((await req('other','join','POST',{code:rotated.body.code})).status,404);
  let limited;for(let i=0;i<13;i++)limited=await req('other','join','POST',{code:'AAAAAAAAAA'});assert.equal(limited.status,429);
});
test('Origen, validación de fechas, archivos activos y cuerpo de solicitud limitado',async t=>{
  const f=await fixture(t);const {req,room}=f;
  assert.equal((await req('teacher','classes','POST',{name:'CSRF'},{origin:'https://attacker.test'})).status,403);
  assert.equal((await req('teacher','classes','POST',{name:'CSRF'},{'x-english-request':''})).status,403);
  assert.equal((await req('teacher',`classes/${room.id}/resources`,'POST',{kind:'lesson',title:'Bad date',due:'invalid'})).status,400);
  const id=await f.resource({});
  assert.equal((await req('teacher',`resources/${id}/files`,'POST',new TextEncoder().encode('<script>alert(1)</script>'),{'x-filename':'ataque.html'})).status,400);
  assert.equal((await req('teacher',`resources/${id}/files`,'POST',new Uint8Array([1]),{'x-filename':'tarea.txt','content-length':String(16*1024*1024)})).status,413);
  assert.equal((await req('teacher','classes','POST',{name:'x'.repeat(130000)})).status,413);
});
test('Cuentas Node: contraseña protegida, cookie de sesión, persistencia y cierre de sesión',async t=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'english-auth-'));let app=await createNodeAula({dataDir:temp});
  t.after(()=>{app.close();fs.rmSync(temp,{recursive:true,force:true});});
  const request=(url,method='GET',body,cookie='',extra={})=>app.api(new Request('https://english.test/api/aula/'+url,{method,headers:{'Content-Type':'application/json','Origin':'https://english.test','X-English-Request':'aula','cookie':cookie,...extra},...body===undefined?{}:{body:JSON.stringify(body)}}));
  const password='Prueba muy larga 123!';const registered=await request('auth/register','POST',{name:'Elena',email:'elena@example.test',password});assert.equal(registered.status,200);
  const cookie=registered.headers.get('set-cookie');assert.match(cookie,/HttpOnly/);assert.match(cookie,/Secure/);assert.match(cookie,/SameSite=Strict/);
  const stored=app.db.sqlite.prepare('SELECT password FROM aula_users').get();assert.notEqual(stored.password,password);assert.match(stored.password,/^[a-f0-9]{48}:[a-f0-9]{128}$/);
  assert.equal((await request('auth/login','POST',{email:'elena@example.test',password:'Contraseña incorrecta'})).status,401);
  const created=await request('classes','POST',{name:'Persistente'},cookie);const classroom=(await created.json()).class;assert.ok(classroom.id);
  app.close();app=await createNodeAula({dataDir:temp});
  const classes=await request('classes','GET',undefined,cookie);assert.equal((await classes.json()).classes[0].id,classroom.id);
  assert.equal((await request('classes','GET',undefined,'',{'oai-authenticated-user-id':'fake','oai-authenticated-user-email':'elena@example.test'})).status,401);
  await request('auth/logout','POST',{},cookie);assert.equal((await request('classes','GET',undefined,cookie)).status,401);
});
test('TURN: credenciales temporales por usuario, validación y secreto reservado',async()=>{
  const {videoIceConfig}=await import('../server/aula-core.mjs');
  const env={ENGLISH_TURN_URLS:'["turns:turn.example.test:5349"]',ENGLISH_TURN_SECRET:'test-only-secret'};
  const time=1800000000000;const ice=await videoIceConfig(env,{id:'student'},time);
  assert.equal(ice[0].username,'1800003600:student');assert.equal(ice[0].credential,require('node:crypto').createHmac('sha1','test-only-secret').update(ice[0].username).digest('base64'));
  assert.ok(!JSON.stringify(ice).includes('test-only-secret'));
  assert.deepEqual(await videoIceConfig({}, {id:'student'}),[]);
  await assert.rejects(()=>videoIceConfig({ENGLISH_ICE_SERVERS:'[{"urls":"javascript:bad"}]'},{id:'student'}),/no está configurada/);
});
test('Concurrencia: seis plazas de video, propiedad de conexión y una entrega de examen',async t=>{
  const f=await fixture(t);const {req,room,db}=f;await f.join('student');
  const conf=(await req('teacher',`classes/${room.id}/conferences`,'POST',{title:'Sala pequeña'})).body.id;
  const original=crypto.randomUUID();await req('teacher',`conferences/${conf}/join`,'POST',{peerId:original});
  assert.notEqual((await req('student',`conferences/${conf}/join`,'POST',{peerId:original})).status,200);
  for(let i=0;i<5;i++){
    const id='extra-'+i;db.sqlite.prepare('INSERT INTO aula_users(id,name,email,created) VALUES(?,?,?,?)').run(id,id,id+'@example.test',f.time);
    db.sqlite.prepare('INSERT INTO aula_peers(id,conference_id,user_id,seen) VALUES(?,?,?,?)').run(crypto.randomUUID(),conf,id,f.time);
  }
  assert.equal((await req('student',`conferences/${conf}/join`,'POST',{peerId:crypto.randomUUID()})).status,409);
  f.setTime(f.time+45001);assert.equal((await req('student',`conferences/${conf}/join`,'POST',{peerId:crypto.randomUUID()})).status,200);
  const exam=await f.resource({kind:'exam',source:'exercises',count:5});
  const answers=(await req('teacher',`resources/${exam}`)).body.questions.map(q=>q.answer);
  const attempts=await Promise.all([req('student',`resources/${exam}/submissions`,'POST',{answers}),req('student',`resources/${exam}/submissions`,'POST',{answers})]);
  assert.deepEqual(attempts.map(r=>r.status).sort(),[201,409]);
});
test('Node HTTP: recursos del aula, identidad real y directorio privado inaccesible',async t=>{
  const {createApp}=require('../servidor.js');const temp=fs.mkdtempSync(path.join(os.tmpdir(),'english-http-'));
  const server=createApp(path.join(__dirname,'../dist'),{dataDir:temp});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
  t.after(async()=>{await new Promise(resolve=>server.close(resolve));await new Promise(resolve=>setImmediate(resolve));fs.rmSync(temp,{recursive:true,force:true});});
  for(const file of ['/aula.js','/aula.css','/aula-video.js'])assert.equal((await fetch(origin+file)).status,200);
  const register=await fetch(origin+'/api/aula/auth/register',{method:'POST',headers:{Origin:origin,'X-English-Request':'aula','Content-Type':'application/json'},body:JSON.stringify({name:'Prueba HTTP',email:'http@example.test',password:'Una contraseña segura'})});assert.equal(register.status,200);
  const cookie=register.headers.get('set-cookie').split(';')[0];
  const session=await fetch(origin+'/api/aula/session',{headers:{Cookie:cookie}});assert.equal((await session.json()).user.email,'http@example.test');
  for(const file of ['/datos/aula.sqlite','/server/aula-node.cjs','/configuracion.env'])assert.equal((await fetch(origin+file)).status,404);
});
