class endGame extends Phaser.Scene {
  constructor() {
    super("endGame");
  }
  preload() {
    


  }
  init(data){
	  //this.totalBlocksRemoved = data.totalRemoved;
	  this.result = data.result;
	  //this.movesLeft = data.movesLeft;
	  //this.level = data.level;
  }
  create() {
//	this.cameras.main.setBackgroundColor(0xf7eac6);
	var timedEvent = this.time.addEvent({ delay: 1000, callback: this.showPreview, callbackScope: this, loop: false });
  
  this.previewBox = this.add.container(1000,0);
	var background = this.add.image(450, 820, 'modal');
	this.previewBox.add(background);

	

	  
    if(this.result == 'win'){
          var message = 'Success!'
          var mess = 'You beat the odds';
      } else {
        var message = 'Failure!'
		var mess = 'Try Again';
		
      }
   
	
	//challenge
	var titleText = this.add.bitmapText(450,475, 'topaz', message, 90).setOrigin(.5).setTint(0xffffff).setAlpha(1);
    this.previewBox.add(titleText); 
	
	let messText = this.add.bitmapText(450, 625, 'topaz', mess, 60).setOrigin(.5).setTint(0xc76210);
	this.previewBox.add(messText); 
	
	

	
	var playText = this.add.bitmapText(625,1150, 'topaz', 'CONTINUE', 50).setOrigin(.5).setTint(0xffffff).setAlpha(1).setInteractive();
    this.previewBox.add(playText); 
    //var cancelText = this.add.bitmapText(175,1150, 'atari', '[X]', 50).setOrigin(.5).setTint(0x000000).setAlpha(1).setInteractive();
    this.replayIcon = this.add.image(175, 1150, 'icons', 1).setInteractive();
    this.previewBox.add(this.replayIcon); 
	
	playText.on('pointerdown', this.play, this);
	this.replayIcon.on('pointerdown', this.cancel, this);

    //localStorage.setItem('SDsave', JSON.stringify(gameSettings));
    
    
    
  }
  
  showPreview(){

	  var tween = this.tweens.add({

		  targets: this.previewBox,
		  duration: 500,
		  x: 0,
		  ease: 'bounce'
	  })
  }

play(){
		this.scene.stop(currentGame);
		this.scene.stop('endGame');
      this.scene.stop('UI');
    
        this.scene.start('startGame')
      
}
cancel(){
  this.scene.start(currentGame);
  this.scene.start('UI');
  this.scene.stop();
  
      
}
 
  
  
}

