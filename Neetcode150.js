// 1. Two Sum

var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    let diff = target - curr;
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(curr, i);
  }
  return -1;
};

// Explanation:
// -Create hash map
// -For each num in nums:
// -Check to see if map has target - curr. If it does, return index of sum pair
// -Else set curr and index to map
// -If done iterating return -1, as no pair found

// Notes:
// -Time complexity: O(n), as we traverse the list containing n elements only once. Each lookup in the table costs only O(1) time.
// -Space complexity: O(n), as the extra space required depends on the number of items stored in the hash table, which stores at most n elements

console.log(twoSum([3, 9, 4, 1, 7], 7));

// 20. Valid Parentheses

var isValid = function (s) {
  let stack = [];
  let map = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];
    let last = stack.length - 1;
    if (curr === "(") {
      stack.push(map[curr]);
    } else if (curr === "{") {
      stack.push(map[curr]);
    } else if (curr === "[") {
      stack.push(map[curr]);
    } else if (!stack.length || curr !== stack.pop()) {
      return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid("{[]}"));

// Explanation:
// -Create empty stack and map w/ characters
// -For each character in string:
// -If opening character, push closing character to stack
// -Else if stack is empty or closing character not equal to stack.pop(), return false
// -Once done iterating, if stack is empty return true, else return false

// Notes:
// -Time complexity: O(n), as we traverse the given string one time and our push/pop operations are O(1) time
// -Space complexity: O(n), as we push all opening brackets on the stack and, at worst case, will push all brackets onto the stack

// 21. Merge Two Sorted Lists

var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }

  let head;

  if (l1.val < l2.val) {
    head = l1;
    l1 = l1.next;
  } else {
    head = l2;
    l2 = l2.next;
  }

  head.next = mergeTwoLists(l1, l2);

  return head;
};

// Explanation:
// -If l1 equals null, we've reached end of l1 and will return l2 as remainder of merged list
// -If l2 equals null, we've reached end of l2 and will return l1 as remainder of merged list
// -If curr l1 val < curr l2 val, set head to l1 and set l1 to l1.next
// -Else if curr l2 val < curr l1 val, set head to l2 and set l2 to l2.next
// -Set head.next to return value of recursive function with updated l1 and l2
// -Once done recursing, return head

// Notes:
// -Time complexity: O(n + m), as each recursive call increments the pointer to l1 or l2 by one, there will be exactly one call to mergeTwoLists per element in each list. Therefore, the time complexity is linear in the combined size of the lists.
// -Space complexity: O(n + m), as the first call to mergeTwoLists does not return until the ends of both l1 and l2 have been reached, so n + m stack frames consume O(n + m) space.

let list1 = { val: 1, next: { val: 3, next: { val: 5, next: null } } };
let list2 = { val: 2, next: { val: 4, next: { val: 6, next: null } } };
console.log(mergeTwoLists(list1, list2));

// 121. Best Time to Buy and Sell Stock

var maxProfit = function (prices) {
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    min = Math.min(min, prices[i]);
    max = Math.max(max, prices[i] - min);
  }
  return max;
};

// Explanation:
// -Set min to infinity and max to zero
// -For each num in prices:
// -Set min to lesser of min or curr price
// -Set max to greater of max or curr price minus min
// -Once done iterating, return max

// Notes:
// -Time complexity: O(n), as only a single pass is needed
// -Space complexity: O(1), as only two variables are used
// -This approach to the solution is known as Kadane's algorithm

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

// 125. Valid Palindrome

var isPalindrome = function (s) {
  let str = s.toLowerCase().replace(/[^a-z0-9]/gi, "");

  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end]) {
      return false;
    }
    start++;
    end--;
  }

  return true;
};

// Explanation:
// -Make all characters in string lowercase and get rid of extra characters and spaces
// -Set start pointer to 0 and end pointer to end of string
// -While start pointer < end pointer:
// -If char at str[start] not equal to char at str[end], return false
// -Else increase start pointer by 1 and decrease end pointer by 1
// -If we iterate through entire string without returning false, we return true

// Notes:
// -Time complexity: O(n), where n is the length of string, as we traverse over each character at most once, until the two pointers meet in the middle, or when we break and return early
// -Space complexity: O(n) to store the valid string

console.log(isPalindrome("A man, a plan, a canal: Panama"));

// 226. Invert Binary Tree

var invertTree = function (root) {
  let work = [root];

  while (work.length) {
    let curr = work.pop();
    if (curr !== null) {
      [curr.left, curr.right] = [curr.right, curr.left];
      work.push(curr.left, curr.right);
    }
  }

  return root;
};

// Explanation:
// -Set stack to root
// -While stack has work:
// -Pop last item from stack and set to curr
// -Reassign right and left values
// -Once done working through tree, return root

// Notes:
// -Time complexity: O(n), since we visit each node in the tree once
// -Space complexity: O(n)

function treeNode(val, left, right) {
  return {
    val: val === undefined ? 0 : val,
    left: left === undefined ? null : left,
    right: right === undefined ? null : right,
  };
}

let t = new treeNode(4);
t.left = new treeNode(2);
t.right = new treeNode(7);
let leftChild = t.left;
let rightChild = t.right;
leftChild.left = new treeNode(1);
leftChild.right = new treeNode(3);
rightChild.left = new treeNode(6);
rightChild.right = new treeNode(9);
console.log(invertTree(t));

// 242. Valid Anagram

var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  let buffer = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    buffer[s[i].charCodeAt() - "a".charCodeAt()]++;
    buffer[t[i].charCodeAt() - "a".charCodeAt()]--;
  }

  for (let index of buffer) {
    if (index !== 0) {
      return false;
    }
  }

  return true;
};

// Explanation:
// -If s and t are not same length, return false
// -Create buffer array
// -For each char in s:
// -Increase char count in buffer for s
// -Decrease char count in buffer for t
// -For each index in buffer:
// -If index not equal to 0, return false
// -Else, return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(isAnagram("anagram", "nagaram"));

// 704. Binary Search

var search = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

// Explanation:
// -Set low to 0 and high to last index of nums array
// -While low <= high:
// -Set mid to midpoint between high and low
// -If num and mid equals target, return mid ind
// -Else if num at mid < target, set low to mid + 1
// -Else set high to mid - 1
// -If done iterating, no target found so we return -1

console.log(search([1, 3, 5, 7, 9, 12], 9));

// 733. Flood Fill

var floodFill = function (image, sr, sc, newColor, firstColor = image[sr][sc]) {
  if (
    sr < 0 ||
    sc < 0 ||
    sr >= image.length ||
    sc >= image[sr].length ||
    image[sr][sc] !== firstColor ||
    image[sr][sc] === newColor
  ) {
    return image;
  }

  image[sr][sc] = newColor;

  floodFill(image, sr + 1, sc, newColor, firstColor);
  floodFill(image, sr - 1, sc, newColor, firstColor);
  floodFill(image, sr, sc + 1, newColor, firstColor);
  floodFill(image, sr, sc - 1, newColor, firstColor);

  return image;
};

// Explanation:
// -Base case: if sr or sc are out of bounds or if current node is not equal to original color or current node is already new color, return image
// -Set current node to new color
// -Recurse on all 4-directional nodes
// -Once done recursing, return image

// Notes:
// -Time complexity: O(n), where n is the number of pixels in the image
// -Space complexity: O(n), which is the size of the implicit call stack when recursing

console.log(
  floodFill(
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
    1,
    0,
    2
  )
);

// 53. Maximum Subarray

var maxSubArray = function (nums) {
  let maxEnd = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEnd = Math.max(maxEnd + nums[i], nums[i]);
    maxSum = Math.max(maxSum, maxEnd);
  }
  return maxSum;
};

// Explanation:
// -Set max end and max sum to first element in nums
// -For each num in nums past first element:
// -Set max end to greater of max end plus curr num or curr num
// -Set max sum to greater of max sum or max end

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 235. Lowest Common Ancestor of a Binary Search Tree

var lowestCommonAncestor = function (root, p, q) {
  while (root) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else {
      break;
    }
  }

  return root;
};

// Explanation:
// -While node not null:
// -If curr node val less than val of nodes p and q, update node to node.right
// -Else if curr node val greater than val of nodes p and q, update node to node.left
// -Else node is lowest common ancestor so we break
// -If ancestor found or node is null, return curr node

// Notes:
// -Time complexity: O(n), where n is the number of nodes in the BST
// -Space complexity: O(1)

function TreeNode(val) {
  return {
    val,
    right: null,
    left: null,
  };
}

let bst = new TreeNode(6);
bst.left = new TreeNode(2);
bst.right = new TreeNode(8);
let leftChild = bst.left;
let rightChild = bst.right;
leftChild.left = new TreeNode(0);
leftChild.right = new TreeNode(4);
leftChild.right.left = new TreeNode(3);
leftChild.right.right = new TreeNode(5);
rightChild.left = new TreeNode(7);
rightChild.right = new TreeNode(9);
console.log(lowestCommonAncestor(bst, leftChild, leftChild.right));

// 110. Balanced Binary Tree

var isBalanced = function (root) {
  function dfs(node) {
    if (!node) {
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
};

// Explanation:
// -Bottom up approach where we find height by going all the way down children of sub trees first. As we work our way back up, if at any point height difference between less and right is greater than 1, we return Infinity. Else we return the max of left and right height at all subtree levels, which will be 1. If our recursive function returns Infinity, our subtree is unbalanced so we return false. Else we return true.

// Notes:
// -Time complexity: O(n), as we compute the height for every subtree and its children in constant time
// -Space complexity: O(n), as the recursion stack may go up to O(n) if the tree is unbalanced

function TreeNode(val) {
  return {
    val,
    right: null,
    left: null,
  };
}

let bst = new TreeNode(6);
bst.left = new TreeNode(2);
bst.right = new TreeNode(8);
let leftChild = bst.left;
let rightChild = bst.right;
leftChild.left = new TreeNode(0);
leftChild.right = new TreeNode(4);
leftChild.right.left = new TreeNode(3);
leftChild.right.right = new TreeNode(5);
rightChild.left = new TreeNode(7);
rightChild.right = new TreeNode(9);
console.log(isBalanced(bst));

// 141. Linked List Cycle

var hasCycle = function (head) {
  if (!head) {
    return false;
  }

  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
};

// Explanation:
// -If head is null, return false
// -Set slow pointer to head and fast pointer to head.next
// -While slow not equal to fast:
// -If fast or fast.next is null, no cycle exists so we return false
// -Else increment slow by 1 and fast by 2 until pointers cross
// -Once done iterating through list, return true

// Notes:
// -Time complexity: O(n), as we max visit all nodes plus cycle length
// -Space complexity: O(1)

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = list.next;
console.log(hasCycle(list));

// 232. Implement Queue using Stacks

var MyQueue = function () {
  return {
    s1: [],
    s2: [],
    front: null,
    push: function (val) {
      if (this.s1.length === 0) {
        this.front = val;
      }
      this.s1.push(val);
    },
    pop: function () {
      if (this.s2.length === 0) {
        while (this.s1.length !== 0) {
          this.s2.push(this.s1.pop());
        }
      }
      return this.s2.pop();
    },
    peek: function () {
      if (this.s2.length === 0) {
        return this.front;
      }
      return this.s2[this.s2.length - 1];
    },
    empty: function () {
      return this.s1.length === 0 && this.s2.length === 0;
    },
  };
};

// Explanation:
// -Set stack 1 and 2 to empty array and front to null
// -For push function, if stack 1 is empty set front to val. Then push val to stack 1.
// -For pop function, if stack 2 is empty pop items off stack 1 and push them to stack 2. Once done emptying stack 1, return popped item off stack 2
// -For peek function, if stack 2 is empty return front. Else return last item in stack 2.
// -For empty function, return whether length of stack 1 and 2 is equal to 0

// Notes:
// -Time complexity: O(1) for push, O(1) amortized for pop, O(1) for peek, and O(1) for empty
// -Stack complexity: O(n) for push, O(1) for pop, O(1) for empty, and O(1) for empty

let q = new MyQueue();
q.push(2);
q.push(3);
q.push(4);
q.push(5);
console.log(q.pop());
console.log(q.peek());
console.log(q.empty());

// 278. First Bad Version

var solution = function (isBadVersion) {
  return function (n) {
    let left = 0;
    let right = n;

    while (left < right) {
      let mid = left + Math.floor((right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
};

// Explanation:
// -Set left to 0 and right to n
// -While left < right:
// -Get midpoint
// -If midpoint version is bad, set right to midpoint
// -Else set left to mid + 1
// -When done iterating, return left

// Notes:
// -Time complexity: O(log n), as the search space is halved each time
// -Space complexity: O(1)

// 383. Ransom Note

var canConstruct = function (ransomNote, magazine) {
  if (ransomeNote.length > magazine.length) {
    return false;
  }

  let map = {};

  for (let i = 0; i < magazine.length; i++) {
    let curr = magazine[i];
    map[curr] = map[curr] ? map[curr] + 1 : 1;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    let curr = ransomNote[i];
    if (!map[curr] || map[curr] - 1 < 0) {
      return false;
    }
    map[curr]--;
  }

  return true;
};

// Explanation:
// -If magazine length shorter than ransom note, return false as not enough chars available
// -Create map of character count in magazine
// -For each char in ransom note:
// -If curr char does not exist in map or count - 1 < 0, return false
// -Decrease curr char count in map
// -If we successfully iterate through ransom note, return true

// Notes:
// -Time complexity: O(n), where n is magazine length
// -Space complexity: O(n), where n is number of chars in magazine

console.log(canConstruct("aa", "aab"));

// 70. Climbing Stairs

var climbStairs = function (n) {
  if (n === 1) {
    return 1;
  }

  let buffer = new Array(n + 1).fill(0);
  buffer[1] = 1;
  buffer[2] = 2;

  for (let i = 3; i <= n; i++) {
    buffer[i] = buffer[i - 1] + buffer[i - 2];
  }

  return buffer[n];
};

// Explanation:
// -If n equals 1, return 1
// -Create buffer array of length n + 1
// -Set index 1 and 2 to 1 and 2, as there is 1 way of reaching step one and two ways of reaching step 2
// -For each subsequent index in buffer:
// -Set curr index  to sum of index - 1 and index - 2 in buffer
// -Once done iterating, return last element in buffer

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(climbStairs(8));

// 409. Longest Palindrome

var longestPalindrome = function (str) {
  let result = 0;
  let map = {};

  for (let char of str) {
    map[char] = map[char] ? map[char] + 1 : 1;
    if (map[char] % 2 === 0) {
      result += 2;
    }
  }

  return str.length > result ? result + 1 : result;
};

// Explanation:
// -Set result count to 0 and map to empty object
// -For each char in string:
// -Set char count in map to curr + 1 if exists, else 1
// -If curr count is divisible by 2, increase result count by 2
// -Once done iterating, check to see if string length > result
// -If so return result + 1, else return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n), given that map is, at worst, size of string length

console.log(longestPalindrome("abccccdd"));

// 155. Min Stack

var MinStack = function () {
  return {
    stack: [],
    push: function (val) {
      if (this.stack.length === 0) {
        this.stack.push([val, val]);
      } else {
        let currentMin = this.stack[this.stack.length - 1][1];
        let newMin = Math.min(currentMin, val);
        this.stack.push([val, newMin]);
      }
    },
    pop: function () {
      let curr = this.stack.pop();
      return curr[0];
    },
    top: function () {
      return this.stack[this.stack.length - 1][0];
    },
    getMin: function () {
      return this.stack[this.stack.length - 1][1];
    },
  };
};

// Explanation:
// -Set stack to empty array
// -For push function:
// -If stack empty, push val as val and val as min. Else, set new min to lesser of curr min or val and push val and new min to stack
// -For pop function:
// -Remove last element in stack and return that element
// -For top function:
// -Return last val in stack
// -For getMin function:
// -Return last min in stack

// Notes:
// -Time complexity: O(1) for all operations
// -Space complexity: O(n), as worst case all operations are push and there will be O(2 * n) space used

let stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log(stack.getMin());
stack.pop();
console.log(stack.top());
console.log(stack.getMin());

// 206. Reverse Linked List

var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }

  return prev;
};

// Explanation:
// -Set prev to null and curr to head
// -While curr not null:
// -Set temp to curr.next
// -Set curr.next to prev
// -Set prev to curr
// -Set curr to temp
// -Once done iterating, return prev

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);
console.log(reverseList(list));

// 169. Majority Element

var majorityElement = function (nums) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    map[curr] = map[curr] ? map[curr] + 1 : 1;
    if (map[curr] > nums.length / 2) {
      return curr;
    }
  }
};

// Explanation:
// -Set map to empty object
// -For each num in nums:
// -Either increase map[curr] or set it to 1 if it doesn't exist in map
// -Check if map[curr] is majority element
// -If so, return curr

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

// 543. Diameter of Binary Tree

var diameterOfBinaryTree = function (root) {
  function dfs(node) {
    if (node === null) {
      return 0;
    }

    let left = dfs(node.left);
    let right = dfs(node.right);

    diameter = Math.max(diameter, left + right);
    return Math.max(left, right) + 1;
  }

  let diameter = 0;
  dfs(root);
  return diameter;
};

// Explanation:
// -Set diameter to 0
// -For each node starting from root:
// -If node is null, return 0
// -Recurse on each child
// -When we make our way fully down subtree depth, set diameter to max of diameter or left and right path
// -Return max of left or right plus one to previous node path
// -Once done recursing, return diameter

// Notes:
// -Time complexity: O(n), as we only enter and exit from each node once
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let t = new Node(1);
t.left = new Node(2);
t.right = new Node(3);
let leftChild = t.left;
leftChild.left = new Node(4);
leftChild.right = new Node(5);
console.log(diameterOfBinaryTree(t));

// 876. Middle of the Linked List

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

// Explanation:
// -Set slow and fast pointers to head
// -While fast and fast.next are not null:
// -Set slow to slow.next and fast to fast.next.next
// -Once fast.next is null, we return slow

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);
console.log(middleNode(list));

// 104. Maximum Depth of Binary Tree

var maxDepth = function (root) {
  let stack = [[root, 1]];
  let maxDepth = 0;

  while (stack.length) {
    let [curr, depth] = stack.pop();
    if (curr) {
      maxDepth = Math.max(maxDepth, depth);
      stack.push([curr.left, depth + 1]);
      stack.push([curr.right, depth + 1]);
    }
  }

  return maxDepth;
};

// Explanation:
// -Push root and root depth to stack
// -Set max depth to 0
// -While stack has work:
// -Pop last node off stack
// -If node not null:
// -Set max depth to greater of maxDepth or curr node depth
// -Push left and right nodes w/ depth to stack
// -Once done iterating, return maxDepth

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

let tree = new Node(5);
tree.left = new Node(3);
tree.right = new Node(8);
let leftChild = tree.left;
leftChild.left = new Node(1);
leftChild.right = new Node(4);
console.log(maxDepth(tree));

// 217. Contains Duplicate

var containsDuplicate = function (nums) {
  let map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      return true;
    }
    map.set(num);
  }
  return false;
};

// Explanation:
// -Create map
// -For each num in nums:
// -If map has num, return true
// -Else set num in map
// -If we don't find a duplicate, return false

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log([0, 1, 2, 1, 4]);

// 57. Insert Interval

var insert = function (intervals, newInterval) {
  let result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  result.push(newInterval);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
};

// Explanation:
// -Set result to empty array
// -Set index pointer to 0
// -For each interval in intervals:
// -If interval end < new interval start, push interval to result and increase index count
// -For each interval in intervals:
// -If interval start <= new interval end:
// -Set new interval start to min of interval start or new interval start
// -Set new interval end to max of interval end or new interval end
// -Increase index count
// -Push new interval to result
// -Push remaining intervals to result
// -Return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(
  insert(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5]
  )
);
console.log(
  insert(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8]
  )
);

// 542. 01 Matrix

var updateMatrix = function (mat) {
  let direction = [0, 1, 0, -1, 0];
  let queue = [];

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[row].length; col++) {
      if (mat[row][col] === 0) {
        queue.push([row, col]);
      } else {
        mat[row][col] = -1;
      }
    }
  }

  while (queue.length) {
    let [row, col] = queue.shift();

    for (let i = 0; i < direction.length; i++) {
      let newRow = row + direction[i];
      let newCol = col + direction[i + 1];

      if (
        newRow < 0 ||
        newRow >= mat.length ||
        newCol < 0 ||
        newCol >= mat[newRow].length ||
        mat[newRow][newCol] !== -1
      ) {
        continue;
      }

      mat[newRow][newCol] = mat[row][col] + 1;
      queue.push([newRow, newCol]);
    }
  }

  return mat;
};

// Explanation:
// -Set direction helper to array w/ directions
// -Set queue to empty array
// -Iterate over matrix
// -If node equals 0, push to queue
// -Else set node value to -1
// -While queue has work:
// -Pop element from front of queue
// -For each direction right, down, left, up:
// -If node out of bounds or already visited or 0, continue
// -Else set new direction node to curr node val plus 1
// -Then push new node to queue
// -Once queue is done, return updated matrix

// Notes
// -Time complexity: O(r * c), where r is number of rows and c is number of columns
// -Space complexity: O(r * c)

console.log(
  updateMatrix([
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ])
);

// 973. K Closest Points to Origin

function MaxHeap() {
  return {
    heap: [null],
    parent: function (i) {
      return Math.floor(i / 2);
    },
    left: function (i) {
      return 2 * i;
    },
    right: function (i) {
      return 2 * i + 1;
    },
    swap: function (heap, index, target) {
      [this.heap[index], this.heap[target]] = [
        this.heap[target],
        this.heap[index],
      ];
    },
    getMax: function () {
      return this.heap[1];
    },
    insert: function (val) {
      this.heap.push(val);
      let size = this.heap.length;

      if (size > 2) {
        let index = size - 1;
        let parent = this.parent(index);

        while (this.heap[index] > this.heap[parent]) {
          if (index >= 1) {
            this.swap(this.heap, index, parent);
            if (parent > 1) {
              index = parent;
              parent = this.parent(index);
            } else {
              break;
            }
          }
        }
      }
    },
    remove: function () {
      let largest = this.heap[1];
      let size = this.heap.length;

      if (size < 2) {
        return null;
      } else if (size === 2) {
        this.heap.pop();
      } else {
        this.heap[1] = this.heap[size - 1];
        this.heap.pop();

        if (size === 3) {
          if (this.heap[1] < this.heap[2]) {
            this.swap(this.heap, 1, 2);
          }
          return largest;
        }

        let index = 1;
        let left = this.left(index);
        let right = this.right(index);

        while (
          this.heap[index] <= this.heap[left] ||
          this.heap[index] <= this.heap[right]
        ) {
          if (this.heap[left] > this.heap[right]) {
            this.swap(this.heap, index, left);
            index = left;
          } else {
            this.swap(this.heap, index, right);
            index = right;
          }

          left = this.left(index);
          right = this.right(index);

          if (this.heap[left] === undefined || this.heap[right] === undefined) {
            break;
          }
        }
      }

      return largest;
    },
  };
}

var kClosest = function (points, k) {
  let heap = new MaxHeap();
  let map = {};

  for (let i = 0; i < points.length; i++) {
    let [x, y] = points[i];
    let dist = Math.pow(x, 2) + Math.pow(y, 2);

    if (i < k) {
      heap.insert(dist);
      map[dist] = map[dist] ? map[dist] + 1 : 1;
    } else if (dist <= heap.getMax()) {
      let max = heap.remove();
      delete map[max];
      heap.insert(dist);
      map[dist] = map[dist] ? map[dist] + 1 : 1;
    }
  }

  let result = [];

  for (let [x, y] of points) {
    let dist = Math.pow(x, 2) + Math.pow(y, 2);
    if (map[dist]) {
      result.push([x, y]);
      map[dist]--;
    }
  }

  return result;
};

// Explanation:
// -Implement max heap
// -Set map to empty obj to keep track of distances
// -For each point in points:
// -Insert first k distances to heap and map
// -For each subsequent point:
// -If dist <= max in heap:
// -Remove max from heap and map
// -Insert new dist into max heap and map
// -Once we have k smallest elements, push them to result and return result

// Notes:
// -Time complexity: O(n log k), as adding / removing from heap takes O(log k) time when capped at k elements
// -Space complexity: O(k), as both our map and result array are limited to k elements

console.log(
  kClosest(
    [
      [3, 3],
      [5, -1],
      [-2, 4],
    ],
    2
  )
);

// 3. Longest Substring Without Repeating Characters

var lengthOfLongestSubstring = function (s) {
  let seen = new Set();
  let longest = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    let curr = s[i];

    while (seen.has(curr)) {
      seen.delete(s[start]);
      start++;
    }

    seen.add(curr);
    longest = Math.max(longest, i - start + 1);
  }

  return longest;
};

// Explanation:
// -Set seen to empty set
// -Set longest to 0
// -Set start index to 0
// -For each char in string:
// -While set has curr:
// -Delete start from set and increase start pointer by 1
// -Add curr to set
// -Update longest to max of longest or curr range
// -Once done iterating through chars, return longest

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(min(m, n)), where m is the size of alphabet/charset and n is size of string

console.log(lengthOfLongestSubstring("abcdabef"));

// 15. 3Sum

var threeSum = function (nums) {
  let result = [];
  nums.sort((a, b) => a - b);

  if (nums.length < 3) {
    return result;
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i === 0 || nums[i] !== nums[i - 1]) {
      twoPointers(nums, i);
    }
  }

  return result;

  function twoPointers(nums, index) {
    let start = index + 1;
    let end = nums.length - 1;

    while (start < end) {
      let sum = nums[index] + nums[start] + nums[end];

      if (sum < 0) {
        start++;
      } else if (sum > 0) {
        end--;
      } else {
        result.push([nums[index], nums[start], nums[end]]);
        start++;
        end--;

        while (start < end && nums[start] === nums[start - 1]) {
          start++;
        }
      }
    }
  }
};

// Explanation:
// -Set result to empty array
// -Sort nums
// -If nums length < 3, return empty array
// -For each num in nums:
// -If curr num > 0, break as it's impossible to reach target given sorted nums
// -If index is 0 or curr num not equal to prev num, run two pointers on curr  index
// -For two pointers:
// -Set start to curr index + 1 and end to last index in nums
// -While start < end:
// -Sum equals num at curr index + num at start + num at end
// -If sum < 0, increase start by 1
// -Else if sum > 0, decrease end pointer by 1
// -Else if sum equals target:
// -Push three nums to result and move start and end inward by 1. If duplicates exist at start, keep incrementing until start not equal to prev
// -Once done iterating through nums, return result

// Notes:
// -Time complexity: O(n^2)
// -Space complexity: From O(log n) to O(n) depending on the implementation of the sorting algorithm

console.log(threeSum([-1, 1, 0, 2, 3, -2, -5]));

// 102. Binary Tree Level Order Traversal

var levelOrder = function (root) {
  let stack = [[root, 0]];
  let result = [];
  let map = {};

  while (stack.length) {
    let [curr, depth] = stack.pop();

    if (curr) {
      if (map[depth]) {
        map[depth].push(curr.val);
      } else {
        map[depth] = [curr.val];
      }

      stack.push([curr.right, depth + 1], [curr.left, depth + 1]);
    }
  }

  for (let depth in map) {
    result.push(map[depth]);
  }

  return result;
};

// Explanation:
// -Push root w/ depth to stack
// -Set result to empty array and map to empty object
// -While stack has work:
// -Pop last item from stack
// -If curr item not null:
// -If depth exists in map, push curr val to depth
// -Else create depth in map w/ curr val
// -Push left and right nodes w/ respective depths to stack
// -Once done mapping vals, iterate through depths and push to result. Then return result.

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n) to keep the output structure and map that contain n node values

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bt = new Node(3);
bt.left = new Node(9);
bt.right = new Node(20);
bt.right.left = new Node(15);
bt.right.right = new Node(7);
console.log(levelOrder(bt));

// 133. Clone Graph

function Node(val, neighbors = []) {
  return {
    val,
    neighbors,
  };
}

var cloneGraph = function (node, map = new Map()) {
  if (!node) {
    return null;
  }

  if (map.has(node)) {
    return map.get(node);
  }

  let clone = new Node(node.val);
  map.set(node, clone);

  for (let neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, map));
  }

  return clone;
};

// Explanation:
// -If node null, return null
// -If map has node, return node clone
// -Set clone to new node w/ curr node val
// -Set node and clone in map
// -For each of curr node's neighbors:
// -Push cloned neighbors to clone.neighbors
// -Return clone

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n), where n is the space occupied by the hash map

function Graph() {
  return {
    nodes: [],
    addNode: function (val) {
      this.nodes.push({ val, neighbors: [] });
    },
    addEdge: function (from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].neighbors.push(to);
        }
        if (curr === to) {
          this.nodes[i].neighbors.push(from);
        }
      }
    },
  };
}

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
g.addEdge(g.nodes[3], g.nodes[0]);
console.log(cloneGraph(g.nodes[0]));

// 150. Evaluate Reverse Polish Notation

var evalRPN = function (tokens) {
  let stack = [];
  let map = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };

  for (let token of tokens) {
    if (map[token]) {
      let first = stack.pop();
      let second = stack.pop();
      stack.push(map[token](second, first));
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
};

// Explanation:
// -Create empty stack
// -Create map w/ operations
// -For each token in tokens:
// -If operator:
// -Pop top 2 elements from stack and push their result to stack
// -Else push number to stack
// -Once done, return last item off stack

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n), as we'll have all numbers in stack in worst case. This is never more than half the length of the input array.

console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
);

// 207. Course Schedule

var canFinish = function (numCourses, prerequisites) {
  let graph = new Map();
  let visiting = new Set();
  let visited = new Set();

  for (let [course, prereq] of prerequisites) {
    if (graph.has(course)) {
      graph.get(course).push(prereq);
    } else {
      graph.set(course, [prereq]);
    }
  }

  for (let [course, prereq] of graph) {
    if (dfs(course)) {
      return false;
    }
  }

  return true;

  function dfs(course) {
    visiting.add(course);

    let prereqs = graph.get(course);

    if (prereqs) {
      for (let prereq of prereqs) {
        if (visited.has(prereq)) {
          continue;
        }
        if (visiting.has(prereq) || dfs(prereq)) {
          return true;
        }
      }
    }

    visiting.delete(course);
    visited.add(course);
    return false;
  }
};

// Explanation:
// -Set graph to empty map
// -Set visiting and visited to empty sets
// -For each course / prereq of prerequisites:
// -If graph has course, push prereq to course
// -Else set course / prereq in graph
// -For each course / prereq in preqrequisites:
// -If dfs on course returns true, cycle detected so we return false
// -For dfs:
// -Add course to visiting
// -Get courses prereqs
// -If prereqs exist:
// -For each prereq in prereqs:
// -Skip prereq if already visited
// -Return true and exit if prereq is in visiting or cycle found
// -Once done iterating through prereqs, remove course from visiting and add to visited. Then return false and exit;
// -If we iterate through courses without returning false, we return true

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n + e), as we store all nodes and edges in graph map

console.log(
  canFinish(2, [
    [1, 0],
    [0, 1],
  ])
);

// 208. Implement Trie (Prefix Tree)

class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }
  setEnd(bool) {
    this.end = bool;
  }
  isEnd() {
    return this.end;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(string) {
    let node = this.root;

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (!node.keys.has(char)) {
        let temp = new Node();
        node.keys.set(char, temp);
        node = temp;
      } else {
        node = node.keys.get(char);
      }
    }

    node.setEnd(true);
  }
  search(string) {
    let node = this.root;

    for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (node.keys.has(char)) {
        node = node.keys.get(char);
      } else {
        return false;
      }
    }

    return node.isEnd();
  }
  startsWith(prefix) {
    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];

      if (node.keys.has(char)) {
        node = node.keys.get(char);
      } else {
        return false;
      }
    }

    return true;
  }
}

// Explanation:
// -Create node class with keys equal to empty hashmap and isEnd property set to false
// -Each node should have set end and is end methods
// -Create tree class with root set to new node
// -For insert method:
// -Set node to root
// -For each char in insert string:
// -If char not in node, create new temp node, set char / temp to curr node keys, then set node to temp
// -Else set node to next node
// -Once done iterating, set end to true
// -For search method:
// -Set node to root
// -For each char in search string:
// -If node has char, set node to next node
// -Else return false
// -Once done iterating, return last node's is end method, which should return true if valid search string
// -For starts with method:
// -Same as search method, except we return true if we iterate through nodes without returning false

// Notes:
// -Time complexity: O(n) for all operations
// -Space complexity: O(n) for insert, O(1) for other methods

let t = new Trie();
t.insert("hello");
t.insert("hell");
t.insert("hellen");
console.log(t.search("hel"));
console.log(t.search("hello"));
console.log(t.startsWith("hel"));

// 322. Coin Change

var coinChange = function (coins, amount) {
  let buffer = new Array(amount + 1).fill(Infinity);
  buffer[0] = 0;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      buffer[i] = Math.min(buffer[i], buffer[i - coin] + 1);
    }
  }

  return buffer[amount] === Infinity ? -1 : buffer[amount];
};

// Explanation:
// -Create buffer array of size amount + 1 and fill each index w/ infinity value
// -Set index 0 in buffer to 0
// -For each coin in coins:
// -For each index starting at coin value leading up to amount:
// -Set buffer index to min of curr value or value of buffer[index - coin] + 1
// -Once done iterating through coins, if buffer amount equals infinity return -1 as no change can be made, else return buffer amount

// Notes:
// -Time complexity: O(coins * amount)
// -Space complexity: O(amount)

console.log(coinChange([1, 2, 5], 6));

// 238. Product of Array Except Self

var productExceptSelf = function (nums) {
  let answer = [];
  let rightMult = 1;
  let leftMult = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    answer[i] = rightMult;
    rightMult *= nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    answer[i] *= leftMult;
    leftMult *= nums[i];
  }

  return answer;
};

// Explanation:
// -Set answer to empty array
// -Set right and left multipliers to 1
// -For each num in nums from back to front:
// -Set each answer index to product of previous nums
// -For each num in nums from front to back:
// -Multiply each answer index by product of prev nums
// -Once done, return answer

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), since we are asked to return an answer array, we do not take up extra space

console.log(productExceptSelf([1, 2, 3, 4]));

// 98. Validate Binary Search Tree

var isValidBST = function (root) {
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
};

// Explanation:
// -If root is null, return true
// -Push root with low val of -Infinity and high val of Infinity to stack
// -While stack has work:
// -Pop last node off stack
// -If node not null:
// -If curr node val <= low or >= high, return false
// -Push right node to stack with low val of curr node val and prev high val
// -Push left node to stack with prev low val and high of curr node val
// -Once done iterating through tree, return true

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

let bst = new Node(5);
bst.left = new Node(4);
bst.right = new Node(7);
bst.left.left = new Node(2);
bst.right.left = new Node(6);
bst.right.right = new Node(8);
console.log(isValidBST(bst));

// 200. Number of Islands

var numIslands = function (grid) {
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let node = grid[row][col];

      if (node === "1") {
        count++;
        dfs(grid, row, col);
      }
    }
  }

  function dfs(grid, row, col) {
    if (
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[row].length ||
      grid[row][col] === "0"
    ) {
      return;
    }

    grid[row][col] = "0";
    let directions = [0, 1, 0, -1, 0];

    for (let i = 0; i < directions.length - 1; i++) {
      dfs(grid, row + directions[i], col + directions[i + 1]);
    }
  }

  return count;
};

// Explanation:
// -Set count to 0
// -For each node in grid:
// -If node equals 1, increase count by 1 and perform dfs on node
// -In dfs:
// -If node out of bounds or equal to 0, return and exit dfs
// -Set curr node to 0
// -Traverse up, down, left, and right w/ dfs
// -Once done visiting islands, return count

// Notes:
// -Time complexity: O(rows * columns)
// -Space complexity: O(rows * columns)

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
);

// 994. Rotting Oranges

var orangesRotting = function (grid) {
  let queue = [];
  let oranges = 0;
  let time = 0;
  let endRow = grid.length - 1;
  let endCol = grid[0].length - 1;
  let directions = [0, 1, 0, -1, 0];

  for (let row = 0; row <= endRow; row++) {
    for (let col = 0; col <= endCol; col++) {
      if (grid[row][col] === 1) {
        oranges++;
      }
      if (grid[row][col] === 2) {
        queue.push([row, col, 0]);
      }
    }
  }

  while (queue.length && oranges) {
    let [row, col, mins] = queue.shift();

    if (grid[row][col] === 1) {
      grid[row][col] = 2;
      oranges--;
      time = mins;
    }

    for (let i = 0; i < directions.length - 1; i++) {
      let newRow = row + directions[i];
      let newCol = col + directions[i + 1];

      if (newRow < 0 || newCol < 0 || newRow > endRow || newCol > endCol) {
        continue;
      }

      if (grid[newRow][newCol] === 1) {
        queue.push([newRow, newCol, mins + 1]);
      }
    }
  }

  return oranges ? -1 : time;
};

