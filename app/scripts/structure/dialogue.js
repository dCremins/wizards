export default class Dialogue extends Phaser.GameObjects.Text {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Controls
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor({scene, y, option, key='start', person} = {}) {
    const player = scene.registry.get('player');
    const width = (player.displayWidth / 2);
    const height = (player.displayHeight) / 3;
    const spacing = (player.displayHeight - (height * 2)) / 3;
    const x = player.x + (width * 2) + (spacing * 2) + player.displayWidth;

    super(scene, x, y, [option], {
      padding: 5,
      wordWrap: { width: scene.registry.get('width')-(player.displayWidth*2)-155}
    });

    this.setInteractive({ useHandCursor: false  });

    this.on('pointerover', () => {
      this.setBackgroundColor('#444');
    });

    this.on('pointerout', () => {
      this.setBackgroundColor('#000');
    });
    this.on('pointerup', () => {
      person.talk(key)
    });
  }
}
