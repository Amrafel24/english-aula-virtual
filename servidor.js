'use strict';
/*
 * Servidor de JavaScript puro (Node 24, sin paquetes de ejecución).
 * Necesario para Aula virtual y para contar sesiones de distintos dispositivos.
 * Los materiales y juegos también funcionan abriendo index.html directamente.
 * Ejecutar: node servidor.js
 */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const net = require('node:net');
const publicFiles = require('./server/public-files.cjs');

class Presence {
  constructor() { this.sessions = new Map(); }
  prune(now = Date.now()) {
    for (const [session, tabs] of this.sessions) {
      for (const [tab, lastSeen] of tabs) if (now - lastSeen >= 100000) tabs.delete(tab);
      if (!tabs.size) this.sessions.delete(session);
    }
  }
  heartbeat(session, tab, visible, now = Date.now()) {
    this.prune(now);
    if (visible) {
      if (!this.sessions.has(session) && this.sessions.size >= 10000) throw new Error('Demasiadas sesiones.');
      const tabs = this.sessions.get(session) || new Map();
      if (!tabs.has(tab) && tabs.size >= 100) throw new Error('Demasiadas pestañas.');
      tabs.set(tab, now);
      this.sessions.set(session, tabs);
    } else {
      this.sessions.get(session)?.delete(tab);
      if (!this.sessions.get(session)?.size) this.sessions.delete(session);
    }
    return this.sessions.size;
  }
}

function createApp(directory, options = {}) {
  let aulaPromise;
  const presence = new Presence();
  const types = {html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',png:'image/png',txt:'text/plain; charset=utf-8'};
  const files = new Map(publicFiles.map(file=>['/'+file,[file,types[path.extname(file).slice(1)]]]));
  files.set('/',files.get('/index.html'));
  const timer = setInterval(() => presence.prune(), 30000);
  timer.unref();
  const server = http.createServer(async (request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'same-origin');
    response.setHeader('Cache-Control', 'no-store');
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname.startsWith('/api/aula')) {
      try {
        if (!aulaPromise) aulaPromise = require('./server/aula-node.cjs').createNodeAula({...options, publicDirectory:directory}).catch(e=>{aulaPromise=null;throw e;});
        const aula = await aulaPromise;
        const origin = options.origin || process.env.ENGLISH_ORIGIN || `${request.socket.encrypted?'https':'http'}://${request.headers.host}`;
        const headers = new Headers(request.headers);
        const remote = request.socket.remoteAddress || 'local';
        const forwarded = String(request.headers['x-forwarded-for'] || '').split(',').at(-1).trim();
        headers.set('x-aula-client', process.env.ENGLISH_PROXY_IP === remote && net.isIP(forwarded) ? forwarded : remote);
        const webRequest = new Request(new URL(request.url,origin), {
          method:request.method, headers,
          ...(['GET','HEAD'].includes(request.method)?{}:{body:request,duplex:'half'})
        });
        const result = await aula.api(webRequest);
        response.writeHead(result.status,Object.fromEntries(result.headers));
        if (result.body) for await (const chunk of result.body) response.write(chunk);
        response.end();
      } catch(e) {
        console.error('[Aula]',e.message);
        if(!response.headersSent)response.writeHead(503,{'Content-Type':'application/json; charset=utf-8'});
        response.end(JSON.stringify({error:'El aula no está disponible. Revisa la configuración del servidor.'}));
      }
      return;
    }
    if (pathname === '/api/presence' && request.method === 'POST') {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      try {
        if (request.headers.origin && new URL(request.headers.origin).host !== request.headers.host) {
          response.writeHead(403); response.end('{"error":"Origen no permitido"}'); return;
        }
        let body = '';
        for await (const chunk of request) {
          body += chunk;
          if (body.length > 2048) throw new Error('Solicitud demasiado grande.');
        }
        const data = JSON.parse(body);
        if (!data || typeof data.tabId !== 'string' || !/^[a-z0-9-]{8,80}$/i.test(data.tabId) || typeof data.visible !== 'boolean') throw new Error('Solicitud no válida.');
        const cookie = (request.headers.cookie || '').split(';').map(c => c.trim()).find(c => c.startsWith('english_visit='));
        let session = cookie?.slice('english_visit='.length);
        if (!session || !/^[a-f0-9]{48}$/.test(session)) {
          session = crypto.randomBytes(24).toString('hex');
          response.setHeader('Set-Cookie', `english_visit=${session}; Path=/; HttpOnly; SameSite=Lax${request.socket.encrypted ? '; Secure' : ''}`);
        }
        const online = presence.heartbeat(session, data.tabId, data.visible);
        response.end(JSON.stringify({online}));
      } catch {
        if (!response.headersSent) response.writeHead(400);
        response.end('{"error":"No pudimos actualizar la presencia"}');
      }
      return;
    }
    if (!['GET', 'HEAD'].includes(request.method) || !files.has(pathname)) {
      response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
      response.end('No encontrado'); return;
    }
    const [filename, contentType] = files.get(pathname);
    try {
      const content = fs.readFileSync(path.join(directory, filename));
      response.setHeader('Content-Type', contentType);
      response.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; media-src 'self' blob:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
      response.setHeader('Permissions-Policy','camera=(self), microphone=(self)');
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch {
      response.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
      response.end('Falta un archivo de English. Conserva los archivos juntos.');
    }
  });
  server.on('close', () => {clearInterval(timer);aulaPromise?.then(aula=>aula.close()).catch(()=>{});});
  return server;
}
if (require.main === module) {
  if (process.env.NODE_ENV === 'production' && !process.env.ENGLISH_ORIGIN?.startsWith('https://')) throw new Error('Configura ENGLISH_ORIGIN con la dirección HTTPS pública de English.');
  const directory = fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : path.join(__dirname, 'dist');
  const port = Number(process.env.ENGLISH_PORT || 8080);
  createApp(directory).listen(port, '0.0.0.0', () => {
    console.log(`English está disponible en http://localhost:${port}`);
  });
}
module.exports = {Presence, createApp};
