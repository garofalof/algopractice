// Given a list of stock prices for a company, find the maximum amount of money you could have made with one trade.
// For example, if A = [2,3,1,4,5,7,5,4], the max money with a single trade is 6, if you buy at 1 and sell at 7.

function maxDiff(prices) {
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    let curr = prices[i];
    min = Math.min(min, curr);
    max = Math.max(max, curr - min);
  }
  return max;
}

// Explanation:
// -Set min to infinity and max profit to 0
// -For each price in prices:
// -Set min to lesser of min or curr
// -Set max to greater of max or curr - min
// -Once done iterating, return max

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(maxDiff([2,3,1,4,5,7,5,4]));

// Given a list of stock prices for a company, find the maximum amount of money you can make with two trades. A trade is a buy and sell. The two trades cannot overlap.

function twoTrades(prices) {
  let profit = [];
  let maxPrice = -Infinity;

  for (let i = prices.length - 1; i >= 0; i--) {
    let curr = prices[i];
    maxPrice = Math.max(maxPrice, curr);
    if (profit[i + 1]) {
      profit[i] = Math.max(profit[i + 1], maxPrice - curr);
    } else {
      profit[i] = maxPrice - curr;
    }
  }

  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    let curr = prices[i];
    minPrice = Math.min(minPrice, curr);
    profit[i] = Math.max(profit[i - 1], profit[i] + curr - minPrice);
  }

  return profit[profit.length - 1];
}

// Explanation:
// -Create buffer array where we store profit
// -Set max price to negative infinity
// -For each price in prices right to left:
// -Set max profit at each index as max of last max profit or diff between max price and curr price
// -Once done iterating, set min price to first price in prices
// -For each price starting at index 1:
// -Set max profit at each index as max of prev max profit or curr max profit plus curr diff
// -Once done updating profit buffer array, return last element in array

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(twoTrades([1, 3, 2, 7, 4, 6]));