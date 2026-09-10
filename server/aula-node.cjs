'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {promisify}=require('node:util');
const {DatabaseSync}=require('node:sqlite');
const scrypt=promisify(crypto.scrypt);
const hashToken=t=>crypto.createHash('sha256').update(t).digest('hex');
async function passwordHash(password,salt=crypto.randomBytes(24).toString('hex')){
  const key=await scrypt(password,salt,64,{N:32768,r:8,p:3,maxmem:64*1024*1024});return `${salt}:${key.toString('hex')}`;
}
async function verifyPassword(password,stored){
  const fallback='000000000000000000000000000000000000000000000000:'.padEnd(177,'0');
  const hash=stored||fallback;const computed=await passwordHash(password,hash.split(':')[0]);
  return Buffer.byteLength(computed)===Buffer.byteLength(hash)&&crypto.timingSafeEqual(Buffer.from(computed),Buffer.from(hash))&&!!stored;
}
function openDatabase(filename){
  const sqlite=new DatabaseSync(filename,{timeout:5000});sqlite.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');
  sqlite.exec('CREATE TABLE IF NOT EXISTS english_migrations(name TEXT PRIMARY KEY, hash TEXT NOT NULL)');
  const migrations=path.join(__dirname,'..','drizzle');
  for(const name of fs.readdirSync(migrations).filter(n=>n.endsWith('.sql')).sort()){
    const source=fs.readFileSync(path.join(migrations,name),'utf8');const hash=hashToken(source);
    const previous=sqlite.prepare('SELECT hash FROM english_migrations WHERE name=?').get(name);
    if(previous){if(previous.hash!==hash)throw new Error(`La migración aplicada ${name} fue modificada.`);continue;}
    sqlite.exec('BEGIN IMMEDIATE');try{sqlite.exec(source);sqlite.prepare('INSERT INTO english_migrations(name,hash) VALUES(?,?)').run(name,hash);sqlite.exec('COMMIT');}catch(e){sqlite.exec('ROLLBACK');throw e;}
  }
  sqlite.exec('PRAGMA optimize');
  const prepare=(sql)=>({bind(...args){const stmt=sqlite.prepare(sql);return {first:async()=>stmt.get(...args)||null,all:async()=>({results:stmt.all(...args)}),run:async()=>({meta:stmt.run(...args)}),execute:()=>stmt.run(...args)};}});
  return {prepare,batch:async statements=>{sqlite.exec('BEGIN IMMEDIATE');try{const result=statements.map(s=>s.execute());sqlite.exec('COMMIT');return result;}catch(e){sqlite.exec('ROLLBACK');throw e;}},close:()=>sqlite.close(),sqlite};
}
async function createNodeAula(options={}){
  const core=await import('./aula-core.mjs');const {first,run,rate,json,readJSON,str,fail}=core;
  const directory=options.dataDir||process.env.ENGLISH_DATA_DIR||path.join(__dirname,'..','datos');
  fs.mkdirSync(directory,{recursive:true,mode:0o700});const uploads=path.join(directory,'archivos');fs.mkdirSync(uploads,{recursive:true,mode:0o700});
  const db=openDatabase(path.join(directory,'aula.sqlite'));
  const auth={mode:'local',async user(request){const cookie=request.headers.get('cookie')?.match(/(?:^|;\s*)english_aula=([a-f0-9]{64})(?:;|$)/)?.[1];if(!cookie)return null;return first(db,'SELECT u.id,u.name,u.email FROM aula_users u JOIN aula_sessions s ON s.user_id=u.id WHERE s.id=? AND s.expires>?',hashToken(cookie),Date.now());},
    async handle(request,parts){
      if(parts[0]!=='auth'||request.method!=='POST')return null;
      const secure=new URL(request.url).protocol==='https:';
      const cookie=(token,age)=>`english_aula=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${secure?'; Secure':''}`;
      if(parts[1]==='logout'){
        const token=request.headers.get('cookie')?.match(/english_aula=([a-f0-9]{64})/)?.[1];if(token)await run(db,'DELETE FROM aula_sessions WHERE id=?',hashToken(token));
        return json({ok:true},200,{'Set-Cookie':cookie('',0)});
      }
      if(!['register','login'].includes(parts[1]))fail(404,'Acción no encontrada.');
      // This header is set by the Node adapter, never taken from the browser.
      await rate(db,`auth-ip:${request.headers.get('x-aula-client')||'local'}`,15,600000);
      const b=await readJSON(request);const email=str(b.email,3,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail(400,'Escribe un correo válido.');
      const password=str(b.password,12,200);let user;
      if(parts[1]==='register'){
        const name=str(b.name,2,80);if(await first(db,'SELECT id FROM aula_users WHERE email=?',email))fail(409,'No se pudo crear la cuenta con ese correo. Prueba a iniciar sesión.');
        user={id:core.uid(),name,email};await run(db,'INSERT INTO aula_users(id,name,email,password,created) VALUES(?,?,?,?,?)',user.id,name,email,await passwordHash(password),Date.now());
      }else{
        user=await first(db,'SELECT * FROM aula_users WHERE email=?',email);if(!await verifyPassword(password,user?.password))fail(401,'Correo o contraseña incorrectos.');
      }
      const token=crypto.randomBytes(32).toString('hex');
      await run(db,'DELETE FROM aula_sessions WHERE expires<=?',Date.now());
      await run(db,'DELETE FROM aula_limits WHERE expires<?',Date.now()-86400000);
      await run(db,'INSERT INTO aula_sessions(id,user_id,expires) VALUES(?,?,?)',hashToken(token),user.id,Date.now()+7*86400000);
      return json({user:{id:user.id,name:user.name,email:user.email}},200,{'Set-Cookie':cookie(token,7*86400)});
    }};
  const storage={async put(id,bytes){await fs.promises.writeFile(path.join(uploads,id),bytes,{flag:'wx',mode:0o600});},async get(id){try{return await fs.promises.readFile(path.join(uploads,id));}catch(e){if(e.code==='ENOENT')return null;throw e;}},async delete(id){await fs.promises.rm(path.join(uploads,id),{force:true});}};
  const publicDirectory=options.publicDirectory||path.join(__dirname,'..','dist');
  const api=core.createAula({db,storage,auth,data:require(path.join(publicDirectory,'english-data.js')),iceServers:user=>core.videoIceConfig(process.env,user),diagnose:e=>console.error('[Aula]',e.message)});
  return {api,db,close:()=>db.close()};
}
module.exports={createNodeAula,openDatabase,passwordHash,verifyPassword};
