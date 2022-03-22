'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "13512480ea71968cc05b9d038f5c338e",
"assets/assets/angpoav.png": "ce5c3042569c3101cfea07397d0f81b6",
"assets/assets/animation_test_.riv": "9ac66fe2ea48ff1b5b711fbe13286430",
"assets/assets/body.png": "0e960bb927034b42bcc48ae41bc8003d",
"assets/assets/border.png": "a24f688d9b600a5d6794846142c19282",
"assets/assets/full_angpoav.jpg": "587da04c2dad444cd24d207cbd06a608",
"assets/assets/header.png": "95f190714d645d89cd26e6fba407ad58",
"assets/assets/header_angpaov.riv": "b1f7543eddc7335c7dbffc55e6734a14",
"assets/assets/img.jpg": "3c03939e54422e3b2466fa9b7248268f",
"assets/assets/khmer-new-year/background.png": "ffc7485ddd17d384f00aad4a620c0614",
"assets/assets/khmer-new-year/button_disable.svg": "1da754b030b96792d8116d463e418f9d",
"assets/assets/khmer-new-year/button_enable.svg": "759d4a254893156be6b664d171a5f984",
"assets/assets/khmer-new-year/khmer_new_year_1.riv": "e326ccf153ee35cef10db445026d5992",
"assets/assets/khmer-new-year/khmer_new_year_2.riv": "68472822b4c0814c64d7522b1f8312b1",
"assets/assets/khmer-new-year/number/%2525.png": "50a02c6f7d8d4dd4802311abcc640b54",
"assets/assets/khmer-new-year/number/0.png": "4f141f4a4f9fd50cefa20f2c690e87c4",
"assets/assets/khmer-new-year/number/1.png": "62b33bdd6e52bbbbb557dcd9ddfa5169",
"assets/assets/khmer-new-year/number/2.png": "b37f558428fef1cbffa01f51e06b68fb",
"assets/assets/khmer-new-year/number/3.png": "e702b9d99f880f9e0e8b401639b974bc",
"assets/assets/khmer-new-year/number/4.png": "67a44eea8ab81ef065e14174cf41907b",
"assets/assets/khmer-new-year/number/5.png": "3b36ce9b11c8d625076bc9c5b0b81fdf",
"assets/assets/khmer-new-year/number/6.png": "eb653e6787fd95e4f2e002180b254db3",
"assets/assets/khmer-new-year/number/7.png": "a7e2aa3970158860a9aa3cbb2aeb86fa",
"assets/assets/khmer-new-year/number/8.png": "03d856b7f187c1aedd9d95515057ae14",
"assets/assets/khmer-new-year/number/9.png": "b3a1e1ee6c729de49fb358c4aec462d8",
"assets/assets/khmer-new-year/pot_logo.png": "93e0d16f18052e9c65fd1c96cce1a9bb",
"assets/assets/khmer-new-year/reward/body.png": "4db87ac051e95ac2463a1fc348d8d36f",
"assets/assets/khmer-new-year/reward/full.png": "bcd5e84800818e9738f533d4f1c97f9a",
"assets/assets/khmer-new-year/reward/head.png": "5481515f7d209b4711aba3c0ad85f376",
"assets/assets/khmer-new-year/reward/open_reward.png": "8671122057c5906d287add4c74925fff",
"assets/assets/khmer-new-year/reward/reward.png": "a085317795a54052f24b356ea6711a1f",
"assets/assets/khmer-new-year/reward/reward_body.png": "36ee2041230f16839a6ffb961158d4af",
"assets/assets/khmerNewYear.riv": "5b18591b0b4e7863628a4b4353b40801",
"assets/assets/new_file.riv": "e2b0b57f79b1858203910af86fb8d413",
"assets/assets/red_pocket.riv": "70c4004c8db00ae72ffa98a726ce89fd",
"assets/assets/ring.riv": "e647881fa2ea3edd02d6b827f28fbb75",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "247d2447651e56a16c5b2d459786a794",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "da8b4fb88ef0e583bbe444ef566196ab",
"/": "da8b4fb88ef0e583bbe444ef566196ab",
"main.dart.js": "603fcfda14d29108eea3991e3f4f0682",
"manifest.json": "06c2b8b69642d998bc640749ac7ca9a7",
"version.json": "fcec7228e4d6ff175f9aae2b147703a4"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
