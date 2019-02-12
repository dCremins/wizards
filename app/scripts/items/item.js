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
    super(scene, (x*scene.registry.get('ratio')), 20+(y*scene.registry.get('ratio')), sprite);
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.name = name;
    this.description = description;
    this.type = type;
    this.bolted = bolted;

    this.on('pointerup', () => {
      switch(scene.mode) {
      case 'take':
        scene.player.take(this);
        break;
      case 'put':
        scene.player.put(this);
        break;
      case 'use':
        scene.player.use(this);
        break;
      default:
        scene.player.look(this);
        break;
      }
    });
  }
}
