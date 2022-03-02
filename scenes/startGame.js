class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
   // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');
    
  }
  create() {
	/*
    gameSettings = JSON.parse(localStorage.getItem('SDsave'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('SDsave', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }
	*/
        this.cameras.main.setBackgroundColor(0xf7eac6);

/*
gameSettings = JSON.parse(localStorage.getItem('SDsave'));
    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('SDsave', JSON.stringify(defaultValues));
      gameSettings = defaultValues;
    }

*/


gameData = JSON.parse(localStorage.getItem('solitaireData'));

    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('solitaireData',
        JSON.stringify(defaultData));
      gameData = defaultData;
    }
console.log(gameData[0])

gameSettings = JSON.parse(localStorage.getItem('solitaireSettings'));

    if (gameSettings === null || gameSettings.length <= 0) {
      localStorage.setItem('solitaireSettings',
       JSON.stringify(defaultSettings));
      gameSettings = defaultSettings;
    }
	gameOptions.bgColor = gameSettings.color;
	gameOptions.deckBack = gameSettings.back;
	gameOptions.deckNum = gameSettings.deckNum;
	gameOptions.deck = gameSettings.deckKey;
//	console.log(gameOptions.deckNum)
    var title = this.add.bitmapText(game.config.width / 2, 75, 'topaz', 'HAVE PATIENCE', 130).setOrigin(.5).setTint(0xc76210);
//var mainBackground = this.add.image(0, 0, 'mainbg').setInteractive().setScale(1).setOrigin(0);


this.bgsample = this.add.image(0, 175, 'blank').setOrigin(0, 0).setTint(gameOptions.bgColors[gameOptions.bgColor]);
    this.bgsample.displayWidth = 900;
    this.bgsample.displayHeight = 300;
var card = this.add.image(game.config.width / 2 - 125, 325, decks[gameOptions.deckNum].key, 12).setScale(decks[gameOptions.deckNum].baseScale);
var cardBack = this.add.image(game.config.width / 2 + 125, 325, decks[gameOptions.deckNum].key, gameOptions.deckBack).setScale(decks[gameOptions.deckNum].baseScale);
var name = this.add.bitmapText(100, 325, 'topaz', decks[gameOptions.deckNum].name, 50).setOrigin(.5).setTint(0xffffff);




var optionsIcon = this.add.image(game.config.width -100, 325, 'icons', 4).setInteractive().setScale(1.5).setTint(0xffffff);
    optionsIcon.on('pointerdown', function(){
		this.scene.start('options');
	}, this)



var suitC = this.add.image(150,1550, 'suit_icons', 1)
var suitD = this.add.image(350,1550, 'suit_icons', 0)
var suitH = this.add.image(550,1550, 'suit_icons', 2)
var suitS = this.add.image(750,1550, 'suit_icons', 3)



for (var g = 0; g < games.length; g++){
	//check if the number is even
	if(g % 2 == 0) {
		var x = 50;
		var ty = g
	} else {
		var x = 425;
		var ty = g -1
	}
	var y = 575 + ty * 50;
	
	var gameText = this.add.bitmapText(x, y, 'topaz', games[g].name, 60).setOrigin(0,.5).setTint(0x000000).setInteractive();
    gameText.key =  games[g].key;
	gameText.num =  g;
   	
}
this.input.on('gameobjectdown',this.click, this);

