import {Deck} from "./deck.js";
import {Player} from "./players.js";
import {Button} from "./buttons.js";
import {PixiRenderer} from "./pixiRenderer.js";

const deck1 = new Deck();
const renderer = new PixiRenderer();

const player1 = new Player("Vaso", false);
const dealer = new Player("Dealer", true);
let playerCardCoordinateX = 0;
let dealerCardCoordinateX = 0;
let playerHandIndex = player1.hand.length - 1;
let dealerHandIndex = dealer.hand.length - 1;

const startGame = document.getElementById("start");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");

if (renderer.gameSarted === false) {
	hit.setAttribute("disabled", true);
	stand.setAttribute("disabled", true);
}

/* Betting Chips */
// const chipContainer = new PIXI.Container();
// this.app.stage.addChild(chipContainer);

/* Start Game Button */
startGame.addEventListener("click", () => {
	renderer.gameSarted = true;

	startGame.setAttribute("disabled", true);
	hit.removeAttribute("disabled");
	stand.removeAttribute("disabled");

	playerCardCoordinateX = 0;
	dealerCardCoordinateX = 0;

	playerHandIndex = -1;
	dealerHandIndex = -1;

	renderer.removeAllScoreText();
	player1.hand = [];
	dealer.hand = [];
	player1.score = 0;
	dealer.score = 0;

	// Draw 2 cards for player
	playerHandIndex++;
	player1.recieveCard(deck1.draw());
	renderer.removeCardFromDeck();
	renderer.addCardFaceUp(
		player1.hand[playerHandIndex].image,
		window.innerWidth / 2 + playerCardCoordinateX,
		window.innerHeight - 128 * 2
	);

	playerCardCoordinateX += 24;
	playerHandIndex++;
	player1.recieveCard(deck1.draw());
	renderer.removeCardFromDeck();
	renderer.addCardFaceUp(
		player1.hand[playerHandIndex].image,
		window.innerWidth / 2 + playerCardCoordinateX,
		window.innerHeight - 128 * 2
	);

	// Draw 2 cards for dealer
	dealerHandIndex++;
	dealer.recieveCard(deck1.draw());
	renderer.removeCardFromDeck();
	renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);

	dealerCardCoordinateX += 24;
	// dealerHandIndex++;
	// dealer.recieveCard(deck1.draw());
	renderer.removeCardFromDeck();
	// renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);
	renderer.addCardFaceUp("Card_Back", window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);

	renderer.updatePlayerScore(player1.score, window.innerWidth / 2, window.innerHeight - 128 * 2.4);
	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
	if (player1.score === 21) {
		renderer.updateWinAndLoseMessage("Player got Black-Jack!", window.innerWidth / 2, window.innerHeight / 2);
		console.log("Player got Black-Jack!");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
			startGame.removeAttribute("disabled");
			hit.setAttribute("disabled", true);
			stand.setAttribute("disabled", true);
		}, 5000);
	}
	console.log(player1);
	console.log(dealer);
	// console.log(renderer.cardsInPlay);
	console.log("dealerHandIndex on start game is: ", dealerHandIndex);
});

/* Hit Button */
hit.addEventListener("click", () => {
	player1.recieveCard(deck1.draw());
	playerCardCoordinateX += 24;
	playerHandIndex++;
	// console.log(playerHandIndex);
	renderer.addCardFaceUp(
		player1.hand[playerHandIndex].image,
		window.innerWidth / 2 + playerCardCoordinateX,
		window.innerHeight - 128 * 2
	);
	renderer.removeCardFromDeck();
	if (player1.score > 21) {
		renderer.updateWinAndLoseMessage("Player Lost", window.innerWidth / 2, window.innerHeight / 2);
		console.log("Player Lost");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
			startGame.removeAttribute("disabled");
			hit.setAttribute("disabled", true);
			stand.setAttribute("disabled", true);
		}, 5000);
	}
	renderer.updatePlayerScore(player1.score, window.innerWidth / 2, window.innerHeight - 128 * 2.4);
	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
});

/* Stand Button */
stand.addEventListener("click", () => {
	dealerCardCoordinateX = 0;
	while (dealer.score < 17) {
		dealerHandIndex++;
		dealerCardCoordinateX += 24;
		dealer.recieveCard(deck1.draw());
		renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);
		renderer.removeCardFromDeck();
	}

	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
	console.log(dealer);
	if ((player1.score > dealer.score && player1.score <= 21) || dealer.score > 21) {
		renderer.updateWinAndLoseMessage("Player Wins", window.innerWidth / 2, window.innerHeight / 2);
		console.log("Player Wins");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
			startGame.removeAttribute("disabled");
			hit.setAttribute("disabled", true);
			stand.setAttribute("disabled", true);
		}, 5000);
	} else if ((player1.score < dealer.score && dealer.score <= 21) || player1.score > 21) {
		renderer.updateWinAndLoseMessage("Dealer Wins", window.innerWidth / 2, window.innerHeight / 2);
		console.log("Dealer Wins");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
			startGame.removeAttribute("disabled");
			hit.setAttribute("disabled", true);
			stand.setAttribute("disabled", true);
		}, 5000);
	} else {
		renderer.updateWinAndLoseMessage("It's a tie", window.innerWidth / 2, window.innerHeight / 2);
		console.log("It's a tie");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
			startGame.removeAttribute("disabled");
			hit.setAttribute("disabled", true);
			stand.setAttribute("disabled", true);
		}, 5000);
	}
});

await renderer.init();

renderer.createDeck();

// renderer.addChips();
