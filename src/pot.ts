import * as Babylon from 'babylonjs';

export default class Pot {
  private mesh : Babylon.Mesh;

  constructor() {
    this.mesh = null;
  }

  addToScene(scene : Babylon.Scene) : void {
    this.mesh = Babylon.MeshBuilder.CreateBox('pot', {
      width: 12,
      height: 3,
      depth: 6,
    }, scene);
    this.mesh.translate(Babylon.Axis.Y, -1.5, Babylon.Space.WORLD);
  }
}

