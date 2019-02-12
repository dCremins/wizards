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
    this.add.image(0, 20, 'space').setOrigin(0).setDisplaySize(this.registry.get('width'), this.registry.get('height'));
    this.background = this.add.sprite(0, 20, 'basement').setOrigin(0).setDisplaySize(this.registry.get('width'), this.registry.get('height'));

    this.add.existing( new Item({
      scene: this,
      x: 570,
      y: 0,
      sprite: 'ladder',
      name: 'ladder',
      description: 'a ladder leading up to the workshop',
      type: 'scenery',
      bolted: true
    }));

    this.add.existing( new Container({
      scene: this,
      x: 125,
      y: 260,
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
