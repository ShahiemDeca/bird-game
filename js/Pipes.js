export default class Pipes {
	constructor(canvas) {
		this.pipes = [];

		this.pipeConfig = {
			gapInside: 500,
			pipeWidth: 50,
			pipeGap: 150,
			pipeSpeed: 200, // Adjust the speed as needed
		};

		this.canvas = canvas;
		this.movePipes = true;
	}

	addPipe() {
		this.pipes.push({
			x: this.canvas.width,
			y: 0,
			width: this.pipeConfig.pipeWidth,
			height: (Math.random() * this.canvas.height) / 2,
		});
	}

	removePipe() {
		this.pipes.shift(); // Remove the first pipe
	}

	render(ctx) {
		for (let i = 0; i < this.pipes.length; i++) {
			const x = this.pipes[i].x;

			const yTop = this.pipes[i].y;
			const heightTop = this.pipes[i].height;
			const yBottom = this.pipes[i].height + this.pipeConfig.gapInside;
			const heightBottom = this.canvas.height - this.pipes[i].height;

			if (i === 0) {
				ctx.fillStyle = "blue"; // Blue color for the first pipe
			} else {
				ctx.fillStyle = "#cc9900"; // Green color for other pipes
			}

			ctx.fillRect(x, yTop, this.pipeConfig.pipeWidth, heightTop);
			ctx.fillRect(x, yBottom, this.pipeConfig.pipeWidth, heightBottom);

			const borderThickness = 10;
			// Draw right border
			ctx.fillStyle = "#a6731a";
			ctx.fillRect(x - borderThickness, yBottom, borderThickness, heightBottom);
			ctx.fillRect(x + this.pipeConfig.pipeWidth, yBottom, borderThickness, heightBottom);
		}
	}

	checkCollision(birdX, birdY, birdWidth, birdHeight) {
		if (this.pipes.length > 0) {
			const firstPipe = this.pipes[0];

			// Check for collision with the top pipe
			if (
				birdX + birdWidth > firstPipe.x &&
				birdX < firstPipe.x + this.pipeConfig.pipeWidth &&
				birdY > firstPipe.height &&
				birdY + birdHeight < firstPipe.height + this.pipeConfig.gapInside
			) {
				return true; // Collision detected with the top pipe
			}
		}

		return false; // No collision detected
	}

	update(deltaTime) {
		if (this.movePipes) {
			// Move the first pipe separately
			if (this.pipes.length > 0) {
				if (this.pipes[0].x + this.pipeConfig.pipeWidth < 0) {
					console.log("First pipe removed");
					this.pipes.shift(); // Remove the first pipe
				}
			}

			for (let i = 0; i < this.pipes.length; i++) {
				this.pipes[i].x -= this.pipeConfig.pipeSpeed * deltaTime;
			}

			const lastPipeX =
				this.pipes.length > 0 ? this.pipes[this.pipes.length - 1].x : this.canvas.width;
			if (this.canvas.width - lastPipeX >= 300) {
				// console.log('New pipe created');
				this.addPipe(); // Create a new pipe with a gap of 100 pixels
			}
		}
	}
}
