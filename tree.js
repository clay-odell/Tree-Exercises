/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const sumNodeVals = (node) => {
      if(node === null) return 0;
      let sum = node.val;
      for (let child of node.children) {
        sum += sumNodeVals(child)
      }
      return sum;
    }
    return sumNodeVals(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const evenNodeVals = (node) => {
      if (node === null) return 0;
      let count = 0;
      if (node.val %2 === 0) {
        count = 1;
      }
      for (let child of node.children){
        count += evenNodeVals(child);
      }
      return count;
    }
    return evenNodeVals(this.root)
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const countGreaterVals = (node) => {
    if (node === null) return 0;
    let count = 0;
    if (node.val > lowerBound) {
      count = 1;
    }
    for (let child of node.children){
      count += countGreaterVals(child);
    }
    return count;
  }
  return countGreaterVals(this.root);
}
}

module.exports = { Tree, TreeNode };
