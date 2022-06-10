// Implement preorder traversal of a binary tree

// Recursive

function preorderRecurse(root) {
  if (root === null) {
    return null;
  }

  let result = [];

  dfs(root, result);

  return result;

  function dfs(root, result) {
    if (root === null) {
      return;
    }

    result.push(root);
    dfs(root.left, result);
    dfs(root.right, result);
  }
}

// Explanation:
// -If root null, return null
// -Set result to empty array
// -Perform dfs on node
// -For each node in dfs:
// -If root is null, return and exit recursion as we've reached max depth
// -Push node to result
// -Perform dfs on left and right children
// -Once done recursing on tree, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(preorderRecurse(bt));

// Iterative

function preorderTraverse(root) {
  let stack = [root];
  let result = [];

  while (stack.length) {
    let curr = stack.pop();

    if (curr) {
      stack.push(curr.right, curr.left);
      result.push(curr);
    }
  }

  return result;
}

// Explanation:
// -Push root to stack
// -Set result to empty array
// -While stack has work:
// -Pop last node off stack
// -If node valid:
// -Push right and left to stack
// -Push curr node to result
// -Once done working, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(preorderTraverse(bt));

// Implement inorder traversal of a binary tree

// Recursive

function inorderRecurse(root) {
  if (root === null) {
    return null;
  }

  let result = [];

  search(root, result);

  return result;

  function search(node, result) {
    if (node === null) {
      return;
    }

    search(node.left, result);
    result.push(node);
    search(node.right, result);
  }
}

// Explanation:
// -If root is null, return null
// -Perform search on root node
// -Keep recursing on left until we reach null
// -Push node to result
// -Recurse on right until we reach null

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(inorderRecurse(bt));

// Iterative

function inorderTraverse(root) {
  let result = [];
  let stack = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    result.push(curr);
    curr = curr.right;
  }

  return result;
}

// Explanation:
// -Set result and stack to empty arrays
// -Set curr to root
// -While curr not null or stack has work:
// -Traverse as far down to the left as possible from curr node, pushing each node on the way to stack
// -Once we're as far down as possible, pop leftmost from stack and set to curr
// -Push that curr node to result
// -Set curr to curr node's right
// -Once done iterating through tree, return result

// Notes:
// Time Complexity: O(n)
// Space Complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(inorderTraverse(bt));

// Implement postorder traversal of a binary tree

// Recursive

function postorderRecurse(root) {
  if (root === null) {
    return root;
  }

  let result = [];
  dfs(root, result);
  return result;

  function dfs(node, result) {
    if (node === null) {
      return null;
    }

    dfs(node.left, result);
    dfs(node.right, result);
    result.push(node);
  }
}

// Explanation:
// -If root is null return null
// -Perform dfs on root node
// -Recurse on left and right children
// -Once done recursing, push node to result

// Notes:
// Time Complexity: O(n)
// Space Complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(postorderRecurse(bt));

// Iterative

function postorderTraverse(root) {
  let stack = [root];
  let result = [];

  while (stack.length) {
    let curr = stack.pop();
    console.log("curr result is ", result);

    if (curr) {
      result.push(curr);
      stack.push(curr.left, curr.right);
    }
  }

  return result.reverse();
}

// Explanation:
// -Push root to stack
// -Initiate result as empty array
// -While stack has work:
// -Pop last node from stack and set to curr
// -If curr node not null:
// -Push curr to result
// -Push left and right to stack
// -Once done iterating through tree, return reversed result list

// Notes:
// Time Complexity: O(n)
// Space Complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(postorderTraverse(bt));

// Find the height of a binary tree

// Recursive (Bottom Up)

function findHeight(root) {
  if (root === null) {
    return -1;
  }

  return 1 + Math.max(findHeight(root.left), findHeight(root.right));
}

// Explanation:
// -If root is null, return -1
// -Return 1 + max of recursive call on left node and right node
// -The recursive call finds the height of the left and right subtrees

// Notes
// -Time complexity: O(n)
// -Space complexity: O(h) on the recursion stack, where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(findHeight(bt));

// Recursive (Top Down)

