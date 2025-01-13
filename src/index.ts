class TreeNode {
  data: any = null;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.data = value;
  }
}

class BinaryTree {
  rootNode: TreeNode | null = null;
  array: Array<number> = [];

  constructor(array: Array<number>) {
    this.array = array;
  }

  buildTree(array: Array<number>) {
    const rootNode = new TreeNode(array[Math.floor(array.length / 2)]);
    if (array.length < 1) {
      return null;
    }
    let leftArray: Array<number> = array.slice(0, Math.floor(array.length / 2));
    let rightArray: Array<number> = array.slice(
      Math.floor(array.length / 2) + 1
    );
    rootNode.left = this.buildTree(leftArray);
    rootNode.right = this.buildTree(rightArray);

    return (this.rootNode = rootNode);
  }

  sort(array: Array<number>) {
    if (array.length <= 1) {
      return array;
    }
    let leftArray: Array<number> = array.slice(0, Math.floor(array.length / 2));
    let rightArray: Array<number> = array.slice(Math.floor(array.length / 2));
    let newleftArray: Array<number> = this.sort(leftArray);
    let newrightArray: Array<number> = this.sort(rightArray);

    let resultArray: Array<number> = [];
    let leftindex: number = 0;
    let rightindex: number = 0;

    while (
      leftindex < newleftArray.length &&
      rightindex < newrightArray.length
    ) {
      if (newleftArray[leftindex] === newrightArray[rightindex]) {
        resultArray.push(newleftArray[leftindex]);
        newrightArray.splice(rightindex, 1);
        leftindex++;
      } else if (newleftArray[leftindex] < newrightArray[rightindex]) {
        resultArray.push(newleftArray[leftindex]);
        leftindex++;
      } else {
        resultArray.push(newrightArray[rightindex]);
        rightindex++;
      }
    }
    return (this.array = resultArray.concat(
      newleftArray.slice(leftindex),
      newrightArray.slice(rightindex)
    ));
  }

  insert(value: number) {
    const newNode = new TreeNode(value);
    let currentNode: any = this.rootNode;
    while (currentNode !== null) {
      if (currentNode.data == value) {
        return;
      } else if (currentNode.data > value) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          return (currentNode.left = newNode);
        }
      } else if (currentNode.data < value) {
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          return (currentNode.right = newNode);
        }
      }
    }
  }

  deleteItem(value: number) {
    let currentNode = this.rootNode;
    return deleteNode(currentNode, value);

    function getSuccessor(curr: any) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    }

    function deleteNode(rootnode: any, x: number) {
      if (rootnode == null) {
        return rootnode;
      }
      if (rootnode.data > x) {
        rootnode.left = deleteNode(rootnode.left, x);
      } else if (rootnode.data < x) {
        rootnode.right = deleteNode(rootnode.right, x);
      } else {
        if (rootnode.right === null) {
          return rootnode.left;
        }
        if (rootnode.left === null) {
          return rootnode.right;
        }
        let successor = getSuccessor(rootnode);
        rootnode.data = successor.data;
        rootnode.right = deleteNode(rootnode.right, successor.data);
      }
      return rootnode;
    }
  }

  find(value: number) {
    let currentNode: any = this.rootNode;
    while (currentNode !== null) {
      if (currentNode.data === value) {
        return currentNode;
      }
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        currentNode = currentNode.right;
      }
    }
  }

  levelOrder(callback: any) {
    if (callback == null) {
      throw "callback required";
    }
    let queue = [];
    let rootNode: any = this.rootNode;

    queue.push(rootNode);

    while (queue.length > 0) {
      let selectedNode: TreeNode = queue[0];
      callback(selectedNode.data);
      if (selectedNode.left !== null) {
        queue.push(selectedNode.left);
      }
      if (selectedNode.right !== null) {
        queue.push(selectedNode.right);
      }
      queue.splice(0, 1);
    }
  }

  inOrder(callback: any) {
    if (callback == null) {
      throw "callback required";
    }
    let rootNode: any = this.rootNode;
    visitNode(rootNode);

    function visitNode(node: TreeNode | null) {
      let currentNode = node;
      if (currentNode === null) {
        return;
      } else {
        visitNode(currentNode.left);
        callback(currentNode.data);
        visitNode(currentNode.right);
      }
    }
  }

  preOrder(callback: any) {
    if (callback == null) {
      throw "callback required";
    }
    let rootNode: any = this.rootNode;
    visitNode(rootNode);

    function visitNode(node: TreeNode | null) {
      if (node === null) {
        return node;
      }
      callback(node.data);
      visitNode(node.left);
      visitNode(node.right);
    }
  }

  postOrder(callback: any) {
    if (callback == null) {
      throw "callback required";
    }
    let rootNode: any = this.rootNode;
    visitNode(rootNode);

    function visitNode(node: TreeNode | null) {
      if (node === null) {
        return node;
      }
      visitNode(node.left);
      visitNode(node.right);
      callback(node.data);
    }
  }

  length(node: TreeNode | null): number {
    let currentNode = node;
    let counter: number = 0;
    if (currentNode == null) {
      return counter;
    }
    if (currentNode?.left == null && currentNode?.right == null) {
      counter += 1;
      return counter;
    }
    if (
      this.length(currentNode.left) > this.length(currentNode.right) ||
      currentNode.right == null
    ) {
      return this.length(currentNode.left) + 1;
    }
    if (
      this.length(currentNode.left) < this.length(currentNode.right) ||
      currentNode.left == null
    ) {
      return this.length(currentNode.right) + 1;
    } else {
      return this.length(currentNode.left) + 1;
    }
  }

  depth(node: TreeNode): any {
    if (node == null) {
      return "not in the tree";
    }
    let currentNode: any = this.rootNode;
    let counter = 0;
    while (currentNode !== null) {
      if (currentNode == node) {
        return (counter += 1);
      }
      if (currentNode.data > node.data) {
        counter += 1;
        currentNode = currentNode.left;
      }
      if (currentNode.data < node.data) {
        counter += 1;
        currentNode = currentNode.right;
      }
    }
    return;
  }

  isBalanced() {
    let currentNode: any = this.rootNode;
    let counter: number = 0;
    let tree = this;

    return checksubtree(currentNode);

    function checksubtree(noDe: TreeNode | null) {
      if (noDe === null) {
        return true;
      }
      if (noDe.left === null && noDe.right === null) {
        return true;
      }
      if (
        tree.length(noDe.left) - tree.length(noDe.right) < 2 &&
        tree.length(noDe.right) - tree.length(noDe.left) < 2
      ) {
        if (
          checksubtree(noDe.left) == false ||
          checksubtree(noDe.right) == false
        ) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
  }

  rebalance() {
    this.array = [];
    this.inOrder((e: any) => this.array.push(e));
    console.log(this.array);
    this.buildTree(this.array);
  }
}


const prettyPrint = (node: any, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export{BinaryTree, prettyPrint}
