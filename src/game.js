import {Deck} from "./deck.js";
import {Player} from "./players.js";
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
startGame.addEventListener("click", () => {
	playerCardCoordinateX = 0;
	dealerCardCoordinateX = 0;

	playerHandIndex = -1;
	dealerHandIndex = -1;

	renderer.removeAllScoreText();
	renderer.removeCardFromDeck();
	player1.hand = [];
	dealer.hand = [];
	player1.score = 0;
	dealer.score = 0;
	/* 	for (let i = 0; i < 2; i++) {
		player1.recieveCard(deck1.draw());
		renderer.addCardFaceUp(player1.hand[i].image, window.innerWidth / 2 - (i * 96) / 4, window.innerHeight - 128 * 2);
		
		dealer.recieveCard(deck1.draw());
		renderer.addCardFaceUp(dealer.hand[i].image, window.innerWidth / 2 - (i * 96) / 4, 128 / 2);
		renderer.removeCardFromDeck();
		} */
	playerHandIndex++;
	player1.recieveCard(deck1.draw());
	renderer.addCardFaceUp(
		player1.hand[playerHandIndex].image,
		window.innerWidth / 2 + playerCardCoordinateX,
		window.innerHeight - 128 * 2
	);

	playerCardCoordinateX += 24;
	playerHandIndex++;
	player1.recieveCard(deck1.draw());
	renderer.addCardFaceUp(
		player1.hand[playerHandIndex].image,
		window.innerWidth / 2 + playerCardCoordinateX,
		window.innerHeight - 128 * 2
	);

	dealerHandIndex++;
	dealer.recieveCard(deck1.draw());
	renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);

	dealerCardCoordinateX += 24;
	dealerHandIndex++;
	dealer.recieveCard(deck1.draw());
	renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);

	renderer.updatePlayerScore(player1.score, window.innerWidth / 2, window.innerHeight - 128 * 2.4);
	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
	if (player1.score === 21) {
		console.log("Player got Black-Jack!");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
		}, 2000);
	}
	console.log(player1);
	console.log(dealer);
	console.log(renderer.cardsInPlay);
});

const hit = document.getElementById("hit");
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
		console.log("Player Bust");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
		}, 2000);
	} else if (player1.score === 21) {
		console.log("Player Won");
	}
	renderer.updatePlayerScore(player1.score, window.innerWidth / 2, window.innerHeight - 128 * 2.4);
	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
});

const stand = document.getElementById("stand");
stand.addEventListener("click", () => {
	dealerCardCoordinateX += 24;
	console.log(dealerHandIndex);
	dealerHandIndex++;
	console.log(dealerHandIndex);
	dealer.dealerLogic(deck1.draw());
	// renderer.addCardFaceUp(dealer.hand[dealerHandIndex].image, window.innerWidth / 2 + dealerCardCoordinateX, 128 / 2);

	if (dealer.score > 21) {
		console.log("Dealer Bust");
	} else if (dealer.score === 21) {
		console.log("Dealers Won");
	}
	renderer.updatePlayerScore(player1.score, window.innerWidth / 2, window.innerHeight - 128 * 2.4);
	renderer.updateDealerScore(dealer.score, window.innerWidth / 2, 128 * 1.6);
	console.log(dealer);
	if ((player1.score > dealer.score && player1.score <= 21) || dealer.score > 21) {
		console.log("Player Wins");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
		}, 2000);
	} else if ((player1.score < dealer.score && dealer.score <= 21) || player1.score > 21) {
		console.log("Dealer Wins");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
		}, 2000);
	} else {
		console.log("It's a tie");
		setTimeout(() => {
			renderer.removePlayedCards();
			renderer.removeAllScoreText();
		}, 2000);
	}
});

await renderer.init();

renderer.createDeck();
