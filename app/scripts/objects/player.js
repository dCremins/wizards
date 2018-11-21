export default class Player extends Phaser.GameObjects.Image {

  constructor(scene, sprite) {
    super(scene, 0, scene.playHeight+50, sprite);
    this.setDisplaySize(this.width*scene.ratio, this.height*scene.ratio);
    this.setOrigin(0);
  }

  setHat(scene, hat) {
    hat.setPosition(0, scene.playHeight+50)
    hat.setDisplaySize(this.width*scene.ratio, this.height*scene.ratio);
  }

  setClothes(scene, clothes) {

  }
}
