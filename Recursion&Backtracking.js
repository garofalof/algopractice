// Find the nth number in the Fibonacci series. Fibonacci series is as follows:
// 1, 1, 2, 3, 5, 8, 13, 21, ... After the first two 1’s, each number is the sum of the previous two numbers.

function fibonacci(num) {
  let memory = {};

  function helper(num) {
    if (memory[num]) {
      return memory[num];
    }
    if (num < 3) {
      return 1;
    }
    return (memory[num] = helper(num - 1) + helper(num - 2));
  }

  return helper(num);
}

// Explanation:
// -Set memory to empty object
// -Create helper function
// -Return helper(num)
// -Inside helper:
// -If num in memory
// -Return memory[num]
// -If num < 3
// -Return 1
// -Else return memory[num] = helper(num - 1) + helper(num - 2);

console.log(fibonacci(9));

// Power Function: Implement a function to calculate X^N. Both X and N can be positive or negative.
// For example: 2 ^ 2  = 4, 2 ^ -2 = 0.25, -2 ^ 3  = -8

function power(num, pow) {
  if (pow === 0) {
    return 1;
  }
  if (pow === 1) {
    return num;
  }
  if (pow < 0) {
    return 1 / power(num, -pow);
  }
  if (pow % 2 === 0) {
    return power(num * num, pow / 2);
  }
  return num * power(num * num, (pow - 1) / 2);
}

// Explanation:
// -If power = 0, return 1
// -If power = 1, return num
// -If power is negative, return 1 / power(num, -power)
// -If power is even, return power(num squared, half power)
// -Else if power is odd, return num * power(num squared, half power of power - 1)

console.log(power(2, 4));

// Given an array of integers, print all combinations of size X.

let nums1 = [1, 2, 3, 4];

function printCombinations(array, size) {
  let result = [];
  let buffer = [];

  function helper(start, length, size) {
    if (buffer.length === size) {
      result.push([...buffer]);
      return;
    }
    for (let i = start; i < length; i++) {
      buffer.push(array[i]);
      helper(i + 1, length, size);
      buffer.pop();
    }
  }

  helper(0, array.length, size);
  return result;
}

// Explanation:
// -Set result to empty array
// -Set buffer to empty array
// -Recurse through helper with start at 0
// -Inside helper function that takes starting index, input array length, and max size:
// -Base case: if buffer length equals max size, push buffer to result and return out of recursion
// -Iterate from start to array length
// -Push current value to buffer
// -Recurse through helper with start index moved up one
// -Once done recursing, remove last item from buffer
// -Once done recursing, return result

// Notes:
// -Time complexity is nCr or factorial expansion
// -Space complexity is O(n), as we use O(n) space both in the buffer allocation and on the recursion stack

console.log(printCombinations(nums1, 2));

// Given an N digit phone number, print all the strings that canbe made from that phone number. Since 1 and 0 don't correspond to any characters, ignore them.
// For example, 213 => AD, AE, AF, BD, BE, BF, CE, CE, CF

function letterCombinations(digits) {
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  function helper(index, buffer) {
    if (index === digits.length) {
      result.push(buffer);
      return;
    }

    for (let letter of map[digits[index]]) {
      helper(index + 1, buffer + letter);
    }
  }

  helper(0, "");
  return result;
}

// Explanation:
// -Create map of phone digits
// -Set result to empty array
// -Recurse through helper with index at 0 and buffer set to empty string
// -Inside helper function that takes position index and buffer string:
// -Base case: if position index equals digits length, push buffer string to result
// -Iterate through letters at current digit index
// -Recurse through helper by increase index by 1 and buffer string by current letter
// -Once done recursing, return result

// Notes:
// -This algorithm is DFS and will go to all letter combinations at last digit first before walking its way back.
// -Time complexity is exponential, specifically O(4^n), where n is the length of the phone number. At each function call, we can call at most 4 function calls.
// -Space complexity is O(n), where n is the length of the phone number. The O(n) space is taken both by the buffer and the call stack.

console.log(letterCombinations("245"));

// Given an array of integers A, print all its subsets.
// For example:
// Input:​ [1, 2, 3]
// Output:[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]

let nums2 = [1, 2, 3];

function subsets(nums) {
  let result = [[]];

  function helper(index, buffer) {
    for (let i = index; i < nums.length; i++) {
      buffer.push(nums[i]);
      result.push([...buffer]);
      helper(i + 1, buffer);
      buffer.pop();
    }
  }

  helper(0, []);
  return result;
}

