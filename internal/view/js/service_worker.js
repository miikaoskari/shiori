// service worker for progressive web app and offline support

//fetch event
self.addEventListener("fetch", (event) => {
    console.log("fetch event", event.request.url);

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log("found in cache", event.request.url);
                return response;
            }
            console.log("not found in cache");

            return fetch(event.request)
            .then((response) => {
                console.log("response from network is", response);

                return response;
            })
            .catch((error) => {
                console.log("error fetching from network", error);
                throw error;
            });
        })
    );
});

//install event
self.addEventListener("install", (event) => { 
    event.waitUntil(
        caches
        .open("v1")
        .then((cache) => ([
            "/",
            "index.html",
            "css/*.css",
            "js/*.js",
            "js/components/*.js",
            "js/page/*.js",
            "res/*.png",
            "less/*.less",
        ])
        )
    );
});

