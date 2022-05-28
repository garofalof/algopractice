// 1. Two Sum

var twoSum = function(nums, target) {
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

var isValid = function(s) {
  let stack = [];
  let map = {
      '(': ')',
      '{': '}',
      '[': ']'
  };

  for (let i = 0; i < s.length; i++) {
      let curr = s[i];
      let last = stack.length - 1;
      if (curr === '(') {
          stack.push(map[curr]);
      } else if (curr === '{') {
          stack.push(map[curr]);
      } else if (curr === '[') {
          stack.push(map[curr]);
      } else if (!stack.length || curr !== stack.pop()) {
          return false;
      }
  }

  return stack.length === 0;
};

console.log(isValid('{[]}'));

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
}

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

let list1 = {val: 1, next: {val: 3, next: {val: 5, next: null}}};
let list2 = {val: 2, next: {val: 4, next: {val: 6, next: null}}};
console.log(mergeTwoLists(list1, list2));

// 121. Best Time to Buy and Sell Stock

var maxProfit = function(prices) {
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

console.log(maxProfit([7,1,5,3,6,4]));

// 125. Valid Palindrome

var isPalindrome = function(s) {
  let str = s.toLowerCase().replace(/[^a-z0-9]/gi, '');

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

console.log(isPalindrome('A man, a plan, a canal: Panama'));

// Given the root of a binary tree, invert the tree, and return its root

var invertTree = function(root) {
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
    val: (val === undefined ? 0 : val),
    left: (left === undefined ? null : left),
    right: (right === undefined ? null : right)
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

// Given two strings s and t, return true if t is an anagram of s, and false otherwise

var isAnagram = function(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  s = s.split('').sort();
  t = t.split('').sort();

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) {
      return false;
    }
  }

  return true;
}

// Explanation:
// -If s and t are not same length, return false
// -Sort s and t
// -For each char in s:
// -If char at index i is not same for s and t, return false
// -If done iterating, return true as we have valid anagram

// Notes:
// -Time complexity: O(n log n), as sorting costs O(n log n) and comparing two strings costs O(n)
// -Space complexity: O(1)

console.log(isAnagram('anagram', 'nagaram'));

// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

var search = function(nums, target) {
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

// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

// You are also given three integers sr, sc, and newColor. You should perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with newColor.

// Return the modified image after performing the flood fill.

var floodFill = function(image, sr, sc, newColor, firstColor = image[sr][sc]) {
  if (sr < 0 || sc < 0 || sr >= image.length || sc >= image[sr].length || image[sr][sc] !== firstColor || image[sr][sc] === newColor) {
    return image;
  }

  image[sr][sc] = newColor;

  floodFill(image, sr + 1, sc, newColor, firstColor);
  floodFill(image, sr - 1, sc, newColor, firstColor);
  floodFill(image, sr, sc + 1, newColor, firstColor);
  floodFill(image, sr, sc - 1, newColor, firstColor);

  return image;
}

// Explanation:
// -Base case: if sr or sc are out of bounds or if current node is not equal to original color or current node is already new color, return image
// -Set current node to new color
// -Recurse on all 4-directional nodes
// -Once done recursing, return image

// Notes:
// -Time complexity: O(n), where n is the number of pixels in the image
// -Space complexity: O(n), which is the size of the implicit call stack when recursing

console.log(floodFill([[0,0,0],[0,0,0]], 1, 0, 2));

// Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

var maxSubArray = function(nums) {
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

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));