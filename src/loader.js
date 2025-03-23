import * as PIXI from "pixi.js";

export class AssetLoader {
	constructor() {
		this.textures = {};
	}

	async init() {
		console.log("assets started loading");
		await this.loadTextures();
		console.log("assets finished loading");
	}

	async loadTextures() {
		this.textures = {
			// Chips SpriteSheet
			Chips: await PIXI.Assets.load("./sprites/chips.png"),

			// Card Back
			Card_Back: await PIXI.Assets.load("./sprites/card_back.png"),

			// Hearts
			A_of_Hearts: await PIXI.Assets.load("./sprites/Hearts/A.png"),
			K_of_Hearts: await PIXI.Assets.load("./sprites/Hearts/K.png"),
			Q_of_Hearts: await PIXI.Assets.load("./sprites/Hearts/Q.png"),
			J_of_Hearts: await PIXI.Assets.load("./sprites/Hearts/J.png"),
			"10_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/10.png"),
			"9_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/9.png"),
			"8_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/8.png"),
			"7_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/7.png"),
			"6_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/6.png"),
			"5_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/5.png"),
			"4_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/4.png"),
			"3_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/3.png"),
			"2_of_Hearts": await PIXI.Assets.load("./sprites/Hearts/2.png"),

			// Diamonds
			A_of_Diamonds: await PIXI.Assets.load("./sprites/Diamonds/A.png"),
			K_of_Diamonds: await PIXI.Assets.load("./sprites/Diamonds/K.png"),
			Q_of_Diamonds: await PIXI.Assets.load("./sprites/Diamonds/Q.png"),
			J_of_Diamonds: await PIXI.Assets.load("./sprites/Diamonds/J.png"),
			"10_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/10.png"),
			"9_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/9.png"),
			"8_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/8.png"),
			"7_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/7.png"),
			"6_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/6.png"),
			"5_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/5.png"),
			"4_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/4.png"),
			"3_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/3.png"),
			"2_of_Diamonds": await PIXI.Assets.load("./sprites/Diamonds/2.png"),

			// Clubs
			A_of_Clubs: await PIXI.Assets.load("./sprites/Clubs/A.png"),
			K_of_Clubs: await PIXI.Assets.load("./sprites/Clubs/K.png"),
			Q_of_Clubs: await PIXI.Assets.load("./sprites/Clubs/Q.png"),
			J_of_Clubs: await PIXI.Assets.load("./sprites/Clubs/J.png"),
			"10_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/10.png"),
			"9_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/9.png"),
			"8_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/8.png"),
			"7_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/7.png"),
			"6_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/6.png"),
			"5_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/5.png"),
			"4_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/4.png"),
			"3_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/3.png"),
			"2_of_Clubs": await PIXI.Assets.load("./sprites/Clubs/2.png"),

			// Spades
			A_of_Spades: await PIXI.Assets.load("./sprites/Spades/A.png"),
			K_of_Spades: await PIXI.Assets.load("./sprites/Spades/K.png"),
			Q_of_Spades: await PIXI.Assets.load("./sprites/Spades/Q.png"),
			J_of_Spades: await PIXI.Assets.load("./sprites/Spades/J.png"),
			"10_of_Spades": await PIXI.Assets.load("./sprites/Spades/10.png"),
			"9_of_Spades": await PIXI.Assets.load("./sprites/Spades/9.png"),
			"8_of_Spades": await PIXI.Assets.load("./sprites/Spades/8.png"),
			"7_of_Spades": await PIXI.Assets.load("./sprites/Spades/7.png"),
			"6_of_Spades": await PIXI.Assets.load("./sprites/Spades/6.png"),
			"5_of_Spades": await PIXI.Assets.load("./sprites/Spades/5.png"),
			"4_of_Spades": await PIXI.Assets.load("./sprites/Spades/4.png"),
			"3_of_Spades": await PIXI.Assets.load("./sprites/Spades/3.png"),
			"2_of_Spades": await PIXI.Assets.load("./sprites/Spades/2.png"),
		};
	}
}
