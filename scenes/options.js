class options extends Phaser.Scene {
  constructor() {
    super("options");
  }
  preload() {


  }
  create() {
    this.cameras.main.setBackgroundColor(0xf7eac6);
    //var optionsBackground = this.add.image(0, 0, 'optionsbg').setInteractive().setScale(1).setOrigin(0);
    this.playText = this.add.bitmapText(game.config.width / 2, 75, 'topaz', 'OPTIONS', 80).setOrigin(.5, .5).setTint(0xc76210).setInteractive();

    this.bgText = this.add.bitmapText(50, 175, 'topaz', 'Table Color:', 60).setOrigin(0, .5).setTint(0x000000);
    this.packNum = gameSettings.pack;
    this.deckNum = gameSettings.deckNum;
    //background square buttons
    for (var b = 0; b < gameOptions.bgColors.length; b++) {
      var bgsample = this.add.image(50 + b * 100, 275, 'blank').setOrigin(0, .5).setTint(gameOptions.bgColors[b]).setInteractive();
      bgsample.displayWidth = 75;
      bgsample.displayHeight = 75;
      bgsample.num = b + 1;
    }



    this.deckText = this.add.bitmapText(50, 375, 'topaz', 'Deck Style:', 60).setOrigin(0, .5).setTint(0x000000);

    this.marker = this.add.image(-100, -100, 'blank').setOrigin(.5, .5).setTint(0x00ff00).setAlpha(.4);
    this.marker.displayWidth = 75;
    this.marker.displayHeight = 75;

    this.bgsample = this.add.image(0, 450, 'blank').setOrigin(0, 0).setTint(gameOptions.bgColors[gameOptions.bgColor]);
    this.bgsample.displayWidth = 900;
    this.bgsample.displayHeight = 350;
    /*
        

    */
    this.backText = this.add.bitmapText(50, 850, 'topaz', 'Card Back:', 60).setOrigin(0, .5).setTint(0x000000);


    this.marker2 = this.add.image(-100, -100, 'blank').setOrigin(.5, .5).setTint(0x00ff00).setAlpha(.4);
    this.cardBacks = [];


    for (var b = 0; b < 10; b++) {
      if (b < 5) {
        var x = b;
        var y = 1000;
      } else {
        var x = b - 5;
        var y = 1300;
      }
      this.cardBack1 = this.add.image(100 + x * 175, y, gameOptions.deck, 52 + b).setScale(decks[gameSettings.deckNum].baseScale).setInteractive();
      this.cardBacks.push(this.cardBack1);
      this.cardBack1.back = 52 + b;
    }



    // this.input.on('poimterdown', this.down,this);
    // this.input.on('pointermove', this.move,this);
    //this.input.on('pointerup', this.up,this);

    var backIcon = this.add.image(450, 1500, 'icons', 5).setInteractive().setScale(1.5).setTint(0xc76210);
    backIcon.on('pointerdown', function () {
      this.scene.start('startGame');
    }, this)
    console.log(decks.length);

    this.showDecks('next', gameSettings.pack);

    this.preIcon = this.add.image(50, 600, 'icons', 6).setScale(1.2).setTint(0xffffff).setInteractive();
    this.preIcon.on('pointerdown', function () {
      this.pre();
    }, this)

    this.nextIcon = this.add.image(850, 600, 'icons', 7).setInteractive().setScale(1.2).setTint(0xffffff);
    this.nextIcon.on('pointerdown', function () {
      this.next();
    }, this)

    this.input.on('gameobjectdown', this.click, this);
  }
  update() {

  }
  next() {

    if (this.packNum == deckPacks.length - 1) {
      this.packNum = 0;
    } else {
      this.packNum++;
    }
    this.hideDecks('next');
    this.showDecks('next', this.packNum);
  }
  pre() {
    if (this.packNum == 0) {
      this.packNum = deckPacks.length - 1;
    } else {
      this.packNum--;
    }


    this.hideDecks('pre');
    this.showDecks('pre', this.packNum);

  }


  showDecks(dir, pack) {
    if (dir == 'next') {
      var xFrom = 1600;
    } else {
      var xFrom = -1600;
    }
    if (this.deckGroup) {
      //this.deckGroup.destroy();
    }
    var start = deckPacks[pack].start;
    this.deckGroup = this.add.container(xFrom, 0);



    for (var i = 0; i < 3; i++) {
      var name = this.add.bitmapText(175 + i * 250, 425, 'topaz', decks[i + start].name, 50).setOrigin(.5).setTint(0xff0000);

      var card = this.add.image(175 + i * 250, 600, decks[i + start].key, 0).setScale(decks[i + start].baseScale);
      var card2 = this.add.image(225 + i * 250, 650, decks[i + start].key, 24).setScale(decks[i + start].baseScale).setInteractive();
      this.deckGroup.add(card)
      this.deckGroup.add(card2)
      this.deckGroup.add(name)
      card2.deck = decks[i + start].key
      card2.deckNum = i + start;

      //var card2 = this.add.image(150, 600, 'cards', 24).setScale(.8).setInteractive();

    }

    var tween = this.tweens.add({
      targets: this.deckGroup,
      x: 0,
      duration: 600
    })
  }

  showDecks_old(dir) {
    if (dir == 'next') {
      var xFrom = 1600;
    } else {
      var xFrom = -1600;
    }
    if (this.deckGroup) {
      //this.deckGroup.destroy();
    }

    this.deckGroup = this.add.container(xFrom, 0);
    for (var i = 0; i < 3; i++) {
      if (i + this.deckNum < decks.length) {
        var card = this.add.image(175 + i * 250, 600, decks[i + this.deckNum].key, 0).setScale(decks[i + this.deckNum].baseScale);
        var card2 = this.add.image(225 + i * 250, 650, decks[i + this.deckNum].key, 24).setScale(decks[i + this.deckNum].baseScale).setInteractive();
        this.deckGroup.add(card)
        this.deckGroup.add(card2)
        card2.deck = decks[i + this.deckNum].key;
        card2.deckNum = i + this.deckNum;
        //var card2 = this.add.image(150, 600, 'cards', 24).setScale(.8).setInteractive();
      } else {
        this.nextIcon.disableInteractive()
      }
    }

    var tween = this.tweens.add({
      targets: this.deckGroup,
      x: 0,
      duration: 600
    })
  }
  hideDecks(dir) {
    if (dir == 'next') {
      var xTo = -1600;
    } else {
      var xTo = 1600;
    }
    var tween = this.tweens.add({
      targets: this.deckGroup,
      x: xTo,
      duration: 600,

    });
  }
  changeBacks() {
    var back = 52;
    for (var i = 0; i < this.cardBacks.length; i++) {
      this.cardBacks[i].setTexture(gameOptions.deck, back).setScale(decks[gameSettings.deckNum].baseScale);
      back++
    }
  }


  click(e, obj) {
    console.log(obj.deck)
    if (obj.deck) {
      gameOptions.deck = obj.deck;
      gameSettings.deckKey = obj.deck;
      gameSettings.deckNum = obj.deckNum;
      gameSettings.pack = this.packNum;
      this.children.bringToTop(this.marker)
      this.marker.setPosition(obj.x, obj.y);
      this.changeBacks();
      this.saveSettings();
    } else if (obj.num) {
      gameOptions.bgColor = obj.num - 1;
      gameSettings.color = obj.num - 1;
      this.bgsample.setTint(gameOptions.bgColors[obj.num - 1]);
      this.saveSettings();
    } else if (obj.back) {
      gameOptions.deckBack = obj.back;
      gameSettings.back = obj.back;
      this.saveSettings();
      this.children.bringToTop(this.marker2)
      this.marker2.setPosition(obj.x, obj.y);
    }

  }
  saveSettings() {
    localStorage.setItem('solitaireSettings', JSON.stringify(gameSettings));
  }
}
