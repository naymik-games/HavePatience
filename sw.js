var cacheName = 'phaser-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',



  '/scenes/endGame.js',
  '/scenes/options.js',
  '/scenes/preload.js',
  '/scenes/UI.js',
  '/scenes/pauseGame.js',
  '/scenes/startGame.js',

  '/scenes/games/aces.js',
  '/scenes/games/alterations.js',
  '/scenes/games/beleaguered.js',
  '/scenes/games/canfield.js',
  '/scenes/games/carpet.js',
  '/scenes/games/cruel.js',
  '/scenes/games/diplomat.js',
  '/scenes/games/elevens.js',
  '/scenes/games/euchre.js',
  '/scenes/games/freecell.js',
  '/scenes/games/golf.js',
  '/scenes/games/klondike.js',
  '/scenes/games/missmilligan.js',
  '/scenes/games/montecarlo.js',
  '/scenes/games/pyramid.js',
  '/scenes/games/scorpian.js',
  '/scenes/games/yukon.js',
  '/scenes/games/aces.js',

  '/assets/particle.png',
  '/assets/particles.png',
  '/assets/sprites/blank.png',
  '/assets/sprites/cards_angle.png',
  '/assets/sprites/cards_animal.png',
  '/assets/sprites/cards_apollo.png',
  '/assets/sprites/cards_art.png',
  '/assets/sprites/cards_black_simple.png',
  '/assets/sprites/cards_cartoon.png',
  '/assets/sprites/cards_civ.png',
  '/assets/sprites/cards_classic.png',
  '/assets/sprites/cards_double.png',
  '/assets/sprites/cards_draw.png',
  '/assets/sprites/cards_drawing.png',
  '/assets/sprites/cards_face.png',
  '/assets/sprites/cards_folk.png',
  '/assets/sprites/cards_headless.png',
  '/assets/sprites/cards_invers.png',
  '/assets/sprites/cards_large_2.png',
  '/assets/sprites/cards_large.png',
  '/assets/sprites/cards_largeindex.png',
  '/assets/sprites/cards_minimal.png',
  '/assets/sprites/cards_minipixel.png',
  '/assets/sprites/cards_mob.png',
  '/assets/sprites/cards_mobile.png',
  '/assets/sprites/cards_mono.png',
  '/assets/sprites/cards_nyc.png',
  '/assets/sprites/cards_other.png',
  '/assets/sprites/cards_pantheon.png',
  '/assets/sprites/cards_pixel_2.png',
  '/assets/sprites/cards_roast.png',
  '/assets/sprites/cards_simple.png',
  '/assets/sprites/cards_sixties_2.png',
  '/assets/sprites/cards_sixty.png',
  '/assets/sprites/cards_space.png',
  '/assets/sprites/cards_square.png',
  '/assets/sprites/cards_starwarsicon.png',
  '/assets/sprites/cards_windows.png',
  '/assets/sprites/icons.png',
  '/assets/sprites/modal.png',
  '/assets/sprites/my_cards_modern.png',
  '/assets/sprites/my_cards_real.png',
  '/assets/sprites/suit_icons.png',

  '/classes/deck.js',
  '/classes/Flip code.js',
  '/classes/settings.js',


  '/assets/fonts/lato.png',
  '/assets/fonts/lato.xml',





  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});