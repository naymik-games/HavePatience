class playGolf extends Phaser.Scene {
  constructor() {
    super("playGolf");
  }
  preload() {


  }
  create() {
	  
	 // gameOptions.deck = 'cards_windows';
	  this.cardSpacing = 15;
	  this.edgeMargin = 15;
	  this.cardBlank = 62;
	  var cols = games[currentGameNum].cols;
	  var cardSpace = 900 - (this.cardSpacing * (cols + 1))
	  var s = (cardSpace / cols) / decks[gameOptions.deckNum].cardWidth
	  this.scale = s;
	  this.cardWidth = decks[gameOptions.deckNum].cardWidth * this.scale;
	  this.cardHeight = decks[gameOptions.deckNum].cardHeight * this.scale;
	  
	  
	  
	  
	  this.isStarted = false;
	  
	  
    
	 this.deckBack = gameOptions.deckBack; 
	  
	  
	  
	  
	  
    //set up card sizing for this game
	
	
	
	
	
	//pyramid rows
    this.initial_set = [1,2,3,4,5,6,7];
    this.initialX = 8 * 130 / 2;
    //for tracking selection
	this.selectedValue = -1;
    this.selectedCard = null;
//24 remaing
    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);



//pile for cards you can draw from
this.drawPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 750, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
this.drawPile.type = 'draw'
this.drawCount = 16;
this.tabCount = 35;
this.tabCountText = this.add.bitmapText(game.config.width / 2 + 200,1400 , 'topaz', this.tabCount, 50).setOrigin(.5).setTint(0xffffff);




this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];

//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(game.config.width/2, 750, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.7);
this.discardPile.type = 'discard';

//this holds cards after they are drawn
this.stockArray = [];

    //this.player = this.add.image(game.config.width / 2, game.config.height /2, 'gems', 0).setInteractive();
   // this.player.on("pointerdown", this.addScore, this);
   /* let gameBoard = new Board();
	gameBoard.start('Mario', 'Luigi');
	console.log(gameBoard.players);*/
	
	
	
	this.d = new Deck();
	var aces = 'low';
    this.d.createDeck(aces);

    this.d.shuffleDeck();    
	this.deal();
	
/*	var card= this.d.cards.pop();
	var img = this.add.image(450, 800, 'cards', card.index).setOrigin(.5, 0).setScale(1).setInteractive();
	img.type = 'card';
	img.selected = false;
	img.value = card.value;
	img.index = card.index;
	*/
	//var info = this.add.bitmapText(game.config.width / 2,1000 , 'topaz', card.suit + card.rank + card.value, 50).setOrigin(.5).setTint(0xffffff);

	
   /* this.input.on("pointerdown", this.gemSelect, this);
    this.input.on("pointermove", this.drawPath, this);
    this.input.on("pointerup", this.removeGems, this);
   */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
    this.input.on('gameobjectdown', this.selectCard, this);
    //this.selectImage = this.add.image(15, 1250, 'selected_card').setScale(.8).setOrigin(.5).setDepth(2);
	
  }
  update() {
   
  }
  selectCard(e, card){
    
    if(card.type == 'draw'){
      
      this.drawCard();
      return
    }
	//if the clicked card is from the stock pile

	//if the clicked card is from the pyramid
    if(card.type == 'card'){
      if(!this.isStarted){

    	gameData[currentGameNum].attempts++;
    
    	this.saveData();
    	this.isStarted = true;
    	}
     // console.log('curr' + this.currentValue)
     // console.log('card' + card.value)
     if(this.currentValue == 1){
       var tempminus = 13
       var tempplus = 2
     } else if(this.currentValue == 13){
       var tempminus = 12
       var tempplus = 1
     }else {
       var tempminus = this.currentValue + 1
       var tempplus = this.currentValue - 1
     }
    // if(tempplus > 0){
      if(tempplus == card.value || tempminus == card.value){
        this.remove(card);
        this.currentValue = card.value;
        this.children.bringToTop(card)
        this.tabCount--;
        this.tabCountText.setText(this.tabCount);
        if(this.tabCount == 0){
          this.endGame('win');
          gameData[currentGameNum].wins++;
          this.saveData();
        }
        if (this.drawCount == 0 && this.tabCount > 0){
          this.endGame('lose');
        }
      }
    }
  }
  removeSelection(){
	  this.selectedValue = -1;
      this.selectedCard = null;
      this.selectImage.setAlpha(0);
  }
