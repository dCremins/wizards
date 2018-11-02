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
      new ControlButton(scene, scene.playHeight+60, 'Look', 'look', 'url(assets/pointer.png), auto'),
      new ControlButton(scene, scene.playHeight+90, 'Take', 'take', 'url(assets/take.cur), pointer'),
      new ControlButton(scene, scene.playHeight+120, 'Use', 'use', 'pointer')
    ], true)
  }
}
