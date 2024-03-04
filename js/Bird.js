export default class Bird {

	initialX = 20;
	initialY = 100;

	moveSpeed = 150;
	currentFrame = 0;

	isFlipped = false;
	isVisible = true;
	
	numberOfFrames = 20;

	velocity = 0;
	gravity = 0.4;
	jumpStrength = -5;

	constructor() {
		this.x = this.initialX;
		this.y = this.initialY;
		this.setupEventListeners();
	}

	reset() {
		this.currentFrame = 0;
		this.x = this.initialX;
		this.y = this.initialY;
		this.isFlipped = false;
		this.isVisible = true;
	}

	toggleVisibility() {
		this.isVisible = !this.isVisible;
	}

	setImage(image) {
		this.image = image;
		this.frameWidth = this.image.width / this.numberOfFrames;
		this.frameHeight = this.image.height;
	}

	setupEventListeners() {
		// Add touch event listeners for mobile
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
		window.addEventListener("keyup", this.handleKeyUp.bind(this));

		// Add touch event listeners for tap on mobile
		window.addEventListener("touchstart", this.handleTapStart.bind(this));
		window.addEventListener("touchend", this.handleTapEnd.bind(this));
	}

	handleKeyDown(event) {
		if (event.code !== "Space") return;
		this.isFlying = true;
	}

	handleKeyUp(event) {
		if (event.code !== "Space") return;
		this.isFlying = false;
	}

	handleTapStart(event) {
		event.preventDefault();

		this.isFlying = true;
	}

	handleTapEnd() {
		this.isFlying = false;
	}

	render(ctx) {
		if (!this.isVisible) return; // Skip rendering if not visible

		const frameWidth = this.image.width / this.numberOfFrames;
		const frameHeight = this.image.height;

		const scaleX = this.isFlipped ? -1 : 1;

		ctx.save();
		ctx.scale(scaleX, 1);

		ctx.drawImage(
			this.image,
			this.currentFrame * frameWidth,
			0,
			frameWidth,
			frameHeight,
			this.isFlipped ? -this.x - frameWidth : this.x,
			this.y,
			frameWidth,
			frameHeight
		);

		ctx.restore();
	}

	setFlip() {
		this.isFlipped = !this.isFlipped;
	}

	update(deltaTime) {
		if (!this.isVisible || !this.image) return;

		this.velocity += this.gravity;

		this.x += (this.isFlipped ? -1 : 1) * this.moveSpeed * deltaTime; // Change direction when the sprite is flipped
		this.y += this.velocity;

		if (this.isFlying) this.velocity = this.jumpStrength;

		// Stop the bird from going off of the canvas
		if (this.y > window.innerHeight - this.image.height) {
			this.y = window.innerHeight - this.image.height;
			this.velocity = 0;
		}

		this.currentFrame += 1;

		// Reset the current frame to 0 if it exceeds the number of frames
		if (this.currentFrame >= this.numberOfFrames) this.currentFrame = 0;
	}
}
