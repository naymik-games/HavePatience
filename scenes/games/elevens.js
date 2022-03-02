class playElevens extends Phaser.Scene {
  constructor() {
    super("playElevens");
  }
  preload() {


  }
  create() {
    //set up card sizing for this game

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

   gameOptions.flipSpeed = 400;

	




this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

//slot markers


//pile for cards you can draw from
this.drawPile = this.add.image(game.config.width /2, 1400, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setDepth(1);
this.drawPile.type = 'draw'
this.drawCount = 43;
this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];
this.slotArray = [];
//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 1400, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
this.discardPile.type = 'discard';

//this holds cards after they are drawn



    //this.player = this.add.image(game.config.width / 2, game.config.height /2, 'gems', 0).setInteractive();
   // this.player.on("pointerdown", this.addScore, this);
   /* let gameBoard = new Board();
	gameBoard.start('Mario', 'Luigi');
	console.log(gameBoard.players);*/
	
	
	var aces = 'high';
	this.d = new Deck('high');
	
    this.d.createDeck();

    this.d.shuffleDeck();    
    
	this.deal();
	//this.grid[1][2].setAlpha(.2)
//	console.log(this.grid[1][2].grid)
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
    this.selection = { value: -1, suit: null, slot: null }
	this.selection2 = { value: -1, suit: null, slot: null }
  }
  update() {
   
  }
  selectCard(e, card){
    
    if(card.type == 'draw'){
      
      this.drawCard();
      return
    }
	//if the clicked card is from the stock pile

	//if the clicked card is from the grid
    if (card.type == 'card') {
	  //if no card previously selected, set card as selected
      if (this.selection.value == -1) {
		  this.setSelection(card);
		  //console.log(card.grid)
	  } else {
	   // console.log(card.grid)
		//if the second card and it is a face card, select the second card
		if(this.selection.value > 10){
			if(this.selection2.value == -1){
			  
			  if(card.value > 10){
				  this.setSelection2(card)
				} else{
				  this.clearSelection();
				}
			} else {
				//or if it is the third card (face card), remove all three
			  if(card.value > 10){
				this.removeFaceCards(this.selection.card, this.selection2.card, card);
				}
				this.clearSelection();
				this.clearSelection2();
				//remove all three
			}
			
			
			
		} else {
			//or if second click is not a face card, compare values and remove or clear selection
			if(this.selection.value + card.value == 11){
				  this.removeCards(this.selection.card, card);
				  this.clearSelection();
			  } else {
				  this.clearSelection();
			  }
		}
	  
		  
	  }
        
    }
  }
  removeCards(cardA, cardB){
	 var temp = [];
	 this.grid[cardA.grid] = null;	
	 temp[0] = cardA.grid;
	 this.grid[cardB.grid] = null;	
	 temp[1] = cardB.grid;
	 cardA.grid = null;
	 cardB.grid = null;
	 cardA.type = 'waste';
	 cardB.type = 'waste';
	  var tween = this.tweens.add({
      targets: [cardA,cardB],
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300,
	  onCompleteScope: this,
	  onComplete: function(){
		  this.addCards(temp);
		 // this.testAdd();
		 // console.log(this.grid)
		 // console.log(this.grid[cardB.grid.r][cardB.grid.c])
	  }
    });
  }
  
  removeFaceCards(cardA, cardB, cardC){
	  var temp = [];
	 this.grid[cardA.grid] = null;	
		temp[0] = cardA.grid;
	 this.grid[cardB.grid] = null;	
		temp[1] = cardB.grid;
	 this.grid[cardC.grid] = null;
		temp[2] = cardC.grid;
	 cardA.grid = null;
	 cardB.grid = null;
	 cardC.grid = null;
	 cardA.type = 'waste';
	 cardB.type = 'waste';
	 cardC.type = 'waste';
	  var tween = this.tweens.add({
      targets: [cardA,cardB,cardC],
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300,
	  onCompleteScope: this,
	  onComplete: function(){
		  this.addCards(temp);
		 // this.testAdd();
		 // console.log(this.grid)
		 // console.log(this.grid[cardB.grid.r][cardB.grid.c])
	  }
    });
  }
  
  clearSelection(){
    this.selection.card.setAlpha(1).clearTint();
    this.selection.value = -1;
    this.selection.suit = null;
    this.selection.slot = null;
    this.selection.card = null;

  }
  clearSelection2(){
	this.selection2.card.setAlpha(1).clearTint();
    this.selection2.value = -1;
    this.selection2.suit = null;
    this.selection2.slot = null;
    this.selection2.card = null;
  }
  setSelection(card) {
 
    this.selection.value = card.value;
    this.selection.suit = card.suit;
    this.selection.slot = card.grid;
    this.selection.card = card;
    card.setAlpha(.7).setTint(0x00ff00)
    
   // this.selectImage.setPosition(card.x, card.y)
   // this.selectImage.setAlpha(1);
    //console.log(this.selection)
  }
  
  setSelection2(card) {
 
    this.selection2.value = card.value;
    this.selection2.suit = card.suit;
    this.selection2.slot = card.grid;
    this.selection2.card = card;
    card.setAlpha(.7).setTint(0xff0000)
    
   // this.selectImage.setPosition(card.x, card.y)
   // this.selectImage.setAlpha(1);
    //console.log(this.selection)
  }
  
  addCards(grids) {
    
    for(var r = 0; r < grids.length; r++){
	  

		if(this.drawArray.length > 0){
			var gridnum = grids[r];
			var card = this.drawArray.pop();
			//card.setPosition((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth / 2), 350 + (this.tab[i] - 1) * 50);
			card.setFrame(52)
			this.children.bringToTop(card)
			card.type = 'card';
			card.grid = gridnum,
			this.grid[gridnum] == card;
			this.flipCard(card);
			//var y = 350 + (this.tab[i] - 1) * 70;
			
			  if (gridnum < 3) {
				var x = gridnum;
				var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
				var y = 400;
			  } else if (gridnum < 6) {
				var x = gridnum - 3;
				var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
				var y = 700;
			  } else {
				var x = gridnum - 6;
				var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
				var y = 1000;
			  }
			
			
			
			 var tween = this.tweens.add({
			  targets: card,
			  x: xCalc, 
			  y: y,
			  duration: 300,
			  delay: r * 50,
			  onCompleteScope: this,
			  onComplete: function(){
				
			  }
			});
		 } 
	    
	  }
	
		
		//this.stockArray.push(card);
		//this.pyramid.push(newStock)
		//this.drawArray.push(newStock);
		this.drawCount--;
		if (this.drawCount == 0){
		  this.drawPile.setAlpha(0)
		 
		}
		
		this.drawCountText.setText(this.drawCount);
	
	//console.log(this.slotArray[3])
  }
  
  
  deal(){
  
  this.grid = [];
  for(var r = 0; r < 9; r++){
		if (r < 3) {
        var x = r;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 400;
      } else if (r < 6) {
        var x = r - 3;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 700;
      } else {
		  var x = r - 6;
		  var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
		   var y = 1000;
	  }
    
          
        var card = this.d.cards.pop();
      
      
      var img = this.add.image(xCalc, y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
  
       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
		
        img.grid = r,
        img.value = card.value;
        img.index = card.index;
		img.suit = card.suit;
        
        
        this.grid.push(img);
  } 

//draw pile  
    for(var c = 0; c < 43; c++){
      var card = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = card.index;
		newStock.value = card.value;
		newStock.suit =  card.suit;
		newStock.slot = -1;
      this.drawArray.push(newStock)
    }
  
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
      delay:200,
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
  saveData() {
    localStorage.setItem('solitaireData', JSON.stringify(gameData));
  }
  
  addScore(){
	  this.events.emit('score');
  }
}