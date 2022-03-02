class playDiplomat extends Phaser.Scene {
  constructor() {
    super("playDiplomat");
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
    //gameOptions.deck = 'cards_modern'

    

    this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);
	this.stacks = [[], [], [], [], [], [], [], []];
	this.foundationArray = [[], [], [], [], [], [], [], []];
	this.foundationImageArray = [];
	this.stackImageArray = [];
	this.drawArray = [];
	this.wasteArray = [];
	//set up foundation markers
	for (var col = 0; col < 8; col++) {
					
		var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setAlpha(.2).setOrigin(.5).setScale(this.scale).setInteractive();
		img.stack = col;
		img.type = 'found';
		this.foundationImageArray.push(img)

     }
	
	//set up stack markers
	for (var col = 0; col < 8; col++) {
				
		var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 550, gameOptions.deck, this.cardBlank).setAlpha(.3).setOrigin(.5).setScale(this.scale).setInteractive();
		img.stack = col;
		img.type = 'empty';
		this.stackImageArray.push(img)

     }
	
	
	
	//pile for cards you can draw from
    this.drawPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 1500, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
    this.drawPile.type = 'draw'
    this.drawCount = 64;
    this.drawCountText = this.add.bitmapText(game.config.width / 2, 1400, 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);

	 //just a blank card to indicate where the played cards go
    this.discardPile = this.add.image((this.drawPile.x + this.cardWidth / 2) + this.cardSpacing + this.cardWidth / 2, 1500, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    this.discardPile.type = 'discard';

    this.selection = { value: -1, suit: null, color: null, stack: null, card: null }

	
	
	this.d = new Deck('high');

    this.d.createDeck();

    this.d.shuffleDeck();

	this.d2 = new Deck('high');

    this.d2.createDeck();

    this.d2.shuffleDeck();

	this.td = this.d.cards.concat(this.d2.cards);

	this.shuffleTwoDecks();

    this.deal();
	  this.input.on('gameobjectdown', this.selectCard, this);

	}
	
	update(){
	
	}
	shuffleTwoDecks() {
    let location1, location2, tmp;
		for (let i = 0; i < 1000; i++) {
		  location1 = Math.floor((Math.random() * this.td.length));
		  location2 = Math.floor((Math.random() * this.td.length));
		  tmp = this.td[location1];
		  this.td[location1] = this.td[location2];
		  this.td[location2] = tmp;
		}
	}
	 selectCard(e, card) {
		if (card.type == 'draw') {
		  this.drawCard();
		  return
		}
		if(card.type == 'card' || card.type == 'waste' || card.type == 'found' || card.type == 'empty'){
		  // first click
		  if (this.selection.value == -1) {
		    if (card.type == 'empty') { return }
		    		    
		    //if it is a waste card
		    if (card.type == 'waste') {
				var foundNum = this.checkFoundation(card.suitNum, card.value);
		      if (foundNum > -1) {
		        this.moveToFoundation(card, foundNum);
		        //this.clearSelection();
		        return
		        
		      } else {
		        //otherwise, select the card
		        this.setSelection(card, true);
		      }
		      //if it is a card on tableau
		    } else if (card.type == 'card' && this.topCard(card)){
				var foundNum = this.checkFoundation(card.suitNum, card.value);
		      if (foundNum > -1) {
              this.moveToFoundation(card, foundNum);
              //this.clearSelection();
              return
              //then check if it is a king and can go on an empty stack
            } else {
              //otherwise, select the card
              this.setSelection(card, true);
            }
		      
		    }
		  } else {
		    //second click
		    if (card.type == 'card' || card.type == 'empty') {
		      //if originating card is on tableau then check if it is the same stack.  if it is, return
		      if (this.selection.type == 'card') {
		        if (card.type == 'empty'){

		      this.moveToEmptyStack(this.selection.card, card);

		      this.clearSelection();

		          return
		    }
		        if (this.selection.stack == card.stack && card.type != 'empty') {
		          //console.log('same stack? ' + this.selection.stack + ',' + card.stack)
		          this.clearSelection();
		          return
		        }
		        
		    
		        //otherwise, check if legal move and use normal move method
		        if (this.checkSequence(this.selection.card, card)) {
		          console.log('checking squence...')
		          this.moveToStack(this.selection.card, card);
		          
		        }
		        this.clearSelection();
		      } else if (this.selection.card.type == 'waste') {
		        //if originating card is waste, check for legal move and move it
		        if (this.checkSequence(this.selection.card, card)) {
		          this.moveToStack(this.selection.card, card);
		    
		        }
		        this.clearSelection();
		      } 
		      //this.selection.value + 1 == card.value && this.selection.color != card.color
		      //
		    
		    }
		  }
		}
	 }
	 
  checkSequence(from, to) {
    if (from.value + 1 == to.value) {// && from.color != to.color
      return true
    }
    return false

  }
  
