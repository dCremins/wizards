import Player from '@/people/player';
import Display from '@/structure/display';
import Controls from '@/structure/controls';
import Item from '@/items/item';


export default class Wrapper extends Phaser.Scene {
  constructor() {
    super({key: 'Wrapper'});
  }

  init(/* data */) {
  }

  preload() {
    this.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  create(/* data */) {

    this.player = this.add.existing(new Player(this, 'base'));
    this.registry.set('player', this.player);
    const clothes = this.add.existing(new Item({
      scene: this,
      x: 0,
      y: this.registry.get('height')+50,
      sprite: 'robe',
      name: 'apprentice robes',
      description: 'a long robe, worn by wizard\'s apprentices',
    }));
    this.player.setClothes(this, clothes);

    const hat = this.add.existing(new Item({
      scene: this,
      x: 0,
      y: this.registry.get('height')+50,
      sprite: 'apprentice_hat',
      name: 'apprentice hat',
      description: 'a long hood with a star on the end, worn by wizard\'s apprentices',
    }));

    this.player.setHat(this, hat);

    this.controls = this.add.existing(new Controls(this));
    this.display = this.add.existing(new Display(this));
    this.registry.set('mode', 'look');

    this.scene.launch('Workshop');
    this.scene.launch('Basement');
    this.scene.sleep('Workshop');

    this.registry.set('room', 'Basement');
    this.registry.set('wrapper', this);
  }

  move(next) {
    let current = this.registry.get('room');
    this.scene.sleep(current);
    this.scene.wake(next);
    this.registry.set('room', next);
  }

  update(/* t, dt */) {
  }

  render() {
  }

  shutdown() {
  }

  destroy() {
  }
}
