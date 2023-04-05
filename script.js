  /*----- constants -----*/
 const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
 const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
 
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
  //The dragstart event is fired when the user starts dragging an element or text selection.
  card.addEventListener('dragstart', dragStart);
  //The dragend event is fired when a drag operation is being ended (by releasing a mouse button or hitting the escape key).
  card.addEventListener('dragend', dragEnd)
  //The dragover event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
  card.addEventListener('dragover', dragOver);
  //The dragenter event is fired when a dragged element or text selection enters a valid drop target.
  card.addEventListener('dragenter', dragEnter);
  //The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
  card.addEventListener('dragleave', dragLeave);
  //The drop event is fired when an element or text selection is dropped on a valid drop target.
  card.addEventListener('drop', dragDrop);

});
let dragCard = null;
//The dragStart function will be called when a card is first picked up 
//and will set the data transfer object for the drag operation.

  /*----- state variables -----*/
//let deck = getDeck();
  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/
