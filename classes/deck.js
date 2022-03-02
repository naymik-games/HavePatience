class Card {
  constructor(suit, rank, value, index, color, suitNum, rankShort) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.index = index;
	this.color = color;
	this.suitNum = suitNum;
	this.rankShort = rankShort;
  }
  
}
class Stack {
	constructor() {
    this.stack = [];
    

  }
  addToStack(card){
	  this.stack.push(card);
  }
}
class Deck {
  constructor(aces) {
    this.cards = [];
    this.aces = aces;

  }
  createDeck() {

    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
    let suitNums = [0,1,2,3];
	let ranksShort = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    let f = 0;
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
		if(suits[i] == 'clubs' || suits[i] == 'spades'){
			var color = 'black';
		} else {
			var color = 'red';
		}
        this.cards.push(new Card(suits[i], ranks[j], values[j], f, color, suitNums[i],ranksShort[j]));
        f++;
      }
    }
  }
  acesHigh() {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].rank == 'ace') {
        this.cards[i].value = 14;
      }
    }
  }
  euchreDeck() {
    let suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let suitNums = [0,1,2,3]
    let ranks = ['9', '10', 'jack', 'queen', 'king', 'ace'];


    let values = [19, 10, 11, 12, 13, 14];


    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {

        this.cards.push(new Card(suits[i], ranks[j], values[j], this.getEuchreIndex(suits[i], values[j])));

      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
  getEuchreIndex(suit, value) {
    if (suit == 'clubs') {
      switch (value) {
        case 9:
          return 8;
          break;
        case 10:
          return 9;
          break;
        case 11:
          return 10;
          break;
        case 12:
          return 11;
          break;
        case 13:
          return 12;
          break;
        case 14:
          return 0;
          break;
      }
    } else if (suit == 'diamonds') {
      switch (value) {
        case 9:
          return 21;
          break;
        case 10:
          return 22;
          break;
        case 11:
          return 23;
          break;
        case 12:
          return 24;
          break;
        case 13:
          return 25;
          break;
        case 14:
          return 13;
          break;
      }
    } else if (suit == 'hearts') {
      switch (value) {
        case 9:
          return 34;
          break;
        case 10:
          return 35;
          break;
        case 11:
          return 36;
          break;
        case 12:
          return 37;
          break;
        case 13:
          return 38;
          break;
        case 14:
          return 26;
          break;
      }
    } else if (suit == 'spades') {
      switch (value) {
        case 9:
          return 47;
          break;
        case 10:
          return 48;
          break;
        case 11:
          return 49;
          break;
        case 12:
          return 50;
          break;
        case 13:
          return 51;
          break;
        case 14:
          return 39;
          break;
      }
    }
  }
}
class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }
}

class Board {
  constructor() {
    this.cardsInMiddle = [];
    this.players = [];
  }
  start(playerOneName, playerTwoName) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
    let d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    this.players[0].playerCards = d.cards.slice(0, 26);
    this.players[1].playerCards = d.cards.slice(26, 52);
  }
}