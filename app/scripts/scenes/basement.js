import Inventory from '@/objects/inventory';
import Display from '@/objects/display';
import Controls from '@/objects/controls';
import Container from '@/objects/container';
import Person from '@/objects/person';
import Item from '@/objects/item';
//import Crystal from '@/objects/crystal';

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
    const canvasWidth = this.cameras.main.width;
    console.log(canvasWidth)
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
    this.xCenter = (canvasWidth-this.playWidth)/2;

    this.inventory = this.add.existing(new Inventory(this));
    this.display = this.add.existing(new Display(this));
    this.controls = this.add.existing(new Controls(this));
    this.mode = 'look';

    this.add.image(this.xCenter, 50, 'space').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);
    this.background = this.add.sprite(this.xCenter, 50, 'basement').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);

    this.add.existing( new Item(this, this.xCenter+(570*this.ratio), 50, 'ladder', {
      name: 'ladder',
      description: 'a ladder leading up to the workshop',
      onUse: function (game) {
        game.scene.start('Game');
      },
      bolted: true
    }));

    this.add.existing(new Container(
      this,
      this.xCenter+(235*this.ratio),
      50+(355*this.ratio),
      'lamp',
      [{sprite:'yellow', info:{description: 'a yellow rock that was mistaken for a light bulb', name: 'yellow crystal'}}],
      'a broken lamp',
      'lamp',
      false
    ));

    this.add.existing(new Person(this, this.xCenter+(765*this.ratio), 50+(295*this.ratio), 'arnold_wake', {
      name: 'Arnold Fluffybottom',
      description: 'He\'s just so fluffy',
      dialogue: {
        'yellow crystal': 'Doesn\'t look anything like a light bulb to me.',
        'wizard': 'Eh, I could take him or leave him',
        'ritual-what': 'Magic? I don\'t know.',
        'crystals': 'That idiot upstairs keeps mistaking them for other things and putting them away wrong.',
        'reginald': 'Ugh, that idiot. I think he can only see silhouettes.',
        'arnold': 'I\'m the wizard\'s familiar. As you can see, I am very fluffy.'
      },
      options: {
        'none': [{
          key: 'ritual',
          text: 'Ask about the ritual'
        }, {
          key: 'upstairs',
          text: 'Ask about upstairs'
        }, {
          key: 'arnold',
          text: 'Ask Arnold about himself'
        }],
        'ritual': [{
          key: 'crystals',
          text: 'Ask where the crystals are'
        }, {
          key: 'ritual-what',
          text: 'Ask what the ritual is for'
        }],
        'upstairs':[{
          key: 'reginald',
          text: 'Ask about the suit of armor'
        }]
      },
      onUse: 'You scratch behind Arnold\'s ears. He\'s purring.'
    }));

    this.add.image(this.xCenter, this.playHeight+50, 'base').setOrigin(0);
    this.add.sprite(this.xCenter, this.playHeight+50, 'robe').setOrigin(0);
    this.add.sprite(this.xCenter, this.playHeight+50, 'apprentice_hat').setOrigin(0);
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