// Explanation:
// -Set queue to empty array
// -Set fresh orange count and time elapsed to 0
// -Set end row and end col boundaries
// -Set directions to direction array
// -For each node in grid:
// -If node equals 1, add 1 to orange count
// -If node equas 2, add coordinates and time to queue
// -While queue has work and fresh oranges exist:
// -Pop node off front of queue
// -If node equals 1, update to 2 to mark as rotten, subtract from orange count, and update time to curr node's elapsed time
// -For each direction up, down, left, right, if new node has fresh orange, push to queue
// -Once done, return -1 if we have fresh oranges left, else return elapsed time

// Notes:
// -Time complexity: O(n^2) if we use array as queue, O(n) if we use queue data structure
// -Space complexity: O(n), where n is the size of the grid

console.log(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ])
);

// 33. Search in Rotated Sorted Array

var search = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let mid = Math.floor((end - start) / 2 + start);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[start] <= nums[mid]) {
      if (nums[start] <= target && target <= nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      if (nums[mid] <= target && target <= nums[end]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return -1;
};

// Explanation:
// -Set start and end pointers to leftmost and rightmost indices of nums
// -While start <= end:
// -Get mid num
// -If mid num is target, return mid index
// -If left side is sorted:
// -If start num <= target and target <= mid, set end to mid - 1
// -Else set start to mid + 1
// -If right side is sorted:
// -If mid num <= target && target <= end num, set start to mid + 1
// -Else set end to mid - 1
// -If we iterate through nums without returning index, return -1 as target not in nums

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(search([4, 5, 6, 0, 1, 2], 1));

// 39. Combination Sum

var combinationSum = function (candidates, target) {
  let results = [];
  let memo = [];

  function backtrack(total, memo, start) {
    if (total === 0) {
      results.push(memo.slice());
      return;
    } else if (total < 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      memo.push(candidates[i]);
      backtrack(total - candidates[i], memo, i);
      memo.pop();
    }
  }

  backtrack(target, memo, 0);

  return results;
};

// Explanation:
// -Set results and memo to empty array
// -Backtrack with start index of 0
// -In backtrack:
// -If total equals 0, valid path found so we push copy of array to results and return to exit
// -Else if total < 0, path not found so we return to exit
// -For each num in candidates starting from start index:
// -Push candidate to memo
// -Recurse on candidates w/ updated total, memo, and index
// -If we exit backtrack, pop last item off memo as either valid combo found or no path found w/ last item
// -Once done recursing, return results

// Notes:
// -Time complexity: O(n ^ ((t / m) + 1)), where n is number of nodes, t is target value, and m is the min value amongst candidates. Fan out of each node is bounded by n, the total number of nodes. The maximum depth would be t / m, where we keep on adding the smallest element to the combination. Finally, the maximum number of nodes in a N-ary tree of t / m height would be N ^ ((t / m) + 1).
// -Space complexity: O(t / m), as the number of recursive calls can pile up to t / m, where we keep on adding the smallest element to the combination. We also keep a combination of numbers in our memo, which requires at most t / m space as well.

console.log(combinationSum([2, 3, 5, 7], 7));

// 46. Permutations

var permute = function (nums) {
  let result = [];

  function dfs(nums, memo) {
    if (memo.size === nums.length) {
      result.push(Array.from(memo));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      let curr = nums[i];

      if (memo.has(curr)) {
        continue;
      }

      memo.add(curr);
      dfs(nums, memo);
      memo.delete(curr);
    }
  }

  dfs(nums, new Set());

  return result;
};

// Explanation:
// -Set result to empty array
// -Perform dfs on nums w/ empty set as memo
// -In dfs:
// -If memo size equals nums size, push deep copy of memo to result and return to exit search
// -For each num in nums:
// -If memo has curr num, continue
// -Else add curr num to memo and continue search
// -Once memo full and added to result, delete curr item from memo
// -Once done searching, return result w/ all permutations

// Notes:
// -Time complexity: O(n!)
// -Space complexity: O(n!)

console.log(permute([1, 2, 3]));

// 56. Merge Intervals

var merge = function (intervals) {
  if (!intervals.length) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let result = [intervals[0]];

  for (let [start, end] of intervals) {
    let last = result.length - 1;

    if (start <= result[last][1]) {
      result[last][1] = Math.max(result[last][1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
};

// Explanation:
// -If intervals is empty, return empty array
// -Sort by start num in ascending order
// -Push first interval to result
// -For each interval in intervals:
// -If start <= last result end, update last result end to be greater of last result end or curr end
// -Else push interval to result
// -Once done, return result

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) for sorting if we do not count output array as extra space, else O(n) if we do

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
);

// 236. Lowest Common Ancestor of a Binary Tree

var lowestCommonAncestor = function (root, p, q) {
  let stack = [[root, null, 0]];
  let parents = new Map();
  let depthP = -1;
  let depthQ = -1;

  while (stack.length) {
    let [curr, parent, depth] = stack.pop();

    if (curr) {
      if (curr === p) {
        depthP = depth;
      }
      if (curr === q) {
        depthQ = depth;
      }

      parents.set(curr, parent);
      stack.push([curr.left, curr, depth + 1]);
      stack.push([curr.right, curr, depth + 1]);
    }
  }

  let lowNode = depthQ > depthP ? q : p;
  let highNode = depthQ > depthP ? p : q;

  for (let i = 0; i < Math.abs(depthQ - depthP); i++) {
    lowNode = parents.get(lowNode);
  }
  while (lowNode !== highNode) {
    lowNode = parents.get(lowNode);
    highNode = parents.get(highNode);
  }

  return lowNode;
};

// Explanation:
// -Push root to stack w/ null parent and depth of 0
// -Create a new hashmap to track parents
// -Set p and q node depths to -1
// -While stack has work:
// -Pop last item off stack
// -If node not null:
// -Check to see if curr node is p or q. If so, update pointer depths.
// -Set curr node and parent in parents
// -Push left and ride node to stack w/ curr as parent and depth of curr node depth + 1
// -Set low node and high node based on depth
// -Bring low node up to high node depth
// -While low node not equal to high node:
// -Bring both nodes up until they intersect
// -Once done, return either low or high node

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

let bt = new Node(3);
bt.left = new Node(5);
bt.right = new Node(1);
bt.left.left = new Node(6);
bt.left.right = new Node(2);
bt.right.left = new Node(0);
bt.right.right = new Node(8);
console.log(lowestCommonAncestor(bt, bt.left.left, bt.right));

// 981. Time Based Key-Value Store

class TimeMap {
  constructor() {
    this.root = {};
  }
  set(key, value, time) {
    if (!this.root[key]) {
      this.root[key] = [];
    }
    this.root[key].push([value, time]);
  }
  get(key, time) {
    let arr = this.root[key] || [];
    let result = "";
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((right - left) / 2 + left);

      if (this.root[key][mid][1] <= time) {
        result = this.root[key][mid][0];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  }
}

// Explanation:
// -Initialize root as empty object
// -For set method:
// -If root doesn't have key, set key to empty array
// -Push value / time array to key
// -For get method:
// -Set search array to array at key or empty array
// -Set result to empty string
// -Set left and right pointers
// -While left <= right:
// -Get midpoint
// -If timestamp at midpoint <= input timestamp:
// -Update result to value at curr timestamp and set left to mid + 1
// -Else set right to mid - 1
// -Once done, return result

// Notes:
// -Time complexity: O(1) for insertion and O(log n) for get
// -Space complexity: O(n)

let storage = new TimeMap();
storage.set("foo", "bar", 1);
console.log(storage.get("foo", 1));
console.log(storage.get("foo", 3));
storage.set("foo", "bar2", 4);
console.log(storage.get("foo", 4));
console.log(storage.get("foo", 5));

// 721. Accounts Merge

var accountsMerge = function (accounts) {
  let emails = {};
  let names = {};

  for (let account of accounts) {
    let name = account[0];

    for (let i = 1; i < account.length; i++) {
      let email = account[i];
      names[email] = name;

      if (!emails[email]) {
        emails[email] = new Set();
      }
      if (i !== 1) {
        emails[account[1]].add(email);
        emails[email].add(account[1]);
      }
    }
  }

  let result = [];
  let stack = [];
  let visited = new Set();
  let temp;

  for (let email in emails) {
    if (!visited.has(email)) {
      visited.add(email);
      stack.push(email);
      temp = [];

      while (stack.length) {
        let curr = stack.pop();
        temp.push(curr);

        for (let neighbor of emails[curr]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push(neighbor);
          }
        }
      }

      temp.sort();
      temp.unshift(names[temp[0]]);
      result.push(temp);
    }
  }

  return result;
};

// Explanation:
// -Create graph of emails and map of names
// -Set result and stack to empty array
// -Set visited to empty set
// -For each email in graph:
// -If email not in visited:
// -Add email to visited
// -Add email to stack
// -Set temp to empty array
// -While stack has work:
// -Pop last email off stack
// -Push to email to temp
// -For each neighbor of curr email:
// -If not in visited, add to visited and push to stack
// -Once done iterating through neighbors, sort emails and add name to front. Then push to result.
// -After we're done visiting all emails, return result

// Notes:
// -Time complexity: O((n * k) * (log n * k)), as worst case is that all emails belong to a single person. The total number of emails will be n * k, and we need to sort these emails. DFS traversal will take n * k operations as no email will be traversed more than once.
// -Space complexity: O(n * k) for the graph, visited set, and stack

let accounts = [
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["Mary", "mary@mail.com"],
  ["John", "johnnybravo@mail.com"],
];
console.log(accountsMerge(accounts));

// 75. Sort Colors

var sortColors = function (nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      swap(nums, low, mid);
      low++;
      mid++;
    } else if (nums[mid] === 2) {
      swap(nums, mid, high);
      high--;
    } else {
      mid++;
    }
  }

  return nums;

  function swap(arr, start, end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
  }
};

// Explanation:
// -Set low and mid pointers to first index in nums
// -Set high pointer to last index in nums
// -While mid <= high:
// -If curr num equals 0, swap low and mid and increase both low and mid pointers by 1
// -Else if curr equals 2, swap mid and high and decrease high pointer by 1
// -Else increase mid pointer by 1
// -Once done iterating through nums, return nums

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(sortColors([1, 0, 1, 2, 0, 1]));

// 139. Word Break

var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      let curr = s.substring(j, i);

      if (dp[j] && dict.has(curr)) {
        dp[i] = true;
      }
    }
  }

  return dp[s.length];
};

// Explanation:
// -Create set from dictionary
// -Create dp array of size string length + 1 and fill with false values
// -Set index 0 to true, as null string is always present in dictionary
// -For each index i, where i refers to the size of the substring starting from the beginning:
// -For each index j, where j refers to the index partitioning the current substring:
// -Check to see if prev substring was formed at j and, if so, if dictionary has word, set i to true
// -Once done, if valid then index at string length will contain true so we return this value

// Notes:
// -Time complexity: O(n^3), as we have two nested loops with substring computation inside second loop
// -Space complexity: O(n)

console.log(wordBreak("leetcode", ["leet", "code"]));

// 79. Word Search

var exist = function (board, word) {
  if (
    board.length === 0 ||
    board === null ||
    word.length === 0 ||
    word === null
  ) {
    return false;
  }

  let maxRow = board.length - 1;
  let maxCol = board[0].length - 1;
  let directions = [0, 1, 0, -1, 0];

  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      if (dfs(row, col, 0)) {
        return true;
      }
    }
  }

  return false;

  function dfs(row, col, start) {
    if (board[row][col] !== word[start]) {
      return false;
    }
    if (start === word.length - 1) {
      return true;
    }

    board[row][col] = "*";

    for (let i = 0; i < directions.length - 1; i++) {
      let newRow = row + directions[i];
      let newCol = col + directions[i + 1];

      if (newRow >= 0 && newRow <= maxRow && newCol >= 0 && newCol <= maxCol) {
        if (dfs(newRow, newCol, start + 1)) {
          return true;
        }
      }
    }

    board[row][col] = word[start];
    return false;
  }
};

// Explanation:
// -If board or word not valid, return false
// -Perform search on each node in board and return true if dfs returns true
// -In dfs:
// -If node char not equal to curr word char, return false and exit dfs
// -If we've reached end of word, return true and exit dfs
// -Mark current node as visiting
// -For each neighbor:
// -If neigbor within board boundary, perform search
// -If search is successful, return true and exit dfs
// -If we visit paths from valid char without returning true, reset node to its character and return false

// Notes:
// -Time complexity: O(n * (3 ^ l)), where n is number of nodes in board and l is length of word. For the backtracking function, initially we could have at most 4 directions to explore, but further the choices are reduced into 3. As a result, the execution trace after the first step could be visualized as a 3-ary tree, where each of the branches represent a potential exploration in the corresponding direction. Therefore, in the worst case, the total number of invocation would be the number of nodes in a full 3-nary tree.
// -Space complexity: O(l), where l is the length of the word. The main consumption of the memory lies in the recursion call of the backtracking function. The maximum length of the call stack would be the length of the word.

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
);

// 416. Partition Equal Subset Sum

var canPartition = function (nums) {
  let sum = nums.reduce((a, b) => a + b, 0);

  if (sum % 2 !== 0) {
    return false;
  }

  let subsetSum = sum / 2;
  let dp = new Array(subsetSum + 1).fill(false);
  dp[0] = true;

  for (let num of nums) {
    for (let i = subsetSum; i >= num; i--) {
      if (dp[subsetSum]) {
        return dp[subsetSum];
      }
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[subsetSum];
};

// Explanation:
// -If sum of nums not divisible by 2, return false
// -Set subset sum to half of sum
// -Fill dp array with false up to subset sum index
// -Set dp[0] true, as sum of empty subset is 0
// -For each num in nums:
// -Go through dp and mark valid subset sums as true
// -If dp at subset sum index is true, exit early and return true
// -Once done iterating through nums, return boolean value at subset sum index in dp array

// Notes:
// -Time complexity: O(m * n), where m is the subset sum and n is the number of elements in nums array
// -Space complexity: O(m), as we use an array of size m to store the result of each subproblem

console.log(canPartition([1, 5, 11, 5]));

// 8. String to Integer (atoi)

var myAtoi = function (s) {
  let nums = {};

  for (let i = 0; i < 10; i++) {
    nums[i] = true;
  }

  let index = 0;
  let sign = 1;
  let result = 0;

  while (index < s.length && s[index] === " ") {
    index++;
  }

  if (index < s.length && (s[index] === "+" || s[index] === "-")) {
    sign = s[index] === "-" ? -1 : 1;
    index++;
  }

  let maxSafe = Math.pow(2, 31) - 1;
  let minSafe = -Math.pow(2, 31);

  while (index < s.length && nums[s[index]]) {
    let num = Number(s[index]);

    if (
      result > Math.floor(maxSafe / 10) ||
      (result === Math.floor(maxSafe / 10) && num > maxSafe % 10)
    ) {
      return sign === 1 ? maxSafe : minSafe;
    }

    result = result * 10 + num;
    index++;
  }

  return result * sign;
};

// Explanation:
// -Map out valid nums
// -Set index to 0, result to 0, and sign to positive 1
// -Skip over whitespace
// -Check if sign exists before num and update sign to reflect sign
// -Max safe integer is 2^31 - 1 and min safe integer is 2^31
// -While index < string length and curr char is valid num:
// -Get number of current char
// -Check overflow and underflow conditions
// -If integer overflowed return max safe integer, else return min safe integer if underflowed
// -Append current num to result by multiplying result by 10 and adding num
// -Increase index by 1
// -Once done looping through valid characters, return result * sign

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(myAtoi("-4193 with words"));

// 54. Spiral Matrix

var spiralOrder = function (matrix) {
  let [left, right, top, bottom] = [
    0,
    matrix[0].length - 1,
    0,
    matrix.length - 1,
  ];

  let result = [];

  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
};

// Explanation:
// -Set left, right, top, and bottom pointers
// -Set result to empty array
// -While left <= right and top <= bottom:
// -Push top row left to right to result
// -Bring top row down by 1
// -Push right col top to bottom to result
// -Bring right col in by 1
// -If top <= bottom:
// -Push bottom row right to left to result
// -Bring bottom row up by one
// -If left <= right:
// -Push left col bottom to top to result
// -Bring left col in by 1
// -Once all nodes push to result, return result

// Notes
// -Time complexity: O(r * c), where r is the number of rows and c is the number of columns
// -Space complexity: O(1), as the output array does not count as extra space

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

// 78. Subsets

var subsets = function (nums) {
  let result = [];

  backtrack([], 0);

  return result;

  function backtrack(path, index) {
    result.push(path);

    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(path, i + 1);
      path.pop();
    }
  }
};

// Explanation:
// -Start backtrack with empty path and index 0
// -In backtrack:
// -Push path to result
// -For each num in nums starting at provided index:
// -Add num to path and backtrack with new path and index + 1
// -Once we exhaust all options, return result

// Notes:
// -Time complexity: O(n * (2 ^ n)) to generate all subsets and copy them to an output list
// -Space complexity: O(n), as we use O(n) space to maintain path. We do not count space used for the purpose of returning output array.

console.log(subsets([1, 2, 3]));

// 199. Binary Tree Right Side View

var rightSideView = function (root) {
  let q = [root];
  let result = [];

  if (!root) {
    return result;
  }

  while (q.length) {
    let size = q.length;

    for (let i = 0; i < size; i++) {
      let curr = q.shift();

      if (i === size - 1) {
        result.push(curr.val);
      }
      if (curr.left) {
        q.push(curr.left);
      }
      if (curr.right) {
        q.push(curr.right);
      }
    }
  }

  return result;
};

// Explanation:
// -Add root to queue
// -If root is null, return empty array
// -While queue has work:
// -Get size of queue
// -For each element in queue:
// -Remove element from front
// -If last element in queue, push to result as we've found last element at its level
// -If left or right node are valid, push to queue
// -Once done iterating through queue, return result

// Notes:
// -Time complexity: O(n * d), where d is the diameter of the tree since we have to use shift operation on queue
// -Space complexity: O(d), where d is the diameter of the tree, which is the max number of nodes we keep in queue

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
bt.right.left = new Node(4);
bt.right.right = new Node(5);
console.log(rightSideView(bt));

// 5. Longest Palindromic Substring

var longestPalindrome = function (s) {
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j of [i, i + 1]) {
      let l = i;
      let r = j;

      while (s[l] && s[l] === s[r]) {
        let palLen = r - l + 1;
        let longest = end - start + 1;

        if (palLen > longest) {
          [start, end] = [l, r];
        }
        l--;
        r++;
      }
    }
  }

  return s.substring(start, end + 1);
};

// Explanation:
// -Set start and end pointers to 0
// -For each char in string:
// -Check left with right pointer at index and index + 1
// -While left char is valid and palindrome exists:
// -If curr palindrome is longer than longest palindrome, update start and left pointers to match left and right
// -Decrease left by 1 and increase right by 1
// -Once done iterating through chars in string, return palindrome based on left and right pointers

// Notes:
// -Time complexity: O(n ^ 2), as expanding a palindrome around its center could take O(n) time
// -Space complexity: O(1)

console.log(longestPalindrome("babad"));

// 62. Unique Paths

var uniquePaths = (m, n) => {
  let dp = new Array(n + 1).fill(1);

  for (let row = m - 1; row > 0; row--) {
    for (let col = n - 1; col > 0; col--) {
      dp[col] = dp[col] + dp[col + 1];
    }
  }

  return dp[1];
};

// Explanation:
// -Fill array of length columns + 1 with ones
// -For each row bottom to top:
// -For each column right to left:
// -Curr node is equal to sum of count in prev row and count in prev col
// -Once done iterating through grid, return dp[1]

// Notes:
// -Time complexity: O(m * n), where m is the number of rows and n is the number of columns
// -Space complexity: O(n), where n is the number of columns

console.log(uniquePaths(7, 3));

// 105. Construct Binary Tree from Preorder and Inorder Traversal

var Node = function (val) {
  return {
    val,
    left: null,
    right: null,
  };
};

var buildTree = function (preorder, inorder) {
  let map = new Map();

  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  let preorderIdx = 0;
  return arrayToTree(0, preorder.length - 1);

  function arrayToTree(start, end) {
    if (start > end) {
      return null;
    }

    let rootVal = preorder[preorderIdx];
    let root = new Node(rootVal);
    preorderIdx++;

    root.left = arrayToTree(start, map.get(rootVal) - 1);
    root.right = arrayToTree(map.get(rootVal) + 1, end);

    return root;
  }
};

// Explanation:
// -Map inorder values and indices
// -Set preorder index to 0
// -Recurse on full preorder array to build tree
// -Inside recursion:
// -If start > end, return null
// -Set root val to val at curr preorder index in preorder array
// -Set root equal to new node from root val
// -Increase preorder index by 1
// -Recurse on left and right subtrees
// -When we return null from building left and right subtrees, we return leaf nodes to parents' left and right
// -Finally, we'll return root once our tree is fully built

// Notes:
// -Time complexity: O(n) for both building the hashmap and building the tree
// -Space complexity: O(n) for both storing the map and storing the tree

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));

// 11. Container With Most Water

var maxArea = function (height) {
  let result = 0;
  let start = 0;
  let end = height.length - 1;

  while (start < end) {
    let area = Math.min(height[start], height[end]) * (end - start);
    result = Math.max(result, area);

    height[start] < height[end] ? start++ : end--;
  }

  return result;
};

// Explanation:
// -Set result to 0
// -Set start and end pointers to beginning and end of heigh array
// -While start < end:
// -Set area to min of start or end height times width (end - start)
// -Set result to greater of result or curr area
// -If start height < end height, increase start by 1, else decrease end by 1
// -Once done iterating, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

// 17. Letter Combinations of a Phone Number

var letterCombinations = function (digits) {
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  let result = [];

  if (digits.length === 0 || digits === null) {
    return result;
  }

  helper(0, "");

  return result;

  function helper(start, buffer) {
    if (buffer.length === digits.length) {
      result.push(buffer);
      return;
    }

    for (let letter of map[digits[start]]) {
      helper(start + 1, buffer + letter);
    }
  }
};

// Explanation:
// -Create map of digits to letters
// -Set result to empty array
// -If digits has length 0 or is null, return result, which is empty array
// -Backtrack starting at index 0 and an empty buffer
// -In backtrack:
// -Base case: if buffer length equals digits length, push buffer to result and return to exit
// -For each letter at curr index in digits:
// -Recurse by increasing index by 1 and buffer string by curr letter
// -Once done, return result

// Notes:
// -Time complexity: O(4 ^ n), as we make up to 4 function calls at each digit in the worst case where all digits are 7 and 9
// -Space complexity: O(n) on the recursion call stack

console.log(letterCombinations("23"));

// 438. Find All Anagrams in a String

var findAnagrams = function (s, p) {
  let result = [];
  let needed = {};

  for (let char of p) {
    needed[char] = needed[char] + 1 || 1;
  }

  let left = 0;
  let right = 0;
  let count = p.length;

  while (right < s.length) {
    let rightChar = s[right];

    if (needed[rightChar] > 0) {
      count--;
    }

    needed[rightChar]--;
    right++;

    if (count === 0) {
      result.push(left);
    }

    if (right - left === p.length) {
      let leftChar = s[left];

      if (needed[leftChar] >= 0) {
        count++;
      }

      needed[leftChar]++;
      left++;
    }
  }

  return result;
};

// Explanation:
// -Map out characters in string p with their respective counts
// -Set left and right pointers to 0 and count to length of string p
// -While right < string s length:
// -If value of right char in p string map > 0, decrease count by 1
// -Subtract 1 from value of right char in p string map
// -Increase right pointer index by 1
// -If count equals 0, anagram found at left index so we push left pointer index to result
// -If window is size of string p:
// -If left char is a needed char, increase count by 1
// -Increase left char's count in needed, as we need to remove left char's reference in needed
// -Increase left pointer index by 1
// -Once done iterating through s, return result

// Notes:
// -Time complexity: O(n), where n is the length of string s
// -Space complexity: O(1), as our needed map is constrained by size of the alphabet

console.log(findAnagrams("cbaebabacd", "abc"));

// 230. Kth Smallest Element in a BST

var kthSmallest = function (root, k) {
  let stack = [];
  let node = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    k--;

    if (!k) {
      return node.val;
    }

    node = node.right;
  }
};

// Explanation:
// -Initialize empty stack
// -Set node pointer to root node
// -While node or stack has work:
// -While node not null, push node to stack and set node to left child
// -Once we traverse all the way left, pop last node off stack
// -Decrease k count by 1
// -If k equals 0, return node val
// -Set node to node right to check left most nodes right subtree if exists

// Notes:
// -Time complexity: O(h + k), where h is the tree height and k is kth smallest element. This complexity is defined by the stack, which contains at least h + k elements, since before starting to pop out one has to go down to a leaf.
// -Space complexity: O(h) to keep the stack, where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let bst = new Node(5);
bst.left = new Node(3);
bst.right = new Node(6);
bst.left.left = new Node(2);
bst.left.right = new Node(4);
bst.right.right = new Node(7);
console.log(kthSmallest(bst, 3));

// 146. LRU Cache

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.size = 0;
    this.cap = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  remove(node) {
    let { prev, next } = node;

    node.prev.next = next;
    node.next.prev = prev;
  }
  add(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  get(key) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);

      this.remove(node);
      this.add(node);

      return node.val;
    }

    return -1;
  }
  put(key, val) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      node.val = val;

      this.remove(node);
      this.add(node);
    } else {
      let node = new Node(key, val);
      this.cache.set(key, node);

      if (this.size < this.cap) {
        this.size++;
        this.add(node);
      } else {
        this.cache.delete(this.tail.prev.key);
        this.remove(this.tail.prev);
        this.add(node);
      }
    }
  }
}

// Explanation:
// -Initialize node class w/ key, val, prev, and next
// -Initialize LRU Cache class with size set to 0, cap set to capacity, cache set to empty map, and linking dummy head and tail nodes
// -For remove method:
// -Get prev and next from node
// -Set previous node's next pointer to input node and next node's next pointer to input node
// -For add method:
// -Set input node's prev pointer to head and next pointer to head's next pointer
// -Set prev pointer for node next to head to node and next pointer for head to node
// -For get:
// -If cache has input key, get node from cache, remove from front, add to back, and return node val
// -Else return -1
// -For put method:
// -If cache has input key, get node from cache and update val
// -Then remove node from front and add to back
// -Else create new node w/ input key / val pair and set in cache
// -If size < cap, increase size and add node to tail
// -Else delete tail node from cache and list and add node to head

// Notes:
// -Time complexity: O(1) for all operations
// -Space complexity: O(n), where n is the specified capacity

let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));
cache.put(3, 3);
console.log(cache.get(2));
cache.put(4, 4);
console.log(cache.get(1));
console.log(cache.get(3));
console.log(cache.get(4));

// 621. Task Scheduler

var leastInterval = function (tasks, n) {
  let frequencies = new Array(26).fill(0);

  for (let task of tasks) {
    let index = task.charCodeAt() - "A".charCodeAt();
    frequencies[index]++;
  }

  let maxFreq = Math.max(...frequencies);
  let maxFreqCount = frequencies.filter((task) => task === maxFreq).length;

  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxFreqCount);
};

// Explanation:
// -Create array of length 26 to keep frequency of each task
// -For each task in tasks:
// -Update frequency in frequencies array
// -Find the max frequency
// -Find the number of tasks with the max frequency
// -Return maximum of length of tasks or (maxFreq - 1) * (idle time + 1) + number of tasks w/ max frequency

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)
// -For result, n + 1 accounts for task execution plus cooling period. Max frequency - 1 groups most frequent task plus cooling period, as there is no cooling period after our last tasks. The addition of the max frequent count at the end of our result accounts for most frequent tasks we put at the end that don't have an idle time associated with them.

console.log(leastInterval("AAABBB", 2));

// 310. Minimum Height Trees

var findMinHeightTrees = function (n, edges) {
  if (n < 2) {
    return [0];
  }

  let graph = new Map();

  for (let i = 0; i < n; i++) {
    graph.set(i, new Set());
  }

  for (let [node, edge] of edges) {
    graph.get(node).add(edge);
    graph.get(edge).add(node);
  }

  let leaves = [];

  for (let node of graph.keys()) {
    if (graph.get(node).size === 1) {
      leaves.push(node);
    }
  }

  while (n > 2) {
    n -= leaves.length;
    let newLeaves = [];

    for (let leaf of leaves) {
      let [neighbor] = graph.get(leaf);
      graph.get(neighbor).delete(leaf);

      if (graph.get(neighbor).size === 1) {
        newLeaves.push(neighbor);
      }

      graph.delete(leaf);
    }

    leaves = newLeaves;
  }

  return leaves;
};

// Explanation:
// -Map out graph
// -For each node in graph:
// -If node is leaf, add node to leaves array
// -Max number of centroids is two, so while n > 2:
// -Subtract leaves from n
// -Set new leaves to empty array
// -For each leaf in leaves:
// -Get first neighbor
// -Delete leaf from neighbor
// -If neighbor is now leaf, push to new leaves array
// -Delete leaf from graph
// -Once done iterating through leaves, update leaves to equal new leaves
// -Once centroids found, return leaves

// Notes:
// -Time complexity: O(n), where n is the number of nodes
// -Space complexity: O(n) space required for both the graph and the queue

console.log(
  findMinHeightTrees(6, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ])
);

// 100. Same Tree

var isSameTree = function (p, q) {
  if (!p && !q) {
    return true;
  }
  if (!p || !q || p.val !== q.val) {
    return false;
  }

  return isSameTree(p.right, q.right) && isSameTree(p.left, q.left);
};

// Explanation:
// -If p and q are null, return true and exit
// -If only p or q is null or p val not equal to q val, return false and exit
// -Return result of recursing on right and left subtrees. If both return true, we return true. Else, we return false.

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(log n) best of completely balanced tree, O(n) worst case of completely unbalanced tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let p = new Node(1);
p.left = new Node(2);
p.right = new Node(3);
let q = new Node(1);
q.left = new Node(2);
q.right = new Node(3);
console.log(isSameTree(p, q));

// 572. Subtree of Another Tree

var isSubtree = function (root, subRoot) {
  function isSame(root, subRoot) {
    if (!root && !subRoot) {
      return true;
    }
    if (!root || !subRoot || root.val !== subRoot.val) {
      return false;
    }

    return isSame(root.left, subRoot.left) && isSame(root.right, subRoot.right);
  }

  function dfs(root, subRoot) {
    if (!root) {
      return false;
    }
    if (root.val === subRoot.val && isSame(root, subRoot)) {
      return true;
    }

    return dfs(root.left, subRoot) || dfs(root.right, subRoot);
  }

  return dfs(root, subRoot);
};

// Explanation:
// -Perform dfs on root node to find where root val equals subroot val
// -Check to see if subtrees are same
// -If is same returns true, we return true to our dfs and exit

// Notes:
// -Time complexity: O(m * n), where m is the number of nodes in the first tree and n is the number of nodes in the second tree. In worst case, we check is same for each node in 1st tree.
// -Space complexity: O(n) worst case, O(log n) average case

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let p = new Node(3);
p.left = new Node(4);
p.right = new Node(5);
p.left.left = new Node(1);
p.left.right = new Node(2);
let q = new Node(4);
q.left = new Node(1);
q.right = new Node(2);
console.log(isSubtree(p, q));

// 1046. Last Stone Weight

var lastStoneWeight = function (stones) {
  stones.sort((a, b) => a - b);

  while (stones.length > 1) {
    let first = stones.pop();
    let second = stones.pop();

    if (first !== second) {
      let diff = first - second;
      let pointer = 0;

      while (stones[pointer] <= diff) {
        pointer++;
      }

      stones.splice(pointer, 0, diff);
    }
  }

  return stones.length === 0 ? 0 : stones[0];
};

// Explanation:
// -Sort nums in ascending order
// -While size of nums > 1:
// -Pop largest and second largest nums off nums
// -If two nums not equal to each other, get their difference and place in sorted order
// -Once done, return 0 if nums array is empty or last remaining num if not

// Notes:
// -Time complexity: O(n^2), could be brought down to O(n log n) using max heap
// -Space complexity: O(log n) for sorting algorithm

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

// 703. Kth Largest Element in a Stream

class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.nums = nums.sort((a, b) => a - b);
  }
  add(val) {
    let index = this.insert(val);
    this.nums.splice(index, 0, val);

    return this.nums[this.nums.length - this.k];
  }
  insert(val) {
    let l = 0;
    let r = this.nums.length - 1;

    while (l <= r) {
      let mid = Math.floor((r - l) / 2 + l);

      if (this.nums[mid] === val) {
        return mid;
      }
      if (this.nums[mid] > val) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    return l;
  }
}

// Explanation:
// -Initialize class w/ k and nums sorted
// -For add:
// -Get insert index by performing binary search and finding position for input value
// -Insert value at found index
// -Then, return value at nums length - k

// Notes:
// -Time complexity: O(n log n) for initializing nums property, O(n) for add, O(log n) for insert. Time complexity could be brought down to log n for add if we use min heap instead.
// -Space complexity: O(n) for storing nums

let Kth = new KthLargest(3, [4, 5, 8, 2]);
console.log(Kth.add(3));
console.log(Kth.add(5));
console.log(Kth.add(10));
console.log(Kth.add(9));
console.log(Kth.add(4));

// 746. Min Cost Climbing Stairs

var minCostClimbingStairs = function (cost) {
  cost.push(0);

  for (let i = cost.length - 3; i >= 0; i--) {
    cost[i] += Math.min(cost[i + 1], cost[i + 2]);
  }

  return Math.min(cost[0], cost[1]);
};

// Explanation:
// -Push 0 to cost array
// -For each num right to left starting at third to last:
// -Cost at index is equal to curr cost plus min of previous two costs
// -Once done, return min of cost at index 0 or 1

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(minCostClimbingStairs([10, 15, 20]));

// 252. Meeting Rooms

var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    let [start, end] = intervals[i];

    if (end > intervals[i + 1][0]) {
      return false;
    }
  }

  return true;
};

// Explanation:
// -Sort intervals by start time
// -For each interval in intervals:
// -If end time > next interval start time, return false
// -Once done iterating, return true

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) for sorting

console.log(
  canAttendMeetings([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
);

// 202. Happy Number

var isHappy = function (n) {
  let seen = new Set();

  while (!seen.has(n)) {
    seen.add(n);

    let num = String(n);
    let sum = 0;

    for (let digit of num) {
      sum += Number(digit) ** 2;
    }

    if (sum === 1) {
      return true;
    }

    n = sum;
  }

  return false;
};

// Explanation:
// -Initialize empty set
// -While set doesn't have n:
// -Add n to set
// -Iterate through digits and add squares to num
// -If sum equals 1, return true
// -Else set n to equal sum
// -If we find cycle, return false

// Notes:
// -Time complexity: O(log n), as there is a cap on how large sum can get and, therefore, how many digits we need to iterate through
// -Space complexity: O(log n), as measured by the numbers we put in our hash set. We can use Floyd's cycle finding algorithm to detect cycle and bring space complexity down to O(1)

console.log(isHappy(2));

// 66. Plus One

var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] === 9) {
      digits[i] = 0;
    } else {
      digits[i]++;
      return digits;
    }
  }

  digits.unshift(1);
  return digits;
};

// Explanation:
// -For each digit in digits right to left:
// -If curr digit is 9, mark as 0
// -Else add 1 to curr digit and return answer
// -If we iterate through digits, that means each digit was 9 and so we add 1 at the beginning and return answer

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(plusOne([4, 3, 2, 9]));

// 49. Group Anagrams

var groupAnagrams = function (strs) {
  let map = {};

  for (let string of strs) {
    let count = new Array(26).fill(0);

    for (let char of string) {
      let index = char.charCodeAt() - "a".charCodeAt();
      count[index]++;
    }

    count = JSON.stringify(count);

    if (!map[count]) {
      map[count] = [];
    }

    map[count].push(string);
  }

  return Object.values(map);
};

// Explanation:
// -Create map of anagrams based on character counts
// -For each string in strings:
// -Create buffer array
// -For each char in string, increase count at respective index in buffer
// -Stringify count array
// -Push string to anagram array at count
// -Once done, return grouped anagrams

// Notes:
// -Time complexity: O(n * k), where n is the length of strings and k is the max length of any string
// -Space complexity: O(n * k), as we will store n strings of size k in worst case, where n is number of strings and k is max length of string

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

// 347. Top K Frequent Elements

var topKFrequent = function (nums, k) {
  let count = {};

  for (let num of nums) {
    count[num] = count[num] + 1 || 1;
  }

  let frequencies = {};

  for (let num in count) {
    let frequency = count[num];

    if (!frequencies[frequency]) {
      frequencies[frequency] = [];
    }

    frequencies[frequency].push(num);
  }

  let keys = Object.keys(frequencies);
  let result = [];

  for (let i = keys.length - 1; i >= 0; i--) {
    let frequency = keys[i];

    while (frequencies[frequency].length && k) {
      result.push(frequencies[frequency].pop());
      k--;
    }
  }

  return result;
};

