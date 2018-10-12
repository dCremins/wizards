export default class ControlButton extends Phaser.GameObjects.Text {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Controls
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene, height, label, mode, cursor) {
    super(scene, scene.xCenter+170, height, label, {backgroundColor:'#5b84c6', padding:5});

    this.setInteractive({ useHandCursor: false  })

    this.on('pointerover', () => {
      this.setBackgroundColor('#9ebced')
      this.setColor('#313b4c')
    })

    this.on('pointerout', () => {
      this.setBackgroundColor('#5b84c6')
      this.setColor('#ffffff')
    })

    this.on('pointerup', () => {
      scene.mode = mode;
      scene.input.setDefaultCursor(cursor)
    });
  }
}
