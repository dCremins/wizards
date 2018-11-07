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

    this.addMultiple([
      new ControlButton(scene, scene.playHeight+65, 'Look', 'look', 'url(assets/pointer.png), auto'),
      new ControlButton(scene, scene.playHeight+100, 'Take', 'take', 'url(assets/take.cur), pointer'),
      new ControlButton(scene, scene.playHeight+135, 'Use', 'use', 'pointer'),
      new ControlButton(scene, scene.playHeight+170, 'Talk', 'talk', 'pointer')
    ], true)
  }
}
