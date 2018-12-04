

export default class Workshop extends Phaser.Scene {
  constructor() {
    super({key: 'Workshop'});
  }

  init(data) {
    this.player = data.player;
  }

  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  create(/* data */) {
    this.add.image(this.xCenter, 50, 'space').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);
    this.background = this.add.sprite(this.xCenter, 50, 'basement').setOrigin(0).setDisplaySize(this.playWidth, this.playHeight);
  }

  update(/* t, dt */) {
  }
}
