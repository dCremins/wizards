import Inventory from '@/structure/inventory';

export default class Player extends Phaser.GameObjects.Image {

  constructor(scene, sprite) {
    super(scene, 0, scene.registry.get('height')+30, sprite);
    this.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.setOrigin(0);
    this.inventory = [];
    let startX = scene.registry.get('width')-50;
    let startY = scene.registry.get('height')+30;
    this.inventoryPositions = [{x:startX, y:startY}, {x:startX-50, y:startY}, {x:startX-100, y:startY}, {x:startX, y:startY+50}, {x:startX-50, y:startY+50}, {x:startX-100, y:startY+50}]
    this.wrapper = scene;
  }

  setHat(scene, hat) {
    hat.setOrigin(0);
    hat.setPosition(0, scene.registry.get('height')+30);
    hat.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.hat = hat;
  }

  setClothes(scene, clothes) {
    clothes.setOrigin(0);
    clothes.setPosition(0, scene.registry.get('height')+30);
    clothes.setDisplaySize(this.width*scene.registry.get('ratio'), this.height*scene.registry.get('ratio'));
    this.clothes = clothes;
  }


  look(item) {
    let readout = [`It's ${item.description}.`];
    if(item.type === 'container') {
      let holder=`Inside looks to be`;
      for (let i = 0; i < item.contents.length; i++) {
        if (item.contents.length === 1) {
          readout.push(`Inside looks to be ${item.contents[i].description}.`)
        } else if ((i+1) === item.contents.length) {
          readout.push(`and ${item.contents[i].description}.`)
        } else if (i === 0) {
          readout.push(`Inside looks to be ${item.contents[i].description},`)
        } else {
          readout.push(`${item.contents[i].description},`)
        }
      }
    }
    this.wrapper.display.setText(readout)
  }

  tryTake(item) {
    if (this.inventory.length > 6) {
      this.wrapper.display.setText(`You're already carrying too much.`);
    } else if(item.type === 'container' && item.contents.length === 0) {
      this.wrapper.display.setText(`There's nothing inside to take.`);
    } else if (item.type !== 'container' && item.bolted === true) {
      this.wrapper.display.setText(`You probably shouldn't take that.`);
    } else {
      return true;
    }
    return false;
  }

  take(item) {
    let success = this.tryTake(item);
    if (success) {
      if(item.type === 'container') {
        this.wrapper.display.setText(`You put the ${item.name}'s contents in your bag.`);
        for(let i=0; i<item.contents.length; i++) {
          let content = item.contents[i];
          this.inventory.push(content);
          let position = this.inventoryPositions[this.inventory.indexOf(content)];
          content.setPosition(position.x, position.y);
          content.setDisplaySize(50, 50);
          content.visible = true;
          content.setInteractive({ useHandCursor: false  });
          this.wrapper.add.existing(content);
        }
        item.contents = []
      } else {
        this.inventory.push(item)
        this.wrapper.display.setText(`You put the ${item.name} in your bag.`);
        let position = this.inventoryPositions[this.inventory.indexOf(item)];
        item.setPosition(position.x, position.y);
        item.visible = true;
        item.setInteractive({ useHandCursor: false  });
        item.setDisplaySize(50, 50);
      }
    }

    this.wrapper.registry.set('mode', 'look');
    this.wrapper.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  hold(item) {
    if (this.inventory.includes(item)) {
      this.wrapper.registry.set('held', item);
      this.wrapper.display.setText(`You take out the ${item.name}. What do you want to do with it?`);
      return;
    } else if (item.type === 'container' || item.bolted === true) {
      this.wrapper.display.setText(`You probably shouldn't move that.`);
    } else {
      const success = this.tryTake(item);
      if (success) {
        this.wrapper.registry.set('held', item);
        this.wrapper.display.setText(`You pick up the ${item.name}. What do you want to do with it?`);
        return;
      }
    }
    this.wrapper.registry.set('mode', 'look');
    this.wrapper.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  use(item) {
    let held = this.wrapper.registry.get('held');
    if (!held) {
      this.hold(item);
      return;
    } else if (item.type === 'puzzle') {
      const success = item.solve(held);
      if (success) {
        if (this.inventory.includes(held)) {
          this.inventory.splice( this.inventory.indexOf(held), 1 );
        }
        held.destroy();
      } else {
        this.wrapper.display.setText(`This doesn't seem to work here.`);
      }
    } else if (item.type === 'container') {
      this.put(item);
    } else {
      this.wrapper.display.setText(`This doesn't seem to work here.`);
    }

    this.wrapper.registry.remove('held');
    this.wrapper.registry.set('mode', 'look');
    this.wrapper.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

  put(item) {
    let held = this.wrapper.registry.get('held');
    if (!held) {
      this.hold(item);
      return;
    } else if (item.type === 'container') {
      this.wrapper.display.setText(`You put the ${held.name} in the ${item.name}.`);
      held.visible = false;
      held.removeInteractive();
      item.contents.push(held);
    }

    this.wrapper.registry.remove('held');
    this.wrapper.registry.set('mode', 'look');
    this.wrapper.input.setDefaultCursor('url(assets/pointer.png), auto');
  }

}
