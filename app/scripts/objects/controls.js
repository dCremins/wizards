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
    const x = scene.player.x + scene.player.displayWidth;
    const height = (scene.player.displayHeight) / 3
    const spacing = (scene.player.displayHeight - (height * 2)) / 3
    const y = scene.player.y + spacing;
    const width = (scene.player.displayWidth / 2)

    this.addMultiple([
      new ControlButton(scene, x, y, 'Look', 'look', 'url(assets/pointer.png), auto'),
      new ControlButton(scene, x, y + spacing + height, 'Take', 'take', 'url(assets/take.cur), pointer'),
      new ControlButton(scene, x + spacing + width, y, 'Use', 'use', 'pointer'),
      new ControlButton(scene, x + spacing + width, y + spacing + height, 'Talk', 'talk', 'pointer')
    ], true)
  }
}
