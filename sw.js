const version = "1.5.0.0";
const cacheName = `michaelprimo-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/style.css`,
        `/script.js`,
        '/color_discovery.PNG',
        '/email.png',
        `/github.png`,
        '/linkedin.png',
        '/Michael.png',
        '/mushroom_golden.png',
        '/neon_click.PNG',
        '/telegram.png',
        '/sw.js',
        '/twitter.png',
        '/manifest.json',
        '/manifest.webmanifest'
        /*
        '/colordiscovery/index.html',
        '/colordiscovery/style.css',
        '/colordiscovery/script.js',
        '/neonclick/AUTOMANI.TTF',
        '/neonclick/icons-192.png',
        '/neonclick/icons-512.png',
        '/neonclick/pause.png',
        '/neonclick/reset.png',
        '/neonclick/wallpaper.png',
        '/neonclick/animations.js',
        '/neonclick/buttons.js',
        '/neonclick/check.js',
        '/neonclick/countdown.js',
        '/neonclick/generate.js',
        '/neonclick/index.js',
        '/neonclick/reset.js',
        '/neonclick/state.js',
        '/goldenmushrooms/img/life_empty.png',
        '/goldenmushrooms/img/life.png',
        '/goldenmushrooms/img/mushroom_field.png',
        '/goldenmushrooms/img/mushroom_golden.png',
        '/goldenmushrooms/img/mushroom_nothing.png',
        '/goldenmushrooms/img/mushroom_poison.png',
        '/goldenmushrooms/img/mushroom_shield.png',
        '/goldenmushrooms/img/question.png',
        */
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