/*  selectCard(card){
	    this.selectImage.setPosition(card.x,card.y);
      this.selectedValue = card.value;
      this.selectedCard = card;
      this.selectImage.setAlpha(1);
  } */
  drawCard() {
    //this.selectedValue = -1
    
		
		var card = this.drawArray.pop();
		//card.setPosition(this.discardPile.x, this.discardPile.y);
		card.setFrame(54)
		this.children.bringToTop(card)
		this.currentValue = card.value;
		this.flipCard(card)
		var tween = this.tweens.add({
		  targets: card,
		  x: this.discardPile.x,
		  y: this.discardPile.y,
		  duration: 300
		})
		
		//this.stockArray.push(card);
		//this.pyramid.push(newStock)
		//this.drawArray.push(newStock);
		this.drawCount--;
		if (this.drawCount == 0){
		  this.drawPile.setAlpha(0)
		  if (this.drawCount == 0 && this.tabCount > 0){

          this.endGame('lose');

        }
		  this.checkForPlayable();
		}
		
		this.drawCountText.setText(this.drawCount);
	
  }
  
  hideDraw(){
    for(var i = 0; i < this.drawArray.length; i++){
      this.drawArray[i].setPosition(-200, -200)
    }
  }
  checkForPlayable(){
    
  }
  deal(){
	  //tablou
  this.tab = [1,1,1,1,1,1,1];
    for(var i = 0; i < 5; i++){
      for(var j = 0; j < 7; j++){
        var card = this.d.cards.pop();
      
       // var card= this.d.cards.pop();
	//var img = this.add.image(450, 1000, 'cards', card.index).setOrigin(.5, 0).setScale(1).setInteractive();
	
      var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + j * (this.cardSpacing + this.cardWidth), 350 + i *50, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
  
       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
		img.slot = i;
        img.selected = false;
        img.value = card.value;
        img.index = card.index;
		img.suit = card.suit;
        
       // this.tab.push(img)
      }        
    }
	//up card
    var stockcard = this.d.cards.pop();
	var stockPile = this.add.image(this.discardPile.x, this.discardPile.y, gameOptions.deck, stockcard.index).setScale(this.scale);
	
	stockPile.selected = false;
	stockPile.value = stockcard.value;
	stockPile.index = stockcard.index;
	stockPile.suit = stockcard.suit;
	stockPile.type = 'card';
	
	this.currentValue = stockPile.value;
	//draw pile
    for(var c = 0; c < 16; c++){
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, temp.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = temp.index;
		newStock.value = temp.value;
		newStock.suit = card.suit;
		newStock.slot = -1;
      this.drawArray.push(newStock)
    }
    console.log('draw array' + this.drawArray.length)
  }
  removeFromPyramid(card){
    this.pyramid[card.i][card.j] = undefined;
  }
  remove(card){
    //900-67, 350 - 80.5
    var tween = this.tweens.add({
      targets: card,
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300
    })
  }
  
  
  flipCard(card){
    // First tween: We raise and flip the card
   var flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay:0,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
    
   // this.flipCard.frameNr = 0; // Start with backside
    flipTween.on('complete', () => {
      card.setFrame(card.index)      
      flipBackTween.play();
    });
    
    // Second tween: we complete the flip and lower the card
    var flipBackTween = this.tweens.create({
      targets: card,
      scaleY: this.scale,
      scaleX: this.scale,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
    
    // Once the card has been placed down on the table, we can flip it again
    flipBackTween.on('complete', () => {
      //this.flipCard.isFlipping = false;
    });
    flipTween.play();
  }
  
  
  endGame(result){
    this.scene.launch('endGame', {result: result});
    this.scene.pause();
    this.scene.pause('UI')
  }
  
  addScore(){
	  this.events.emit('score');
  }
  saveData() {
    localStorage.setItem('solitaireData', JSON.stringify(gameData));
  }
}