class Card {
	constructor(suit, value) {
		this.suit = suit;
		this.value = value;
		this.image = `${value}_of_${suit}`;
	}
}

export class Deck {
	constructor() {
		this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
		this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
		this.cards = [];
		this.reset();
	}

	reset() {
		this.cards = [];

		this.suits.forEach((suit) => {
			this.values.forEach((value) => {
				this.cards.push(new Card(suit, value));
			});
		});

		this.shuffle();
	}

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}

	draw() {
		if (this.cards.length > 0) {
			return this.cards.pop();
		} else {
			console.log("No cards left in the deck");
			return null;
		}
	}
}
