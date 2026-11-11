/* Rio planner service worker: keeps the app, fonts and photos on the device so it opens with no internet. */
var VER = "rio-7baeea1516", CORE = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-180.png", "fonts/shrikhand.woff2", "fonts/figtree.woff2", "fonts/dmmono.woff2"], PHOTOS = ["photos/028d935cf1b953a7be939c6259659365.jpg", "photos/0c5de47bf2219aaa73a898210acc4108.jpg", "photos/0e81f6b7ef2da1a447927fc4cf9a4f65.jpg", "photos/14450971f410fe6c9dd8df0ef33d8bdf.jpg", "photos/18e8df8bf7c4f337b2ecfe110915d64b.jpg", "photos/2447bc49bc582a358ec5f178d5ed29d0.jpg", "photos/2a9a7d11f589cfc4fe826e5cea9110ab.jpg", "photos/337ba14bb3fd88054841c2bc36086366.jpg", "photos/399f2771de6f89926a7ad02fe8fcee97.jpg", "photos/3b494e0e9215a57dd8256da96bc1da32.jpg", "photos/3c195d27b03267c19089d3981453a546.jpg", "photos/3d3ea7cd3045ed6aabf47fbe9efbf9cf.jpg", "photos/3f108d6403526a69f8499e3df7b1675e.jpg", "photos/41798d8590994f050c8cf2a51ea069e4.jpg", "photos/438177a76fd07007d18d7414ce136876.jpg", "photos/45ca13a13c3bb14fc3fd545276ecdb34.jpg", "photos/4841b7ab083dd01af1e7809d0d62f913.jpg", "photos/4af7bae6460f6e33196f8dc9b43af74f.jpg", "photos/4c8da955298683fbc022ed4795127bfc.jpg", "photos/4e48039171aeb3cc80ae37d9caf8bee0.jpg", "photos/53127a8bdcabe913a77c6dcd8e53ec89.jpg", "photos/557d6e617f4b360d9a68445cfe7713ae.jpg", "photos/5891edf48c174e969be17557a46c9e2f.jpg", "photos/5a108c3057117539871d25288755a3a0.jpg", "photos/5cb88adab2927ac53c3caaa030a1b421.jpg", "photos/622f6804a1c6c03aff173ea5b7686f78.jpg", "photos/66f8df8beaf1720cbe35a6afdb6a8b2c.jpg", "photos/6c188155c6114adfc13bba59cbf18ce4.jpg", "photos/6f8ab5e6c3e5d787a9690ab214315516.jpg", "photos/72694f153b06541db5f5f690d3f2193a.jpg", "photos/73cba4bb5f8eb857f9ff40f4cda22a74.jpg", "photos/748336f0309c05b6283b877d239ca9aa.jpg", "photos/771122e640a9e0574ebe0a2beb86f144.jpg", "photos/78a5022f4be541b6dc4d8da609566146.jpg", "photos/793128a2a133adbcd10da05ada17f52a.jpg", "photos/793f5bb593a6ef78defae91c2c661123.jpg", "photos/7a8e039ffbe89421e21098ce68526626.jpg", "photos/7a9feb67fa11329138e6844e04460cdf.jpg", "photos/7e4f2293d4bf661cbc6076ef42b2d553.jpg", "photos/846d81d889ad0ad88cc99605b0b7d39a.jpg", "photos/87809cf0bf8f984378b8b76721046e34.jpg", "photos/8ab4f54d0dd53fac44a1db49fc777592.jpg", "photos/9012d5155b90626ed5e12c0f05e8824b.jpg", "photos/9b3683d306c77400ec4bd4def4d15197.jpg", "photos/9c0512ed991f78940e86fcfa66d33975.jpg", "photos/9d1184f18edbe05bb5f581135802485b.jpg", "photos/a119230f5d8a24e0d6b8138f30e4071b.jpg", "photos/a25248d26f4b446281afdea7d432debf.jpg", "photos/b2777cb56d6f8d67c75a1ad669c912ce.jpg", "photos/b5a273f94cb807cc8ebbabd5592c9e65.jpg", "photos/b8f6222ebe42aa675ebe7405cde2b211.jpg", "photos/c29e7bac01eae0f6d909bef20dd60d32.jpg", "photos/c5c6f034ff6c629c3af32970a54a8893.jpg", "photos/cc60fb96f7132f1afe5a1a0b0498c1a2.jpg", "photos/cd86a5d155ffee56532ed2edc3dac892.jpg", "photos/d3d2add5998149de900016170de67cd5.jpg", "photos/d609fac839e303c5430996349d5fc2de.jpg", "photos/d9e2e85031905032d8cb9c446c1ec185.jpg", "photos/da739f068bc83e37a3d65a66e7e4390b.jpg", "photos/dd5c916e2a5c4b5bc9c03997d65de38d.jpg", "photos/e0dde44c1388de1ced300bbd857d662a.jpg", "photos/ed2fd9466708c1f8ce0571a4508ee26c.jpg", "photos/f12d521aa2876491640423c4c650b283.jpg", "photos/f1af9dac52c1bccca6284f7501dad1f9.jpg", "photos/f6316f9b966aec50515d33f1b6fb1937.jpg"], RAW = "https://raw.githubusercontent.com/astratinei/rio-k7q3m9/data/photos/";
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(VER).then(function(c){
    return c.addAll(CORE).then(function(){
      // photos one by one so a single failure doesn't stop the install
      return Promise.all(PHOTOS.map(function(p){ return c.add(p).catch(function(){}); }));
    });
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k.indexOf("rio-") === 0 && k !== VER && k !== "rio-photos"; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
function timeout(ms, p){ return new Promise(function(res, rej){ var t = setTimeout(function(){ rej(new Error("timeout")); }, ms); p.then(function(v){ clearTimeout(t); res(v); }, function(er){ clearTimeout(t); rej(er); }); }); }
self.addEventListener("fetch", function(e){
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.origin === location.origin){
    var isPage = req.mode === "navigate" || /\/(index\.html)?$/.test(url.pathname);
    if (isPage){
      // newest app when online, the saved one when not
      e.respondWith(timeout(4000, fetch(req, {cache:"no-store"})).then(function(r){
        if (r && r.ok){ var cp = r.clone(); caches.open(VER).then(function(c){ c.put("index.html", cp); }); }
        return r;
      }).catch(function(){ return caches.match("index.html", {ignoreSearch:true}).then(function(m){ return m || caches.match("./"); }); }));
      return;
    }
    e.respondWith(caches.match(req, {ignoreSearch:true}).then(function(m){
      return m || fetch(req).then(function(r){ if (r && r.ok){ var cp = r.clone(); caches.open(VER).then(function(c){ c.put(req, cp); }); } return r; });
    }));
    return;
  }
  if (req.url.indexOf(RAW) === 0){
    // photos added in the app: keep a copy once seen
    e.respondWith(caches.open("rio-photos").then(function(c){
      return c.match(req, {ignoreSearch:true}).then(function(m){
        return m || fetch(req).then(function(r){ if (r && r.ok) c.put(req, r.clone()); return r; });
      });
    }));
  }
});
