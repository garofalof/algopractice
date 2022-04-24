// Given a sorted array, search for a target item.

const nums1 = [1, 2, 6, 9, 12];

function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (array[mid] < target) {
      low = mid + 1;
    } else if (array[mid] > target) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// Explanation:
// -Set low bound at 0 and high bound at end of array
// -While low bound <= high bound
  // -Set mid to Math.floor(low + (high - low) / 2)
  // -If mid less than target
    // -Set low bound to mid + 1
  // -Else if mid greater than target
    // -Set high bound to mid - 1
  // -Else return mid
// -If done iterating with no result, return -1

// Notes:
// -Instead of using mid = (start + end) / 2, we use mid = start + (end - start) / 2
// -We do this because (start + end)'s sum could be very large and cause integer overflow
// -In integer overflow, (start + end) would wrap around the max value into the negative
// -If it is an unsigned integer, the value would wrap around 0

console.log(binarySearch(nums1, 9));

// Given a sorted array that can contain duplicates, find the first occurrence of a target element T.
// For example, if A = [2,3,4,4,5,6] and T = 4, return index 2.

const nums2 = [2,3,4,4,5,6];

function binarySearchWithDups(array, target) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (array[mid] < target) {
      low = mid + 1;
    } else if (array[mid] > target || (a[mid] === target && mid > 0 && a[mid - 1] === target)) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// Explanation:
// -We make one small modification to the above function:
  // -If mid is greater than target OR mid equals target and mid is greater than first index and mid - 1 equals target
    // -We set high to mid - 1

console.log(binarySearchWithDups(nums2, 4));

// You are given a sorted array A and a target T. Return the index where T would be placed if inserted in order. For example,
// A = [1,2,4,5,6,8] and T = 3, return index 2
// A = [1,2,4,5,6,8] and T = 0, return index 0
// A = [1,2,4,5,6,8] and T = 4, return index 3

const nums3 = [1,2,4,5,6,8];

function binarySearchWithDupsInsert(array, target) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (array[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

// Explanation:
// -Set low bound to 0 and high bound to last index in array
// -While low bound <= high bound
  // -Set mid to Math.floor(low + (high - low) / 2)
  // -If mid <= target
    // -Set low bound to mid + 1
  // -Else if mid greater than target
    // -Set high bound to mid - 1
// -If done iterating, return low bound

console.log(binarySearchWithDupsInsert(nums3, 3));

// Given a sorted array of Integers, find the target. If the target is not found,return the element closest to the target.
// For example, A = [1,2,4,5,7,8,9], Target = 6 -> Output Index = 3 or 4 (since both 5 and 7 are equally close)

const nums4 = [1,2,4,5,7,8,9];

function binarySearchFindClosest(array, target) {
  let low = 0;
  let high = array.length - 1;
  let result = -1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    result = record(array, mid, result, target);
    if (array[mid] > target) {
      high = mid - 1;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return result;
}

function record(array, mid, result, target) {
  if (result === -1 || Math.abs(array[mid] - target) < Math.abs(array[result] - target)) {
    return mid;
  }
  return result;
}

// Explanation:
// -Classic binary search algorithm w/ an extra step:
  // -Every iteration, we check to see if the difference between mid and target is less than the difference from previous result and target
  // -If so, we udpate result to mid
  // -Else we keep our previous result
// -Once we complete the iteration, we return the result

console.log(binarySearchFindClosest(nums4, 6));

// Given an array that is cyclically sorted, find the minimum element. A cyclically sortedarray is a sorted array rotated by some number of elements. Assume all elements are unique.
// For example: A = [4,5,1,2,3], which is just [1,2,3,4,5] rotated by 2. Result = index 2

const nums5 = [4,5,1,2,3];

function cylicallySortedMin(array) {
  let low = 0;
  let high = array.length - 1;
  while (low < high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (array[mid] > array[high]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

// Explanation:
// -Set low bound to 0 and high bound to last index in array
// -While low bound < high bound
  // -Set mid to Math.floor(low + (high - low) / 2)
  // -If mid value > high value
    // -Set low to mid + 1
  // -Else set high to mid
// -If done iterating, return low

// Notes:
// -This algorithm won't work if duplicates are allowed

console.log(cylicallySortedMin(nums5));

// You are given an array, but you don't know the length. Write a program to find a target element in the array.

const nums6 = [1, 3, 6, 9, 12];

function binarySearchUnknownLength(array, target) {
  let high = 1;
  while (array[high] < target) {
    high = high * 2;
  }
  let low = high / 2;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

// Explanation:
// -Before performing standard binary search, set high bound to 1
// -While to high val less than target, double high bound
// -Once done iterating, set low bound to high / 2
// -Perform standard binary search
// -If done iterating without result, return -1

console.log(binarySearchUnknownLength(nums6, 9));

// Find the square root of an integer X. For example, squareRoot(4) = 2. If X is not a perfect square, find the integer floor of the square root.
// For example, squareRoot(5) & squareRoot(8) will return 2, and squareRoot(9) will return 3.

function squareRoot(num) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  let low = 0;
  let high = num / 2;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let squared = mid ** 2;
    if (squared > num) {
      high = mid - 1;
    } else if (squared < num) {
      if ((mid + 1) ** 2 > num) {
        return mid;
      }
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// Explanation:
// -If num is 0 or 1, return 0 or 1
// -Set low to 0 and high to num divided by 2
// -While low <= high
  // -Set mid to Math.floor(low + (high - low) / 2)
  // -If mid squared greater than num
    // -Set high to mid - 1
  // -Else if mid squared < num
    // -Check to see if mid + 1 squared is greater than num
    // -If so, return mid, else set low to mid + 1
  // -Else if mid squared equals num
    // -Return mid
// -Should not happen, but if done iterating without returning result, return -1

console.log(squareRoot(5));

// Search for a Peak: A peak element in array A is an A[i] where its adjacent elements are less than A[i]. So, A[i - 1] < A[i] and A[i + 1] < A[i].
// Assume there are no duplicates. Also, assume that A[-1] and A[length] are negative infinity (-∞). So A[0] can be a peak if A[1] < A[0].
// For example, A = [1,3,4,5,2] => Peak = 5, A = [5,3,1] => Peak = 5, A = [1,3,5] => Peak = 5

const nums7 = [1,3,4,5,2];

function findPeak(array) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    let mid = Math.floor(low + (high - low) / 2);
    let left = mid > 0 ? array[mid - 1] : -Infinity;
    let right = mid < array.length - 1 ? array[mid + 1] : -Infinity;
    if (left < array[mid] && right > array[mid]) {
      low = mid + 1;
    } else if (right < array[mid] && left > array[mid]) {
      high = mid - 1;
    } else if (right > array[mid] && left > array[mid]) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// Explanation:
// -Set low bound to 0 and high bound to last index in array
// -While low <= high
  // -Set mid equal to Math.floor(low + (high - low) / 2)
  // -If mid > 0, set left to array[mid - 1], else neighbor out of bounds and set to -Infinity
  // -If mid < array length, set right to array[mid + 1], else neighbor out of bounds and set to -Infinity
  // -If left, mid, and right are sloping upwards to the right
    // -Set low to mid + 1
  // -If left, mid, and right are sloping upwards to the left
    // -Set high to mid - 1
  // -If mid is a valley
    // -Go either way
  // -Else mid must be peak
    // -Return mid
// -If done iterating without returning result, return -1 (should not happen)


console.log(findPeak(nums7));