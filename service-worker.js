const CACHE_NAME = "goatv-v2";

const FILES = [

  "./",

  "./index.html",

  "./player.html",

  "./admin.html",

  "./manifest.json",

  "./css/style.css",

  "./css/player.css",

  "./css/dashboard.css",

  "./js/firebase.js",

  "./js/firestore.js",

  "./js/auth.js",

  "./js/app.js",

  "./js/player.js",

  "./js/admin.js",

  "./assets/default-logo.png",

  "./assets/default-channel.png"

];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll(FILES);

    })

  );

  self.skipWaiting();

});

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      )

    )

  );

  self.clients.claim();

});

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request);

    })

  );

});
