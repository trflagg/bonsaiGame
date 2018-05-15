import * as Babylon from 'babylonjs';

import * as Bonsai from './types.d';
import BranchNode from './branchNode';

const USE_LINES = false;

export default class Branch implements Bonsai.GameObject {
  private angle : Babylon.Vector3;
  private position : Babylon.Vector3;
  private parentNode : BranchNode;

  public endNode : BranchNode;
  public id : string;
  public mesh : Babylon.Mesh;
  public length : number;

  constructor(id : string, length : number) {
    this.id = id;
    this.mesh = null;
    this.length = length;
    this.angle = new Babylon.Vector3(0, 0, 0);
    this.endNode = new BranchNode().setParentBranch(this);
    this.position = new Babylon.Vector3(0, 0, 0);
  }

  setAngle(angle : Babylon.Vector3) : Branch {
    this.angle = angle;
    if (this.mesh) {
      this.mesh.rotation = angle;
    }
    return this;
  }

  setLength(length : number) : Branch {
    this.length = length;
    return this;
  }

  setPosition(position : Babylon.Vector3) : Branch {
    this.position = position;
    if (this.endNode) {
      this.endNode.setPosition(position);
    }
    if (this.mesh) {
      this.mesh.position = position;
    }
    return this;
  }

  setParentMesh(parent : Branch) : Branch {
    if (parent && parent.mesh && this.mesh) {
      this.mesh.parent = parent.mesh;
    }
    return this;
  }

  setParentNode(parentNode : BranchNode) : Branch {
    this.parentNode = parentNode;
    return this;
  }

  addToScene(scene : Babylon.Scene) : Branch {
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

    if (USE_LINES) {
      this.mesh = Babylon.MeshBuilder.CreateLines(this.id, {
        points: myPath,
      }, scene);
      this.mesh.position = this.position;
      this.mesh.rotation = this.angle;
    }
    else {
      this.mesh = Babylon.MeshBuilder.ExtrudeShapeCustom(this.id, {
        shape: myShape,
        path: myPath,
        sideOrientation: Babylon.Mesh.DOUBLESIDE,
        cap: Babylon.Mesh.CAP_ALL,
        updatable: true
      }, scene);
    }

    return this;
  }
}

