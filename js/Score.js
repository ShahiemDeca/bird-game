export default class Score {
	constructor() {
		this.x = 50; // Set the y position of the score;
		this.y = 50; // Set the y position of the score;
		this.score = 0; // Set an initial score
	}

	setImage(image) {
		this.image = image;
	}

	upScore() {
		this.score += 1;
	}

	render(ctx) {
		ctx.globalAlpha = 0.5; // Set the opacity to 0.5 (range: 0.0 - 1.0)
		ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
		ctx.globalAlpha = 1.0;

		// Add text with the score
		ctx.fillStyle = "white"; // Set the text color
		ctx.font = "40px Arial"; // Set the font size and type
		ctx.fillText(this.score, this.x + 30, this.y + 60); // Draw the text
	}
}
