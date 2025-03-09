export class Player {
	constructor(userName, isDealer = false) {
		this.userName = userName;
		this.hand = [];
		this.score = 0;
		this.isDealer = isDealer;
	}

	recieveCard(card) {
		if (card) {
			this.hand.push(card);
			this.updateScore(card);
		}
	}

	updateScore(card) {
		if (card.value === "K" || card.value === "Q" || card.value === "J") {
			this.score += 10;
		} else if (card.value === "A") {
			if (this.score + 11 > 21) {
				this.score += 1;
			} else {
				this.score += 11;
			}
		} else {
			this.score += parseInt(card.value);
		}
	}

	dealerLogic(card) {
		while (this.score < 17) {
			this.recieveCard(card);
		}
	}

	resetHandandScore() {
		this.hand = [];
		this.score = 0;
	}
}