function findHeight(root) {
  let height = -1;
  dfs(root, -1);
  return height;

  function dfs(node, prev) {
    if (node === null) {
      return;
    }

    let curr = prev + 1;

    if (curr > height) {
      height = curr;
    }

    dfs(node.left, curr);
    dfs(node.right, curr);
  }
}

// Explanation:
// -Set max height to -1
// -Perform dfs on root node
// -In dfs, for each node:
// -If node null, return and exit out of search
// -Set curr height to prev height + 1
// -If curr height > curr max height, update max height to curr height
// -Visit all nodes and left and right subtrees and update height

// Notes
// -Time complexity: O(n)
// -Space complexity: O(h) on the recursion stack, where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(findHeight(bt));

// Iterative

function findHeight(root) {
  if (root === null) {
    return 0;
  }

  let stack = [[root, 0]];
  let max = -Infinity;

  while (stack.length) {
    let [curr, height] = stack.pop();
    if (curr) {
      max = Math.max(max, height);
      stack.push([curr.left, height + 1], [curr.right, height + 1]);
    }
  }

  return max;
}

// Explanation:
// -If root null, return 0
// -Push root and initial height of 0 to stack
// -Set max to -infinity
// -While stack has work:
// -Pop last node off stack and get curr node and height
// -If node not null:
// -Updated max to greater of max or curr node height
// -Push left and right nodes and their heights to stack
// -Once done iterating through tree, return max

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(h), where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(findHeight(bt));

// Given a binary tree, find if it is balanced or not

function isBalanced(root) {
  function dfs(node) {
    if (node === null) {
      return 0;
    }

    let left = 1 + dfs(node.left);
    let right = 1 + dfs(node.right);

    if (Math.abs(left - right) > 1) {
      return Infinity;
    }

    return Math.max(left, right);
  }

  return dfs(root) === Infinity ? false : true;
}

// Explanation:
// -Our function goes all the way to the bottom and checks height at all subtree levels
// -If diff is > 1, we return Infinity, as it will prevent our max height calculation from updating subtree heights on way up
// -Else we return max of left and right subtrees

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(h) on the recursion stack, where h is the height of our tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(6);
bt.left.left.right = new Node(5);
console.log(isBalanced(bt));

// Find the diameter of a binary tree. The diameter is the longest path from any 2 nodes in the tree.

function binaryTreeDiameter(root) {
  let diameter = 0;

  dfs(root);
  return diameter;

  function dfs(node) {
    if (node === null) {
      return 0;
    }

    let left = dfs(node.left);
    let right = dfs(node.right);

    diameter = Math.max(diameter, left + right);
    return Math.max(left, right) + 1;
  }
}

// Explanation:
// -Initalize an integer variable diameter to keep track of the longest path we find from the DFS
// -Implement a recursive function which takes a node as input. It should recursively explore the entire tree rooted at the given node. Once it's finished, it should return the longest path out of its left and right branches:
// -If node is None, we have reached the end of the tree, hence we should return 0
// -We want to recursively explore node's children, so we call our recursive function again with node's left and right children. In return, we get the longest path of its left and right children left path and right path
// -If left path plus right path is longer than the current longest diameter found, then we need to update diameter
// -Finally, we return the longer one of left path and right path and add 1 to account for the edge connecting our path to its parent

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(h) on the recursion stack, where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(6);
bt.left.left.right = new Node(5);
console.log(binaryTreeDiameter(bt));

// Given a Binary Tree, print all paths from root to leaf

function printPaths(root) {
  dfs(root);

  function dfs(node, memo = []) {
    if (node === null) {
      return;
    }

    memo.push(node.val);

    if (node.left === null && node.right === null) {
      console.log("path found ", memo);
    }

    dfs(node.left, memo);
    dfs(node.right, memo);
    memo.pop();
  }
}

// Explanation:
// -Traverse down left and right subtrees until we reach leaves
// -Once we reach leaf, we print path and pop it off of memo stack

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(h) on both the memo and recursion stack, where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(6);
bt.left.left.right = new Node(5);
console.log(printPaths(bt));

// Given a binary tree and two nodes A and B, find their lowest common ancestor. Assume that each node has a pointer to its parent node.

