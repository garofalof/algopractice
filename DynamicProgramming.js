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