class playCarpet extends Phaser.Scene {

  constructor() {

    super("playCarpet");
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




    //gameOptions.deck = 'cards'

    

    this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

    //slot markers
    this.foundationSlotArray = [];
    this.foundationArray = [[], [], [], []];
    //slot markers
    for (var i = 0; i < 4; i++) {
      var slotImage = this.add.image((135 + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, 62).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      this.foundationSlotArray.push(slotImage);
    }









    //pile for cards you can draw from
    this.drawPile = this.add.image(game.config.width / 2, 1500, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setDepth(1).setInteractive();
    this.drawPile.type = 'draw'
    this.drawCount = 28;
    this.drawCountText = this.add.bitmapText(50, 1500, 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);
    this.drawArray = [];
   // this.slotArray = [];
    //just a blank card to indicate where the played cards go
    this.wastePile = this.add.image(game.config.width / 2 + (this.cardSpacing + this.cardWidth), 1500, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    this.wastePile.type = 'discard';
    this.wasteArray = [];
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
this.win = 0;
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
  selectCard(e, card) {

    if (card.type == 'draw') {

      this.drawCard();
      return
    }
    //if the clicked card is from the stock pile

    //if the clicked card is from the grid
    if (card.type == 'card' || card.type == 'waste') {
      if(!this.isStarted){
      	gameData[currentGameNum].attempts++;
      	this.saveData();
      	this.isStarted = true;
      }
      
      //check founation and move or do nothing
      if(this.checkFoundation(card.suitNum, card.value)){
        this.moveToFoundation(card);
      } else {
        return
      }
    }
  }
  checkFoundation(suitNum, value){
   // console.log(this.foundationArray[num].length)
    var temp = this.foundationArray[suitNum].slice(-1)
    if(temp[0].value + 1 == value){
      return true
    }
  }
  moveToFoundation(card){
    var temp;
    var refill = false;
    //this.slotArray[card.slot].pop();
    if(card.type == 'waste' ){
      this.wasteArray.pop();
    } else {
      this.grid[card.grid] = null;
    	temp = card.grid;
    	refill = true;
    }
	
	
	card.type = 'found';
	card.grid = null;
    this.foundationArray[card.suitNum].push(card)
    this.children.bringToTop(card)
    //temp.slot = secondSlot
    var tween = this.tweens.add({
      targets: card,
      x: this.foundationArray[card.suitNum][0].x,
      y: this.foundationArray[card.suitNum][0].y,
      duration: 300,
      onCompleteScope: this,
      onComplete: function() {
        if (refill){
          this.replenish(temp);
        }
        this.checkWin(card.suitNum);
       // this.addCards(temp);
        // this.testAdd();
        // console.log(this.grid)
        // console.log(this.grid[cardB.grid.r][cardB.grid.c])
      }
    })
    
  }
  checkWin(slot) {
    
    
    if (this.foundationArray[slot].length == 12) {
       this.win++
      if(this.win == 4){
    gameData[currentGameNum].wins++;
    this.saveData();
  
    console.log('win!')
    }
    }
    
  }
  replenish(r){
    //if waste has card, move to tableau, else draw card
    if (r < 5) {
        var x = r;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 600;
      } else if (r < 10) {
        var x = r - 5;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 800;
      } else if (r < 15) {
        var x = r - 10;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 1000;
      } else {
        var x = r - 15;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 1200;
      }
    if(this.wasteArray.length > 0){
      var card = this.wasteArray.pop();
      card.type = 'card';
      card.grid = r;
      this.grid[r] == card;
      /*var tween = this.tweens.add({
          targets: card,
          x: xCalc,
          y: y,
          duration: 300,
          //delay: r * 50,
          onCompleteScope: this,
          onComplete: function() {

          }
        });*/
    } else if(this.drawArray.length > 0) {
      var card = this.drawArray.pop();
        //card.setPosition((this.edgeMargin + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth / 2), 350 + (this.tab[i] - 1) * 50);
        card.setFrame(52)
        this.children.bringToTop(card)
        card.type = 'card';
        card.grid = r,
          this.grid[r] == card;
        this.flipCard(card);
        this.drawCount--;
        if (this.drawCount == 0) {
          this.drawPile.setAlpha(0)
    
        }
        this.drawCountText.setText(this.drawCount);
    }
    
    var tween = this.tweens.add({
          targets: card,
          x: xCalc,
          y: y,
          duration: 300,
          //delay: r * 50,
          onCompleteScope: this,
          onComplete: function() {
          }
     });
    
    
  }
  
  drawCard() {
    var card = this.drawArray.pop();

    //card.setPosition(15 + 184, 350 - 80.5);

    this.children.bringToTop(card);
    card.type = 'waste';
    this.wasteArray.push(card);
    this.flipCard(card);
    var tween = this.tweens.add({
      targets: card,
      x: this.wastePile.x,
      y: this.wastePile.y,
      duration: 300
    })
    //this.pyramid.push(newStock)
    //this.drawArray.push(newStock);
    this.drawCount--;
    if (this.drawCount == 0) {
      this.drawPile.setAlpha(0)
      // this.refreshIcon.setInteractive();
    }
    //console.log(this.stockArray.length)
    this.drawCountText.setText(this.drawCount);

  }
  

  deal() {
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
    //tableau
    this.grid = [];

    for (var r = 0; r < 20; r++) {
      if (r < 5) {
        var x = r;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 600;
      } else if (r < 10) {
        var x = r - 5;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 800;
      } else if (r < 15) {
        var x = r - 10;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 1000;
      } else {
        var x = r - 15;
        var xCalc = (this.edgeMargin + this.cardWidth / 2) + x * (this.cardSpacing + this.cardWidth)
        var y = 1200;
      }


      var card = this.d.cards.pop();


      var img = this.add.image(xCalc, y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();

      //var img = this.add.image(offsetX,350 + i * 162 / 2, 'cards', card.index).setOrigin(.5,0).setScale(.8).setInteractive();
      img.type = 'card';

      img.grid = r,
        img.value = card.value;
      img.index = card.index;
      img.suit = card.suit;
      img.suitNum = card.suitNum;

      this.grid.push(img);
    }
    //draw pile  

    for (var c = 0; c < 28; c++) {

      var card = this.d.cards.pop();
      var newStock = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive();
      newStock.type = 'stock';
      newStock.index = card.index;
      newStock.value = card.value;
      newStock.suitNum = card.suitNum;
      newStock.suit = card.suit;
      newStock.slot = -1;
      this.drawArray.push(newStock)
    }

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