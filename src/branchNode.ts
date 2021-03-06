import * as Babylon from 'babylonjs';
import Branch from './branch';

export default class BranchNode {
  protected parentBranch : Branch;
  protected children : NodeChild[];
  protected position : Babylon.Vector3;

  constructor() {
    this.parentBranch = null;
    this.children = [];
    this.position = new Babylon.Vector3(0, 0, 0);
  }

  addChildBranch(branch : Branch, angle : Babylon.Vector3) : BranchNode {
    const { parentBranch } = this; 
    this.children.push(new NodeChild(branch, angle));
    branch.setParentNode(this);
    if (parentBranch && parentBranch.mesh && branch.mesh) {
      branch.setParentMesh(parentBranch);
      this.transformBranchByParentBranch(branch, angle);
    }
    else {
      branch.setAngle(angle);
    }

    return this;
  }

  transformBranchByParentBranch(branch : Branch, angle : Babylon.Vector3) : void {
    const { parentBranch } = this; 
    branch.mesh.translate(
      new Babylon.Vector3(0, 0, 1),
      parentBranch.length,
      Babylon.Space.WORLD
    );
    branch.setAngle(angle);
  }

  setParentBranch(parentBranch : Branch) : BranchNode {
    this.parentBranch = parentBranch;
    return this;
  }

  setPosition(position : Babylon.Vector3) : BranchNode {
    this.position = position;
    return this;
  }
}


class NodeChild {
  protected branch : Branch;
  protected angle : Babylon.Vector3;

  constructor(branch : Branch, angle : Babylon.Vector3) {
    this.branch = branch;
    this.angle = angle;
  }
}


