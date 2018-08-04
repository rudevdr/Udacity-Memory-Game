/*
 * Create a list that holds all of your cards
 */
var deck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

function init(){
	cardsArrange();

let timerRunning = false;
timeInSeconds = 0;
var dealingCards = []
numOfMoves = 0;
}


function cardsArrange() {

	deck = shuffle(deck);
	var index = 0;
	$.each($(".card i"), function(){
		$(this).attr("class", "fa " + deck[index]);
		index++;
	});
};

document.querySelector(".win-dialog").style.visibility = "hidden";
document.querySelector(".deck").style.opacity = "1";

enableClicking = true;
showingCard = false;
matchedCard = 0;
stars = 3;

function timerManage() {
	if (timerRunning) {
		//To Update Moves Counter
		timeInSeconds++;
		$(".timer").text(timeInSeconds);
		setTimeout(timerManage, 1000);
	}
	else {
		timeInSeconds = timeInSeconds;
		$(".timer").text(timeInSeconds);

	}
}

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

function displayCard(card) {
	if (!card.hasClass("open")) {
		card.toggleClass("open");
		card.toggleClass("show");
		dealingCards.push(card);
	}
}

function displayAndMatch(card) {
	displayCard(card)
	showingCard = false;
	moveAndRating();
	//
	//also check here if game is finshed
	if (dealingCards[0].children().attr("class") === dealingCards[1].children().attr("class")) {
		matchedCard++;
		dealingCards = [];
	}
	else {
		setTimeout(notMatchedCard, 600);
	}

	checkWon();
}

var onRestart = function() {
	//Resetting the timer
	timerRunning = false;
	timeInSeconds = 0;
	$(".timer").text(timeInSeconds);

	//Resetting the number of moves
	numOfMoves = 0;
	$(".moves").text(numOfMoves);

	//Resetting the number of Rating
	$(".fa-star-o").attr("class", "fa fa-star");

	//Hide all cards
	showingCard = false;
	$.each($(".card"), function(){
		$(this).removeClass("open");
		$(this).removeClass("show");
	});
	dealingCards = []

	//Making matched cards 0
	matchedCard = 0

	enableClicking = true;
	document.querySelector(".win-dialog").style.visibility = "hidden";
	document.querySelector(".deck").style.opacity = "1";

	document.querySelector(".timer").style.display = "inline"
	document.querySelector(".timer-unit").style.display = "inline"

	//Shuffling the cards on Reset
	cardsArrange();
}

function notMatchedCard(card) {
	dealingCards.forEach(function(card) {
		card.toggleClass("open");
		card.toggleClass("show");
	});

	dealingCards = [];
}

function moveAndRating() {

	//To Update Moves Counter
	numOfMoves++;
	$(".moves").text(numOfMoves);

	//To Update Rating Counter
	if (numOfMoves === 14 || numOfMoves === 20 ) {
		let stars = $(".fa-star");
		$(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
	}
}



function checkWon() {
	if (matchedCard === 1){
		timerRunning = false;

		document.querySelector(".win-dialog").style.visibility = "inherit";
		enableClicking = false;
		document.querySelector(".deck").style.opacity = "0.2";

		$("#win-time").text(timeInSeconds);

		if (numOfMoves <= 14) {
			star = "3"
		}
		else if (numOfMoves <= 20 ) {
			star = "2"
		}
		else {
			star = "1"
		}

		$("#win-stars").text(star);

		$("#win-repeat").click(onRestart);

		document.querySelector(".timer").style.display = "none"
		document.querySelector(".timer-unit").style.display = "none"
	}
};




var onClick = function() {
	if (enableClicking){
		//Display only if card is not being displayed and is not matched
		if (!$(this).hasClass("open") || $(this).hasClass("match")) {

			//If a card is already being shown then display both and check if they match and if they match then check if game done
			if(showingCard && dealingCards.length === 1 ) {
				displayAndMatch( $(this) )
			}
			else if (!showingCard && dealingCards.length < 1) {
				showingCard = true;
				displayCard( $(this) )
			}
		}
		if (!timerRunning) {
			timerRunning = true;
			setTimeout(timerManage, 1000);
		}

	}
};

$(".card").click(onClick);
$(".restart").click(onRestart);

$(init);
