import Player from '@/people/player';
import Display from '@/structure/display';
import Controls from '@/structure/controls';
import Item from '@/items/item';


export default class Wrapper extends Phaser.Scene {
  constructor() {
    super({key: 'Wrapper'});
  }

  init(/* data */) {
  }

  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  create(/* data */) {
    const canvasWidth = this.cameras.main.width;
    if (canvasWidth >= 1000) {
      this.registry.set('width', 1000);
      this.registry.set('height', 630);
      this.registry.set('ratio', 1);
    } else if (canvasWidth >= 800) {
      this.registry.set('width', 800);
      this.registry.set('height', 504);
      this.registry.set('ratio', .8);
    } else if (canvasWidth >= 600) {
      this.registry.set('width', 600);
      this.registry.set('height', 378);
      this.registry.set('ratio', .6);
    } else if (canvasWidth >= 400) {
      this.registry.set('width', 400);
      this.registry.set('height', 252);
      this.registry.set('ratio', .4);
    } else {
      this.registry.set('width', 300);
      this.registry.set('height', 189);
      this.registry.set('ratio', .3);
    }


    this.player = this.add.existing(new Player(this, 'base'));
    const clothes = this.add.existing(new Item({
      scene: this,
      x: 0,
      y: this.registry.get('height')+50,
      sprite: 'robe',
      name: 'apprentice robes',
      description: 'a long robe, worn by wizard\'s apprentices',
    }));
    this.player.setClothes(this, clothes);

    const hat = this.add.existing(new Item({
      scene: this,
      x: 0,
      y: this.registry.get('height')+50,
      sprite: 'apprentice_hat',
      name: 'apprentice hat',
      description: 'a long hood with a star on the end, worn by wizard\'s apprentices',
    }));

    this.player.setHat(this, hat);

    this.controls = this.add.existing(new Controls(this));
    this.display = this.add.existing(new Display(this));
    this.mode = 'look';

    this.room = this.scene.launch('Basement');
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
