import Inventory from '@/structure/inventory';

export default class Player extends Phaser.GameObjects.Image {

  constructor(scene, sprite) {
    super(scene, 0, scene.registry.get('height')+30, sprite);
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.inventory = new Inventory(scene);
    this.wrapper = scene;
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

  look(item) {
    let readout = [`It's ${item.description}.`];
    if(item.type === 'container') {
      let holder=`Inside looks to be`;
      for (let i = 0; i < item.contents.length; i++) {
        if (item.contents.length === 1) {
          readout.push(`Inside looks to be ${item.contents[i].description}.`)
        } else if ((i+1) === item.contents.length) {
          readout.push(`and ${item.contents[i].description}.`)
        } else if (i === 0) {
          readout.push(`Inside looks to be ${item.contents[i].description},`)
        } else {
          readout.push(`${item.contents[i].description},`)
        }
      }
    }
    this.wrapper.display.setText(readout)
  }


}