// Explanation:
// -Initialize count map
// -For each num in nums:
// -Update count in map
// -Initialize frequencies map
// -For each num in count map:
// -Push num to frequency
// -For each key in frequencies back to front:
// -While frequency has items and k isn't 0:
// -Pop item off frequency and push to result
// -Decrease k by 1
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));

// 36. Valid Sudoku

var isValidSudoku = function (board) {
  for (let i = 0; i < board.length; i++) {
    let rowCheck = new Set();
    let colCheck = new Set();
    let boxCheck = new Set();

    for (let j = 0; j < board[0].length; j++) {
      let row = board[i][j];
      let col = board[j][i];
      let box =
        board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];

      if (row !== ".") {
        if (rowCheck.has(row)) {
          return false;
        }
        rowCheck.add(row);
      }
      if (col !== ".") {
        if (colCheck.has(col)) {
          return false;
        }
        colCheck.add(col);
      }
      if (box !== ".") {
        if (boxCheck.has(box)) {
          return false;
        }
        boxCheck.add(box);
      }
    }
  }

  return true;
};

// Explanation:
// -For each row in board:
// -Initialize empty set for row check, column check, and box check
// -For each column in board:
// -Get current row, col, and box values
// -If row value is number:
// -If row check has row value, return false
// -Else add row value to row set
// -Perform same checks for col and box value
// -If we iterate through board without returning false, we return true

// Notes:
// -Time complexity: O(n^2), with n being board length (in most cases 9)
// -Space complexity: O(n^2)
// -If size of board is fixed, both time and space complexity will be O(1)

board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

console.log(isValidSudoku(board));

// 271. Encode and Decode Strings

var encode = function (strs) {
  let result = "";

  for (let str of strs) {
    result += String(str.length) + "#" + str;
  }

  return result;
};

var decode = function (s) {
  let result = [];
  let left = 0;

  while (left < s.length) {
    let right = left + 1;

    while (s[right] !== "#") {
      right++;
    }

    let length = parseInt(s.substring(left, right));
    result.push(s.substring(right + 1, right + 1 + length));
    left = right + 1 + length;
  }

  return result;
};

// Explanation:
// -For encode:
// -Initialize result as empty string
// -For each word in input string:
// -Add string length, #, and word to result
// -Once done, return result
// -For decode:
// -Set result to empty array
// -Set left pointer to 0
// -While left < string length:
// -Set right pointer to left + 1
// -Increase right pointer until we reach #
// -Parse string length
// -Push encoded string to result
// -Update left pointer

// Notes:
// -Time complexity: O(n) for both encode and decode
// -Space complexity: O(n) for both encode and decode

let encoded = encode("Hello World");
console.log(encoded);
console.log(decode(encoded));

// 128. Longest Consecutive Sequence

var longestConsecutive = function (nums) {
  let unique = new Set(nums);
  let longest = 0;

  for (let num of unique) {
    if (!unique.has(num - 1)) {
      let curr = num;
      let streak = 1;

      while (unique.has(curr + 1)) {
        curr++;
        streak++;
      }

      longest = Math.max(longest, streak);
    }
  }

  return longest;
};

// Explanation:
// -Create set from nums
// -Set longest to 0
// -For each num in set:
// -If set does not contain num - 1:
// -Set curr to num
// -Set streak to 1
// -While set has curr + 1:
// -Increase curr and streak by 1
// -Update to longest to greater of longest or current streak
// -Once done iterating through nums, return longest

// Notes:
// -Time complexity: O(n), as the while loop is only reached when current num marks the beginning of a sequence
// -Space complexity: O(n)

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));

// 136. Single Number

var singleNumber = function (nums) {
  let result = 0;

  for (let num of nums) {
    result ^= num;
  }

  return result;
};

// Explanation:
// -For each num in nums:
// -Set result to XOR of result and num
// -XOR of a number and 0 is that number, while XOR of two identical numbers is 0
// -Therefore, we will end up returning the unique number as duplicates will get cancelled out

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(singleNumber([1, 1, 2, 3, 3]));

// 191. Number of 1 Bits

var hammingWeight = function (n) {
  let count = 0;

  while (n !== 0) {
    count++;
    n = n & (n - 1);
  }

  return count;
};

// Explanation:
// -Set count to 0
// -For each 1 in n, we repeatedly flip each least significant 1 to 0 and increase count until we have no more 1s
// -We then return count

// Notes:
// -Time complexity: O(1) in the case of a 32-bit integer, as size is capped
// -Space complexity: O(1), since no additional space is allocated

console.log(hammingWeight(00000000000000000000000000001011));

// 338. Counting Bits

var countBits = function (n) {
  let dp = new Array(n + 1).fill(0);
  let offset = 1;

  for (let i = 1; i <= n; i++) {
    if (offset * 2 === i) {
      offset = i;
    }

    dp[i] = 1 + dp[i - offset];
  }

  return dp;
};

// Explanation:
// -Fill dp array of length n + 1 with zeros
// -Set initial offset to 1
// -For each num from 1 to n:
// -If offset * 2 equals i, set offset to i
// -Current index is equal to 1 plus val at index - offset
// -Once done, return dp array

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), as output array does not count as extra space

console.log(countBits(5));

// 190. Reverse Bits

var reverseBits = function (n) {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    result *= 2;
    result += n & 1;
    n /= 2;
  }

  return result;
};

// Explanation:
// -Result *= 2 shifts bits left and adds 0 at the end
// -We retrieve rightmost bit and add it to result using n & 1
// -We then shift bits right and remove 0 from n
// -Once done, we return result

// Notes:
// -Time complexity: O(1), as size of integer is fixed
// -Space complexity: O(1)

console.log(reverseBits(00000010100101000001111010011100));

// 268. Missing Number

var missingNumber = function (nums) {
  let expected = (nums.length * (nums.length + 1)) / 2;
  let actual = nums.reduce((a, b) => a + b, 0);

  return expected - actual;
};

// Explanation:
// -Get expected sum by multiplying nums.length and nums.length + 1 and dividing that by 2
// -Add up nums to get actual sum
// -Return missing num, which is expected - actual sum

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)
// -An alternative approach would be to set missing to nums length and XOR missing against XOR of index and value and returning missing

console.log(missingNumber([0, 1, 3, 5, 4]));

// 167. Two Sum II - Input Array Is Sorted

var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];

    if (sum > target) {
      right--;
    } else if (sum < target) {
      left++;
    } else {
      break;
    }
  }

  return [left + 1, right + 1];
};

// Explanation:
// -Set left and right pointers to beginning and end of nums
// -While left < right:
// -If sum > target, decrease right by 1
// -Else if sum < target, increase left by 1
// -Else break and return left and right indices

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(twoSum([1, 7, 9, 11, 14], 16));

// 424. Longest Repeating Character Replacement

var characterReplacement = function (s, k) {
  let count = {};
  let longest = 0;
  let left = 0;
  let maxFreq = 0;

  for (let right = 0; right < s.length; right++) {
    let leftChar = s[left];
    let rightChar = s[right];

    count[rightChar] = count[rightChar] + 1 || 1;
    maxFreq = Math.max(maxFreq, count[rightChar]);

    while (right - left + 1 - maxFreq > k) {
      count[leftChar]--;
      left++;
    }

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};

// Explanation:
// -Create character count map
// -Set longest, left pointer, and max frequency to 0
// -For each char in string:
// -Increase char count in map
// -Set max frequency to greater of max frequency or curr char count
// -If replacement characters exceed k:
// -Decrease left character count and increase left pointer
// -Update longest to greater of longest or window size
// -Once done, return longest

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), as character map is of fixed max size of 26

console.log(characterReplacement("AABABBA", 1));

// 567. Permutation in String

var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) {
    return false;
  }

  let s1Count = new Array(26).fill(0);
  let s2Count = new Array(26).fill(0);

  for (let index in s1) {
    s1Count[s1[index].charCodeAt() - "a".charCodeAt()]++;
    s2Count[s2[index].charCodeAt() - "a".charCodeAt()]++;
  }

  let matches = 0;

  for (let i = 0; i < 26; i++) {
    matches += s1Count[i] === s2Count[i] ? 1 : 0;
  }

  let left = 0;

  for (let right = s1.length; right < s2.length; right++) {
    if (matches === 26) {
      return true;
    }

    let index = s2[right].charCodeAt() - "a".charCodeAt();
    s2Count[index]++;

    if (s1Count[index] === s2Count[index]) {
      matches++;
    } else if (s1Count[index] + 1 === s2Count[index]) {
      matches--;
    }

    index = s2[left].charCodeAt() - "a".charCodeAt();
    s2Count[index]--;

    if (s1Count[index] === s2Count[index]) {
      matches++;
    } else if (s1Count[index] - 1 === s2Count[index]) {
      matches--;
    }

    left++;
  }

  return matches === 26;
};

// Explanation:
// -If s1 length > s2 length, return false
// -Map out counts of characters up to length of s1 for both strings
// -Set matches to 0
// -For each index in count arrays:
// -If char count is equal for both strings, increase matches by 1
// -Set left pointer to 0
// -For each character from s1 length to end of s2:
// -If matches equals 26, return true
// -Get index in count array for right character
// -Increase s2 count at index
// -If s2 count and s1 count at that index are equal, increase matches by 1
// -Else if s2 count is 1 greater than s1 count, decrease matches by 1
// -Get index in count array for left character
// -Decrease left character count
// -If s1 and s2 count at that index are equal, increase matches by 1
// -Else if s2 count 1 less than s1 count, decrease matches by 1
// -Decrease left pointer
// -Once done, return whether matches equals 26

// Notes:
// -Time complexity: O(s1 length + (s2 length - s1 length))
// -Space complexity: O(1)

console.log(checkInclusion("ab", "eidboaoo"));

// 22. Generate Parentheses

var generateParenthesis = function (n) {
  let stack = [];
  let result = [];

  backtrack(0, 0);

  return result;

  function backtrack(open, close) {
    if (stack.length === n * 2) {
      result.push(stack.join(""));
      return;
    }
    if (open < n) {
      stack.push("(");
      backtrack(open + 1, close);
      stack.pop();
    }
    if (close < open) {
      stack.push(")");
      backtrack(open, close + 1);
      stack.pop();
    }
  }
};

// Explanation:
// -Initialize stack to store sequence and result array to store results
// -Backtrack on starting sequence of 0 open and 0 close
// -In backtrack:
// -If sequence length equals n * 2, convert stack to string, push to result, and return to exit
// -If open < n, push open parenthesis to stack and backtrack with open increased by 1
// -Once we hit base case, pop last open off stack
// -If close < open, push close parenthesis and backtrack with close increased by 1
// -Once we hit base case, pop last close off stack
// -Once done generating combinations, return result

// Notes:
// -Time complexity: O((4 ^ n) / (n ^ 0.5))
// -Space complexity: O((4 ^ n) / (n ^ 0.5))

console.log(generateParenthesis(9));

// 739. Daily Temperatures

var dailyTemperatures = function (temperatures) {
  let result = new Array(temperatures.length).fill(0);
  let stack = [];

  temperatures.forEach((temp, index) => {
    while (stack.length && temperatures[stack[stack.length - 1]] < temp) {
      let prev = stack.pop();
      result[prev] = index - prev;
    }
    stack.push(index);
  });

  return result;
};

// Explanation:
// -Fill result array of size temperatures length with zeros
// -Initialize empty stack
// -For each temp in temperatures:
// -While stack has work and last temp in stack < curr temp:
// -Pop last temp off stack
// -Get distance from curr to last temp and add that distance to last temp's index
// -Push curr temp index to stack
// -Once done, return result

// Notes:
// -Time complexity: O(n), as even though it looks like time complexity should be O(n ^ 2), we push and pop all items in temperatures at most once in worst case
// -Space complexity: O(n) for the stack, as result array does not count towards extra space

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));

// 853. Car Fleet

var carFleet = function (target, position, speed) {
  let map = {};
  let stack = [];

  position.forEach((car, index) => {
    map[car] = speed[index];
  });

  let keys = Object.keys(map);

  for (let i = keys.length - 1; i >= 0; i--) {
    let currP = keys[i];
    let currS = map[currP];
    let time = (target - currP) / currS;

    if (
      stack.length === 0 ||
      (stack.length > 0 && time > stack[stack.length - 1])
    ) {
      stack.push(time);
    }
  }

  return stack.length;
};

// Explanation:
// -Initialize empty stack
// -Map out cars and their speeds to get sorted order
// -For each car from largest position to smallest:
// -Get time to arrive at target from curr position
// -If stack is empty or stack has work and curr arrival time is greater than prev arrival time in stack, push time to stack
// -Once done, return stack length

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n) for both the map and stack

console.log(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]));

// 74. Search a 2D Matrix

var searchMatrix = function (matrix, target) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let top = 0;
  let bottom = rows - 1;

  while (top <= bottom) {
    let mid = Math.floor((bottom - top) / 2 + top);

    if (target > matrix[mid][matrix[0].length - 1]) {
      top = mid + 1;
    } else if (target < matrix[mid][0]) {
      bottom = mid - 1;
    } else {
      break;
    }
  }

  let foundRow = top <= bottom;

  if (foundRow) {
    let row = Math.floor((bottom - top) / 2 + top);
    let left = 0;
    let right = cols - 1;

    while (left <= right) {
      let mid = Math.floor((right - left) / 2 + left);

      if (target > matrix[row][mid]) {
        left = mid + 1;
      } else if (target < matrix[row][mid]) {
        right = mid - 1;
      } else {
        return true;
      }
    }
  }

  return false;
};

// Explanation:
// -Get number of rows and columns
// -Set top and bottom to first and last row indices
// -While top <= bottom:
// -Get middle row
// -If target > last element in middle row, set top to mid + 1
// -Else if target < first element in middle row, set bottom to mid - 1
// -Else break, as we've found our row
// -Check to see if row's been found and, if true:
// -Get row
// -Set left and right pointers to beginning and end of row
// -While left <= right:
// -Get middle element in row
// -If target > mid, set left to mid + 1
// -Else if target < mid, set right to mid - 1
// -Else return true if mid equals target
// -If row not found or target not found, return false

// Notes:
// -Time complexity: O(log rows + log cols), as we perform binary search first on rows and then on columns
// -Space complexity: O(1)

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
);

// 875. Koko Eating Bananas

var minEatingSpeed = function (piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left <= right) {
    let k = Math.floor((right - left) / 2 + left);
    let hours = 0;

    for (let pile of piles) {
      hours += Math.ceil(pile / k);
    }

    if (hours <= h) {
      right = k - 1;
    } else {
      left = k + 1;
    }
  }

  return left;
};

// Explanation:
// -Set left and right to possible speeds 1 through max of piles bananas per hour
// -While left <= right:
// -Get middle speed
// -Set curr hour count to 0
// -For each pile in piles:
// -Round up pile / middle speed and add to hours
// -If total hours <= max hours provided, set right to middle - 1
// -Else set left to middle + 1
// -Once done, return left pointer

// Notes:
// -Time complexity: O(log m * n), where m is the max pile and n is the total number of piles
// -Space complexity: O(1)

console.log(minEatingSpeed([3, 11, 8, 12], 8));

// 153. Find Minimum in Rotated Sorted Array

var findMin = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right - left) / 2 + left);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
};

// Explanation:
// -Set left and right pointers to beginning and end of nums
// -While left < right:
// -Get mid index
// -If num at mid > num at right, set left to mid + 1
// -Else set right to mid
// -Once we break out of while, return num at left index

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(findMin([4, 6, 7, 1, 2, 3]));

// 143. Reorder List

var reorderList = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  let curr = slow;
  let prev = null;

  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }

  let list1 = head;
  let list2 = prev;

  while (list2.next) {
    [list1.next, list1] = [list2, list1.next];
    [list2.next, list2] = [list1, list2.next];
  }
};

// Explanation:
// -Using fast and slow pointer to find middle
// -Reverse linked list from middle onwards
// -Merge two lists and return list

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);
reorderList(list);
console.log(list);

// 76. Minimum Window Substring

var minWindow = function (s, t) {
  let countT = {};
  let window = {};
  let have = 0;
  let unique = 0;

  for (let char of t) {
    unique = countT[char] ? unique : unique + 1;
    countT[char] = countT[char] + 1 || 1;
  }

  let left = 0;
  let right = 0;
  let pointers = [-1, -1];
  let shortest = Infinity;

  while (right < s.length) {
    let rightChar = s[right];
    window[rightChar] = window[rightChar] + 1 || 1;

    if (window[rightChar] === countT[rightChar]) {
      have++;
    }

    while (have === unique) {
      let size = right - left + 1;
      let leftChar = s[left];

      if (size < shortest) {
        shortest = size;
        pointers = [left, right];
      }

      window[leftChar]--;

      if (countT[leftChar] && window[leftChar] < countT[leftChar]) {
        have--;
      }

      left++;
    }

    right++;
  }

  return shortest === Infinity ? "" : s.substring(pointers[0], pointers[1] + 1);
};

// Explanation:
// -Map out character count and count unique characters for string t
// -Set left and right pointers to 0
// -Set shortest substring pointers to -1 and shortest substring to Infinity
// -While right < string s length:
// -Get right char
// -Increase char count in window map
// -If char count in window equals t count, increase have by 1
// -While have equals unique:
// -Get window size and left char
// -If size < shortest window: update shortest window and pointers
// -Decrease left char count by 1
// -If left char exists in count t and window left char count < t count:
// -Decrease have by 1
// -Increase left pointer by 1
// -Once done moving window, increase right pointer by 1
// -Finally, if shortest window equals infinity, return empty string, else return shortest substring

// Notes:
// -Time complexity: O(len t + len s)
// -Space complexity: O(len t + len s)

console.log(minWindow("ADOBECODEBANC", "ABC"));

// 19. Remove Nth Node From End of List

var ListNode = function (val, next = null) {
  return {
    val,
    next,
  };
};

var removeNthFromEnd = function (head, n) {
  let slow = head;
  let fast = head;

  while (fast && n) {
    fast = fast.next;
    n--;
  }

  if (!fast) {
    return head.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return head;
};

// Explanation:
// -Set slow and fast pointers to head
// -While fast not null and n > 0:
// -Move fast forward by n steps
// -If fast null, return head.next
// -While fast.next not null:
// -Move both fast and slow pointers forward
// -Once done, delete nth node by setting slow.next to slow.next.next and return head

// Notes:
// -Time complexity: O(n), where n is length of list
// -Space complexity: O(1)

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);
console.log(removeNthFromEnd(list, 2));

// 138. Copy List with Random Pointer

var Node = function (val, next, random) {
  return {
    val,
    next,
    random,
  };
};

var copyRandomList = function (head) {
  let curr = head;
  let map = new Map();
  map.set(null, null);

  while (curr) {
    copy = new Node(curr.val);
    map.set(curr, copy);
    curr = curr.next;
  }

  curr = head;

  while (curr) {
    copy = map.get(curr);
    copy.next = map.get(curr.next);
    copy.random = map.get(curr.random);
    curr = curr.next;
  }

  return map.get(head);
};

// Explanation:
// -Set curr to head
// -Initialize map w/ null values
// -While curr:
// -Create copy and set w/ curr in map
// -Then move forward in list
// -Set curr to head
// -While curr:
// -Get copy from map
// -Get next and set to copy.next
// -Do the same for random
// -Move curr forward
// -Once done, get head copy and return

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

let list = new Node(1);
list.next = new Node(2);
list.next.next = new Node(3);
list.next.next.next = new Node(4);
list.next.next.next.next = new Node(5);
list.random = list.next.next.next.next;
list.next.random = list.next.next;
list.next.next.random = list.next;
list.next.next.next.random = null;
list.next.next.next.next.random = list.next.next.next;
console.log(copyRandomList(list));

// 2. Add Two Numbers

var ListNode = function (val, next = null) {
  return {
    val,
    next,
  };
};

var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    let val1 = l1 ? l1.val : 0;
    let val2 = l2 ? l2.val : 0;

    let val = val1 + val2 + carry;
    carry = Math.floor(val / 10);
    val = val % 10;
    curr.next = new ListNode(val);

    curr = curr.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummy.next;
};

// Explanation:
// -Set dummy to new list node
// -Set curr to dummy
// -Set carry to 0
// -While l1 not null or l2 not null or carry not 0:
// -Get l1 val or set to 0 if l1 is null
// -Get l2 val or set to 0 if l2 is null
// -Add l1 val, l2 val, and carry
// -Set carry to floor of val / 10
// -Set val to remainder of val / 10
// -Set curr next value to new list node from val
// -Set curr to next value
// -Set l1 and l2 to next values or null if null
// -Once done, return dummy next value

// Notes:
// -Time complexity: O(max(l1, l2))
// -Space complexity: O(max(l1, l2))

let l1 = new ListNode(4);
l1.next = new ListNode(5);
l1.next.next = new ListNode(8);
let l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(7);
l2.next.next.next = new ListNode(1);
console.log(addTwoNumbers(l1, l2));

// 287. Find the Duplicate Number

var findDuplicate = function (nums) {
  let slow = 0;
  let fast = 0;

  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow === fast) {
      break;
    }
  }

  let slow2 = 0;

  while (slow !== slow2) {
    slow = nums[slow];
    slow2 = nums[slow2];
  }

  return slow;
};

// Explanation:
// -Set fast and slow pointers to index 0
// -While true:
// -Set slow to num at index slow and fast to num at num at index fast
// -If slow equals fast, break
// -Set second slow pointer to 0
// -While slow not equal to second slow:
// -Set slow and second slow to nums at their respective indicies
// -Once done and start of cycle detected, return slow

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(findDuplicate([1, 3, 2, 4, 2]));

// 1448. Count Good Nodes in Binary Tree

var goodNodes = function (root) {
  let stack = [[root, root.val]];
  let count = 0;

  while (stack.length) {
    let [curr, max] = stack.pop();

    if (curr) {
      if (curr.val >= max) {
        count++;
      }
      stack.push([curr.left, Math.max(max, curr.val)]);
      stack.push([curr.right, Math.max(max, curr.val)]);
    }
  }

  return count;
};

// Explanation:
// -Push root and root val to stack
// -Set count to 0
// -While stack has work:
// -Pop last item off stack
// -If valid node:
// -If curr val >= max, update count
// -Push left and right children to stack w/ max set as greater of max or curr val
// -Once done, return count

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

let bt = new Node(3);
bt.left = new Node(1);
bt.right = new Node(4);
bt.left.left = new Node(3);
bt.right.left = new Node(1);
bt.right.right = new Node(5);
console.log(goodNodes(bt));

// 211. Design Add and Search Words Data Structure

class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }
  setEnd(bool) {
    this.end = bool;
  }
  isEnd() {
    return this.end;
  }
}

class WordDictionary {
  constructor() {
    this.root = new Node();
  }
  addWord(string) {
    let node = this.root;

    for (let char of string) {
      if (!node.keys.has(char)) {
        node.keys.set(char, new Node());
      }
      node = node.keys.get(char);
    }

    node.setEnd(true);
  }
  search(string) {
    function dfs(index, root) {
      let node = root;

      for (let i = index; i < string.length; i++) {
        let char = string[i];

        if (char === ".") {
          for (let val of node.keys.keys()) {
            if (dfs(i + 1, node.keys.get(val))) {
              return true;
            }
          }

          return false;
        } else {
          if (!node.keys.has(char)) {
            return false;
          }

          node = node.keys.get(char);
        }
      }

      return node.isEnd();
    }

    return dfs(0, this.root);
  }
}

// Explanation:
// -Initialize trie node class
// -Initialize trie
// -For add word:
// -Perform normal trie word insertion and set end to true
// -For word search:
// -Perform dfs on index 0 and trie root
// -In dfs:
// -Set node to input root
// -For each index from input index to end of string:
// -If char is wildcard, perform dfs on node's children w/ index increased by 1
// -If dfs returns true, we return true
// -Else we return false if we make it through all children without returning true
// -Else if char is valid letter:
// -If node doesn't have char, return false
// -Else update node to char's children
// -Once done iterating through string, return node's end

// Notes:
// -Time complexity: O(n) for add word, where n is the string length. For search, time complexity is O(n) for well-defined word without dots and O((26 ^ n)) for undefined words, as we'll have to make up to 26 calls for each character in string
// -Space complexity: O(n) for add word, O(1) for defined word search, and O(n) for undefined word search to keep recursion stack

let trie = new WordDictionary();
trie.addWord("bad");
trie.addWord("cab");
trie.addWord("sad");
console.log(trie.search("..d"));
console.log(trie.search("bad"));
console.log(trie.search("car"));
console.log(trie.search("b.."));

// 215. Kth Largest Element in an Array

var findKthLargest = function (nums, k) {
  k = nums.length - k;

  function quickSelect(l, r) {
    let pivot = nums[r];
    let pointer = l;

    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) {
        [nums[pointer], nums[i]] = [nums[i], nums[pointer]];
        pointer++;
      }
    }

    [nums[pointer], nums[r]] = [nums[r], nums[pointer]];

    if (pointer > k) {
      return quickSelect(l, pointer - 1);
    } else if (pointer < k) {
      return quickSelect(pointer + 1, r);
    } else {
      return nums[pointer];
    }
  }

  return quickSelect(0, nums.length - 1);
};

// Explanation:
// -Set k to index of kth largest element
// -Return result of running quick select on full nums array
// -In quick select:
// -Set pivot to num at input right index
// -Set pointer to input left index
// -For each num from left index to right index:
// -If num <= pivot, swap num w/ num at pointer and increase pointer
// -Once done, swap num at pointer with rightmost num to get partitioned array
// -If pointer > k, return result of running quick select from left to pointer - 1
// -Else if pointer < k, return result of running quick select from pointer + 1 to right
// -Else return num at pointer if pointer equals k

// Notes:
// -Time complexity: O(n) average case, O(n ^ 2) worst case
// -Space complexity: O(1)

console.log(findKthLargest([-3, 2, 1, -5, 6, -4], 2));

// 355. Design Twitter

class Twitter {
  constructor() {
    this.time = 0;
    this.tweets = new Map();
    this.users = new Map();
  }
  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) {
      this.tweets.set(userId, []);
    }
    this.tweets.get(userId).push([tweetId, this.time]);
    this.time++;
  }
  getNewsFeed(userId) {
    if (!this.users.has(userId)) {
      this.users.set(userId, new Set());
    }

    this.users.get(userId).add(userId);
    let following = Array.from(this.users.get(userId));
    let tweets = {};

    for (let user of following) {
      if (this.tweets.has(user)) {
        for (let [id, time] of this.tweets.get(user)) {
          tweets[time] = id;
        }
      }
    }

    let result = [];
    let sorted = Object.keys(tweets);

    for (let i = sorted.length - 1; i >= 0; i--) {
      if (result.length < 10) {
        result.push(tweets[sorted[i]]);
      } else {
        break;
      }
    }

    return result;
  }
  follow(followerId, followeeId) {
    if (!this.users.has(followerId)) {
      this.users.set(followerId, new Set());
    }
    this.users.get(followerId).add(followeeId);
  }
  unfollow(followerId, followeeId) {
    if (this.users.has(followerId)) {
      if (this.users.get(followerId).has(followeeId)) {
        this.users.get(followerId).delete(followeeId);
      }
    }
  }
}

// Explanation:
// -Initialize twitter class w/ time at 0 and users and tweets set to empty maps
// -For post tweet method:
// -If user not in tweets, set user and empty array in tweets
// -Push tweet id and time to user in tweets and increase time by 1
// -For get news feed method:
// -If users doesn't have user id, add user and empty set to users
// -Add user id to user following set
// -Get array of followers
// -Set tweets to empty object
// -For each follower in followers:
// -If follower has tweeted:
// -Add time and tweet id to tweets object
// -Once tweets added to tweets object, set result to empty array and get times in tweets
// -For all times back to front:
// -If result length < 10, add tweet id to result
// -Else break and return result
// -For follow method:
// -If users doesn't have follower id, add follower id and empty set
// -Add followee to follower set
// -For unfollow method:
// -If users has follower id:
// -If follower has followee in set:
// -Delete followee from set

// Notes:
// -Time complexity: O(1) for add tweet, follow, and unfollow. O(n) for get news feed, where n is the number of tweets
// -Space complexity: O(n) for post tweet, get news feed, and follow. O(1) for unfollow.

let t = new Twitter();
t.postTweet(1, 5);
console.log(t.getNewsFeed(1));
t.follow(1, 2);
t.postTweet(2, 6);
console.log(t.getNewsFeed(1));
t.unfollow(1, 2);
t.getNewsFeed(1);

// 90. Subsets II

var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  let results = [];

  backtrack(0, []);

  return results;

  function backtrack(start, path) {
    results.push(path.slice());

    for (let i = start; i < nums.length; i++) {
      if (i !== start && nums[i] === nums[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
};

// Explanation:
// -Sort nums array
// -Set results to empty array
// -Backtrack on index 0 and empty path
// -In backtrack:
// -Push copy of path to results
// -For each index in num starting at i:
// -If the num is considered for the first time in function call and is not a duplicate:
// -Add num to path
// -Backtrack on updated path and curr index + 1
// -While backtracking, remove last num added from path and continue iterating
// -Once done, return results

// Notes:
// -Time complexity: O(n * 2 ^ n), as it takes 2 ^ n to generate all subsets, and we have to make a copy of the subset at each call, adding an additional O(n) time
// -Space complexity: O(n) for the recursion stack

console.log(subsetsWithDup([3, 1, 2, 1, 5]));

// 40. Combination Sum II

var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);

  let result = [];

  backtrack(target, 0, []);

  return result;

  function backtrack(amount, start, path) {
    if (amount === 0) {
      result.push(path.slice());
    }
    if (amount <= 0) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      let candidate = candidates[i];

      if (i !== start && candidate === candidates[i - 1]) {
        continue;
      }

      path.push(candidate);
      backtrack(amount - candidate, i + 1, path);
      path.pop();
    }
  }
};

// Explanation:
// -Sort input array
// -Backtrack on target amount, start index of 0, and empty path
// -Inside backtrack:
// -If amount equals 0, push copy of path to results
// -If amount <= 0, return and exit backtrack
// -For each num in array starting from input index:
// -If curr index not equal to input index and curr num equal to prev num, continue
// -Else push candidate to path and backtrack w/ updated path and curr index + 1
// -While backtracking, remove last num from path and continue iteration
// -Once done, return results

// Notes:
// -Time complexity: O((2 ^ n) * n) in the worst case to exhaust all possible combinations in array
// -Space complexity: O(n) for both the recursion stack and path

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));

// 297. Serialize and Deserialize Binary Tree

function TreeNode(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

var serialize = function (root) {
  let result = [];

  dfs(root);

  return result.join(",");

  function dfs(node) {
    if (!node) {
      result.push("N");
      return;
    }

    result.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
};

var deserialize = function (data) {
  data = data.split(",");
  let index = 0;

  return dfs();

  function dfs() {
    if (data[index] === "N") {
      index++;
      return null;
    }

    let rootVal = Number(data[index]);
    let root = new TreeNode(rootVal);
    index++;
    root.left = dfs();
    root.right = dfs();

    return root;
  }
};

// Explanation:
// -For serialize:
// -Perform preorder dfs traversal on bt starting at root
// -In dfs:
// -If node is null, push 'N' to result and return to exit
// -Push node val to result as string
// -Perform dfs on left and right children
// -Once done, return result joined on ','
// -For deserialize:
// -Split string in ','
// -Set index to 0
// -Return result of dfs on serialized data
// -In dfs:
// -If curr index is 'N', increase index by 1 and return null and exit
// -Create new node from node val
// -Increase index by 1
// -Set root left and root right to result of dfs
// -Once done searching, return root to dfs

// Notes:
// -Time complexity: O(n) for both serialization and deserialization
// -Space complexity: O(n) for both serialization and deserialization

let bt = new TreeNode(1);
bt.left = new TreeNode(2);
bt.right = new TreeNode(3);
bt.right.left = new TreeNode(4);
bt.right.right = new TreeNode(5);
console.log(deserialize(serialize(bt)));

// 131. Palindrome Partitioning

var partition = function (s) {
  let palindromes = [];

  dfs(0, []);

  return palindromes;

  function dfs(start, path) {
    if (start >= s.length) {
      palindromes.push(path.slice());
      return;
    }

    for (let i = start; i < s.length; i++) {
      if (isPalindrome(start, i)) {
        let palindrome = s.substring(start, i + 1);
        path.push(palindrome);
        dfs(i + 1, path);
        path.pop();
      }
    }
  }

  function isPalindrome(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) {
        return false;
      }

      l++;
      r--;
    }

    return true;
  }
};

// Explanation:
// -Perform dfs on string w/ start index at 0 and empty path
// -In dfs:
// -If start index >= string length, push copy of path to result and return
// -For each char in string from start index:
// -If curr substring start through curr index is palindrome:
// -Push substring to path
// -Backtrack on curr index + 1 and updated path
// -While backtracking, pop last char off path and continue iteration
// -Once done, return palindromes

// Notes:
// -Time complexity: O(n * (2 ^ n)), as getting all combinations takes O(2 ^ n) time and creating substring takes O(n) time
// -Space complexity: O(n) on the recursion stack

console.log(partition("aab"));

// 695. Max Area of Island

var maxAreaOfIsland = function (grid) {
  let maxRow = grid.length - 1;
  let maxCol = grid[0].length - 1;
  let max = 0;

  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      max = Math.max(max, dfs(row, col));
    }
  }

  return max;

  function dfs(row, col) {
    if (
      row < 0 ||
      row > maxRow ||
      col < 0 ||
      col > maxCol ||
      grid[row][col] !== 1
    ) {
      return 0;
    }

    grid[row][col] = "*";

    return (
      1 +
      dfs(row + 1, col) +
      dfs(row - 1, col) +
      dfs(row, col + 1) +
      dfs(row, col - 1)
    );
  }
};

// Explanation:
// -For each node in grid:
// -Set max to greater of max or result of dfs on node coordinates
// -In dfs:
// -If coordinates out of bounds or node not equal to 1, return 0
// -Mark node as visited
// -Return 1 + sum of results of dfs performed on 4-directional neighbors
// -Once done, we return max area

// Notes:
// -Time complexity: O(rows * cols)
// -Space complexity: O(rows * cols) on the recursion stack

console.log(
  maxAreaOfIsland([
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ])
);

// 417. Pacific Atlantic Water Flow

var pacificAtlantic = function (heights) {
  let maxRow = heights.length - 1;
  let maxCol = heights[0].length - 1;
  let pacific = new Set();
  let atlantic = new Set();

  for (let col = 0; col <= maxCol; col++) {
    dfs(0, col, pacific, heights[0][col]);
    dfs(maxRow, col, atlantic, heights[maxRow][col]);
  }

  for (let row = 0; row <= maxRow; row++) {
    dfs(row, 0, pacific, heights[row][0]);
    dfs(row, maxCol, atlantic, heights[row][maxCol]);
  }

  return Array.from(pacific)
    .filter((coordinate) => atlantic.has(coordinate))
    .map((coordinate) => coordinate.split(","));

  function dfs(row, col, memo, prevHeight) {
    let directions = [0, 1, 0, -1, 0];
    let coordinate = `${row},${col}`;

    if (memo.has(coordinate) || prevHeight > heights[row][col]) {
      return;
    }

    memo.add(coordinate);

    for (let i = 0; i < directions.length - 1; i++) {
      let newRow = row + directions[i];
      let newCol = col + directions[i + 1];

      if (newRow >= 0 && newCol >= 0 && newRow <= maxRow && newCol <= maxCol) {
        dfs(newRow, newCol, memo, heights[row][col]);
      }
    }
  }
};

// Explanation:
// -Create empty sets to track valid nodes from pacific and atlantic
// -For each row bordering pacific and atlantic, perform dfs on rows adding valid nodes to set
// -For each col bordering pacific and atlantic, perform dfs on cols adding valid nodes to set
// -In dfs:
// -If curr set has coordinate or curr height < prev height, return to exit dfs
// -Else add coordinate to set and perform dfs on valid neighbors
// -Once done, return array of all node in both sets

// Notes:
// -Time complexity: O(rows * columns)
// -Space complexity: O(rows * columns)

console.log(
  pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ])
);

// 130. Surrounded Regions

var solve = function (board) {
  let maxRow = board.length - 1;
  let maxCol = board[0].length - 1;

  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      if (row === 0 || row === maxRow || col === 0 || col === maxCol) {
        if (board[row][col] === "O") {
          dfs(row, col);
        }
      }
    }
  }
  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      if (board[row][col] === "O") {
        board[row][col] = "X";
      }
      if (board[row][col] === "*") {
        board[row][col] = "O";
      }
    }
  }

  return board;

  function dfs(row, col) {
    let directions = [0, 1, 0, -1, 0];
    board[row][col] = "*";

    for (let i = 0; i < directions.length - 1; i++) {
      let newRow = row + directions[i];
      let newCol = col + directions[i + 1];

      if (
        newRow >= 0 &&
        newRow <= maxRow &&
        newCol >= 0 &&
        newCol <= maxCol &&
        board[newRow][newCol] === "O"
      ) {
        dfs(newRow, newCol);
      }
    }
  }
};

