
import Door from '@/items/door';

export default class Workshop extends Phaser.Scene {
  constructor() {
    super({key: 'Workshop'});
  }

  init() {

  }

  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  create(/* data */) {
    this.add.image(0, 20, 'space').setOrigin(0).setDisplaySize(this.registry.get('width'), this.registry.get('height'));
    this.background = this.add.image(0, 20, 'basement').setOrigin(0).setDisplaySize(this.registry.get('width'), this.registry.get('height'));

    this.add.existing( new Door({
      scene: this,
      x: 500,
      y: 0,
      sprite: 'ladder',
      name: 'ladder',
      description: 'a ladder leading down to the Basement',
      path: 'Basement'
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
