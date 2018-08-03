/*
 * Create a list that holds all of your cards
 */
var deck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

// Randomizes cards on board and updates card HTML
function updateCards() {
    deck = shuffle(deck);
    var index = 0;
    $.each($(".card i"), function(){
      $(this).attr("class", "fa " + deck[index]);
      index++;
    });
};

showingCard = false;
dealingCards = []
matchedCard = 0;
stars = 3;
numOfMoves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function onRestart() {


}

function displayCard(card) {
	if (!card.hasClass("open")) {
		card.toggleClass("open");
		card.toggleClass("show");
		showingCard = !showingCard;
		dealingCards.push(card);
	}
}

function hideCard(card) {
	dealingCards.forEach(function(card) {
		card.toggleClass("open");
		card.toggleClass("show");
	});
    dealingCards = [];
}

function matchedCard(card) {


}


function displayAndMatch(card) {
	displayCard(card)

	//also check here if game is finshed
	if (dealingCards[0].children().attr("class")===dealingCards[1].children().attr("class")) {

	}
	else {
		setTimeout(hideCard, 700);
	}
}


$( ".card" ).click(function() {

	//Display only if card is not being displayed and is not matched
	if (!$(this).hasClass("open") || $(this).hasClass("match")) {

		//If a card is already being shown then display both and check if they match and if they match then check if game done
		if(showingCard) {
			displayAndMatch( $(this) )

		}

		else {
			displayCard( $(this) )

		}
	}
});

$(updateCards);