// Explanation:
// -For each node in board, if node on border and marked as O, perform dfs on node
// -In dfs:
// -Mark node as visited
// -If neighbor in bounds and equal to 0, perform dfs on neighbor
// -Once done, iterate through board and mark all O's as X's and all visited as O's
// -Finally, return board

// Notes:
// -Time complexity: O(rows * cols)
// -Space complexity: O(rows * cols)

console.log(
  solve([
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"],
  ])
);

// 42. Trapping Rain Water

var trap = function (height) {
  if (height === null || height.length === 0) {
    return 0;
  }

  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let result = 0;

  while (left < right) {
    if (rightMax > leftMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      result += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      result += rightMax - height[right];
    }
  }

  return result;
};

// Explanation:
// -If height array is empty or null, return 0
// -Set left and right pointers to beginning and end of array
// -Set left max and right max to nums at left and right pointers
// -While left < right:
// -If right max > left max:
// -Trapped is determined by left max so we increment left, update left max, and add left max - curr left to result
// -Else trapped is determined by right max so we decrement right, update right max, and add right max - curr right to result
// -Once done, we return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

// 286. Walls and Gates

var wallsAndGates = function (rooms) {
  let maxRow = rooms.length - 1;
  let maxCol = rooms[0].length - 1;
  let directions = [0, 1, 0, -1, 0];
  let q = [];

  for (let row = 0; row <= maxRow; row++) {
    for (let col = 0; col <= maxCol; col++) {
      if (rooms[row][col] === 0) {
        q.push([row, col]);
      }
    }
  }

  while (q.length) {
    let [row, col] = q.shift();

    for (let i = 0; i < directions.length - 1; i++) {
      let newRow = row + directions[i];
      let newCol = col + directions[i + 1];

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow > maxRow ||
        newCol > maxCol ||
        rooms[newRow][newCol] !== Math.pow(2, 31) - 1
      ) {
        continue;
      }

      rooms[newRow][newCol] = rooms[row][col] + 1;
      q.push([newRow, newCol]);
    }
  }

  return rooms;
};

// Explanation:
// -Add all gates to queue
// -While queue has work:
// -Pop first item off queue
// -For each direction up, down, left, right:
// -If new coordinate not out of bounds and is empty:
// -Mark cell as 1 + curr coordinate distance and push new coordinates to queue
// -Once done, return rooms

// Notes:
// -Time complexity: O((row * columns) ^ 2) given shift operation inside while loop
// -Space complexity: O(rows * columns) for the queue

console.log(
  wallsAndGates([
    [2147483647, -1, 0, 2147483647],
    [2147483647, 2147483647, 2147483647, -1],
    [2147483647, -1, 2147483647, -1],
    [0, -1, 2147483647, 2147483647],
  ])
);

// 210. Course Schedule II

var findOrder = function (numCourses, prerequisites) {
  let graph = new Map();
  let visiting = new Set();
  let visited = new Set();
  let result = [];

  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }
  for (let [course, prereq] of prerequisites) {
    graph.get(course).push(prereq);
  }
  for (let [course, prereqs] of graph) {
    if (!dfs(course)) {
      return [];
    }
  }

  return result;

  function dfs(course) {
    if (visiting.has(course)) {
      return false;
    }
    if (visited.has(course)) {
      return true;
    }

    visiting.add(course);
    let prereqs = graph.get(course);

    if (prereqs) {
      for (let prereq of prereqs) {
        if (!dfs(prereq)) {
          return false;
        }
      }
    }

    visiting.delete(course);
    visited.add(course);
    result.push(course);
    return true;
  }
};

// Explanation:
// -Initialize graph w/ all courses 0 through numCourses
// -Push prereqs to courses in graph
// -For each course in graph:
// -If dfs returns false, return empty array
// -In dfs:
// -If course in visiting, cycle found so we return false
// -If course in visited, return true as course has already been validated
// -Else add course to visiting and get prereqs
// -Perform dfs on each prereq
// -If we find cycle by checking prereq, return false
// -Once done checking course and its prereq:
// -Remove course from visiting, add to visited, push course to result, and return true

// Notes:
// -Time complexity: O(vertices + edges)
// -Space complexity: O(vertices + edges)

console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ])
);

// 684. Redundant Connection

var findRedundantConnection = function (edges) {
  let parent = [];
  let rank = new Array(edges.length + 1).fill(1);

  for (let i = 0; i <= edges.length; i++) {
    parent[i] = i;
  }
  for (let [node, edge] of edges) {
    if (!union(node, edge)) {
      return [node, edge];
    }
  }

  function find(node) {
    let p = parent[node];

    while (p !== parent[p]) {
      parent[p] = parent[parent[p]];
      p = parent[p];
    }

    return p;
  }

  function union(node1, node2) {
    let p1 = find(node1);
    let p2 = find(node2);

    if (p1 === p2) {
      return false;
    }
    if (rank[p1] > rank[p2]) {
      parent[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      parent[p1] = p2;
      rank[p2] += rank[p1];
    }

    return true;
  }
};

// Explanation:
// -Set values in parent array to all indices in edges
// -For each edge, set rank to 1
// -For each node, edge in edges:
// -If union find returns false, return node / edge pair
// -In union:
// -Get parent nodes of node and edge using find:
// -In find:
// -Get parent of node
// -While parent not equal to parent of parent:
// -Set parent of node to parent of node's parent
// -Set parent to parent of parent
// -Once we've found our leader, we return it
// -Back in union:
// -If both leaders are equal, we return false
// -If rank of first leader > second leader:
// -Set parent of second leader to first leader and update rank of first leader to include rank of second leader
// -Else set parent at first leader to second leader and update second leader rank to include rank of first leader
// -Then return true and move to next node / edge pair

// Notes:
// -Time complexity: O(n), where n is the number of vertices
// -Space complexity: O(n)

console.log(
  findRedundantConnection([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ])
);

// 323. Number of Connected Components in an Undirected Graph

var countComponents = function (n, edges) {
  let graph = new Map();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (let [node, edge] of edges) {
    graph.get(node).push(edge);
    graph.get(edge).push(node);
  }

  let count = 0;
  let visited = new Set();

  for (let [node, edges] of graph) {
    if (!visited.has(node)) {
      count++;
      dfs(node);
    }
  }

  return count;

  function dfs(node) {
    visited.add(node);
    let edges = graph.get(node);

    for (let edge of edges) {
      if (!visited.has(edge)) {
        dfs(edge);
      }
    }
  }
};

// Explanation:
// -Create adjacency list
// -Set count to 0 and visited to empty set
// -For each node in graph:
// -If node not in visited:
// -Increase count and perform dfs on node
// -In dfs:
// -Mark node as visited
// -For each of node's edges:
// -If edge not in visited:
// -Perform dfs on edge
// -Once done, return count

// Notes:
// -Time complexity: O(vertices + edges)
// -Space complexity: O(vertices + edges)

console.log(
  countComponents([
    [0, 1],
    [1, 2],
    [3, 4],
  ])
);

// 261. Graph Valid Tree

var validTree = function (n, edges) {
  let graph = new Map();
  let visited = new Set();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (let [node, edge] of edges) {
    graph.get(node).push(edge);
    graph.get(edge).push(node);
  }

  return dfs(0, -1) && n === visited.size;

  function dfs(node, prev) {
    if (visited.has(node)) {
      return false;
    }

    visited.add(node);

    for (let edge of graph.get(node)) {
      if (edge === prev) {
        continue;
      }
      if (!dfs(edge, node)) {
        return false;
      }
    }

    return true;
  }
};

// Explanation:
// -Create adjacency list
// -Perform dfs on index 0 and prev index -1
// -In dfs:
// -If visited has node, return false
// -Add node to visited
// -For each of node's edges:
// -If edge equals previous, continue
// -Else if dfs on edge returns false, return false
// -Once done recursing on edges, return true
// -If dfs returns true and size of visited is equal to n, return true

// Notes:
// -Time complexity: O(vertices + edges)
// -Space complexity: O(vertices + edges)

console.log(
  validTree(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ])
);

// 295. Find Median from Data Stream

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }
  swap(start, end) {
    [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
  }
  size() {
    return this.data.length;
  }
  top() {
    return this.data[0] || null;
  }
  add(num) {
    this.data.push(num);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parent = this.parent(index);

    while (this.compare(this.data[index], this.data[parent]) < 0) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }
  bubbleDown() {
    let index = 0;
    let size = this.size();

    while (true) {
      let left = null;
      let right = null;
      let swap = null;
      let leftIndex = this.left(index);
      let rightIndex = this.right(index);

      if (leftIndex < size) {
        left = this.data[leftIndex];

        if (this.compare(left, this.data[index]) < 0) {
          swap = leftIndex;
        }
      }
      if (rightIndex < size) {
        right = this.data[rightIndex];

        if (
          (swap !== null && this.compare(right, left) < 0) ||
          (swap === null && this.compare(right, this.data[index]) < 0)
        ) {
          swap = rightIndex;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(index, swap);
      index = swap;
    }
  }
}

class MedianFinder {
  constructor() {
    this.maxHeap = new Heap((a, b) => b - a);
    this.minHeap = new Heap((a, b) => a - b);
  }
  addNum(num) {
    let lowSize = this.maxHeap.size();
    let highSize = this.minHeap.size();

    if (highSize < 1) {
      this.minHeap.add(num);
      return;
    }
    if (lowSize === highSize) {
      if (num < this.maxHeap.top()) {
        this.minHeap.add(this.maxHeap.pop());
        this.maxHeap.add(num);
      } else {
        this.minHeap.add(num);
      }
    } else {
      if (num > this.minHeap.top()) {
        let remove = this.minHeap.pop();
        this.maxHeap.add(remove);
        this.minHeap.add(num);
      } else {
        this.maxHeap.add(num);
      }
    }
  }
  findMedian() {
    let lowSize = this.maxHeap.size();
    let highSize = this.minHeap.size();

    if (lowSize < 1 && highSize < 1) {
      return null;
    }
    if (lowSize === highSize) {
      return (this.maxHeap.top() + this.minHeap.top()) / 2;
    }

    return this.minHeap.top();
  }
}

// Explanation:
// -Initialize max heap to keep low half and min heap to keep high half
// -For insert:
// -If high half empty, push num to high half and return to exit
// -If low and high half are even:
// -If num < low half top:
// -Remove top from low half and add to high half, then add num to low half
// -Else add num to high half
// -Else if not even:
// -If num > high half bottom:
// -Remove bottom from high half and add top low half, then add num to high half
// -Else add num to low half
// -For find median:
// -If heaps are empty, return null
// -If even, return average of low half top and high half bottom
// -Else return high half botttom

// Notes:
// -Time complexity: O(log n) for insert and O(1) for find median
// -Space complexity: O(n)

let median = new MedianFinder();
median.addNum(1);
console.log(median.findMedian());
median.addNum(3);
median.addNum(5);
console.log(median.findMedian());
median.addNum(2);
console.log(median.findMedian());

// 1584. Min Cost to Connect All Points

var minCostConnectPoints = function (points) {
  let cost = 0;
  let next = 0;
  let n = points.length;
  let dist = new Array(n).fill(Infinity);
  dist[0] = 0;

  for (let j = 1; j < n; j++) {
    let min = Infinity;
    let point = -1;

    for (let i = 1; i < n; i++) {
      if (dist[i] > 0) {
        let currDist =
          Math.abs(points[i][0] - points[next][0]) +
          Math.abs(points[i][1] - points[next][1]);
        dist[i] = Math.min(dist[i], currDist);

        if (dist[i] < min) {
          min = dist[i];
          point = i;
        }
      }
    }

    cost += min;
    dist[point] = 0;
    next = point;
  }

  return cost;
};

// Explanation:
// -Set result cost to 0
// -Set distances for each node to infinity
// -Set next pointer to 0
// -Calculate all distances from selected point
// -Get point w/ min distance
// -Add that distance to cost
// -Mark point as visited to exclude from future search
// -Update next point to curr min point
// -Once all points connected, return cost

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(n)

console.log(
  minCostConnectPoints([
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ])
);

// 743. Network Delay Time

var networkDelayTime = function (times, n, k) {
  let weights = new Array(n + 1).fill(Infinity);
  weights[k] = 0;

  for (let i = 0; i < n; i++) {
    for (let [source, target, time] of times) {
      if (weights[source] === Infinity) {
        continue;
      }
      if (weights[target] > weights[source] + time) {
        weights[target] = weights[source] + time;
      }
    }
  }

  let result = 0;

  for (let i = 1; i < weights.length; i++) {
    if (weights[i] > result) {
      result = weights[i];
    }
  }

  return result === Infinity ? -1 : result;
};

// Explanation:
// -Set weights for each node to 0
// -Set start node weight to 0
// -For each node:
// -Iterate through signal times lowering time to node at each iteration
// -If node equals infinity, we haven't figured out path to node yet so continue
// -Else update time to target if time from curr node less than time at target
// -Return max in weights, as this is how long it'll take to reach last node
// -Once done, return -1 if max is infinity and node can't be reached, else return max

// Notes
// -Time complexity: O(nodes * edges)
// -Space complexity: O(n)

console.log(
  networkDelayTime(
    [
      [2, 1, 1],
      [2, 3, 1],
      [3, 4, 1],
    ],
    4,
    2
  )
);

// 787. Cheapest Flights Within K Stops

var findCheapestPrice = function (n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    let temp = prices.slice();

    for (let [source, dest, price] of flights) {
      if (prices[source] === Infinity) {
        continue;
      }
      if (temp[dest] > prices[source] + price) {
        temp[dest] = prices[source] + price;
      }
    }

    prices = temp;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
};

// Explanation:
// -Fill price for each node w/ infinity
// -Set price at source to 0
// -For k + 1 edges, or k stops:
// -Set temp to copy of prices
// -For each flight:
// -If price at curr origin is infinity, path not found yet so we continue
// -Else if price to curr destination < curr price at curr destination, update price
// -Once we iterate through all flights, set prices to temp
// -Once done iterating through stops, return -1 if price at destination not found or price at destination

// Notes:
// -Time complexity: O(nodes * edges)
// -Space complexity: O(nodes)

console.log(
  findCheapestPrice(
    4,
    [
      [0, 1, 100],
      [1, 2, 100],
      [2, 0, 100],
      [1, 3, 600],
      [2, 3, 200],
    ],
    0,
    3,
    1
  )
);

// 198. House Robber

var rob = function (nums) {
  let rob1 = 0;
  let rob2 = 0;

  for (let num of nums) {
    [rob1, rob2] = [rob2, Math.max(num + rob1, rob2)];
  }

  return rob2;
};

// Explanation:
// -For each house in nums:
// -Rob 1 will equal rob 2
// -Rob 2 will equal greater of curr + rob 1 or rob 2
// -Once done, return rob 2

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(rob([1, 2, 3, 1]));

// 213. House Robber II

var rob = function (nums) {
  let first = helper(0, nums.length - 1);
  let second = helper(1, nums.length);

  return Math.max(nums[0], first, second);

  function helper(start, end) {
    let rob1 = 0;
    let rob2 = 0;

    while (start < end) {
      [rob1, rob2] = [rob2, Math.max(nums[start] + rob1, rob2)];
      start++;
    }

    return rob2;
  }
};

// Explanation:
// -Run helper on all nums excluding last
// -Run helper on all nums excluding first
// -Return greater of first item, first partition, or second partition
// -In helper:
// -Set 2 prev home and prev home to 0
// -While start < end:
// -Set 2 prev home to prev home
// -Set prev home to greater of curr num plus 2 prev home or prev home and increase start
// -Once done, return val at prev home

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(rob([1, 2, 3, 1]));

// 51. N-Queens

var solveNQueens = function (n) {
  let cols = new Set();
  let negDiagonals = new Set();
  let posDiagonals = new Set();
  let board = [];

  for (let i = 0; i < n; i++) {
    board[i] = [];

    for (let j = 0; j < n; j++) {
      board[i][j] = ".";
    }
  }

  let result = [];

  backtrack(0);

  return result;

  function backtrack(row) {
    if (row === n) {
      let copy = [];

      for (let i = 0; i < board.length; i++) {
        copy.push(board[i].join(""));
      }

      result.push(copy);
      return;
    }
    for (let col = 0; col < n; col++) {
      let posDiagonal = row + col;
      let negDiagonal = row - col;

      if (
        cols.has(col) ||
        posDiagonals.has(posDiagonal) ||
        negDiagonals.has(negDiagonal)
      ) {
        continue;
      }

      cols.add(col);
      posDiagonals.add(posDiagonal);
      negDiagonals.add(negDiagonal);

      board[row][col] = "Q";
      backtrack(row + 1);

      cols.delete(col);
      posDiagonals.delete(posDiagonal);
      negDiagonals.delete(negDiagonal);
      board[row][col] = ".";
    }
  }
};

// Explanation:
// -Track placed cols and diagonals w/ sets
// -Build n x n board
// -Backtrack on first row
// -In backtrack:
// -If row equals n:
// -Push copy of board to result and return to exit
// -For each col in row:
// -Continue if col or diagonals are in set
// -Add col and diagonals to set
// -Mark node as queen
// -Backtrack on next row
// -While backtracking, remove col and diagonals from set and unmark node before continuing iteration
// -Once done, return result

// Notes:
// -Time complexity: O(n!), as we have n tries on first row, n - 1 tries on second row, and so on
// -Space complexity: O(n ^ 2) to keep board state

console.log(solveNQueens(10));

// 647. Palindromic Substrings

var countSubstrings = function (s) {
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j of [i, i + 1]) {
      let l = i;
      let r = j;

      while (s[l] && s[l] === s[r]) {
        count++;
        l--;
        r++;
      }
    }
  }

  return count;
};

// Explanation:
// -Set count to 0
// -For each char in string:
// -Expand around center for both even and odd
// -If palindrome found, increase count and move pointers
// -Once done, return count

// Notes:
// -Time complexity: O(n ^ 2);
// -Space complexity: O(1)

console.log(countSubstrings("abc"));

// 91. Decode Ways

var numDecodings = function (s) {
  if (s.length === 0 || s === null || s[0] === "0") {
    return 0;
  }

  let dp = new Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    if (s[i - 1] !== "0") {
      dp[i] += dp[i - 1];
    }

    let num = Number(s.substring(i - 2, i));

    if (num >= 10 && num <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[s.length];
};

// Explanation:
// -Fill dp array with zeros
// -Set count for first two digits to 1
// -For each subsequent digit in string:
// -If prev digit from curr between 1 and 9, add count from prev digit in dp
// -If prev two digits from curr between 10 and 26, add count from prev 2 in dp
// -Once done, return count at end of dp array

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(numDecodings("101127"));

// 152. Maximum Product Subarray

var maxProduct = function (nums) {
  let result = Math.max(...nums);
  let [currMax, currMin] = [1, 1];

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];

    if (num === 0) {
      [currMax, currMin] = [1, 1];
      continue;
    }

    let temp = currMax * num;
    currMax = Math.max(temp, currMin * num, num);
    currMin = Math.min(temp, currMin * num, num);

    result = Math.max(result, currMax);
  }

  return result;
};

// Explanation:
// -Set result to largest num in nums
// -Set curr max and curr min to 1
// -For each num in nums:
// -If num equals 0, reset curr max and min and continue
// -Else set temp to curr max * num
// -Set curr max to greater of temp, curr min * num, or num
// -Set curr min to lesser of temp, curr min * num, or num
// -Set result to greater of result or new curr max
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(maxProduct([2, 3, -2, 4]));

// 300. Longest Increasing Subsequence

var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1);

  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
};

// Explanation:
// -Fill dp array of size nums length with 1s
// -From each num back to front:
// -Check all previous nums against curr num
// -If curr num < prev num, update curr num index in dp w/ max of curr dp val or prev dp val + 1
// -Once done, return greatest subsequence in dp

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(n)

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));

// 127. Word Ladder

var ladderLength = function (beginWord, endWord, wordList) {
  let graph = new Map();

  for (let word of wordList) {
    for (let i = 0; i < word.length; i++) {
      let pattern = word.substring(0, i) + "*" + word.substring(i + 1);

      if (!graph.has(pattern)) {
        graph.set(pattern, []);
      }

      graph.get(pattern).push(word);
    }
  }

  let stack = [beginWord];
  let edges = [];
  let visited = new Set();
  let result = 0;

  while (stack.length) {
    let word = stack.pop();

    if (word === endWord) {
      return result + 1;
    }

    for (let i = 0; i < word.length; i++) {
      let pattern = word.substring(0, i) + "*" + word.substring(i + 1);

      for (let edge of graph.get(pattern) || []) {
        if (!visited.has(edge)) {
          visited.add(edge);
          edges.push(edge);
        }
      }
    }

    if (stack.length === 0) {
      [stack, edges] = [edges, []];
      result++;
    }
  }

  return 0;
};

// Explanation:
// -Add patterns and corresponding words to graph
// -Push begin word to stack
// -Set edges to empty array and visited to empty set
// -While stack has work:
// -Pop last word off stack
// -If word equals end word, add 1 to result and return
// -For each possible pattern from word:
// -For all words in pattern:
// -If not in visited, add to visited and push to edges
// -If stack empty, replace stack w/ edges and reset edges. Then add 1 to result.
// -If we don't find end word, return 0

// Notes:
// -Time complexity: O(n * (m ^ 2)), where n is number of words and m is longest word length
// -Space complexity: O(n * (m ^ 2)) to store all m transformations of n words

console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);

// 518. Coin Change 2

var change = function (amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
};

// Explanation:
// -Fill dp array from 0 to amount w/ zeros
// -Set dp[0] to 1, as there is only one way to make 0 change
// -For each coin:
// -For each index starting at coin:
// -Dp index equal to curr ways to make change plus amount - coin ways to make change
// -Once done, return value at amount

// Notes:
// -Time complexity: O(n * amount), where n is the number of coins
// -Space complexity: O(amount) for dp array

console.log(change(5, [1, 2, 5]));

// 494. Target Sum

var findTargetSumWays = function (nums, target) {
  let memo = new Map();

  return backtrack(0, 0);

  function backtrack(index, amount) {
    let key = `${index}, ${amount}`;
    let num = nums[index];

    if (index === nums.length) {
      return amount === target ? 1 : 0;
    }
    if (memo.has(key)) {
      return memo.get(key);
    }

    let count =
      backtrack(index + 1, amount - num) + backtrack(index + 1, amount + num);

    memo.set(key, count);

    return count;
  }
};

// Explanation:
// -Initialize empty map to map out totals at each index
// -Backtrack on index 0 and amount 0
// -In backtrack:
// -If we've reached end of list, return 1 if amount equals target, else return 0
// -If memo has index and total, return that total to our function call
// -Get count by adding the result of backtracking on next index and increasing/decreasing amount by num
// -Once we get that total, add it to our memo and return that count to our backtrack function
// -Once done, we return the result of backtracking on our nums array

// Notes:
// -Time complexity: O(sum of nums * length of nums)
// -Space complexity: O(sum of nums * length of nums)

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));

// 97. Interleaving String

var isInterleave = function (s1, s2, s3) {
  if (s1.length + s2.length !== s3.length) {
    return false;
  }

  let dp = [];

  for (let i = 0; i <= s1.length; i++) {
    dp.push(new Array(s2.length + 1).fill(false));
  }

  dp[s1.length][s2.length] = true;

  for (let i = s1.length; i >= 0; i--) {
    for (let j = s2.length; j >= 0; j--) {
      if (i < s1.length && s1[i] === s3[i + j] && dp[i + 1][j]) {
        dp[i][j] = true;
      }
      if (j < s2.length && s2[j] === s3[i + j] && dp[i][j + 1]) {
        dp[i][j] = true;
      }
    }
  }

  return dp[0][0];
};

// Explanation:
// -Fill m * n grid of s1 length and s2 length w/ false values
// -Set end value in grid to true
// -For each char in s1 back to front:
// -For each char in s2 back to front:
// -If i < s1 length and char at i in string 1 equal to char at i + j in string 3 and dp[i + 1][j] is true:
// -Set dp[i][j] to true
// -Run same check for j in string 2
// -Once done, return value at dp[0][0]

// Notes:
// -Time complexity: O(s1 length * s2 length)
// -Space complexity: O(s1 length * s2 length)

console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac"));

// 1143. Longest Common Subsequence

var longestCommonSubsequence = function (text1, text2) {
  let dp = [];

  for (let i = 0; i <= text1.length; i++) {
    dp.push(new Array(text2.length + 1).fill(0));
  }

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] !== text2[j - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      } else {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }

  return dp[text1.length][text2.length];
};

// Explanation:
// -Fill str1 length * str2 length grid w/ zeros
// -For each char in str1:
// -For each char in str2:
// -If char at str1 and str2 not equal:
// -Set node at curr index as max of length at prev char in str1 or prev char in str2
// -Else set node at curr index as length at prev char in both strings + 1
// -Once done, return length at last node in grid

// Notes:
// -Time complexity: O(str1 length * str2 length)
// -Space complexity: O(str1 length * str2 length)

console.log(longestCommonSubsequence("abcde", "ace"));

// 55. Jump Game

var canJump = function (nums) {
  let goal = nums.length - 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  return goal === 0;
};

// Explanation:
// -Set goalpost to last index
// -For each num in nums back to front:
// -If curr index + num at index >= goal, move goalpost to curr index
// -Once done, return true if goalpost has reached 0, else return false

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(canJump([2, 3, 1, 1, 4]));

// 45. Jump Game II

var jump = function (nums) {
  let [count, left, right] = [0, 0, 0];

  while (right < nums.length - 1) {
    let farthest = 0;

    for (let i = left; i <= right; i++) {
      farthest = Math.max(farthest, nums[i] + i);
    }

    left = right + 1;
    right = farthest;
    count++;
  }

  return count;
};

// Explanation:
// -Set count and left/right pointers to 0
// -While right pointer hasn't reached end:
// -Set farthest to 0
// -Iterate through current window and find furthest jump
// -Set left pointer outside of curr window and right pointer end of new furthest window and increase count
// -Once done, return count

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(jump([2, 3, 1, 1, 4]));

// 134. Gas Station

var canCompleteCircuit = function (gas, cost) {
  if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) {
    return -1;
  }

  let [total, start] = [0, 0];

  for (let i = 0; i < gas.length; i++) {
    total += gas[i] - cost[i];

    if (total < 0) {
      total = 0;
      start = i + 1;
    }
  }

  return start;
};

// Explanation:
// -If sum of gas < sum of cost, solution not possible so return -1
// -Set total and start to 0
// -For each value in gas and cost:
// -Add gas - cost to total
// -If total < 0, reset total and move potential start to i + 1
// -Once done, return start

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));

// 846. Hand of Straights

var isNStraightHand = function (hand, groupSize) {
  let map = {};

  for (let num of hand) {
    map[num] = map[num] + 1 || 1;
  }
  for (let num in map) {
    let freq = map[num];

    for (let i = 1; i < groupSize; i++) {
      let next = Number(num) + i;
      let nextFreq = map[next];

      if (!nextFreq || nextFreq < freq) {
        return false;
      }

      map[next] = nextFreq - freq;

      if (map[next] === 0) {
        delete map[next];
      }
    }

    delete map[num];
  }

  return Object.keys(map).length === 0;
};

// Explanation:
// -Map out values and counts
// -For each value in map:
// -Look at all next values up to group size
// -For each subsequent value:
// -If next value doesn't exist or next frequency < curr frequency, return false
// -Set next value frequency to next frequency - curr frequency
// -If next frequency equals 0, delete next value from map
// -Once done successfully checking neighbors, delete num from map
// -Once done, if our map is empty return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3));

// 1899. Merge Triplets to Form Target Triplet

var mergeTriplets = function (triplets, target) {
  let [first, second, third] = [false, false, false];
  let [t1, t2, t3] = target;

  for (let [a, b, c] of triplets) {
    if (a === t1 && b <= t2 && c <= t3) {
      first = true;
    }
    if (b === t2 && a <= t1 && c <= t3) {
      second = true;
    }
    if (c === t3 && a <= t1 && b <= t2) {
      third = true;
    }
    if (first && second && third) {
      return true;
    }
  }

  return false;
};

// Explanation:
// -Set good values at first, second, and third triplet to false
// -For each triplet in triplets:
// -At each index:
// -If we find matching triplet and other triplets are <= their corresponding values, set good value to true for that index
// -If all three indices are good, we return true
// -Else if we iterate through all triplets without returning true, we return false

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(
  mergeTriplets(
    [
      [2, 5, 3],
      [1, 8, 4],
      [1, 7, 5],
    ],
    [2, 7, 5]
  )
);

// 224. Basic Calculator

var calculate = function (s) {
  let [sign, sum, index] = [1, 0, 0];
  let stack = [];
  let valid = {};

  for (let i = 0; i < 10; i++) {
    valid[i] = true;
  }
  while (index < s.length) {
    if (valid[s[index]]) {
      let curr = 0;

      while (valid[s[index]]) {
        curr *= 10;
        curr += Number(s[index]);
        index++;
      }

      sum += curr * sign;
      index--;
    } else if (s[index] === "-" || s[index] === "+") {
      sign = s[index] === "-" ? -1 : 1;
    } else if (s[index] === "(") {
      stack.push(sum);
      stack.push(sign);

      [sum, sign] = [0, 1];
    } else if (s[index] === ")") {
      sum *= stack.pop();
      sum += stack.pop();
    }

    index++;
  }

  return sum;
};

// Explanation:
// -Set sign to 1, sum to 0, and index to 0
// -Initialize empty stack
// -For each char in string:
// -If char is num:
// -Set curr to 0
// -While char is num:
// -Multiply curr by 10, add num to curr, and increase index
// -Once done, add curr * sign to sum and bring index back 1
// -Else if char is sign:
// -Set sign to -1 or 1
// -Else if char is open parenthesis:
// -Push sum and sign to stack and reset sum and sign
// -Else if closed parenthesis:
// -Multiply sum by sign and add previous sum to sum
// -For each iteration, increase index by 1
// -Once done, return sum

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(calculate("(1+(4+5+2)-3)+(6+8)"));

// 763. Partition Labels

var partitionLabels = function (s) {
  let map = {};

  for (let i = 0; i < s.length; i++) {
    map[s[i]] = i;
  }

  let result = [];
  let [size, end] = [0, 0];

  for (let i = 0; i < s.length; i++) {
    size++;
    end = Math.max(end, map[s[i]]);

    if (i === end) {
      result.push(size);
      size = 0;
    }
  }

  return result;
};

// Explanation:
// -Map out last indices for all chars in string
// -Set result to empty array and size and end to 0
// -For each char in string:
// -Increase size by 1
// -Update end to greater of end or char's last index
// -When we reach our current max end, we push size to result and reset size
// -Once done, we return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(partitionLabels("abbacbadefedferw"));

// 678. Valid Parenthesis String

var checkValidString = function (s) {
  let [leftMin, leftMax] = [0, 0];

  for (let char of s) {
    if (char === "(") {
      leftMin++;
      leftMax++;
    } else if (char === ")") {
      leftMin--;
      leftMax--;
    } else {
      leftMin--;
      leftMax++;
    }

    if (leftMax < 0) {
      return false;
    }
    if (leftMin < 0) {
      leftMin = 0;
    }
  }

  return leftMin === 0;
};

// Explanation:
// -Set left min and left max to 0
// -Left min and max keep track of our wildcard decisions
// -For each char in string:
// -If open parenthesis, increase left min and max by 1
// -Else if closed parenthesis, decrease left min and max by 1
// -Else if wildcard, decrease left min by 1 and increase left max by 1
// -If left max is ever negative, return false
// -If left min goes negative, reset to 0
// -Once done, return true if left min is 0

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(checkValidString("(*))"));

// 435. Non-overlapping Intervals

var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let result = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    let [start, end] = intervals[i];

    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      result++;
      prevEnd = Math.min(end, prevEnd);
    }
  }

  return result;
};

// Explanation:
// -Sort intervals ascending by start
// -Set result count to 0 and prev end to first end in intervals
// -For each subsequent interval:
// -If curr start >= prev end, update prev end to curr end
// -Else increase result by 1 and update prev end to minimum of curr end or prev end
// -Once done, return result count

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) for sorting

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ])
);

// 253. Meeting Rooms II

var minMeetingRooms = function (intervals) {
  let start = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  let end = intervals.map((interval) => interval[1]).sort((a, b) => a - b);

  let [result, count] = [0, 0];
  let [s, e] = [0, 0];

  while (s < intervals.length) {
    if (start[s] < end[e]) {
      s++;
      count++;
    } else {
      e++;
      count--;
    }

    result = Math.max(result, count);
  }

  return result;
};

// Explanation:
// -Sort start times and end times in two separate arrays
// -Set result and curr rooms to 0
// -Set start pointer and end pointer to 0
// -While we have start times:
// -If start time < end time, increase start pointer and count by 1
// -Else increase end pointer by 1 and decrease count by 1
// -At each iteration, set result to greater of result or curr room count
// -Once done, return result

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(n)

console.log(
  minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
);

// 48. Rotate Image

var rotate = function (matrix) {
  let [l, r] = [0, matrix.length - 1];

  while (l < r) {
    let window = r - l;

    for (let i = 0; i < window; i++) {
      let [t, b] = [l, r];

      let topLeft = matrix[t][l + i];
      matrix[t][l + i] = matrix[b - i][l];
      matrix[b - i][l] = matrix[b][r - i];
      matrix[b][r - i] = matrix[t + i][r];
      matrix[t + i][r] = topLeft;
    }

    l++;
    r--;
  }
};

// Explanation:
// -Set left and right pointers to 0 and end or matrix
// -While left < right:
// -Get current window by subtracting two pointers
// -From each index in window:
// -Set top and bottom to left and right pointers
// -Set temp variable for top left
// -Set top left + index to bottom - index left
// -Set bottom - index left to bottom right - index
// -Set bottom right - index to top + index right
// -Set top + index right to top left
// -Once done iterating through window, increase left pointer by 1 and decrease right pointer by 1

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(1)

console.log(
  rotate([
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ])
);

// 1235. Maximum Profit in Job Scheduling

var jobScheduling = function (startTime, endTime, profit) {
  let n = startTime.length;
  let dp = new Array(n).fill(0);

  class Node {
    constructor(start, end, profit) {
      this.start = start;
      this.end = end;
      this.profit = profit;
    }
  }

  function binarySearch(currEnd, currIdx) {
    let start = currIdx;
    let end = jobs.length - 1;
    let result = -1;

    while (start <= end) {
      let mid = Math.floor((end - start) / 2 + start);

      if (jobs[mid].start >= currEnd) {
        result = mid;
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return result;
  }

  let jobs = startTime
    .map((time, index) => new Node(time, endTime[index], profit[index]))
    .sort((a, b) => a.start - b.start);

  dp[n - 1] = jobs[n - 1].profit;

  for (let i = n - 2; i >= 0; i--) {
    let index = binarySearch(jobs[i].end, i);
    let profit = index === -1 ? 0 : dp[index];

    dp[i] = Math.max(dp[i + 1], profit + jobs[i].profit);
  }

  return dp[0];
};

// Explanation:
// -Create dp buffer array of size n to track profits
// -Combine start, end, and profit and sort by start time
// -Set profit for last interval in dp array
// -For each interval back to front:
// -Use binary search to find interval after curr w/ least greatest start time
// -If interval found, set profit to profit at dp for that index or 0 if not found
// -Set profit for curr index in dp to greater of next profit in dp or profit plus curr profit
// -Once done, return profit at first index in dp array

// Notes:
// -Time complexity: O(n log n) for both sort and profit search
// -Space complexity: O(n)

console.log(
  jobScheduling([1, 2, 3, 4, 6], [3, 5, 10, 6, 9], [20, 20, 100, 70, 60])
);

// 73. Set Matrix Zeroes

var setZeroes = function (matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let topRow = false;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[0][c] = 0;

        if (r > 0) {
          matrix[r][0] = 0;
        } else {
          topRow = true;
        }
      }
    }
  }
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) {
        matrix[r][c] = 0;
      }
    }
  }
  if (matrix[0][0] === 0) {
    for (let r = 0; r < rows; r++) {
      matrix[r][0] = 0;
    }
  }
  if (topRow) {
    for (let c = 0; c < cols; c++) {
      matrix[0][c] = 0;
    }
  }
};

// Explanation:
// -Set top row check to false
// -For each node in matrix:
// -If node equals 0:
// -Mark beginning of column as 0
// -If row > 0, mark beginning of row as 0
// -Else mark top row as true
// -For each node starting from row 1, col 1:
// -If beginning of row or column marked as 0, mark node as 0
// -If first node marked as 0, mark each node in first column as 0
// -If top row is true, mark whole top row row as 0

// Notes:
// -Time complexity: O(rows * cols)
// -Space complexity: O(1)

