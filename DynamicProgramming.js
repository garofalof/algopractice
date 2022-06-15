// Given a number N, find the Nth Fibonacci number

function fibonacci(n) {
  if (n < 1) {
    return -1;
  }
  let nMinus1 = 1;
  let nMinus2 = 1;
  let result = 1;
  for (let i = 3; i <= n; i++) {
    result = nMinus1 + nMinus2;
    nMinus2 = nMinus1;
    nMinus1 = result;
  }
  return result;
}

// Explanation:
// -If n < 1, return -1
// -Set n minus 1 and n minus 2 to 1
// -Set result to 1
// -For each element 3 through n:
// -Set result to sum of previous two nums
// -Update n minus 2 and n minus 1
// -Once done iterating, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)
// -Approach: Tabulation

console.log(fibonacci(10));

// Let’s say you have to climb N steps. You can jump 1 step, 3 steps or 5 steps at a time. How many ways are there to get to the top of the steps?

function waysToClimb(n) {
  let buffer = [];
  buffer[0] = 1;
  for (let i = 1; i <= n; i++) {
    buffer.push(0);
  }
  for (let i = 0; i < n; i++) {
    if (i + 1 <= n) {
      buffer[i + 1] += buffer[i];
    }
    if (i + 3 <= n) {
      buffer[i + 3] += buffer[i];
    }
    if (i + 5 <= n) {
      buffer[i + 5] += buffer[i];
    }
  }
  return buffer[n];
}

// Explanation:
// -Create buffer array and set index 0 to 1
// -Fill remaining indices 1 through n with 0
// -For each index in buffer:
// -If valid step path exists, add curr steps to valid step paths
// -Once done iterating through buffer, return total count at index n

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(waysToClimb(8));

// Given an array of integers, find the length of the longest increasing subsequence.
// For example, in [1, 3, 2, 5, 3, 5, 6], the longest increasing subsequence is [1, 2, 3, 5, 6] of length 5.

function longestIncreasingSubsequence(arr) {
  let longest = new Array(arr.length).fill(1);
  let result = 1;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        longest[i] = Math.max(longest[i], longest[j] + 1);
      }
    }
    result = Math.max(result, longest[i]);
  }

  return result;
}

// Explanation:
// -Create buffer array of equal to length of input array with each index filled with 1, as each index is subsequence of length 1
// -For each element in input array:
// -For each previous element in input array up to curr element:
// -Check to see if prev element less than curr element. If so, possible subsequence exists. Update buffer array with max of length at curr index in buffer array or length of prev index + 1 in buffer array
// -Once done iterating through prev elements, we update result to max of result or curr length in buffer array
// -Once done iterating through input array, return result

// Notes:
// -Time complexity: O(n^2)
// -Space complexity: O(n)

console.log(longestIncreasingSubsequence([1, 3, 2, 5, 3, 5, 6]));

// Given a set of coin denominations, print out the number of ways you can make a target amount. You can use as many coins of each denomination as you like.
// For example: If coins are [1,2,5] and the target is 5, the output will be 4.

function coinChange(amount, coins) {
  let buffer = new Array(amount + 1).fill(0);
  buffer[0] = 1;
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      buffer[i] += buffer[i - coin];
    }
  }
  return buffer[amount];
}

// Explanation:
// -Fill buffer array of length amount + 1 with zeros
// -We have one way of making change for 0, so we set buffer[0] to 1
// -For each coin in coins:
// -For each index in buffer starting from coin to amount:
// -Increase val at buffer index by val at buffer index - coin
// -Once done iterating, return last val in buffer array

// Notes:
// Time complexity: O(amount * coins)
// Space complexity: O(amount)

console.log(coinChange(5, [1, 2, 5]));

// Check if a string is a rotation of another

function stringRotation(str1, str2) {
  return (str1 + str1).includes(str2);
}

// Explanation:
// -Double string 1 and check to see if it includes string 2

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(stringRotation("canada", "dacana"));

// Reverse the words in a sentence

function reverseWords(str) {
  str = str.split("");
  function reverseChars(str, start, end) {
    while (start < end) {
      [str[start], str[end]] = [str[end], str[start]];
      start++;
      end--;
    }
  }

  reverseChars(str, 0, str.length - 1);

  let startIdx = 0;

  for (let i = 0; i < str.length; i++) {
    let curr = str[i];
    if (curr === " ") {
      reverseChars(str, startIdx, i - 1);
      startIdx = i + 1;
    }
    if (i === str.length - 1) {
      reverseChars(str, startIdx, i);
    }
  }

  return str;
}

// Explanation:
// -Swap all chars in string
// -Set start index to 0
// -For each char in string:
// -If we encounter space, swap all chars up to that index
// -If i equals end of string, swap all chars up to end
// -Once done swapping, return string

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(reverseWords("hello there my old friend"));

// Find the longest palindrome in a string

