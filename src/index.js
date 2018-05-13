import * as BABYLON from 'babylonjs';

import Game from './game.ts';


window.addEventListener('DOMContentLoaded', () => {
  let game = new Game('renderCanvas');

  game.createScene();
  game.doRender();
});
