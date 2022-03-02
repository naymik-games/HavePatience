let game;



window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    //pixelArt: true,
    scene: [preloadGame, startGame, options, playPyramid,playGolf, playAces,playEuchre, playKlondike, playCruel, playFreecell, playElevens, playCanfield, playMonteCarlo, playYukon, playDiplomat, playScorpian, playBeleaguered, playCarpet, playAlterations, playMissMilligan, UI, pauseGame, endGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////


