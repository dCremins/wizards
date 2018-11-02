import Dialogue from '@/objects/dialogue';

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
    this.options = info.options;
    this.asked = 'none';
    this.responses = scene.add.group()
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

  ask(scene, key) {
    let height = scene.playHeight+60
    if (scene.display) {
      height += scene.display.displayHeight
    }
    this.responses.clear(true, true)
    this.options[key].forEach( option => {
      this.responses.add(new Dialogue(scene, height, option, this), true)
      height += 20
    })
    if (key === 'none') {
      this.responses.add(new Dialogue(scene, height, {key: 'leave', text: 'Leave'}, this), true)
    } else {
      this.responses.add(new Dialogue(scene, height, {key: this.asked, text: 'Back'}, this), true)
    }
  }

  respond(scene, key) {
    if (this.dialogue[key]) {
      scene.display.setText([this.name+': ',this.dialogue[key]]);
    } else {
      scene.display.setText(this.name+': What do you want to know?');
    }
    if (this.options[key]) {
      this.ask(scene, key)
    } else {
      this.responses.clear(true, true)
      this.responses.add(new Dialogue(scene, scene.playHeight+60+scene.display.displayHeight, {
        key: this.asked,
        text: 'Back'
      }, this), true)
    }
  }

  take(scene) {
    scene.display.setText('That doesn\'t seem like a good idea.');
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  use(scene, item) {
    if (item) {
      this.give(scene, item)
      return
    } else {
      scene.display.setText(this.name+': What\'s up?');
      this.ask(scene, 'none')
      return;
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  give(scene, item) {
    if (this.needs && this.needs === item.info.name) {
      scene.display.setText(['You give them the '+topic+'.', this.name+': ', 'Thanks!']);
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
      scene.display.setText(['You show them the '+topic+'.', '', this.name+': ',this.dialogue[topic]]);
    } else {
      scene.display.setText(['You show them the '+topic+'.', 'They don\'t seem that interested in that.']);
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }



















}
