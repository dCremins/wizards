import Inventory from '@/objects/inventory';
import Player from '@/objects/player';
import Display from '@/objects/display';
import Controls from '@/objects/controls';
import Item from '@/objects/item';


export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game'});
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

    this.inventory = this.add.existing(new Inventory(this));

    this.player = this.add.existing(new Player(this, 'base'))
    this.player.setClothes(this, new Item(this, 0, this.playHeight+50, 'robe', {
      name: 'apprentice hat',
      description: 'a long robe, worn by wizard\'s apprentices',
    }));
    this.player.setHat(this, new Item(this, 0, this.playHeight+50, 'apprentice_hat', {
      name: 'apprentice hat',
      description: 'a long hood with a star on the end, worn by wizard\'s apprentices',
    }));
    //this.add.image(0, this.playHeight+50, 'base').setOrigin(0);
    //this.add.sprite(0, this.playHeight+50, 'robe').setOrigin(0);
    //this.add.sprite(0, this.playHeight+50, 'apprentice_hat').setOrigin(0);

    this.controls = this.add.existing(new Controls(this));
    this.display = this.add.existing(new Display(this));
    this.mode = 'look';

    this.room = this.scene.get('Basement')
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
