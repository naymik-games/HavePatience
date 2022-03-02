class playScorpian extends Phaser.Scene {
  constructor() {
    super("playScorpian");
  }
  preload() {


  }

  create() {
    
    this.useCells = gameData[currentGameNum].preferance1;
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
    //gameOptions.deck = 'cards_modern'

    



	 this.deckBack = gameOptions.deckBack; 

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

    //arrays for various card stacks
    this.drawArray = [];
    this.freecellImageArray = [];
    this.freecellArray = [];
    this.foundationArray = [[],[],[],[]];
    this.stacks = [[], [], [], [], [], [], []];
    this.stacksSetup = [[1], [2], [3], [4], [5], [6], [7]];
    this.foundationImageArray = [];
	this.stackImageArray = [];
    this.selection = {value: -1, suit: null, color: null, stack: null, card: null}
	this.isMult = false;
    //pile for cards you can draw from
    
    this.drawPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 1550, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
    this.drawPile.type = 'draw'
   
    this.drawCountText = this.add.bitmapText(game.config.width / 2, 1400, 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);

	this.drawCount = 3;
	
    //cell markers
    if (this.useCells){
      for (var i = 0; i < 3; i++) {
        var slotImage = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2).setInteractive();
        slotImage.type = 'freecell'
        slotImage.stack = i;
        this.freecellImageArray.push(slotImage);
      }
    }
    //foundation markers
    for (var i = 4; i > 0; i--) {
      var slotImage = this.add.image((this.edgeMargin + this.cardWidth / 2) + (i+2) * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      slotImage.type = 'found'
      this.foundationImageArray.push(slotImage);
    }
	//stack markers
	for (var i = 0; i < 7; i++) {
		var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 550, gameOptions.deck, this.cardBlank).setOrigin(.5).setAlpha(.2).setScale(this.scale).setInteractive();
		img.stack = i;
		img.type = 'empty';
		this.stackImageArray.push(img);
	}

    this.d = new Deck('high');

    this.d.createDeck();

    this.d.shuffleDeck();

    this.deal();


    this.input.on('gameobjectdown', this.selectCard, this);
    
  }
  update() {

  }
  
  selectCard(e, card){
	  if(card.type == 'draw'){
		  this.drawCard();
		  return
	  }
	  if(card.type == 'card' || card.type == 'found' || card.type == 'empty' || card.type == 'freecell' || card.type == 'free'){
		  //first click
		  if(this.selection.value == -1){
			 if(card.type == 'empty'){return}
			 if(card.type == 'freecell'){return}
			 
			 if (card.type == 'card'){
				 //check if is a top card or not
				  var indexS = this.stacks[card.stack].indexOf(card);
				  //check if the card stack index is less than the top card. if so, use select multiple instead
				  if (indexS < this.stacks[card.stack].length - 1 && !card.back) {
					this.setMultiple(card, indexS);
					this.isMult = true;
					return
				  } else {
					  //if a single select, return if it is not an exposed card.
					 if(card.back){return} 
					  
					  //if it is the top card on stack, check for foundation and king or slect it.
					  if (card.value == 13){
						  var temp = this.findEmptyStack();
						  if(temp > -1){
							  this.moveToEmptyStack(card, temp);
							  return
						  }
					  } else {
					   //otherwise, select the card
						  this.setSelection(card, true);
					  }
					  
					  
					  
				  }
			 } else if (card.type == 'free'){
			    this.setSelection(card, true);
			 }
			 
			 
			 // second click
			} else {
			  //if the second click card is on tableau...
			    if (card.type == 'card' || card.type == 'empty') {
			      //if originating card is on tableau then check if it is the same stack.  if it is, return
			      if (this.selection.type == 'card') {
			        if (this.isMult) {
			          this.moveMult(card);
			  
			          return;
			        }
			        if (this.selection.stack == card.stack && card.type != 'empty') {
			          console.log('same stack? ' + this.selection.stack + ',' + card.stack)
			          this.clearSelection();
			          return
			        }
			        //if this is a multcard move, use that method 
			  
			        //otherwise, check if legal move and use normal move method
			        if (this.checkSequence(this.selection.card, card)) {
			          console.log('checking squence...')
			          this.moveToStack(this.selection.card, card);
			  
			        }
			        this.clearSelection();
			      } else if (this.selection.type == 'free'){
			        if (this.checkSequence(this.selection.card, card)) {
			          console.log('checking squence...')
			          this.moveToStack(this.selection.card, card);
			        }
			        this.clearSelection();
			      }
			  
			    }else if (card.type == 'freecell'){
			      this.moveToFree(this.selection.card, card);
			      this.clearSelection();
			    }
			}
		}
	  
	  
  }
  checkSequence(from, to){
     if(from.value == to.value - 1 && from.suit == to.suit){
       return true
     }
     return false
     
  }
  setSelection(card, tab){
	  //this.selection = {value: -1, suit: null, color: null, stack: null, cards: []}
	  
	  this.selection.value = card.value;
	  this.selection.suit = card.suit;
	  this.selection.color = card.color;
	  this.selection.stack = card.stack;
	  this.selection.card = card;
	  this.selection.type = card.type;
	  card.setTint(0x00ff00);
	 // this.selectImage.setPosition(card.x,card.y).setAlpha(1);
	  
  }
  clearSelection(){
    this.selection.card.clearTint()
	  this.selection.value = -1;
	  this.selection.suit = null;
	  this.selection.color = null;
	  this.selection.stack = null;
	  this.selection.card = null;
	  this.selection.type = null;
	 // this.selectImage.setPosition(-20,-20).setAlpha(0);
  }
  setMultiple(card, index) {
    this.selection.value = card.value;
    this.selection.suit = card.suit;
    this.selection.color = card.color;
    this.selection.type = card.type;
    this.selection.stack = card.stack;

    var sel = [];
    for (var i = index; i < this.stacks[card.stack].length; i++) {
      var car = this.stacks[card.stack][i];
      car.setTint(0x00ff00);
      sel.push(car);

    }
    this.selection.card = sel;
    //this.multipleSelection
    this.isMult = true;
  }
  clearMult() {
    for (var i = 0; i < this.selection.card.length; i++) {
      this.selection.card[i].clearTint();
    }
    this.selection.card = [];
    this.selection.value = -1;
    this.selection.suit = null;
    this.selection.color = null;
    this.selection.card = null;
    this.selection.stack = null;
    this.selection.type = null;
  }
  moveToFoundation(fromCard){
	
    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      fromCard.type = 'found'
      this.flipBack(fromCard.stack)
    } else if (fromCard.type == 'waste') {
      this.wasteArray.pop();
      fromCard.type = 'found'
    } 

    this.foundationArray[fromCard.suitNum].push(fromCard);
    this.children.bringToTop(fromCard)

    var tween = this.tweens.add({
      targets: fromCard,
      x: this.foundationImageArray[fromCard.suitNum].x,
      y: this.foundationImageArray[fromCard.suitNum].y,
      duration: 200
    })

  }
  moveToStack(fromCard, toCard){
    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      this.flipBack(fromCard.stack)
	    fromCard.stack = toCard.stack;
     // fromCard.type = 'found'
      
    } else if(fromCard.type == 'free'){
      this.freecellArray[fromCard.stack] = null
      fromCard.stack = toCard.stack;
      fromCard.type = 'card';
    }else if (fromCard.type == 'found') {
      this.foundationArray[fromCard.suitNum].pop();
      fromCard.type = 'card';
	  fromCard.stack = toCard.stack;
    } 
    
    this.stacks[toCard.stack].push(fromCard);
    this.children.bringToTop(fromCard)
    var tween = this.tweens.add({
      targets: fromCard,
      x: toCard.x,
      y: toCard.y + 35,
      duration: 200
    })

    
  }
  
  moveToFree(fromCard, toCard){
    this.stacks[fromCard.stack].pop();
    this.flipBack(fromCard.stack)
    fromCard.type = 'free';
	  fromCard.stack = toCard.stack;
	  
	  this.freecellArray[toCard.stack] = fromCard;
	  this.children.bringToTop(fromCard)
	  var tween = this.tweens.add({
	    targets: fromCard,
	    x: toCard.x,
	    y: toCard.y,
	    duration: 200
	  })
  }
  moveMult(toCard) {
    console.log('move mult')
    
   if (this.selection.value == 13 && toCard.type == 'empty') {
     for (var i = 0; i < this.selection.card.length; i++) {
       var from = this.selection.card[i];
       this.stacks[this.selection.stack].pop()
       from.stack = toCard.stack
       this.stacks[toCard.stack].push(from);
       this.children.bringToTop(from)
       // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
       var tween = this.tweens.add({
         targets: from,
         x: toCard.x,
         y: (toCard.y) + (i * 45),
         duration: 200
       })
   
   
     }
     this.flipBack(this.selection.stack)
   
   
   } else
    
    
    if (this.selection.value + 1 == toCard.value && this.selection.suit == toCard.suit) {
      console.log(this.selection.card.length)
	 
      for (var i = 0; i < this.selection.card.length; i++) {
        var from = this.selection.card[i];
		this.stacks[this.selection.stack].pop()
        from.stack = toCard.stack
        this.stacks[toCard.stack].push(from);
        this.children.bringToTop(from)
       // from.setPosition(toCard.x,(toCard.y + 50) + (i * 50))
        var tween = this.tweens.add({
          targets: from,
          x: toCard.x,
          y: (toCard.y + 45) + (i * 45),
          duration: 200
        })


      }
 this.flipBack(this.selection.stack)
    }
    this.clearMult();
    this.isMult = false;
  }
  
  
  moveToEmptyStack(card, tostack){
    if (card.type == 'card') {
      this.stacks[card.stack].pop();
     // fromCard.type = 'found'
      this.flipBack(card.stack)
    } else if (card.type == 'waste') {
      this.wasteArray.pop();
      card.type = 'card'
    } 
    this.stacks[tostack].push(card);
	  this.children.bringToTop(card)
	  var tween = this.tweens.add({
		  targets: card,
		  x: this.stackImageArray[tostack].x,
		  y: this.stackImageArray[tostack].y,
		  duration: 200,
		  onCompleteScope: this,
		  onComplete: function(){
			 // this.removeFromStack(card);
			 // this.addToStack(card, stack);
		  }
	  })
  }
 flipBack(stack){
   if(this.stacks[stack].length > 0){
		 var card =this.stacks[stack][this.stacks[stack].length -1];
		 if(card.back){
		   this.flipCard(card)
		 }
		 
	 }
 }
 
 
  checkFoundation(num, value){
	  if(this.foundationArray[num].length == 0){
		  if(value == 1){
		  return true;
		  }
	  } else if(this.foundationArray[num][this.foundationArray[num].length -1].suitNum == num && this.foundationArray[num][this.foundationArray[num].length -1].value + 1 == value){
		return true;
	  } else {
		  return false;
	  }
  }
  findEmptyStack(){
	  var stack = -1;
	  for (var i = 0; i < 7; i++){
		  if(this.stacks[i].length == 0){
			  stack = i;
			  break;
		  }
	  }
	  return stack;
  }
  drawCard() {
   
    for (var i = 0; i < 3; i++) {
      var card = this.drawArray.pop();
      //card.setPosition(15 + 184, 350 - 80.5);
      
      //this.children.bringToTop(card);
      card.type = 'card';
      card.stack = i;
      this.stacks[i].push(card);
      
      this.children.bringToTop(card);
      this.flipCard(card);
      
      var tween = this.tweens.add({
        targets: card,
        x: this.stackImageArray[i].x,
        y: this.stackImageArray[i].y + (this.stacks[i].length - 1) * 45,
        duration: 300,
        delay: i * 100
      });
      //this.pyramid.push(newStock)
      //this.drawArray.push(newStock);
      this.drawCount--;
//console.log(card)
    }
    if (this.drawCount == 0) {
      this.drawPile.setAlpha(0)
      
    }
    // console.log(this.stockArray.length)
    //this.drawCountText.setText(this.drawCount);
  }
  
  
  
  hideDraw() {
    for (var i = 0; i < this.drawArray.length; i++) {
      this.drawArray[i].setPosition(this.drawPile.x, this.drawPile.y).setDepth(0);
    }
  }
  showDraw() {
    for (var i = 0; i < this.wasteArray.length; i++) {
      this.wasteArray[i].setPosition(this.drawPile.x, this.drawPile.y).setDepth(0)
    }
  }
  
  
  deal() {

    var initial_set = [3, 3, 3, 3, 0, 0, 0];
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 7; row++) {
        var card = this.d.cards.pop();
        if (row < initial_set[col]) {
          var frame = this.deckBack;
        } else {
          
		    var frame = card.index;
        }
        var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 550 + row * 45, gameOptions.deck, frame).setOrigin(.5).setScale(this.scale).setInteractive();
        img.stack = col;
        if (frame == this.deckBack) {
          img.back = true;
        } else {
          img.back = false;
        }

        img.value = card.value;
        img.index = card.index;
        img.suit = card.suit;
		    img.suitNum = card.suitNum;
        img.color = card.color;
		
        img.type = 'card';
        this.stacks[col].push(img)

      }
      
    }

    //24
 for (var c = 0; c < this.drawCount; c++) {
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive();
      newStock.type = 'draw';
      newStock.index = temp.index;
      newStock.value = temp.value;
      newStock.suit = temp.suit;
      newStock.color = temp.color;
      newStock.suitNum = temp.suitNum;
      newStock.back = false;
      newStock.stack = -1;
      this.drawArray.push(newStock)
    }
  /*  
    for (var c = 0; c < this.drawCount; c++) {
      var temp = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive();

            newStock.type = 'draw';
      newStock.index = temp.index;
      newStock.value = temp.value;
      newStock.suit = temp.suit;
      newStock.color = temp.color;
	  newStock.suitNum = temp.suitNum;
      newStock.back = false;
      newStock.stack = -1;
      this.drawArray.push(newStock)
    }
  */
console.log(this.stacks[6].length)


  }

  flipCard(card) {
  
    // First tween: We raise and flip the card
  
    var flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay: 0,
      duration: gameOptions.flipSpeed / 2,
      ease: 'Linear'
    });
  
    // this.flipCard.frameNr = 0; // Start with backside
    flipTween.on('complete', () => {
      card.setFrame(card.index)
      card.back = false;
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
  getSuitNum(suit){
	  switch(suit){
		  case 'clubs': 
			return 0;
			break;
		  case 'diamonds':
			retrun: 1;
			break;
		  case 'hearts':
			return 2;
			break;
		  case 'spades':
			return 3;
			break;
	  }
  }
}