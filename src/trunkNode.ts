import * as Babylon from 'babylonjs';
import BranchNode from './branchNode';
import Branch from './branch';

export default class TrunkNode extends BranchNode {
  constructor() {
    super();
    this.setPosition(new Babylon.Vector3(0, 0, 0));
  }

  setChildBranch(branch : Branch, angle : Babylon.Vector3) : TrunkNode {
    this.children = [];
    this.addChildBranch(branch, angle);
    return this;
  }
}
