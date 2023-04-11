const deckEl = document.getElementById('deck');
const foundationEl = document.getElementById('foundation');
const startBtn = document.getElementById('start-game');
const flipBtn = document.getElementById('flip-cards');
const deckCount = document.getElementById('deck-count');

const piles = [];
for(let i = 1; i <= 7; i++){
  piles.push(document.getElementById(`pile${i}`));
}


const Suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const Values = ['A', 'r02', 'r03', 'r04', 'r05', 'r06', 'r07', 'r08', 'r09', 'r10', 'J', 'Q', 'K']

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
  getDetail(){
    let color = (this.suit === 'hearts' || this.suit === 'diamonds') ? 'red' : 'black';
    return `${this.suit}-${this.value}-${color}`
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
    let j = 0;
    while(j < i + 1){
      const card = deck.deal(1)[0];
      console.log(card.suit);
      const imageEl = document.createElement('img');
      imageEl.classList.add('class.suit')
      console.log(imageEl)
      imageEl.setAttribute('value', card.getDetail());
      imageEl.setAttribute('src', card.getImageUrl());
      imageEl.classList.add('card');
      piles[i].appendChild(imageEl);
      j++;
    }
    console.log(piles[i]);
    //piles[i] is a div element because it is a div element we can acces the children.  First child allows us to target the first element in the selected div.  We can then set the img attribute of that first child.  We can set the source image to the value that we stored inside the image element in the while loop.
    piles[i].firstChild.setAttribute('src', piles[i].firstChild.getAttribute('value'));
    
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

const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', handleClick);
});

let selectedCard = null;

 function handleClick(event){
   const clickedItem = event.target;
   console.log(clickedItem.getAttribute('value'))
   // Check if a card has already been selected
   if(selectedCard) {
     // Replace the first selected card with the second one
     const temp = clickedItem.getAttribute('src');
     console.log(selectedCard.value)
     clickedItem.setAttribute('src', selectedCard.getAttribute('src'));
     selectedCard.setAttribute('src', temp);
    
     // Clear the selection
     selectedCard.classList.remove('highlight');
     selectedCard = null;
   } else {
     // Select the card
     clickedItem.classList.add('highlight');
     selectedCard = clickedItem;
   }
}