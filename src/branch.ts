import * as Babylon from 'babylonjs';

import * as Bonsai from './types.d';

export default class Branch implements Bonsai.GameObject {
  private mesh : Babylon.Mesh;
  private length : number;
  private angle : Babylon.Vector3;

  constructor() {
    this.mesh = null;
    this.length = 0;
    this.angle = new Babylon.Vector3(0, 0, 0);
  }

  setAngle(angle : Babylon.Vector3) : Branch {
    this.angle = angle;
    return this;
  }

  setLength(length : number) : Branch {
    this.length = length;
    return this;
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
      new Babylon.Vector3(0, 0, this.length)
    ];

    this.mesh = Babylon.MeshBuilder.ExtrudeShapeCustom("star", {
      shape: myShape, 
      path: myPath, 
      sideOrientation: Babylon.Mesh.DOUBLESIDE,
      cap: Babylon.Mesh.CAP_ALL,
      updatable: true
    }, scene);

    this.mesh.rotation = this.angle;
  }
}

