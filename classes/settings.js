let gameOptions = {

  deck: 'cards_modern',
  deckBack: 52,
  cardWidth: 130,
  cardHeight: 202,
  // flipping speed in milliseconds
  flipSpeed: 200,
  // flipping zoom ratio. Simulates the card to be raised when flipping
  flipZoom: 1.2,
  bgColors: [0x168513, 0x000000, 0x993300, 0x0033cc, 0xf7eac6, 0x333333, 0x488a81],
  bgColor: 0
}
let currentGame;
let currentGameNum;

let gameSettings = {};
let defaultSettings = { pack: 0, deckKey: 'cards', deckNum: 0, sound: true, color: 0, back: 0 };

let gameData = {};
let defaultData = [
  { name: 'Pyramid', attempts: 0, wins: 0, preferance1: false },
  { name: 'Aces Up', attempts: 0, wins: 0, preferance1: false },
  { name: 'Golf', attempts: 0, wins: 0, preferance1: false },
  { name: 'Elevens', attempts: 0, wins: 0, preferance1: false },
  { name: 'Monte Carlo', attempts: 0, wins: 0, preferance1: 'rank' },
  { name: 'Cruel', attempts: 0, wins: 0, preferance1: false },
  { name: 'Carpet', attempts: 0, wins: 0, preferance1: false },
  { name: 'Free Cell', attempts: 0, wins: 0, preferance1: false },
  { name: 'Scorpian', attempts: 0, wins: 0, preferance1: false },
  { name: 'Klondike', attempts: 0, wins: 0, preferance1: false },
  { name: 'Canfield', attempts: 0, wins: 0, preferance1: 3 },
  { name: 'Beleaguered Castle', attempts: 0, wins: 0, preferance1: false },
  { name: 'Alterations', attempts: 0, wins: 0, preferance1: false },
  { name: 'Yukon', attempts: 0, wins: 0, preferance1: true },
  { name: 'Diplomat', attempts: 0, wins: 0, preferance1: false },
  { name: 'Euchre', attempts: 0, wins: 0, preferance1: false },
  { name: 'Miss Milligan', attempts: 0, wins: 0, preferance1: false },





];



