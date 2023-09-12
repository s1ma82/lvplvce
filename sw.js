self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('my-cache').then(cache => {
            const reqArr = [`themes/`]
            return cache.addAll(reqArr)
        })
    )
})

self.addEventListener('message', e => {
    const theme = e.data.value
})
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request)
        })
    )
})