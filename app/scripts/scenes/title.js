import Logo from '@/objects/logo';
import Inventory from '@/objects/inventory';
import Display from '@/objects/display';
import Controls from '@/objects/controls';
import Container from '@/objects/container';
import Person from '@/objects/person';
import Item from '@/objects/item';
//import Crystal from '@/objects/crystal';

export default class Title extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Title'});
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {
  }

  /**
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto')
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    // Define center
    /*
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    const scaleRatio = window.devicePixelRatio / 3;
    */
    const canvasWidth = this.cameras.main.width
    let inventoryX, inventoryY

    if (canvasWidth >= 1000) {
      this.playWidth = 1000
      this.playHeight = 630
      this.ratio = 1
    } else if (canvasWidth >= 800) {
      this.playWidth = 800
      this.playHeight = 504
      this.ratio = .8
    } else if (canvasWidth >= 600) {
      this.playWidth = 600
      this.playHeight = 378
      this.ratio = .6
    } else if (canvasWidth >= 400) {
      this.playWidth = 400
      this.playHeight = 252
      this.ratio = .4
    } else {
      this.playWidth = 300
      this.playHeight = 189
      this.ratio = .3
    }
    this.xCenter = (canvasWidth-this.playWidth)/2

    this.inventory = this.add.existing(new Inventory(this));
    this.display = this.add.existing(new Display(this));
    this.controls = this.add.existing(new Controls(this));
    this.mode = 'look';

    const space = this.add.image(this.xCenter, 50, 'space').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight)
    this.background = this.add.sprite(this.xCenter, 50, 'basement').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight)
/*
    const ladder = this.add.image(this.xCenter+(570*this.ratio), 50, 'ladder').setOrigin(0);
    ladder.setDisplaySize(ladder.displayWidth*this.ratio, ladder.displayHeight*this.ratio);

    let lamp = this.add.sprite(this.xCenter+(130*this.ratio), 50+(260*this.ratio), 'lamp').setOrigin(0);
    lamp.setDisplaySize(lamp.displayWidth*this.ratio, lamp.displayHeight*this.ratio);
    lamp.setInteractive( { useHandCursor: false  } );
    lamp.contents = {kind: 'crystal', color:'yellow'}
    lamp.description = ['It\'s a broken lamp.', 'There seems to be some kind of broken light bulb inside.']

    lamp.on('pointerup', () => {
      this.click(lamp)
    });
*/

    const ladder = this.add.existing( new Item(this, this.xCenter+(570*this.ratio), 50, 'ladder', {
      name: 'ladder',
      description: 'a ladder leading up to the workshop',
      bolted: true
    }))

    let lamp = this.add.existing(
      new Container(
        this,
        this.xCenter+(235*this.ratio),
        50+(355*this.ratio),
        'lamp',
        [{sprite:'yellow', info:{description: 'a yellow rock that was mistaken for a light bulb', name: 'yellow crystal'}}],
        'a broken lamp',
        'lamp',
        false
      )
    );

    let arnold = this.add.existing(new Person(this, this.xCenter+(765*this.ratio), 50+(295*this.ratio), 'arnold_wake', {
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
        }
      }
    ))
/*    let arnold = this.add.sprite(this.xCenter+(765*this.ratio), 50+(295*this.ratio), 'arnold_sleep').setOrigin(0);
    arnold.setDisplaySize(arnold.displayWidth*this.ratio, arnold.displayHeight*this.ratio);
    arnold.setInteractive( { useHandCursor: false  } );
    arnold.on('pointerup', () => arnold.setTexture('arnold_wake', 0));
*/
    const player = this.add.image(this.xCenter, this.playHeight+50, 'base').setOrigin(0);
    let player_clothes = this.add.sprite(this.xCenter, this.playHeight+50, 'robe').setOrigin(0);
    let player_hat = this.add.sprite(this.xCenter, this.playHeight+50, 'apprentice_hat').setOrigin(0);
  }


  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */

  update(/* t, dt */) {
    //console.log(window.innerWidth)
    //console.log(this.cameras.main.width)

  }

  /**
   *  Called after a scene is rendered. Handles rendenring post processing.
   *
   *  @protected
   */
  render() {
  }

  /**
   *  Called when a scene is about to shut down.
   *
   *  @protected
   */
  shutdown() {
  }

  /**
   *  Called when a scene is about to be destroyed (i.e.: removed from scene
   *  manager). All allocated resources that need clean up should be freed up
   *  here.
   *
   *  @protected
   */
  destroy() {
  }
}
