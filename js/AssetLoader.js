export default class AssetLoader {
	
	loadedImages = 0;
	images = {};

	constructor(imageUrls, onComplete) {
		this.imageUrls = imageUrls;
		this.onComplete = onComplete;

		this.loadImages();
	}

	loadImages() {
		this.imageUrls.forEach((url) => {
			const image = new Image();
			image.onload = () => this.onImageLoad(url, image);
			image.src = url;

			this.images[url] = image;
		});
	}

	onImageLoad() {
		this.loadedImages++;
		if (this.loadedImages === this.imageUrls.length) this.onComplete(this.images);
	}

	getImages() {
		return this.images;
	}
}
