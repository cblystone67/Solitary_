# Solitary by Chris Blystone

This is a game consisting of HTML, CSS, and JavaScript.

1. Create the game board layout in HTML: The game board consists of seven columns with the first column having one card, the second column having two cards, and so on until the last column has seven cards. Each column is represented by a div element with a unique id. Additionally, create four foundation piles and four empty piles for the tableau in the HTML.

2. Style the game board using CSS: Use CSS to style the game board layout. You can use CSS to make the board look like an actual Solitaire game, including card graphics and background.

3. Create card objects in JavaScript: Create a card object that has a value and a suit property. You can use an array to store these card objects and shuffle them for the initial setup.

4. Initialize the game: Write a function in JavaScript to shuffle the deck, deal the cards onto the tableau and set up the foundation piles. You can use a 2D array to represent the tableau and an array to represent the foundation piles.

5. Add interactivity to the game: Write JavaScript functions to handle user actions such as moving cards, selecting cards, and placing cards on foundation piles. You will also need to write functions to check for winning conditions and end the game when necessary.

6. Update the game board in real-time using Live Wire: Use Live Wire to broadcast the changes made by the JavaScript functions to the browser, which will update the game board in real-time.

7. Add sound effects and animations: Finally, add sound effects and animations to make the game more engaging and enjoyable for players.
# Psudo Code
*Upon opening the game the user should see the board set up before them. 
* The browser should load with four squares to the left of the remaining deck in order to place the Ace’s when obtained.
* Then next to that there will be a deck face down.   
* Below that the user will see seven columns of cards working across the board.
* The game will start with one face up and then fill in next to that with six cards face down.  Repeating turning up the face card on the second row.  Working its way across the board until all seven columns have a card facing up.
* Then when they press the button to draw the deck at the top of the board will flip 1 card and allow the user to drag and drop it if that card can fit on one of the corresponding locations.
 #The logic will need to do the following:
 # Plaing Rules.
	* Deal out the deck in the order of solitary, by placing one card in the first column, 2 cards in the second column with the last card face up.  3 cards in the third column, 4 cards in the fourth column, five cards in the fifth, six cards in the sixth and seven cards in the seventh column leaving the last card face up.
	* The logic will also need to allow for the user to drag and drop a card on another card of a different suit and in order of hierarchy.
	* The logic will need to determine if the card being dragged is of a different colored suit and is lower than the card it is being placed on top of.
	* The logic will also need to keep track of the remainder of the deck and allow the user to reshuffle the deck once. 
	* The win/loss logic will be determined if the user can finish after twice through the deck.  