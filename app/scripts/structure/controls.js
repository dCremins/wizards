import ControlButton from '@/structure/control-button';

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
    const x = scene.player.x + scene.player.displayWidth+5;
    const height = (scene.player.displayHeight) / 3;
    const spacing = (scene.player.displayHeight - (height * 2)) / 3;
    const y = scene.player.y + spacing;
    const width = (scene.player.displayWidth / 2);

    this.addMultiple([
      new ControlButton({
        scene: scene,
        x: x,
        y: y + spacing + height,
        label: 'Look',
        mode: 'look',
        cursor: 'url(assets/pointer.png), auto'
      }),
      new ControlButton({
        scene: scene,
        x: x,
        y: y,
        label: 'Take',
        mode: 'take',
        cursor: 'url(assets/take.png), auto'
      }),
      new ControlButton({
        scene: scene,
        x: x + spacing + width,
        y: y,
        label: 'Use',
        mode: 'use',
        cursor: 'url(assets/use.png), auto'
      }),
      new ControlButton({
        scene: scene,
        x: x + spacing + width,
        y: y + spacing + height,
        label: 'Talk',
        mode: 'talk',
        cursor: 'url(assets/pointer.png), auto'
      })
    ], true);
  }
}
