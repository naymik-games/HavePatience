class pauseGame extends Phaser.Scene {
  constructor() {
    super("pauseGame");
  }
  preload() {


  }
  create() {
    this.backBack1 = this.add.image(game.config.width / 2, game.config.height / 2 + 100, 'blank').setTint(0x000000);
    this.backBack1.displayWidth = 800;
    this.backBack1.displayHeight = 1310;

    this.backBack2 = this.add.image(game.config.width / 2, game.config.height / 2 + 100, 'blank').setTint(0xf5625d);
    this.backBack2.displayWidth = 790;
    this.backBack2.displayHeight = 1300;

    this.backBack3 = this.add.image(game.config.width / 2, game.config.height / 2 + 100, 'blank').setTint(0x6fc391);
    this.backBack3.displayWidth = 750;
    this.backBack3.displayHeight = 1260;


    //this.objectiveHeaderText = this.add.bitmapText(125, 400, 'topaz', 'Objective:', 40).setOrigin(0,0).setTint(0x000000).setAlpha(1);
    var objective = '';
    if (currentGame == 'playPyramid') {
      objective = 'Objective\nDiscard all the cards in the Pyramid.\n';
      objective += 'Tableau\n\u2022 Cards are removed in pairs totalling 13.\n\u2022 Only open cards are available for play (not blocked on the bottom by another card.\n \u2022 The top card of the draw pile and the top card of waste pile are available to math with an open card in the pyramid.\n\u2022 Kings are discarded individually.\n';
      objective += 'Draw \n \u2022 Draw one card as needed. When the draw pile is exhausted, it may be flipped and redrawn twice (3 total times).\n';
      objective += 'Waste\n \u2022 The top card is available for play';
    } else if (currentGame == 'playAces') {
      objective = 'Exhaust the draw pile with only the Aces remaining';
      objective += 'Tableau\n\u2022 If two or more cards are the same suit, select the card with the lowest rank to remove it to the waste pile.\n\u2022 Only open cards are available for play (not blocked on the bottom by another card.\n\u2022 If a open spot becomes available, any open card may be moved to fill it in.\n';
      objective += 'Draw \n \u2022 When no more cards can be removed, one card is dealt to each tableau and play continues.\n\u2022 Once the stock is empty, the game is over.';
    } else if (currentGame == 'playGolf') {
      objective = 'Objective\n Move all the cards to the foundation.\n';
      objective += 'Foundations\n\u2022 Starts with the first card turned up from the draw pile\n';
      objective += 'Tableau\n\u2022 Build up or down on the foundation regardless of suit.\n\u2022 The top card of each column is available for play to the foundation\n';
      objective += 'Draw \n \u2022 When no more cards can be moved to the foundation, one card is turned up at a time and placed on the foundation. No redeals.\n';
    } else if (currentGame == 'playEuchre') {
      objective = 'Remove all cards from the tableau';
    } else if (currentGame == 'playKlondike') {
      objective = 'Objective\n Move all the cards to the foundations.\n';
      objective += 'Foundations\n\u2022 Build up in suit from Ace to King.\n';
      objective += 'Tableau\n\u2022 Build down in alternating colors.\n\u2022 The top card of each column is available for play\n \u2022 A packed sequence may be moved to another tableau column.\n\u2022 Spaces may be filled only with a King or a King-sequence.\n';
      objective += 'Draw \n \u2022 Three cards are drawn and moved to the waste. Unlimited\n';
      objective += 'Waste\n \u2022 The top card is available for play';
    } else if (currentGame == 'playCruel') {
      objective = 'Remove all cards to the foundation';

      objective += 'Foundation \n \u2022 An ace is initially dealt to each foundation pile.\n\u2022 A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Thus, the only card that could be played on a 6♦ would be a 7♦.\n\u2022 Once on the foundation, cards may not be moved back off.'

      objective += 'Foundation \n \u2022 Twelve tableau piles of four cards each, splayed downward. All cards are dealt face up.\n \u2022A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the same suit.Thus, the only card that could be played on a 10♣ would be a 9♣.\n \u2022 Cards on the tableau that are not under another card are available for play onto the foundation or any non-empty tableau pile.\n \u2022 Empty spaces in the tableau may not be filled.\n \u2022Only one card may moved at a time, never sequences.'

      objective += 'Redeal \n \u2022 You may pick up and redeal the cards on the tableau an unlimited number of times.\n \u2022 The redeal procedure begins by picking up all cards on the tableau. The cards from the tableau are collected, one column at a time, starting with the left-most column, picking up the cards in each column in top to bottom order. Then, without shuffling, the cards are dealt out again, starting with the first card picked up, and dealing the cards in the same order as they were picked up.'



    } else if (currentGame == 'playFreecell') {
      objective = 'Objective\n Move all the cards to the foundations.\n';
      objective += 'Foundations\n\u2022 Build up in suit from Ace to King.\n';
      objective += 'Tableau\n\u2022 Build down by alternating colors.\n\u2022 The top card of each column is available for play to a free cell, column or foundation\n \u2022 Only one card at a time can be moved.\n\u2022 Spaces may be filled with any card.\n';
    } else if (currentGame == 'playElevens') {
      objective = 'Objective\n Remove pairs of cards that add to eleven. You can also form a group three of Jack, Queen or King';
      objective += 'Tableau\n\u2022 Nine tableau piles of one card each. All cards are dealt face up.\n\u2022 No building is permitted on the tableau \n\u2022 Cards on the tableau are available for play.\n\u2022 Empty spaces in the tableau are automatically filled with a card from the stock. If the stock is empty, then empty spaces in the tableau may not be filled.'
    } else if (currentGame == 'playCanfield') {
      objective = 'Objective\n Move all the cards to the foundations.\n';
      objective += 'Foundations\n\u2022 Build up in suit from the starting rank and turning from King to Ace if needed.\n';
      objective += 'Tableau\n\u2022 Build down in alternating colors.\n\u2022 The top card of the draw pile, reserve and of each column is available for play\n \u2022 A packed sequence may be moved to another tableau column.\n\u2022 Spaces may be filled from the reserve, then any available card or sequence.n\n'
      objective += 'Draw \n \u2022 Three cards are drawn and moved to the waste. Unlimited\n';
      objective += 'Waste\n \u2022 The top card is available for play';
    } else if (currentGame == 'playMonteCarlo') {
      objective = 'Remove all cards to the foundation';
    } else if (currentGame == 'playYukon') {
      objective = 'Objective\n Move all the cards to the foundations.\n';
      objective += 'Foundations\n\u2022 Build up in suit from Ace to King.\n';
      objective += 'Tableau\n\u2022 Build down in alternating colors.\n\u2022 The top card of each column is available for play\n \u2022 A burried card may be moved if all cards on top of it are moved with it.\n\u2022 Spaces may be filled only with a King or a King-stack.\n';
    } else if (currentGame == 'playDiplomat') {
      objective = 'Objective\n Move all the cards to the foundations.\n';
      objective += 'Foundations\n\u2022 Build up in suit from Ace to King.\n';
      objective += 'Tableau\n\u2022 Build down by rank, regardless of suit.\n\u2022 The top card of each column is available for play.\n\u2022 Only one card at a time can be moved.\n\u2022 Spaces may be filled with any card.\n';
      objective += 'Draw \n \u2022 One card is turned up at a time. No redeals.\n';
      objective += 'Waste\n \u2022 The top card is available for play\n';
    } else if (currentGame == 'playScorpian') {
      objective = 'Objective\n Create four suits of 13 cards, King to Ace, in the Tableau.\n';
      objective += 'Foundations\n\u2022 Only filled when entire suit is complete.\n';
      objective += 'Tableau\n\u2022 Build down by suit.\n\u2022 The top card of each column is available for play\n \u2022 A burried card may be moved if all cards on top of it are moved with it.\n\u2022 Spaces may be filled only with a King or a King-sequence.n\\u2022 Kings can only move to empty spaces and nothing can be placed on an Ace.\n';
      objective += 'Draw \n \u2022 At any point, the three cards in the draw pile are dealt ontht efirst three columns of the tableau\n';
    } else if (currentGame == 'playCarpet') {
      objective = 'Objective\n Create four suits of 13 cards, King to Ace, in the Tableau.\n';
      objective += 'Foundations\n\u2022 Four foundation piles.\n\u2022 Any ace may be moved to any empty pile in the foundation.\n\u2022 A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Thus, the only card that could be played on a 6♣ would be a 7♣.\n\u2022 Once on the foundation, cards may not be moved back off.';
      objective += 'Tableau\n\u2022 Twenty reserve piles of one card each. All cards are dealt face up.\n\u2022 No building is permitted on the reserve\n\u2022 Cards on the reserve are available for play onto the foundation.\n\u2022 Empty spaces in the reserve may be filled by any card from the waste. They may not be filed from other reserve piles.\n\u2022 Only one card may moved at a time, never sequences.\n';
      objective += 'Stock and Waste \n \u2022 The remaining cards form the stock and there is one waste pile.\n \u2022 Each time you click on the stock, one card will be dealt from the stock to the waste. Only one pass through the stock is permitted.\n \u2022 The top card of the waste is available for play to any empty reserve pile or the foundation.\n';
    } else if (currentGame == 'playAlterations') {
      objective = 'Objective\n Move all cards to the foundation.\n';
      objective += 'Foundations\n\u2022 Eight foundation piles.n\u2022 Any ace may be moved to any empty pile in the foundation.n\u2022 A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Thus, the only card that could be played on a 10♦ would be a J♦. No pile may contain more than 13 cards.n\u2022 Once on the foundation, cards may not be moved back off.\n';
      objective += 'Tableau\n\u2022 Seven tableau piles of seven cards each, splayed downward. The even numbered cards in each pile are dealt face down, all others are face up.\n\u2022 A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the opposite color.Thus, the cards that could be played on 8♣ would be 7♥ or 7♦.\n\u2022 Cards on the tableau that are not under another card are available for play onto the foundation or any other tableau pile.\n\u2022 Empty spaces in the tableau may be filled by any card.\n\u2022 Groups of cards in sequence down may be moved from one tableau column to another if the cards are alternately red and black.\n';
      objective += 'Stock and Waste \n \u2022 The remaining cards form the stock and there is one waste pile.\n\u2022 Each time you click on the stock, one card will be dealt from the stock to the waste. Only one pass through the stock is permitted.\n\u2022 The top card of the waste is available for play to the tableau or the foundation.\n \u2022 Alternate version will deal three cards at a time, but with unlimited redeals';
    } else if (currentGame == 'playBeleaguered') {
      objective = 'Objective\n Move all cards to the foundation.\n';
      objective += 'Foundations\n\u2022 Four foundation piles.\n\u2022 An ace is initially dealt to each foundation pile.\n\u2022 A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Thus, the only card that could be played on a 5♠ would be a 6♠.\n\u2022 Once on the foundation, cards may not be moved back off.';
      objective += 'Tableau\n\u2022 Eight tableau piles of six cards each, splayed downward. All cards are dealt face up.\n\u2022 A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of any suit.Thus, the card that could be played on a six would be a five of any suit.\n\u2022 Cards on the tableau that are not under another card are available for play onto the foundation or any other tableau pile.\n\u2022 Empty spaces in the tableau may be filled by any card.\n';

    } else if (currentGame == 'playMilligan') {
      objective = 'Objective\n \u2022 Move all cards to the foundation.\n';
      objective += 'Foundations\n\u2022 Eight foundation piles.\n \u2022 Any ace may be moved to any empty pile in the foundation.\n \u2022 A card may be added onto a foundation pile if it is one higher than the old top card of the pile and of the same suit.Thus, the only card that could be played on a Q♥ would be a K♥. No pile may contain more than 13 cards.\n \u2022 Cards may be moved back off of the foundation.\n'
      objective += 'Tableau\n\u2022 Eight tableau piles of one card each, splayed downward. All cards are dealt face up.\n\u2022 A card may be added onto a tableau pile if it is one lower than the old top card of the pile and of the opposite color.Thus, the cards that could be played on 9♦ would be 8♠ or 8♣.\n\u2022 Cards on the tableau that are not under another card are available for play onto the foundation or any other tableau pile.\n\u2022 Empty spaces in the tableau may be filled by kings only.\n\u2022 Groups of cards in sequence down may be moved from one tableau column to another if the cards are alternately red and black.\n'
      objective += 'Stock \n \u2022 The remaining cards form the stock.\n \u2022 Each time you click on the stock, a card will be dealt on top of each tableau pile.\n \u2022 When the deck is exhausted, a pocket will appear. A single card or stack of cards can be temporarily stored in this pocket. This is called "waiving". If there is a stack of cards in the pocket then you can not take cards out individually. Only the complete sequence can be removed.\n'
    }





    var style = { fontFamily: 'Arial', fontSize: 36, color: '#000000', wordWrap: { width: 660 } };
    this.objectiveText = this.add.text(115, 360, objective, style);
    //this.objectiveText = this.add.bitmapText(125, 460, 'topaz', objective, 40).setOrigin(0,0).setTint(0x000000).setAlpha(1);	
    //this.objectiveText.setMaxWidth(650);

    if (currentGame == 'playYukon') {
      var text = 'Use free cells: ' + gameData[currentGameNum].preferance1;
      this.option1 = this.add.bitmapText(125, 1460, 'topaz', text, 60).setOrigin(0, 0).setTint(0x000000).setAlpha(1).setInteractive();
      this.option1.on('pointerdown', function() {
        if (gameData[currentGameNum].preferance1) {
          gameData[currentGameNum].preferance1 = false;
          var t = 'Use free cells: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        } else {
          gameData[currentGameNum].preferance1 = true;
          var t = 'Use free cells: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        }
      }, this)
    }


    if (currentGame == 'playMonteCarlo') {
      var text = 'Game Mode: ' + gameData[currentGameNum].preferance1;
      this.option1 = this.add.bitmapText(125, 1460, 'topaz', text, 60).setOrigin(0, 0).setTint(0x000000).setAlpha(1).setInteractive();
      this.option1.on('pointerdown', function() {
        if (gameData[currentGameNum].preferance1 == 'rank') {
          gameData[currentGameNum].preferance1 = 'thirteen';
          var t = 'Game Mode: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        } else if (gameData[currentGameNum].preferance1 == 'thirteen') {
          gameData[currentGameNum].preferance1 = 'suit';
          var t = 'Use free cells: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        } else {
          gameData[currentGameNum].preferance1 = 'rank';
          var t = 'Game Mode: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        }
      }, this)
    }

    if (currentGame == 'playCanfield') {
      var text = 'Deal Method: ' + gameData[currentGameNum].preferance1;
      this.option1 = this.add.bitmapText(125, 1460, 'topaz', text, 60).setOrigin(0, 0).setTint(0x000000).setAlpha(1).setInteractive();
      this.option1.on('pointerdown', function() {
        if (gameData[currentGameNum].preferance1 == 3) {
          gameData[currentGameNum].preferance1 = 321;
          var t = 'Deal Method: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        } else {
          gameData[currentGameNum].preferance1 = 3;
          var t = 'Deal Method: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        }
      }, this)
    }
    
    if (currentGame == 'playScorpian') {
      var text = 'Use Free Cell: ' + gameData[currentGameNum].preferance1;
      this.option1 = this.add.bitmapText(125, 1460, 'topaz', text, 60).setOrigin(0, 0).setTint(0x000000).setAlpha(1).setInteractive();
      this.option1.on('pointerdown', function() {
        if (gameData[currentGameNum].preferance1) {
          gameData[currentGameNum].preferance1 = false;
          var t = 'Use Free Cell: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        } else {
          gameData[currentGameNum].preferance1 = true;
          var t = 'Use Free Cell: ' + gameData[currentGameNum].preferance1;

          this.option1.setText(t)
          this.saveData();
        }
      }, this)
    }




    var exit = this.add.image(750, 335, 'icons', 2)


    //var exit = this.add.bitmapText(game.config.width / 2, game.config.height / 2 + 475, 'atari', 'EXIT', 40).setOrigin(.5).setTint(0x3e5e71);
    exit.setInteractive();
    exit.on('pointerdown', function() {

      // localStorage.setItem('ringTotal', JSON.stringify(this.ringTotal));
      this.scene.stop();
      this.scene.resume('UI');
      this.scene.resume(currentGame);
    }, this);
  }
  saveData() {
    localStorage.setItem('solitaireData', JSON.stringify(gameData));
  }
}