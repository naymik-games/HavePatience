class playAces extends Phaser.Scene {
  constructor() {
    super("playAces");
  }
  preload() {


  }
  create() {
    //set up card sizing for this game

   gameOptions.flipSpeed = 400;
this.cardSpacing = 20;
	var cols = games[currentGameNum].cols
var cardSpace = 900 - (this.cardSpacing * (cols + 1))
var s = (cardSpace / cols) / decks[gameOptions.deckNum].cardWidth 



console.log(decks[gameOptions.deckNum].baseScale)
	  //this.scale = decks[gameOptions.deckNum].baseScale -.2;
      this.scale = s;
      this.cardWidth = decks[gameOptions.deckNum].cardWidth * this.scale;
      this.cardHeight = decks[gameOptions.deckNum].cardHeight * this.scale;
      
      this.edgeMargin = 15;
      this.cardBlank = 62;
//gameOptions.deck = 'cards_real'
/*
    
*/
this.deckBack = gameOptions.deckBack;
//
    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);


this.isStarted = false;

//slot markers
for(var i = 0; i < 4; i++){
	var slotImage = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);

}

//pile for cards you can draw from
this.drawPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 350, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
this.drawPile.type = 'draw'
this.drawCount = 48;
this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];

//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 600, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
this.discardPile.type = 'discard';

//this holds cards after they are drawn

this.slotArray = [];

    //this.player = this.add.image(game.config.width / 2, game.config.height /2, 'gems', 0).setInteractive();
   // this.player.on("pointerdown", this.addScore, this);
   /* let gameBoard = new Board();
	gameBoard.start('Mario', 'Luigi');
	console.log(gameBoard.players);*/
	
	
	var aces = 'high';
	this.d = new Deck('high');
	
    this.d.createDeck();
this.d.acesHigh();
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
    //this.selectImage = this.add.image(15, 1250, 'selected_card').setScale(1).setOrigin(.5).setDepth(2);
	
  }
  update() {
   
  }
  selectCard(e, card){
    
    if(card.type == 'draw'){
      
      this.drawCard();
      return
    }
	if(!this.isStarted){
		gameData[currentGameNum].attempts++;
		this.saveData();
		this.isStarted = true;
	}
	
	//if the clicked card is from the stock pile

	//if the clicked card is from the pyramid
    if(card.type == 'card' && this.playable(card)){
      //checks if the card is open
     
       // this.setSelection(card);
    for(var i = 0; i < 4; i++){
      if (card.slot != i && this.slotArray[i].length > 0){
        if(this.slotArray[i][this.slotArray[i].length - 1].suit == card.suit){
          if(card.value < this.slotArray[i][this.slotArray[i].length - 1].value){
          
		  this.slotArray[card.slot].pop();
          this.children.bringToTop(card)
		  this.tab[card.slot]--;
          this.remove(card);
		  this.checkWin();
          return
          }
        }
      }
    }
    for(var i = 0; i < 4; i++){
		if(card.slot != i && this.slotArray[i].length == 0){
			this.moveCard(card,i);
			return;
		}

	}
        
      
    }
  }
  moveCard(card, slot){
	  this.tab[slot]++;
	  this.tab[card.slot]--;
	  this.slotArray[card.slot].pop();
	  this.slotArray[slot].push(card);
	  card.slot = slot;
	  var tween = this.tweens.add({
      targets: card,
      x: (this.edgeMargin + this.cardWidth / 2) + slot * (this.cardSpacing + this.cardWidth),
      y: 350,
      duration: 300
    })
  }
  playable(card){

		  if(this.slotArray[card.slot][this.slotArray[card.slot].length -1].index == card.index){
			return true
		  }
		
    return false;
  }
  checkWin(){
	  if (this.drawCount == 0){
		  for(var i = 0; i < 3; i++){
			  if (this.tab[i] > 1){
				  return
			  }
		  }
		  //win
		   gameData[currentGameNum].wins++;
		   this.saveData();
		   console.log('win!')
	  }
  }
  drawCard() {
    
    //this.selectedValue = -1
    for(var i = 0; i < 4; i++){
		this.tab[i]++;
		var card = this.drawArray.pop();
		//card.setPosition((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth / 2), 350 + (this.tab[i] - 1) * 50);
		card.setFrame(52)
		this.children.bringToTop(card)
		card.type = 'card';
		card.slot = i;
		this.slotArray[i].push(card)
		this.flipCard(card);
		var y = 350 + (this.tab[i] - 1) * 70;
		 var tween = this.tweens.add({
		  targets: card,
		  x: (this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth),
		  y: y,
		  duration: 300,
		  delay: i * 100,
		  onCompleteScope: this,
		  onComplete: function(){
		    
		  }
		})
		
		
		//this.stockArray.push(card);
		//this.pyramid.push(newStock)
		//this.drawArray.push(newStock);
		this.drawCount--;
		if (this.drawCount == 0){
		  this.drawPile.setAlpha(0)
		 
		}
		
		this.drawCountText.setText(this.drawCount);
	}
	//console.log(this.slotArray[3])
  }
  
  hideDraw(){
    for(var i = 0; i < this.drawArray.length; i++){
      this.drawArray[i].setPosition(-200, -200)
    }
  }
  deal(){
  this.tab = [1,1,1,1];
    for(var i = 0; i < 4; i++){
          temp = [];
        var card = this.d.cards.pop();
      
       // var card= this.d.cards.pop();
	//var img = this.add.image(450, 1000, 'cards', card.index).setOrigin(.5, 0).setScale(1).setInteractive();
      var img = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
  
       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
		img.slot = i;
        img.selected = false;
        img.value = card.value;
        img.index = card.index;
		img.suit = card.suit;
        temp.push(img)
        this.slotArray.push(temp);
       var tween = this.tweens.add({
    			targets: img,
    			x: (this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 
    			y: 350,
    			duration: 300,
    			delay: i * 100
        });
              
    }
    
    for(var c = 0; c < 48; c++){
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, temp.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = temp.index;
		newStock.value = temp.value;
		newStock.suit =  temp.suit;
		newStock.slot = -1;
      this.drawArray.push(newStock)
    }
  
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
  
  
  addScore(){
	  this.events.emit('score');
  }
  saveData(){
	  localStorage.setItem('solitaireData', JSON.stringify(gameData));
  }
}