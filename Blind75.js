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