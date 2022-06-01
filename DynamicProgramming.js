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