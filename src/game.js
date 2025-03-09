import {Deck} from "./deck.js";
import {Player} from "./players.js";
import {PixiRenderer} from "./pixiRenderer.js";

const deck1 = new Deck();
const renderer = new PixiRenderer();

const player1 = new Player("Vaso", false);
const dealer = new Player("Dealer", true);

const startGame = document.getElementById("start");
startGame.addEventListener("click", () => {
	player1.resetHandandScore();
	dealer.resetHandandScore();
	for (let i = 0; i < 2; i++) {
		player1.recieveCard(deck1.draw());
		renderer.addCardFaceUp(player1.hand[i].image, 400 + (i * 96) / 4, 400);

		dealer.recieveCard(deck1.draw());
		renderer.removeCard();
	}
	console.log(player1);
	console.log(dealer);
});

const hit = document.getElementById("hit");
hit.addEventListener("click", () => {
	player1.recieveCard(deck1.draw());
	renderer.removeCard();
	if (player1.score > 21) {
		console.log("Player Bust");
	} else if (player1.score === 21) {
		console.log("Player got Black Jack");
	}
	console.log(player1);
});

const stand = document.getElementById("stand");
stand.addEventListener("click", () => {
	dealer.dealerLogic(deck1.draw());
	if (dealer.score > 21) {
		console.log("Dealer Bust");
	} else if (dealer.score === 21) {
		console.log("Dealers got Black Jack");
	}
	console.log(dealer);
	if ((player1.score > dealer.score && player1.score <= 21) || dealer.score > 21) {
		console.log("Player Wins");
	} else if ((player1.score < dealer.score && dealer.score <= 21) || player1.score > 21) {
		console.log("Dealer Wins");
	} else {
		console.log("It's a tie");
	}
});

await renderer.init();

renderer.createDeck();
