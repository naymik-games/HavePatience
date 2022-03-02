Global object with game options
var gameOptions =
{
// flipping speed in milliseconds
flipSpeed: 200,
// flipping zoom ratio. Simulates the card to be raised when flipping
flipZoom: 1.2
}

function
preload() {
// Flipping card sprite sheet
this.load.spritesheet(
'flipping-card', 'assets/cardflip.png',
{frameWidth: 167, frameHeight: 243});
}

function
create() {
let {width, height} = this.sys.game.canvas;

// adding the flipping card and make it respose on mouse click.
this.flipCard = this.add.sprite(width / 2, height / 2, 'flipping-card');
this.flipCard.setInteractive();

// Custom property to tell us if the card is flipping. It's not, at the
// moment.
this.flipCard.isFlipping = false;

// waiting for player input
this.flipCard.on('pointerdown', (pointer) => {
// if the card is not flipping...
if (!this.flipCard.isFlipping) {
// it's flipping now!
this.flipCard.isFlipping = true;
// start the first of the two flipping animations
this.flipTween.play();
}
});

// First tween: We raise and flip the card
this.flipTween = this.tweens.create({
targets: this.flipCard,
scaleY: gameOptions.flipZoom,
scaleX: 0,
duration: gameOptions.flipSpeed / 2,
ease: 'Linear'
});

this.flipCard.frameNr = 0; // Start with backside
this.flipTween.on('complete', () => {
this.flipCard.setTexture('flipping-card', 1 - this.flipCard.frameNr);
this.flipCard.frameNr = 1 - this.flipCard.frameNr;
this.flipBackTween.play();
});

// Second tween: we complete the flip and lower the card
this.flipBackTween = this.tweens.create({
targets: this.flipCard,
scaleY: 1,
scaleX: 1,
duration: gameOptions.flipSpeed / 2,
ease: 'Linear'
});

// Once the card has been placed down on the table, we can flip it again
this.flipBackTween.on('complete', () => {
this.flipCard.isFlipping = false;
});
}

var config = {
type: Phaser.AUTO,
width: 800,
height: 600,
scene: {preload: preload, create: create},
};

var game = new Phaser.Game(config);






if (card.type == 'card' || card.type == 'empty' || card.type == 'found') {
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
          } else if (this.selection.card.type == 'found') {
            if (this.checkSequence(this.selection.card, card)) {
              this.moveToStack(this.selection.card, card);

            }
            this.clearSelection();
          }
          //this.selection.value + 1 == card.value && this.selection.color != card.color
          //

        }