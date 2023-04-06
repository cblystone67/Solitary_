  /*----- constants -----*/

  let deck = [];
  
  function createDeck(){
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    const values = ["A", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "J", "Q", "K"];
    deck = [];
    for(let suit of suits){
      for(let value of values){
        const card = document.createElement('div');
        card.classList.add('card', suit);
        card.dataset.suit = suit;
        card.dataset.value = value;
        const img = document.createElement('img');
        img.src = `deck/images/${suit}/${suit}-${value}.svg`;
        card.append(img);
        deck.push(card);
      }
    }
    return deck;
}

deck = createDeck();




function shuffle(deck){
  for (let i = deck.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
function dealCards(){
  const columns = document.querySelectorAll('.column');
  const cards = shuffle(createDeck());
  let cardIndex = 0;
  const numCols = 7;
  for (let i = 0; i < numCols; i++){
    for (let j = i; j < numCols; j++){
      const card = cards.splice(cardIndex, 1)[0];
      columns[j].appendChild(card);
      if (j === i){
        card.classList.add('face-up');
      }
      cardIndex++;
    }
  }
}
function handleCardClick(event) {
  const card = event.currentTarget;
  const column = card.parentNode;
  const topCard = column.lastElementChild;
  if (card === topCard) {
    card.classList.toggle('selected');
  } else if (topCard && topCard.classList.contains('face-up')) {
    const isValidMove = checkValidMove(card, topCard);
    if (isValidMove) {
      moveCard(card, topCard);
    }
  }
}
function checkValidMove(card, topCard) {
  const cardValue = Number(card.dataset.value);
  const topCardValue = Number(topCard.dataset.value);
  const cardColor = card.dataset.suit === 'hearts' || card.dataset.suit === 'diamonds' ? 'red' : 'black';
  const topCardColor = topCard.dataset.suit === 'hearts' || topCard.dataset.suit === 'diamonds' ? 'red' : 'black';
  const isOppositeColor = cardColor !== topCardColor;
  const isOneLess = cardValue === topCardValue - 1;
  return isOppositeColor && isOneLess;
}
function moveCard(card, topCard) {
  const fromColumn = card.parentNode;
  const toColumn = topCard.parentNode;
  const siblings = card.nextElementSibling ? Array.from(card.nextElementSibling.parentNode.children) : [];
  const cardsToMove = siblings.slice(siblings.indexOf(card));
  const placeholder = document.createElement('div');
  placeholder.classList.add('card', 'placeholder');
  toColumn.insertBefore(placeholder, topCard);
  fromColumn.removeChild(card);
  toColumn.insertBefore(card, placeholder);
  toColumn.removeChild(placeholder);
  cardsToMove.forEach(c => toColumn.appendChild(c));
  updateGameStatus();
}
function handleDropZoneDragEnter(event) {
  event.preventDefault();
  const dropZone = event.currentTarget;
  dropZone.classList.add('hovered');
}

function handleDropZoneDragLeave(event) {
  const dropZone = event.currentTarget;
  dropZone.classList.remove('hovered');
}

function handleDropZoneDragOver(event) {
  event.preventDefault();
}

function handleCardDragStart(event) {
  event.dataTransfer.setData('text/plain', event.currentTarget.id);
  event.currentTarget.classList.add('dragged');
}

function handleCardDragEnd(event) {
  event.currentTarget.classList.remove('dragged');
}
function handleDropZoneDrop(event) {
  event.preventDefault();
  const dropZone = event.currentTarget;
  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);

  if (dropZone.classList.contains('tableau') && card.parentElement.classList.contains('tableau')) {
    const tableauCards = Array.from(card.parentElement.children);
    const cardIndex = tableauCards.indexOf(card);
    const validMove = isTableauMoveValid(tableauCards.slice(cardIndex));
    if (validMove) {
      dropZone.appendChild(card);
    }
  } else if (dropZone.classList.contains('foundation') && card.parentElement.classList.contains('tableau')) {
    const foundationSuit = dropZone.classList[1];
    const foundationCards = getFoundationCards(foundationSuit);
    const validMove = isFoundationMoveValid(foundationCards, card);
    if (validMove) {
      dropZone.appendChild(card);
      removeCardFromTableau(card);
    }
  }
}
 function renderGame(deck){
  shuffle(deck);
  dealCards();
 } 
  