console.log(
  setZeroes([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
);

// 50. Pow(x, n)

var myPow = function (x, n) {
  function helper(x, n) {
    if (n === 0) {
      return 1;
    }

    let result = helper(x * x, Math.floor(n / 2));

    if (n % 2) {
      return x * result;
    } else {
      return result;
    }
  }

  let result = helper(x, Math.abs(n));

  if (n >= 0) {
    return result;
  } else {
    return 1 / result;
  }
};

// Explanation:
// -Recurse on x and absolute value of n
// -In recursion:
// -If x equals 0, return 0
// -If n equals 0, return 1
// -Result equals result of recursing on x^2 and floor of n / 2
// -Once we find result, if n is odd we return x * result, else we return result
// -Once done finding result, we check to see if n is negative
// -If so, we return 1 / result, else we return result

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(log n)

console.log(myPow(2, 10));

// 43. Multiply Strings

var multiply = function (num1, num2) {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  let [m, n] = [num1.length, num2.length];
  let result = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let [pos1, pos2] = [i + j, i + j + 1];
      let sum = result[pos2] + Number(num1[i]) * Number(num2[j]);

      result[pos2] = sum % 10;
      result[pos1] += Math.floor(sum / 10);
    }
  }
  if (result[0] === 0) {
    result.shift();
  }

  return result.join("");
};

// Explanation:
// -If num1 or num2 are 0, return 0
// -Fill array of size m + n with 0s
// -For each digit in num1 back to front:
// -For each digit in num2 back to front:
// -Set position 1 and position 2 as i + j and i + j + 1
// -Sum is equal to curr result at position 2 + curr digit in num1 * curr digit in num2
// -Set result at position 2 as remainder of sum / 10
// -Set carry at position 1 as curr result at position 1 + floor of sum / 10
// -Once done iterating through digits, remove 0 from front if exists
// -Finally, join result array and return result

// Notes:
// -Time complexity: O(m * n)
// -Space complexity: O(m + n)

console.log(multiply("231", "4567"));

// 2013. Detect Squares

class DetectSquares {
  constructor() {
    this.pointCount = {};
    this.points = [];
  }
  add(point) {
    let [x, y] = point;

    if (!this.pointCount[x]) {
      this.pointCount[x] = {};
    }

    this.pointCount[x][y] = this.pointCount[x][y] + 1 || 1;
    this.points.push(point);
  }
  count(point) {
    let count = 0;
    let [px, py] = point;

    for (let [x, y] of this.points) {
      let xDist = Math.abs(px - x);
      let yDist = Math.abs(py - y);

      if (xDist !== yDist || x === px || y === py || !this.pointCount[px]) {
        continue;
      }

      count += (this.pointCount[x][py] || 0) * (this.pointCount[px][y] || 0);
    }

    return count;
  }
}

// Explanation:
// -Initialize detect squares class with point count hashmap and points array
// -For add method:
// -If x doesn't exist in count map, add x with empty object
// -Increase x / y count to map and point to array
// -For count method:
// -Get origin x and y and set count to 0
// -For each x / y pair in points array:
// -Get distance from origin x and x and origin y and y
// -If distance not equal or points are same or origin x doesn't exist in map, continue
// -Else add product of x / origin y count or 0 and origin x / y count or 0 to count
// -Once done, return count

// Notes:
// -Time complexity: O(1) for add method and O(n) for count
// -Space complexity: O(n) for add method and O(1) for count

let squares = new DetectSquares();
squares.add([3, 10]);
squares.add([3, 2]);
squares.add([11, 2]);
console.log(squares.count([11, 10]));
console.log(squares.count([14, 8]));
squares.add([11, 2]);
console.log(squares.count([11, 10]));

// 371. Sum of Two Integers

var getSum = function (a, b) {
  while (b) {
    let temp = (a & b) << 1;
    a ^= b;
    b = temp;
  }

  return a;
};

// Explanation:
// -While b is not 0:
// -Get carry values by bitshifting a & b left by one
// -We then add a and b by XORing them together and set b to our carry value
// -Once b is 0 and we no longer have carry, we return a

// Notes:
// -Time complexity: O(1) given each integer is 32 bit constrained
// -Space complexity: O(1)

console.log(getSum(19, 23));

// 7. Reverse Integer

var reverse = function (x) {
  let result = 0;
  let sign = x < 0 ? -1 : 1;
  let maxSafe = Math.pow(2, 31) - 1;

  x = Math.abs(x);

  while (x) {
    let digit = x % 10;
    x = Math.floor(x / 10);

    if (
      result > Math.floor(maxSafe / 10) ||
      (result === Math.floor(maxSafe / 10) && digit >= maxSafe % 10)
    ) {
      return 0;
    }

    result *= 10;
    result += digit;
  }

  return result * sign;
};

// Explanation:
// -Set result to 0 and sign to -1 or 1 depending on whether x is negative or positive
// -Get max safe integer
// -Make x positive
// -While x not 0:
// -Get last digit by getting remainder of x / 10
// -Set x to floor of x / 10
// -If result > floor of max safe / 10 or result equals max safe / 10 && digit >= remainder of max safe % 10, return 0
// -Multiply result by 10
// -Add digit to result
// -Once done, return result * sign

// Notes:
// -Time complexity: O(log x), as there are roughly log 10(x) digits in x
// -Space complexity: O(1)

console.log(reverse(-321));

// 309. Best Time to Buy and Sell Stock with Cooldown

var maxProfit = function (prices) {
  let dp = {};

  return dfs(0, true);

  function dfs(index, buying) {
    let key = `${index},${buying}`;
    if (index >= prices.length) {
      return 0;
    }
    if (dp[key] !== undefined) {
      return dp[key];
    }

    let cooldown = dfs(index + 1, buying);

    if (buying) {
      let buy = dfs(index + 1, !buying) - prices[index];
      dp[key] = Math.max(buy, cooldown);
    } else {
      let sell = dfs(index + 2, !buying) + prices[index];
      dp[key] = Math.max(sell, cooldown);
    }

    return dp[key];
  }
};

// Explanation:
// -Initialize dp hashmap to store index state and profit
// -Perform dfs on index 0 w/ buying set to true
// -In dfs:
// -If index out of bounds, return 0
// -If index and state in dp, return profit in hashmap
// -Get max cooldown profit by performing dfs on next index w/ buying set to true
// -If buying is true:
// -Get max buy profit by performing dfs on subsequent indices w/ buying set to false and subtracting curr price from result
// -Then set state as greater of buy profit or cooldown profit
// -Else if selling:
// -Get max sell profit by performing dfs on curr index + 2 w/ buying set to false and adding curr price from result
// -Set state as greater of sell or cooldown profit
// -Once done recursing, return max profit at curr index and state

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(maxProfit([1, 3, 2, 7, 4, 5]));

// 974. Subarray Sums Divisible by K

var subarraysDivByK = function (nums, k) {
  let [rs, ans] = [0, 0];
  let dp = {};
  dp[0] = 1;

  for (let num of nums) {
    rs += num;
    let key = rs % k;

    if (key < 0) {
      key += k;
    }
    if (dp[key]) {
      ans += dp[key];
    }

    dp[key] = dp[key] + 1 || 1;
  }

  return ans;
};

// Explanation:
// -Set running sum and result to 0
// -Create dp hashmap to store remainder counts
// -Set dp[0] to count of 1 to account for any num in array equal to k
// -For each num in nums:
// -Increase running sum by num
// -Get key by taking remainder of sum / k
// -If remainder negative, add k back to remainder
// -If dp has key, add count at key to result
// -Increase count of key in dp to 1 or curr count + 1
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(k), as remainders will not go over k

console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5));

// 394. Decode String

var decodeString = function (str) {
  let stack = [];
  let currStr = "";
  let currNum = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (char === "[") {
      stack.push(currStr);
      stack.push(currNum);

      [currStr, currNum] = ["", 0];
    } else if (char === "]") {
      let prevNum = stack.pop();
      let prevStr = stack.pop();
      let repeat = "";

      while (prevNum) {
        repeat += currStr;
        prevNum--;
      }

      currStr = prevStr + repeat;
    } else if (char >= "0" && char <= "9") {
      currNum *= 10;
      currNum += Number(char);
    } else {
      currStr += char;
    }
  }

  return currStr;
};

// Explanation:
// -Initialize empty stack
// -Set curr string to empty string and curr num to 0
// -For each char in string:
// -If char is open bracket:
// -Push curr string and curr num to stack and reset both
// -Else if char is closed bracket:
// -Pop prev num and prev string from stack
// -Repeat curr string prev num times and add to prev string
// -Set curr string to updated string
// -Else if char is num:
// -Add num to curr num
// -Else if char is character:
// -Add char to curr string
// -Once done, return curr string

// Notes:
// -Time complexity: O(max k * n), where k is largest num and n is length of string
// -Space complexity: O(m + n), where m is the number of letters and n is the number of digits in string

console.log(decodeString("3[ab2[c]]"));

// 23. Merge k Sorted Lists

var ListNode = function (val, next) {
  return {
    val,
    next: null,
  };
};

var mergeKLists = function (lists) {
  if (lists.length === 0 || lists === null) {
    return null;
  }

  while (lists.length > 1) {
    let merged = [];

    for (let i = 0; i < lists.length; i += 2) {
      let l1 = lists[i];
      let l2 = lists[i + 1] || null;

      merged.push(mergeLists(l1, l2));
    }

    lists = merged;
  }

  return lists[0];
};

var mergeLists = function (l1, l2) {
  let dummy = new ListNode();
  let head = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      [head.next, l1] = [l1, l1.next];
    } else {
      [head.next, l2] = [l2, l2.next];
    }

    head = head.next;
  }

  head.next = l1 ? l1 : l2;

  return dummy.next;
};

// Explanation:
// -If lists not valid, return null
// -While lists length is greater than 1:
// -Keep temp array for merged lists
// -For each two adjacent lists in list:
// -Merge two lists and push to merged array
// -Once we reach end of lists, reset lists to merged and continue until we have one final sorted list
// -Once done, return final list

// Notes:
// -Time complexity: O(n log k), where n is the number of nodes and k is the number of lists. We initially pair up k lists and merge each pair. After the first pairing, k lists are merged into k / 2 lists with average 2N / k length, then k / 4, k / 8, etc.
// -Space complexity: O(n) for merged list array

let l1 = new ListNode(5);
let l2 = new ListNode(3);
let l3 = new ListNode(4);
let l4 = new ListNode(1);
let l5 = new ListNode(2);

console.log(mergeKLists([l1, l2, l3, l4, l5]));

// 84. Largest Rectangle in Histogram

var largestRectangleArea = function (heights) {
  let maxArea = 0;
  let stack = [];

  for (let i = 0; i < heights.length; i++) {
    let h = heights[i];
    let start = i;

    while (stack.length && stack[stack.length - 1][1] > h) {
      let [index, height] = stack.pop();
      maxArea = Math.max(maxArea, height * (i - index));
      start = index;
    }

    stack.push([start, h]);
  }
  for (let [i, h] of stack) {
    maxArea = Math.max(maxArea, h * (heights.length - i));
  }

  return maxArea;
};

// Explanation:
// -Set max area to 0 and initialize an empty stack
// -For each height in heights:
// -Set start index to curr height index
// -While stack has work and curr height less than last height in stack:
// -Pop last height and start index off stack
// -Set max area to greater of max area or last height * (curr index - start index)
// -Set start index to last start index
// -Once we pop all larger vals off stack, push start index and curr height to stack
// -For each index / height pair in stack left over:
// -Set max area as greater of max area or height * (heights length - index)
// -Finally, return max area

// Notes:
// -Time complexity: O(n), as n numbers are pushed and popped from the stack
// -Space complexity: O(n) for the stack

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));

// 239. Sliding Window Maximum

var maxSlidingWindow = function (nums, k) {
  let q = [];
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) {
      q.pop();
    }

    q.push(i);

    if (q[0] === i - k) {
      q.shift();
    }
    if (i >= k - 1) {
      result.push(nums[q[0]]);
    }
  }

  return result;
};

// Explanation:
// -Set queue and result to empty arrays
// -For each num in nums:
// -While curr num is greater than last num in queue, pop last item in queue
// -Push curr index to queue
// -If index in front of queue is equal to window size, remove first item from front
// -If i >= window size, push front of queue to result

// Notes:
// -Time complexity: O(n * k), where n is length of nums and k is window size due to shift operation, but can be reduced to O(n) w/ queue using stacks
// -Space complexity: O(n) for output array and O(k) for the queue

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

// 4. Median of Two Sorted Arrays

var findMedianSortedArrays = function (nums1, nums2) {
  let [a, b] = [nums1, nums2];

  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  let [x, y] = [a.length, b.length];
  let [l, r] = [0, x - 1];

  while (true) {
    let i = Math.floor((r - l) / 2 + l);
    let j = Math.floor((x + y) / 2) - i - 2;

    let aLeft = i >= 0 ? a[i] : -Infinity;
    let aRight = i + 1 < x ? a[i + 1] : Infinity;
    let bLeft = j >= 0 ? b[j] : -Infinity;
    let bRight = j + 1 < y ? b[j + 1] : Infinity;

    if (aLeft <= bRight && bLeft <= aRight) {
      if ((x + y) % 2) {
        return Math.min(aRight, bRight);
      }

      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aRight > bRight) {
      r = i - 1;
    } else {
      l = i + 1;
    }
  }
};

// Explanation:
// -Swap arrays to ensure smallest is first
// -Set left and right pointers to first and last index of smaller array
// -While median not found:
// -Get partition index of first array
// -Get partition index of second array
// -Set left partition values to value at partition index or -Infinity or out of bounds
// -Set right partition values to value next to left partition index or Infinity if out of bounds
// -If left values <= right values:
// -Return min of right vals if length of two arrays is odd
// -Else return max of left vals plus min of right vals / 2
// -Else if first right val > second right val, set r to first partition index - 1
// -Else set left to first partition index + 1

// Notes:
// -Time complexity: O(log m + n)
// -Space complexity: O(m + n) for storing two arrays

console.log(findMedianSortedArrays([1, 3, 5], [2, 2, 5, 9, 10]));

// 212. Word Search II

class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }
  isEnd() {
    return this.end;
  }
  setEnd(bool) {
    this.end = bool;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  addWord(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.keys.has(char)) {
        node.keys.set(char, new Node());
      }

      node = node.keys.get(char);
    }

    node.setEnd(true);
  }
}

var findWords = function (board, words) {
  let trie = new Trie();
  words = new Set(words);
  let [result, visited] = [new Set(), new Set()];
  let [rows, cols] = [board.length, board[0].length];
  let directions = [0, 1, 0, -1, 0];

  for (let word of words) {
    trie.addWord(word);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, trie.root, "");
    }
  }

  return Array.from(result);

  function dfs(r, c, node, word) {
    let char = board[r][c];
    let key = `${r},${c}`;

    if (!node.keys.has(char) || visited.has(key)) {
      return;
    }

    visited.add(key);
    node = node.keys.get(char);
    word += char;

    if (node.isEnd()) {
      result.add(word);
    }
    for (let i = 0; i < directions.length - 1; i++) {
      let newR = directions[i] + r;
      let newC = directions[i + 1] + c;

      if (newR < 0 || newC < 0 || newR >= rows || newC >= cols) {
        continue;
      }

      dfs(newR, newC, node, word);
    }

    visited.delete(key);
  }
};

// Explanation:
// -Initialize trie
// -Create a hashset from words and add words to trie
// -Initialize empty sets to store results and visited
// -For each node in matrix:
// -Perform dfs on node and root node of trie w/ empty string as curr word
// -In dfs:
// -If row/col in visited or node char not in trie, return to exit
// -Add row/col to visited, get keys at char, and update curr word to include char
// -If node is end of word, add word to result
// -For each direction up, down, left, and right:
// -If new row/col out of bounds, continue
// -Else perform dfs on neighbor w/ updated node and curr word
// -Once done performing dfs, delete key from visited
// -Finally, return array from results once finished

// Notes:
// -Time complexity: O(n * (4 * (3 ^ (l - 1)))), where n is the number of nodes in the board and l is the maximum length of words. At each node, we would first have at most 4 directions to explore, but that would then be cut down to three. Given that we're one character down, our exponent is l - 1.
// -Space complexity: O(n), where n is the total number of letters in the trie

let board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
let words = ["oath", "pea", "eat", "rain"];

console.log(findWords(board, words));

// 124. Binary Tree Maximum Path Sum

var maxPathSum = function (root) {
  let max = -Infinity;

  function dfs(node) {
    if (!node) {
      return 0;
    }

    let leftMax = Math.max(dfs(node.left), 0);
    let rightMax = Math.max(dfs(node.right), 0);
    max = Math.max(max, node.val + leftMax + rightMax);

    return node.val + Math.max(leftMax, rightMax);
  }

  dfs(root);
  return max;
};

// Explanation:
// -Set max to negative infinity
// -Recurse on root node
// -In dfs:
// -If node is null, return 0
// -Set left max to greater of dfs on left path or 0
// -Set right max to greater of dfs on right path or 0
// -Set max to greater of curr max or curr node val plus left and right max
// -Return node val plus greater of left max or right max
// -Once done recursing, return max

// Notes:
// -Time complexity: O(n), where n is the number of nodes
// -Space complexity: O(h), where h is the height of the tree

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let tree = new Node(-10);
tree.left = new Node(9);
tree.right = new Node(20);
tree.right.left = new Node(15);
tree.right.right = new Node(7);
console.log(maxPathSum(tree));

// 25. Reverse Nodes in k-Group

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

var reverseKGroup = function (head, k) {
  let dummy = new ListNode(0);
  dummy.next = head;

  let [curr, prev] = [head, dummy];

  while (curr) {
    let tail = curr;
    let listIdx = 0;

    while (curr && listIdx < k) {
      curr = curr.next;
      listIdx++;
    }
    if (listIdx !== k) {
      prev.next = tail;
    } else {
      prev.next = reverseList(tail, k);
      prev = tail;
    }
  }

  return dummy.next;
};

var reverseList = function (head, k) {
  let [curr, prev] = [head, null];

  while (curr && k) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
    k--;
  }

  return prev;
};

// Explanation:
// -Initialize dummy node
// -Set dummy.next to head
// -Set curr to head and prev to dummy
// -While curr not null:
// -Set tail to curr
// -Advance curr k spots
// -If curr index not equal to k, cannot reverse so we set prev.next to tail
// -Else we reverse current segment and set prev to tail
// -Once done, we return dummy.next

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);
console.log(reverseKGroup(list, 2));

// 778. Swim in Rising Water

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }
  swap(start, end) {
    [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
  }
  size() {
    return this.data.length;
  }
  top() {
    return this.data[0] || null;
  }
  add(num) {
    this.data.push(num);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parent = this.parent(index);

    while (this.compare(this.data[index], this.data[parent] || {}) < 0) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }
  bubbleDown() {
    let index = 0;
    let size = this.size();

    while (true) {
      let left = null;
      let right = null;
      let swap = null;
      let leftIndex = this.left(index);
      let rightIndex = this.right(index);

      if (leftIndex < size) {
        left = this.data[leftIndex];

        if (this.compare(left, this.data[index]) < 0) {
          swap = leftIndex;
        }
      }
      if (rightIndex < size) {
        right = this.data[rightIndex];

        if (
          (swap !== null && this.compare(right, left) < 0) ||
          (swap === null && this.compare(right, this.data[index]) < 0)
        ) {
          swap = rightIndex;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(index, swap);
      index = swap;
    }
  }
}

var swimInWater = function (grid) {
  let n = grid.length;
  let visited = new Set();
  let heap = new Heap((a, b) => a.depth - b.depth);
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let result = 0;

  visited.add("0,0");
  heap.add({ row: 0, col: 0, depth: grid[0][0] });

  while (heap.size()) {
    let { row, col, depth } = heap.pop();
    result = Math.max(result, depth);

    if (row === n - 1 && col === n - 1) {
      return result;
    }
    for (let [dr, dc] of directions) {
      let newR = dr + row;
      let newC = dc + col;
      let key = `${newR},${newC}`;

      if (0 <= newR && 0 <= newC && newR < n && newC < n && !visited.has(key)) {
        heap.add({ row: newR, col: newC, depth: grid[newR][newC] });
        visited.add(key);
      }
    }
  }
};

// Explanation:
// -Initialize min heap comparing depths
// -Add first node to visited and heap
// -While heap has work:
// -Pop min depth off heap
// -Set result to greater of result or curr depth
// -If we've reached last node, return result
// -For each direction up, down, left, right:
// -If coordinate in bounds and hasn't been visited, add coordinate w/ depth to heap and visited

// Notes:
// -Time complexity: O((n ^ 2) * log n), as we may expand n squared nodes and have to do one log n insertion at each node
// -Space complexity: O(n ^ 2)

console.log(
  swimInWater([
    [9, 5, 7, 2],
    [0, 10, 8, 15],
    [1, 4, 3, 12],
    [6, 13, 11, 14],
  ])
);

// 332. Reconstruct Itinerary

var findItinerary = function (tickets) {
  let graph = new Map();

  for (let [src, dst] of tickets) {
    if (!graph.has(src)) {
      graph.set(src, []);
    }

    graph.get(src).push(dst);
  }
  for (let [src, dst] of graph) {
    graph.get(src).sort().reverse();
  }

  let result = [];

  dfs("JFK");

  return result.reverse();

  function dfs(ticket) {
    let destinations = graph.get(ticket);

    while (destinations && destinations.length) {
      let dst = destinations.pop();
      dfs(dst);
    }

    result.push(ticket);
  }
};

// Explanation:
// -Build adjacency list for all origin / destination pairs
// -Sort destinations for each origin in reverse alphabetical order
// -Perform dfs starting at JFK
// -In dfs:
// -Get all destinations for curr airport
// -While curr airport has destinations:
// -Pop last destination off curr airport and perform dfs on that destination
// -Once we reach destination w/ no more destinations, we push that ticket to result
// -Once done, we reverse our list and return it

// Notes:
// -Time complexity: O(e log (e / v)), where e is the number of flights in the input
// -Space complexity: O(no. of airports + no. of flights)

console.log(
  findItinerary([
    ["JFK", "SFO"],
    ["JFK", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "JFK"],
    ["ATL", "SFO"],
  ])
);

// 329. Longest Increasing Path in a Matrix

var longestIncreasingPath = function (matrix) {
  let [rows, cols] = [matrix.length, matrix[0].length];
  let dp = new Map();
  let longest = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      longest = Math.max(longest, dfs(r, c, -1));
    }
  }

  return longest;

  function dfs(r, c, prev) {
    let key = `${r},${c}`;
    let result = 1;

    if (r < 0 || c < 0 || r === rows || c === cols || matrix[r][c] <= prev) {
      return 0;
    }
    if (dp.has(key)) {
      return dp.get(key);
    }

    let directions = [0, 1, 0, -1, 0];

    for (let i = 0; i < directions.length - 1; i++) {
      let newR = directions[i] + r;
      let newC = directions[i + 1] + c;

      result = Math.max(result, 1 + dfs(newR, newC, matrix[r][c]));
    }

    dp.set(key, result);

    return result;
  }
};

// Explanation:
// -Initialize empty dp hashmap and set longest to 0
// -For each node in matrix:
// -Set longest to greater of longest or dfs on curr node
// -In dfs:
// -Set curr path count to 1
// -If key out of bounds or curr node <= prev, return 0
// -If key in dp, return count at key
// -Else for each direction up, down, left, right:
// -Set curr path count to greater of curr count or 1 + dfs on neighbor
// -Once we get longest path at neighbors, set that result in our dp map and return that result to our function call

// Notes:
// -Time complexity: O(rows * cols)
// -Space complexity: O(rows * cols)

console.log(
  longestIncreasingPath([
    [3, 4, 5],
    [3, 2, 6],
    [2, 2, 1],
  ])
);

// 115. Distinct Subsequences

var numDistinct = function (s, t) {
  let dp = new Map();

  return dfs(0, 0);

  function dfs(i, j) {
    let key = `${i},${j}`;

    if (dp.has(key)) {
      return dp.get(key);
    }
    if (i === s.length) {
      return j === t.length ? 1 : 0;
    }

    let count;

    if (s[i] === t[j]) {
      count = dfs(i + 1, j + 1) + dfs(i + 1, j);
    } else {
      count = dfs(i + 1, j);
    }

    dp.set(key, count);

    return count;
  }
};

// Explanation:
// -Initialize dp hashmap to store counts
// -Perform dfs on index 0 for both strings
// -In dfs:
// -If map has indices, return count at key
// -If either index equals end of string:
// -Return 1 if we've reached end of target string else return 0 if we've reached end of start string
// -If char in start string equals char in target string:
// -Set count to dfs on next two indices plus dfs on next start index and curr target index
// -Else set count to dfs on next start index and curr target index
// -Once we get count, store it in dp and return count

// Notes:
// -Time complexity: O(m * n), where m is start string length and n is target string length
// -Space complexity: O(m * n) for dp hashmap

console.log(numDistinct("rabbbbit", "rabbit"));

// 72. Edit Distance

var minDistance = function (word1, word2) {
  let [m, n] = [word1.length, word2.length];
  let dp = [];

  for (let i = 0; i <= m; i++) {
    dp.push(new Array(n + 1).fill(Infinity));
  }
  for (let i = 0; i <= m; i++) {
    dp[i][n] = m - i;
  }
  for (let j = 0; j <= n; j++) {
    dp[m][j] = n - j;
  }
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1]);
      }
    }
  }

  return dp[0][0];
};

// Explanation:
// -Fill m by n grid w/ Infinity
// -Enumerate rightmost column and bottom row, which count as empty strings
// -For each char in both words:
// -If chars at curr indices are equal, curr dp index equals val at dp[i + 1][j + 1]
// -Else curr dp index is equal to 1 + min of insert, delete, and replace operations
// -Once done, we return val at first node in grid

// Notes:
// -Time complexity: O(m * n), where m and n are length of two strings
// -Space complexity: O(m * n)

console.log(minDistance("hello", "hero"));

// 312. Burst Balloons

var maxCoins = function (nums) {
  nums.unshift(1);
  nums.push(1);

  let dp = new Map();

  return dfs(1, nums.length - 2);

  function dfs(l, r) {
    let key = `${l},${r}`;

    if (l > r) {
      return 0;
    }
    if (dp.has(key)) {
      return dp.get(key);
    }

    let result = 0;

    for (let i = l; i <= r; i++) {
      let burst = nums[l - 1] * nums[i] * nums[r + 1];
      let remaining = dfs(l, i - 1) + dfs(i + 1, r);

      result = Math.max(result, burst + remaining);
    }

    dp.set(key, result);
    return result;
  }
};

// Explanation:
// -Add 1s to beginning and end of nums array
// -Initialize dp hashmap to store results at each index
// -Perform dfs on left and right boundary of nums array not including added 1s
// -In dfs:
// -If l > r, return 0 to exit
// -If dp has indices, return result
// -Set result to 0
// -For each num from l to r:
// -Get burst amount by multiplying curr num w/ left and right neighbors
// -Get remaining amount by performing dfs on updated i - 1 right bound and i + 1 left bound
// -Set result to greater of curr result or burst + remaining amount
// -Once done, add greatest result to key in dp map and return that result

// Notes:
// -Time complexity: O(n ^ 3), as there are O(n ^ 2) states and at each call, we must perform O(n) iteration over nums array from l to r
// -Space complexity: O(n ^ 2) to store all states

console.log(maxCoins([3, 1, 5, 8]));

// 1851. Minimum Interval to Include Each Query

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  peek() {
    return this.data[0];
  }
  size() {
    return this.data.length;
  }
  swap(s, e) {
    [this.data[s], this.data[e]] = [this.data[e], this.data[s]];
  }
  add(val) {
    this.data.push(val);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let i = this.size() - 1;
    let p = this.parent(i);

    while (this.compare(this.data[i], this.data[p] || []) < 0) {
      this.swap(i, p);
      i = p;
      p = this.parent(i);
    }
  }
  bubbleDown() {
    let i = 0;
    let size = this.size();

    while (true) {
      let [l, r, swap, curr] = [null, null, null, this.data[i]];
      let [lIdx, rIdx] = [this.left(i), this.right(i)];

      if (lIdx < size) {
        l = this.data[lIdx];

        if (this.compare(l, curr) < 0) {
          swap = lIdx;
        }
      }
      if (rIdx < size) {
        r = this.data[rIdx];

        if (
          (swap !== null && this.compare(r, l) < 0) ||
          (swap === null && this.compare(r, curr) < 0)
        ) {
          swap = rIdx;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(i, swap);
      i = swap;
    }
  }
}

var minInterval = function (intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  let queryCopy = [...queries];
  queries.sort((a, b) => a - b);

  let result = {};
  let index = 0;
  let minHeap = new Heap((a, b) => a[0] - b[0]);

  for (let q of queries) {
    while (index < intervals.length && intervals[index][0] <= q) {
      let [start, end] = intervals[index];
      minHeap.add([end - start + 1, end]);
      index++;
    }
    while (minHeap.size() && minHeap.peek()[1] < q) {
      minHeap.pop();
    }

    result[q] = minHeap.size() ? minHeap.peek()[0] : -1;
  }

  let output = [];

  for (let q of queryCopy) {
    output.push(result[q]);
  }

  return output;
};

// Explanation:
// -Sort input intervals by ascending start time
// -Copy original queries
// -Sort input queries by ascending start time
// -Set result to empty object
// -Set interval index to 0
// -Initialize min heap
// -For each query in sorted queries:
// -While index within intervals and curr interval start <= query start:
// -Add interval size and end to min heap and increase index
// -While min heap has values and min size end < query start:
// -Pop min off top
// -If min heap has values, set result for query as min val size or -1 if min heap empty
// -Once done iterating through queries, create output array
// -For each query in original query list:
// -Get result for query and push to output array
// -Once done, return output

// Notes:
// -Time complexity: O(n log n + q log q) for sorting both intervals and query arrays
// -Space complexity: O(n + q) as we need to store copy of queries in array and intervals in heap

console.log(
  minInterval(
    [
      [1, 4],
      [2, 4],
      [3, 6],
      [4, 4],
    ],
    [2, 3, 4, 5]
  )
);

// 10. Regular Expression Matching

var isMatch = function (s, p) {
  let dp = new Map();

  return dfs(0, 0);

  function dfs(i, j) {
    let key = `${i},${j}`;

    if (dp.has(key)) {
      return dp.get(key);
    }
    if (j === p.length) {
      return i === s.length;
    }

    let result;
    let match = i < s.length && (s[i] === p[j] || p[j] === ".");

    if (j + 1 < p.length && p[j + 1] === "*") {
      result = dfs(i, j + 2) || (match && dfs(i + 1, j));
    } else {
      result = dfs(i + 1, j + 1) && match;
    }

    dp.set(key, result);
    return result;
  }
};

// Explanation:
// -Initialize dp hashmap to store results
// -Perform dfs on initial indices of string and pattern
// -In dfs:
// -If dp has index pair, return result
// -If pattern index has reached end, return true if string index has reached end or false if not
// -If string index within bounds and curr string char equals pattern string char or pattern string char is wildcard, set match to true
// -If pattern index + 1 within bounds and pattern index + 1 is star:
// -Set result equal to result of dfs on pattern index increased by two, which is skip, or result of dfs on string index increased by 1 and curr pattern index and curr index match
// -Else set result to result of curr index match and dfs on subsequent indices
// -Once done recursing, set key and result in dp map and return result

// Notes:
// -Time complexity: O(s * p), where s is string length and p is pattern length
// -Space complexity: O(s * p)

console.log(isMatch("aab", "a*b"));

// 269. Alien Dictionary

var alienOrder = function (words) {
  let graph = new Map();

  for (let word of words) {
    for (let char of word) {
      if (!graph.has(char)) {
        graph.set(char, []);
      }
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    let [w1, w2] = [words[i], words[i + 1]];
    let minLength = Math.min(w1.length, w2.length);

    if (
      w1.length > w2.length &&
      w1.substring(0, minLength) === w2.substring(0, minLength)
    ) {
      return "";
    }
    for (let j = 0; j < minLength; j++) {
      if (w1[j] !== w2[j]) {
        graph.get(w1[j]).push(w2[j]);
        break;
      }
    }
  }

  let visiting = new Set();
  let visited = new Set();
  let result = [];

  for (let [char, edge] of graph) {
    if (!dfs(char)) {
      return "";
    }
  }

  return result.reverse().join("");

  function dfs(char) {
    if (visiting.has(char)) {
      return false;
    }
    if (visited.has(char)) {
      return true;
    }

    visiting.add(char);

    for (let edge of graph.get(char)) {
      if (!dfs(edge)) {
        return false;
      }
    }

    visiting.delete(char);
    visited.add(char);
    result.push(char);

    return true;
  }
};

// Explanation:
// -Initialize empty hashmap to store adjacency list
// -For each character in input words:
// -If graph doesn't have character, add to graph
// -For each word in input words:
// -Get curr word and next word
// -Get min length of two words
// -If curr word longer than next word and min length substrings are equal:
// -Return empty string
// -For each char in min length range:
// -Find the first differing char
// -Add corresponding char in next word to curr string char in graph and break
// -Set visiting, visited, and result to empty sets and array
// -For each char in graph:
// -If dfs on char returns false, return empty string
// -In dfs:
// -If visiting has char, return false
// -If visited has char, return true
// -Add char to visiting
// -For each of char's neighbors:
// -If dfs on neighbor returns false, return false to our function call
// -If we traverse neighbors successfully from char, remove char from visiting and add to visited
// -Push char to result and return true to our function call
// -Once done, return our reversed joined result array

// Notes:
// -Time complexity: O(c), where c is the total length of all the words in the input list
// -Space complexity: O(v + e)

console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"]));

// 359. Logger Rate Limiter

class Logger {
  constructor() {
    this.data = new Map();
  }
  shouldPrintMessage(time, message) {
    if (!this.data.has(message)) {
      this.data.set(message, time);
      return true;
    }

    let prev = this.data.get(message);

    if (time - prev < 10) {
      return false;
    } else {
      this.data.set(message, time);
      return true;
    }
  }
}

// Explanation:
// -Initialize logger class w/ empty hashmap to store messages
// -For print message method:
// -If map does not have message, add message and time and return true
// -Else get prev time at message
// -If curr time - prev time < 10, return false
// -Else set message w/ curr time in map and return true

// Notes:
// -Time complexity: O(1)
// -Space complexity: O(n) for insert

let log = new Logger();
console.log(log.shouldPrintMessage(1, "foo"));
console.log(log.shouldPrintMessage(3, "bar"));
console.log(log.shouldPrintMessage(9, "foo"));
console.log(log.shouldPrintMessage(13, "bar"));

// 2096. Step-By-Step Directions From a Binary Tree Node to Another

var getDirections = function (root, startValue, destValue) {
  let graph = new Map();
  let stack = [root];

  while (stack.length) {
    let curr = stack.pop();

    if (curr.left) {
      if (!graph.has(curr.left.val)) {
        graph.set(curr.left.val, []);
      }
      if (!graph.has(curr.val)) {
        graph.set(curr.val, []);
      }

      graph.get(curr.left.val).push([curr.val, "U"]);
      graph.get(curr.val).push([curr.left.val, "L"]);

      stack.push(curr.left);
    }
    if (curr.right) {
      if (!graph.has(curr.right.val)) {
        graph.set(curr.right.val, []);
      }
      if (!graph.has(curr.val)) {
        graph.set(curr.val, []);
      }

      graph.get(curr.right.val).push([curr.val, "U"]);
      graph.get(curr.val).push([curr.right.val, "R"]);

      stack.push(curr.right);
    }
  }

  let visited = new Set();
  let queue = [[startValue, ""]];

  while (queue.length) {
    let [val, path] = queue.shift();

    if (val === destValue) {
      return path;
    }

    visited.add(val);

    for (let [edge, direction] of graph.get(val)) {
      if (!visited.has(edge)) {
        queue.push([edge, path + direction]);
      }
    }
  }
};

// Explanation:
// -Create graph representation of tree's nodes and neighbors
// -Initialize empty set to store visited and push start value and empty string to queue
// -While queue has work:
// -Pop first item off queue
// -If val equals destination val, return path
// -Add val to visited
// -For each of curr val's neighbors:
// -If neighbor not in visited, add val to queue w/ updated path

// Notes:
// -Time complexity: O(n ^ 2) given shift operation but can be brought down to O(n)
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.right.left = new Node(4);
tree.right.right = new Node(5);
console.log(getDirections(tree, 2, 5));

// 366. Find Leaves of Binary Tree

var findLeaves = function (root) {
  let map = {};

  dfs(root, 0);

  return Object.values(map);

  function dfs(node, layer) {
    if (!node) {
      return layer;
    }

    let left = dfs(node.left, layer);
    let right = dfs(node.right, layer);

    layer = Math.max(left, right);

    if (!map[layer]) {
      map[layer] = [];
    }

    map[layer].push(node.val);

    return layer + 1;
  }
};

// Explanation:
// -Initialize empty map to store deletion layers
// -Perform dfs on root and layer 0
// -In dfs:
// -If curr node is null, return layer to function call
// -Set left and right to result of traversing left and right subtrees
// -Set layer to greater of left or right
// -If our map doesn't have curr layer, set layer in map
// -Push node val to curr layer
// -Finally, return layer + 1 to our function call
// -Once done, return map values

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n) for map and resolution array

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.right.left = new Node(4);
tree.right.right = new Node(5);
console.log(findLeaves(tree));

// 2034. Stock Price Fluctuation

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  peek() {
    return this.data[0];
  }
  size() {
    return this.data.length;
  }
  swap(s, e) {
    [this.data[s], this.data[e]] = [this.data[e], this.data[s]];
  }
  add(val) {
    this.data.push(val);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let i = this.size() - 1;
    let p = this.parent(i);

    while (this.compare(this.data[i], this.data[p] || []) < 0) {
      this.swap(i, p);
      i = p;
      p = this.parent(i);
    }
  }
  bubbleDown() {
    let i = 0;
    let size = this.size();

    while (true) {
      let [l, r, swap, curr] = [null, null, null, this.data[i]];
      let [lIdx, rIdx] = [this.left(i), this.right(i)];

      if (lIdx < size) {
        l = this.data[lIdx];

        if (this.compare(l, curr) < 0) {
          swap = lIdx;
        }
      }
      if (rIdx < size) {
        r = this.data[rIdx];

        if (
          (swap !== null && this.compare(r, l) < 0) ||
          (swap === null && this.compare(r, curr) < 0)
        ) {
          swap = rIdx;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(i, swap);
      i = swap;
    }
  }
}

class StockPrice {
  constructor() {
    this.data = new Map();
    this.maxTime = 0;
    this.minHeap = new Heap((a, b) => a[0] - b[0]);
    this.maxHeap = new Heap((a, b) => b[0] - a[0]);
  }
  update(time, price) {
    this.data.set(time, price);
    this.maxTime = Math.max(this.maxTime, time);

    this.minHeap.add([price, time]);
    this.maxHeap.add([price, time]);
  }
  current() {
    return this.data.get(this.maxTime);
  }
  maximum() {
    let [price, time] = this.maxHeap.pop();

    while (this.data.get(time) !== price) {
      [price, time] = this.maxHeap.pop();
    }

    this.maxHeap.add([price, time]);

    return price;
  }
  minimum() {
    let [price, time] = this.minHeap.pop();

    while (this.data.get(time) !== price) {
      [price, time] = this.minHeap.pop();
    }

    this.minHeap.add([price, time]);

    return price;
  }
}

// Explanation:
// -Initialize stock price class w/ data hashmap, max time, min heap, and max heap
// -For update method:
// -Set time and price in data map
// -Update max time to greater of max time or input time
// -Add price and time to both min and max heap
// -For current method:
// -Return price at max time
// -For max and min methods:
// -Pop curr max and min off top
// -While popped price not equal to price at popped time:
// -Keep popping and updating price and time
// -Once max and min found, add last price and time back to min and max heap and return price

// Notes:
// -Time complexity: O(log n) for update, O(1) for current, O(n log n) for max and min
// -Space complexity: O(n)

let price = new StockPrice();
price.update(1, 10);
price.update(2, 5);
console.log(price.current());
console.log(price.maximum());
price.update(1, 3);
console.log(price.maximum());
price.update(4, 2);
console.log(price.minimum());

// 2115. Find All Possible Recipes from Given Supplies

var findAllRecipes = function (recipes, ingredients, supplies) {
  supplies = new Set(supplies);
  let graph = new Map();

  for (let i = 0; i < recipes.length; i++) {
    let [rec, ing] = [recipes[i], ingredients[i]];
    let prereq = [];

    for (let item of ing) {
      if (!supplies.has(item)) {
        prereq.push(item);
      }
    }

    graph.set(rec, prereq);
  }

  let visited = new Set();
  let result = [];

  for (let recipe of recipes) {
    if (dfs(recipe)) {
      result.push(recipe);
    }
  }

  return result;

  function dfs(recipe) {
    if (!graph.get(recipe)) {
      return false;
    }
    if (visited.has(recipe)) {
      return false;
    }

    visited.add(recipe);

    for (let prereq of graph.get(recipe)) {
      if (!dfs(prereq)) {
        return false;
      }
    }

    visited.delete(recipe);

    return true;
  }
};

// Explanation:
// -Create hashset from supplies
// -Initialize empty map to store recipe and prereqs not in supplies
// -For each recipe in recipes:
// -Add prereqs not in supplies to prereq array
// -Add recipe w/ prereqs to graph
// -Initialize hashset to store visited recipes/ingredients
// -For each recipe in recipes:
// -If dfs on recipe returns true, add recipe to result
// -In dfs:
// -If input not a recipe, return false
// -If input has no preqreqs, return true
// -If visited has input, return false
// -Add input to visited
// -For each prereq for given input:
// -If dfs on prereq returns false, return false to our function call
// -Else clear prereqs for input recipe in graph and return true to our function call

// Notes:
// -Time complexity: O(recipes * ingredients) or O(v + e), whichever is greater
// -Space complexity: O(v + e)

console.log(
  findAllRecipes(
    ["bread", "sandwich", "burger"],
    [
      ["yeast", "flour"],
      ["bread", "meat"],
      ["sandwich", "meat", "bread"],
    ],
    ["yeast", "flour", "meat"]
  )
);

// 2128. Remove All Ones With Row and Column Flips

var removeOnes = function (grid) {
  let [rows, cols] = [grid.length, grid[0].length];

  for (let r = 1; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][0] === grid[0][0]) {
        if (grid[r][c] !== grid[0][c]) {
          return false;
        }
      } else {
        if (grid[r][c] !== 1 - grid[0][c]) {
          return false;
        }
      }
    }
  }

  return true;
};

