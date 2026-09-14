'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const os=require('node:os');const path=require('node:path');const {pathToFileURL}=require('node:url');
const {openDatabase}=require('../server/aula-node.cjs');
test('Worker empaquetado: HTML/JS/PNG, SIWC, permisos compartidos y R2 privado',async t=>{
  const built=path.join(__dirname,'../dist/server/index.js');
  if(!fs.existsSync(built)){t.skip('Ejecuta npm run build para probar el Worker.');return;}
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'english-worker-'));const entry=path.join(temp,'worker.mjs');fs.copyFileSync(built,entry);
  const worker=(await import(pathToFileURL(entry).href)).default;
  const db=openDatabase(path.join(temp,'aula.sqlite'));const bytes=new Map();
  const env={DB:db,BUCKET:{put:async(k,v)=>bytes.set(k,v),get:async k=>({body:bytes.get(k)}),delete:async k=>bytes.delete(k)}};
  t.after(()=>{db.close();fs.rmSync(temp,{recursive:true,force:true});});
  const fetchWorker=(route,method='GET',body,identity='teacher')=>worker.fetch(new Request('https://english.test'+route,{method,headers:{'Origin':'https://english.test','X-English-Request':'aula','Content-Type':'application/json',...(identity?{'oai-authenticated-user-id':identity,'oai-authenticated-user-email':identity+'@example.test','oai-authenticated-user-full-name':encodeURIComponent('Profesora María'),'oai-authenticated-user-full-name-encoding':'percent-encoded-utf-8'}:{})},...body===undefined?{}:{body:JSON.stringify(body)}}),env);
  for(const file of ['index.html','aula.js','aula.css','aula-video.js','english-mascot.png','dictionary.js','dictionary.css','dictionary-index.js','dictionary-pack-0.js','dictionary-license.txt','verb-tenses-data.js','verb-tenses.js','verb-tenses.css']){
    const response=await fetchWorker('/'+file);assert.equal(response.status,200);assert.deepEqual(Buffer.from(await response.arrayBuffer()),fs.readFileSync(path.join(__dirname,'../dist',file)));
  }
  assert.equal((await fetchWorker('/server/index.js')).status,404);
  const session=await fetchWorker('/api/aula/session');assert.equal((await session.json()).user.name,'Profesora María');
  assert.equal((await fetchWorker('/api/aula/classes','GET',undefined,null)).status,401);
  const created=await fetchWorker('/api/aula/classes','POST',{name:'Aula alojada'});assert.equal(created.status,201);const classroom=(await created.json()).class;
  assert.equal((await fetchWorker('/api/aula/classes/'+classroom.id,'GET',undefined,'student')).status,403);
  assert.equal((await fetchWorker('/api/aula/join','POST',{code:classroom.code},'student')).status,200);
  assert.equal((await fetchWorker('/api/aula/classes/'+classroom.id,'GET',undefined,'student')).status,200);
  const createdLesson=await fetchWorker(`/api/aula/classes/${classroom.id}/resources`,'POST',{kind:'lesson',title:'Archivo privado',enabled:true});const id=(await createdLesson.json()).id;
  const file=await worker.fetch(new Request(`https://english.test/api/aula/resources/${id}/files`,{method:'POST',headers:{Origin:'https://english.test','X-English-Request':'aula','X-Filename':'clase.txt','oai-authenticated-user-id':'teacher','oai-authenticated-user-email':'teacher@example.test'},body:'Hello class'}),env);
  assert.equal(file.status,201);const fileId=(await file.json()).id;
  assert.equal(await (await fetchWorker('/api/aula/files/'+fileId,'GET',undefined,'student')).text(),'Hello class');
  assert.equal((await fetchWorker('/api/aula/files/'+fileId,'GET',undefined,'outsider')).status,403);
});
