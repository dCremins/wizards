export default class Dialogue extends Phaser.GameObjects.Text {
  /**
   *  My custom group.
   *
   *  @constructor
   *  @class Controls
   *  @extends Phaser.GameObjects.Group
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   */
  constructor(scene, height, option, person) {

    const control_width = (scene.player.displayWidth / 2);
    const control_height = (scene.player.displayHeight) / 3;
    const spacing = (scene.player.displayHeight - (control_height * 2)) / 3;
    const x = scene.player.x + (control_width * 2) + (spacing * 3) + scene.player.displayWidth;

    super(scene, x, height, option.text, {
      padding:5,
      width: scene.playWidth/2,
      wordWrap: { width: scene.playWidth/2}
    });

    this.setInteractive({ useHandCursor: false  });

    this.on('pointerover', () => {
      this.setBackgroundColor('#444');
    });

    this.on('pointerout', () => {
      this.setBackgroundColor('#000');
    });
    this.on('pointerup', () => {
      if (option.key === 'leave') {
        person.responses.clear(true, true);
        scene.display.setText('You leave '+person.name+' alone.');
        scene.mode = 'look';
        scene.input.setDefaultCursor('url(assets/pointer.png), auto');
        return;
      } else if (option.text === 'Back') {
        person.back(scene);
      } else {
        person.asked.push(option.key);
        person.respond(scene, option.key);
      }
    });
  }
}