// Explanation:
// -For each node in matrix:
// -If beginning of curr row equals beginning of first row:
// -Curr node must be equal to beginning of column to be valid else we return false
// -Else if beginning of curr row and beginning of first row are different:
// -Curr node and beginning of column must be inverted to be valid else we return false
// -If we iterate through grid successfully, we return true

// Notes:
// -Time complexity: O(rows * cols)
// -Space complexity: O(1)

console.log(
  removeOnes([
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ])
);

// 1048. Longest String Chain

var longestStrChain = function (words) {
  words = new Set(words);
  let dp = new Map();
  let max = 0;

  for (let word of words) {
    max = Math.max(max, dfs(word));
  }

  return max;

  function dfs(word) {
    if (!words.has(word)) {
      return 0;
    }
    if (dp.has(word)) {
      return dp.get(word);
    }

    let max = 0;

    for (let i = 0; i < word.length; i++) {
      let updated = word.substring(0, i) + word.substring(i + 1);

      max = Math.max(max, dfs(updated) + 1);
    }

    dp.set(word, max);

    return max;
  }
};

// Explanation:
// -Create hashset from words
// -Initialize dp hashamp to store words w/ max length
// -For each word in word list:
// -Longest is greater of curr max or dfs on word
// -In dfs:
// -If word set doesn't have word, return 0
// -If dp has word, return length at word
// -Else set curr max to 0
// -For each char in word:
// -Remove char and set max to greater of curr max or dfs on updated word + 1
// -Once done checking substrings, set curr word and max chain in dp and return max to our function call
// -Once done recursing through words list, return max

// Notes:
// -Time complexity: O((l ^ 2) * n), where l is the longest word length and n is the number of words in list
// -Space complexity: O(n) for recursion stack, map, and set

console.log(longestStrChain(["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"]));

// 1293. Shortest Path in a Grid with Obstacles Elimination

var shortestPath = function (grid, k) {
  let [rows, cols] = [grid.length, grid[0].length];
  let visited = new Set();
  let q = [[0, 0, k, 0]];

  while (q.length) {
    let [r, c, left, path] = q.shift();
    let key = `${r},${c},${left}`;

    if (visited.has(key) || left < 0) {
      continue;
    }
    if (r === rows - 1 && c === cols - 1) {
      return path;
    }

    visited.add(key);

    if (grid[r][c] === 1) {
      left--;
    }

    let directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (let [dr, dc] of directions) {
      let newR = r + dr;
      let newC = c + dc;

      if (newR >= 0 && newC >= 0 && newR < rows && newC < cols) {
        q.push([newR, newC, left, path + 1]);
      }
    }
  }

  return -1;
};

// Explanation:
// -Push row 0, col 0, remaining, and dist traveled of 0 to queue
// -Initialize hashset to keep track of visited coordinates
// -While queue has work: pop first item off queue
// -If visited has coordinates or remaining removals < 0, continue
// -If we reach last node, return path
// -Add coordinates to visited
// -If curr node equals 1, subtract one from remaining
// -For each direction up, down, left, right:
// -If coordinate is valid add new coordinates to queue w/ updated remaining and path increased by 1
// -If we go through queue without returning path, we return -1 as no valid path found

// Notes:
// -Time complexity: O(n ^ 2), where n is number of nodes, as we use shift operation in while loop. Can be brought down to O(n)
// -Space complexity: O(n), where n is number of nodes, for both set and queue

console.log(
  shortestPath(
    [
      [0, 1, 1],
      [1, 1, 1],
      [1, 0, 0],
    ],
    1
  )
);

// 818. Race Car

var racecar = function (target) {
  let q = [[0, 1, 0]];
  let visited = new Set();

  while (q.length) {
    let [pos, speed, moves] = q.shift();
    let key = `${pos},${speed}`;

    if (pos === target) {
      return moves;
    }
    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    q.push([pos + speed, speed * 2, moves + 1]);

    if (
      (pos + speed > target && speed > 0) ||
      (pos + speed < target && speed < 0)
    ) {
      speed = speed > 0 ? -1 : 1;
      q.push([pos, speed, moves + 1]);
    }
  }
};

// Explanation:
// -Push pos 0, speed 1, and moves 0 to queue
// -Intialize empty set to store pos / speed results
// -While queue has work: pop first item off queue
// -If pos equals target, return moves
// -If visited has pos / speed pair, continue
// -Else add pos / speed pair to visited and push updated pos, speed, and moves to queue
// -For updated path, pos increased by speed, speed multiplied by 2, and moves increased by 1
// -If we've overshot target and are accelerating or we're below target and we're in reverse:
// -Set speed to -1 if we're accelerating or 1 if we're reversing
// -Then push position, updated speed, and moves + 1 to queue

// Notes:
// -Time complexity: O(log t ^ 2) given shift operation, can be brought down to O(log t)
// -Space complexity: O(log t)

console.log(racecar(6));

// 2158. Amount of New Area Painted Each Day

var amountPainted = function (paint) {
  let map = new Map();
  let result = [];

  for (let [start, end] of paint) {
    let log = 0;
    let index = start;

    while (index < end) {
      if (!map.has(index)) {
        log++;
        map.set(index, end);
        index++;
        continue;
      }

      let fastEnd = map.get(index);

      if (fastEnd < end) {
        map.set(index, end);
      }

      index = fastEnd;
    }

    result.push(log);
  }

  return result;
};

// Explanation:
// -Initialize empty map to store interval pairs
// -Set result to to empty array
// -For each interval in input array:
// -Set curr log to 0 and index to start
// -While index < end:
// -If map doesn't have index, increase log and index by 1 and set curr index and curr end in map
// -Else if map has index, get corresponding end and update map w/ curr index and curr end
// -Once we reach interval end, push log to result for curr interval
// -Once done iterating over intervals, return result

// Notes:
// -Time complexity: O(n * l), where n is number of intervals and l is longest interval length
// -Space complexity: O(n)

console.log(
  amountPainted([
    [1, 4],
    [5, 8],
    [4, 7],
  ])
);

// 528. Random Pick with Weight

class Solution {
  constructor(weights) {
    this.weights = [];
    this.total = 0;

    for (let w of weights) {
      this.total += w;
      this.weights.push(this.total);
    }
  }
  pickIndex() {
    let weights = this.weights;
    let [l, r] = [0, weights.length - 1];
    let index = Math.floor(Math.random() * this.total);

    while (l <= r) {
      let mid = Math.floor((r - l) / 2 + l);

      if (index < weights[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    return l;
  }
}

// Explanation:
// -Initialize solution class
// -For each weight in input weights:
// -Add weight to total and push total to weights constructor array
// -For pick index method:
// -Get random index based on total
// -Set left and right pointers to beginning and end of weights array
// -While left <= right:
// -Get midpoint
// -If random index less than total at midpoint, set right to mid - 1
// -Else set left to mid + 1
// -Once binary search is done, return left index

// Notes:
// -Time complexity: O(n) for constructor function, O(log n) for pick index
// -Space complexity: O(n) for constructor function, O(1) for pick index

let prefix = new Solution([1, 2, 3, 4, 5]);
console.log(prefix.pickIndex());

// 1146. Snapshot Array

class SnapshotArray {
  constructor(len) {
    this.id = 0;
    this.data = [];

    for (let i = 0; i < len; i++) {
      this.data.push([]);
    }
  }
  set(index, val) {
    this.data[index].push([val, this.id]);
  }
  snap() {
    this.id++;
    return this.id - 1;
  }
  get(index, snapId) {
    let data = this.data[index];
    let [l, r] = [0, data.length - 1];
    let i = -1;

    while (l <= r) {
      let mid = Math.floor((r - l) / 2 + l);

      if (data[mid][1] <= snapId) {
        i = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return i === -1 ? 0 : data[i][0];
  }
}

// Explanation:
// -Initialize snapshot class
// -For each index through input lenth:
// -Push empty array to data array in constructor
// -For set method:
// -Get array at input index and push val and snap id to that array
// -For snap method:
// -Increase id count in constructor by 1 and return prev count.
// -For get method:
// -Get data at input index
// -Set left and right pointers to beginning and end of data
// -Set result index to -1
// -While left <= right:
// -Get midpoint
// -If id at midpoint <= target id:
// -Update result id and set left pointer to mid + 1
// -Else set right pointer to mid - 1
// -Once done, if result index is -1 return 0, else return value at result index

// Notes:
// -Time complexity: O(n) for constructor, O(1) for set and snap, O(log n) for get
// -Space complexity: O(n) for constructor and set, O(1) for snap and get

let snapshot = new SnapshotArray(3);
snapshot.set(0, 5);
console.log(snapshot.snap());
snapshot.set(0, 6);
console.log(snapshot.get(0, 0));

// 68. Text Justification

var fullJustify = function (words, maxWidth) {
  let result = [];
  let line = [];
  let width = 0;

  for (let i = 0; i < words.length; i++) {
    let word = words[i];

    if (width + word.length > maxWidth) {
      let spaces = maxWidth - width + line.length;
      let [added, j] = [0, 0];

      while (added < spaces) {
        if (j >= line.length - 1) {
          j = 0;
        }

        line[j] += " ";

        added++;
        j++;
      }

      result.push(line);

      [line, width] = [[], 0];
    }

    line.push(word);
    width += word.length + 1;
  }
  for (let i = 0; i < line.length - 1; i++) {
    line[i] += " ";
  }

  let remaining = maxWidth - width + 1;
  let added = 0;

  while (added < remaining) {
    line[line.length - 1] += " ";
    added++;
  }

  result.push(line);

  for (let i = 0; i < result.length; i++) {
    result[i] = result[i].join("");
  }

  return result;
};

// Explanation:
// -Initialize empty arrays to store result and curr line
// -Set width to 0
// -For each word in word list:
// -Get current word
// -While width + word length > max width:
// -Get available spaces
// -Set added and curr line index to 0
// -While added < spaces:
// -Reset curr line index to 0 if index is out of line bounds
// -Add space to curr word in line
// -Increase spaces added and curr line index by 1
// -Once done adding spaces, push line to result and reset curr line and width
// -Else if word length + width still in bounds, add word to curr line and increase width by word length + 1
// -Once we traverse words array, go through curr line and add space to all words except last
// -Then add remaining spaces to last
// -Push curr line up to result and join each line at each index
// -Finally, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(fullJustify(["this", "is", "justification"], 13));

// 489. Robot Room Cleaner

var cleanRoom = function (robot) {
  let directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let visited = new Set();

  backtrack(0, 0, 0);

  function goBack() {
    robot.turnRight();
    robot.turnRight();
    robot.move();
    robot.turnRight();
    robot.turnRight();
  }
  function backtrack(x, y, d) {
    let key = x + "," + y;

    visited.add(key);
    robot.clean();

    for (let i = 0; i < 4; i++) {
      let nD = (d + i) % 4;
      let nX = x + directions[nD][0];
      let nY = y + directions[nD][1];
      let nKey = nX + "," + nY;

      if (!visited.has(nKey) && robot.move()) {
        backtrack(nX, nY, nD);
        goBack();
      }

      robot.turnRight();
    }
  }
};

// Explanation:
// -List out directions in clockwise order
// -Initialize hashset to store visited nodes
// -Backtrack on x / y coordinate 0 / 0 at direction 0
// -In backtrack:
// -Add coordinate to visited and clean node
// -For each index 0 through 3:
// -Get direction index by taking the remainder of (direction + index) / 4, which ensures we stay within our directions array bounds
// -We then update coordinates and backtrack on those updated coordinates and new direction if move is valid and not in visited
// -Once done backtracking, we go back by turning 180 degrees, moving, and turning back 180 degrees
// -Finally, before moving on to next direction, we need to turn right

// Notes:
// -Time complexity: O(n - m), where n is the number of nodes and m is the number of obstacles
// -Space complexity: O(n - m)

// 759. Employee Free Time

var employeeFreeTime = function (schedule) {
  let schedules = [];

  for (let employee of schedule) {
    for (let interval of employee) {
      schedules.push(interval);
    }
  }

  schedules.sort((a, b) => a.start - b.start);

  let result = [];
  let prev = schedules[0];
  let [start, end] = [prev.start, prev.end];

  for (let i = 1; i < schedules.length; i++) {
    let curr = schedules[i];

    if (end < curr.start) {
      result.push({ start: end, end: curr.start });
      start = curr.start;
    }

    end = Math.max(end, curr.end);
  }

  return result;
};

// Explanation:
// -Push all intervals to array
// -Sort intervals by start time
// -Set result to empty array
// -Set prev to first interval
// -Set start and end pointers to first interval start and end
// -For each subsequent interval:
// -If curr start time > prev end time:
// -Push prev end and curr start to result and set start to curr start
// -At each iteration, update prev end to greater of prev end or curr end
// -Once done, return result

// Notes:
// -Time complexity: O(n log n), where n is the total number of intervals
// -Space complexity: O(n) to maintain merged sorted intervals

let employee1 = [{ start: 1, end: 2 }];
let employee2 = [{ start: 4, end: 6 }];
console.log(employeeFreeTime([employee1, employee2]));

// 1937. Maximum Number of Points with Cost

var maxPoints = function (points) {
  let [m, n] = [points.length, points[0].length];
  let [prev, curr] = [points[0], new Array(n)];

  for (let r = 1; r < m; r++) {
    let maxAdd = 0;

    for (let c = 0; c < n; c++) {
      maxAdd = Math.max(maxAdd - 1, prev[c]);
      curr[c] = points[r][c] + maxAdd;
    }

    maxAdd = 0;

    for (let c = n - 1; c >= 0; c--) {
      maxAdd = Math.max(maxAdd - 1, prev[c]);
      curr[c] = Math.max(curr[c], points[r][c] + maxAdd);
    }

    prev = curr;
    curr = new Array(n);
  }

  return Math.max(...prev);
};

// Explanation:
// -Get matrix height and width
// -Set previous row to first row and curr row to empty array
// -For each row starting at second row:
// -Set running max to 0
// -For each cell left to right in row:
// -Set running max to greater of previous row number or running max - 1, as we have to account for distance traveled
// -Add running max to current cell
// -Reset running max to 0
// -For each cell right to left:
// -Set running max to greater of running max - 1 or prev row number
// -Set current cell to greater of current cell or current number plus running max
// -At each row, we set previous to curr row and curr to empty array
// -Once done, we return the max number in our prev row

// Notes:
// -Time complexity: O(m * n), where m is number of rows and n is number of columns
// -Space complexity: O(n), where n is number of columns

console.log(
  maxPoints([
    [1, 2, 3],
    [1, 5, 1],
    [3, 1, 1],
  ])
);

// 419. Battleships in a Board

var countBattleships = function (board) {
  let [m, n] = [board.length, board[0].length];
  let count = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "X") {
        if (
          board[r][c - 1] !== "X" &&
          (!board[r - 1] || board[r - 1][c] !== "X")
        ) {
          count++;
        }
      }
    }
  }

  return count;
};

// Explanation:
// -Set initial count to 0
// -For each node in board:
// -If node marked as battleship:
// -If neighbors left and above not marked as battleships, increase count
// -Once done, return count

// Notes:
// -Time complexity: O(m * n)
// -Space complexity: O(1)

console.log(
  countBattleships([
    ["X", ".", ".", "X"],
    [".", ".", ".", "X"],
    [".", ".", ".", "X"],
  ])
);

// 539. Minimum Time Difference

var findMinDifference = function (timePoints) {
  timePoints = timePoints.map((time) => {
    let [hh, mm] = time.split(":");

    return 60 * Number(hh) + Number(mm);
  });

  timePoints.sort((a, b) => a - b);

  let [first, last] = [timePoints[0], timePoints[timePoints.length - 1]];
  let result = 1440 + first - last;

  for (let i = 1; i < timePoints.length; i++) {
    let [curr, prev] = [timePoints[i], timePoints[i - 1]];

    if (curr - prev < result) {
      result = curr - prev;
    }
  }

  return result;
};

// Explanation:
// -Convert times to their 24 hour minute counterparts
// -Sort times
// -Set result to difference between first and last time
// -For each time starting at second time:
// -If curr time - prev time < result, update result to curr time - prev time
// -Once done, return result

// Notes:
// -Time complexity: O(n log n) for sorting
// -Space complexity: O(n) to store mapped times

console.log(findMinDifference(["23:59", "00:00"]));

// 833. Find And Replace in String

var findReplaceString = function (s, indices, sources, targets) {
  let result = s.split("");

  for (let i = 0; i < indices.length; i++) {
    let [index, src, target] = [indices[i], sources[i], targets[i]];
    let sample = s.substring(index, index + src.length);

    if (sample === src) {
      result[index] = target;

      for (let i = 1; i < src.length; i++) {
        result[index + i] = "";
      }
    }
  }

  return result.join("");
};

// Explanation:
// -Split input string and set as result
// -For each index in indices:
// -Get index, src, and target
// -Build sample string from index and source
// -If sample equals source, replace curr index in result w/ target and turn subsequent indices up to source length blank
// -Once done iterating through indices, join result array and return result

// Notes:
// -Time complexity: O(i * s), where i is length of indices array and s is length of input string
// -Space complexity: O(s)

console.log(findReplaceString("abcd", [0, 2], ["a", "cd"], ["eee", "ffff"]));

// 843. Guess the Word

var findSecretWord = function (wordlist, master) {
  for (let i = 0; i < 10; i++) {
    let index = Math.floor(Math.random() * wordlist.length);
    let guess = wordlist[index];
    let matches = master.guess(guess);
    let candidates = [];

    for (let word of wordlist) {
      if (matches === wordMatch(guess, word)) {
        candidates.push(word);
      }
    }

    wordlist = candidates;
  }

  function wordMatch(w1, w2) {
    let matches = 0;

    for (let i = 0; i < w1.length; i++) {
      if (w1[i] === w2[i]) {
        matches++;
      }
    }

    return matches;
  }
};

// Explanation:
// -Run for loop ten times, as we have 10 guesses
// -At each iteration:
// -Pick random index and get word at random index
// -Run guess against match API to get matches
// -If matches returns 6, we'll have guessed word
// -For each word in word list:
// -If word has same match count as our guess, add word to our candidate list
// -Once we find our candidates, update word list with candidates and try again

// Notes:
// -Time complexity: O(n), where n is length of word list
// -Space complexity: O(n) to store candidate list

// 729. My Calendar I

class MyCalendar {
  constructor() {
    this.data = [
      [0, 0],
      [Infinity, Infinity],
    ];
  }
  book(start, end) {
    let [l, r] = [0, this.data.length - 1];

    while (l <= r) {
      let mid = Math.floor((r - l) / 2 + l);

      if (end > this.data[mid][0]) {
        l = mid + 1;
      } else if (end < this.data[mid][0]) {
        r = mid - 1;
      } else {
        l = mid;
        break;
      }
    }

    if (start < this.data[l - 1][1]) {
      return false;
    }

    this.data.splice(l, 0, [start, end]);

    return true;
  }
}

// Explanation:
// -Initialize calendar class w/ smallest and largest intervals
// -For book method:
// -Set left and right pointers to beginning and end of calendar
// -While left <= right:
// -Get midpoint
// -If input end > mid start, set left to mid + 1
// -Else if input end < mid start, set right to mid - 1
// -Else if equal, set left pointer to midpoint and break
// -If start < found index's left neighbor, return false
// -Else insert interval at found index and return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

let calendar = new MyCalendar();
console.log(calendar.book(10, 15));
console.log(calendar.book(20, 25));
console.log(calendar.book(17, 23));

// 777. Swap Adjacent in LR String

var canTransform = function (start, end) {
  let startCount = start.split("").filter((letter) => letter === "X").length;
  let endCount = end.split("").filter((letter) => letter === "X").length;

  if (startCount !== endCount) {
    return false;
  }

  let n = start.length;
  let [i, j] = [0, 0];

  while (i < n && j < n) {
    if (start[i] === "X") {
      i++;
      continue;
    }
    if (end[j] === "X") {
      j++;
      continue;
    }
    if (
      start[i] !== end[j] ||
      (start[i] === "L" && i < j) ||
      (start[i] === "R" && i > j)
    ) {
      return false;
    }

    i++;
    j++;
  }

  return true;
};

// Explanation:
// -Get 'X' count in both start and end strings
// -If counts are different, transformation not possible so return false
// -Set start and end pointers to beginning of words
// -While both pointers are less than start length:
// -If either pointer is at an 'X', move that index forward and continue
// -Else if chars at two pointers are not equal or start pointer is an 'L' and start pointer < end pointer or start pointer is an 'R' and start pointer > end pointer, return false
// -Else move both pointers forward
// -If we iterate through start string without returning false, return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(canTransform("RXXLRXRXL", "XRLXXRRLX"));

// 939. Minimum Area Rectangle

var minAreaRect = function (points) {
  let map = new Map();
  let min = Infinity;

  for (let [x, y] of points) {
    if (!map.has(x)) {
      map.set(x, new Set());
    }

    map.get(x).add(y);
  }
  for (let [x1, y1] of points) {
    for (let [x2, y2] of points) {
      let sameCross = x1 === x2 || y1 === y2;

      if (!sameCross && map.get(x1).has(y2) && map.get(x2).has(y1)) {
        let area = Math.abs(x1 - x2) * Math.abs(y1 - y2);
        min = Math.min(min, area);
      }
    }
  }

  return min === Infinity ? 0 : min;
};

// Explanation:
// -Map out x / y coordinates and set min to infinity
// -For each point in points:
// -Iterate over points checking to see if map has x1 / y2 and x2 / y1 pairs
// -If so, get area and update min if smaller than current min area
// -Once done, return 0 if min not found
// -Else return min area

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(n)

console.log(
  minAreaRect([
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3],
    [2, 2],
  ])
);

// 2178. Maximum Split of Positive Even Integers

var maximumEvenSplit = function (finalSum) {
  if (finalSum % 2) {
    return [];
  }

  let result = new Set();
  let [n, sum] = [2, 0];

  while (sum < finalSum) {
    sum += n;
    result.add(n);
    n += 2;
  }

  result.delete(sum - finalSum);

  return [...result];
};

// Explanation:
// -If input sum not divisible by 2, return empty array
// -Set result to empty hashset
// -Set n to 2 and sum 0
// -While sum < input sum:
// -Add n to sum, add n to result set, and add 2 to n
// -Once we go over, we subtract final sum from sum to find what number made us go over and we delete from set
// -Once done, we return nums in our set

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), as our output array doesn't count as extra space

console.log(maximumEvenSplit(24));

// 652. Find Duplicate Subtrees

var findDuplicateSubtrees = function (root) {
  let map = {};
  let result = [];

  dfs(root);

  return result;

  function dfs(node) {
    if (!node) {
      return "N";
    }

    let left = dfs(node.left);
    let right = dfs(node.right);
    let key = `${node.val}-${left}-${right}`;

    map[key] = map[key] + 1 || 1;

    if (map[key] === 2) {
      result.push(node);
    }

    return key;
  }
};

// Explanation:
// -Initialize empty map to store subtrees and dfs on root node
// -In dfs:
// -If node is null, return null char
// -Get left and right keys by performing dfs on left and right subtrees
// -Set curr node key to string including val, left, and right keys
// -Set key count in map to key count + 1 or 1
// -If key count equals 2, duplicate found so we push node to result
// -Finally, we return our key to our function call

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

let tree = new Node(1);
tree.left = new Node(2);
tree.left.right = new Node(4);
tree.right = new Node(2);
tree.right.right = new Node(4);
console.log(findDuplicateSubtrees(tree));

// 2162. Minimum Cost to Set Cooking Time

var minCostSetTime = function (startAt, moveCost, pushCost, targetSeconds) {
  function cost(mins, secs) {
    if (mins < 0 || secs < 0 || mins > 99 || secs > 99) {
      return Infinity;
    }

    let str = String(mins * 100 + secs);
    let curr = String(startAt);
    let result = 0;

    for (let char of str) {
      if (char === curr) {
        result += pushCost;
      } else {
        result += pushCost + moveCost;
        curr = char;
      }
    }

    return result;
  }

  let mins = Math.floor(targetSeconds / 60);
  let secs = targetSeconds % 60;

  return Math.min(cost(mins, secs), cost(mins - 1, secs + 60));
};

// Explanation:
// -Convert target seconds to minutes and seconds
// -Return lesser of running cost function on mins and secs or mins - 1 and secs + 60
// -In cost function:
// -If mins or secs < 0 or mins or secs > 99, return Infinity to our min function call as not possible
// -Multiply minutes by 100, add seconds, and convert to string
// -Convert start value to string as well and set cost count to 0
// -For each character in converted time:
// -If char equals curr, add push cost to cost count
// -Else add push plus move cost to cost count and set curr to char
// -Once done iterating through time, return cost count to function call

// Notes:
// -Time complexity: O(1) given integer constraints
// -Space complexity: O(1)

console.log(minCostSetTime(1, 2, 1, 80));

