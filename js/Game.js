import AssetLoader from "./AssetLoader.js";
import Pipes from "./Pipes.js";
import Bird from "./Bird.js";
import Score from "./Score.js";

export class Game {
	isGameStarted = false;
	isDeath = false;
	loadedAssets = null;
	increaseDifficulty = false;
	difficultyIncrement = 20;

	constructor(canvas) {
		this.canvas = canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.ctx = canvas.getContext("2d");

		this.bird = new Bird();
		this.score = new Score();
		this.pipes = new Pipes(this.canvas);

		this.assets = new AssetLoader(
			["./images/bg.png", "./images/bird.png", "./images/play.png"],
			(images) => (this.loadedAssets = images)
		);

		this.lastTimestamp = performance.now();
	}

	setupCanvasEvents() {
		this.canvas.addEventListener("click", this.handleCanvasClick.bind(this));

		// Experimental: Use the microphone to control the bird (Might not work in all browsers)
		window.AudioContext = window.AudioContext || window.webkitAudioContext;

		if (!window.AudioContext) {
			alert("Web Audio API not supported");
			return;
		}

		const audioContext = new AudioContext();
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const microphone = audioContext.createMediaStreamSource(stream);
				const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

				microphone.connect(scriptProcessor);
				scriptProcessor.connect(audioContext.destination);
				scriptProcessor.onaudioprocess = (event) => {
					const rms = Math.sqrt(
						event.inputBuffer.getChannelData(0).reduce((sum, value) => sum + value * value, 0) /
							event.inputBuffer.length
					);

					const threshold = 0.1;
					this.bird.isFlying = rms > threshold;
				};
			})
			.catch((error) => console.error("Error accessing microphone:", error));
	}

	handleCanvasClick(event) {
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		// Check if the click is within the boundaries of the play button
		const playButtonSize = 80;
		const playButtonX = (window.innerWidth - playButtonSize) / 2;
		const playButtonY = (window.innerHeight - playButtonSize) / 2;

		if (
			mouseX >= playButtonX &&
			mouseX <= playButtonX + playButtonSize &&
			mouseY >= playButtonY &&
			mouseY <= playButtonY + playButtonSize
		) {
			this.isGameStarted = true;
		}
	}

	showPlayButton() {
		this.ctx.drawImage(
			this.loadedAssets["./images/play.png"],
			(window.innerWidth - 80) / 2,
			(window.innerHeight - 80) / 2,
			80,
			80
		);
	}

	resetGame() {
		this.isGameStarted = false;
		this.isDeath = false;

		this.bird.reset();
		this.score.reset();
		this.pipes.reset();
	}

	start() {
		this.setupCanvasEvents();
		this.gameLoop();
	}

	gameLoop() {
		const currentTimestamp = performance.now();
		const deltaTime = (currentTimestamp - this.lastTimestamp) / 1000;

		this.update(deltaTime);
		this.draw();

		this.lastTimestamp = currentTimestamp;

		requestAnimationFrame(() => this.gameLoop());
	}

	update(deltaTime) {
		if (!this.isGameStarted) return;

		this.bird.update(deltaTime);
		this.pipes.update(deltaTime);

		const collision = this.pipes.checkCollision(
			this.bird.x,
			this.bird.y,
			this.bird.frameWidth,
			this.bird.frameHeight
		);

		if (collision) {
			if (collision.part === "gap") {
				this.score.increase();
				this.pipes.addPipe();
				this.bird.setFlip();
			}

			if (collision.part === "top" || collision.part === "bottom") {
				if (!this.isDeath) {
					this.bird.toggleVisibility();
					this.isDeath = true;

					this.resetGame();
				}
			}
		}

		if (this.increaseDifficulty && this.score.score % this.difficultyIncrement === 0) {
			this.bird.gravity += 0.1;
			this.increaseDifficulty = false;
		}
	}

	drawBackground() {
		const image = this.loadedAssets["./images/bg.png"];
		for (let x = 0; x < this.canvas.width; x += image.width) {
			for (let y = 0; y < this.canvas.height; y += image.height) {
				this.ctx.drawImage(image, x, 0, image.width, this.canvas.height);
			}
		}
	}

	draw() {
		if (!this.loadedAssets) return;

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawBackground();

		this.pipes.render(this.ctx);

		this.bird.setImage(this.loadedAssets["./images/bird.png"]);
		this.bird.render(this.ctx);

		this.score.render(this.ctx);

		// Show play button if the game is not started
		if (!this.isGameStarted) this.showPlayButton();
	}
}
