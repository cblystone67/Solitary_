const deckEl = document.getElementById('deck');
const foundationEl = document.getElementById('foundation');
const startBtn = document.getElementById('start-game');
const flipBtn = document.getElementById('flip-cards');

const piles = [];
for(let i = 1; i <= 7; i++){
  piles.push(document.getElementById(`pile${i}`));
}

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
    
  }
  getImageUrl(){
    return `deck/images/${this.suit}/${this.suit}-${this.value}.svg`
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
  const currentCard = deck.deal(1)[0];
  if(currentCard){
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', currentCard.getImageUrl());
    deckEl.innerHTML = '';
    deckEl.appendChild(imageEl);
    updateDeckCount();
  }else{
    alert('There are no more cards in the deck!');
  }
}
function updateDeckCount(){
  const deckCount = document.getElementById('deck-count');
  deckCount.textContent = `Cards left in deck: ${deck.numberOfCards}`;
}


function initialize(){
  deck = new Deck();
  deck.shuffle();
  setPiles(deck);
  setDeck();
  updateDeckCount();
}

function setDeck(){
  const imageEl = document.createElement('img');
  imageEl.setAttribute('src', 'deck/images/backs/blue.svg')
  deckEl.appendChild(imageEl);
}

function setPiles(deck){
  for (let i = 0; i < piles.length; i++){
    const card = deck.deal(1)[0];
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', card.getImageUrl());
    piles[i].appendChild(imageEl);
  }
}

function resetGame(){
  deckEl.innerHTML = '';
  foundationEl.innerHTML = '';
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
  // ev.target.appendChild(document.getElementById(data));
  // let data = ev.dataTransfer.getData("text");
}
