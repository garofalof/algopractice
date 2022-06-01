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

var solution = function(isBadVersion) {
  return function(n) {
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
}

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

var canConstruct = function(ransomNote, magazine) {
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

console.log(canConstruct('aa', 'aab'));

// 70. Climbing Stairs

var climbStairs = function(n) {
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
}

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

var longestPalindrome = function(str) {
  let result = 0;
  let map = {};

  for (let char of str) {
    map[char] = map[char] ? map[char] + 1 : 1;
    if (map[char] % 2 === 0) {
      result += 2;
    }
  }

  return str.length > result ? result + 1 : result;
}

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

console.log(longestPalindrome('abccccdd'));