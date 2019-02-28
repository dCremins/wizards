export default class ControlButton extends Phaser.GameObjects.Text {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Controls
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor({scene, x, y, label, mode, cursor} = {}) {
    super(scene, x, y, label, {
      backgroundColor:'#5b84c6',
      padding:5
    });
    this.setOrigin(0);
    this.setDisplaySize(scene.player.displayWidth / 2, scene.player.displayHeight / 3);

    this.setInteractive({ useHandCursor: false  });

    this.on('pointerover', () => {
      this.setBackgroundColor('#9ebced');
      this.setColor('#313b4c');
    });

    this.on('pointerout', () => {
      this.setBackgroundColor('#5b84c6');
      this.setColor('#ffffff');
    });

    this.on('pointerup', () => {
      scene.registry.set('mode', mode);
      console.log(mode);
      scene.input.setDefaultCursor(cursor);
    });
  }
}
