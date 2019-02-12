import Inventory from '@/structure/inventory';

export default class Player extends Phaser.GameObjects.Image {

  constructor(scene, sprite) {
    super(scene, 0, scene.registry.get('height')+30, sprite);
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.inventory = new Inventory(scene);
  }

  setHat(scene, hat) {
    hat.setOrigin(0);
    hat.setPosition(0, scene.registry.get('height')+30);
    hat.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.hat = hat;
  }

  setClothes(scene, clothes) {
    clothes.setOrigin(0);
    clothes.setPosition(0, scene.registry.get('height')+30);
    clothes.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.clothes = clothes;
  }


}
