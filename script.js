/*----- constants -----*/

const deckEl = document.getElementById('deck');
const foundationEl = document.getElementById('foundation');
const pile1El = document.getElementById('pile1');
const pile2El = document.getElementById('pile2');
const pile3El = document.getElementById('pile3');
const pile4El = document.getElementById('pile4');
const pile5El = document.getElementById('pile5');
const pile6El = document.getElementById('pile6');
const pile7El = document.getElementById('pile7');
const startBtn = document.getElementById('start-game');
const flipBtn = document.getElementById('flip-cards');
const piles = [pile1El, pile2El, pile3El, pile4El, pile5El, pile6El, pile7El];



const Suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const Values = ['A','K','Q','J','r10','r09','r08','r07','r06','r05','r04','r03','r02'];
let deck;

class Deck{
  constructor(cards = freshDeck()){
    this.cards = cards;
  }
  //create a getter so we don't have to type cards.length over and over.
  get numberOfCards(){
    return this.cards.length;
  }
  shuffle(){
    for (let i = this.numberOfCards -1; i > 0; i--){
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
  deal(numberOfCards){
    return this.cards.splice(0, numberOfCards);
  }
}
class Card{
  constructor(suit, value){
    this.suit = suit;
    this.value = value;
    this.imageUrl = `deck/images/${suit}/${suit}-${value}.svg`
  }
}
function freshDeck(){
  return Suits.flatMap(suit => {
    return Values.map(value => {
      return new Card(suit, value);
    });
  });
}
startBtn.addEventListener('click', function(){
  resetGame();
  initialize();
});
function initialize(){
  deck = new Deck();
  deck.shuffle();
  setPiles();
}
function setPiles(){
  for (let i = 0; i < piles.length; i++){
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', deck.cards[i+1].imageUrl);
    piles[i].appendChild(imageEl);
  }
}

function resetGame(){
  deckEl.innerHTML = '';
  //foundationEl.innerHTML = '';
  for (let i = 1; i <= 7; i++){
    const pileEl = document.getElementById(`pile${i}`);
    pileEl.innerHTML = '';
  }
}
//const deck = new Deck();
 //deck.shuffle();
//console.log(deck);
initialize();