  /*----- constants -----*/
 const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
 const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
 
 
 
  /*----- state variables -----*/
let deck = getDeck();
  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/

  function getDeck(){
    let deck = new Array();
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j< values.length; j++){
            let card = {Value: values[j], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
  }
  console.log(deck);
  


