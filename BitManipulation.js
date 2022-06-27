// Convert a number to binary

(33).toString(2); // '100001'

// Parse a binary number

parseInt("100001", 2); // 33
BigInt("0b100001"); // 33n, accommodates big integers

// Bitwise & Operator
// Notes: When applied to a single binary digit, it returns 1 if both digits are 1. When applied to two binary numbers, it will return 1 whenever the corresponding bits of both are 1.

const foo = 0b10101; // 21
const bar = 0b10011; // 19

const result = foo & bar; // 17

result.toString(2); // '10001'

// Bitwise | Operator
// Notes: Bitwise OR will return 1 whenever one of the corresponding bits of the operand is 1

const foo = 0b10101; // 21
const bar = 0b10011; // 19

const result = foo | bar; // 23

result.toString(2); // '10111'

// Bitwise ^ Operator
// Notes: Bitwise XOR will return 1 whenever the two corresponding bits are different from each other

const foo = 0b10101; // 21
const bar = 0b10011; // 19

const result = foo ^ bar; // 6

result.toString(2); // '110'

// Bitwise ~ Operator
// Notes: Bitwise NOT inverts an operand. If it finds a 1 it turns it into a 0 and vice-versa.

const foo = 0b0111;

const result = ~foo;

result.toString(2); // '1000'

// Bitwise << Operator
// Notes: Left shift causes a binary representation, which goes into the left side of the operator, to be shifted by the number of bits specified in the right-side of the operator. It will add in 0s at the right when shifting.

const foo = 0b010101; // 21

const result = foo << 1; // 42

result.toString(2); // '101010'

// Bitwise >> Operator
// Notes: The right shift with sign-propagation, as the name implies, shifts a binary representation, which goes into the left side of the operator, to the right by the number of places specified in the right-side of the operator. However, it is important to notice that the sign bit at the left will be added in from the left.

const leftmostOne = 0b11111111111111111111111111110000;
const leftmostZero = 0b01111111111111111111111111110000;

// This will fill-in 1's in the left
leftmostOne >> 2; // 0b11111111111111111111111111111100

// This will fill-in 0's in the left
leftmostZero >> 2; // 0b00011111111111111111111111111100

// Bitwise >>> Operator
// Notes: This right-shift also shifts a binary representation to the right, but always adds in 0s to the left, no matter what the leftmost bit is

const leftmostOne = 0b11111111111111111111111111110000;
const leftmostZero = 0b01111111111111111111111111110000;

// This will fill-in 0's in the left
leftmostOne >>> 2; // 0b00111111111111111111111111111100

// This will also fill-in 0's in the left
leftmostZero >>> 2; // 0b00011111111111111111111111111100

// Given an integer, get the bit at a given index i

function getBit(int, i) {
  return (int >> i) & 1;
}

// Explanation:
// -Shift number right by i bits and return (number & 1)
// -Bitwise & operator sets each bit to 1 if both bits are 1

getBit(5, 1);

// Given an integer, set the bit at index ​i to a given value

function setBit(int, i, val) {
  if (val === 1) {
    return (1 << i) | val;
  } else {
    return ~(1 << i) & val;
  }
}

// Explanation
// -If value is 1, make a mask like 00001000 and OR it with the number
// -If value is 0, make a mask like 11110111 and AND it with the number

console.log(setBit(0b1001, 2, 4));

// Given an integer N, swap bits at indices i and j

function getBit(int, i) {
  return (int >> i) & 1;
}

function swapBits(num, i, j) {
  if (getBit(num, i) !== getBit(num, j)) {
    let mask = (1 << i) | (1 << j);
    return num ^ mask;
  }
  return num;
}

// Explanation:
// -Get bits at i and j
// -If bits are not equal, swap bits using mask
// -Else return num

console.log(swapBits(0b0101, 0, 3));

// Count the number of bits in a number, i.e, number of bits set to 1

function countBits(num) {
  let count = 0;

  while (num !== 0) {
    count++;
    num = num & (num - 1);
  }

  return count;
}

// Explanation:
// -Set count to 0
// -While num not 0:
// -Increase count by 1
// -Set num to num & (num - 1). This gives us num without the least significant bit, which is the first 1 in the binary number.
// -Once done counting, return count

console.log(countBits(0b1001));

// Find the complement of an integer

function findComplement(num) {
  let mask = 1;

  while (mask < num) {
    mask = (mask << 1) | 1;
  }

  return num ^ mask;
}

// Explanation:
// -Create mask of 1s up to length of number
// -Return num ^ mask to get complement

console.log(findComplement(0b00010001).toString(2));

// Given an array with all numbers in i through n except one number, find the missing number

function findMissing(nums, n) {
  if (nums === null || nums.length !== n - 1) {
    return false;
  }

  let result = 0;

  for (let i = 1; i <= n; i++) {
    result = result ^ i;
  }

  for (let i = 0; i < nums.length; i++) {
    result = result ^ nums[i];
  }

  return result;
}

// Explanation:
// -If nums is null or longer than n, throw error
// -Num ^ num cancel each other out. Therefore, we first XOR 1 through n and update result.
// -For each num in nums:
// -XOR num with result. If num exists in array, it will cancel out from our result.
// -Once done, we are left with our missing number and return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(findMissing([1, 3, 4, 5], 5));

// Given an array of integers where each element appears twice except one, find the element which appears once

function eliminateDuplicates(nums) {
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    result = result ^ nums[i];
  }

  return result;
}

// Explanation:
// -Set result to 0
// -For each num in nums:
// -Update result to result XOR curr num
// -Once done, we're left with only non duplicate so we return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(eliminateDuplicates([3, 3, 4, 5, 5]));

// 136. Single Number

var singleNumber = function (nums) {
  let result = 0;

  for (let num of nums) {
    result ^= num;
  }

  return result;
};

// Explanation:
// -For each num in nums:
// -Set result to XOR of result and num
// -XOR of a number and 0 is that number, while XOR of two identical numbers is 0
// -Therefore, we will end up returning the unique number as duplicates will get cancelled out

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(singleNumber([1, 1, 2, 3, 3]));

// 191. Number of 1 Bits

var hammingWeight = function (n) {
  let count = 0;

  while (n !== 0) {
    count++;
    n = n & (n - 1);
  }

  return count;
};

// Explanation:
// -Set count to 0
// -For each 1 in n, we repeatedly flip each least significant 1 to 0 and increase count until we have no more 1s
// -We then return count

// Notes:
// -Time complexity: O(1) in the case of a 32-bit integer, as size is capped
// -Space complexity: O(1), since no additional space is allocated

console.log(hammingWeight(00000000000000000000000000001011));
