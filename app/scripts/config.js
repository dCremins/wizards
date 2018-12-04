import * as scenes from '@/scenes';

const canvasWidth = window.innerWidth;
let playWidth;
if (canvasWidth >= 1000) {
  playWidth = 1000;
} else if (canvasWidth >= 800) {
  playWidth = 800;
} else if (canvasWidth >= 600) {
  playWidth = 600;
} else if (canvasWidth >= 400) {
  playWidth = 400;
} else {
  playWidth = 300;
}
export const width = playWidth;
export const height = window.innerHeight;
export const origin = 0;

export const zoom = 1;

export const resolution = 1;

export const type = Phaser.AUTO;

export const pixelArt = false;

export const transparent = false;

export const canvasStyle = 'display: block; margin: 0 auto;';

export const backgroundColor = '#000000';

export const physics = {
  default: 'arcade',
  arcade: {
    gravity: {y: 200}
  }
};

export const loader = {
  path: 'assets/'
};

export const plugins = {
  global: [],
  scene: []
};

export {title, version, url} from '@/../../package.json';

export const scene = Object.values(scenes);
