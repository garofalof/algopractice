// Given a sorted array in non-decreasing order, return an array of squares of each number, also in non-decreasing order. For example:
// [-4,-2,-1,0,3,5] -> [0,1,4,9,16,25]
// How can you do it in O(n) time?

let nums1 = [-4,-2,-1,0,3,5];

function sortedSquares(nums) {
  let start = 0;
  let end = nums.length - 1;
  let result = [];
  let resultIndex = nums.length - 1;
  while (start <= end) {
    let left = nums[start];
    let right = nums[end];
    if (Math.abs(left) > Math.abs(right)) {
      result[resultIndex] = left ** 2;
      start++;
    } else {
      result[resultIndex] = right ** 2;
      end--;
    }
    resultIndex--;
  }
  return result;
}

// Explanation:
// -Set pointers at beginning and end
// -Create result array and a pointer that points to the end of the result array
// -While start <= end:
  // -If absolute value of nums[start] is greater than nums[end], set result[resultIndex] to square of nums[start] and increment start
  // -Else set result[resultIndex] to square of nums[end] and decrement end
  // -For each iteration, decremenet result[index]
// -At end of iteration, return result

console.log('Result for sortedSquares: ', sortedSquares(nums1));

// Given an array of integers, find the continuous subarray, which when sorted, results in the entire array being sorted. For example: A = [0,2,3,1,8,6,9], result is the subarray [2,3,1,8,6]

let nums2 = [0,2,3,1,8,6,9];

function findUnsorted(nums) {
  let left = 0;
  let right = nums.length - 1;
  let max = -Infinity;
  let min = Infinity;
  let start = -1;
  end = 0;
  while (left < nums.length) {
    nums[left] >= max ? max = nums[left] : end = left;
    nums[right] <= min ? min = nums[right] : start = right;
    left++;
    right--;
  }
  return nums.slice(start, end + 1);
}

console.log('Result for findUnsorted: ', findUnsorted(nums2));

// Explanation:
// -Set pointers at beginning of array and end of array
// -Create max and min variables to track pivots (make sure to initialize with -Infinity and +Infinity for first iteration)
// -Create pointer variables to track subarray start and end
// -While left < array length
//   -If left >= max, update max to left value, else we've found our dip and need to set end to left index
//   -If right <= min, update min to right value, else we've found our bump and need to set start to right index
//   -Increase left index and decrease right index
// -If done iterating, return subarray with start and end indices