topCard(card){
  var top = this.stacks[card.stack][this.stacks[card.stack].length - 1]
  //console.log('top value' + top.value)
  if(top.index == card.index){
    return true
  } else {
    return false
  }
}
checkFoundation(num, value) {
    if (this.foundationArray[num].length == 0) {
      if (value == 1) {
        return num;
      }
    } else if (this.foundationArray[num][this.foundationArray[num].length - 1].suitNum == num && this.foundationArray[num][this.foundationArray[num].length - 1].value + 1 == value) {
      return num;
    } if (this.foundationArray[num + 4].length == 0) {
      if (value == 1) {
        return num + 4;
      }
    } else if (this.foundationArray[num + 4][this.foundationArray[num + 4].length - 1].suitNum == num && this.foundationArray[num + 4][this.foundationArray[num + 4].length - 1].value + 1 == value) {
      return num + 4;
    } else {
      return -1;
    }
  }


  
  
  setSelection(card, tab) {
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
  clearSelection() {
    this.selection.card.clearTint()
    this.selection.value = -1;
    this.selection.suit = null;
    this.selection.color = null;
    this.selection.stack = null;
    this.selection.card = null;
    this.selection.type = null;
    // this.selectImage.setPosition(-20,-20).setAlpha(0);
  }
	moveToStack(fromCard, toCard) {
    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      fromCard.stack = toCard.stack;
      // fromCard.type = 'found'

    } else if (fromCard.type == 'waste') {
      this.wasteArray.pop();
      fromCard.type = 'card';
      fromCard.stack = toCard.stack;
    } else if (fromCard.type == 'found') {
      this.foundationArray[fromCard.suitNum].pop();
      fromCard.type = 'card';
      fromCard.stack = toCard.stack;
    }

    this.stacks[toCard.stack].push(fromCard);
    this.children.bringToTop(fromCard)
    var tween = this.tweens.add({
      targets: fromCard,
      x: toCard.x,
      y: toCard.y + 50,
      duration: 200
    })


  }

  moveToFoundation(fromCard, toNum) {

    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      fromCard.type = 'found'
     
    } else if (fromCard.type == 'waste') {
      this.wasteArray.pop();
      fromCard.type = 'found'
    }
this.foundationArray[toNum].push(fromCard);
    this.foundationArray[toNum].push(fromCard);
    this.children.bringToTop(fromCard)

    var tween = this.tweens.add({
      targets: fromCard,
      x: this.foundationImageArray[toNum].x,
      y: this.foundationImageArray[toNum].y,
      duration: 200
    })

  }
  moveToEmptyStack(card, tostack) {
    if (card.type == 'card') {
      this.stacks[card.stack].pop();
      // fromCard.type = 'found'
      
    } else if (card.type == 'waste') {
      this.wasteArray.pop();
      card.type = 'card'
    }
	card.stack = tostack.stack;
    this.stacks[tostack.stack].push(card);
    this.children.bringToTop(card)
    var tween = this.tweens.add({
      targets: card,
      x: this.stackImageArray[tostack.stack].x,
      y: this.stackImageArray[tostack.stack].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function() {
        // this.removeFromStack(card);
        // this.addToStack(card, stack);
      }
    })
  }
	drawCard() {
		
		  var card = this.drawArray.pop();
		  //card.setPosition(15 + 184, 350 - 80.5);
		  this.children.bringToTop(card)
		  card.type = 'waste';
		  this.wasteArray.push(card);
		  this.flipCard(card);
		  var tween = this.tweens.add({
			targets: card,
			x: this.discardPile.x,
			y: this.discardPile.y,
			duration: 300,
		//	delay: i * 100
		  })
		  //this.pyramid.push(newStock)
		  //this.drawArray.push(newStock);
		  this.drawCount--;

		
		if (this.drawCount == 0) {
		  this.drawPile.setAlpha(0)
		 
		}
		// console.log(this.stockArray.length)
		this.drawCountText.setText(this.drawCount);
	  }


	deal(){
		console.log(this.td.length);
		//tableau
		for (var col = 0; col < 8; col++) {
			for (var row = 0; row < 5; row++) {
				var card = this.td.pop();
				
				var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 550 + row * 50, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
				img.stack = col;
				img.value = card.value;
				img.index = card.index;
				img.suit = card.suit;
				img.suitNum = card.suitNum;
				img.color = card.color;
				
				img.type = 'card';
				this.stacks[col].push(img)
				//count++;

		    }
      
        }
		//draw pile
		for (var c = 0; c < this.drawCount; c++) {
		  var temp = this.td.pop();
		  var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive();
		  newStock.type = 'draw';
		  newStock.index = temp.index;
		  newStock.value = temp.value;
		  newStock.suit = temp.suit;
		  newStock.color = temp.color;
		  newStock.suitNum = temp.suitNum;
		  
		  newStock.stack = -1;
		  this.drawArray.push(newStock)
		}
		
		
		
		
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
}