// 1631. Path With Minimum Effort

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }
  swap(start, end) {
    [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
  }
  size() {
    return this.data.length;
  }
  top() {
    return this.data[0] || null;
  }
  add(num) {
    this.data.push(num);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parent = this.parent(index);

    while (this.compare(this.data[index], this.data[parent] || {}) < 0) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }
  bubbleDown() {
    let index = 0;
    let size = this.size();

    while (true) {
      let left = null;
      let right = null;
      let swap = null;
      let leftIndex = this.left(index);
      let rightIndex = this.right(index);

      if (leftIndex < size) {
        left = this.data[leftIndex];

        if (this.compare(left, this.data[index]) < 0) {
          swap = leftIndex;
        }
      }
      if (rightIndex < size) {
        right = this.data[rightIndex];

        if (
          (swap !== null && this.compare(right, left) < 0) ||
          (swap === null && this.compare(right, this.data[index]) < 0)
        ) {
          swap = rightIndex;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(index, swap);
      index = swap;
    }
  }
}

var minimumEffortPath = function (heights) {
  let heap = new Heap((a, b) => a.diff - b.diff);
  let visited = new Set();

  heap.add({ cell: [0, 0], diff: 0 });

  let directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let [rows, cols] = [heights.length, heights[0].length];

  while (heap.size()) {
    let { cell, diff } = heap.pop();
    let [row, col] = cell;
    let currHeight = heights[row][col];

    if (row === rows - 1 && col === cols - 1) {
      return diff;
    }

    let key = `${row},${col}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (let [r, c] of directions) {
      let newR = row + r;
      let newC = col + c;

      if (newR < 0 || newC < 0 || newR >= rows || newC >= cols) {
        continue;
      }

      let newDiff = Math.abs(currHeight - heights[newR][newC]);
      heap.add({ cell: [newR, newC], diff: Math.max(diff, newDiff) });
    }
  }
};

// Explanation:
// -Initialize min heap based on difference between cells
// -Initialize empty set to store visited cells
// -Add first cell w/ difference of 0 to heap
// -While heap has work:
// -Pop min off heap
// -If we've reached last cell, return difference
// -If visited has cell, continue
// -Add cell to visited
// -For each direction up, down, left, right:
// -If new cell out of bounds, continue
// -Else get difference between new cell and prev cell and add the new cell with greater of prev difference or new difference to heap

// Notes:
// -Time complexity: O((rows * cols) * log(rows * cols))
// -Space complexity: O(rows * cols)

console.log(
  minimumEffortPath([
    [1, 2, 3],
    [3, 8, 4],
    [5, 3, 5],
  ])
);

// 1376. Time Needed to Inform All Employees

var numOfMinutes = function (n, headID, manager, informTime) {
  if (n <= 1) {
    return 0;
  }

  let graph = new Map();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (let i = 0; i < manager.length; i++) {
    let parent = manager[i];

    if (parent !== -1) {
      graph.get(parent).push(i);
    }
  }

  let result = 0;
  let q = [[headID, informTime[headID]]];

  while (q.length) {
    let [employee, time] = q.shift();
    result = Math.max(result, time);

    for (let report of graph.get(employee)) {
      q.push([report, time + informTime[report]]);
    }
  }

  return result;
};

// Explanation:
// -If n <= 1, return 0 as there are no employees
// -Map out manager / employee relationships in graph
// -Set result to 0 and push manager and inform time at manager to queue
// -While queue has work:
// -Pop employee and time from front of queue
// -Set result to max of result or curr time
// -For each report of curr employee:
// -Push report and curr time + report time to queue
// -Once done traversing employees, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(numOfMinutes(6, 2, [2, 2, -1, 2, 2, 2], [0, 0, 1, 0, 0, 0]));

// 900. RLE Iterator

class RLEIterator {
  constructor(encoding) {
    this.encoding = encoding;
    this.index = 0;
  }
  next(int) {
    while (int && this.index < this.encoding.length) {
      let count = this.encoding[this.index];
      let num = this.encoding[this.index + 1];

      if (count < int) {
        int -= count;
        this.index += 2;
      } else {
        this.encoding[this.index] = count - int;
        return num;
      }
    }

    return -1;
  }
}

// Explanation:
// -Intialize RLE iterator class w/ encoding array and index of 0
// -For next iterator method:
// -While iterator input > 0 and index < array length:
// -Get count at index and num at subsequent index
// -If count < iterator input:
// -Subtract count from iterator and increase index by 2
// -Else subtract iterator from curr index count and return num at subsequent index
// -If itereator goes to 0 or below or we reach end of array without returning value, return -1

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

let rle = new RLEIterator([3, 8, 0, 9, 2, 5]);
console.log(rle.next(2));
console.log(rle.next(1));
console.log(rle.next(3));

// 1387. Sort Integers by The Power Value

var getKth = function (lo, hi, k) {
  let map = {};
  let memo = new Map();
  let result = [];

  for (let i = lo; i <= hi; i++) {
    let powerValue = power(i);

    if (!map[powerValue]) {
      map[powerValue] = [];
    }

    map[powerValue].push(i);
  }
  for (let powerVal in map) {
    for (let num of map[powerVal]) {
      result.push(num);
    }
  }

  return result[k - 1];

  function power(x) {
    if (memo.has(x)) {
      return memo.get(x);
    }
    if (x === 1) {
      return 0;
    }

    let result;

    if (x % 2) {
      result = 1 + power(x * 3 + 1);
    } else {
      result = 1 + power(x / 2);
    }

    memo.set(x, result);

    return result;
  }
};

// Explanation:
// -For each num in range:
// -Get power value and map out nums to power values in map
// -In recursion:
// -if memo has val, get result at val
// -If val is 1, return 0
// -Set result to result of calc based on even or odd
// -Add val and result to memo and return result
// -Once done getting power values, push all nums to result array and return k - 1 element in array

// Notes:
// -Time complexity: O(n), where n is the length of range
// -Space complexity: O(n)

console.log(getKth(12, 17, 3));

// 2135. Count Words Obtained After Adding a Letter

var wordCount = function (startWords, targetWords) {
  let sortedStart = new Set();
  let result = 0;

  for (let word of startWords) {
    sortedStart.add(word.split("").sort().join(""));
  }
  for (let word of targetWords) {
    let sorted = word.split("").sort().join("");

    for (let i = 0; i < sorted.length; i++) {
      let sample = sorted.substring(0, i) + sorted.substring(i + 1);

      if (sortedStart.has(sample)) {
        result++;
        break;
      }
    }
  }

  return result;
};

// Explanation:
// -Initialize empty set to store sorted start words and set result to 0
// -Add sorted start words to set
// -For each target word:
// -Sort target word and remove a character at each index
// -If set has updated word, add 1 to result and move on to next target word

// Notes:
// -Time complexity: O(n), where n is length of our word list, as our words are constrained to 26 characters so sort is constant time operation
// -Space complexity: O(n)

console.log(wordCount(["ant", "act", "tack"], ["tack", "act", "acti"]));

// 1055. Shortest Way to Form String

var shortestWay = function (source, target) {
  let i = 0;
  let count = 0;

  while (i < target.length) {
    let sub = "";

    for (let j = 0; j < source.length; j++) {
      if (source[j] === target[i]) {
        sub += source[j];
        i++;
      }
    }
    if (sub.length === 0) {
      return -1;
    }

    count++;
  }

  return count;
};

// Explanation:
// -Set target pointer to 0 and sub count to 0
// -While target index in bounds:
// -Intialize empty substring
// -For each char in source:
// -If char equal to target char, add char to substring and increase target index
// -Once done iterating through source, check if substring exists
// -If not, return -1
// -Else increase count and continue
// -Once we reach end of target, return count

// Notes:
// -Time complexity: O(s * t)
// -Space complexity: O(1)

console.log(shortestWay("abc", "abcbd"));

// 1554. Strings Differ by One Character

var differByOne = function (dict) {
  let seen = new Set();

  for (let word of dict) {
    for (let i = 0; i < word.length; i++) {
      let pattern = word.substring(0, i) + "*" + word.substring(i + 1);

      if (seen.has(pattern)) {
        return true;
      }

      seen.add(pattern);
    }
  }

  return false;
};

// Explanation:
// -Initialize hashset to store patterns
// -For each word of dictionary:
// -For each char in word:
// -Create pattern by placing wildcard at curr index
// -If seen has pattern, return true
// -Else add pattern to seen and continue
// -If we iterate through dictionary without returning true, return false

// Notes:
// -Time complexity: O(n * (m ^ 2)), where n is length of dictionary and m is length of word
// -Space complexity: O(n * m)

console.log(differByOne(["abcd", "abce", "abc"]));

// 1996. The Number of Weak Characters in the Game

var numberOfWeakCharacters = function (properties) {
  properties.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  let [result, dMax] = [0, 0];

  for (let [a, d] of properties) {
    if (d < dMax) {
      result++;
    }

    dMax = Math.max(dMax, d);
  }

  return result;
};

// Explanation:
// -Sort players by attack descending and defense ascending
// -Set result and max defense to 0
// -For each player in game:
// -If player defense < max defense, add 1 to result
// -At each iteration, set max defense to greater of max defense or curr player defense
// -Once done, return result

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) for sorting

console.log(
  numberOfWeakCharacters([
    [2, 2],
    [3, 3],
  ])
);

// 418. Sentence Screen Fitting

var wordsTyping = function (sentence, rows, cols) {
  sentence = sentence.join(" ") + " ";
  let totalLen = 0;

  for (let i = 0; i < rows; i++) {
    totalLen += cols;

    while (0 < totalLen && sentence[totalLen % sentence.length] !== " ") {
      totalLen--;
    }

    totalLen++;
  }

  return Math.floor(totalLen / sentence.length);
};

// Explanation:
// -Join words in sentence and add space after each word
// -Set total length to 0
// -For each row in input rows:
// -Add column count to total length
// -While index at total length not empty space, we subtract 1 from total length
// -Once done subtracting from total length, add back 1 to total length to account for extra space and continue
// -Once we iterate through rows, we return floor of total length divided by sentence length

// Notes:
// -Time complexity: O(rows * len of longest word)
// -Space complexity: O(n)

console.log(wordsTyping(["hello", "world"], 5, 8));

// 792. Number of Matching Subsequences

var numMatchingSubseq = function (s, words) {
  let buckets = [];
  let result = 0;

  for (let i = 0; i < 26; i++) {
    buckets.push([]);
  }
  for (let word of words) {
    buckets[getCharIndex(word[0])].push(word);
  }
  for (let char of s) {
    let charIndex = getCharIndex(char);
    let oldBucket = buckets[charIndex];
    buckets[charIndex] = [];

    while (oldBucket.length) {
      let curr = oldBucket.pop();
      let next = curr.slice(1);

      if (next) {
        let nextIndex = getCharIndex(next[0]);
        buckets[nextIndex].push(next);
      } else {
        result++;
      }
    }
  }

  return result;

  function getCharIndex(char) {
    return char.charCodeAt() - "a".charCodeAt();
  }
};

// Explanation:
// -Initialize empty array to store words by start char and set result to 0
// -For each index in alphabet, push empty array to buckets array
// -For each word in input words:
// -Push word to index at first char in word
// -For each char of input string:
// -Get char index and old bucket at index
// -Empty bucket at char index
// -While old bucket has words:
// -Pop last word from bucket and slice first char off
// -If we still have chars, find new bucket based on first char in new word and push word to that bucket
// -Else increase our result by 1
// -Once done iterating through input string chars, return result

// Notes:
// -Time complexity: O(s * n), where s is input string length and n is words list length
// -Space complexity: O(n)

console.log(numMatchingSubseq("abcde", ["a", "bb", "acd", "ace"]));

// 1101. The Earliest Moment When Everyone Become Friends

var earliestAcq = function (logs, n) {
  logs.sort((a, b) => a[0] - b[0]);

  let count = n;
  let parents = [];
  let rank = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    parents[i] = i;
  }
  for (let [time, node, edge] of logs) {
    if (union(node, edge)) {
      count--;
    }
    if (count === 1) {
      return time;
    }
  }

  return -1;

  function union(n1, n2) {
    let [p1, p2] = [find(n1), find(n2)];

    if (p1 === p2) {
      return false;
    }
    if (rank[p1] > rank[p2]) {
      parents[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      parents[p1] = p2;
      rank[p2] += rank[p1];
    }

    return true;
  }
  function find(n) {
    let p = parents[n];

    while (p !== parents[p]) {
      p = parents[p];
      parents[p] = parents[parents[p]];
    }

    return p;
  }
};

// Explanation:
// -Sort logs by time
// -Set count to n
// -Fill parents and rank arrays
// -For each log in logs:
// -If we're able to merge friends using union find, we decrease our count by 1
// -If our count equals 1, we've merged all of our friends so we return time
// -Else if we're unable to merge all friends, we return -1

// Notes:
// -Time complexity: O(n + (m log m) + (m alpha n)), where n is number of people and m is number of logs. Sorting costs m log m. Creating parent and rank data structures costs n. Iterating and running union find on logs costs m alpha n.
// -Space complexity: O(n + log m), where n is space used for data structures and log m is space used for sorting

console.log(
  earliestAcq(
    [
      [20190101, 0, 1],
      [20190104, 3, 4],
      [20190107, 2, 3],
      [20190211, 1, 5],
      [20190224, 2, 4],
      [20190301, 0, 3],
      [20190312, 1, 2],
      [20190322, 4, 5],
    ],
    6
  )
);

// 562. Longest Line of Consecutive One in Matrix

var longestLine = function (mat) {
  let max = 0;
  let [m, n] = [mat.length, mat[0].length];
  let dp = new Array(n).fill(0).map((node) => [0, 0, 0, 0]);

  for (let i = 0; i < m; i++) {
    let curr = new Array(n).fill(0).map((node) => [0, 0, 0, 0]);

    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 1) {
        curr[j][0] = j > 0 ? curr[j - 1][0] + 1 : 1;
        curr[j][1] = dp[j][1] + 1;
        curr[j][2] = j > 0 ? dp[j - 1][2] + 1 : 1;
        curr[j][3] = j < n - 1 ? dp[j + 1][3] + 1 : 1;
      }

      max = Math.max(max, ...curr[j]);
    }

    dp = curr;
  }

  return max;
};

// Explanation:
// -Fill dp array of size n w/ 4 zero arrays
// -For each row in grid:
// -Create fresh dp array
// -For each col in row:
// -If node equals 1:
// -Set curr col at index 0 to previous plus col + 1 or 1 if col > 0
// -Set curr col at index 1 to prev row in dp + 1
// -Set curr col at index 2 to prev col in dp + 1 or 1 if curr col index > 0
// -Set curr col at index 3 to next col in dp + 1 or 1 if curr index not last col
// -Once done iterating through col, update max to greatest sum in col
// -Once done iterating cols, set dp to curr and continue
// -Once we iterate through entire grid, return max

// Notes:
// -Time complexity: O(m * n)
// -Space complexity: O(n)

console.log(
  longestLine([
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
  ])
);

// 2018. Check if Word Can Be Placed In Crossword

var placeWordInCrossword = function (board, word) {
  let [m, n] = [board.length, board[0].length];
  let dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (isValid(r, c)) {
        for (let [dr, dc] of dirs) {
          let pr = r - dr;
          let pc = c - dc;

          if (!isValid(pr, pc) && dfs(r, c, 0, [dr, dc])) {
            return true;
          }
        }
      }
    }
  }

  return false;

  function isValid(r, c) {
    let inBounds = 0 <= r && r < m && 0 <= c && c < n;

    return inBounds && board[r][c] !== "#";
  }
  function dfs(r, c, i, dir) {
    if (i === word.length) {
      return !isValid(r, c);
    }
    if (!isValid(r, c) || (board[r][c] !== " " && board[r][c] !== word[i])) {
      return false;
    }

    return dfs(r + dir[0], c + dir[1], i + 1, dir);
  }
};

// Explanation:
// -Get board dimensions and initialize directions
// -For each node in board:
// -If node not blocked and node is blank or node is equal to first char in word:
// -For each direction up, down, left, right:
// -If previous node not valid and dfs on node is true: return true
// -In dfs:
// -If index equals end of word: return check on curr node not valid
// -If node not valid or node is empty but node char not equal to word index, return false
// -Else return dfs on new directions with index increased by 1
// -Once done w/ dfs, return false if we don't find valid path

// Notes:
// -Time complexity: O(m * n * l), where m and n represent row and column length, and l represents word length
// -Space complexity: O(max m or n)

console.log(
  placeWordInCrossword(
    [
      ["#", " ", "#"],
      [" ", " ", "#"],
      ["#", "c", " "],
    ],
    "abc"
  )
);

// 13. Roman to Integer

var romanToInt = function (s) {
  let romans = "IVXLCDM";
  let nums = [1, 5, 10, 50, 100, 500, 1000];
  let map = {};
  let result = 0;

  for (let i = 0; i < romans.length; i++) {
    map[romans[i]] = nums[i];
  }
  for (let i = 0; i < s.length; i++) {
    let curr = map[s[i]];
    let next = map[s[i + 1]];

    result += curr < next ? -curr : curr;
  }

  return result;
};

// Explanation:
// -Map out roman numerals w/ respective values and set result to 0
// -For each char in input string:
// -Get curr and next value
// -If curr < next, substract curr from result
// -Else add curr to result
// -Once done, return result

// Notes:
// -Time complexity: O(1), as there is a finite number of roman numerals
// -Space complexity: O(1)

console.log(romanToInt("XVII"));

// 14. Longest Common Prefix

var longestCommonPrefix = function (strs) {
  if (strs === null || strs.length === 0) {
    return "";
  }
  for (let i = 0; i < strs[0].length; i++) {
    let char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i === strs[j].length || strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }

  return strs[0];
};

// Explanation:
// -If input array null or empty, return empty string
// -For each char in first word:
// -For each subsequent word:
// -if first word index equals curr word length or chars not equal, return substring up to curr first word index
// -If we iterate through full list without returning prefix, return first word as it is prefix

// Notes:
// -Time complexity: O(s), where s is the sum of all characters in all strings
// -Space complexity: O(1)

console.log(longestCommonPrefix(["flower", "flow", "flaw"]));

// 380. Insert Delete GetRandom O(1)

class RandomizedSet {
  constructor() {
    this.list = [];
    this.map = new Map();
  }
  swap(s, e) {
    [this.list[s], this.list[e]] = [this.list[e], this.list[s]];
  }
  insert(val) {
    if (this.map.has(val)) {
      return false;
    }

    this.map.set(val, this.list.length);
    this.list.push(val);

    return true;
  }
  remove(val) {
    if (!this.map.has(val)) {
      return false;
    }

    let index = this.map.get(val);

    this.swap(index, this.list.length - 1);
    this.list.pop();
    this.map.set(this.list[index], index);
    this.map.delete(val);

    return true;
  }
  getRandom() {
    return this.list[Math.floor(Math.random() * this.list.length)];
  }
}

// Explanation:
// -Intialize random set class w/ empty list array and empty hashmap
// -For insert method:
// -If map has val, return false
// -Else add val and list length to map and push val to list and return true
// -For remove method:
// -If val not in map, return false
// -Else get index for val and swap w/ last item in list
// -Pop off last item from list and add val at index and index to map
// -Then delete val and return true
// -For get random method:
// -Return val at random index in list array

// Notes:
// -Time complexity: O(1) for all operations
// -Space complexity: O(n) to store elements

let rand = new RandomizedSet();
rand.insert(4);
rand.insert(3);
rand.insert(2);
console.log(rand.getRandom());
rand.remove(2);
console.log(rand.getRandom());

// 227. Basic Calculator II

var calculate = function (s) {
  if (s === null || s.length === 0) {
    return 0;
  }

  let stack = [];
  let num = 0;
  let operator = "+";
  let operations = {
    "+": true,
    "-": true,
    "/": true,
    "*": true,
  };

  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    if (char >= "0" && char <= "9") {
      num = num * 10 + Number(char);
    }
    if (operations[char] || i === s.length - 1) {
      if (operator === "-") {
        stack.push(-num);
      } else if (operator === "+") {
        stack.push(num);
      } else if (operator === "*") {
        stack.push(stack.pop() * num);
      } else if (operator === "/") {
        stack.push(Math.trunc(stack.pop() / num));
      }

      operator = char;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b);
};

// Explanation:
// -If input string not valid, return 0
// -Initialize empty stack and set curr num to 0 and prev operator to plus
// -For each char in string:
// -If char is number, add to curr num
// -Else if char is sign:
// -If sign is minus, push negative num to stack
// -If sign is plus, push num to stack
// -If sign is multiplication, pop last item off stack, multiply times num and add that num back to stack
// -Else if sign is division, pop last item off stack and divide by num and push back to stack
// -Then set operator to curr sign and reset curr num to 0
// -Once done, add all nums in stack and return result

// Notes:
// -Time Complexity: O(n)
// -Space complexity: O(n)

console.log(calculate("3 * 2 + 5 / 4"));

// 41. First Missing Positive

var firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let index = nums[i] - 1;

    if (i === index || nums[i] === nums[index]) {
      continue;
    }
    if (index >= 0 && index < nums.length) {
      [nums[i], nums[index]] = [nums[index], nums[i]];
      i--;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 !== nums[i]) {
      return i + 1;
    }
  }

  return nums.length + 1;
};

// Explanation:
// -For each num in nums:
// -Get target index of num by subtracting 1 from num
// -If num is already in correct position, continue
// -Else swap num at curr index with num at target index and decrease curr index by 1
// -Once done, go through each index in nums and return missing positive
// -If we don't find missing positive in nums, missing positive is nums length + 1

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(firstMissingPositive([1, 2, 6, 7]));

// 341. Flatten Nested List Iterator

class NestedIterator {
  constructor(nestedList) {
    this.nums = [];
    this.position = 0;

    this.flattenList(nestedList);
  }
  flattenList(list) {
    for (let nestedItem of list) {
      if (nestedItem.isInteger()) {
        this.nums.push(nestedItem.getInteger());
      } else {
        this.flattenList(nestedItem.getList());
      }
    }
  }
  hasNext() {
    return this.position < this.nums.length;
  }
  next() {
    this.position++;

    return this.nums[this.position - 1];
  }
}

// Explanation:
// -Initialize nested iterator class by flattening list recursively
// -For method has next:
// -Return true if index < flattened length
// -For next method:
// -Increase index and return num at index - 1

// Notes:
// -Time complexity: O(number of lists + number of integers) for constructor, O(1) for hasNext and next method
// -Space complexity: O(number of integers + nesting depth)

// 289. Game of Life

var gameOfLife = function (board) {
  let [rows, cols] = [board.length, board[0].length];
  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let neighbors = countNeighbors(r, c);

      if (board[r][c]) {
        if (neighbors === 2 || neighbors === 3) {
          board[r][c] = 3;
        }
      } else if (neighbors === 3) {
        board[r][c] = 2;
      }
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 1) {
        board[r][c] = 0;
      } else if (board[r][c] > 1) {
        board[r][c] = 1;
      }
    }
  }

  return board;

  function countNeighbors(r, c) {
    let count = 0;

    for (let [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      let rBounds = 0 <= nr && nr < rows;
      let cBounds = 0 <= nc && nc < cols;

      if (!rBounds || !cBounds) {
        continue;
      }
      if (board[nr][nc] === 1 || board[nr][nc] === 3) {
        count++;
      }
    }

    return count;
  }
};

// Explanation:
// -For each node in matrix:
// -Count neighbors live neighbors
// -If node is live:
// -Mark node as 3 if node has 2 or 3 neighbors
// -Else if node is dead but has 3 neighbors, mark node as 2
// -For each node in matrix:
// -If node marked as 1, mark as 0
// -Else if node is marked as 2 or 3, mark as 1
// -Once done, return matrix

// Notes:
// -Time complexity: O(m * n)
// -Space complexity: O(1)

console.log(
  gameOfLife([
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ])
);

// 1152. Analyze User Website Visit Pattern

var mostVisitedPattern = function (username, timestamp, website) {
  let merged = username
    .map((item, index) => [timestamp[index], username[index], website[index]])
    .sort((a, b) => a[0] - b[0]);

  let userEntries = new Map();

  for (let entry of merged) {
    let [time, user, site] = entry;

    if (!userEntries.has(user)) {
      userEntries.set(user, []);
    }

    userEntries.get(user).push(site);
  }

  let patterns = {};

  for (let [user, sites] of userEntries) {
    let sequences = createThreeSequence(sites);

    for (let seq of sequences) {
      patterns[seq] = patterns[seq] + 1 || 1;
    }
  }

  let maxCount = 0;
  let result = "";

  for (let seq in patterns) {
    let count = patterns[seq];

    if (count > maxCount) {
      [maxCount, result] = [count, seq];
    } else if (count === maxCount) {
      result = seq < result ? seq : result;
    }
  }

  return result.split(",");

  function createThreeSequence(sites) {
    let size = sites.length;
    let sequences = new Set();

    for (let i = 0; i < size - 2; i++) {
      let site1 = sites[i];

      for (let j = i + 1; j < size - 1; j++) {
        let site2 = sites[j];

        for (let k = j + 1; k < size; k++) {
          let site3 = sites[k];

          let seq = `${site1},${site2},${site3}`;
          sequences.add(seq);
        }
      }
    }

    return sequences;
  }
};

// Explanation:
// -Merge entries and sort by time
// -Map out users with their respective site visits
// -For each user:
// -Make all possible three combinations of sites
// -If pattern exists in map, add 1 to count, else set to 1
// -For each pattern in patterns:
// -If pattern count > max count, update max count and result pattern
// -Else if pattern count equals max count, update result pattern if curr pattern is lexographically smaller
// -Once done, return result sequence

// Notes:
// -Time complexity: O(m * n ^ 3), where m is number of users and n is length of site list
// -Space complexity: O(n)

console.log(
  mostVisitedPattern(
    [
      "joe",
      "joe",
      "joe",
      "james",
      "james",
      "james",
      "james",
      "mary",
      "mary",
      "mary",
    ],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [
      "home",
      "about",
      "career",
      "home",
      "cart",
      "maps",
      "home",
      "home",
      "about",
      "career",
    ]
  )
);

// 1268. Search Suggestions System

var suggestedProducts = function (products, searchWord) {
  products.sort();

  let result = [];
  let [l, r] = [0, products.length - 1];

  for (let i = 0; i < searchWord.length; i++) {
    let char = searchWord[i];

    while (l <= r && (products[l].length <= i || products[l][i] !== char)) {
      l++;
    }
    while (l <= r && (products[r].length <= i || products[r][i] !== char)) {
      r--;
    }

    let suggestions = [];
    let remaining = Math.min(3, r - l + 1);

    for (let j = 0; j < remaining; j++) {
      suggestions.push(products[l + j]);
    }

    result.push(suggestions);
  }

  return result;
};

// Explanation:
// -Sort products by alphabetical order
// -Intialize empty result array and set left and right pointers to beginning and end of products array
// -For each char in search word:
// -While left pointer <= right pointer and left / right pointer words shorter than input word or left / right pointer char not equal to input char:
// -Increase / decrease left and right pointers
// -Add three suggestions to results starting from left pointer
// -Once done, return result

// Notes:
// -Time complexity: O(n log n + (n * w) + m), where n is length of products array, w is length of longest word, and m is length of input string
// -Space complexity: O(log n) for sorting

console.log(
  suggestedProducts(
    ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
    "mouse"
  )
);

// 12. Integer to Roman

var intToRoman = function (num) {
  let romans = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M",
  ];
  let values = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let merged = romans.map((val, index) => [val, values[index]]).reverse();

  let result = "";

  for (let [sym, val] of merged) {
    let count = Math.floor(num / val);

    if (count) {
      result += sym.repeat(count);
      num %= val;
    }
  }

  return result;
};

// Explanation:
// -Write out all romans and corresponding values in separate arrays, merge, and sort from largest to smallest
// -For each symbol / value pair in map:
// -Get number of symbol by dividing num by val
// -If count not 0:
// -Repeat symbol by count and add to result
// -Then update num to equal remainder of num divided by val and continue
// -Once done return result

// Notes:
// -Time complexity: O(1) given upper limit on how many times loop can iterate
// -Space complexity: O(1)

console.log(intToRoman(375));

// 2104. Sum of Subarray Ranges

var subArrayRanges = function (nums) {
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    let [smaller, larger] = [nums[i], nums[i]];

    for (let j = i + 1; j < nums.length; j++) {
      smaller = Math.min(smaller, nums[j]);
      larger = Math.max(larger, nums[j]);

      sum += larger - smaller;
    }
  }

  return sum;
};

// Explanation:
// -Set total to 0
// -For each num in nums:
// -Set curr num as smallest and largest num
// -For each subsequent num:
// -Update smallest and largest to lesser and greater of smallest or curr num
// -At each iteration, add difference between largest and smallest to total
// -Once done, return total

// Notes:
// -Time complexity: O(n ^ 2), could be brought down to O(n) w/ monotonic stack
// -Space complexity: O(1)

console.log(subArrayRanges([1, 5, 3, 2, 7, 8]));

// 937. Reorder Data in Log Files

var reorderLogFiles = function (logs) {
  let letters = [];
  let digits = [];

  for (let log of logs) {
    let last = log[log.length - 1];

    if (last >= "0" && last <= "9") {
      digits.push(log);
    } else {
      letters.push(log);
    }
  }
  letters.sort((a, b) => {
    let aBody = a.slice(a.indexOf(" ") + 1);
    let bBody = b.slice(b.indexOf(" ") + 1);
    let compare = aBody.localeCompare(bBody);

    if (compare) {
      return compare;
    }

    return a.localeCompare(b);
  });

  return [...letters, ...digits];
};

// Explanation:
// -Push letter logs and digit logs to separate arrays
// -Sort letters based on contents then identifier
// -Once done, return array w/ sorted letter logs and subsequent digit logs

// Notes:
// -Time complexity: O(m * n log n), as we do m operations inside sort
// -Space complexity: O(m * n) to keep the keys for the log

console.log(
  reorderLogFiles([
    "dig1 8 1 5 1",
    "let1 art can",
    "dig2 3 6",
    "let2 own kit dig",
    "let3 art zero",
  ])
);

// 588. Design In-Memory File System

class Node {
  constructor(content) {
    this.content = content;
    this.children = new Map();
    this.isFile = false;
  }
}

class FileSystem {
  constructor() {
    this.root = new Node();
  }
  ls(path) {
    let nodes = path.split("/");
    let curr = this.root;

    if (path === "/") {
      return [...curr.children.keys()].sort();
    }
    for (let i = 1; i < nodes.length; i++) {
      let node = nodes[i];

      if (curr.children.get(node).isFile) {
        return [node];
      }

      curr = curr.children.get(node);
    }

    return [...curr.children.keys()].sort();
  }
  mkdir(path) {
    this.findNode(path);
  }
  addContentToFile(path, content) {
    let node = this.findNode(path);

    node.content = node.content ? node.content + content : content;

    node.isFile = true;
  }
  readContentFromFile(path) {
    let node = this.findNode(path);

    return node.content;
  }
  findNode(path) {
    let nodes = path.split("/");
    let curr = this.root;

    for (let i = 1; i < nodes.length; i++) {
      let node = nodes[i];

      if (!curr.children.has(node)) {
        curr.children.set(node, new Node());
      }

      curr = curr.children.get(node);
    }

    return curr;
  }
}

// Explanation:
// -Initialize node w/ content, children, and isFile set to false
// -Initialize file system class w/ root equal to new node
// -For ls method:
// -Split path on '/' and set curr to root
// -If path is root directory, return sorted children
// -Else, iterate through nodes
// -At each iteration, check if curr node is file path
// -If so, return node
// -Else get node's children from curr children and continue
// -If we iterate through entire path without returning node, we return list of files and directory names in input directory
// -For mkdir method:
// -Use find node method to build path
// -For add content to file method:
// -Use find node method to either find node or build path
// -If node is found, we add input content to its content
// -Else we add content to the new node we just built
// -Finally, we set is file for node to true
// -For read content from file:
// -We use find node method to find node and return its content
// -For find node method:
// -We split path on '/'
// -We set curr to root
// -For each node in nodes:
// -If curr's children does not have node, set new node in children
// -Then get node's children from curr and update curr
// -Once done, return curr

// Notes:
// -Time complexity: O(m + n + k log k) for ls method, O(m + n) for mkdir method, add content method, and read content method. M refers to length of input string, n refers to the depth of the last directory level in the given input, and k refers to the number of entries in the last level directory.
// -Space complexity: O(n) for ls method to hold nodes list, O(n) for mkdir and add content to file, O(1) for read content from file

let system = new FileSystem();
system.mkdir("/a/b/c");
system.addContentToFile("a/b/c/d", "hello");
console.log(system.ls("/"));
console.log(system.readContentFromFile("a/b/c/d"));

// 863. All Nodes Distance K in Binary Tree

var distanceK = function (root, target, k) {
  let result = [];

  if (!root) {
    return result;
  }

  let node = findTarget(root, null, target);

  findKApart(node, k);

  return result;

  function findTarget(node, parent, target) {
    if (!node) {
      return null;
    }

    node.parent = parent;

    if (node === target) {
      return node;
    }

    return (
      findTarget(node.left, node, target) ||
      findTarget(node.right, node, target)
    );
  }
  function findKApart(node, k) {
    if (!node || node.visited) {
      return;
    }
    if (k === 0) {
      result.push(node.val);
      return;
    }

    node.visited = true;

    findKApart(node.left, k - 1);
    findKApart(node.right, k - 1);
    findKApart(node.parent, k - 1);

    return;
  }
};

// Explanation:
// -If root is null, return empty list
// -Recurse through tree to find target node, adding parent to each node along the way
// -Run find k apart from target node to find all nodes k apart from target, pushing each to result array
// -Once done, return result array

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

let tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.left.left = new Node(4);
tree.left.right = new Node(5);
tree.right.left = new Node(6);
tree.right.right = new Node(7);
console.log(distanceK(tree, tree.right.right, 2));

// 348. Design Tic-Tac-Toe

class TicTacToe {
  constructor(n) {
    this.len = n;
    this.rows = new Array(n).fill(0);
    this.cols = new Array(n).fill(0);
    this.diagonal = 0;
    this.antiDiagonal = 0;
  }

  move(row, col, player) {
    let curr = player === 1 ? 1 : -1;

    this.rows[row] += curr;
    this.cols[col] += curr;

    if (row === col) {
      this.diagonal += curr;
    }
    if (col === this.len - row - 1) {
      this.antiDiagonal += curr;
    }
    if (
      Math.abs(this.rows[row]) === this.len ||
      Math.abs(this.cols[col]) === this.len ||
      Math.abs(this.diagonal) === this.len ||
      Math.abs(this.antiDiagonal) === this.len
    ) {
      return player;
    }

    return 0;
  }
}

// Explanation:
// -Initialize tic tac toe class w/ length, rows, cols, and diagonal / antidiagonal properties
// -For each move:
// -Mark player as 1 or -1 based on player input
// -Add / subtract 1 from input row and col
// -If row and col equal, player has marked positive diagonal so we add or subtract by 1
// -If input col equals board size - row - 1, player has marked antidiagonal so we add or subtract by 1
// -If absolute value of row, col, or either diagonal is equal to board size, we return current player as they've won
// -Else we return 0 and continue

// Notes:
// -Time complexity: O(1)
// -Space complexity: O(n)

let tictactoe = new TicTacToe(3);
console.log(tictactoe.move(0, 0, 1));
console.log(tictactoe.move(0, 1, 0));
console.log(tictactoe.move(1, 1, 1));
console.log(tictactoe.move(0, 2, 0));
console.log(tictactoe.move(2, 2, 1));

// 545. Boundary of Binary Tree

var boundaryOfBinaryTree = function (root) {
  let result = [root.val];

  dfsLeft(root.left);
  dfsLeaves(root.left);
  dfsLeaves(root.right);
  dfsRight(root.right);

  return result;

  function dfsLeft(node) {
    if (!node || (!node.left && !node.right)) {
      return;
    }

    result.push(node.val);

    if (node.left) {
      dfsLeft(node.left);
    } else if (node.right) {
      dfsLeft(node.right);
    }
  }
  function dfsLeaves(node) {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      result.push(node.val);
      return;
    }

    dfsLeaves(node.left);
    dfsLeaves(node.right);
  }
  function dfsRight(node) {
    if (!node || (!node.left && !node.right)) {
      return;
    }
    if (node.right) {
      dfsRight(node.right);
    } else if (node.left) {
      dfsRight(node.left);
    }

    result.push(node.val);
  }
};

// Explanation:
// -Add root value to result
// -Perform dfs on left subtree
// -In dfs left:
// -If node is null or node has no children, return
// -Push node val to result
// -If node has left child, dfs on left child
// -Else if node has right child, dfs on right child
// -Perform separate dfs on left and right substrees to find leaves
// -In dfs leaves:
// -If node is null, return
// -If node has no children, add node val to result and return
// -Else run dfs leaves on left then right subtrees
// -Finally, run dfs on right subtree
// -In dfs right:
// -If node is null or node has no children, return
// -If node has right child, dfs on right child
// -Else if node has left child, dfs on left child
// -Once done recursing, push node val to result
// -Once done perform all dfs, return result

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

let tree = new Node(1);
tree.left = new Node(2);
tree.left.left = new Node(3);
tree.left.right = new Node(4);
tree.right = new Node(5);
tree.right.left = new Node(6);
tree.right.right = new Node(7);
console.log(boundaryOfBinaryTree(tree));

// 767. Reorganize String

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }
  swap(start, end) {
    [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
  }
  size() {
    return this.data.length;
  }
  top() {
    return this.data[0] || null;
  }
  add(num) {
    this.data.push(num);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parent = this.parent(index);

    while (this.compare(this.data[index], this.data[parent] || []) < 0) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }
  bubbleDown() {
    let index = 0;
    let size = this.size();

    while (true) {
      let left = null;
      let right = null;
      let swap = null;
      let leftIndex = this.left(index);
      let rightIndex = this.right(index);

      if (leftIndex < size) {
        left = this.data[leftIndex];

        if (this.compare(left, this.data[index]) < 0) {
          swap = leftIndex;
        }
      }
      if (rightIndex < size) {
        right = this.data[rightIndex];

        if (
          (swap !== null && this.compare(right, left) < 0) ||
          (swap === null && this.compare(right, this.data[index]) < 0)
        ) {
          swap = rightIndex;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(index, swap);
      index = swap;
    }
  }
}

var reorganizeString = function (s) {
  let freq = {};
  let heap = new Heap((a, b) => b[1] - a[1]);

  for (let char of s) {
    freq[char] = freq[char] + 1 || 1;
  }
  for (let entry of Object.entries(freq)) {
    heap.add(entry);
  }

  let result = [];

  while (heap.size() > 1) {
    let curr = heap.pop();
    let next = heap.pop();

    result.push(curr[0], next[0]);

    curr[1]--;
    next[1]--;

    if (curr[1] > 0) {
      heap.add(curr);
    }
    if (next[1] > 0) {
      heap.add(next);
    }
  }
  if (heap.size()) {
    let [char, count] = heap.pop();

    if (count > 1) {
      return "";
    }

    result.push(char);
  }

  return result.join("");
};

// Explanation:
// -Initialize max heap sorting by char count
// -Map out frequencies of each char in hashmap
// -Add all char / freq pairs to heap
// -While heap size > 1, pop out first two items
// -Push curr and next chars to result and decrement count for each
// -If counts are > 0, add curr and next back to heap
// -Once done, if heap has one item left:
// -Pop out last item
// -If count > 1, we cannot reorganize so we return empty string
// -Else we push char to result
// -Once done, we return our joined result array

// Notes:
// -Time Complexity: O(n log n)
// -Space Complexity: O(n)

console.log(reorganizeString("aaabbc"));

// 1603. Design Parking System

class ParkingSystem {
  constructor(big, medium, small) {
    this.list = [big, medium, small];
  }
  addCar(type) {
    let index = type - 1;

    if (this.list[index]) {
      this.list[index]--;
      return true;
    }

    return false;
  }
}

// Explanation:
// -Initialize parking system class w/ big, medium, and small vals in array
// -For add car method:
// -Get index by subtracting 1 from type
// -If val at index > 0:
// -Subtract from index and return true
// -Else return false

// Notes:
// -Time complexity: O(1)
// -Space complexity: O(1)

let system = new ParkingSystem(10, 10, 2);
console.log(system.addCar(3));
console.log(system.addCar(3));
console.log(system.addCar(3));

// 412. Fizz Buzz

var fizzBuzz = function (n) {
  let result = [];
  let map = { 3: "Fizz", 5: "Buzz" };

  for (let i = 1; i <= n; i++) {
    let curr = "";

    for (let num in map) {
      if (i % num === 0) {
        curr += map[num];
      }
    }

    curr === "" ? result.push(String(i)) : result.push(curr);
  }

  return result;
};

// Explanation:
// -Initialize empty result array
// -Initialize map w/ 3 and 5 mapping to 'fizz' and 'buzz'
// -For each num through n:
// -Set curr string to empty string
// -If curr num divisible by 3 and/or 5, add val from map to curr string
// -Push num to result if string empty, else push curr string
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(fizzBuzz(27));

// 234. Palindrome Linked List

var isPalindrome = function (head) {
  let frontPointer = head;

  return dfs(head);

  function dfs(node) {
    if (node) {
      if (!dfs(node.next)) {
        return false;
      }
      if (frontPointer.val !== node.val) {
        return false;
      }

      frontPointer = frontPointer.next;
    }

    return true;
  }
};

// Explanation:
// -Set front pointer to head
// -Dfs on head node
// -In dfs, if node not null:
// -If dfs on next node false, return false
// -If front pointer val not equal to curr node val, return false
// -Else set front pointer to front pointer next and return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)
// -Alternative: push vals to array and use two pointers to confirm

function Node(val) {
  return {
    val,
    next: null,
  };
}

let list = new Node(1);
list.next = new Node(2);
list.next.next = new Node(2);
list.next.next.next = new Node(1);
console.log(isPalindrome(list));

// 118. Pascal's Triangle

var generate = function (numRows) {
  let result = [[1]];

  for (let i = 1; i < numRows; i++) {
    let prev = result[result.length - 1];
    let curr = new Array(i + 1).fill(0);

    for (let j = 0; j < curr.length; j++) {
      curr[j] = (prev[j] || 0) + (prev[j - 1] || 0);
    }

    result.push(curr);
  }

  return result;
};

// Explanation:
// -Push array w/ 1 to result
// -For each subsequent row through num rows:
// -Set prev to last element in result and curr to new array of size curr row + 1
// -For each index in curr array:
// -Set curr val to same index in prev or 0 + prev index in prev or 0
// -Once done, push curr to result and continue
// -Once we complete all rows, return result

// Notes:
// -Time complexity: O(n ^ 2), where n is number of rows
// -Space complexity: O(n)

console.log(generate(5));

// 88. Merge Sorted Array

var merge = function (nums1, m, nums2, n) {
  let index = m + n - 1;
  let [p1, p2] = [m - 1, n - 1];

  while (p2 >= 0) {
    nums1[index--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--];
  }

  return nums1;
};

// Explanation:
// -Set insert pointer to length of two arrays - 1
// -Set array pointers to end of each array
// -While second pointer >= 0:
// -Add greater of curr num in first array or second array to curr index
// -Decrease result array pointer and array from where num was added pointer by 1
// -Once done, return first array

// Notes:
// -Time complexity: O(n + m)
// -Space complexity: O(1)

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));

// 344. Reverse String

var reverseString = function (s) {
  let [l, r] = [0, s.length - 1];

  while (l <= r) {
    [s[l++], s[r--]] = [s[r], s[l]];
  }

  return s;
};

// Explanation:
// -Set left and right pointers to beginning and end of array
// -While left <= right pointer:
// -Swap left and right
// -At each iteration, increase left and decrease right pointer by 1

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(reverseString("hello"));

// 283. Move Zeroes

var moveZeroes = function (nums) {
  let pointer = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[pointer], nums[i]] = [nums[i], nums[pointer]];
      pointer++;
    }
  }

  return nums;
};

// Explanation:
// -Set left pointer to 0
// -For each num in nums:
// -If curr num not equal to 0, swap w/ left pointer and increase left pointer by 1
// -Once done, return nums

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(moveZeroes([0, 1, 0, 3, 0, 12]));

// 34. Find First and Last Position of Element in Sorted Array

var searchRange = function (nums, target) {
  let [l, r] = [0, nums.length - 1];

  while (l <= r) {
    let mid = Math.floor((r - l) / 2 + l);

    if (nums[mid] >= target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  if (nums[l] !== target) {
    return [-1, -1];
  }

  let start = l;
  [l, r] = [0, nums.length - 1];

  while (l <= r) {
    let mid = Math.floor((r - l) / 2 + l);

    if (nums[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return [start, r];
};

// Explanation:
// -Perform binary search on nums array
// -For first search, we are trying to find first occurence
// -If mid >= target, we set right pointer to mid - 1
// -Else we set left pointer to mid + 1
// -If num at left pointer not equal to target once we break from search, we return -1, -1 as there's no valid result
// -For second search, we reset pointers
// -At each iteration in search, if left pointer <= target, we set left to mid + 1
// -Else we set right to mid - 1
// -Once done, we return our start pointer and our right pointer

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));

// 162. Find Peak Element

var findPeakElement = function (nums) {
  let [l, r] = [0, nums.length - 1];

  while (l < r) {
    let mid = Math.floor((r - l) / 2 + l);

    if (nums[mid] > nums[mid + 1]) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l;
};

// Explanation:
// -Perform binary search on nums array
// -At each iteration, if mid > mid + 1, set right pointer to mid
// -Else set left pointer to mid + 1
// -Once we break out of loop, return left pointer

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(findPeakElement([1, 2, 1, 3, 2, 1]));

// 179. Largest Number

var largestNumber = function (nums) {
  if (nums === null || nums.length === 0) {
    return "0";
  }

  nums.sort((a, b) => `${b}${a}` - `${a}${b}`);

  if (nums[0] === 0) {
    return "0";
  }

  return nums.join("");
};

// Explanation:
// -If nums is null or empty, return 0
// -Sort nums based on custom comparator comparing merged num2 and num1 and merged num1 and num2
// -If first num is 0, return 0
// -Else return joined sorted nums

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) for sort

console.log(largestNumber([3, 30, 34, 5, 9]));

// 149. Max Points on a Line

var maxPoints = function (points) {
  let max = 0;

  for (let i = 0; i < points.length; i++) {
    let slopeCount = {};

    for (let j = i + 1; j < points.length; j++) {
      let point1 = points[i];
      let point2 = points[j];
      let slope = findSlope(point1, point2);

      slopeCount[slope] = slopeCount[slope] + 1 || 1;
      max = Math.max(max, slopeCount[slope]);
    }
  }

  return max + 1;

  function findSlope(p1, p2) {
    let slope;
    let [x1, y1] = p1;
    let [x2, y2] = p2;

    if (y1 - y2 === 0) {
      slope = 0;
    } else {
      slope = x1 - x2 === 0 ? "undefined" : (x1 - x2) / (y1 - y2);
    }

    return slope;
  }
};

// Explanation:
// -Set max to 0
// -For each point in points:
// -Set slope count to empty object
// -For each subsequent point in points:
// -Get curr point and subsequent point
// -Find slope for point pair
// -In find slope:
// -If points on horizontal line, set slope to 0
// -Else if points on vertical, set slope to undefined, else set slope to difference in x coordinates / difference in y coordinates
// -Return slope to function call
// -Increase slope count by 1 or set to 1 if slope doesn't exist
// -Set max to greater of slope count or max
// -Once done iterating through points, return max + 1

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(n) for slope count

console.log(
  maxPoints([
    [1, 1],
    [3, 2],
    [5, 3],
    [4, 1],
    [2, 3],
    [1, 4],
  ])
);

// 140. Word Break II

const wordBreak = (s, wordDict) => {
  let memo = new Map();

  function backtrack(s) {
    if (memo.has(s)) {
      return memo.get(s);
    }

    let result = [];

    if (!s.length) {
      return result;
    }
    for (let word of wordDict) {
      if (word.startsWith(word)) {
        let next = s.slice(word.length);
        let paths = backtrack(next);

        if (!paths.length && !next.length) {
          result.push(word);
        }

        let mapped = [...paths].map((rest) => word + " " + rest);

        result.push(mapped);
      }
    }

    memo.set(s, result);

    return result;
  }

  return backtrack(s);
};

// 387. First Unique Character in a String

var firstUniqChar = function (s) {
  let map = new Map();

  for (let char of s) {
    map.set(char, map.get(char) + 1 || 1);
  }
  for (let i = 0; i < s.length; i++) {
    let char = s[i];

    if (map.get(char) === 1) {
      return i;
    }
  }

  return -1;
};

// Explanation:
// -Initialize empty hashmap
// -For each char in string:
// -Increase frequency in map
// -For each char in string:
// -If char frequency is 1, return index
// -Else return -1 if we don't return char index

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), as there are max 26 characters in map

console.log(firstUniqChar("leetcode"));

// 122. Best Time to Buy and Sell Stock II

var maxProfit = function (prices) {
  let max = 0;

  for (let i = 1; i < prices.length; i++) {
    max += Math.max(0, prices[i] - prices[i - 1]);
  }

  return max;
};

// Explanation:
// -Set max profit to 0
// -For each price in prices starting at second price:
// -Add greater of 0 or curr price - prev price to max
// -Once done, return max

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(maxProfit([7, 1, 5, 3, 6, 4]));

// 189. Rotate Array

var rotate = function (nums, k) {
  let n = nums.length;
  k %= n;

  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);

  return nums;

  function reverse(l, r) {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }
};

// Explanation:
// -Set n to input nums length
// -Make k rangebound by setting k equal to remainder of k / n
// -First reverse full list
// -Then reverse first k nums
// -Then reverse remaining part of list

// Notes
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(rotate([1, 2, 3, 4, 5, 6], 3));

// 378. Kth Smallest Element in a Sorted Matrix

class Heap {
  constructor(func) {
    this.data = [];
    this.compare = func;
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  left(index) {
    return 2 * index + 1;
  }
  right(index) {
    return 2 * index + 2;
  }
  swap(start, end) {
    [this.data[start], this.data[end]] = [this.data[end], this.data[start]];
  }
  size() {
    return this.data.length;
  }
  top() {
    return this.data[0] || null;
  }
  add(num) {
    this.data.push(num);
    this.bubbleUp();
  }
  pop() {
    let top = this.data[0];
    let end = this.data.pop();

    if (this.size()) {
      this.data[0] = end;
      this.bubbleDown();
    }

    return top;
  }
  bubbleUp() {
    let index = this.size() - 1;
    let parent = this.parent(index);

    while (this.compare(this.data[index], this.data[parent] || []) < 0) {
      this.swap(index, parent);
      index = parent;
      parent = this.parent(index);
    }
  }
  bubbleDown() {
    let index = 0;
    let size = this.size();

    while (true) {
      let left = null;
      let right = null;
      let swap = null;
      let leftIndex = this.left(index);
      let rightIndex = this.right(index);

      if (leftIndex < size) {
        left = this.data[leftIndex];

        if (this.compare(left, this.data[index]) < 0) {
          swap = leftIndex;
        }
      }
      if (rightIndex < size) {
        right = this.data[rightIndex];

        if (
          (swap !== null && this.compare(right, left) < 0) ||
          (swap === null && this.compare(right, this.data[index]) < 0)
        ) {
          swap = rightIndex;
        }
      }
      if (swap === null) {
        break;
      }

      this.swap(index, swap);
      index = swap;
    }
  }
}

var kthSmallest = function (matrix, k) {
  let n = matrix.length;
  let heap = new Heap((a, b) => a[0] - b[0]);

  for (let r = 0; r < Math.min(k, n); r++) {
    heap.add([matrix[r][0], r, 0]);
  }

  let result;

  while (k) {
    let [node, r, c] = heap.pop();
    result = node;

    if (c < n - 1) {
      heap.add([matrix[r][c + 1], r, c + 1]);
    }

    k--;
  }

  return result;
};

// Explanation:
// -Initialize min heap
// -For each row in lesser of matrix size or k:
// -Add first column val w/ coordinates to min heap
// -While k not zero:
// -Pop min item off heap and set result to curr val
// -If col < matrix size - 1, add next col to heap
// -Finally, decrease k by 1 and continue
// -Once done, return result

// Notes:
// -Time complexity: O(x + k log x), where x is min of k or matrix size
// -Space complexity: O(x)

console.log(
  kthSmallest(
    [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ],
    8
  )
);

// 38. Count and Say

var countAndSay = function (n) {
  let str = "1";

  for (let i = 1; i < n; i++) {
    let copy = str;
    let count = 1;

    str = "";

    for (let j = 0; j < copy.length; j++) {
      if (copy[j] !== copy[j + 1]) {
        str += count + copy[j];
        count = 1;
      } else {
        count++;
      }
    }
  }

  return str;
};

// Explanation:
// -Set result string to 1
// -For each num from 1 to n:
// -Copy result string, set count to 1, and set result to empty string
// -For each digit in copy:
// -If curr digit not equal to next digit, add count and curr digit to result string
// -Else increase count
// -Once done, return result string

// Notes:
// -Time complexity: O(n * m), where m is length of result string copy
// -Space complexity: O(n)

console.log(countAndSay(8));

// 26. Remove Duplicates from Sorted Array

var removeDuplicates = function (nums) {
  let n = nums.length;

  let end = 1;

  for (let i = 1; i < n; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[end++] = nums[i];
    }
  }

  return end;
};

// Explanation:
// -If nums length <= 1, return nums length
// -Set end pointer to 1
// -For each num from second num to end of nums:
// -If curr num not equal to prev num:
// -Set num at end pointer to curr num and increase end pointer by 1
// -Once done, return end pointer

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 3, 4, 5]));

// 240. Search a 2D Matrix II

var searchMatrix = function (matrix, target) {
  let [m, n] = [matrix.length, matrix[0].length];

  if (matrix === null || !m || !n) {
    return false;
  }

  let [r, c] = [m - 1, 0];

  while (c < n && r >= 0) {
    if (matrix[r][c] > target) {
      r--;
    } else if (matrix[r][c] < target) {
      c++;
    } else {
      return true;
    }
  }

  return false;
};

// Explanation:
// -If input matrix not valid, return false
// -Set row to last row and col to first col
// -While col < width and row >= 0:
// -If curr node > target, decrease row by 1
// -Else if curr node < target, increase col by 1
// -Else return true
// -If we don't return true and break out of while loop, return false

// Notes:
// -Time complexity: O(m + n), as row and col are decremented/incremented exactly once. Because row can only be decremented m times before while loop breaks and col can only be incremented n times, time complexity is O(m + n).
// -Space complexity: O(1)

console.log(
  searchMatrix(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    21
  )
);

// 166. Fraction to Recurring Decimal

var fractionToDecimal = function (numerator, denominator) {
  if (!numerator) {
    return "0";
  }

  let result = "";

  if (Math.sign(numerator) !== Math.sign(denominator)) {
    result += "-";
  }

  let [num, den] = [Math.abs(numerator), Math.abs(denominator)];

  result += Math.floor(num / den);
  let remainder = num % den;

  if (!remainder) {
    return result;
  }

  result += ".";
  let map = {};

  while (remainder) {
    map[remainder] = result.length;

    remainder *= 10;
    result += Math.floor(remainder / den);
    remainder %= den;

    if (map[remainder]) {
      let idx = map[remainder];

      return `${result.slice(0, idx)}(${result.slice(idx)})`;
    }
  }

  return result;
};

// Explanation:
// -If numerator is 0, return 0
// -Set result to empty string
// -If signs of numerator and denominator aren't equal, add negative sign to result
// -Get absolute value of numerator and denominator
// -Add floor of numerator / denominator to result
// -Set remainder to remainder of numerator / denominator
// -If remainder is 0, return result
// -Else add decimal to result and initialize empty hashmap
// -While remainder not 0:
// -Set remainder in map to result length
// -Multiply remainder times 10 and add floor of remainder divided by denominator to result and update remainder
// -If map has remainder, get start from map and return sliced result from 0 to index plus remaining result in parentheses from start index
// -Else if remainder equals 0 and we break out of while loop, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(fractionToDecimal(4, 333));

// 103. Binary Tree Zigzag Level Order Traversal

var zigzagLevelOrder = function (root) {
  let stack = [[root, 0]];
  let map = {};

  while (stack.length) {
    let [curr, depth] = stack.pop();

    if (curr) {
      if (!map[depth]) {
        map[depth] = [];
      }
      if (depth % 2) {
        map[depth].unshift(curr.val);
      } else {
        map[depth].push(curr.val);
      }

      stack.push([curr.right, depth + 1]);
      stack.push([curr.left, depth + 1]);
    }
  }

  return Object.values(map);
};

// Explanation:
// -Push root and depth of 0 to stack
// -Initialize empty hashmap to store levels
// -While stack length > 0:
// -Pop last item off stack
// -If curr item is valid:
// -Add depth if not in map
// -If depth is even, push curr val to end of depth array
// -Else add curr val to front of depth array
// -Push right and left children to stack and continue
// -Once done, return object values from map

// Notes:
// -Time complexity: O(n ^ 2), can be brought down to O(n) using queues instead of arrays
// -Space complexity: O(n)

function Node(val) {
  return {
    val,
    left: null,
    right: null,
  };
}

let tree = new Node(1);
tree.left = new Node(9);
tree.right = new Node(20);
tree.right.left = new Node(21);
tree.right.right = new Node(25);

console.log(zigzagLevelOrder(tree));

// 29. Divide Two Integers

var divide = function (dividend, divisor) {
  let sign = Math.sign(dividend) === Math.sign(divisor) ? 1 : -1;
  let maxSafe = Math.pow(2, 31) - 1;
  let minSafe = -Math.pow(2, 31);
  let d = Math.abs(dividend);
  let dv = Math.abs(divisor);
  let result = 0;

  while (d >= dv) {
    let temp = dv;
    let multiple = 1;

    while (temp * 2 <= d) {
      temp *= 2;
      multiple *= 2;
    }

    result += multiple;
    d -= temp;
  }
  if (result > maxSafe) {
    return sign === 1 ? maxSafe : minSafe;
  }

  return sign * result;
};

// Explanation:
// -Get return sign and min/max safe integers
// -Get absolute values of dividend and divisor and set result to 0
// -While dividend >= divisor: set temp to divisor and multiple to 1
// -While temp * 2 < dividend:
// -Double temp and multiple
// -Add multiple to result and decrease dividend by temp
// -Once done, check to see if result is greater than max safe
// -If so, return max safe or min safe if result sign is negative
// -Else return result times sign

// Notes:
// -Time complexity: O(log n * log n)
// -Space complexity: O(1)

console.log(divide(-1324, 342));

// 69. Sqrt(x)

var mySqrt = function (x) {
  let [l, r] = [1, x];
  let result = 0;

  while (l <= r) {
    let mid = Math.floor((r - l) / 2 + l);
    let squared = Math.pow(mid, 2);

    if (squared <= x) {
      result = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return result;
};

// Explanation:
// -Set left and right pointers to 1 and x
// -Set result to 0
// -While left <= right:
// -Get mid and mid squared
// -If mid squared <= x, set result to mid and left to mid + 1
// -Else set right to mid - 1
// -Once done, return result

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(mySqrt(9));

// 101. Symmetric Tree

var isSymmetric = function (root) {
  return dfs(root, root);

  function dfs(n1, n2) {
    if (!n1 && !n2) {
      return true;
    }
    if (!n1 || !n2 || n1.val !== n2.val) {
      return false;
    }

    return dfs(n1.left, n2.right) && dfs(n1.right, n2.left);
  }
};

// Explanation:
// -Return dfs on root nodes
// -In dfs:
// -If both input nodes null, return true
// -If either input node is null or node vals aren't equal, return false
// -Return dfs on node 1 left and node 2 right and dfs on node 1 right and node 2 left

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

function Node(val, left = null, right = null) {
  return {
    val,
    left,
    right,
  };
}

let tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(2);
tree.left.left = new Node(3);
tree.right.right = new Node(3);
tree.left.right = new Node(4);
tree.right.left = new Node(4);

console.log(isSymmetric(tree));

// 171. Excel Sheet Column Number

var titleToNumber = function (columnTitle) {
  let result = 0;

  for (let i = 0; i < columnTitle.length; i++) {
    result *= 26;
    result += columnTitle[i].charCodeAt() - "A".charCodeAt() + 1;
  }

  return result;
};

// Explanation:
// -Set result to 0.
// -For each char in string:
// -Multiply result by 26 and add char code index + 1 to result
// -Once done iterating through string, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(titleToNumber("ZYA"));

// 277. Find the Celebrity

var solution = function (knows) {
  return function (n) {
    let celebrity = 0;

    for (let i = 0; i < n; i++) {
      if (knows(celebrity, i)) {
        celebrity = i;
      }
    }
    for (let i = 0; i < n; i++) {
      if ((i !== celebrity && knows(celebrity, i)) || !knows(i, celebrity)) {
        return -1;
      }
    }

    return celebrity;
  };
};

// Explanation:
// -Set celebrity to 0
// -For each node in list from 0 to n:
// -If celebrity knows curr node, set celebrity to curr node
// -For each node in list:
// -If curr node not equal to celebrity and celebrity knows curr node or curr node does not know celebrity, return -1
// -Else if we iterate through entire list without returning -1, return celebrity

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

// 204. Count Primes

var countPrimes = function (n) {
  let isPrime = new Array(n).fill(true);

  isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (!isPrime[i]) {
      continue;
    }
    for (let j = i * i; j < n; j += i) {
      isPrime[j] = false;
    }
  }

  let primes = isPrime.filter((num) => num === true).length - 1;

  return primes < 0 ? 0 : primes;
};

// Explanation:
// -Create isPrime array marking all nums as prime
// -Set 1 to false, as we know 1 is not prime
// -For each num through n where num squared < n:
// -If curr num not prime, continue
// -For each num from curr num squared through n of interval curr num:
// -Mark num as false
// -Once done, all non prime numbers through n will be marked as false
// -We filter for true values and subtract 1 to exclude 0
// -If primes < 0, return 0, else return primes

// Notes:
// -Time complexity: O(sqrt n * log log n). The sqrt n comes from the outer loop. Our inner loop is bounded by O(log log n).
// -Space complexity: O(n)

console.log(countPrimes(100));

// 251. Flatten 2D Vector

class Vector2D {
  constructor(list) {
    this.list = list;
    this.outer = 0;
    this.inner = 0;
  }
  next() {
    let result = null;

    if (this.hasNext()) {
      result = this.list[this.outer][this.inner++];
    }

    return result;
  }
  hasNext() {
    while (
      this.outer < this.list.length &&
      this.inner === this.list[this.outer].length
    ) {
      this.outer++;
      this.inner = 0;
    }

    return this.outer < this.list.length;
  }
}

// Explanation:
// -Initialize list with inner and outer pointers of 0
// -For next method:
// -If iterator has next, return next val and increase inner pointer
// -Else return null
// -For has next:
// -While outer pointer < list length and inner pointer equal to outer pointer length:
// -Increase outer pointer and set inner pointer to 0
// -Once done adjusting pointers, return whether outer pointer < list length

// Notes:
// -Time complexity: O(1) for constructor, O(v / n) for next and has next. If the iterator is completely exhausted, then all calls to has next will have performed (n + v) operations. However, because we perform n has next operations in order to exhaust the iterator, the amortized cost of this operation is O((n + v) / n), which is the same as O(n / n) + O(v / n), which is the same as O(v / n)
// -Space complexity: O(1)

let list = new Vector2D([[1, 2], [3], [4]]);
console.log(list.next());
console.log(list.next());
console.log(list.next());
console.log(list.next());
console.log(list.next());

// 279. Perfect Squares

var numSquares = function (n) {
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
};

// Explanation:
// -Create array of size n + 1 and fill w/ infinity values
// -Set index 0 to 0.
// -For each num i from 1 to n:
// -For each num squared from num 1 to i:
// -Set index i in dp to min of val at index i or val at i - curr num squared + 1
// -Once done, return val at index n in dp

// Notes:
// -Time complexity: O(n * sqrt n)
// -Space complexity: O(n)

console.log(numSquares(39));

// 350. Intersection of Two Arrays II

var intersect = function (nums1, nums2) {
  let [a, b] = [nums1, nums2];

  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  let map = {};

  for (let int of a) {
    map[int] = map[int] + 1 || 1;
  }

  let result = [];

  for (let int of b) {
    if (map[int]) {
      result.push(int);
      map[int]--;
    }
  }

  return result;
};

// Explanation:
// -If nums2 smaller than nums1, swap nums1 and nums2
// -Initialize empty hashmap
// -For each num in nums1:
// -Increase frequency count in map
// -Set result to empty array
// -For each num in b:
// -If num in map has frequency > 0, push num to result and decrease frequency by 1
// -Once done, return result

// Notes:
// -Time complexity: O(m + n)
// -Space complexity: O(min(n, m))

console.log(intersect([1, 2, 2, 4], [9, 4, 2, 2, 1]));

// 160. Intersection of Two Linked Lists

var getIntersectionNode = function (headA, headB) {
  let pA = headA;
  let pB = headB;

  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA;
};

// Explanation:
// -Set pointer A and pointer B to heads of each list
// -While pointer A not equal to pointer B:
// -If pointers are not null, set them to their next value
// -Else set them to the head of the opposite list
// -Once done, return either pointer

// Notes:
// -Time complexity: O(n + m), as each list is traversed twice in the worst case
// -Space complexity: O(1)

function Node(val, next = null) {
  return {
    val,
    next,
  };
}

let l1 = new Node(4);
l1.next = new Node(1);
l1.next.next = new Node(8);
l1.next.next.next = new Node(4);
l1.next.next.next.next = new Node(5);

let l2 = new Node(5);
l2.next = new Node(6);
l2.next.next = new Node(1);
l2.next.next.next = l1.next.next;

console.log(getIntersectionNode(l1, l2));

// 28. Find the Index of the First Occurrence in a String

var strStr = function (haystack, needle) {
  if (needle === "") {
    return 0;
  }

  let [m, n] = [haystack.length, needle.length];

  for (let i = 0; i < m + 1 - n; i++) {
    for (let j = 0; j < n; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
      if (j === n - 1) {
        return i;
      }
    }
  }

  return -1;
};

// Explanation:
// -If needle is empty string, return 0
// -For each char in haystack through haystack length + 1 - needle length:
// -For each index in needle:
// -If chars in haystack and needle not equal, break
// -Else if we've reached end of needle, return index i from haystack
// -If we iterate through haystack without finding start, return -1

// Notes:
// -Time complexity: O(n + m)
// -Space complexity: O(1)

console.log(strStr("leetcode", "code"));

// 108. Convert Sorted Array to Binary Search Tree

var sortedArrayToBST = function (nums) {
  function dfs(l, r) {
    if (l > r) {
      return null;
    }

    let mid = Math.floor((l + r) / 2);
    let root = new TreeNode(nums[mid]);

    root.left = dfs(l, mid - 1);
    root.right = dfs(mid + 1, r);

    return root;
  }

  return dfs(0, nums.length - 1);
};

// Explanation:
// -Perform dfs on entire input array
// -In dfs:
// -If left index > right index, return null
// -Get midpoint index and create root node from val
// -Set root.left to result of dfs on left and midpoint - 1 as bounds and root.right to result of dfs on midpoint + 1 and right bounds
// -Once done, return root

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(log n), as the recursion stack only requires log n space because tree is height-balanced

function TreeNode(val, left = null, right = null) {
  return {
    val,
    left,
    right,
  };
}

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));

// 384. Shuffle an Array

class Solution {
  constructor(nums) {
    this.original = nums.slice();
    this.clone = nums;
  }
  reset() {
    this.clone = this.original;
    this.original = this.original.slice();

    return this.clone;
  }
  shuffle() {
    let n = this.clone.length;

    for (let i = 0; i < n; i++) {
      let rand = Math.floor(Math.random() * n);

      [this.clone[i], this.clone[rand]] = [this.clone[rand], this.clone[i]];
    }

    return this.clone;
  }
}

// Explanation:
// -Initialize original and clone in constructor
// -For reset:
// -Set clone to original and original to copy of original and return clone
// -For shuffle:
// -For each index in clone, swap with random index
// -Once done, return clone

// Notes:
// -Time complexity: O(1) for reset and O(n) for shuffle
// -Space complexity: O(n) for reset and O(1) for shuffle

let list = new Solution([1, 2, 3, 4, 5]);
console.log(list.shuffle());
console.log(list.reset());

// 116. Populating Next Right Pointers in Each Node

var connect = function (root) {
  let q = [root];

  while (q.length) {
    let size = q.length;

    for (let i = 0; i < size; i++) {
      let curr = q.shift();

      if (curr) {
        curr.next = i < size - 1 ? q[0] : null;

        if (curr.left) {
          q.push(curr.left);
        }
        if (curr.right) {
          q.push(curr.right);
        }
      }
    }
  }

  return root;
};

// Explanation:
// -Add root to queue
// -While queue has work:
// -Get queue size
// -For each node in queue size:
// -Get curr by popping front off queue
// -If node not last in group size, set next to front of queue
// -Else set to null
// -If left child not null, push to queue
// -If right child not null, push to queue
// -Once done, return root

// Notes:
// -Time complexity: O(n ^ 2), can be brought down using actual queue data structure
// -Space complexity: O(n) for queue

function Node(val, left = null, right = null) {
  return {
    val,
    left,
    right,
  };
}

let tree = new Node(1);
tree.left = new Node(2);
tree.right = new Node(3);
tree.left.left = new Node(4);
tree.left.right = new Node(5);
tree.right.left = new Node(6);
tree.right.right = new Node(7);

console.log(connect(tree));

// 237. Delete Node in a Linked List

var deleteNode = function (node) {
  [node.val, node.next] = [node.next.val, node.next.next];
};

// Explanation:
// -Set curr node val to next node val and curr node next to next node's next pointer

// Notes:
// -Time complexity: O(1)
// -Space complexity: O(1)

function Node(val, next = null) {
  return {
    val,
    next,
  };
}

let list = new Node(1);
list.next = new Node(2);
list.next.next = new Node(3);
list.next.next.next = new Node(4);
list.next.next.next.next = new Node(5);

deleteNode(list.next.next);

console.log(list);

// 285. Inorder Successor in BST

var inorderSuccessor = function (root, p) {
  let curr = root;
  let successor = null;

  while (curr) {
    if (p.val >= curr.val) {
      curr = curr.right;
    } else {
      successor = curr;
      curr = curr.left;
    }
  }

  return successor;
};

// Explanation:
// -Set curr to root node and successor to null
// -While curr not null:
// -If p val >= curr val, set curr to right child
// -Else set successor to curr and curr to left child
// -Once done, return successor

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

function TreeNode(val, left = null, right = null) {
  return {
    val,
    left,
    right,
  };
}

let tree = new TreeNode(1);
tree.left = new TreeNode(4);
tree.right = new TreeNode(5);
tree.left.left = new TreeNode(3);
tree.right.right = new TreeNode(6);

console.log(inorderSuccessor(tree, tree.left));

// 94. Binary Tree Inorder Traversal

var inorderTraversal = function (root) {
  let stack = [];
  let curr = root;
  let result = [];

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }

  return result;
};

// Explanation:
// -Initialize stack and set curr node to root node
// -Initialize result as empty array
// -While curr not null or stack has work:
// -While curr not null, push curr to stack and set curr to left child
// -Once we go all the way left, pop last node of stack and push node val to result
// -Then set curr to right child and continue
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

function TreeNode(val, left = null, right = null) {
  return {
    val,
    left,
    right,
  };
}

let tree = new TreeNode(4);
tree.left = new TreeNode(2);
tree.left.right = new TreeNode(3);
tree.right = new TreeNode(7);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(8);

console.log(inorderTraversal(tree));

// 326. Power of Three

var isPowerOfThree = function (n) {
  if (n < 1) {
    return false;
  }
  while (n % 3 === 0) {
    n /= 3;
  }

  return n === 1;
};

// Explanation:
// -If n < 1, return false
// -While n is divisible by 3:
// -Divide n by 3 and continue
// -Once n is no longer divisible by 3, return true if n equals 1, else return false

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(isPowerOfThree(27));

// 340. Longest Substring with At Most K Distinct Characters

var lengthOfLongestSubstringKDistinct = function (s, k) {
  let [l, r] = [0, 0];
  let distinct = 0;
  let longest = 0;
  let map = {};

  while (r < s.length) {
    let right = s[r];

    if (!map[right]) {
      distinct++;
      map[right] = 1;
    } else {
      map[right]++;
    }
    while (distinct === k + 1) {
      let left = s[l];
      map[left]--;

      if (map[left] === 0) {
        distinct--;
      }

      l++;
    }

    longest = Math.max(longest, r - l + 1);
    r++;
  }

  return longest;
};

// Explanation:
// -Set left and right pointers to 0
// -Set distinct count and longest count to 0
// -Initialize hashmap to store character frequencies
// -While right pointer < string length:
// -Get right char
// -If map doesn't have right char, increase distinct count by 1 and set char count in map to 1
// -Else add 1 to char count in map
// -While distinct equals k + 1:
// -Get left char and decrease count in map by 1
// -If char count equals 0, decrease distinct by 1
// -Then increase left pointer by 1 and continue
// -Once done, get longest by taking max of curr window or longest and increase right pointer by 1
// -Finally, once we iterate through entire string, return longest

// Notes:
// -Time complexity: O(n * k), where n is length of string and k is amount of distinct characters. In the worst case, the input string contains n distinct characters, in which case we'll use O(k) time at each step to find a min value in the hashmap w/ k elements.
// -Space complexity: O(k)

console.log(lengthOfLongestSubstringKDistinct("ecebda", 2));

// 395. Longest Substring with At Least K Repeating Characters

var longestSubstring = function (s, k) {
  if (k === 1) {
    return s.length;
  }

  let maxUnique = new Set(s).size;
  let maxLen = 0;

  for (let i = 1; i <= maxUnique; i++) {
    let freq = {};
    let [start, end, unique, kCount] = [0, 0, 0, 0];

    while (end < s.length) {
      if (unique <= i) {
        let currEnd = s[end];

        if (!freq[currEnd]) {
          unique++;
        }

        freq[currEnd] = freq[currEnd] + 1 || 1;

        if (freq[currEnd] === k) {
          kCount++;
        }

        end++;
      } else {
        let currStart = s[start];

        if (freq[currStart] === k) {
          kCount--;
        }

        freq[currStart]--;

        if (freq[currStart] === 0) {
          unique--;
        }

        start++;
      }
      if (unique === i && unique === kCount) {
        maxLen = Math.max(maxLen, end - start);
      }
    }
  }

  return maxLen;
};

// Explanation:
// -Find the number of unique chars in string and store in max unique
// -For each number of unique chars from 1 to max unique:
// -Initialize hashmap to store char frequencies
// -Set start and end pointers of sliding window to beginning of string
// -Set unique char count to 0 and k count to 0
// -While end < string:
// -Shrink or expand window to ensure number of unique chars not greater than curr unique
// -If number of unique chars in sliding window <= curr unique, expand the window to the right
// -Else, shrink the window from the left
// -Keep track of the number of unique chars in the curr window having at least k frequency and update result if all chars in window have at least k frequency
// -Once done, return result

// Notes:
// -Time complexity: O(max unique * n) or O(n), where n is input string length and max unique is capped at 26 characters
// -Space complexity: O(1)

console.log(longestSubstring("aaabb", 3));

// 148. Sort List

var sortList = function (head) {
  function merge(l1, l2) {
    let dummy = new ListNode();
    let curr = dummy;

    while (l1 && l2) {
      curr.next = l1.val < l2.val ? l1 : l2;
      curr = curr.next;

      if (l1.val < l2.val) {
        l1 = l1.next;
      } else {
        l2 = l2.next;
      }
    }

    curr.next = l1 ? l1 : l2;

    return dummy.next;
  }
  if (!head || !head.next) {
    return head;
  }

  let [fast, slow] = [head, head];

  while (fast.next && fast.next.next) {
    [fast, slow] = [fast.next.next, slow.next];
  }

  let middle = slow.next;
  slow.next = null;

  return merge(sortList(head), sortList(middle));
};

// Explanation:
// -Recursively split the list in two halves until there is only one node in list
// -To split the list in two halves, we use the fast and slow pointer approach to find middle
// -Recursively sort each sublist and combine it into a single list
// -Continue until we have a single sorted list

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(log n) on the recursion stack

function ListNode(val, next = null) {
  return {
    val,
    next,
  };
}

let list = new ListNode(4);
list.next = new ListNode(1);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(7);
list.next.next.next.next = new ListNode(5);

console.log(sortList(list));

// 163. Missing Ranges

var findMissingRanges = function (nums, lower, upper) {
  let result = [];
  let prev = lower - 1;

  for (let i = 0; i <= nums.length; i++) {
    let curr = i < nums.length ? nums[i] : upper + 1;

    if (prev + 1 <= curr - 1) {
      let formatted =
        prev + 1 === curr - 1 ? String(prev + 1) : `${prev + 1}->${curr - 1}`;

      result.push(formatted);
    }

    prev = curr;
  }

  return result;
};

// Explanation:
// -Set result to empty array and prev to lower - 1
// -For each num in nums:
// -Set curr to num at curr index if index within nums, else set to upper + 1
// -If prev + 1 <= curr - 1, push formatted range to result
// -Then set prev to curr and continue
// -Once done, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1), as we don't count output array as extra space

console.log(findMissingRanges([0, 1, 3, 50, 75], 0, 99));

// 328. Odd Even Linked List

var oddEvenList = function (head) {
  if (!head) {
    return head;
  }

  let [odd, even] = [head, head.next];
  let evenHead = even;

  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;

  return head;
};

// Explanation:
// -If input head is null, return null
// -Set odd to head and even to head's next node
// -Set even head to even
// -While even not null and even's next node not null:
// -Set odd's next pointer to even's next pointer and advance odd
// -Set even's next pointer to odd's next pointer and advance even
// -Once done iterating through list, set odd's next pointer to even head and return head

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

function ListNode(val, next = null) {
  return {
    val,
    next,
  };
}

let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

console.log(oddEvenList(list));

// 454. 4Sum II

var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let map = {};
  let count = 0;

  for (let n1 of nums1) {
    for (let n2 of nums2) {
      let sum = n1 + n2;

      map[sum] = map[sum] + 1 || 1;
    }
  }
  for (let n1 of nums3) {
    for (let n2 of nums4) {
      let sum = -(n1 + n2);

      count += map[sum] || 0;
    }
  }

  return count;
};

// Explanation:
// -Initialize empty map and set count to 0
// -Get sum of all pairs in first two lists and count frequencies of those sums in map
// -Get inverse sum of all pairs in second two lists and if sum exists in map, add frequency to our count
// -Once done, return count

// Notes:
// -Time complexity: O(n ^ 2)
// -Space complexity: O(n ^ 2)

console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));

// 334. Increasing Triplet Subsequence

var increasingTriplet = function (nums) {
  let firstNum = Infinity;
  let secondNum = Infinity;

  for (let n of nums) {
    if (n <= firstNum) {
      firstNum = n;
    } else if (n <= secondNum) {
      secondNum = n;
    } else {
      return true;
    }
  }

  return false;
};

// Explanation:
// -Set first and second num to Infinity
// -For each num in input nums:
// -If curr num <= first num, set first num to curr num
// -Else if curr num > first num and <= second num, set second num to curr num
// -Else if we find a num that's greater than both our first and second num, we return true
// -If we iterate through entire list without returning true, we return false

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(increasingTriplet([5, 1, 4, 0, 2, 6]));

// 172. Factorial Trailing Zeroes

var trailingZeroes = function (n) {
  let zeroes = 0;

  while (n > 0) {
    n = Math.floor(n / 5);
    zeroes += n;
  }

  return zeroes;
};

// Explanation:
// -Set zero count to 0
// -While n > 0:
// -Set n to floor of n / 5
// -Increase zero count by n
// -Once done, return zero count

// Notes:
// -Time complexity: O(log n)
// -Space complexity: O(1)

console.log(trailingZeroes(1045));
