// Given a binary tree, determine if it is a binary search tree

// Iterative

function validateBST(root) {
  if (root === null) {
    return true;
  }

  let stack = [[root, -Infinity, Infinity]];

  while (stack.length) {
    let [curr, low, high] = stack.pop();

    if (curr) {
      let val = curr.val;

      if (val <= low || val >= high) {
        return false;
      }

      stack.push([curr.right, val, high]);
      stack.push([curr.left, low, val]);
    }
  }

  return true;
}

// Explanation:
// -If root is null, return true
// -Push root to stack with lower bound of -Infinity and upper bound of Infinity
// -While stack has work:
// -Pop last node off stack
// -If not valid:
// -Get val from node
// -If val <= low bound or val >= high bound, return false
// -Push right child to stack with lower bound of val and same upper bound. If we go right, right can't be lower than curr val, which is why curr val is our lower bound.
// -Push left child to stack with same lower bound and upper bound of val. If we go left, left can't be higher than curr val, which is why curr val is our upper bound.
// -If we iterate through BST without returning false, we return true as tree is valid

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

let bst = new Node(2);
bst.left = new Node(1);
bst.right = new Node(3);
console.log(validateBST(bst));

// Recursive

function validateBST(root, low = -Infinity, high = Infinity) {
  if (root === null) {
    return true;
  }

  if (root.val <= low || root.val >= high) {
    return false;
  }

  return (
    validateBST(root.right, root.val, high) &&
    validateBST(root.left, low, root.val)
  );
}

// Explanation:
// -If root or curr node is null, return true and exit. For recursive call, this mean's we've made our way down to the leaf without returning false so we return true.
// -If root val or curr node val is <= low bound or root val or curr node val >= high bound, we return false
// -Return result of recursive call on right and left subtrees

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

let bst = new Node(2);
bst.left = new Node(1);
bst.right = new Node(3);
console.log(validateBST(bst));

// Implement search, add, and delete operations in a BST

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

function BinarySearchTree() {
  return {
    root: null,
    search: function (target) {
      let curr = this.root;

      while (curr) {
        if (curr.val < target) {
          curr = curr.right;
        } else if (curr.val > target) {
          curr = curr.left;
        } else {
          return curr;
        }
      }

      return null;
    },
    add: function (val) {
      let parent = null;
      let curr = this.root;

      while (curr) {
        parent = curr;
        curr = curr.val < val ? curr.right : curr.left;
      }

      if (parent === null) {
        this.root = new Node(val);
      } else if (parent.val < val) {
        parent.right = new Node(val);
      } else {
        parent.left = new Node(val);
      }
    },
    delete: function (node, parent) {
      if (node.left === null && node.right === null) {
        this.replaceChild(parent, node, null);
      } else if (node.left === null) {
        this.replaceChild(parent, node, node.right);
      } else if (node.right === null) {
        this.replaceChild(parent, node, node.left);
      } else {
        let successorParent = node;
        let successor = node.right;

        while (successor.left !== null) {
          successorParent = successor;
          successor = successor.left;
        }

        node.val = successor.val;
        this.delete(successor, successorParent);
      }
    },
    replaceChild: function (parent, oldChild, newChild) {
      if (parent === null) {
        this.root = newChild;
      } else if (parent.left === oldChild) {
        parent.left = newChild;
      } else if (parent.right === oldChild) {
        parent.right = newChild;
      } else {
        return false;
      }
    },
  };
}

// Explanation:
// -For search:
// -Set curr to root
// -While curr node not null:
// -If curr val < target, set curr to right child
// -Else if curr val > target, set curr to left child
// -Else return curr node if equal to target
// -If we iterate through without finding target, return null
// -For add:
// -Set parent to null and curr to root
// -While curr not null:
// -Set parent to curr
// -If curr val < insert val, set curr to right child, else set curr to left child
// -Once done, if parent is null, add node to root
// -Else if parent val < insert val, insert node as parent's right child
// -Else insert node as parent's left child
// -For delete:
// -If node is leaf, set parent's child pointer to null
// -If node has no left child, set parent's right pointer to node's right child
// -If node has no right child, set parent's left pointer to node's left child
// -Else if node has two children:
// -Set successor parent to node
// -Set successor to node's right child
// -While successor left not null:
// -Set successor parent to successor
// -Set successor to successor left child
// -Once done, set node val to successor val
// -Call delete on successor as node and sucessor parent as parent to continue deletion

// Notes:
// -Time complexity: O(h) for search, add, and delete, where h is the height of the BST
// -Space complexity: O(1) space for add and delete, O(h) space on the recursion stack for search

let bst = new BinarySearchTree();
bst.add(1);
bst.add(3);
bst.add(7);
bst.add(6);
bst.add(9);
bst.delete(bst.root.right, bst.root);
console.log(bst.search(9));
console.log(bst.root);

// Given a binary search tree that can contain duplicates, find the first occurrence of a target number for an inorder traversal

function findFirstOccurence(root, target) {
  let curr = root;
  let result = null;

  while (curr) {
    if (curr.val > target) {
      curr = curr.left;
    } else if (curr.val < target) {
      curr = curr.right;
    } else {
      result = curr;
      curr = curr.left;
    }
  }

  return result;
}

// Explanation:
// -Set curr to root
// -Set result to null
// -While curr not null:
// -If curr val > target, set curr to left child
// -If curr val < target, set curr to right child
// -Else curr equals target so we update result to curr and set curr to left child
// -Once we've traversed tree, return result

