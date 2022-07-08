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
// -Space complexity: O(1), as no extra space is required

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
      backtrack([...path, nums[i]], i + 1);
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

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    let value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    this.cache.delete(key);
    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      let first = this.cache.keys().next().value;
      this.cache.delete(first);
    }
  }
}

// Explanation:
// -Set capacity to input capacity and set cache equal to empty map
// -For get method:
// -If cache doesn't have key, return -1
// -Else get curr key value and set to temp value
// -Delete key from cache
// -Set key value in cache
// -Return value
// -For put method:
// -Delete key from cache
// -Set key value in cache
// -If cache size exceeds capacity, remove first key from cache

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
// -Time complexity: O(2 ^ n) in the worst case to exhaust all possible combinations in array
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
      parent = this.parent(parent);
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
          (swap === null && this.compare(right, this.data[index]))
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
