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
    right: null
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
    right: null
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
    right: null
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
    right: null
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
    right: null
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
    console.log('curr result is ', result);

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
    right: null
  };
}

let bt = new Node(1);
bt.left = new Node(2);
bt.right = new Node(3);
bt.left.left = new Node(4);
bt.left.right = new Node(5);
console.log(postorderTraverse(bt));