// Notes:
// -Time complexity: O(h), where h is the height of the tree
// -Space complexity: O(1)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bst = new Node(10);
bst.left = new Node(4);
bst.right = new Node(6);
bst.left.left = new Node(4);
bst.left.right = new Node(5);
console.log(findFirstOccurence(bst));

//  Given a node in a BST, find the node with the next largest value, also known as the successor of the node

function findSuccessor(node, root) {
  if (node.right) {
    let curr = node.right;

    while (curr.left) {
      curr = curr.left;
    }

    return curr;
  } else {
    let curr = root;
    let successor = null;

    while (curr) {
      if (curr.val > node.val) {
        successor = curr;
        curr = curr.left;
      } else if (curr.val < node.val) {
        curr = curr.right;
      } else if (curr === node) {
        break;
      }
    }

    return successor;
  }
}

// Explanation:
// -If node has right child:
// -Return leftmost node of right subtree
// -Else:
// -Set curr to root node and successor to null
// -While curr not null:
// -If curr val > node val, set successor to curr and go left
// -If curr val < node val, go right
// -Else if curr equals node, break and return successor

// Notes:
// -Time complexity: O(h), where h is the height of the tree
// -Space complexity: O(1)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bst = new Node(10);
bst.left = new Node(4);
bst.right = new Node(6);
bst.left.left = new Node(4);
bst.left.right = new Node(5);
console.log(findSuccessor(bst.right, bst));

// Given a binary search tree, find all the elements within a range

function rangeFindBST(root, low, high) {
  let stack = [root];
  let result = [];

  while (stack.length) {
    let curr = stack.pop();

    if (curr) {
      if (low <= curr.val && high >= curr.val) {
        result.push(curr);
      }
      if (low < curr.val) {
        stack.push(curr.left);
      }
      if (curr.val < high) {
        stack.push(curr.right);
      }
    }
  }

  return result;
}

// Explanation:
// -Push root to stack
// -Set result to empty array
// -While curr node not null:
// -Pop last node off stack and set to curr
// -If node is valid:
// -If within range, push to result
// -If curr val > low, push curr left child to stack
// -If curr val < high, push curr right child to stack
// Once done iterating through tree, return result

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

let bst = new Node(10);
bst.left = new Node(4);
bst.right = new Node(6);
bst.left.left = new Node(4);
bst.left.right = new Node(5);
console.log(rangeFindBST(bst, 1, 6));

// Given two nodes in a binary search tree, find the lowest common ancestor

function findLCA(root, a, b) {
  let curr = root;

  while (curr) {
    if (curr.val < a.val && curr.val < b.val) {
      curr = curr.right;
    } else if (curr.val > a.val && curr.val > b.val) {
      curr = curr.left;
    } else {
      return curr;
    }
  }

  return null;
}

// Explanation:
// -Set curr to root
// -While curr node not null
// -If curr < both nodes, go right
// -Else if curr > both nodes, go left
// -Else return curr node
// -If we traverse tree without returning node, return null

// Notes:
// Time complexity: O(h), where h is the height of the tree
// -Space complexity: O(1)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bst = new Node(10);
bst.left = new Node(4);
bst.right = new Node(6);
bst.left.left = new Node(3);
bst.left.right = new Node(5);
console.log(findLCA(bst, bst.left.left, bst.left.right));

// Given a sorted array, build a balanced binary search tree with the elements of the array

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

function buildTree(nums, start = 0, end = nums.length - 1) {
  if (start < 0 || end >= nums.length || start > end) {
    return null;
  }

  let mid = Math.floor(start + (end - start) / 2);
  let root = new Node(nums[mid]);
  root.left = buildTree(nums, start, mid - 1);
  root.right = buildTree(nums, mid + 1, end);
  return root;
}

// Explanation:
// -If start or end out of bounds or start > end, return null
// -Get middle index
// -Create root node with middle num
// -Create left subtree w/ nums start to mid - 1
// -Create right subtree w/ nums mid + 1 to end
// -Once done recursing, return root

console.log(buildTree([1, 3, 4, 5, 6, 7, 8]));

// Given a sorted linked list, build a balanced binary search tree with the elements of the linked list

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

function buildTreeLinkedList(head, tail) {
  function findMedian(head, tail) {
    if (head === null || tail === null) {
      return null;
    }

    let fast = head;
    let slow = head;
    let prevSlow = null;

    while (fast !== tail) {
      fast = fast.next;

      if (fast !== tail) {
        fast = fast.next;
        prevSlow = slow;
        slow = slow.next;
      }
    }

    return { prev: prevSlow, median: slow };
  }

  if (head === null || tail === null || tail.next === head) {
    return null;
  }

  let { prev, median } = findMedian(head, tail);
  let root = new Node(median.val);

  root.left = buildTreeLinkedList(head, prev);
  root.right = buildTreeLinkedList(median.next, tail);

  return root;
}

// Explanation:
// -If head or tail are null or if tail has cycle at head, return null
// -Get median node and prev node using slow and fast pointer
// -Set root to median val
// -Build left subtree with head through prev
// -Build right subtree with median's next node through tail
// -Once done recursing, return root

// Notes:
// -Time complexity: O(n log n), because finding the median takes O(n) time but we divide by two every time
// -Space complexity: O(n) space taken by the new tree

function LinkedList() {
  return {
    head: null,
    tail: null,
  };
}

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

let list = new LinkedList();
list.head = new ListNode(1);
list.head.next = new ListNode(2);
list.head.next.next = new ListNode(3);
list.head.next.next.next = new ListNode(4);
list.head.next.next.next.next = new ListNode(5);
list.tail = list.head.next.next.next.next;
console.log(buildTreeLinkedList(list.head, list.tail));
