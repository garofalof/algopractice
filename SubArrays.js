// Given an array of integers that can be both +ve and -ve, find the contiguous subarraywith the largest sum.
// For example:  [1,2,-1,2,-3,2,-5]  -> first 4 elements have the largest sum. Return 5.

let nums1 = [-1, -2, 9, -1, -2];

function kadanesAlgorithm(nums) {
  let maxSum = nums[0];
  let maxEnd = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEnd = Math.max(maxEnd + nums[i], nums[i]);
    maxSum = Math.max(maxSum, maxEnd);
  }
  return maxSum;
}

// Explanation (Kadane's Algorithm):
// -Set max sum and max end to first element in array
// -Loop through entirety of array
// -Set max end equal to highest of max end plus curr or curr
// -Set max sum equal to highest of max sum or max end
// -If done iterating, return max sum

console.log("Result for kadanesAlgorithm: ", kadanesAlgorithm(nums1));

// Given a String, find the longest substring with unique characters.
// For example: "whatwhywhere" --> "atwhy"

let str1 = "whatwhywhere";

function findLongestSubstring(str) {
  let seen = new Set();
  let left = 0;
  let right = 0;
  let longest = 0;
  let longestRange = [0, 0];
  while (left < str.length && right < str.length) {
    if (!seen.has(str[right])) {
      seen.add(str[right]);
      right++;
      if (right - left + 1 > longest) {
        longest = right - left + 1;
        longestRange[0] = left;
        longestRange[1] = right;
      }
    } else {
      seen.delete(str[left]);
      left++;
    }
  }
  return str.substring(longestRange[0], longestRange[1]);
}

// Explanation (Sliding Window):
// -Create new set
// -Set left and right pointers to first index
// -Set longest to zero
// -Set longestRange to [0, 0]
// -While pointers are within array range
// -If set doesn't have letter
// -Add letter to set and increment right pointer
// -If length of pointers greater than longest
// -Set longest to length of pointers and updated longest range with pointer indices
// -Else
// -Delete character from set and increment left pointer
// -Return substring of characters within longest range

console.log("Result for findLongestSubstring: ", findLongestSubstring(str1));

// Given an array of integers, both -ve and +ve, find a contiguous subarray that sums to 0.
// For example: [2,4,-2,1,-3,5,-3] --> [4,-2,1,-3]

let nums2 = [2, 4, -2, 1, -3, 5, -3];

function findSumsZero(nums) {
  let sum = 0;
  let sums = {};
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    sum += curr;
    if (sum === 0) {
      return nums.slice(0, i + 1);
    }
    if (sums[sum] !== undefined) {
      return nums.slice(sums[sum] + 1, i + 1);
    }
    sums[sum] = i;
  }
  return null;
}

// Explanation (Prefix Sums):
// -Set running sum to zero
// -Create empty object to track sums at each index
// -Iterate through array
// -Add curr to sum
// -If running sum equals zero
// -Return subarray from 0 to i inclusive
// -If sum exists in object
// -Return subarray from sum index + 1 to i inclusive
// -If sum not in object, add sum and index to object
// -If done iterating and found nothing, return null

console.log("Result for findSumsZero: ", findSumsZero(nums2));

// Given an array of positive and negative integers, find a subarray whose sum equals X.
// For example: Input = [2,4,-2,1,-3,5,-3], X = 5 --> Result = [2,4,-2,1]

let nums3 = [2, 4, -2, 1, -3, 5, -3];
let target = 5;

function findSumTarget(nums, target) {
  let sum = 0;
  let sums = {};
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    sum += curr;
    if (sum === target) {
      return nums.slice(0, i + 1);
    }
    if (sums[sum - target] !== undefined) {
      return nums.slice(sums[sum - target] + 1, i + 1);
    }
    sums[sum] = i;
  }
  return null;
}

// Explanation (Prefix Sums):
// -Set running sum to zero
// -Create empty object to track sums at each index
// -Iterate through array
// -Add curr to sum
// -If sum equals target
// -Return subarray from 0 to i inclusive
// -If sum object contains sum - target
// -Sum has increased by target and we return subarray from sums[sum - target] + 1 to i inclusive
// -If sum - target not in object, add sum and index to object
// If done iterating and nothing found, return null
