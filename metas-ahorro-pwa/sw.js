const CACHE_NAME =
"metas-ahorro-v2";

const FILES = [

"./",

"./index.html",

"./manifest.json",

"./css/styles.css",

"./js/storage.js",

"./js/charts.js",

"./js/calendar.js",

"./js/notifications.js",

"./js/app.js"

];

self.addEventListener(
"install",
event=>{

event.waitUntil(

caches
.open(CACHE_NAME)
.then(cache=>
cache.addAll(FILES)
)

);

});

self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches
.match(event.request)
.then(response=>

response ||
fetch(event.request)

)

);

});