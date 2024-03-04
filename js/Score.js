export default class Score {
	constructor() {
		this.score = 0;
	}

	increase() {
		this.score += 1;
	}

	reset() {
		this.score = 0;
	}

	render(ctx) {
		ctx.fillStyle = "#ffffff";
		ctx.font = "40px Arial";
		ctx.fillText(this.score, 30, 60);
	}
}
