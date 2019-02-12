// - [ ]  name
// - [ ]  sprite
// - [ ]  type
// - [ ]  pos and size
// - [ ]  describe
//     - [ ]  Just pass name to the dialogue function of the person and look function of the player (allows for variability of reactions)
// - [ ]  use?
//     - [ ]  some kind of switch to handle using with different objects or scenarios?

export default class Item extends Phaser.GameObjects.Image {
  constructor({scene, x, y, sprite, name='junk', description='You don\'t see anything interesting about that.', type='junk', bolted=true} = {}) {
    const ratio = scene.registry.get('ratio');
    super(scene, (x*ratio), 20+(y*ratio), sprite);
    this.setDisplaySize(this.width*ratio, this.height*ratio);
    this.setOrigin(0);
    this.name = name;
    this.description = description;
    this.type = type;
    this.bolted = bolted;

    this.setInteractive({ useHandCursor: false  });
    const player = scene.registry.get('player')
    this.on('pointerdown', () => {
      switch(scene.mode) {
      case 'take':
        player.take(this);
        break;
      case 'put':
        player.put(this);
        break;
      case 'use':
        player.use(this);
        break;
      default:
        player.look(this);
        break;
      }
    });
  }
}
