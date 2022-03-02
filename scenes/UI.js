class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {


  }
  create() {
    let gameName;
    this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5, 0).setTint(0xf5625d);
    this.header.displayWidth = 870;
    this.header.displayHeight = 200;
    
    gameName = games[currentGameNum].name;
    this.attempts = gameData[currentGameNum].attempts;
    this.wins = gameData[currentGameNum].wins;

    this.scoreText = this.add.bitmapText(50, 100, 'topaz', gameName, 80).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);
    var per = Math.round((this.wins / this.attempts) * 100);
    var text = this.wins;
    text += '/';
    text += this.attempts;
    text += '-' + per + '%';
    this.attemptsText = this.add.bitmapText(50, 175, 'topaz', text, 40).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);


    this.score = 0;
    // this.scoreText = this.add.bitmapText(85, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);

    this.resetIcon = this.add.image(560, 110, 'icons', 1).setInteractive();
    this.resetIcon.on('pointerdown', this.restartGame, this);

    this.settingIcon = this.add.image(680, 110, 'icons', 4).setInteractive();
    this.settingIcon.on('pointerdown', function() {
      this.scene.launch('pauseGame');
      this.scene.pause(currentGame);
      this.scene.pause('UI');
    }, this);



    this.homeIcon = this.add.image(800, 110, 'icons', 3).setInteractive();
    this.homeIcon.on('pointerdown', function() {
      this.scene.start('startGame');
      this.scene.stop(currentGame);
    }, this)

  }

  update() {

  }

  restartGame() {
    this.scene.start(currentGame);
    this.scene.start();
  }

}