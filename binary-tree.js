class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (this.root === null) return 0;
    const minDepthHelper = (node) => {
      if (node === null) return Infinity;
      if (node.left === null && node.right === null) return 1;
      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    };
    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (this.root === null) return 0;
    const maxDepthHelper = (node) => {
      if (node === null) return 0;
      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    };
    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let result = 0;
    const maxSumHelper = (node) => {
      if (node === null) return 0;
      const leftMax = maxSumHelper(node.left);
      const rightMax = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftMax + rightMax);
      return Math.max(0, node.val + Math.max(leftMax, rightMax));
    };
    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    let result = null;
    const nextLargerHelper = (node) => {
      if (node === null) return;
      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }
      nextLargerHelper(node.left);
      nextLargerHelper(node.right);
    };
    nextLargerHelper(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    const findLevelAndParent = (node, target, level, parent) => {
      if (node === null) return null;
      if (node === target) return { level, parent };
      return (
        findLevelAndParent(node.left, target, level + 1, node) ||
        findLevelAndParent(node.right, target, level + 1, node)
      );
    };
    const node1Info = findLevelAndParent(this.root, node1, 0, null);
    const node2Info = findLevelAndParent(this.root, node2, 0, null);
    return node1Info.level === node2Info.level && node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    const serializeHelper = (node) => {
      if (node === null) return 'null';
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(node.right)}`;
    };
    return serializeHelper(tree.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(data) {
    const deserializeHelper = (dataArray) => {
      if (dataArray[0] === 'null') {
        dataArray.shift();
        return null;
      }
      const val = parseInt(dataArray[0], 10); // Convert the value back to a number
      dataArray.shift();
      const node = new BinaryTreeNode(val);
      node.left = deserializeHelper(dataArray);
      node.right = deserializeHelper(dataArray);
      return node;
    };
    const dataArray = data.split(',');
    return new BinaryTree(deserializeHelper(dataArray));
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    const lowestCommonAncestorHelper = (node, p, q) => {
      if (node === null || node === p || node === q) return node;
      const left = lowestCommonAncestorHelper(node.left, p, q);
      const right = lowestCommonAncestorHelper(node.right, p, q);
      if (left !== null && right !== null) return node;
      return left !== null ? left : right;
    };
    return lowestCommonAncestorHelper(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
