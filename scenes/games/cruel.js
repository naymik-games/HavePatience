class playCruel extends Phaser.Scene {
  constructor() {
    super("playCruel");
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
  //  gameOptions.deck = 'cards_modern'
    




    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);
    this.foundationSlotArray = [];
    this.foundationArray = [[], [], [], []];
    //slot markers
    for (var i = 0; i < 4; i++) {
      var slotImage = this.add.image((311 + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, 62).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      this.foundationSlotArray.push(slotImage);
    }

    this.refreshIcon = this.add.image(this.edgeMargin * 2 + 48, 350, 'icons', 1).setScale(1.5).setInteractive();
    this.refreshIcon.type = 'refresh';

    this.selection = { value: -1, suit: null, slot: null }


    /*
    //pile for cards you can draw from
    this.drawPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 350, 'cards', 52).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
    this.drawPile.type = 'draw'
    this.drawCount = 48;
    this.drawCountText = this.add.bitmapText(game.config.width / 2,1400 , 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
    this.drawArray = [];



    //just a blank card to indicate where the played cards go
    this.discardPile = this.add.image(game.config.width - (this.edgeMargin + this.cardWidth / 2), 600, 'cards', 55).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    this.discardPile.type = 'discard';
    */
    //this holds cards after they are drawn

    this.slotArray = [];
this.locationArray = [];
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
    var one = ['a', 'b', 'c', 'd'];
    console.log(one)
var del =one.splice(2, 1);
console.log(one)
console.log(del[0])
var spot = 0 + 1
one.splice(spot, 0,del[0]);
console.log(one)

  }
  update() {

  }
  selectCard(e, card) {

    if (card.type == 'refresh') {

      this.reDeal();
      return
    }
    //if the clicked card is from the stock pile

    //if the clicked card is from the pyramid
    if (card.type == 'card') {
   //   console.log('value ' + card.value +', slot' + card.slot)
      if (this.selection.value == -1) {
        if (this.checkFoundation(card.suitNum, card.value)) {
          
          this.moveToFoundation(card)
        } else{
          this.setSelection(card);
        }
        //console.log(this.getSuitNumber(card.suit))
        
      } else {
        if (card.value == this.selection.value + 1 && card.suit == this.selection.suit) {
          this.moveCard(this.selection.card, card);
          this.removeSelection();
        } else {
          this.removeSelection();
        }
      }



     

    }
  }
  removeSelection(){
    this.selection.card.setAlpha(1).clearTint();
    this.selection.value = -1;
    this.selection.suit = null;
   // this.selection.slot = null;
    this.selection.card = null;
  

  }
  setSelection(card) {
 
    this.selection.value = card.value;
    this.selection.suit = card.suit;
   // this.selection.slot = card.slot;
    this.selection.card = card;
    card.setAlpha(.9).setTint(0x00ff00)
    
   // this.selectImage.setPosition(card.x, card.y)
   // this.selectImage.setAlpha(1);
    //console.log(this.selection)
  }
  moveCard(fromCard, toCard) {
	  //this.slotArray[fromCard.slot].pop();
	  //fromCard.slot = toCard.slot;
	  //this.slotArray[toCard.slot].push(fromCard);
     var indexFrom = this.slotArray.indexOf(fromCard);
     var indexTo = this.slotArray.indexOf(toCard);
     var indexNew = indexTo + 1
     var del = this.slotArray.splice(indexFrom, 1);
     this.slotArray.splice(indexNew,0, del[0])
      this.children.bringToTop(fromCard)
	
		var tween = this.tweens.add({
		  targets: fromCard,
		  x: toCard.x,
		  y: toCard.y + 50,
		  duration: 300
		})
  }
  



  checkFoundation(suitNum, value){
    
   // console.log(this.foundationArray[num].length)
    var temp = this.foundationArray[suitNum].slice(-1)
    if(temp[0].value + 1 == value){
      return true
    }
  }
  moveToFoundation(card){
    //this.slotArray[card.slot].pop();
    var ind = this.slotArray.indexOf(card)
   // console.log(ind)
	this.slotArray.splice(ind, 1);
	card.type = 'found';
	card.slot = null;
    this.foundationArray[card.suitNum].push(card)
    this.children.bringToTop(card)
    //temp.slot = secondSlot
    var tween = this.tweens.add({
      targets: card,
      x: this.foundationArray[card.suitNum][0].x,
      y: this.foundationArray[card.suitNum][0].y,
      duration: 300
    })
  }
  playable(card) {

    if (this.slotArray[card.slot][this.slotArray[card.slot].length - 1].index == card.index) {
      return true
    }

    return false;
  }
  
  reDeal(){
	   
	  
	  
	  //this.redealArray = [];
	 // this.redealArray = [].concat(...this.slotArray);
	 // console.log(this.redealArray.length)
	  var tween = this.tweens.add({
		  targets: this.slotArray,
		  x: this.refreshIcon.x,
		  y: this.refreshIcon.y,
		  duration: 100,
		  onCompleteScope: this,
		  onComplete: function(){
			  this.doReDeal();
		  }
	  })
  }
  doReDeal(){
    
    var ind = 0
	  for(let i = 0; i < 12; i++){
		 if(i < 6){
			 var x = i;
			 var y = 550;
		 } else {
			 var x = i - 6;
			 var y = 1050;
		 }
		  
		  for (let j = 0; j < 4; j++) {
		  
		  
		//	if(this.slotArray.length > 0){
			 //var card = this.d.cards.pop();
			 //var img = this.add.image(this.edgeMargin + this.cardWidth /2 + x * (this.cardSpacing + this.cardWidth), y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
			 var img = this.slotArray[ind];
			 this.children.bringToTop(img)
	//		 console.log(img)
			// img.count = ind;
			// img.setPosition(this.edgeMargin + this.cardWidth /2 + x * (this.cardSpacing + this.cardWidth),y)
			 ind++;
			 var tween = this.tweens.add({
			  targets: img,
			  x: this.edgeMargin + this.cardWidth /2 + x * (this.cardSpacing + this.cardWidth),
			  y: y + j * 50,
			  duration: 200,
			  onCompleteScope: this,
			  onComplete: function(){
				 
			   }
			  });
		//	}
			
		  } 
		 
		 
		  
	  }
    
    
    
  }
  deal() {
    //take out aces

    var slot = 0;

    for (let i = 0; i < this.d.cards.length; i++) {
      if (this.d.cards[i].value == 1) {

        var card = this.d.cards.splice(i, 1);

        var img = this.add.image(this.foundationSlotArray[card[0].suitNum].x, this.foundationSlotArray[card[0].suitNum].y, gameOptions.deck, card[0].index).setOrigin(.5).setScale(this.scale).setInteractive();
         img.value = card[0].value;
         img.suit = card[0].suit;
         img.suitNum = card[0].suitNum;
         img.type = 'found';
//console.log(card[0].suit)
        this.foundationArray[img.suitNum].push(img);
        
        //this.cards[i].value = 14;
      }
    }
    
	console.log(this.d.cards.length)
	
	  var ind = 0
	  for(let i = 0; i < 12; i++){
		 if(i < 6){
			 var x = i;
			 var y = 550;
		 } else {
			 var x = i - 6;
			 var y = 1050;
		 }
		  
		  for (let j = 0; j < 4; j++) {
		  
		  
			if(this.d.cards.length > 0){
			 var card = this.d.cards.pop();
			 var img = this.add.image(this.edgeMargin + this.cardWidth /2 + x * (this.cardSpacing + this.cardWidth), y + j * 50, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
			 img.value = card.value;
			 img.suit = card.suit;
			 img.suitNum = card.suitNum;
			 img.stack = i;
			 img.type = 'card';
			 img.count = ind;
			 img.index = card.index;
			 this.slotArray.push(img);
			 ind++;
			}
		  } 
		 
		 
		  
	  }

   
	
//console.log(this.slotArray)

//console.log(this.foundationArray[1])
  }
  
  remove(card) {
    //900-67, 350 - 80.5


    var tween = this.tweens.add({
      targets: card,
      x: this.discardPile.x,
      y: this.discardPile.y,
      duration: 300
    })
  }

  flipCard(card) {
    // First tween: We raise and flip the card
    var flipTween = this.tweens.create({
      targets: card,
      scaleY: gameOptions.flipZoom,
      scaleX: 0,
      delay: 200,
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
  addScore() {
    this.events.emit('score');
  }
}