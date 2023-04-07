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


function initialize(){
  deck = new Deck();
  deck.shuffle();
  setPiles2();
}
function setPiles(){
  //1 We want it to deal one card face to pile one itterating through 
  //adding 1 for each succeeding row.
  let imageEl = document.createElement('img')
  pile1El.appendChild(imageEl);
  let imageEl2 = document.createElement('img')
  imageEl2.setAttribute('src', deck.cards[1].imageUrl);
  pile2El.appendChild(imageEl2);
  let imageEl3 = document.createElement('img')
  imageEl3.setAttribute('src', deck.cards[2].imageUrl);
  pile3El.appendChild(imageEl3);
  let imageEl4 = document.createElement('img')
  imageEl4.setAttribute('src', deck.cards[3].imageUrl);
  pile4El.appendChild(imageEl4);
  let imageEl5 = document.createElement('img')
  imageEl5.setAttribute('src', deck.cards[4].imageUrl);
  pile5El.appendChild(imageEl5);
  let imageEl6 = document.createElement('img')
  imageEl6.setAttribute('src', deck.cards[5].imageUrl);
  pile6El.appendChild(imageEl6);
  let imageEl7 = document.createElement('img')
  imageEl7.setAttribute('src', deck.cards[6].imageUrl);
  pile7El.appendChild(imageEl7);
  
}
function setPiles2(){
  const piles = document.querySelectorAll('column');
  for(let i =0; i < piles.length; i++){
    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', deck.cards[i].imageUrl);
    piles[i].appendChild(imageEl);
  }
}
// const deck = new Deck();
// deck.shuffle();
console.log(deck);
initialize();