class playMonteCarlo extends Phaser.Scene {
  constructor() {
    super("playMonteCarlo");
  }
  preload() {


  }
  create() {
    //set up card sizing for this game

   gameOptions.flipSpeed = 400;

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


//gameOptions.deck = 'cards'

    
	 this.deckBack = gameOptions.deckBack; 

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

this.gameType = gameData[currentGameNum].preferance1;//suit, thirteen, ramk


//pile for cards you can draw from
this.drawPile = this.add.image(game.config.width /2 -37, 1475, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setDepth(1).setInteractive();
this.drawPile.type = 'draw'
this.drawCount = 27;
this.drawCountText = this.add.bitmapText(game.config.width / 2 - 300,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];
//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 1475, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
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
		this.collapse();
      //this.findEmpty();
      return
    }
    if(card.type == 'card'){
      if(this.selection.value == -1){
        if(this.gameType == 'thirteen'){
          if(card.value == 13){
            this.removeOne(card);
            return
          }
        }
        console.log(this.getRC(card.grid))
        this.setSelection(card)
      } else {
        if(this.checkCards(this.selection.card, card)){
          this.removeCards(this.selection.card, card);
        }
        this.clearSelection();
      }
    }
    
  }
  checkCards(cardA, cardB){
    if(this.areNext(cardA.grid, cardB.grid) && this.areCondition(cardA,cardB)){
      return true
    }
    
    
    return false
  }
  areNext(gridNum1, gridNum2){
	  var rc1 = this.getRC(gridNum1);
	  var rc2 = this.getRC(gridNum2);
	  var row = rc1.row;
	  var row2 = rc2.row;
	  var column = rc1.column;
	  var column2 = rc2.column;
	  
	  
	  
        return (Math.abs(row - row2) + Math.abs(column - column2) == 1) || (Math.abs(row - row2) == 1 && Math.abs(column - column2) == 1);
  }
  getRC(gridNum){
	  if(gridNum < 5){
		  var row = 0;
		  var col = gridNum;
	  } else if (gridNum < 10){
		  var row = 1;
		  var col = gridNum - 5;
	  } else if (gridNum < 15){
		  var row = 2;
		  var col = gridNum - 10;
	  } else if (gridNum < 20){
		  var row = 3;
		  var col = gridNum - 15;
	  } else {
		  var row = 4;
		  var col = gridNum - 20;
	  }
	  return {row: row, column: col}
  }
  areCondition(cardA, cardB){
    if(this.gameType == 'rank'){
      if(cardA.value == cardB.value){
        return true
      }
    } else if(this.gameType == 'suit'){
      if(cardA.suit == cardB.suit){
        return true
      }
    } else if(this.gameType == 'thirteen'){

      if(cardA.value + cardB.value == 13){

        return true
      }
    }
    return false
  }
  removeOne(cardA){
    this.grid[cardA.grid] = null;
    cardA.grid = null;
	  
	  cardA.type = 'waste';
	  var tween = this.tweens.add({
      targets: cardA,
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300,
	  onCompleteScope: this,
	  onComplete: function(){
		 // this.addCards(temp);
		 // this.testAdd();
		 // console.log(this.grid)
		 // console.log(this.grid[cardB.grid.r][cardB.grid.c])
	  }
    });
  }
  removeCards(cardA, cardB){
	
	 this.grid[cardA.grid] = null;	
	 this.grid[cardB.grid] = null;	
	 
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
		 // this.addCards(temp);
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
    this.selection.col = null;
    this.selection.row = null
    this.selection.card = null;

  }
  