function findLongestPalindrome(str) {
  let start = 0;
  let end = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j of [i, i + 1]) {
      let l = i;
      let r = j;
      while (str[l] && str[l] === str[r]) {
        let palLen = r - l + 1;
        let currLen = end - start + 1;
        if (palLen > currLen) {
          [start, end] = [l, r];
        }
        l--;
        r++;
      }
    }
  }
  return str.substring(start, end + 1);
}

// Explanation:
// -Set start and end to 0
// -For each char in string:
// -For each index and index + 1
// -Expand around center as long as we have valid palindrome
// -At each iteration, check to see if curr palindrome length > curr longest length. If so, update start and end pointers
// -Once done iterating, return longest palindrome

// Notes:
// -Time complexity: O(n^2)
// -Space complexity: O(1)

console.log(findLongestPalindrome("babacd"));

// Rotate an array A by X items.
// For example, if A = [1,2,3,4,5,6] and X = 2, Result = [5,6,1,2,3,4]

function rotateArray(arr, x) {
  function reverse(arr, start, end) {
    let left = start;
    let right = end;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  x = x % arr.length;

  reverse(arr, 0, arr.length - 1);
  reverse(arr, 0, x - 1);
  reverse(arr, x, arr.length - 1);

  return arr;
}

// Explanation:
// -Set x to remainder of x divided by array length. This accounts for x > array length.
// -Swap all elements in array
// -Swap all elements 0 through x - 1
// -Swap all elements x through end of array

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(rotateArray([1, 2, 3, 4, 5, 6], 2));

// You are given a number in the form of an array. Each digit in the array represents a digit in the number.
// For example, 100 -> [1,0,0]. Perform addition of 2 such number arrays.

function addDigits(num1, num2) {
  function resizeWithZeroes(arr, size) {
    let result = new Array(size).fill(0);
    let arrIndex = arr.length - 1;
    let resultIndex = result.length - 1;

    while (arrIndex >= 0) {
      result[resultIndex] = arr[arrIndex];
      resultIndex--;
      arrIndex--;
    }

    return result;
  }

  function trimZeroes(arr) {
    while (arr[0] === 0) {
      arr = arr.slice(1);
    }
    return arr;
  }

  let larger = num1.length > num2.length ? num1 : num2;
  let smaller = larger === num1 ? num2 : num1;
  smaller = resizeWithZeroes(smaller, larger.length);
  let result = new Array(larger.length + 1).fill(0);
  let carry = 0;

  for (let i = larger.length - 1; i >= 0; i--) {
    let sum = larger[i] + smaller[i] + carry;
    carry = Math.floor(sum / 10);
    result[i + 1] = sum % 10;
  }

  result[0] = carry;

  return trimZeroes(result);
}

// Explanation:
// -Set larger to longest of num1 or num2
// -Set smaller to remaining num
// -Resize smaller to include leading zeroes
// -Create result array of size larger length + 1. At most, our sum will be 1 digit larger than our largest num.
// -Set carry to 0
// -For each num in larger from back to front:
// -Set sum to curr index sum or larger and smaller plus carry
// -Update carry to floor of sum / 10
// -Update result at result index + 1 to remainder of sum / 10
// -Once done adding, set result[0] to carry
// -Return trimmed result

// Notes:
// -Time complexity: O(n), where n is the length of the larger array
// -Space complexity: O(n), because we allocate an array to store the result

console.log(addDigits([1, 2, 3], [3, 2]));

// You are given a number in the form of an array. Each digit in the array represents a digit in the number. For example, 100 -> [1,0,0]. Perform multiplication of 2 such number arrays.

function multiplyDigits(num1, num2) {
  let result = [0];
  let zeroCount = 0;

  for (let i = num1.length - 1; i >= 0; i--) {
    let product = new Array(1 + num2.length + zeroCount).fill(0);
    let carry = 0;

    for (let j = num2.length - 1; j >= 0; j--) {
      let p = num1[i] * num2[j] + carry;
      carry = Math.floor(p / 10);
      product[j + 1] = p % 10;
    }

    product[0] = carry;
    result = addDigits(result, product);
    zeroCount++;
  }

  return result;
}

// Explanation:
// -Initialize result array with one element 0
// -Set zero count to 0
// -For each num in num1, back to front:
// -Set new product array to size of num2 length + 1 + zeroCount. Product can be at most 1 digit larger than num2, and we'll need to increase zeroes as we iterate through num1.
// -Set carry to 0
// -For each num in num2, back to front:
// -Set temp variable p to product of curr num1 and curr num2 + carry
// -Set carry to floor of p / 10
// -Set product[j + 1] to remainder of p / 10
// -Once done multiplying curr with each num in num2, update product[0] to carry and add product to result
// -Once result updated, increase zeroCount by 1
// -Once done multiplying all nums in num1 with all nums in num2, return result

// Notes:
// -Time complexity: O(n * m), where n and m are the lengths of our integers
// -Space complexity: O(n + m), because the result array takes n + m space

console.log(multiplyDigits([2, 6], [1, 4]));
