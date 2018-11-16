import ControlButton from '@/objects/control-button';

export default class Controls extends Phaser.GameObjects.Group {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Controls
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene) {
    super(scene);
    const row = scene.xCenter+scene.player.displayWidth;
    const column = scene.playHeight+50;
    const spacing = (scene.player.displayHeight-90)/2

    this.addMultiple([
      new ControlButton(scene, row, column+spacing, 'Look', 'look', 'url(assets/pointer.png), auto'),
      new ControlButton(scene, row, column+spacing+50, 'Take', 'take', 'url(assets/take.cur), pointer'),
      new ControlButton(scene, row+75, column+spacing, 'Use', 'use', 'pointer'),
      new ControlButton(scene, row+75, column+spacing+50, 'Talk', 'talk', 'pointer')
    ], true)
  }
}
