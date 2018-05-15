import * as Babylon from 'babylonjs';

import * as Bonsai from './types.d';

export default class Branch implements Bonsai.GameObject {
  private mesh : Babylon.Mesh;

  constructor() {
    this.mesh = null;
  }

  addToScene(scene : Babylon.Scene) : void {
    let myShape = [
      new Babylon.Vector3(0.25, 0.5, 0),
      new Babylon.Vector3(0.5, 0.25, 0),
      new Babylon.Vector3(0.5, -0.25, 0),
      new Babylon.Vector3(0.25, -0.5, 0),
      new Babylon.Vector3(-0.25, -0.5, 0),
      new Babylon.Vector3(-0.5, -0.25, 0),
      new Babylon.Vector3(-0.5, 0.25, 0),
      new Babylon.Vector3(-0.25, 0.5, 0),
      new Babylon.Vector3(0.25, 0.5, 0),
    ];

    let myPath = [
      new Babylon.Vector3(0, 0, 0),
      new Babylon.Vector3(0, 0, 1)
    ];

    this.mesh = Babylon.MeshBuilder.ExtrudeShapeCustom("star", {
      shape: myShape, 
      path: myPath, 
      sideOrientation: Babylon.Mesh.DOUBLESIDE,
      cap: Babylon.Mesh.CAP_ALL,
      updatable: true
    }, scene);

    this.mesh.rotate(Babylon.Axis.X, -(Math.PI/2), Babylon.Space.LOCAL);
  }
}

