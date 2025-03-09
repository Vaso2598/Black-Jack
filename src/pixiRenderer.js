import * as PIXI from "pixi.js";
import {AssetLoader} from "./loader.js";
import {DropShadowFilter} from "pixi-filters";

const cardShadowFilter = new DropShadowFilter({
	blur: 3,
	quality: 8,
});

const deckShadowFilter = new DropShadowFilter({
	blur: 3,
	offsetX: 6,
	offsetY: -6,
});

export class PixiRenderer {
	constructor() {
		this.app = new PIXI.Application();
		this.assetLoader = new AssetLoader();
		this.gameSarted = false;
	}

	async init() {
		await this.app.init({
			width: 800,
			height: 600,
			background: 0x228b22,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
		});

		document.getElementById("game").appendChild(this.app.canvas);
		await this.assetLoader.init();
	}

	addCardFaceUp(cardName, x = 0, y = 0) {
		const cardTexture = this.assetLoader.textures[`${cardName}`];
		// console.log(cardTexture);
		if (!cardTexture) {
			console.error(`❌ ${cardName} texture not found`);
		}
		const card = new PIXI.Sprite(cardTexture);
		card.filters = [cardShadowFilter];
		console.log(card);

		card.position.set(x, y);

		this.app.stage.addChild(card);
	}

	createDeck() {
		const deckContainer = new PIXI.Container();
		this.app.stage.addChild(deckContainer);
		const cardBackforDeck = this.assetLoader.textures["Card_Back"];
		const cardBackArray = [];

		for (let i = 0; i < 52; i++) {
			const sprite = new PIXI.Sprite(cardBackforDeck);
			sprite.position.set(0 + i * 0.5, 0 - i * 0.5);
			sprite.filters = [deckShadowFilter];
			cardBackArray.push(sprite);
			deckContainer.addChild(sprite);
		}

		deckContainer.position.set(750 - 96, 50);
		console.log(deckContainer.children.length);
	}

	removeCard() {
		const deckContainer = this.app.stage.children.find((child) => child instanceof PIXI.Container);

		if (deckContainer && deckContainer.children.length > 0) {
			const topCard = deckContainer.children[deckContainer.children.length - 1];
			deckContainer.removeChild(topCard);

			console.log(`Card removed. Remaining cards: ${deckContainer.children.length}`);
		} else {
			console.error("No cards left in the deck to remove");
			return null;
		}
	}
}
