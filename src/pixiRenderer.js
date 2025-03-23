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
		this.playerScoreText = null;
		this.dealerScoreText = null;
		this.winAndLoseMessage = null;
		this.cardsInPlay = [];
		this.bet = null;
	}

	async init() {
		await this.app.init({
			width: window.innerWidth,
			height: window.innerHeight,
			background: 0x228b22,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
		});

		document.getElementById("game").appendChild(this.app.canvas);
		await this.assetLoader.init();

		window.addEventListener("resize", this.onResize.bind(this));
	}

	onResize() {
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
	}

	addCardFaceUp(cardName, x = 0, y = 0) {
		const cardTexture = this.assetLoader.textures[`${cardName}`];
		// console.log(cardTexture);
		if (!cardTexture) {
			console.error(`❌ ${cardName} texture not found`);
		}
		this.card = new PIXI.Sprite(cardTexture);
		this.card.anchor.set(0.5, 0);
		this.card.filters = [cardShadowFilter];
		// console.log(card);

		this.card.position.set(x, y);

		this.app.stage.addChild(this.card);

		this.cardsInPlay.push(this.card);
	}

	removePlayedCards() {
		for (const card of this.cardsInPlay) {
			this.app.stage.removeChild(card);
		}
		this.cardsInPlay = [];
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

		deckContainer.position.set(window.innerWidth - 96 * 2, 128 / 2);
		// console.log(deckContainer.children.length);
	}

	removeCardFromDeck() {
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

	addChips() {
		const chipContainer = new PIXI.Container();
		this.app.stage.addChild(chipContainer);

		// White Chip +1
		const whiteChipTexture = this.assetLoader.textures["Chips"];
		whiteChipTexture.frame = {x: 0, y: 48, width: 46, height: 48};
		const textureWhite = new PIXI.Texture(whiteChipTexture);

		const whiteChipSprite = new PIXI.Sprite(textureWhite);
		whiteChipSprite.width = 46;
		whiteChipSprite.height = 48;
		whiteChipSprite.position.set(0, 0);

		const whiteChipValue = new PIXI.Text({text: "+1"});
		whiteChipValue.position.set(0, -16);

		// Red Chip +5
		const redChipTexture = this.assetLoader.textures["Chips"];
		redChipTexture.frame = {x: 0, y: 0, width: 46, height: 48};
		const textureRed = new PIXI.Texture(redChipTexture);

		const redChipSprite = new PIXI.Sprite(textureRed);
		redChipSprite.width = 46;
		redChipSprite.height = 48;
		redChipSprite.position.set(46, 0);

		const redChipValue = new PIXI.Text({text: "+5"});
		redChipValue.position.set(46, -16);

		// Blue Chip +10
		const blueChipTexture = this.assetLoader.textures["Chips"];
		blueChipTexture.frame = {x: 184, y: 0, width: 46, height: 48};
		const textureBlue = new PIXI.Texture(blueChipTexture);

		const blueChipSprite = new PIXI.Sprite(textureBlue);
		blueChipSprite.width = 46;
		blueChipSprite.height = 48;
		blueChipSprite.position.set(84, 0);

		const blueChipValue = new PIXI.Text({text: "+10"});
		blueChipValue.position.set(84, -16);

		// Green Chip +25
		const greenChipTexture = this.assetLoader.textures["Chips"];
		greenChipTexture.frame = {x: 0, y: 96, width: 46, height: 48};
		const textureGreen = new PIXI.Texture(greenChipTexture);

		const greenChipSprite = new PIXI.Sprite(textureGreen);
		greenChipSprite.width = 46;
		greenChipSprite.height = 48;
		greenChipSprite.position.set(138, 0);

		const greenChipValue = new PIXI.Text({text: "+25"});
		greenChipValue.position.set(138, -16);

		// Black Chip +100
		const blackChipTexture = this.assetLoader.textures["Chips"];
		blackChipTexture.frame = {x: 0, y: 144, width: 46, height: 48};
		const textureBlack = new PIXI.Texture(blackChipTexture);

		const blackChipSprite = new PIXI.Sprite(textureBlack);
		blackChipSprite.width = 46;
		blackChipSprite.height = 48;
		blackChipSprite.position.set(184, 0);

		blackChipSprite.eventMode = "static";
		blackChipSprite.interactive = true;
		blackChipSprite.cursor = "pointer";

		blackChipSprite.on("pointerdown", () => {
			console.log("+100 chips added");
		});

		const blackChipValue = new PIXI.Text({text: "+100"});
		blackChipValue.position.set(184, -16);

		// Add event listeners to chips and animate them

		// Add chips to container

		chipContainer.addChild(whiteChipSprite);
		chipContainer.addChild(redChipSprite);
		chipContainer.addChild(blueChipSprite);
		chipContainer.addChild(greenChipSprite);
		chipContainer.addChild(blackChipSprite);

		chipContainer.addChild(whiteChipValue);
		chipContainer.addChild(redChipValue);
		chipContainer.addChild(blueChipValue);
		chipContainer.addChild(greenChipValue);
		chipContainer.addChild(blackChipValue);

		chipContainer.position.set(window.innerWidth / 2, window.innerHeight - 200);
		chipContainer.pivot.set(92, 0);
	}

	updateWinAndLoseMessage(message, x = 0, y = 0) {
		this.winAndLoseMessage = new PIXI.Text({text: `${message}`});
		this.winAndLoseMessage.anchor.set(0.5, 0.5);
		this.winAndLoseMessage.position.set(x, y);
		this.app.stage.addChild(this.winAndLoseMessage);
	}

	updatePlayerScore(score, x = 0, y = 0) {
		if (this.playerScoreText) {
			this.app.stage.removeChild(this.playerScoreText);
		}
		this.playerScoreText = new PIXI.Text({text: `${score}`});
		this.playerScoreText.position.set(x, y);
		this.app.stage.addChild(this.playerScoreText);
	}

	updateDealerScore(score, x = 0, y = 0) {
		if (this.dealerScoreText) {
			this.app.stage.removeChild(this.dealerScoreText);
		}
		this.dealerScoreText = new PIXI.Text({text: `${score}`});
		this.dealerScoreText.position.set(x, y);
		this.app.stage.addChild(this.dealerScoreText);
	}

	removeAllScoreText() {
		if (this.playerScoreText) {
			this.app.stage.removeChild(this.playerScoreText);
			this.playerScoreText = null;
		}
		if (this.dealerScoreText) {
			this.app.stage.removeChild(this.dealerScoreText);
			this.dealerScoreText = null;
		}
		if (this.winAndLoseMessage) {
			this.app.stage.removeChild(this.winAndLoseMessage);
			this.winAndLoseMessage = null;
		}
	}
}