let deckPacks = [
  { name: 'one', start: 0 },
  { name: 'two', start: 3 },
  { name: 'three', start: 6 },
  { name: 'four', start: 9 },
  { name: 'five', start: 12 },
  { name: 'six', start: 15 },
  { name: 'seven', start: 18 },
  { name: 'eight', start: 21 },
  { name: 'nine', start: 24 },
  { name: 'ten', start: 27 },
  { name: 'eleven', start: 30 },
  { name: 'twelve', start: 33 },



]
let decks = [
  //0

  { key: 'cards_modern', name: 'Modern', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },
  { key: 'cards_classic', name: 'Classic', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },
  //3
  { key: 'cards_real', name: 'Real', baseScale: 1.7, cardWidth: 103, cardHeight: 138 },
  { key: 'cards_windows', name: 'Windows', baseScale: 2.2, cardWidth: 75, cardHeight: 105 },
  { key: 'cards_pixel_2', name: 'Pixel 2', baseScale: 3.8, cardWidth: 42, cardHeight: 62 },
  //6

  { key: 'cards_roast', name: 'Roast', baseScale: 1.25, cardWidth: 140, cardHeight: 190 },

  //9
  { key: 'cards_other', name: 'Other', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },
  { key: 'cards_black_simple', name: 'Simple Black', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },
  { key: 'cards_mono', name: 'Monochrome', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },
  //12
  { key: 'cards_face', name: 'Faces', baseScale: .8, cardWidth: 200, cardHeight: 300 },
  { key: 'cards_large', name: 'Large', baseScale: 1.2, cardWidth: 140, cardHeight: 190 },

  //15
  { key: 'cards_sixty', name: 'Sixties', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  { key: 'cards_sixty_2', name: 'Sixties 2', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  { key: 'cards_square', name: 'Square', baseScale: .9, cardWidth: 178, cardHeight: 178 },
  //18
  { key: 'cards_apollo', name: 'Apollo', baseScale: .9, cardWidth: 178, cardHeight: 178 },
  { key: 'cards_draw', name: 'Draw', baseScale: 1.1, cardWidth: 141, cardHeight: 198 },
  { key: 'cards_angle', name: 'Angle', baseScale: .7, cardWidth: 235, cardHeight: 331 },
  //21
  { key: 'cards_large_2', name: 'Large 2', baseScale: 1.1, cardWidth: 146, cardHeight: 198 },
  { key: 'cards_animal', name: 'Animals', baseScale: .7, cardWidth: 235, cardHeight: 331 },
  { key: 'cards_minimal', name: 'Minimal', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  //24
  { key: 'cards_inverse', name: 'Inverse', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  { key: 'cards_space', name: 'Space', baseScale: 1.0, cardWidth: 145, cardHeight: 216 },
  { key: 'cards_swicon', name: 'SW Icon', baseScale: .5, cardWidth: 300, cardHeight: 420 },
  //27

  { key: 'cards_mob', name: 'Mob', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  { key: 'cards_folk', name: 'Folk', baseScale: 1.3, cardWidth: 124, cardHeight: 172 },
  //30

  { key: 'cards_nyc', name: 'NYC', baseScale: .85, cardWidth: 185, cardHeight: 257 },
  { key: 'cards_double', name: 'Double', baseScale: .82, cardWidth: 195, cardHeight: 273 },
  //33
  { key: 'cards_headless', name: 'Headless', baseScale: .80, cardWidth: 200, cardHeight: 300 },
  { key: 'cards_mobile', name: 'Mobile', baseScale: 1.1, cardWidth: 145, cardHeight: 192 },
  { key: 'cards_cartoon', name: 'Cartoon', baseScale: 2.2, cardWidth: 76, cardHeight: 106 },
  //36
  { key: 'cards_simple', name: 'Simple', baseScale: .8, cardWidth: 206, cardHeight: 292 },
  { key: 'cards_minipixel', name: 'Mini Pixel', baseScale: .9, cardWidth: 178, cardHeight: 250 },
  { key: 'cards_civ', name: 'Civ', baseScale: .7, cardWidth: 225, cardHeight: 315 },
  //39
  { key: 'cards_pantheon', name: 'Pantheon', baseScale: .73, cardWidth: 215, cardHeight: 301 },
  { key: 'cards_drawing', name: 'Drawing', baseScale: .9, cardWidth: 165, cardHeight: 255 },
  { key: 'cards_largeindex', name: 'Large Index', baseScale: .9, cardWidth: 178, cardHeight: 250 },

]



let games = [
  { name: 'Pyramid', key: 'playPyramid', cols: 7 },
  { name: 'Aces Up', key: 'playAces', cols: 5 },
  { name: 'Golf', key: 'playGolf', cols: 7 },
  { name: 'Elevens', key: 'playElevens', cols: 4 },
  { name: 'Monte Carlo', key: 'playMonteCarlo', cols: 6 },
  { name: 'Cruel', key: 'playCruel', cols: 6 },
  { name: 'Carpet', key: 'playCarpet', cols: 6 },
  { name: 'Free Cell', key: 'playFreecell', cols: 8 },
  { name: 'Scorpian', key: 'playScorpian', cols: 7 },
  { name: 'Klondike', key: 'playKlondike', cols: 7 },
  { name: 'Canfield', key: 'playCanfield', cols: 5.5 },
  { name: 'Beleaguered Castle', key: 'playBeleaguered' },
  { name: 'Alterations', key: 'playAlterations', cols: 8 },
  { name: 'Yukon', key: 'playYukon', cols: 7 },
  { name: 'Diplomat', key: 'playDiplomat', cols: 8 },
  { name: 'Euchre', key: 'playEuchre', cols: 5 },
  { name: 'Miss Milligan', key: 'playMissMilligan', cols: 8 },

]

