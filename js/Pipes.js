export default class Pipes {

	pipeWidth = 50;
	currentSide = 1; // Start with the right side
	minGap = 150;
	maxGap = 250;

	constructor(canvas) {
		this.canvas = canvas;

		this.currentPipe = {
			x: 0,
			yTop: 0,
			heightTop: 0,
			yBottom: 0,
			heightBottom: 0,
		};

		this.addPipe();
	}

	reset() {
		this.currentSide = 1;
		this.addPipe();
	}

	addPipe() {
		const x = this.currentSide === -1 ? 20 : this.canvas.width - this.pipeWidth + 20;
		const gap = (Math.random() * (this.maxGap - this.minGap) + this.minGap) / 2;
		const height = this.canvas.height / 2;

		this.currentPipe = {
			x: x,
			yTop: 0,
			yBottom: height + gap,
			heightTop: height - gap,
			heightBottom: height - gap,
			gap,
		};

		this.currentSide *= -1; // Toggle side for the next pipe
	}

	render(ctx) {

		const x = this.currentPipe.x;
		const borderWidthBrown = 20;
		const borderWidthBlack = 4;
		const alignToLeft = 5;

		ctx.fillStyle = "#cc9900";

		// Bottom pipe (middle brown part)
		ctx.fillRect(
			x - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom,
			this.pipeWidth,
			this.currentPipe.heightBottom
		);

		ctx.fillStyle = "#a6731a";

		// Bottom pipe (left brown part)
		ctx.fillRect(
			x - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom - borderWidthBrown,
			borderWidthBrown,
			this.currentPipe.heightBottom + borderWidthBrown
		);

		// Bottom pipe (right brown part)
		ctx.fillRect(
			x + this.pipeWidth - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom - borderWidthBrown,
			borderWidthBrown,
			this.currentPipe.heightBottom + borderWidthBrown
		);

		ctx.fillStyle = "#000000";

		// Bottom pipe (left black border)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - alignToLeft,
			this.currentPipe.yBottom - borderWidthBlack,
			borderWidthBlack,
			this.currentPipe.heightBottom + borderWidthBlack
		);

		ctx.fillStyle = "#ccff00";

		// Bottom pipe (middle green part)
		ctx.fillRect(
			x - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom - 30,
			this.pipeWidth,
			30
		);

		ctx.fillStyle = "#a6bf1a";

		// Bottom pipe (left green part)
		ctx.fillRect(
			x - borderWidthBrown - borderWidthBlack - alignToLeft - 10,
			this.currentPipe.yBottom - 30,
			borderWidthBrown + 10,
			30
		);

		// Bottom pipe (right green part)
		ctx.fillRect(
			x + this.pipeWidth - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom - 30,
			borderWidthBrown + 10,
			30
		);

		ctx.fillStyle = "#000000";

		// Bottom pipe (black border top)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.yBottom - 30,
			85,
			3
		);

		// Bottom pipe (black border bottom)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.yBottom,
			85,
			3
		);

		// Bottom pipe (black border left)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.yBottom - 30,
			borderWidthBlack,
			30
		);

		ctx.fillRect(
			x + this.pipeWidth - borderWidthBlack - alignToLeft,
			this.currentPipe.yBottom,
			borderWidthBlack,
			this.currentPipe.heightTop + borderWidthBlack
		);

		ctx.fillRect(
			x + this.pipeWidth - borderWidthBlack - alignToLeft + 5,
			this.currentPipe.yBottom - 30,
			borderWidthBlack,
			33
		);

		ctx.fillStyle = "#cc9900";

		// Top pipe (middle brown part)
		ctx.fillRect(
			x - borderWidthBlack - alignToLeft,
			this.currentPipe.yTop,
			this.pipeWidth,
			this.currentPipe.heightTop
		);

		ctx.fillStyle = "#a6731a";

		// Top pipe (left brown part)
		ctx.fillRect(
			x - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.yTop - borderWidthBrown,
			borderWidthBrown,
			this.currentPipe.heightTop + borderWidthBrown
		);

		// Top pipe (right brown part)
		ctx.fillRect(
			x + this.pipeWidth - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.yTop - borderWidthBrown,
			borderWidthBrown,
			this.currentPipe.heightTop + borderWidthBrown
		);

		// Top pipe (middle green part)
		ctx.fillStyle = "#ccff00";
		ctx.fillRect(
			x - borderWidthBlack - alignToLeft,
			this.currentPipe.heightTop,
			this.pipeWidth,
			30
		);

		ctx.fillStyle = "#a6bf1a";

		// Top pipe (left green part)
		ctx.fillRect(
			x - borderWidthBrown - borderWidthBlack - alignToLeft - 10,
			this.currentPipe.heightTop,
			borderWidthBrown + 10,
			30
		);

		// Top pipe (right green part)
		ctx.fillRect(
			x + this.pipeWidth - borderWidthBrown - borderWidthBlack - alignToLeft,
			this.currentPipe.heightTop,
			borderWidthBrown + 10,
			30
		);

		ctx.fillStyle = "#000000";

		// Top pipe (black border bottom)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.heightTop + 30,
			85,
			3
		);

		// Top pipe (black border top)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.heightTop,
			85,
			3
		);

		// Top pipe (black border left)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - 5 - alignToLeft,
			this.currentPipe.heightTop,
			borderWidthBlack,
			30
		);

		ctx.fillRect(
			x + this.pipeWidth - borderWidthBlack - alignToLeft + 5,
			this.currentPipe.heightTop,
			borderWidthBlack,
			33
		);

		// Top pipe (black border left)
		ctx.fillRect(
			x - borderWidthBlack - borderWidthBlack - borderWidthBrown - alignToLeft,
			this.currentPipe.yTop - borderWidthBlack,
			borderWidthBlack,
			this.currentPipe.heightTop + borderWidthBlack
		);

		// Top pipe (black border right)
		ctx.fillRect(
			x + this.pipeWidth - borderWidthBlack - alignToLeft,
			this.currentPipe.yTop - borderWidthBlack,
			borderWidthBlack,
			this.currentPipe.heightTop + borderWidthBlack
		);
	}

	checkCollision(birdX, birdY, birdWidth, birdHeight) {
		const greenPipeHeight = 30;

		// Check collision with the top pipe
		if (
			birdX + birdWidth > this.currentPipe.x &&
			birdX < this.currentPipe.x + this.pipeWidth &&
			birdY < this.currentPipe.yTop + this.currentPipe.heightTop + greenPipeHeight &&
			birdY + birdHeight > this.currentPipe.yTop + greenPipeHeight
		) {
			return { collided: true, part: "top" };
		}

		// Check collision with the bottom pipe
		if (
			birdX + birdWidth > this.currentPipe.x &&
			birdX < this.currentPipe.x + this.pipeWidth &&
			birdY + birdHeight > this.currentPipe.yBottom + greenPipeHeight &&
			birdY < this.currentPipe.yBottom + this.currentPipe.heightBottom + greenPipeHeight
		) {
			return { collided: true, part: "bottom" };
		}

		// Check collision with the gap between pipes
		if (birdX + birdWidth > this.currentPipe.x && birdX < this.currentPipe.x + this.pipeWidth) {
			return { collided: true, part: "gap" };
		}

		return { collided: false, part: null }; // No collision detected
	}

	update() {
    // Move the pipes to the left or right based on the currentSide
		const speed = 0.5;
    this.currentPipe.x += speed * this.currentSide;

	}
}
