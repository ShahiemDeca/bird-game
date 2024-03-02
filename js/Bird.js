export default class Bird {
	currentFrame = 0;
	x = 200;
	y = 100;

	constructor() {
		this.numFrames = 20;
		this.velocity = 0; // Initial velocity
		this.gravity = 0.2; // Gravity value
		this.jumpStrength = -8; // Strength of the jump

		this.setupEventListeners();
	}

	setImage(image) {
		this.image = image;
		this.frameWidth = this.image.width / this.numFrames;
		this.frameHeight = this.image.height;
	}

	setupEventListeners() {
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
	}

	handleKeyDown(event) {
		if (event.code === "Space") {
			this.isFlying = true;
		}
	}

	handleKeyUp(event) {
		if (event.code === "Space") {
			this.isFlying = false;
		}
	}

	render(ctx) {
		const frameWidth = this.image.width / this.numFrames;
		const frameHeight = this.image.height;
		ctx.drawImage(
			this.image,
			this.currentFrame * frameWidth,
			0,
			frameWidth,
			frameHeight,
			this.x,
			this.y,
			frameWidth,
			frameHeight
		);
	}

	update() {
		if (!this.image) return;
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.isFlying) {
			this.velocity = this.jumpStrength;
		}

		// Ensure the bird stays within the canvas boundaries (adjust as needed)
		if (this.y > window.innerHeight - this.image.height) {
			this.y = window.innerHeight - this.image.height;
			this.velocity = 0;
		}

		// Animation frame
		this.currentFrame += 1;

		// Reset the current frame to 0 if it exceeds the number of frames
		if (this.currentFrame >= this.numFrames) this.currentFrame = 0;
	}
}
