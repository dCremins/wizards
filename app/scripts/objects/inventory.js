import Crystal from '@/objects/crystal';

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
        itemPosition = (scene.xCenter+scene.background.displayWidth)-(50*(this.getLength()+1));
        itemHeight = scene.playHeight+50+(50*scene.ratio);
        break;
      case 3:
      case 4:
      case 5:
        itemPosition = (scene.xCenter+scene.background.displayWidth)-(50*((this.getLength()-4)+1));
        itemHeight = scene.playHeight+50+(120*scene.ratio);
        break;
      default:
        scene.display.setText('Your inventory is too full to pick this up.');
        return
        break;

    }
    switch(item.kind) {
      case 'crystal':
        this.add(new Crystal(scene, itemPosition, itemHeight, item.color), true);
        scene.display.setText('You tuck the crystal into your robe.');
        break;
      default:
        scene.display.setText('You probably shouldn\'t take that.');
        break;
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto')
  }
}
