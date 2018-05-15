import * as Babylon from 'babylonjs';

import Pot from './pot';
import Branch from './branch';
import TrunkNode from './trunkNode';

export default class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: Babylon.Engine;
  private _scene: Babylon.Scene;  
  private _camera: Babylon.FreeCamera;
  private _light: Babylon.Light;

  constructor(canvasElement : string) {
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new Babylon.Engine(this._canvas, true);
  }

  createScene() : void {
    this._scene = new Babylon.Scene(this._engine);
    this._camera = new Babylon.FreeCamera('camera1', 
      new Babylon.Vector3(0, 2, 15),
      this._scene);
    this._camera.setTarget(Babylon.Vector3.Zero());
    this._camera.attachControl(this._canvas, false);
    this._light = new Babylon.HemisphericLight('light1',
      new Babylon.Vector3(0,1,0),
      this._scene);

    let pot = new Pot();
    pot.addToScene(this._scene);

    let trunk = new TrunkNode();


    let branch = new Branch('b1', 3).addToScene(this._scene);
    trunk.setChildBranch(branch, new Babylon.Vector3(-Math.PI/2, 0, 0));

    let secondNode = branch.endNode;
    let secondBranch = new Branch('b2',2).addToScene(this._scene);
    secondNode.addChildBranch(secondBranch, new Babylon.Vector3(0, 0, 0));
  }

  doRender() : void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

}