  setSelection(card) {
 
    this.selection.value = card.value;
    this.selection.suit = card.suit;
    this.selection.col = card.col;
    this.selection.row = card.row;
    this.selection.card = card;
    card.setAlpha(.7).setTint(0x00ff00)
    
   // this.selectImage.setPosition(card.x, card.y)
   // this.selectImage.setAlpha(1);
    //console.log(this.selection)
  }
  collapse_(){
	 // this.newGrid = [];
	 // this.newGrid = this.grid.filter(function (el) {
	 //	  return el != null;
	//	});
	this.newGrid = this.grid.filter(Boolean)
  console.log(this.newGrid.length)
	  //console.log(this.newGrid[7])
	  this.reDeal();
  }
  collapse(){

	 this.newGrid = [];
   for (var g = 0; g < this.grid.length; g++){
     if(this.grid[g] != null){
       this.newGrid.push(this.grid[g])
     }
   }
	 // this.newGrid = this.grid.filter(function (el) {
	 //	  return el != null;
	//	});
//	this.newGrid = this.grid.filter(Boolean)
  console.log(this.newGrid.length)
  this.reDeal();
  /*var tween = this.tweens.add({
			  targets: this.newGrid,
			  x: 450, 
			  y: 800,
			  duration: 500,
			  delay: 50,
			  onCompleteScope: this,
			  onComplete: function(){
				this.reDeal();
			  }
			});*/
	  //console.log(this.newGrid[7])
	  
  }
  findEmpty(){
    console.log('looking...')
    for(var c = 0; c < 5; c++){
      if(this.grid[1][c] == null){
        console.log('E');
      }
    }
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
  
  reDeal(){
  
  this.grid = [];
  for(var r = 0; r < 25; r++){
		if (r < 5) {
        var x = r;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350;
      } else if (r < 10) {
        var x = r - 5;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (1 * (this.cardSpacing + this.cardHeight)) 
      } else if (r < 15) {
        var x = r - 10;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (2 * (this.cardSpacing + this.cardHeight));
      } else if (r < 20) {
        var x = r - 15;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (3 * (this.cardSpacing + this.cardHeight));
      } else {
		  var x = r - 20;
		  var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
		   var y = 350 + (4 * (this.cardSpacing + this.cardHeight));
	  }
    
        if(this.newGrid.length > 0){
			var card = this.newGrid.shift();
			//card.setPosition(xCalc, y);
			
			var tween = this.tweens.add({
			  targets: card,
			  x: xCalc, 
			  y: y,
			  duration: 300,
			 // delay: r * 50,
			  onCompleteScope: this,
			  onComplete: function(){
				
			  }
			});


           // img.type = 'card';
			card.grid = r,
		//	img.value = card.value;
		//	img.index = card.index;
	//	img.suit = card.suit;
			this.grid.push(card);
        
		
		} else if (this.drawArray.length > 0){
			var card = this.drawArray.pop();
			var img = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
            img.type = 'card';
			img.grid = r,
			img.value = card.value;
			img.index = card.index;
			img.suit = card.suit;
			this.grid.push(img);
			var tween = this.tweens.add({
			  targets: img,
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
  if (this.drawArray.length == 0){
    //this.drawPile.setAlpha(0);
  }
}
  
  deal(){
  
  this.grid = [];
  for(var r = 0; r < 25; r++){
		if (r < 5) {
        var x = r;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350;
      } else if (r < 10) {
        var x = r - 5;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (1 * (this.cardSpacing + this.cardHeight)) 
      } else if (r < 15) {
        var x = r - 10;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (2 * (this.cardSpacing + this.cardHeight));
      } else if (r < 20) {
        var x = r - 15;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 350 + (3 * (this.cardSpacing + this.cardHeight));
      } else {
		  var x = r - 20;
		  var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
		   var y = 350 + (4 * (this.cardSpacing + this.cardHeight));
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

    for(var l = 0; l < this.drawCount; l++){

      var card = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = card.index;
		newStock.value = card.value;
		newStock.suit =  card.suit;
		
      this.drawArray.push(newStock)
      }
  }
  
  
  
  
  
  deal_old(){
  
  this.grid = [];
  
for(var r = 0; r < 5; r++){
  
  var gr = []
  for(var c = 0; c < 5; c++){
		
    
          
        var card = this.d.cards.pop();
      
      var text = 'r:' + r + ',c:' + c;
      var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + c * (this.cardSpacing + this.cardWidth), 350 + (r * (this.cardSpacing + this.cardHeight)), gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
  var gridText = this.add.bitmapText((this.edgeMargin + this.cardWidth / 2) + c * (this.cardSpacing + this.cardWidth), 350 + (r * (this.cardSpacing + this.cardHeight)), 'topaz', text, 70).setOrigin(.5).setTint(0x0000ff);

       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
		    img.row = r;
        img.col = c;
        img.value = card.value;
        img.index = card.index;
		    img.suit = card.suit;
        
        
        gr.push(img);
  } 
  this.grid.push(gr)
}
//this.grid[1][4].setAlpha(.4)
//this.grid[0][2].setAlpha(.4)
//draw pile  
    for(var l = 0; l < 27; l++){
      var card = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = card.index;
		newStock.value = card.value;
		newStock.suit =  card.suit;
		
      this.drawArray.push(newStock)
    }
  
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