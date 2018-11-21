export default class Container extends Phaser.GameObjects.Image {
  /**
   *  My custom sprite.
   *
   *  @constructor
   *  @class Lamp
   *  @extends Phaser.GameObjects.Sprite
   *  @param {Phaser.Scene} scene - The scene that owns this sprite.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y, sprite, contents, description, name, locked) {
    super(scene, x, y, sprite);
    this.setDisplaySize(this.width*scene.ratio, this.height*scene.ratio);
    this.setOrigin(0);
    //  Add this game object to the owner scene.
    this.contents = [];
    this.name = name;
    this.locked = locked;
    this.setInteractive( { useHandCursor: false  } );
    this.description = ['It\'s '+description];

    this.on('pointerup', () => {
      switch(scene.mode) {
        case 'take':
          this.take(scene)
          break;
        case 'put':
          this.put(scene, scene.held)
          break;
        case 'use':
          this.use(scene, scene.held)
          break;
        default:
          scene.display.setText(this.description)
          break;
      }
    });
    contents.forEach((item)=> {
      this.contents.push(item)
      this.description.push('There appears to be '+item.info.description+' inside.')
    })

    scene.children.add(this)
  }

  put(scene, item) {
    if (!item) {
      scene.display.setText('You aren\'t holding anything.');
      return;
    } else if (this.locked) {
      this.use(scene, item)
    } else {
      this.contents.push(item)
      item.setActive(false)
      scene.inventory.remove(item, true)
      scene.display.setText('You put the '+item.info.name+' in the '+this.name+'.');
      this.description.push('There appears to be '+item.info.description+' inside.')
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  take(scene) {
    if (this.locked) {
      scene.display.setText('This '+this.name+' is locked.');
    } else if (this.contents.length <= 0) {
      scene.display.setText('There\'s nothing here to take.');
    } else {
      this.contents.forEach((item)=> {
        scene.inventory.store(scene, item)
        this.contents.splice( this.contents.indexOf(item), 1 )
        this.description.splice( this.description.indexOf(item.description), 1 )
      })
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  use(scene, item) {
    if (!item) {
      scene.display.setText('You aren\'t holding anything.');
    } else if (this.locked && this.locked === item.unlock) {
      item.destroy();
      this.locked = false;
      scene.display.setText('You opened the '+this.name+' .');
    } else {
      this.put(scene, item)
    }
    scene.mode = 'look';
    scene.input.setDefaultCursor('url(assets/pointer.png), auto');
  }
}
