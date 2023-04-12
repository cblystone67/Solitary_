const deckEl = document.getElementById('deck');
const foundationEl = document.getElementById('foundation');
const startBtn = document.getElementById('start-game');
const flipBtn = document.getElementById('flip-cards');
const deckCount = document.getElementById('deck-count');

const piles = [];
for(let i = 1; i <= 7; i++){
  piles.push(document.getElementById(`${i}`));
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
    // piles[i].firstChild.setAttribute('src', piles[i].firstChild.getAttribute('value'));
  }
}

function resetGame(){
  deckEl.innerHTML = '';
  console.log(deckEl.getAttribute('value'))
  //foundationEl.innerHTML = '';
  console.log(foundationEl.getAttribute('value'))
  for (let i = 1; i <= 7; i++){
    const pileEl = document.getElementById(`${i}`);
    pileEl.innerHTML = '';
  }
}

//This attaches an eventlistener to every card.
const cards = document.querySelectorAll('.card');
console.log(cards)
cards.forEach(card => {
  card.addEventListener('click', handleClick);
  console.log(card)
});

let selectedCard = null;

function handleClick(event){
   const clickedItem = event.target;
   console.log('you clicked a ', clickedItem.nodeName);
   
   if(selectedCard) {
    // There's already a card selected, so the click we're handling is for the place where the card is to be dropped
    console.log('Selected card')
    console.log(selectedCard.getAttribute('value'))

    if(clickedItem.classList.contains('fdn')) {
      console.log('you clicked a foundation pile');

      // Get the suit of the selected card
      const selectedCardValue = selectedCard.getAttribute('value');
      const selectedSuit = selectedCardValue.split('-')[0]

      // Get the suit of the pile we clicked to drop the card
      const targetCard = clickedItem.parentNode;
      const targetCardValue = targetCard.id;
      const targetSuit = targetCardValue.split('-')[0]

      console.log('selected suit = ', selectedSuit, 'target suit = ', targetSuit);
      if(selectedSuit != targetSuit) {
        // Say something like an error message
      } else {
        // Now we know that the card is being dropped in the right foundation pile, so we need to decide whether it's OK to drop the card there, and then actually do it

        // Check whether the card we're dropping (selectedCard) is one greater than the card we're dropping it on top of

        // Extract selectedCard's value (split again)
        // Look up the extracted value in Values array, and this is the position of the selected card (like "A")
        // Extract targetCard's current card value (split again)
        // Look up the target card's value in Values (position in this array)
        // Position of selectedCard should differ from position of targetCard by 1

        // If so, it's OK to drop the card here, so set the <img> tag
        // Otherwise, refuse to drop the card, and just deselect the selectedCard
      }
    }

    selectedCard.classList.remove('highlight');
    selectedCard = null;
   } else {
     // Select the card
     clickedItem.classList.add('highlight');
     selectedCard = clickedItem;
   }

   // Processed the action, so now check whether it's time to end the game
   if(gameOver()) {
    alert('you won!')
   }
}

function gameOver() {
  return false; // Replace this line with game logic

  // Check the foundation piles
  // Check whether the deck is now empty
}

function checkWin() {
  const foundationPiles = [];
  let allCardsInFoundation = 0;
  for (let i = 0; i < 4; i++) {
    const foundationPile = document.getElementById(`foundation-${Suits[i]}`);
    foundationPiles.push(foundationPile);
    allCardsInFoundation += foundationPile.children.length;
  }

  if (allCardsInFoundation !== 52) return false;

  for (let i = 0; i < foundationPiles.length; i++) {
    const pile = foundationPiles[i];
    const cards = pile.children;

    if (cards.length !== 13) return false;

    for (let j = 0; j < cards.length; j++) {
      const cardValue = parseInt(cards[j].getAttribute('value').split('-')[1]);
      if (j + 1 !== cardValue) return false;
    }
  }

  return true;
}
