export default class Display extends Phaser.GameObjects.Text {
  /**
   *  My custom object.
   *
   *  @class Display
   *  @constructor
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    //  TODO: Stub.
    super(scene, scene.xCenter+270, scene.playHeight+60, '', {
      lineSpacing: 7,
      wordWrap: { width: scene.playWidth/2}
    });
  }

//  setText(text) {
//    this.setText(text)
//  }
}
