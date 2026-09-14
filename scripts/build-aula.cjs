'use strict';
// Solo empaqueta el Worker. La interfaz sigue siendo HTML/CSS/JS sin compilar.
const fs=require('node:fs');const path=require('node:path');const esbuild=require('esbuild');
const project=path.join(__dirname,'..');const dist=path.join(project,'dist');
const publicFiles=require('../server/public-files.cjs');
const types={html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',png:'image/png',txt:'text/plain; charset=utf-8'};
const assets=Object.fromEntries(publicFiles.map(file=>{const ext=file.split('.').pop();return [file,{type:types[ext],binary:ext==='png',content:fs.readFileSync(path.join(dist,file),ext==='png'?'base64':'utf8')}];}));
fs.mkdirSync(path.join(dist,'server'),{recursive:true});
esbuild.build({entryPoints:[path.join(project,'server/aula-worker.js')],outfile:path.join(dist,'server/index.js'),bundle:true,format:'esm',platform:'browser',target:'es2022',minify:false,
  plugins:[{name:'english-public-assets',setup(build){build.onResolve({filter:/^english:assets$/},()=>({path:'english:assets',namespace:'english'}));build.onLoad({filter:/.*/,namespace:'english'},()=>({contents:'export default '+JSON.stringify(assets),loader:'js'}));}}]
}).then(()=>{
  const metadata=path.join(dist,'.openai');fs.mkdirSync(metadata,{recursive:true});fs.copyFileSync(path.join(project,'.openai/hosting.json'),path.join(metadata,'hosting.json'));
  fs.cpSync(path.join(project,'drizzle'),path.join(metadata,'drizzle'),{recursive:true});
  console.log('Worker de Aula virtual y archivos de English preparados.');
}).catch(e=>{console.error(e.message);process.exitCode=1;});
