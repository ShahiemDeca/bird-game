export default class AssetLoader {
  constructor(imageUrls, onComplete) {
    this.imageUrls = imageUrls;
    this.onComplete = onComplete;
    this.loadedImages = 0;
    this.images = {};

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

  onImageLoad(url, image) {
    this.loadedImages++;
    console.log(`Image loaded: ${url}`);

    if (this.loadedImages === this.imageUrls.length) {
      console.log('All images loaded');
      this.onComplete(this.images);
    }
  }

  getImages() {
    return this.images;
  }
}