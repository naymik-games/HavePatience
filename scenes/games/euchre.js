class playEuchre extends Phaser.Scene {
  constructor() {
    super("playEuchre");
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
	
	
   this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(0x6fc391);

// suit icons
this.suitIconsArray = [];

this.clubIcon = this.add.image(this.edgeMargin + 75 / 2, 350, 'suit_icons', 0).setScale(1).setOrigin(.5).setInteractive().setDepth(1);
this.suitIconsArray.push(this.clubIcon)
this.diamondIcon = this.add.image(this.edgeMargin + 75 / 2, 450 , 'suit_icons', 1).setScale(1).setOrigin(.5).setInteractive().setDepth(1);
this.suitIconsArray.push(this.diamondIcon)
this.heartIcon = this.add.image(this.edgeMargin + 75 / 2, 550 , 'suit_icons', 2).setScale(1).setOrigin(.5).setInteractive().setDepth(1);
this.suitIconsArray.push(this.heartIcon)
this.spadeIcon = this.add.image(this.edgeMargin + 75 / 2, 650 , 'suit_icons', 3).setScale(1).setOrigin(.5).setInteractive().setDepth(1);
this.suitIconsArray.push(this.spadeIcon)

this.player = {};
this.dealer = {};
//pile for cards you can draw from
this.drawPile = this.add.image(game.config.width /2, 350, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
this.drawPile.type = 'draw'
this.drawCount = 19;
this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
this.drawArray = [];

//just a blank card to indicate where the played cards go
this.discardPile = this.add.image(game.config.width / 2, 600, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
this.discardPile.type = 'discard';

//this holds cards after they are drawn

this.handArray = [];

    //this.player = this.add.image(game.config.width / 2, game.config.height /2, 'gems', 0).setInteractive();
   // this.player.on("pointerdown", this.addScore, this);
   /* let gameBoard = new Board();
	gameBoard.start('Mario', 'Luigi');
	console.log(gameBoard.players);*/
	
	
	var aces = 'high';
	this.d = new Deck('high');
	
    //this.d.createDeck();
	this.d.euchreDeck();
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
this.clubIcon.on('pointerdown', function(){
  this.callTrump(0, 'clubs');
}, this);
this.diamondIcon.on('pointerdown', function(){
  this.callTrump(1, 'diamonds');
}, this);
this.heartIcon.on('pointerdown', function() {
  this.callTrump(2, 'hearts');
}, this);
this.spadeIcon.on('pointerdown', function() {
  this.callTrump(3, 'spades');
}, this);


 this.input.on("pointerdown", this.select, this);
   /* this.input.on("pointermove", this.drawPath, this);
    this.input.on("pointerup", this.removeGems, this);
   */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
   // this.input.on('gameobjectdown', this.selectCard, this);
  //  this.selectImage = this.add.image(15, 1250, 'selected_card').setScale(1).setOrigin(.5).setDepth(2);
	this.disableSuitIcons();
	this.hideSuitIcons();
  }
  update() {
   
  }
  select(e, obj){
    if(obj[0].type != 'card'){return}
	this.player.play = obj[0];
	var tween = this.tweens.add({
		targets: obj[0],
		y: '-=75',
		duration: 200,
		onCompleteScope: this,
		onComplete: function(){
			this.dealerPlay();
		}
	})
  }
  dealerPlay(){
	  var dcard = this.drawArray.pop();
	  this.flipCard(dcard);
	  this.dealer.play = dcard;
	  var tween = this.tweens.add({
		  targets: dcard,
		  x: this.discardPile.x,
		  y: this.discardPile.y,
		  duration: 200,
		  onCompleteScope: this,
		  onComplete: function(){
			  this.evaluatePlay();
			  console.log('Evaluate');
		  }
	  })
  }
  rankHand(hand){
    
  }
  evaluatePlay(){
    
	  if(this.trump == 'clubs'){
		  
	  } else if (this.trump == 'diamonds'){
		  
	  } else if (this.trump == 'hearts'){
		  
	  } else if (this.trump == 'spades'){
		  
	  }
  }
  callTrump(suitNum, suit){
	  this.trump = suit;
    for(var c = 0; c < 4; c++){
      if (c != suitNum){
        
        this.suitIconsArray[c].setAlpha(.4);
      }
    }
    this.disableSuitIcons();
  }
  disableSuitIcons(){
    for(var c = 0; c < 4; c++){
        this.suitIconsArray[c].disableInteractive();
    }
  }
  enableSuitIcons(){
    for(var c = 0; c < 4; c++){
        this.suitIconsArray[c].setInteractive();
    }
  }
  hideSuitIcons(){
    for(var c = 0; c < 4; c++){
        this.suitIconsArray[c].setAlpha(.4);
    }
  }
  showSuitIcons(){
    for(var c = 0; c < 4; c++){
        this.suitIconsArray[c].setAlpha(1);
    }
  }
  showCallTrump(){
    this.callTrumpBox = this.add.container(1200,0);
    this.orderBack = this.add.image(game.config.width / 2, 550, 'blank').setTint(0xfaffffff).setInteractive();
    this.orderBack.displayWidth = 300;
    this.orderBack.displayHeight = 100;
    this.callTrumpBox.add(this.orderBack);
    
    this.orderText = this.add.bitmapText(game.config.width / 2, 545 , 'topaz', 'Order Up?', 50).setOrigin(.5).setTint(0x000000);
    this.callTrumpBox.add(this.orderText);
    
    this.orderBack.on('pointerdown', function(){
      console.log('order trump')
      this.hideCallTrump();
      this.showSuitIcons();
      this.callTrump(this.firstCard.suitNumber, this.firstCard.suit);
	  this.flipCardBack(this.firstCard);
	  this.drawArray.push(this.firstCard)
    }, this)
    
    this.callBack = this.add.image(game.config.width / 2, 700, 'blank').setTint(0xfaffff).setInteractive();
    this.callBack.displayWidth = 300;
    this.callBack.displayHeight = 100;
    this.callTrumpBox.add(this.callBack);
    
    this.callText = this.add.bitmapText(game.config.width / 2, 695 , 'topaz', 'Call It?', 50).setOrigin(.5).setTint(0x000000);
    this.callTrumpBox.add(this.callText);
    this.callBack.on('pointerdown', function(){
      console.log('call trump')
      this.hideCallTrump();
      this.showSuitIcons();
      this.enableSuitIcons();
      this.flipCardBack(this.firstCard);
	  this.drawArray.unshift(this.firstCard)
    }, this)
    
    var tween = this.tweens.add({
      targets: this.callTrumpBox,
      x:0,
      delay: 1000,
      duration: 500,
    })
  }
  

  hideCallTrump(){
    var tween = this.tweens.add({
      targets: this.callTrumpBox,
      x:-1200,
      delay: 0,
      duration: 500,
    })
  }
  selectCard(e, card){
    
    if(card.type == 'draw'){
      
      this.drawCard();
      return
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
          this.remove(card);
          return
          }
        }
      }
    }
    for(var i = 0; i < 4; i++){
		if(card.slot != i && this.slotArray[i] == 0){
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
	  var tween = this.tweens.add({
      targets: card,
      x: (this.edgeMargin + this.cardWidth / 2) + slot * (this.cardSpacing + this.cardWidth),
      y: 350,
      duration: 300
    })
  }
  playable(card){
    for(var i = 0; i < 4; i++){
		if(this.slotArray[i].length > 0){
		  if(this.slotArray[i][this.slotArray[i].length -1].index == card.index){
			return true
		  }
		}
    }
    return false;
  }
  drawCard() {
    
    //this.selectedValue = -1
    for(var i = 0; i < 4; i++){
		this.tab[i]++;
		var card = this.drawArray.pop();
		//card.setPosition((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth / 2), 350 + (this.tab[i] - 1) * 50);
		this.children.bringToTop(card)
		card.type = 'card';
		card.slot = i;
		this.slotArray[i].push(card)
		var y = 350 + (this.tab[i] - 1) * 50;
		 var tween = this.tweens.add({
		  targets: card,
		  x: (this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth),
		  y: y,
		  duration: 300
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
  
    for(var i = 0; i < 5; i++){
          
        var card = this.d.cards.pop();
      
       // var card= this.d.cards.pop();
	//var img = this.add.image(450, 1000, 'cards', card.index).setOrigin(.5, 0).setScale(1).setInteractive();
      var img = this.add.image((this.edgeMargin + this.cardWidth/2) + i * (this.cardSpacing + this.cardWidth), 950, gameOptions.deck, card.index).setOrigin(.5).setDepth(0).setScale(this.scale).setInteractive();
  
       //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
        img.type = 'card';
		img.slot = i;
        img.selected = false;
        img.value = card.value;
        img.index = card.index;
		    img.suit = card.suit;
		    img.rank = card.rank;
       // temp.push(img)
        this.handArray.push(img);
       
              
    }
    
    for(var c = 0; c < 19; c++){
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, temp.index).setScale(this.scale).setOrigin(.5).setInteractive();
		newStock.type = 'stock';
		newStock.index = temp.index;
		newStock.value = temp.value;
		newStock.suit =  temp.suit;
		newStock.rank = temp.rank;
		newStock.slot = -1;
      this.drawArray.push(newStock)
    }
    //this.drawPileFake = this.add.image(game.config.width /2, 350, 'cards', 52).setScale(1).setOrigin(.5).setDepth(1);


        this.firstCard = this.drawArray.pop().setY(350).setDepth(2);
        this.children.bringToTop(this.firstCard)
        this.firstCard.setFrame(this.deckBack);
         this.flipCard(this.firstCard);
         this.setSuitNumber(this.firstCard);
   /* var tween = this.tweens.add({
      targets: this.firstCard,
      scaleX: 0,
      duration: 200,
      yoyo: true,
      delay: 500,
      onCompleteScope: this,
      onComplete: function(){
        this.firstCard.setFrame(this.firstCard.index)
              }
    })*/
    
    
  this.showCallTrump();
  
  }
  removeFromPyramid(card){
    this.pyramid[card.i][card.j] = undefined;
  }
  remove(card){
    //900-67, 350 - 80.5
    this.tab[card.slot]--;
    
    var tween = this.tweens.add({
      targets: card,
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300
    })
  }
  setSuitNumber(card){
    if(card.suit =='clubs'){
      card.suitNumber = 0;
    } else if(card.suit =='diamonds'){
      card.suitNumber = 1;
    } else if (card.suit == 'hearts') {
      card.suitNumber = 2;
    } else if (card.suit == 'spades') {
      card.suitNumber = 3;
    } 
  }
  flipCard(card){
    
    // First tween: We raise and flip the card
    this.flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay:700,
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
  flipCardBack(card){
    
    // First tween: We raise and flip the card
    this.flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay:700,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
    
   // this.flipCard.frameNr = 0; // Start with backside
    this.flipTween.on('complete', () => {
      card.setFrame(this.deckBack)      
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