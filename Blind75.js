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
    console.log(curr);
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
// -If node out of bounds or equal to 0, continue
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
t.insert('hello');
t.insert('hell');
t.insert('hellen');
console.log(t.search('hel'));
console.log(t.search('hello'));
console.log(t.startsWith('hel'));

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
}

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

var productExceptSelf = function(nums) {
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

var isValidBST = function(root) {
  if (root === null) {
      return true;
  }

  let stack = [[root, -Infinity, Infinity]];

  while (stack.length) {
      let [curr, low, high] = stack.pop();

      if (curr) {
          let val = curr.val;

          if (val <= low || val >= high) {
              console.log('val is not valid ', val);
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
    right: null
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

var numIslands = function(grid) {
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
          let node = grid[row][col];

          if (node === '1') {
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
          grid[row][col] === '0'
      ) {
          return;
      }

      grid[row][col] = '0';
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

console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]));