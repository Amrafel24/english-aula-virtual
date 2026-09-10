// Permite mostrar avisos del sistema en navegadores compatibles cuando la página está abierta.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const destination = new URL('index.html#/recordatorio', self.registration.scope).href;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for (const client of windows) {
      if (new URL(client.url).origin === self.location.origin) {
        await client.focus();
        await client.navigate(destination);
        return;
      }
    }
    await self.clients.openWindow(destination);
  })());
});
