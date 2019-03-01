import Dialogue from '@/structure/dialogue';

export default class Person extends Phaser.GameObjects.Image {

  constructor({scene, x, y, sprite, dialogue={}, questions={}, name, description, inventory=[]} = {}) {
    const ratio = scene.registry.get('ratio');
    super(scene, (x*ratio), 20+(y*ratio), sprite);
    this.setDisplaySize(this.width*ratio, this.height*ratio);
    this.setOrigin(0);
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.dialogue = dialogue;
    this.questions = questions;

    this.setInteractive({ useHandCursor: false  });
    this.wrapper = scene.registry.get('wrapper');
    this.responses = this.wrapper.add.group();

    this.on('pointerdown', () => {
      let held = scene.registry.get('held');
      let mode = scene.registry.get('mode');
      switch(mode) {
      case 'take':
        this.wrapper.display.setText(`They probably wouldn't like that.`);
        break;
      case 'put':
        console.log('put', held);
        this.show(held);
        break;
      case 'use':
        console.log('use', held);
        this.show(held);
        break;
      case 'talk':
        this.talk('start');
        break;
      default:
        this.look();
        break;
      }
    });
  }

  give(item) {

  }

  show(item) {
    console.log(item)
    this.responses.clear(true, true);
    this.responses.displayHeight = 0;
    this.wrapper.display.setText([`You show the ${item.name} to ${this.name}.`, `"${this.dialogue[item.name]}"`]);
  }

  talk(res) {
    this.responses.clear(true, true);
    this.responses.displayHeight = 0;
    this.wrapper.display.setText([`"${this.dialogue[res]}"`])
    if (res === 'leave') {
      this.wrapper.registry.set('mode', 'look');
      this.wrapper.input.setDefaultCursor('url(assets/pointer.png), auto');
      return;
    }
    let newHeight = this.wrapper.display.y + this.wrapper.display.displayHeight;
    let i = 0;
    for (const key in this.questions[res] ) {
      let option = new Dialogue({
        scene: this.wrapper,
        y: newHeight,
        option: this.questions[res][key],
        key: key,
        person: this
      });
      this.responses.add(option, true);
      newHeight += this.responses.children.entries[i]['displayHeight'];
      i ++;
    }
  }

  look() {
    this.wrapper.display.setText([`It's ${this.name}. ${this.description}.`]);
  }
}