// Explanation:
// -Set result array to first result, empty array
// -Recurse through helper function with index 0 and empty buffer array
// -Inside helper function that takes start index and buffer array:
// -Iterate through nums array with i set to index
// -Push current val to buffer
// -Push buffer array to result
// -Recurse through helper with index increased by 1 and current buffer
// -Pop last item from buffer
// -When done recursing, return result

// Notes:
// -This algorithm is DFS and will visit all combinations with first num before moving onto the next, etc.
// -Time complexity is factorial
// -Space complexity is O(n). We use O(n) space both in the buffer allocation and on the recursion stack

console.log(subsets(nums2));

// Given an array A, print all permutations of size X.
// For example,
// Input: A = [1,2,3] and X = 2
// Output: [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]

let nums3 = [1, 2, 3, 4];

function permutations(nums, size) {
  let result = [];

  function helper(buffer) {
    if (buffer.size === size) {
      result.push([...buffer]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (buffer.has(nums[i])) {
        continue;
      }
      buffer.add(nums[i]);
      helper(buffer);
      buffer.delete(nums[i]);
    }
  }

  helper(new Set());
  return result;
}

// Explanation:
// -Set result to empty array
// -Recurse through helper function with empty set as buffer
// -Inside helper function that takes buffer:
// -Base case: if buffer size equals target size, push buffer to result
// -Iterate through nums
// -If buffer contains curr val, continue
// -Else add curr val to buffer and recurse through helper with new buffer
// -If hit base case, delete last val from buffer
// -If done recursing, return result

// Notes:
// -This algorithm is DFS and will visit all permutations for first num before moving on to next, etc.
// -Time complexity is factorial. First level is n function calls, second is (n - 1), then (n -2), etc.
// -Space complexity is O(n). We use O(n) space both in the buffer allocation and result array.

console.log(permutations(nums3, 3));

// Given a set of coin denominations, print out the different ways you can make a target amount. You can use as many coins of each     denomination as you like.
// For example: If coins are [1,2,5] and the target is 5, output will be:
// [[1,1,1,1,1], [1,1,1,2], [1,2,2], [5]]

let coins = [1, 2, 5];

function findChange(target, coins) {
  let result = [];

  function helper(index, buffer, sum) {
    if (sum > target) {
      return;
    }
    if (sum === target) {
      result.push([...buffer]);
      return;
    }
    for (let i = index; i < coins.length; i++) {
      buffer.push(coins[i]);
      helper(i, buffer, sum + coins[i]);
      buffer.pop();
    }
  }

  helper(0, [], 0);
  return result;
}

// Explanation:
// -Set result to empty array
// -Call helper function with start index of 0, buffer as empty array, and sum of 0
// -Insider helper function:
// -Base case: if sum > target, return to exit recursive call
// -Base case: if sum = taraget, push buffer to result and return to exit recursive call
// -Iterate through coins with i = start index
// -Push curr coins val to buffer
// -Recurse through helper with sum updated to sum + curr coin val
// -If hit base case, pop last coin from buffer
// -If done recursing, return result

console.log(findChange(5, coins));

// You are given a 2D array that represents a maze. It can have 2 values - 0 and 1. 1 represents a wall and 0 represents a path. The objective of the maze is to reach the bottom right corner, or A[A.length-1][A.length-1]. You start from A[0][0] and can only go in 4 directions - up, down, left or right. Find if a path exists.
// For example, a path exists in the following maze:
// [
//  [0, 1, 1, 1],
//  [0, 0, 0, 1],
//  [1, 0, 0, 1],
//  [1, 1, 0, 0]
// ]

function pathExists(maze) {
  let memo = [];
  for (let row of maze) {
    let memoRow = [];
    for (let node of row) {
      memoRow.push("Unvisited");
    }
    memo.push(memoRow);
  }

  function findPath(maze, row, col, memo) {
    if (checkOutsideBounds(maze, row, col) || maze[row][col] === 1) {
      return false;
    }
    if (row === maze.length - 1 && col === maze[0].length - 1) {
      return true;
    }
    if (memo[row][col] === "Not Found" || memo[row][col] === "Visiting") {
      return false;
    }
    memo[row][col] = "Visiting";
    let pairs = [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1],
    ];
    for (let pair of pairs) {
      if (findPath(maze, pair[0], pair[1], memo)) {
        return true;
      }
    }
    memo[row][col] = "Not Found";
    return false;
  }

  function checkOutsideBounds(maze, row, col) {
    return row < 0 || row >= maze.length || col < 0 || col >= maze[0].length;
  }

  return findPath(maze, 0, 0, memo);
}

