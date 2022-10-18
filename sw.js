const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.0';

self.addEventListener('install', event => {
    console.log('Se ha instalado el SW');

    // Recursos estáticos
    const promiseCacheStatic = caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
            return cache.addAll([
                './', 
                './index.html',
            ]);
        });

    // Recursos inmutables
    const promiseCacheInmutable = caches.open(INMUTABLE_CACHE_NAME)
        .then((cache) => {
            return cache.addAll([
                // Los archivos de Bootstrap pueden ser actualizados debido a su versión, se dice que son archivos inmutables.
                `https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css`,
                `https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js`,
                `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css`,
            ]);
        });

    event.waitUntil(Promise.all([
        promiseCacheStatic, 
        promiseCacheInmutable
    ]));
});
//Only cache
//Solo queremos obtener lo almacenado dentro del cache
self.addEventListener('fetch', (event)=>{
    const respCaches = caches.match(event.request);
    event.respondWith(respCaches);
});