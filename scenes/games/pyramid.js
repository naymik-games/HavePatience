class playPyramid extends Phaser.Scene {
  constructor() {
    super("playPyramid");
  }
  preload() {


  }
  create() {
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
	//  gameOptions.deck = 'cards_real';
	  
    
	 this.deckBack = gameOptions.deckBack; 
	  
	
	//pyramid rows
    this.initial_set = [1,2,3,4,5,6,7];
    this.initialX = 8.5 * this.cardWidth / 2;
    //for tracking selection
	this.selectedValue = -1;
    this.selectedCard = null;
//24 remaing
    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

this.refreshIcon = this.add.image(this.edgeMargin + 48, 350, 'icons', 1);
this.refreshIcon.type = 'refresh';
this.refreshCount = 0;

this.tabCount = 28;
this.tabCountText = this.add.bitmapText(game.config.width / 2 + 200,1400 , 'topaz', this.tabCount, 50).setOrigin(.5).setTint(0xffffff);

//pile for cards you can draw from
this.drawPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 350, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
this.drawPile.type = 'draw'
this.drawCount = 24;
this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];
this.stockPile = this.add.image((this.edgeMargin + this.cardWidth /2) + this.cardSpacing + this.cardWidth, 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(900 - (this.edgeMargin + this.cardWidth / 2), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
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
    this.selectImage = this.add.image(15, 1250, 'selected_card').setScale(this.scale).setOrigin(.5).setDepth(2).setAlpha(0);
	
  }
  update() {
   
  }
  selectCard(e, card){
    if(card.type == 'refresh'){
      this.refreshDraw();
      
      return
    }
    if(card.type == 'draw'){
      
      this.drawCard();
      return
    }
	//if the clicked card is from the stock pile
    if(card.type == 'stock'){
		//if a king, move it
      if(card.value == 13){
        this.remove(card);
		this.children.bringToTop(card)
        this.stockArray.pop();
        this.removeSelection();
      } else if(this.selectedValue == -1) {
		//if no card has been selected, select this card
		this.selectCard(card);
      
      //console.log(this.selectedValue)
      } else {
		//if another card previously selected, then check for play
        if(this.selectedValue + card.value == 13){
		  //if it makes a valid play, then move the cards
          this.remove(this.selectedCard);
          this.remove(card);
		  this.children.bringToTop(card)
          this.removeFromPyramid(this.selectedCard);
          this.tabCount--;
          this.stockArray.pop();
          console.log(this.stockArray.length)
          this.removeSelection();
        } else {
		  //if it does not make a valid play, then unselect cards
          this.removeSelection();
		  
        }
      }
      
    }
	//if the clicked card is from the pyramid
    if(card.type == 'card'){
      //checks if the card is open
      if (typeof this.pyramid[card.i + 1] != "undefined" &&
        (typeof this.pyramid[card.i + 1][card.j] != "undefined" || typeof this.pyramid[card.i + 1][card.j + 1] != "undefined")){
          this.removeSelection();
		  
          return
        }
	  //if open, check if King and remove if it is
      if (card.value == 13) {
        this.remove(card);
		this.selectedCard
        this.removeFromPyramid(card);
		this.removeSelection();
        this.tabCount--;
        return
      }
      //if no card previously slected, then select it
      if(this.selectedValue == -1){
        console.log(card.i +','+ card.j)
        this.setSelection(card);
      } else {
		//if card previuosly slected, then check the play
        if(this.selectedValue + card.value == 13){
			this.children.bringToTop(card)
          this.remove(this.selectedCard);
          this.remove(card);
		  //if valid play and the first selected is in pyramid, remove from pyramid array
          if(this.selectedCard.type == 'card'){
            this.removeFromPyramid(this.selectedCard);
            this.tabCount--;
          }
		  //if valid play and the just clicked card is in pyramid, remove from pyramid array
          if(card.type == 'card'){
            this.removeFromPyramid(card);
            this.tabCount--;
          }
		  this.removeSelection();
          
        } else {
		  //no valid move, un select
		  this.removeSelection();
          
        }
      }
        
        
      
    }
    this.tabCountText.setText(this.tabCount)
  }
  removeSelection(){
	  this.selectedValue = -1;
      this.selectedCard = null;
      this.selectImage.setAlpha(0);
  }
  setSelection(card){
	    this.selectImage.setPosition(card.x,card.y - 5);
      this.selectedValue = card.value;
      this.selectedCard = card;
      this.selectImage.setAlpha(1);
  }
  drawCard() {
    //this.selectedValue = -1
    
    var card = this.drawArray.pop();
    //card.setPosition(15 + 184, 350 - 80.5);
    this.children.bringToTop(card)
    this.stockArray.push(card);
    this.flipCard(card);
	 var tween = this.tweens.add({
      targets: card,
      x: this.stockPile.x,
      y: this.stockPile.y,
      duration: 300
    })
    //this.pyramid.push(newStock)
    //this.drawArray.push(newStock);
    this.drawCount--;
    if (this.drawCount == 0 && this.refreshCount < 2){
      this.drawPile.setAlpha(0)
      this.refreshIcon.setInteractive();
    }
    console.log(this.stockArray.length)
    this.drawCountText.setText(this.drawCount);
  }
  refreshDraw(){
    this.refreshCount++;
    console.log(this.drawArray.length);
    this.showDraw();
    this.refreshIcon.disableInteractive();
    this.drawPile.setAlpha(1)
    this.drawArray = this.stockArray;
    this.stockArray = [];
    this.drawArray.reverse();
    console.log('draw ' + this.drawArray.length)
    console.log('stock ' + this.stockArray.length)
    this.hideDraw();
    this.drawCount = this.drawArray.length;
  }
  hideDraw(){
    for(var i = 0; i < this.drawArray.length; i++){
      this.drawArray[i].setPosition(this.drawPile.x, this.drawPile.y).setDepth(0);
    }
  }
  showDraw(){
    for(var i = 0; i < this.drawArray.length; i++){
      this.stockArray[i].setPosition(this.drawPile.x, this.drawPile.y).setDepth(0)
    }
  }
  deal(){
	 // this.initial_set = [1,2,3,4,5,6,7];
  this.pyramid = [];
    for(var i = 0; i < this.initial_set.length; i++){
      var cards = this.initial_set[i];
      var offsetX = this.initialX - cards * this.cardWidth / 2;
      var pyr = [];
      for(var j = 0; j < cards; j++){
        var card = this.d.cards.pop();
      
       // var card= this.d.cards.pop();
	//var img = this.add.image(450, 1000, 'cards', card.index).setOrigin(.5, 0).setScale(1).setInteractive();
      var img = this.add.image(offsetX,350 + i * (this.cardHeight /2), gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
  
       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
        img.selected = false;
        img.value = card.value;
        img.index = card.index;
        img.i = i;
        img.j = j;
        pyr.push(img)
        offsetX += this.cardSpacing + this.cardWidth
      }
      this.pyramid.push(pyr)
    }
    console.log('deck l ' + this.d.cards.length)
    for(var c = 0; c < 24; c++){
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, temp.index).setScale(this.scale).setOrigin(.5).setInteractive();
    newStock.type = 'stock';
    newStock.index = temp.index;
    newStock.value = temp.value;
      this.drawArray.push(newStock)
    }
    console.log(this.drawArray.length)
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
    this.flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay:0,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
    
   // this.flipCard.frameNr = 0; // Start with backside
    this.flipTween.on('complete', () => {
      card.setFrame(card.index)      
      this.flipBackTween.play();
    });
    
    // Second tween: we complete the flip and lower the card
    this.flipBackTween = this.tweens.create({
      targets: card,
      scaleY: this.scale,
      scaleX: this.scale,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
    
    // Once the card has been placed down on the table, we can flip it again
    this.flipBackTween.on('complete', () => {
      //this.flipCard.isFlipping = false;
    });
    this.flipTween.play();
  }
  saveData() {
    localStorage.setItem('solitaireData', JSON.stringify(gameData));
  }
  
  addScore(){
	  this.events.emit('score');
  }
}