import Item from '@/objects/item';

export default class Inventory extends Phaser.GameObjects.Group {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Inventory
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    super(scene);
  }

  store(scene, item) {
    let itemPosition, itemHeight;
    switch(this.getLength()) {
    case 0:
    case 1:
    case 2:
      itemPosition = (scene.background.displayWidth)-(50*(this.getLength()+1));
      itemHeight = scene.playHeight+10+(50*scene.ratio);
      break;
    case 3:
    case 4:
    case 5:
      itemPosition = (scene.background.displayWidth)-(50*((this.getLength()-4)+1));
      itemHeight = scene.playHeight+10+(120*scene.ratio);
      break;
    default:
      scene.display.setText('Your inventory is too full to pick this up.');
      return;
    }

    if (item.visible) {
    //  item.setPosition(itemPosition, itemHeight)
      if (!item.active) {
        item.setActive(true);
        scene.children.add(item);
      }
      this.add(item);
    } else {
      this.add(new Item(scene, itemPosition, itemHeight, item.sprite, item.info));
    }

    scene.display.setText('You tuck the '+item.info.name+' into your robe.');

    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

}
