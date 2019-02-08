import Container from '@/items/container';
import Item from '@/items/item';

export default class Basement extends Phaser.Scene {
  constructor() {
    super({key: 'Basement'});
  }

  init(/* data */) {
  }

  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  create(/* data */) {
    console.log(this)
    this.add.image(0, 50, 'space').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height-50);
    this.background = this.add.sprite(0, 0, 'basement').setOrigin(0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    this.add.existing( new Item({
      scene: this,
      x: 0+(570*this.ratio),
      y: 50,
      sprite: 'ladder',
      name: 'ladder',
      description: 'a ladder leading up to the workshop',
      type: 'scenery',
      bolted: true
    }));

    this.add.existing( new Container({
      scene: this,
      x: 0+(125*this.ratio),
      y: 50+(260*this.ratio),
      sprite: 'lamp',
      name: 'lamp',
      description: 'a broken lamp',
      bolted: true,
      locked: false,
      type: 'container',
      contents: [
        new Item({
          scene: this,
          x: 0,
          y: 0,
          sprite: 'yellow',
          name: 'yellow crystal',
          description: 'a yellow rock that was mistaken for a light bulb',
          type: 'crystal',
          bolted: false
        })
      ]
    }));

  }

  update(/* t, dt */) {
  }

  render() {
  }

  shutdown() {
  }

  destroy() {
  }
}
