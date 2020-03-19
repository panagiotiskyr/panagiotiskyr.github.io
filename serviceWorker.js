'use strict';

const OFFLINE_CACHE_NAME = 'pkportfolio';

self.addEventListener('install', (installEvent) => {
	installEvent.waitUntil(
		caches.open(OFFLINE_CACHE_NAME).then((cache) => {
			return cache.addAll([
                '/',
                '/manifest.json',
                '/index.html',
                '/style/css/normalize.css',
                'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css',
                'https://fonts.googleapis.com/css?family=Alegreya+Sans:100,100i,300,300i,400,400i,500,500i,700,700i,800,800i,900,900i&display=swap',
                '/style/css/main.css',
                '/js/script.js',
                'https://code.jquery.com/jquery-3.4.1.min.js',
                'https://code.jquery.com/mobile/1.5.0-rc1/jquery.mobile-1.5.0-rc1.min.js',
                '/images/icons/icon-72x72.png',
                '/images/icons/icon-96x96.png',
                '/images/icons/icon-128x128.png',
                '/images/icons/icon-144x144.png',
                '/images/icons/icon-152x152.png',
                '/images/icons/icon-192x192.png',
                '/images/icons/icon-384x384.png',
                '/images/icons/icon-512x512.png',
            ]);
		})
	);
});

self.addEventListener('fetch', (fetchEvent) => {
    fetchEvent.respondWith(
        fetch(fetchEvent.request).catch((exception) => {
            return caches.open(OFFLINE_CACHE_NAME).then((cache) => {
                return cache.match(fetchEvent.request, { ignoreSearch: true });
            });
        })
    );
});
