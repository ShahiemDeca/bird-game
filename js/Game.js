import AssetLoader from "./AssetLoader.js";
import Pipes from "./Pipes.js";
import Bird from "./Bird.js";
import Score from "./Score.js";

export class Game {
	isCollided = false;

	isDrawing = false;
	lastDrawTimestamp = 0;
	drawRadius = 10;
	drawColor = "#000000";
	isConnected = false;
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		this.setCanvasFullScreen();

		this.pipes = new Pipes(this.canvas);
		this.pipes.addPipe();

		this.loadedAssets = null;
		this.assets = new AssetLoader(
			["./images/bg.png", "./images/bird.png", "./images/score-background.png"],
			(images) => (this.loadedAssets = images)
		);

		this.bird = new Bird();
		this.score = new Score();

		this.lastTimestamp = performance.now();
	}

	setupCanvasEvents() {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;

		if (!window.AudioContext) alert("Web Audio API not supported");
		else {
			var audioContext = new AudioContext();

			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					var microphone = audioContext.createMediaStreamSource(stream);
					var scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

					microphone.connect(scriptProcessor);
					scriptProcessor.connect(audioContext.destination);

					scriptProcessor.onaudioprocess = (event) => {
						this.isConnected = true;
						var rms = Math.sqrt(
							event.inputBuffer.getChannelData(0).reduce((sum, val) => sum + val * val, 0) /
								event.inputBuffer.length
						);
						var threshold = 0.1;
						if (rms > threshold) {
							console.log("Clap detected!");

							this.bird.isFlying = true;
						} else {
							console.log(1);
							this.bird.isFlying = false;
						}
					};
				})
				.catch((err) => console.error("Error accessing microphone:", err));

			function calculateRMS(data) {
				return Math.sqrt(data.reduce((sum, val) => sum + val * val, 0) / data.length);
			}
		}
	}

	start() {
		this.setupCanvasEvents();
		this.gameLoop();
	}

	setCanvasFullScreen() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	gameLoop() {
		const currentTimestamp = performance.now();
		const deltaTime = (currentTimestamp - this.lastTimestamp) / 1000; // Convert to seconds
		this.lastTimestamp = currentTimestamp;

		this.update(deltaTime);
		this.draw();

		requestAnimationFrame(() => this.gameLoop());
	}

	update(deltaTime) {
		if (!this.isConnected) return;
		this.bird.update();
		this.pipes.update(deltaTime);

		if (this.bird.image) {
			const collided = this.pipes.checkCollision(
				this.bird.image.x,
				this.bird.y,
				this.bird.frameWidth,
				this.bird.frameHeight
			);

			if (collided && !this.isCollided) {
				this.score.upScore();
				this.isCollided = true;
			}

			if (!collided) {
				this.isCollided = false;
			}
		}
	}

	drawBackground(image) {
		for (let x = 0; x < this.canvas.width; x += image.width) {
			for (let y = 0; y < this.canvas.height; y += image.height) {
				this.ctx.drawImage(image, x, 0, image.width, this.canvas.height);
			}
		}
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.loadedAssets) {
			const bgImage = this.loadedAssets["./images/bg.png"];
			this.drawBackground(bgImage);

			this.pipes.render(this.ctx);

			this.bird.setImage(this.loadedAssets["./images/bird.png"]);
			this.bird.render(this.ctx);

			this.score.setImage(this.loadedAssets["./images/score-background.png"]);
			this.score.render(this.ctx);
		}
	}
}
