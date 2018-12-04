
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

    this.add.image(0, 50, 'space').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);
    this.background = this.add.sprite(0, 50, 'basement').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);

    this.add.existing( new Item(this, 0+(570*this.ratio), 50, 'ladder', {
      name: 'ladder',
      description: 'a ladder leading up to the workshop',
      onUse: function (game) {
        game.scene.start('Workshop', {
          inventory: this.inventory,
          player: this.player,
          controls: this.controls,
          display: this.display
        });
      },
      bolted: true
    }));

    this.add.existing(new Container(this, 0+(125*this.ratio), 50+(260*this.ratio),
      'lamp',
      [{sprite:'yellow', info:{description: 'a yellow rock that was mistaken for a light bulb', name: 'yellow crystal'}}],
      'a broken lamp',
      'lamp',
      false
    ));

    this.add.existing(new Person(this, 0+(765*this.ratio), 50+(295*this.ratio), 'arnold_wake', {
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
