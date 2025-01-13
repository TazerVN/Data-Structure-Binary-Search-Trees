import { BinaryTree, prettyPrint} from "./index.js";

function randomNumber(n, a){
    const RNGarray = []
    for (let i = 0; i < n; i++){
        RNGarray.push(Math.floor(Math.random() * a))
    }
    return RNGarray
}

const BST = new BinaryTree(randomNumber(20, 1000))

//Build the tree
BST.sort(BST.array)
BST.buildTree(BST.array)
prettyPrint(BST.rootNode)

//tree traversal
BST.preOrder((e) => console.log("PreOrder: " + e))
BST.inOrder((e) => console.log("InOrder: " + e))
BST.postOrder((e) => console.log("PostOrder: " + e))

//tree manipulation
BST.insert(100)
BST.insert(101)
BST.insert(102)
prettyPrint(BST.rootNode)
console.log(BST.isBalanced())
BST.rebalance()
prettyPrint(BST.rootNode)
console.log(BST.isBalanced())

