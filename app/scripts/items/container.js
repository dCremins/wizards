import Item from '@/items/item';

export default class Container extends Item {
  constructor({scene, x, y, sprite, name, description, bolted=true, locked=false, type='container', key, contents=[]} = {}) {
    super({scene, x, y, sprite, name, description, type, bolted});
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.locked = locked;
    this.contents = contents;
    this.key = key;
  }

  put(scene, item) {
    if (!item) {
      return 'You aren\'t holding anything.';
    } else if (this.locked) {
      return 'It\'s locked.';
    } else {
      this.content.push(item);
      this.description.push('There appears to be '+item.description+' inside.');
      return 'success';
    }
  }
}
