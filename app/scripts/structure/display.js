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
    const width = (scene.player.displayWidth / 2);
    const height = (scene.player.displayHeight) / 3;
    const spacing = (scene.player.displayHeight - (height * 2)) / 3;
    const x = scene.player.x + (width * 2) + (spacing * 2) + scene.player.displayWidth;

    super(scene, x, scene.player.y + spacing, '', {
      lineSpacing: 7,
      wordWrap: { width: scene.registry.get('width')-(scene.player.displayWidth*2)-30}
    });
    this.setOrigin(0);
  }

//  setText(text) {
//    this.setText(text)
//  }
}