function lowestCommonAncestor(a, b) {
  if (a === null || b === null) {
    return null;
  }

  let pointerA = a;
  let pointerB = b;
  let depthA = -1;
  let depthB = -1;

  while (pointerA) {
    depthA++;
    pointerA = pointerA.parent;
  }
  while (pointerB) {
    depthB++;
    pointerB = pointerB.parent;
  }

  let lowestNode = depthA > depthB ? a : b;
  let highestNode = depthA > depthB ? b : a;

  for (let i = 0; i < Math.abs(depthA - depthB); i++) {
    lowestNode = lowestNode.parent;
  }
  while (lowestNode !== highestNode) {
    lowestNode = lowestNode.parent;
    highestNode = highestNode.parent;
  }

  return lowestNode;
}

// Explanation:
// -If either node A or B are null, return null as no ancestor exists
// -Set pointer A to node A and pointer B to node B
// -Set depth A to -1 and depth B to -1
// -For both A and B, traverse up until we reach root and increase depth at each pass
// -If depth A > depth B, set lowest node to A and highest node to B
// -Else set lowest node to B and highest node to A
// -Raise lowest node to same depth as highest node
// -While lowest node not equal to highest node, raise each node until they converge
// -Once nodes converge, return lowest or highest nodes

// Notes:
// -Time complexity: O(h), where h is the height of the binary tree
// -Space complexity: O(1)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
    parent: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
bt.left.parent = bt;
bt.right.parent = bt;
bt.left.left.parent = bt.left;
bt.left.right.parent = bt.left;
console.log(lowestCommonAncestor(bt.left.left, bt.right));

// Given 2 nodes of a tree A and B, find their lowest common ancestor

function lowestCommonAncestor(root, a, b, message = "root") {
  console.log(`recursive call, ${root} is being called from ${message}`);
  if (root === null || root === a || root === b) {
    return root;
  }

  let leftAncestor = lowestCommonAncestor(root.left, a, b, "left");
  let rightAncestor = lowestCommonAncestor(root.right, a, b, "right");

  if (leftAncestor !== null && rightAncestor !== null) {
    return root;
  }

  return leftAncestor !== null ? leftAncestor : rightAncestor;
}

// Explanation:
// -If curr node is null, we return null and exit
// -If curr node is a or b, we return curr node and exit
// -If curr node not a or b, we check left and right subtrees
// -If left or right ancestor not equal to null, that means we found a or b in each subtree and the curr node is the LCA. This is the only case where left ancestor and right ancestor are not null.
// -Now we know either left ancestor or right ancestor is null, so we return whichever is not null to our recursive function. This ensures that an LCA found in a subtree is propagated up.

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(h) on the recursion stack
// -Alternatively, we could solve this iteratively by iterating through tree and assigning parents up to nodes a and b and working our way backwards up the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(6);
bt.left.left.right = new Node(5);
console.log(lowestCommonAncestor(bt, bt.left.left.right, bt.right));

// Given inorder and preorder traversals of a binary tree, reconstruct the binary tree

function buildTree(preorder, inorder) {
  let map = new Map();

  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  let preorderIdx = 0;

  return arrayToTree(preorder, 0, preorder.length - 1);

  function arrayToTree(preorder, left, right) {
    if (left > right) {
      return null;
    }

    let rootValue = preorder[preorderIdx];
    let root = new Node(rootValue);
    preorderIdx++;

    root.left = arrayToTree(preorder, left, map.get(rootValue) - 1);
    root.right = arrayToTree(preorder, map.get(rootValue) + 1, right);

    return root;
  }
}

// Explanation:
// -Push inorder vals to map with their respective indexes
// -Set preorder index to 0
// -Call array to tree on full preorder array
// -For array to tree:
// -If left > right, return null
// -Get root value at current preorder index
// -Create node w/ that value
// -Increase preorder index by 1
// -Create left subtree by using 0 and inorder index - 1 as bounds
// -Create right subtree by using inorder index + 1 and preorder length as bounds
// -Once done create nodes at all depths, return root

// Notes:
// -Time complexity: O(n) for both building hashmap and building tree
// -Space complexity: O(n) for both building the hashmap and storing the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
