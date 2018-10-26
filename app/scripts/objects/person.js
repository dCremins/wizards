export default class Person extends Phaser.GameObjects.Image {

  constructor(scene, x, y, sprite, info) {
    super(scene, x, y, sprite);
    this.setOrigin(0)
    this.name = info.name;
    this.info = {
      name: info.name,
      description: info.description,
      needs: info.needs,
      onUse: info.onUse
    }
    this.dialogue = info.dialogue;
    this.inventory = info.inventory
    this.setInteractive({useHandCursor: false})

    this.on('pointerup', () => {
      switch(scene.mode) {
        case 'take':
          this.take(scene)
          break;
        case 'use':
          this.use(scene, scene.held)
          break;
        default:
          scene.display.setText(['It\'s '+this.name+'.', this.info.description])
          break;
      }
    });
    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  take(scene) {
    scene.display.setText('They probably wouldn\'t like that.');
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  use(scene, item) {
    if (this.info.onUse) {
      this.info.onUse
      return
    } else if (item) {
      this.give(scene, item)
      return
    } else {
      scene.display.setText('You aren\'t holding anything.');
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  give(scene, item) {
    if (this.needs && this.needs === item.info.name) {
      scene.display.setText([this.name+': ', 'Thanks!']);
      scene.inventory.remove(item, true, true)
    } else {
      this.show(scene, item.info.name)
      return
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  show(scene, topic) {
    if (this.dialogue[topic]) {
      scene.display.setText([this.name+': ', this.dialogue[topic]]);
    } else {
      scene.display.setText('They don\'t seem that interested in that.');
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }
}
