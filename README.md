#Solitary by Chris Blystone

This is a game consisting of HTML, CSS, and JavaScript.

1. Upon opening the game the user should see the board set up before them. 
2. The browser should load with four squares to the left of the remaining deck in order to place the Ace’s when obtained.
3. Then next to that there will be a deck face down.   
4. Below that the user will see seven columns of cards working across the board.
5. The game will start with one face up and then fill in next to that with six cards face down.  Repeating turning up the face card on the second row.  Working its way across the board until all seven columns have a card facing up.
6.  Then when they press the button to draw the deck at the top of the board will flip 1 card and allow the user to drag and drop it if that card can fit on one of the corresponding locations.
7.  The logic will need to do the following:
	*Deal out the deck in the order of solitary, by placing one card in the first column, 2 cards in the second column with the last card face up.  3 cards in the third column, 4 cards in the fourth column, five cards in the fifth, six cards in the sixth and seven cards in the seventh column leaving the last card face up.
	*The logic will also need to allow for the user to drag and drop a card on another card of a different suit and in order of hierarchy.
	*The logic will need to determine if the card being dragged is of a different colored suit and is lower than the card it is being placed on top of.
	*The logic will also need to keep track of the remainder of the deck and allow the user to reshuffle the deck once. 
	*The win/loss logic will be determined if the user can finish after twice through the deck.  