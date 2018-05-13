import * as Babylon from 'babylonjs';

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
      new Babylon.Vector3(0, 5, 10),
      this._scene);
    this._camera.setTarget(Babylon.Vector3.Zero());
    this._camera.attachControl(this._canvas, false);
    this._light = new Babylon.HemisphericLight('light1',
      new Babylon.Vector3(0,1,0),
      this._scene);

    let sphere = Babylon.MeshBuilder.CreateSphere('sphere1',
      { segments: 16, diameter: 2},
      this._scene);
    sphere.position.y = 1;

    let ground = Babylon.MeshBuilder.CreateGround('ground1',
      {width: 5, height: 6, subdivisions: 2},
      this._scene);
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
