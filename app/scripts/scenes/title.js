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
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    // Define center
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;

    let inventory = []


    this.add.image(600, 300, 'space');
    this.add.image(x, 310, 'basement');
    const ladder = this.add.image(x+150, 182, 'ladder');
    let arnold = this.add.image(x+302, 315, 'arnold_sleep');
    let box = this.add.image(x-90, 340, 'hat');
    const lamp = this.add.image(x-260, 345, 'lamp');
    ladder.setInteractive( { useHandCursor: true  } );

    lamp.setInteractive( { useHandCursor: true  } );
    lamp.on('pointerup', () => {
      const yellow = this.add.image(300, this.cameras.main.height-100, 'yellow')
      yellow.setInteractive( { useHandCursor: true  } );
      inventory.push(yellow);
      lamp.setInteractive(false); //doesn't work
    });

    box.setInteractive( { useHandCursor: true  } );
    box.on('pointerup', () => {
      box = this.add.image(x-90, 340, 'box');
    });

    arnold.setInteractive( { useHandCursor: true  } );
    arnold.on('pointerup', () => arnold = this.add.image(x+302, 315, 'arnold_wake'));


    const player = this.add.image(100, this.cameras.main.height-100, 'base');
    let player_clothes = this.add.image(100, this.cameras.main.height-100, 'robe');
    let player_hat = this.add.image(100, this.cameras.main.height-100, 'apprentice_hat');
    /*
    // add logo centered and slightly down from the top of the screen
    const logo = this.add.image(x, this.cameras.main.height-(93/2), 'logo');
    const label = this.add.text(x, y, 'Start', {
      font: '64px Arial',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });
    //move the center point of the label and make it interractive
    label.setOrigin(0.5, 0.5).setInteractive();
    //when the button is clicked, move to the next scene
    label.on('pointerup', () => this.scene.start('Game'));
    */
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
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
