  /*----- constants -----*/
 const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
 const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
 
 //Creation of the card class.
 class Card{
  constructor(suit, value){
    this.suit = suit;
    this.value = value;
    this. faceUp = false;
  }
  getImgSrc(){
    //need to obtain the file for the image.
  }
  flip(){
    //this will cause the card to flip over or cards.
  }
 }
 //Creation of the Deck class
class Deck{
  constructor(){
    this.cards = [];
    for (let suit of suits){
      for (let value of values){
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuff();
  }
  shuffle(){
    for (let i = this.cards.length -1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  draw(){
    if (this.cards.length > 0){
      return this.cards.pop();
    }else{
      return null;
    }
  }
}




  /*----- state variables -----*/
//let deck = getDeck();
  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/

  // function getDeck(){
  //   let deck = new Array();
  //   for(let i = 0; i < suits.length; i++){
  //       for(let j = 0; j< values.length; j++){
  //           let card = {Value: values[j], Suit: suits[i]};
  //           deck.push(card);
  //       }
  //   }
  //   return deck;
  // }
  // function shuffle(deck){
  //   for(let i = deck.length; i > 0; i--){
  //       let j = Math.floor(Math.random() * (i + 1));
  //       [deck[i], deck[j]] = [deck[j], deck[i]];
  //   }
  //   return deck;
  // }

  // console.log(shuffle(deck));
  


