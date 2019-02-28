import Item from '@/items/item';

export default class Door extends Item {
  constructor({scene, x, y, sprite, name, description, bolted=true, locked=false, type='door', key, path} = {}) {
    super({scene, x, y, sprite, name, description, type, bolted});
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.locked = locked;
    this.key = key;
    this.path = path;
  }
}
