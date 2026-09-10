import {createAula,first,run,videoIceConfig} from './aula-core.mjs';
import data from '../dist/english-data.js';
import assets from 'english:assets';
const SECURITY={
  'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin',
  'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; media-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
  'Permissions-Policy':'camera=(self), microphone=(self)'
};
const PUBLIC=new Set(['index.html','styles.css','script.js','english-data.js','english-mascot.png','sw.js','english-game.html','english-game.css','english-game-engine.js','english-game.js','match-pairs.js','match-pairs.css','aula.js','aula.css','aula-video.js']);
export default {async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname.startsWith('/api/aula')){
    const auth={mode:'siwc',async user(req){
      const id=req.headers.get('oai-authenticated-user-id');if(!id)return null;
      const email=req.headers.get('oai-authenticated-user-email');if(!email)return null;
      let name=req.headers.get('oai-authenticated-user-full-name')||email.split('@')[0];
      try{if(req.headers.get('oai-authenticated-user-full-name-encoding')==='percent-encoded-utf-8')name=decodeURIComponent(name);}catch{}
      const key=`siwc:${id}`;
      await run(env.DB,'INSERT INTO aula_users(id,name,email,created) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,email=excluded.email',key,name.slice(0,80),email,Date.now());
      return first(env.DB,'SELECT id,name,email FROM aula_users WHERE id=?',key);
    }};
    const api=createAula({db:env.DB,storage:env.BUCKET,auth,data,iceServers:user=>videoIceConfig(env,user),diagnose:e=>console.error('[Aula]',e.message)});
    return api(request);
  }
  const file=url.pathname==='/'?'index.html':url.pathname.slice(1);
  if(!PUBLIC.has(file)||!['GET','HEAD'].includes(request.method))return new Response('No encontrado',{status:404});
  const asset=assets[file];if(!asset)return new Response('Archivo no disponible',{status:503});
  const bytes=asset.binary?Uint8Array.from(atob(asset.content),c=>c.charCodeAt(0)):asset.content;
  return new Response(request.method==='HEAD'?null:bytes,{headers:{...SECURITY,'Content-Type':asset.type,'Cache-Control':'no-cache'}});
}};
