"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrint = exports.BinaryTree = void 0;
class TreeNode {
    constructor(value) {
        this.data = null;
        this.left = null;
        this.right = null;
        this.data = value;
    }
}
class BinaryTree {
    constructor(array) {
        this.rootNode = null;
        this.array = [];
        this.array = array;
    }
    buildTree(array) {
        const rootNode = new TreeNode(array[Math.floor(array.length / 2)]);
        if (array.length < 1) {
            return null;
        }
        let leftArray = array.slice(0, Math.floor(array.length / 2));
        let rightArray = array.slice(Math.floor(array.length / 2) + 1);
        rootNode.left = this.buildTree(leftArray);
        rootNode.right = this.buildTree(rightArray);
        return (this.rootNode = rootNode);
    }
    sort(array) {
        if (array.length <= 1) {
            return array;
        }
        let leftArray = array.slice(0, Math.floor(array.length / 2));
        let rightArray = array.slice(Math.floor(array.length / 2));
        let newleftArray = this.sort(leftArray);
        let newrightArray = this.sort(rightArray);
        let resultArray = [];
        let leftindex = 0;
        let rightindex = 0;
        while (leftindex < newleftArray.length &&
            rightindex < newrightArray.length) {
            if (newleftArray[leftindex] === newrightArray[rightindex]) {
                resultArray.push(newleftArray[leftindex]);
                newrightArray.splice(rightindex, 1);
                leftindex++;
            }
            else if (newleftArray[leftindex] < newrightArray[rightindex]) {
                resultArray.push(newleftArray[leftindex]);
                leftindex++;
            }
            else {
                resultArray.push(newrightArray[rightindex]);
                rightindex++;
            }
        }
        return (this.array = resultArray.concat(newleftArray.slice(leftindex), newrightArray.slice(rightindex)));
    }
    insert(value) {
        const newNode = new TreeNode(value);
        let currentNode = this.rootNode;
        while (currentNode !== null) {
            if (currentNode.data == value) {
                return;
            }
            else if (currentNode.data > value) {
                if (currentNode.left !== null) {
                    currentNode = currentNode.left;
                }
                else {
                    return (currentNode.left = newNode);
                }
            }
            else if (currentNode.data < value) {
                if (currentNode.right !== null) {
                    currentNode = currentNode.right;
                }
                else {
                    return (currentNode.right = newNode);
                }
            }
        }
    }
    deleteItem(value) {
        let currentNode = this.rootNode;
        return deleteNode(currentNode, value);
        function getSuccessor(curr) {
            curr = curr.right;
            while (curr !== null && curr.left !== null) {
                curr = curr.left;
            }
            return curr;
        }
        function deleteNode(rootnode, x) {
            if (rootnode == null) {
                return rootnode;
            }
            if (rootnode.data > x) {
                rootnode.left = deleteNode(rootnode.left, x);
            }
            else if (rootnode.data < x) {
                rootnode.right = deleteNode(rootnode.right, x);
            }
            else {
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
    find(value) {
        let currentNode = this.rootNode;
        while (currentNode !== null) {
            if (currentNode.data === value) {
                return currentNode;
            }
            if (currentNode.data > value) {
                currentNode = currentNode.left;
            }
            else if (currentNode.data < value) {
                currentNode = currentNode.right;
            }
        }
    }
    levelOrder(callback) {
        if (callback == null) {
            throw "callback required";
        }
        let queue = [];
        let rootNode = this.rootNode;
        queue.push(rootNode);
        while (queue.length > 0) {
            let selectedNode = queue[0];
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
    inOrder(callback) {
        if (callback == null) {
            throw "callback required";
        }
        let rootNode = this.rootNode;
        visitNode(rootNode);
        function visitNode(node) {
            let currentNode = node;
            if (currentNode === null) {
                return;
            }
            else {
                visitNode(currentNode.left);
                callback(currentNode.data);
                visitNode(currentNode.right);
            }
        }
    }
    preOrder(callback) {
        if (callback == null) {
            throw "callback required";
        }
        let rootNode = this.rootNode;
        visitNode(rootNode);
        function visitNode(node) {
            if (node === null) {
                return node;
            }
            callback(node.data);
            visitNode(node.left);
            visitNode(node.right);
        }
    }
    postOrder(callback) {
        if (callback == null) {
            throw "callback required";
        }
        let rootNode = this.rootNode;
        visitNode(rootNode);
        function visitNode(node) {
            if (node === null) {
                return node;
            }
            visitNode(node.left);
            visitNode(node.right);
            callback(node.data);
        }
    }
    length(node) {
        let currentNode = node;
        let counter = 0;
        if (currentNode == null) {
            return counter;
        }
        if ((currentNode === null || currentNode === void 0 ? void 0 : currentNode.left) == null && (currentNode === null || currentNode === void 0 ? void 0 : currentNode.right) == null) {
            counter += 1;
            return counter;
        }
        if (this.length(currentNode.left) > this.length(currentNode.right) ||
            currentNode.right == null) {
            return this.length(currentNode.left) + 1;
        }
        if (this.length(currentNode.left) < this.length(currentNode.right) ||
            currentNode.left == null) {
            return this.length(currentNode.right) + 1;
        }
        else {
            return this.length(currentNode.left) + 1;
        }
    }
    depth(node) {
        if (node == null) {
            return "not in the tree";
        }
        let currentNode = this.rootNode;
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
        let currentNode = this.rootNode;
        let counter = 0;
        let tree = this;
        return checksubtree(currentNode);
        function checksubtree(noDe) {
            if (noDe === null) {
                return true;
            }
            if (noDe.left === null && noDe.right === null) {
                return true;
            }
            if (tree.length(noDe.left) - tree.length(noDe.right) < 2 &&
                tree.length(noDe.right) - tree.length(noDe.left) < 2) {
                if (checksubtree(noDe.left) == false ||
                    checksubtree(noDe.right) == false) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return false;
        }
    }
    rebalance() {
        this.array = [];
        this.inOrder((e) => this.array.push(e));
        console.log(this.array);
        this.buildTree(this.array);
    }
}
exports.BinaryTree = BinaryTree;
const prettyPrint = (node, prefix = "", isLeft = true) => {
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
exports.prettyPrint = prettyPrint;
