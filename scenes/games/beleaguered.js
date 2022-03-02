class playBeleaguered extends Phaser.Scene {
  constructor() {
    super("playBeleaguered");
  }
  preload() {


  }

  create() {
    //set up card sizing for this game

    //gameOptions.deck = 'cards_8bit'

    if (gameOptions.deck == 'cards') {
      this.scale = .8;
      this.cardWidth = 130 * this.scale;
      this.cardHeight = 202 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 30;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_modern') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_classic') {
      this.scale = .75;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 18;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_windows') {
      this.scale = 1.4;
      this.cardWidth = 75 * this.scale;
      this.cardHeight = 105 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_traditional') {
      this.scale = .45;
      this.cardWidth = 234 * this.scale;
      this.cardHeight = 333 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_horizontal') {
      this.scale = 1.4;
      this.cardWidth = 75 * this.scale;
      this.cardHeight = 113 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_sw') {
      this.scale = .85;
      this.cardWidth = 120 * this.scale;
      this.cardHeight = 170 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_colors') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_pixel_2') {
      this.scale = 2.5;
      this.cardWidth = 42 * this.scale;
      this.cardHeight = 62 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_black') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_roast') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_2d') {
      this.scale = 1.25;
      this.cardWidth = 88 * this.scale;
      this.cardHeight = 124 * this.scale;
      this.cardSpacing = 15;
      this.edgeMargin = 20;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_8bit') {
      this.scale = .8;
      this.cardWidth = 132 * this.scale;
      this.cardHeight = 180 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 15;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_other') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_black_simple') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_mono') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 14;
      this.edgeMargin = 14;
      this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_face') {
      this.scale = .5;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_large') {
      this.scale = .8;
      this.cardWidth = 140 * this.scale;
      this.cardHeight = 190 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_throne') {
      this.scale = .8;
      this.cardWidth = 164 * this.scale;
      this.cardHeight = 241 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_fourcolors') {
      this.scale = .8;
      this.cardWidth = 178 * this.scale;
      this.cardHeight = 250 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_sixty') {
      this.scale = .8;
      this.cardWidth = 178 * this.scale;
      this.cardHeight = 250 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else if (gameOptions.deck == 'cards_sixty_2') {
      this.scale = .8;
      this.cardWidth = 178 * this.scale;
      this.cardHeight = 250 * this.scale;
      this.cardSpacing = 20;
      this.edgeMargin = 20;
	  this.cardBlank = 62;
    } else {
      this.scale = 1.1;
      this.cardWidth = 103 * this.scale;
      this.cardHeight = 138 * this.scale;
      this.cardSpacing = 12;
      this.edgeMargin = 37;
      this.cardBlank = 62;
    }



    this.deckBack = gameOptions.deckBackb

    this.cameras.main.setBackgroundColor(gameOptions.bgColors[gameOptions.bgColor]);

    //arrays for various card stacks

    this.foundationArray = [[], [], [], []];
    this.stacks = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];
    //this.stacksSetup = [[1], [2], [3], [4], [5], [6], [7]];
    this.foundationImageArray = [];
    this.stackImageArray = [];
    this.freeCellArray = [];
    this.selection = { value: -1, suit: null, color: null, stack: null, card: null }
    this.isMult = false;
    //pile for cards you can draw from



    //just a blank card to indicate where the played cards go
    // this.discardPile = this.add.image(game.config.width / 2, 350, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
    // this.discardPile.type = 'discard';





    //foundation markers
    for (var i = 0; i < 4; i++) {
      var slotImage = this.add.image(game.config.width / 2, 350 + i * (this.cardSpacing + this.cardHeight), gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2);
      slotImage.type = 'found'
      this.foundationImageArray.push(slotImage);
      var sImage = this.add.image(game.config.width / 2, 350 + i * (this.cardSpacing + this.cardHeight), 'suit_icons', i).setScale(this.scale).setOrigin(.5).setAlpha(.2);

    }
    //stack markers
    for (var i = 0; i < 8; i++) {

      if (i < 4) {
        var x = this.edgeMargin + this.cardWidth / 2
        var y = 350 + i * (this.cardSpacing + this.cardHeight)
      } else {
        var x = (((game.config.width / 2 + this.cardWidth / 2) + this.cardSpacing + this.cardWidth / 2))
        var y = 350 + (i - 4) * (this.cardSpacing + this.cardHeight)
      }
      var img = this.add.image(x, y, gameOptions.deck, this.cardBlank).setOrigin(.5).setAlpha(.2).setScale(this.scale).setInteractive();
      img.stack = i;
      img.type = 'empty';
      this.stackImageArray.push(img);
    }
    //freecell marker
    this.freePile = this.add.image(game.config.width / 2, 1050, gameOptions.deck, this.cardBlank).setScale(this.scale).setOrigin(.5).setAlpha(.2).setInteractive();

    this.freePile.type = 'freePile';
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

    if (card.type == 'card' || card.type == 'found' || card.type == 'free' || card.type == 'freePile') {
      //first click
      if (this.selection.value == -1) {
        if (card.type == 'empty') { return }
        if (card.type == 'freePile') { return }
        //if foundation card, select it, unless it is an ace
        if (card.type == 'found') {
          if (card.value == 1) { return }
          this.setSelection(card);
        }
        //if it is a waste card
        if (card.type == 'free') {

          this.setSelection(card, true);

          //if it is a card on tableau
        } else if (card.type == 'card') {
          //check if is a top card or not
          var indexS = this.stacks[card.stack].indexOf(card);
          //check if the card stack index is less than the top card. if so, use select multiple instead
          if (indexS < this.stacks[card.stack].length - 1) {

            return
          } else {



            //if it is the top card on stack, check for foundation and king or slect it.
            if (this.checkFoundation(card.suitNum, card.value)) {
              this.moveToFoundation(card);
              //this.clearSelection();
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

            if (this.selection.stack == card.stack && card.type != 'empty') {
              console.log('same stack? ' + this.selection.stack + ',' + card.stack)
              this.clearSelection();
              return
            }


            //otherwise, check if legal move and use normal move method
            if (this.checkSequence(this.selection.card, card)) {
              console.log('checking squence...')
              this.moveToStack(this.selection.card, card);

            }
            this.clearSelection();
          } else if (this.selection.card.type == 'free') {
            //if originating card is waste, check for legal move and move it
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

        } else if(card.type == 'freePile'){
          this.moveToFree(this.selection.card);
          this.clearSelection();
        }







      }

    }
  }
  checkSequence(from, to) {
    if (from.value + 1 == to.value) {
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
    } else if (fromCard.type == 'free') {
     // this.wasteArray.pop();
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
      x: toCard.x + 35,
      y: toCard.y,
      duration: 200
    })


  }
