class playFreecell extends Phaser.Scene {
  constructor() {
    super("playFreecell");
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
   // gameOptions.deck = 'cards_real'

    



    this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

    //arrays for various card stacks
	// the empty slots for moving cards
    this.free = [null, null, null, null];
    // the spaces to hold the completed suits
  //  this.suits = [null, null, null, null];
    // the columns of cards
    this.stacks = [[], [], [], [], [], [], [], []];
	this.foundationImageArray = [];
	this.stackImageArray = [];
	this.freeImageArray = [];
	
    this.suits = [[],[],[],[]];
 
    this.stacksSetup = [[7], [7], [7], [7], [6], [6], [6],[6]];
    
    this.selection = {value: -1, suit: null, color: null, stack: null, cards: []}
	

    //

    //foundation markers
    
	for (var i = 0; i < 8; i++) {
      var freeImage = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
       if(i < 4) {
         freeImage.type = 'free'
         freeImage.stack = i;
         freeImage.setInteractive();
         this.freeImageArray.push(freeImage);
         
       } else {
         
         this.foundationImageArray.push(freeImage);
         var sImage = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, 'suit_icons', i).setScale(this.scale).setOrigin(.5).setAlpha(.2);

       }
      
      
      
    }
	//stack markers
	for (var i = 0; i < 8; i++) {
		var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 550, gameOptions.deck, this.cardBlank).setOrigin(.5).setScale(this.scale).setAlpha(.2).setInteractive();
		img.stack = i;
		img.type = 'blank';
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
	  if(card.type == 'card' || card.type == 'free' || card.type == 'found' || card.type == 'blank'){
		  if(this.selection.value == -1){
		    if(card.type == 'blank'){return}
		   if(this.moveToFoundationAce(card)){
		     return 
		   } else {
		     if(card.type == 'card' ){
				 if(this.playableCard(card)){
					 this.setSelection(card, card.stack);
				 }
			 } else {
				this.setSelection(card, card.stack); 
			 }
		     
		   }
			 
		  } else {
		    if(card.type == 'free'){
		      console.log('move to free')
		      if(this.free[card.stack] == null){
		        this.moveToFree(this.selection.card, card)
		      }
		      this.clearSelection();
		    } else if (card.type == 'card'){
		      console.log('move to stack')
		      this.moveToStack(this.selection.card, card)
		      this.clearSelection();
		    } else if (card.type == 'found') {
		      console.log('move to foundation')
		      this.moveToFoundation(this.selection.card, card)
		      this.clearSelection();
		    } else if (card.type == 'blank'){
				console.log('BLANK')
					this.moveToStack(this.selection.card, card);
				
			  this.clearSelection();
			}
		  }
		  
	  } 
  }
  playableCard(card){
	  var topCard = this.stacks[card.stack].slice(-1);
	 
	  if(topCard[0].value == card.value && topCard[0].suit == card.suit){
		  return true
	  }
	return false
  }
  moveToFree(fromCard, toCard){
    this.free[toCard.stack] = toCard;
    fromCard.type = 'free'
    fromCard.stack = toCard.stack;
      this.stacks[fromCard.stack].pop();
      this.children.bringToTop(fromCard)
    var tween = this.tweens.add({
        targets: fromCard,
        x: this.freeImageArray[toCard.stack].x,
        y: this.freeImageArray[toCard.stack].y,
        duration:200
      })
  }
  moveToStack(fromCard, toCard){
   // var topCard = this.stacks[toCard.stack].slice(-1);
    if(toCard.value - 1 == fromCard.value && fromCard.color != toCard.color || toCard.type == 'blank'){
      if(!this.isStarted){

    	gameData[currentGameNum].attempts++;
    
    	this.saveData();
    	this.isStarted = true;
    	}
	  this.stacks[toCard.stack].push(fromCard);
	  if(fromCard.type == 'free'){
	    this.free[fromCard.stack] = null;
	    fromCard.type = 'card'
	  } else if (fromCard.type == 'found'){
	    this.suits[fromCard.stack].pop()
	    fromCard.type = 'card'
	  } else {
	    this.stacks[fromCard.stack].pop();
	  }
      fromCard.stack = toCard.stack
      this.children.bringToTop(fromCard)
      //var topCard = this.stacks[toCard.stack].slice(-1);
    var tween = this.tweens.add({
        targets: fromCard,
        x: toCard.x,
        y: toCard.y + 50,
        duration:200
      })
    }
  }
  moveToFoundation(fromCard, toCard){
	 if(toCard.value + 1 == fromCard.value && fromCard.suit == toCard.suit){
	  if(fromCard.type == 'free'){
	    this.free[fromCard.stack] = null;
	    
	  } else {
	    this.stacks[fromCard.stack].pop();
	  }
	  this.suits[fromCard.suitNum].push(fromCard);
      
      fromCard.type = 'found'
      fromCard.stack = toCard.suitNum;
      this.children.bringToTop(fromCard)
      //var topCard = this.stacks[toCard.stack].slice(-1);
    var tween = this.tweens.add({
        targets: fromCard,
        x: toCard.x,
        y: toCard.y,
        duration:200
      })
	 }
  }
  
  
    moveToFoundationAce(card){
	if (this.suits[card.suitNum].length == 0){
        if(card.value == 1){
				card.type = 'found';
				
			  this.suits[card.suitNum].push(card);
			  this.stacks[card.stack].pop();
			  card.stack = card.suitNum;
			  this.children.bringToTop(card)
			  var tween = this.tweens.add({
				targets: card,
				x: this.foundationImageArray[card.suitNum].x,
				y: this.foundationImageArray[card.suitNum].y,
				duration:200
			  })
			  return true
		} else {
			return false;
		}
    } 
	  return false;
    
  }
  
  
  
  
  setSelection(card, tab){
	  //this.selection = {value: -1, suit: null, color: null, stack: null, cards: []}
	  this.selection.value = card.value;
	  this.selection.suit = card.suit;
	  this.selection.color = card.color;
	  this.selection.stack = card.stack;
	  this.selection.card = card;
	  this.selection.card.setAlpha(.7).setTint(0x00ff00)
	  //this.selectImage.setPosition(card.x,card.y).setAlpha(1);
	  console.log(card.value + card.suit + card.index)
  }
  clearSelection(){
    this.selection.card.setAlpha(1).clearTint()
	  this.selection.value = -1;
	  this.selection.suit = null;
	  this.selection.color = null;
	  this.selection.stack = null;
	  this.selection.cards = [];
	 // this.selectImage.setPosition(-20,-20).setAlpha(0);
  }
  
 
  deal() {

	var count = 0;
    var initial_set = [0, 1, 2, 3, 4, 5, 6];
    for (var col = 0; col < 8; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = this.d.cards.pop();
        
        var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 550 + row * 50, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
        img.stack = col;
        img.value = card.value;
        img.index = card.index;
        img.suit = card.suit;
		img.suitNum = card.suitNum;
        img.color = card.color;
		
        img.type = 'card';
        this.stacks[col].push(img)
        count++;

      }
      
    }


  }

  flipCard(card) {

    // First tween: We raise and flip the card
    this.flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay: 200,
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
      scaleY: 1,
      scaleX: 1,
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
}