// Explanation:
// -Create memo array
// -Call helper function findPath with maze, row 0, col 0, and memo as params
// -Inside findPath:
// -1st base case: if row / col are out of bounds or val is equal to 1, path is not valid so we return false
// -2nd base case: if row and col are at the end of maze, path is valid so we return true
// -3rd base case: if curr row / col in memo is 'Not Found' or 'Visiting', path is not valid so we return false
// -Set curr row / col in memo to visiting
// -Create array of pairs for down, up, right, left
// -Iterate through pairs
// -If findPath returns true w/ current pair, valid path found so we return true
// -If done iterating with no valid path found, set row / col in memo to 'Not Found' and return false

// Notes:
// -Time complexity is linear w/ memoization, as we only visit each node once, and O(4^n) without memoization, as each node makes 4 calls
// -Space complexity is O(n) on both the memo and recursion stack

console.log(
  pathExists([
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
  ])
);

// Given a Sudoku board, find a solution. The board can have some squares filled out already. You have to fill the rest of the squares./
// Rules of Sudoku are as follows: In each column, row and 3 x 3 square, you cannot have duplicate numbers. Also, only numbers 1-9 are allowed.

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

function solveSudoku(board) {
  function isValid(board, row, col, val) {
    let blockRow = Math.floor(row / 3) * 3;
    let blockCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < board.length; i++) {
      if (board[row][i] === val || board[i][col] === val) {
        return false;
      }
      const currRow = blockRow + Math.floor(i / 3);
      const currCol = blockCol + Math.floor(i % 3);
      if (board[currRow][currCol] === val) {
        return false;
      }
    }
    return true;
  }
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === ".") {
        for (let i = 1; i <= 9; i++) {
          const val = i.toString();
          if (isValid(board, row, col, val)) {
            board[row][col] = val;
            if (solveSudoku(board)) {
              return board;
            }
          }
        }
        board[row][col] = ".";
        return false;
      }
    }
  }
  return true;
}

// Explanation:
// -Iterate through rows
// -For each row, iterate through columns
// -If spot is empty:
// -Try values 1 through 9
// -Check to see if valid:
// -Inside valid checker:
// -Start row and start col equal to floor of row / 3 and col / 3
// -Try 9 rows, cols, and block spots
// -If row, cols, and blocks clear, set curr row and col to val
// -Keep recursing until sudoku is solved
// -If values 1 through 9 invalid, we've hit dead end and need to set spot to '.' and return false
// -If all spots filled, return true

// Notes:
// -Time complexity is O(9^n), as we do up to 9 splits for each square. If the board size is fixed, our complexity is O(1) since n is constant.
// -Space complexity is O(n). We use this space on both the recursion stack and on the board checker.

console.log(solveSudoku(board));

// Given a String S, which contains letters and no spaces, determine if youcan break it into valid words. Return one such combination of words. You can assume that you are provided a dictionary of English words.
// For example:

// S = "ilikemangotango"

// Output: Return one of these: "i like mango tango", "i like man go tan go", "i like mango tan go", "i like man go tango"

const s = "ilikemangotango";
const dictionary = ["i", "like", "mango", "tango", "man", "go", "tan"];

function wordBreak(string, dictionary) {
  let memo = [];
  let result = [];
  let words = new Set(dictionary);

  function backtrack(string, index, memo, result, words) {
    if (index === string.length) {
      return true;
    }
    if (memo[index] === "Not Found") {
      return false;
    }
    for (let i = index; i < string.length; i++) {
      let curr = string.substring(index, i + 1);
      if (words.has(curr)) {
        result.push(curr);
        if (backtrack(string, i + 1, memo, result, words)) {
          return true;
        } else {
          result.pop();
          memo[i + 1] = "Not Found";
        }
      }
    }
    return false;
  }

  if (backtrack(string, 0, memo, result, words)) {
    return result;
  }
  return null;
}

// Explanation:
// -Initiate memo and result as empty array
// -Initiate dictionary as new set
// -Check if backtracking returns true with start index of 0
// -Inside backtracking:
// -If reached end of string, return true
// -If memoized index equals not found, return false
// -Iterate from index to end of string
// -Increase substring length until word found in dictionary
// -If word in dictionary
// -Push curr substring to result
// -Check to see if backtrack returns true with index increased by one
// -If so, return true and return result
// -Else pop last word from result and mark memo[i + 1] to Not Found, as there is no combo from i
// -If exit string iteration, no word found so we return false
// -Outside backtracking, no words found so we return null

// Notes:
// -Time complexity: O(n^2) with memoization, as we go over each substring at most once.
// -Space complexity: O(n) with memoization, both on the memo and recursion stack. At worst case, the depth of the tree will be as deep as the length of the string.

console.log(wordBreak(s, dictionary));
