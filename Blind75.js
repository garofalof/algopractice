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

  s = s.split("").sort();
  t = t.split("").sort();

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) {
      return false;
    }
  }

  return true;
};

// Explanation:
// -If s and t are not same length, return false
// -Sort s and t
// -For each char in s:
// -If char at index i is not same for s and t, return false
// -If done iterating, return true as we have valid anagram

// Notes:
// -Time complexity: O(n log n), as sorting costs O(n log n) and comparing two strings costs O(n)
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
// -Time complexity: O(n ^ ((t /m) + 1)), where n is number of nodes, t is target value, and m is the min value amongst candidates. Fan out of each node is bounded by n, the total number of nodes. The maximum depth would be t / m, where we keep on adding the smallest element to the combination. Finally, the maximum number of nodes in a N-ary tree of t / m height would be N ^ ((t / m) + 1).
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
    this.root[key][time] = value;
  }
  get(key, time) {
    if (!this.root[key]) {
      return "";
    }
    if (this.root[key][time]) {
      return this.root[key][time];
    }
    while (!this.root[key][time] && time-- > 0) {
      if (this.root[key][time]) {
        return this.root[key][time];
      }
    }
    return "";
  }
}

// Explanation:
// -Initialize root as empty object
// -For set method:
// -If root doesn't have key, set key to empty array
// -Set value at time index in array
// -For get method:
// -If root doesn't have key, return empty string
// -If root has key and time, return corresponding value
// -Else decrease time until timestamp found and return that time's value
// -Else if we reach 0 time, return empty string

// Notes:
// -Time complexity: O(1) for insertion and O(n) for get
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
  if (wordDict.length === 0 || wordDict === null) {
    return false;
  }

  let words = new Set(wordDict);
  let visited = new Set();
  let queue = [0];

  while (queue.length) {
    let start = queue.shift();

    if (!visited.has(start)) {
      for (let end = start + 1; end <= s.length; end++) {
        let curr = s.substring(start, end);

        if (words.has(curr)) {
          if (end === s.length) {
            return true;
          }
          queue.push(end);
        }
      }
      visited.add(start);
    }
  }

  return false;
};

// Explanation:
// -If dictionary is not valid or empty, return false
// -Create set from dictionary
// -Create new set to track visited characters
// -Put first index in queue
// -While queue has work:
// -Remove first index from queue
// -If index not visited:
// -For each character after curr index:
// -If substring in dictionary:
// -Return true if we've reached end of string
// -Else add substring end index to queue
// -Once done iterating through string, mark curr index as visited
// -If we iterate through string without returning true, return false

// Notes:
// -Time complexity: O(n^3), as for every starting index the search can continue until the end of the string
// -Space complexity: O(n) space for the queue

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