/*
    var startPyramid = this.add.bitmapText(50, 595, 'topaz', 'Pyramid', 60).setOrigin(0,.5).setTint(0x000000);
    startPyramid.setInteractive();
    startPyramid.on('pointerdown', function(){
	  currentGame = 'playPyramid';
		this.scene.start('playPyramid');
		this.scene.launch('UI');
	}, this);
	
	var startAces = this.add.bitmapText(50, 695, 'topaz', 'Aces Up', 60).setOrigin(0,.5).setTint(0x000000);
    startAces.setInteractive();
    startAces.on('pointerdown', function(){
      currentGame = 'playAces';
		this.scene.start('playAces');
		this.scene.launch('UI');
	}, this);
    
	var startGolf = this.add.bitmapText(50, 795, 'topaz', 'Golf', 60).setOrigin(0,.5).setTint(0x000000);
    startGolf.setInteractive();
    startGolf.on('pointerdown', function(){
      currentGame = 'playGolf';
		this.scene.start('playGolf');
		this.scene.launch('UI');
	}, this);
	var startElevens = this.add.bitmapText(50, 895, 'topaz', 'Elevens', 60).setOrigin(0,.5).setTint(0x000000);
    startElevens.setInteractive();
    startElevens.on('pointerdown', function(){
    currentGame = 'playElevens';
		this.scene.start('playElevens');
		this.scene.launch('UI');
	}, this);
	var startScorpian = this.add.bitmapText(50, 995, 'topaz', 'Scorpian', 60).setOrigin(0,.5).setTint(0x000000);
    startScorpian.setInteractive();
    startScorpian.on('pointerdown', function(){
    currentGame = 'playScorpian';
		this.scene.start('playScorpian');
		this.scene.launch('UI');
	}, this);
	
	
	
	
	
	
		var startFreecell = this.add.bitmapText(350, 595, 'topaz', 'Free Cell', 60).setOrigin(0,.5).setTint(0x000000);
    startFreecell.setInteractive();
    startFreecell.on('pointerdown', function(){
    currentGame = 'playFreecell';
		this.scene.start('playFreecell');
		this.scene.launch('UI');
	}, this);
	
	var startKlondike = this.add.bitmapText(350, 695, 'topaz', 'Klondike', 60).setOrigin(0,.5).setTint(0x000000);
    startKlondike.setInteractive();
    startKlondike.on('pointerdown', function(){
    currentGame = 'playKlondike';
		this.scene.start('playKlondike');
		this.scene.launch('UI');
	}, this);
	var startCanfield = this.add.bitmapText(350, 795, 'topaz', 'Canfield', 60).setOrigin(0,.5).setTint(0x000000);
    startCanfield.setInteractive();
    startCanfield.on('pointerdown', function(){
    currentGame = 'playCanfield';
		this.scene.start('playCanfield');
		this.scene.launch('UI');
	}, this);
	var startCruel = this.add.bitmapText(350, 895, 'topaz', 'Cruel', 60).setOrigin(0,.5).setTint(0x000000);
    startCruel.setInteractive();
    startCruel.on('pointerdown', function(){
    currentGame = 'playCruel';
		this.scene.start('playCruel');
		this.scene.launch('UI');
	}, this);
	
	
	
	
	
	
	
	
	var startEuchre = this.add.bitmapText(625, 595, 'topaz', 'Euchre', 60).setOrigin(0,.5).setTint(0x000000);
    startEuchre.setInteractive();
    startEuchre.on('pointerdown', function(){
    currentGame = 'playEuchre';
		this.scene.start('playEuchre');
		this.scene.launch('UI');
	}, this);
	var startMonteCarlo = this.add.bitmapText(625, 695, 'topaz', 'Monte Carlo', 60).setOrigin(0,.5).setTint(0x000000);
    startMonteCarlo.setInteractive();
    startMonteCarlo.on('pointerdown', function(){
    currentGame = 'playMonteCarlo';
		this.scene.start('playMonteCarlo');
		this.scene.launch('UI');
	}, this);
	var startYukon = this.add.bitmapText(625, 795, 'topaz', 'Yukon', 60).setOrigin(0,.5).setTint(0x000000);
    startYukon.setInteractive();
    startYukon.on('pointerdown', function(){
    currentGame = 'playYukon';
		this.scene.start('playYukon');
		this.scene.launch('UI');
	}, this);
	var startDiplomat = this.add.bitmapText(625, 895, 'topaz', 'Diplomat', 60).setOrigin(0,.5).setTint(0x000000);
    startDiplomat.setInteractive();
    startDiplomat.on('pointerdown', function(){
    currentGame = 'playDiplomat';
		this.scene.start('playDiplomat');
		this.scene.launch('UI');
	}, this);
	var startBeleaguered = this.add.bitmapText(350, 995, 'topaz', 'Beleaguered Castle', 60).setOrigin(0,.5).setTint(0x000000);
    startBeleaguered.setInteractive();
    startBeleaguered.on('pointerdown', function(){
    currentGame = 'playBeleaguered';
		this.scene.start('playBeleaguered');
		this.scene.launch('UI');
	}, this);
	
	var startCarpet = this.add.bitmapText(50, 1095, 'topaz', 'Carpet', 60).setOrigin(0,.5).setTint(0x000000);
    startCarpet.setInteractive();
    startCarpet.on('pointerdown', function(){
    currentGame = 'playCarpet';
		this.scene.start('playCarpet');
		this.scene.launch('UI');
	}, this);
	
	var startAlterations = this.add.bitmapText(350, 1095, 'topaz', 'Alterations', 60).setOrigin(0,.5).setTint(0x000000);
    startAlterations.setInteractive();
    startAlterations.on('pointerdown', function(){
    currentGame = 'playAlterations';
		this.scene.start('playAlterations');
		this.scene.launch('UI');
	}, this); */
	

  }
  
  click(e, obj){
	 
	  if(obj.key){
		  
		     currentGame = obj.key;
			 currentGameNum = obj.num;
		this.scene.start(obj.key);
		this.scene.launch('UI');
	  }
	}
  
}
