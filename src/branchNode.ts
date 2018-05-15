import * as Babylon from 'babylonjs';
import Branch from './branch';

export default class BranchNode {
  protected parentBranch : Branch;
  protected children : NodeChild[];
  protected position : Babylon.Vector3;

  constructor() {
    this.parentBranch = null;
    this.children = [];
  }

  addChildBranch(branch : Branch, angle : Babylon.Vector3) : BranchNode {
    this.children.push(new NodeChild(branch, angle));
    branch.setAngle(angle);
    return this;
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


