'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const core=require('../dist/dictionary.js');
const study=require('../dist/english-data.js');
const root=path.join(__dirname,'..');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'dist/dictionary-index.js'),'utf8'),context);
const index=core.createIndex(context.ENGLISH_DICTIONARY_INDEX,study);

test('Diccionario: el índice completo tiene significados en sus 16 archivos',()=>{
  assert.equal(context.ENGLISH_DICTIONARY_INDEX.count,59253);
  for(const key of '0123456789abcdef')vm.runInContext(fs.readFileSync(path.join(root,`dist/dictionary-pack-${key}.js`),'utf8'),context);
  for(const row of index.rows.filter(row=>!row.local)) {
    const groups=context.ENGLISH_DICTIONARY_PACKS[row.key[0]][row.key];
    assert(groups?.length,`Faltan significados de ${row.en}`);
    for(const group of groups)for(const sense of group.s) {
      assert(sense.t.length && sense.t.every(t=>typeof t==='string'&&t.length));
      assert(sense.d.every(d=>typeof d==='string'));
    }
  }
  const word=index.byTerm.get('serendipity');
  const sense=context.ENGLISH_DICTIONARY_PACKS[word.key[0]][word.key][0].s[0];
  assert(sense.t.includes('serendipia'));
  assert.match(sense.d[0],/fortunate/);
});

test('Diccionario: prioriza equivalencias exactas, ignora tildes y permite ambos idiomas',()=>{
  assert.equal(index.search(' HOUSE ').matches[0].en,'house');
  assert.equal(index.search('casa','es').matches[0].en,'house');
  assert.equal(index.search('POLICIA','es').matches[0].en,'police');
  assert.equal(index.search('policía','es').matches[0].en,'police');
  assert(index.search('café','es').matches.some(r=>r.en==='coffee'));
  assert.equal(index.search('serendiptiy','en').matches.length,0);
  assert(index.search('serendiptiy','en').suggestions.includes('serendipity'));
});

test('Diccionario: todos los vocabularios están presentes y las formas verbales respetan filtros',()=>{
  for(const category of study.categories)for(const word of category.words) {
    const record=index.byTerm.get(core.normalize(word.en));
    assert(record,word.en);
    assert(record.categories.has(category.name));
  }
  assert.equal(index.search('went','en','v').matches[0].en,'go');
  assert.deepEqual(index.byTerm.get('go').verb,['go','went','gone','ir']);
  assert(index.search('learn','en','v').matches.every(r=>r.pos.includes('v')));
  assert.equal(index.search('went','es','v').matches.some(r=>r.en==='go'),false);
});

test('Diccionario: guardar significados distintos y recuperar listas sin descargar el índice',()=>{
  const record=index.byTerm.get('serendipity');
  const word=core.snapshot(record,['serendipia']);
  assert(core.validSavedWord(word));
  assert.notEqual(word.id,core.snapshot(record,['serendipidad']).id);
  const original=study.categories[0].words[0];
  assert.equal(core.snapshot(index.byTerm.get(core.normalize(original.en)),[original.es]).id,original.id);
  const app=require('../dist/script.js');
  const state=app.defaultState();
  app.restoreDictionaryWords({dictionaryWords:{[word.id]:word}});
  app.rememberDictionaryWord(state,word.id);
  state.lists=[{id:'my-list',name:'Mi vocabulario',words:[original.id,word.id]}];
  const loaded=JSON.parse(JSON.stringify(state));
  delete require.cache[require.resolve('../dist/script.js')];
  const fresh=require('../dist/script.js');
  assert.equal(fresh.groupedListWords(loaded.lists[0]).length,1);
  fresh.restoreDictionaryWords(loaded);
  const groups=fresh.groupedListWords(loaded.lists[0]);
  assert.equal(groups.at(-1).name,'Diccionario');
  assert.deepEqual(groups.at(-1).words,[word]);
  assert.deepEqual(fresh.restoreDictionaryWords({dictionaryWords:{bad:{id:'__proto__',en:'bad',es:'mal'},empty:{...word,es:''}}}),{});
  assert.deepEqual(fresh.restoreDictionaryWords({}),{});
});

test('Diccionario: Node sirve los archivos nuevos y mantiene privadas las carpetas del servidor',async t=>{
  const server=require('../servidor.js').createApp(path.join(root,'dist'));
  t.after(()=>server.close());
  async function request(file,method='GET') {
    return new Promise((resolve,reject)=>{
      const headers={};let status=200;
      const response={setHeader(k,v){headers[k]=v;},writeHead(code,h={}){status=code;Object.assign(headers,h);},end(body){resolve({status,headers,body});}};
      try{server.emit('request',{url:'/'+file,method,headers:{}},response);}catch(e){reject(e);}
    });
  }
  const files=require('../server/public-files.cjs').filter(file=>file.startsWith('dictionary'));
  for(const file of files) {
    const response=await request(file);
    assert.equal(response.status,200,file);
    assert.deepEqual(response.body,fs.readFileSync(path.join(root,'dist',file)));
    const type=file.endsWith('.css')?'text/css':file.endsWith('.txt')?'text/plain':'text/javascript';
    assert(response.headers['Content-Type'].startsWith(type),file);
  }
  assert.equal((await request('dictionary.js','HEAD')).body,undefined);
  assert.equal((await request('server/public-files.cjs')).status,404);
  assert.equal((await request('datos/aula.sqlite')).status,404);
});
