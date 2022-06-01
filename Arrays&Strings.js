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

console.log(maxDiff([2, 3, 1, 4, 5, 7, 5, 4]));

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

// Rotate a 2D array clockwise by 90 degrees, like rotating the pixels of an image

function rotateArray(arr) {
  transpose(arr);
  reverseColumns(arr);

  function transpose(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j < arr[0].length; j++) {
        [arr[j][i], arr[i][j]] = [arr[i][j], arr[j][i]];
      }
    }
  }

  function reverseColumns(arr) {
    for (let i = 0; i < arr[0].length; i++) {
      for (let j = 0, k = arr[0].length - 1; j < k; j++, k--) {
        [arr[j][i], arr[k][i]] = [arr[k][i], arr[j][i]];
      }
    }
  }

  return arr;
}

// Explanation:
// -Transpose array by putting elements in same column into same row
// -Reverse columns in transposed array
// -Once done, return rotated array

// Notes:
// -Time complexity: O(rows * columns)
// -Space complexity: O(1)

console.log(
  rotateArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

// Print a 2D array in diagonal zig zag order

function printZigZag(arr) {
  let row = 0;
  let col = 0;
  let up = true;
  let result = [];

  while (true) {
    result.push(arr[row][col]);

    if ((row === 0 || row === arr.length - 1) && col !== arr[0].length - 1) {
      col++;
      result.push(arr[row][col]);
      up = !up;
    } else if (col === 0 || col === arr[0].length - 1) {
      row++;
      result.push(arr[row][col]);
      up = !up;
    }

    if (row === arr.length - 1 && col === arr[0].length - 1) {
      break;
    }

    if (up) {
      row = row - 1;
      col = col + 1;
    } else {
      row = row + 1;
      col = col - 1;
    }
  }

  return result;
}

// Explanation:
// -Set row and col to 0
// -Set direction up to true
// -Set result to empty array
// -While true:
// -Push curr node to result
// -If we are at beginning or last row and column is not last column, increase col count by 1, push node to result, and update direction
// -Else if we are in first or last column, increase row count by 1, push node to result, and update direction
// -If we reach last node, break
// -If direction is up, update row and col to go up 1 diagonal
// -Else update row and col to go down 1 diagonal
// -Once we break out of while loop, return result

// Notes:
// -Time complexity: O(n), where n is the number of elements in the matrix
// -Space complexity: O(1), as we are asked to print an array so we are using no extra space

console.log(printZigZag([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 0, 1, 2]
]));

// Print elements of a matrix in spiral order

function printSpiral(arr) {
  let [left, right, top, bottom] = [0, arr[0].length - 1, 0, arr.length - 1];

  let result = [];

  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      result.push(arr[top][i]);
    }
    top++;

    for (let i = top; i <= bottom; i++) {
      result.push(arr[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(arr[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(arr[i][left]);
      }
      left++;
    }
  }

  return result;
}

// Explanation:
// -Set left, right, top, and bottom bounds to appropriate indices
// -Set result to empty array
// -While left <= right and top <= bottom:
// -Push top row nodes to result and increment top by 1
// -Push rightmost nodes to result and decrease right by 1
// -If top <= bottom, push bottom row nodes to result and decrease bottom by 1
// -If left <= right, push leftmost nodes to result and increment left by 1
// -Once done traversing nodes, return result

// Notes:
// -Time complexity: O(n), where n is num of elements in matrix
// -Space complexity: O(1)

console.log(printSpiral([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 0, 1, 2]
]));