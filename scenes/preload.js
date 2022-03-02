class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
  
	 
	 var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    } 
	  
	  
	  
	 
    //this.load.image("particle", "assets/sprites/particle.png");
  //  this.load.bitmapFont('topaz', 'assets/fonts/lato.png', 'assets/fonts/topaz.xml');
	this.load.bitmapFont('topaz', 'assets/fonts/lato_0.png', 'assets/fonts/lato.xml');
	 this.load.spritesheet("cards", "assets/sprites/my_cards_pixel.png", {
      frameWidth: 130,
      frameHeight: 202,
	  spacing: 10,
	  margin:5
    });
	this.load.spritesheet("cards_real", "assets/sprites/my_cards_real.png", {
      frameWidth: 103,
      frameHeight: 138,
	  spacing: 10,
	  margin:5
    });
	this.load.spritesheet("cards_modern", "assets/sprites/my_cards_modern.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_classic", "assets/sprites/cards_classic.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_windows", "assets/sprites/cards_windows.png", {
      frameWidth: 75,
      frameHeight: 105,
	  spacing: 1,
	  margin:1
    });
	
	
	this.load.spritesheet("cards_pixel_2", "assets/sprites/cards_pixel_2.png", {
      frameWidth: 42,
      frameHeight: 60,
	  spacing: 23,
	  margin:11
    });
	
	this.load.spritesheet("cards_black", "assets/sprites/cards_black.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_roast", "assets/sprites/cards_roast.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_2d", "assets/sprites/cards_2d.png", {
      frameWidth: 88,
      frameHeight: 124,
    });

	this.load.spritesheet("cards_other", "assets/sprites/cards_other.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_black_simple", "assets/sprites/cards_black_simple.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_mono", "assets/sprites/cards_mono.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_face", "assets/sprites/cards_face.png", {
      frameWidth: 200,
      frameHeight: 300,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_large", "assets/sprites/cards_large.png", {
      frameWidth: 140,
      frameHeight: 190,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_throne", "assets/sprites/cards_throne.png", {
      frameWidth: 164,
      frameHeight: 241,
	  spacing: 2,
	  margin:2
    });

	this.load.spritesheet("cards_sixty", "assets/sprites/cards_sixty.png", {
      frameWidth: 178,
      frameHeight: 250,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_sixty_2", "assets/sprites/cards_sixties_2.png", {
      frameWidth: 178,
      frameHeight: 250,
	  spacing: 2,
	  margin:2
    });
    this.load.spritesheet("cards_square", "assets/sprites/cards_square.png", {
      frameWidth: 178,
      frameHeight: 178,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_apollo", "assets/sprites/cards_apollo.png", {
      frameWidth: 178,
      frameHeight: 250,
	  spacing: 2,
	  margin:2
    });

	this.load.spritesheet("cards_draw", "assets/sprites/cards_draw.png", {
      frameWidth: 141,
      frameHeight: 198,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_angle", "assets/sprites/cards_angle.png", {
      frameWidth: 235,
      frameHeight: 331,
	  spacing: 2,
	  margin:2
    });
	this.load.spritesheet("cards_large_2", "assets/sprites/cards_large_2.png", {
      frameWidth: 146,
      frameHeight: 198,

    });
	this.load.spritesheet("cards_animal", "assets/sprites/cards_animal.png", {
      frameWidth: 235,
      frameHeight: 331,
	  spacing: 2,
	  margin:2
    });
    this.load.spritesheet("cards_minimal", "assets/sprites/cards_minimal.png", {
      frameWidth: 178,
      frameHeight: 250,
	  spacing: 2,
	  margin:2
    });
    this.load.spritesheet("cards_inverse", "assets/sprites/cards_inverse.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_space", "assets/sprites/cards_space.png", {
      frameWidth: 145,
      frameHeight: 216,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_swicon", "assets/sprites/cards_starwarsicon.png", {
      frameWidth: 300,
      frameHeight: 420,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_swgold", "assets/sprites/cards_swgold.png", {
      frameWidth: 230,
      frameHeight: 322,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_mob", "assets/sprites/cards_mob.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_folk", "assets/sprites/cards_folk.png", {
      frameWidth: 124,
      frameHeight: 172,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_lotr", "assets/sprites/cards_lotr.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });

    this.load.spritesheet("cards_nyc", "assets/sprites/cards_nyc.jpg", {
      frameWidth: 185,
      frameHeight: 257,
      spacing: 2,
      margin: 2
    });
	this.load.spritesheet("cards_double", "assets/sprites/cards_double.png", {
      frameWidth: 195,
      frameHeight: 273,
      spacing: 2,
      margin: 2
    });
	this.load.spritesheet("cards_headless", "assets/sprites/cards_headless.png", {
      frameWidth: 200,
      frameHeight: 300,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_mobile", "assets/sprites/cards_mobile.png", {
      frameWidth: 145,
      frameHeight: 192,
      spacing: 2,
      margin: 2
    });

    
    this.load.spritesheet("cards_cartoon", "assets/sprites/cards_cartoon.png", {
      frameWidth: 76,
      frameHeight: 106,
      spacing: 2,
      margin: 2
    });
    
    this.load.spritesheet("cards_simple", "assets/sprites/cards_simple.png", {
      frameWidth: 206,
      frameHeight: 292,
      spacing: 2,
      margin: 2
    });
    this.load.spritesheet("cards_minipixel", "assets/sprites/cards_minipixel.png", {
      frameWidth: 178,
      frameHeight: 250,
      spacing: 2,
      margin: 2
    });

   
  
   
   this.load.spritesheet("cards_civ", "assets/sprites/cards_civ.png", {
      frameWidth: 225,
      frameHeight: 315,
      spacing: 2,
      margin: 2
    });
   
   this.load.spritesheet("cards_pantheon", "assets/sprites/cards_pantheon.png", {
     frameWidth: 215,
     frameHeight: 301,
     spacing: 2,
     margin: 2
   });
  this.load.spritesheet("cards_drawing", "assets/sprites/cards_drawing.png", {
    frameWidth: 165,
    frameHeight: 255,
    spacing: 2,
    margin: 2
  });
this.load.spritesheet("cards_largeindex", "assets/sprites/cards_largeindex.png", {
    frameWidth: 178,
    frameHeight: 250,
    spacing: 2,
    margin: 2
  });
  


    this.load.spritesheet("icons", "assets/sprites/icons.png", {
      frameWidth: 96,
      frameHeight: 96
    });
	 this.load.spritesheet("suit_icons", "assets/sprites/suit_icons.png", {
      frameWidth: 75,
      frameHeight: 75
    });

   
    this.load.spritesheet("particle_color", "assets/particles.png", {
      frameWidth: 6,
      frameHeight: 6
    });

         
   	this.load.image('blank', 'assets/sprites/blank.png');
	this.load.image('modal', 'assets/sprites/modal.png');

  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








