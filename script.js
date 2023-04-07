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
    this.cardsInPlay = [];
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
    const dealtCards = this.cards.splice(0, numberOfCards);
    this.cardsInPlay = this.cardsInPlay.concat(dealtCards);
    return dealtCards;
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
initialize();
startBtn.addEventListener('click', function(){
  resetGame();
  initialize();
  flipCards();
});
flipBtn.addEventListener('click', function(){
  flipCards();
})
function flipCards(){
  const currentCard = deck.deal(1)[0]; // Deal a single card from the deck
  if (currentCard) { // Check if there are still cards in the deck
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', currentCard.imageUrl);
    deckEl.innerHTML = ''; // Remove any existing card image
    deckEl.appendChild(imageEl); // Add the new card image
  } else {
    alert('There are no more cards in the deck!');
  }
  
}
const deckCount = document.getElementById('deck-count');
deckCount.textContent = `Cards left in deck: ${deck.numberOfCards}`;


function initialize(){
  deck = new Deck();
  deck.shuffle();
  setPiles();
  setDeck();
}

function setDeck(){
  const imageEl = document.createElement('img');
  imageEl.setAttribute('src', 'deck/images/backs/blue.svg')
  deckEl.appendChild(imageEl);
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
function allowDrop(ev){
  ev.preventDefault();
}
function drag(ev){
  ev.dataTransfer.setData('text', ev.target.id);
}
function drop(ev){
  ev.preventDefault();
  let.data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
