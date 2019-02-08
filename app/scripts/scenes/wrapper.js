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
      this.playWidth = 1000;
      this.playHeight = 630;
      this.ratio = 1;
    } else if (canvasWidth >= 800) {
      this.playWidth = 800;
      this.playHeight = 504;
      this.ratio = .8;
    } else if (canvasWidth >= 600) {
      this.playWidth = 600;
      this.playHeight = 378;
      this.ratio = .6;
    } else if (canvasWidth >= 400) {
      this.playWidth = 400;
      this.playHeight = 252;
      this.ratio = .4;
    } else {
      this.playWidth = 300;
      this.playHeight = 189;
      this.ratio = .3;
    }

    this.player = this.add.existing(new Player(this, 'base'));
    this.player.setClothes(this, new Item({
      scene: this,
      x: 0,
      y: this.playHeight+50,
      sprite: 'robe',
      name: 'apprentice hat',
      description: 'a long robe, worn by wizard\'s apprentices',
    }));

    this.player.setHat(this, new Item({
      scene: this,
      x: 0,
      y: this.playHeight+50,
      sprite: 'apprentice_hat',
      name: 'apprentice hat',
      description: 'a long hood with a star on the end, worn by wizard\'s apprentices',
    }));

    this.controls = this.add.existing(new Controls(this));
    this.display = this.add.existing(new Display(this));
    this.mode = 'look';
    console.log(this.playHeight);

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