moveToFree(fromCard){
  this.stacks[fromCard.stack].pop();
     fromCard.type = 'free'
      fromCard.stack = -1;
      this.children.bringToTop(fromCard)
    var tween = this.tweens.add({
      targets: fromCard,
      x: this.freePile.x,
      y: this.freePile.y,
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
          y: (toCard.y) + (i * 50),
          duration: 200
        })


      }
      this.flipBack(this.selection.stack)


    } else





    if (this.selection.value + 1 == toCard.value && this.selection.color != toCard.color) {
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
    if (this.foundationArray[num].length == 0) {
      if (value == 1) {
        return true;
      }
    } else if (this.foundationArray[num][this.foundationArray[num].length - 1].suitNum == num && this.foundationArray[num][this.foundationArray[num].length - 1].value + 1 == value) {
      return true;
    } else {
      return false;
    }
  }
  findEmptyStack() {
    var stack = -1;
    for (var i = 0; i < 7; i++) {
      if (this.stacks[i].length == 0) {
        stack = i;
        break;
      }
    }
    return stack;
  }





  deal() {
    //foundation
    for (let i = 0; i < this.d.cards.length; i++) {
      if (this.d.cards[i].value == 1) {

        var card = this.d.cards.splice(i, 1);

        var img = this.add.image(this.foundationImageArray[card[0].suitNum].x, this.foundationImageArray[card[0].suitNum].y, gameOptions.deck, card[0].index).setOrigin(.5).setScale(this.scale).setInteractive();
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
    for (var i = 0; i < 8; i++) {

      if (i < 4) {
        var x = this.edgeMargin + this.cardWidth / 2
        var y = 350 + i * (this.cardSpacing + this.cardHeight)
      } else {
        var x = (((game.config.width / 2 + this.cardWidth / 2) + this.cardSpacing + this.cardWidth / 2))
        var y = 350 + (i - 4) * (this.cardSpacing + this.cardHeight)
      }
      for(var s = 0; s < 6; s++){
        var card = this.d.cards.pop();
        var img = this.add.image(x + s*35, y, gameOptions.deck, card.index).setOrigin(.5).setAlpha(1).setScale(this.scale).setInteractive();
        img.stack = i;
        
        img.value = card.value;
        img.index = card.index;
        img.suit = card.suit;
        img.suitNum = card.suitNum;
        img.color = card.color;
        img.type = 'card';
        this.stacks[i].push(img)
      }
      
    }
  }
  deal_() {

    var initial_set = [0, 1, 2, 3, 4, 5, 6];
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < this.stacksSetup[col]; row++) {
        var card = this.d.cards.pop();
        if (row == initial_set[col]) {
          var frame = card.index;
        } else {
          var frame = this.deckBack;
        }
        var img = this.add.image((this.edgeMargin + this.cardWidth / 2) + col * (this.cardSpacing + this.cardWidth), 550 + row * 50, gameOptions.deck, frame).setOrigin(.5).setScale(this.scale).setInteractive();
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