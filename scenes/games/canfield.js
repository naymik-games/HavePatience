class playCanfield extends Phaser.Scene {
  constructor() {
    super("playCanfield");
  }
  preload() {


  }

  create() {
    //set up card sizing for this game

    this.drawMode = gameData[currentGameNum].preferance1;//3 321

    if(this.drawMode == 3){
      this.drawLimit = 100;
    } else {
      this.drawLimit = 3;
    }
    this.cardSpacing = 15;
    this.edgeMargin = 15;
    this.cardBlank = 62;
    var cols = games[currentGameNum].cols;
    var cardSpace = 900 - (this.cardSpacing * (cols + 1))
    var s = (cardSpace / cols) / decks[gameOptions.deckNum].cardWidth
    this.scale = s;
    this.cardWidth = decks[gameOptions.deckNum].cardWidth * this.scale;
    this.cardHeight = decks[gameOptions.deckNum].cardHeight * this.scale;

console.log(this.drawLimit)


    this.isStarted = false;

    //gameOptions.deck = 'cards_8bit'




    this.deckBack = gameOptions.deckBack;

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

    //arrays for various card stacks
    this.drawArray = [];
    this.wasteArray = [];
    this.reserveArray = [];
    this.foundationArray = [[], [], [], []];
    this.stacks = [[], [], [], [], [], [], []];
    this.stacksSetup = [[1], [2], [3], [4], [5], [6], [7]];
    this.foundationImageArray = [];
    this.stackImageArray = [];
    this.selection = { value: -1, suit: null, color: null, stack: null, card: null }
    this.isMult = false;


    //marker for reserve
    this.reserveMarker = this.add.image(this.edgeMargin + this.cardWidth / 2, 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    //  this.discardPile.type = 'discard';



    //pile for cards you can draw from
    this.drawPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 850, gameOptions.deck, this.deckBack).setScale(this.scale).setOrigin(.5).setInteractive().setDepth(1);
    this.drawPile.type = 'draw'
    this.drawCount = 34;
    this.drawCountText = this.add.bitmapText(game.config.width / 2, 1400, 'topaz', this.drawCount, 50).setOrigin(.5).setTint(0xffffff);


    //just a blank card to indicate where the played cards go
    this.discardPile = this.add.image(this.edgeMargin + this.cardWidth / 2, 600, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    this.discardPile.type = 'discard';


    this.refreshIcon = this.add.image(this.edgeMargin + this.cardWidth / 2, 850, 'icons', 1);
    this.refreshIcon.type = 'refresh';
    this.refreshCount = 0;




    //foundation markers
    var num = 4;
    for (var i = 4; i > 0; i--) {

      var slotImage = this.add.image((game.config.width - (this.edgeMargin - this.cardWidth / 2)) - i * (this.cardSpacing + this.cardWidth), 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      slotImage.type = 'found'
      // var sImage = this.add.image((game.config.width - (this.edgeMargin - this.cardWidth / 2)) - i * (this.cardSpacing + this.cardWidth), 350, 'suit_icons', num).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      num++;
      this.foundationImageArray.push(slotImage);
    }
    //stack markers

    for (var i = 0; i < 4; i++) {
      var img = this.add.image((245 + this.cardWidth / 2) + i * (this.cardSpacing + this.cardWidth), 600, gameOptions.deck, this.cardBlank).setOrigin(.5).setAlpha(.2).setScale(this.scale).setInteractive();
      img.stack = i;
      img.type = 'empty';
      this.stackImageArray.push(img);
    }

    this.rTextC = this.add.bitmapText((game.config.width - (this.edgeMargin + this.cardWidth / 2)) - 0 * (this.cardSpacing + this.cardWidth), 350, 'topaz', '5', 130).setOrigin(.5).setTint(0xffffff);
    this.rTextD = this.add.bitmapText((game.config.width - (this.edgeMargin + this.cardWidth / 2)) - 1 * (this.cardSpacing + this.cardWidth), 350, 'topaz', '10', 130).setOrigin(.5).setTint(0xffffff);
    this.rTextH = this.add.bitmapText((game.config.width - (this.edgeMargin + this.cardWidth / 2)) - 2 * (this.cardSpacing + this.cardWidth), 350, 'topaz', 'J', 130).setOrigin(.5).setTint(0xffffff);
    this.rTextS = this.add.bitmapText((game.config.width - (this.edgeMargin + this.cardWidth / 2)) - 3 * (this.cardSpacing + this.cardWidth), 350, 'topaz', '2', 130).setOrigin(.5).setTint(0xffffff);

    this.score = 5;
    this.scoreText = this.add.bitmapText(850, 1500, 'topaz', this.score, 70).setOrigin(.5).setTint(0xffffff);



    this.d = new Deck('high');

    this.d.createDeck();

    this.d.shuffleDeck();

    this.deal();


    this.input.on('gameobjectdown', this.selectCard, this);

  }
  update() {

  }

  selectCard(e, card) {
    if (card.type == 'draw') {
      this.drawCard();
      return
    }
    if (card.type == 'refresh') {
      //draw refresh stock
      this.refreshDraw();
      return
    }

    if (card.type == 'card' || card.type == 'waste' || card.type == 'found' || card.type == 'empty' || card.type == 'reserve') {
      //first click
      if (this.selection.value == -1) {
        if (card.type == 'empty') { return }
        //if foundation card, select it, unless it is an ace
        if (card.type == 'found') {
          if (card.value == 1) { return }
          this.setSelection(card);
        }
        if (card.type == 'reserve') {
          if (this.checkFoundation(card.suitNum, card.value)) {
            this.moveToFoundation(card);
            return
            //then check if it is a king and can go on an empty stack
          } else if (this.findEmptyStack() > -1) {
            var temp = this.findEmptyStack();

            this.moveToEmptyStack(card, temp);
            return

          } else {
            //otherwise, select the card
            this.setSelection(card, true);
          }
        } else if (card.type == 'waste') {
          //if it is a waste card
          //check if can go on foundation
          if (this.checkFoundation(card.suitNum, card.value)) {
            this.moveToFoundation(card);
            return
            //then check if it is a king and can go on an empty stack
          } else if (this.findEmptyStack() > -1) {
            var temp = this.findEmptyStack();

            this.moveToEmptyStack(card, temp);
            return

          } else {
            //otherwise, select the card
            this.setSelection(card, true);
          }
          //if it is a card on tableau
        } else if (card.type == 'card') {
          //check if is a top card or not
          var indexS = this.stacks[card.stack].indexOf(card);
          //check if the card stack index is less than the top card. if so, use select multiple instead
          if (indexS < this.stacks[card.stack].length - 1 && !card.back) {
            this.setMultiple(card, indexS);
            this.isMult = true;
            return
          } else {
            //if a single select, return if it is not an exposed card.
            if (card.back) { return }

            //if it is the top card on stack, check for foundation and king or slect it.
            if (this.checkFoundation(card.suitNum, card.value)) {
              this.moveToFoundation(card);
              //this.clearSelection();
              return
              //then check if it is a king and can go on an empty stack
            } else if (this.findEmptyStack() > -1) {
              var temp = this.findEmptyStack();

              this.moveToEmptyStack(card, temp);
              return

            } else {
              //otherwise, select the card
              this.setSelection(card, true);
            }



          }
        }


        //second click
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
          } else if (this.selection.card.type == 'waste') {
            //if originating card is waste, check for legal move and move it
            if (this.checkSequence(this.selection.card, card)) {
              this.moveToStack(this.selection.card, card);

            }
            this.clearSelection();
          } else if (this.selection.card.type == 'reserve') {
            //if originating card is reserve, check for legal move and move it
            if (this.checkSequence(this.selection.card, card)) {
              this.moveToStack(this.selection.card, card);

            }
            this.clearSelection();
          } else if (this.selection.card.type == 'found') {
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
    if (from.value + 1 == to.value && from.color != to.color) {
      return true
    }
    if (to.value == 1 && from.value == 13 && from.color != to.color) {
      return true
    }
    return false

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
    this.selection.value = -1;
    this.selection.suit = null;
    this.selection.color = null;
    this.selection.card = null;
    this.selection.stack = null;
    this.selection.type = null;
  }
  moveToFoundation(fromCard) {

    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      fromCard.type = 'found'
      this.flipBack(fromCard.stack)
    } else if (fromCard.type == 'waste') {
      this.wasteArray.pop();
      fromCard.type = 'found'
    } else if (fromCard.type == 'reserve') {
      this.reserveArray.pop();
      fromCard.type = 'found'
    }

    this.foundationArray[fromCard.suitNum].push(fromCard);
    this.children.bringToTop(fromCard)

    var tween = this.tweens.add({
      targets: fromCard,
      x: this.foundationImageArray[fromCard.suitNum].x,
      y: this.foundationImageArray[fromCard.suitNum].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function() {
        this.score += 5;
        this.scoreText.setText(this.score)
        this.checkWin();
      }
    })

  }
  checkWin(){
    console.log(this.stacks[0].length);
    if(this.stacks.length == 0){
      
      console.log('win!');
    }
  }
  moveToStack(fromCard, toCard) {
    if (fromCard.type == 'card') {
      this.stacks[fromCard.stack].pop();
      this.flipBack(fromCard.stack)
      fromCard.stack = toCard.stack;
      // fromCard.type = 'found'

    } else if (fromCard.type == 'waste') {
      this.wasteArray.pop();
      fromCard.type = 'card';
      fromCard.stack = toCard.stack;
    } else if (fromCard.type == 'reserve') {
      this.reserveArray.pop();
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


  moveMult(toCard) {
    console.log('move mult')

    if (toCard.type == 'empty') {
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
          y: (toCard.y) + (i * 50),
          duration: 200
        })


      }
      this.flipBack(this.selection.stack)


    } else if (this.selection.value + 1 == toCard.value && this.selection.color != toCard.color) {
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
          y: (toCard.y + 50) + (i * 50),
          duration: 200
        })


      }
      this.flipBack(this.selection.stack)
    } else if (this.selection.value == 13 && toCard.value == 1 && this.selection.color != toCard.color) {
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
          y: (toCard.y + 50) + (i * 50),
          duration: 200
        })


      }
      this.flipBack(this.selection.stack)
    }
    this.clearMult();
    this.isMult = false;
  }


  moveToEmptyStack(card, tostack) {
    if (card.type == 'card') {
      this.stacks[card.stack].pop();
      // fromCard.type = 'found'
      this.flipBack(card.stack)
    } else if (card.type == 'waste') {
      this.wasteArray.pop();
      card.type = 'card'
    } else if (card.type == 'reserve') {
      this.reserveArray.pop();
      card.type = 'card'
    }
    card.stack = tostack;
    this.stacks[tostack].push(card);
    this.children.bringToTop(card)
    var tween = this.tweens.add({
      targets: card,
      x: this.stackImageArray[tostack].x,
      y: this.stackImageArray[tostack].y,
      duration: 200,
      onCompleteScope: this,
      onComplete: function() {
        // this.removeFromStack(card);
        // this.addToStack(card, stack);
      }
    })
  }
  flipBack(stack) {
    if (this.stacks[stack].length > 0) {
      var card = this.stacks[stack][this.stacks[stack].length - 1];
      if (card.back) {
        this.flipCard(card)
      }

    }
  }


  checkFoundation(num, value) {
    var temp = this.foundationArray[num]
    if (temp.length == 0) {
      if (value == this.foundationValue) {
        return true;
      }
      return false;
    } else if (temp.length > 0) {
      // console.log(num)
      if (temp[temp.length - 1].value + 1 == value) {
        return true;
      } else if (temp[temp.length - 1].value == 13 && value == 1) {

        return true;


      }

    }
    return false;

    //  locArray.at(-1) 

    // else if (this.foundationArray[num][this.foundationArray[num].length - 1].suitNum == num && this.foundationArray[num][this.foundationArray[num].length - 1].value + 1 == value) {
    // return true;




  }
  findEmptyStack() {
    var stack = -1;
    for (var i = 0; i < 4; i++) {
      if (this.stacks[i].length == 0) {
        stack = i;
        break;
      }
    }
    return stack;
  }
  drawCard() {
    if (this.drawMode == 3) {
      if (this.drawArray.length <= 2) {
        var draw = this.drawArray.length;
      } else {
        var draw = 3;
      }
    } else {
      if (this.refreshCount == 0) {
        if (this.drawArray.length <= 2) {
          var draw = this.drawArray.length;
        } else {
          var draw = 3;
        }
      } else if (this.refreshCount == 1) {
        if (this.drawArray.length <= 1) {
          var draw = this.drawArray.length;
        } else {
          var draw = 2;
        }
      } else {
        var draw = 1;
      }
    }
    for (var i = 0; i < draw; i++) {
      var card = this.drawArray.pop();
      //card.setPosition(15 + 184, 350 - 80.5);
      this.children.bringToTop(card)
      card.type = 'waste';
      this.wasteArray.push(card);
      this.flipCard(card);
      var tween = this.tweens.add({
        targets: card,
        x: this.discardPile.x + i * 10,
        y: this.discardPile.y,
        duration: 300,
        delay: i * 100
      })
      //this.pyramid.push(newStock)
      //this.drawArray.push(newStock);
      this.drawCount--;

    }
    
    if (this.drawCount == 0 && this.refreshCount < this.drawLimit) {
      this.drawPile.setAlpha(0)
      this.refreshIcon.setInteractive();
    }
    // console.log(this.stockArray.length)
    this.drawCountText.setText(this.drawCount);
  }


  refreshDraw() {
    this.refreshCount++;

    this.showDraw();
    this.refreshIcon.disableInteractive();
    this.drawPile.setAlpha(1)
    this.drawArray = this.wasteArray;
    this.wasteArray = [];
    this.drawArray.reverse();
    //  console.log('draw ' + this.drawArray.length)
    // console.log('stock ' + this.stockArray.length)
    this.hideDraw();
    this.drawCount = this.drawArray.length;
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

    // first foundation
    var cardF = this.d.cards.pop();
    var imgF = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, cardF.index).setOrigin(.5).setScale(this.scale).setInteractive();
    this.children.bringToTop(imgF)
    imgF.value = cardF.value;
    imgF.index = cardF.index;
    imgF.suit = cardF.suit;
    imgF.suitNum = cardF.suitNum;
    // img.color = cardF.color;
    imgF.stack = 0;
    imgF.type = 'found';
    this.foundationArray[cardF.suitNum].push(imgF);
    // this.foundationArray[cardF.suitNum] = imgF;
    //console.log(this.foundationArray)
    this.foundationValue = cardF.value;


    var tween = this.tweens.add({
    			targets: imgF,
    			x: this.foundationImageArray[cardF.suitNum].x,
    			y: this.foundationImageArray[cardF.suitNum].y,
    			duration: 300,
    			delay: 100
        });




    // set rank Text
    this.rTextC.setText(cardF.rankShort);
    this.rTextD.setText(cardF.rankShort);
    this.rTextH.setText(cardF.rankShort);
    this.rTextS.setText(cardF.rankShort);






    // reserve
    for (var r = 0; r < 13; r++) {
      var card = this.d.cards.pop();
      var img = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, card.index).setOrigin(.5).setScale(this.scale).setInteractive();
      this.children.bringToTop(img)
      img.value = card.value;
      img.index = card.index;
      img.suit = card.suit;
      img.suitNum = card.suitNum;
      img.color = card.color;
      img.type = 'reserve';
      this.reserveArray.push(img);
      
        var tween = this.tweens.add({
    			targets: img,
    			x: this.reserveMarker.x,
    			y: this.reserveMarker.y,
    			duration: 300,
    			delay: r * 50
        });


    }


    // tableau
    // var initial_set = [0, 1, 2, 3, 4, 5, 6];
    for (var col = 0; col < 4; col++) {
      //for (var row = 0; row < this.stacksSetup[col]; row++) {
      var card = this.d.cards.pop();
      var frame = card.index;

      var img = this.add.image(this.drawPile.x, this.drawPile.y, gameOptions.deck, frame).setOrigin(.5).setScale(this.scale).setInteractive();
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

      var tween = this.tweens.add({
    			targets: img,
    			x: (245 + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth),
    			y: 600,
    			duration: 300,
    			delay: col * 100
        });




      //}

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




  }

  flipCard(card) {
    gameOptions.flipZoom = this.scale + .2
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
  getSuitNum(suit) {
    switch (suit) {
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