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
      // todo: handle angle
      this.transformBranchByParentBranch(branch);
    }
    else {
      branch.setAngle(angle);
    }

    return this;
  }

  transformBranchByParentBranch(branch : Branch) : void {
    const { parentBranch } = this; 
    branch.mesh.rotationQuaternion = parentBranch.mesh.rotationQuaternion;
    const worldMatrix = parentBranch.mesh.getWorldMatrix();
    const newPosition = new Babylon.Vector3(0, 0, parentBranch.length);
    branch.mesh.position = Babylon.Vector3.TransformCoordinates(
      newPosition, 
      worldMatrix
    );
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


