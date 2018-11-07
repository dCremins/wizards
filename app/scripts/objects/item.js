export default class Item extends Phaser.GameObjects.Image {

  constructor(scene, x, y, sprite, info) {
    super(scene, x, y, sprite);

    this.setOrigin(0);
    this.name = info.name;
    this.info = {
      name: info.name,
      description: info.description,
      needs: info.needs,
      bolted: info.bolted
    };
    this.onUse = info.onUse;
    this.unlocks = info.unlocks;
    this.setInteractive({useHandCursor: false});

    scene.children.add(this);

    this.on('pointerup', () => {
      switch(scene.mode) {
      case 'take':
        if (scene.inventory.contains(this)) {
          scene.display.setText('You already have this.');
          scene.mode = 'look';
          scene.input.setDefaultCursor('url(assets/pointer.png), auto');
        } else if (this.info.bolted) {
          scene.display.setText('That\'s probably a bad idea.');
          scene.mode = 'look';
          scene.input.setDefaultCursor('url(assets/pointer.png), auto');
        } else {
          this.take(scene);
        }
        break;
      case 'use':
        if (this.onUse) {
          this.onUse(scene);
        } else if (scene.inventory.contains(this)) {
          scene.display.setText('You grab the '+this.info.name+'.');
          scene.held = this;
          scene.input.setDefaultCursor('grab');
        } else {
          this.use(scene, scene.held);
        }
        break;
      case 'talk':
        scene.display.setText('You greet the '+this.info.name+' but it doesn\'t respond.');
        scene.mode = 'look';
        scene.input.setDefaultCursor('url(assets/pointer.png), auto');
        break;
      default:
        scene.display.setText('It\'s '+this.info.description+'.');
        break;
      }
    });
  }

  take(scene) {
    scene.inventory.store(scene, this);
  }

  use(scene, item) {
    if (!item) {
      scene.display.setText('You aren\'t holding anything.');
    } else if (this.needs && this.needs === item.info.name) {
      scene.display.setText('You use the '+item.info.name+'.');
      scene.inventory.remove(item);
    } else {
      scene.display.setText('That didn\'t seem to do anything.');
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }
}
