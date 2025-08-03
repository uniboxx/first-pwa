console.log('I am a service worker');
const url = [
  '/index.html',
  '/styles.css',
  '/app.js',
  'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

//- prefetching resources
globalThis.addEventListener('install', (event) => {
  caches.open('v1').then((cache) => {
    cache.addAll(url);
  });
});

//- cache first strategy
// globalThis.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches
//       .match(event.request) // searching in the cache
//       .then((response) => {
//         // The request is in the cache or go to the network
//         return response || fetch(event.request);
//       })
//   );
// });

//- network first strategy
globalThis.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // I go to the network ALWAYS
      .catch((error) => {
        // if the network is down, I go to the cache
        return caches.open('assets').then((cache) => {
          return cache.match(event.request);
        });
      })
  );
});

// globalThis.addEventListener('fetch', (event) => {
//   console.log(`HTTP: ${event.request.url}`);

//   event.respondWith(new Response('Hello from the service worker!'));
// });
