// Find the Kth smallest element in a given array of integers

function findKthElement(nums, k) {
  if (nums === null || nums.length === 0 || k < 1 || k > nums.length) {
    return null;
  }

  function selection(nums, start, end, target) {
    let pivot = Math.floor(Math.random() * (end - start) + start);
    let result = partition(nums, start, end, pivot);

    if (result > target) {
      return selection(nums, start, result - 1, target);
    } else if (result < target) {
      return selection(nums, result + 1, end, target);
    } else {
      return nums[result];
    }
  }

  function partition(nums, start, end, pivot) {
    swap(nums, start, pivot);

    let less = start;

    for (let i = start + 1; i <= end; i++) {
      if (nums[i] <= nums[start]) {
        less++;
        swap(nums, i, less);
      }
    }

    swap(nums, start, less);

    return less;
  }

  function swap(nums, index, target) {
    [nums[index], nums[target]] = [nums[target], nums[index]];
  }

  return selection(nums, 0, nums.length - 1, k - 1);
}

// Explanation:
// -If nums null or empty or k is out of bounds, return null
// -Return result of selection algorithm called on full array with target set to k - 1, which is appropriate index
// -For selection algorithm:
// -Generate random pivot
// -Set result to index of pivot in partioned array
// -Partition function takes pivot and places it at the end of subarray containing all values <= pivot
// -If result index > target, return result of recursing on nums with same start and end set to result - 1
// -If result < target, return result of recursing on nums with start of result + 1 and same end
// -Else we've found our target index so we return the value at that index

// Notes:
// -Time complexity: O(n) average case, O(n ^ 2) worst case
// -Space complexity: O(log n) average case, O(n) worst case. Space is used on the recursion stack

console.log(findKthElement([-2, 1, -3, 9, 7, 4], 1));
console.log(findKthElement([-2, 1, -3, 9, 7, 4], 2));
console.log(findKthElement([-2, 1, -3, 9, 7, 4], 3));
console.log(findKthElement([-2, 1, -3, 9, 7, 4], 4));
console.log(findKthElement([-2, 1, -3, 9, 7, 4], 5));
console.log(findKthElement([-2, 1, -3, 9, 7, 4], 6));

// Implement merge sort

function mergeSort(nums) {
  function merge(left, right) {
    let result = [];
    let leftPointer = 0;
    let rightPointer = 0;

    while (leftPointer < left.length && rightPointer < right.length) {
      if (left[leftPointer] < right[rightPointer]) {
        result.push(left[leftPointer]);
        leftPointer++;
      } else {
        result.push(right[rightPointer]);
        rightPointer++;
      }
    }

    let leftRemain = left.splice(leftPointer);
    let rightRemain = right.splice(rightPointer);

    return [...result, ...leftRemain, ...rightRemain];
  }

  if (nums.length < 2) {
    return nums;
  }

  let half = Math.floor(nums.length / 2);
  let left = nums.slice(0, half);
  let right = nums.slice(half);
  let sortedLeft = mergeSort(left);
  let sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

// Explanation:
// -Break array into left and right halves until each half is one element long
// -Sort those halves and add remaining values from either half onto end result
// -Keep sorting each returned larger half until we have a fully sorted array

// Notes:
// -Time complexity: O(n log n)
// -Space complexity: O(n), as we need to allocate a new array to hold result if we want to merge two sorted arrays in O(n) time
// -Merge sort is a stable sorting algorithm

console.log(mergeSort([4, 2, 12, 7, 3, 11, 9]));

// Implement quick sort

function quickSort(nums, start = 0, end = nums.length) {
  function findPivot(nums, start, end) {
    function swap(nums, index, target) {
      [nums[index], nums[target]] = [nums[target], nums[index]];
    }

    let pivot = nums[start];
    let pointer = start;

    for (let i = start; i < nums.length; i++) {
      if (nums[i] < pivot) {
        pointer++;
        swap(nums, pointer, i);
      }
    }

    swap(nums, start, pointer);
    return pointer;
  }

  let pivot = findPivot(nums, start, end);

  if (start >= end) {
    return nums;
  }

  quickSort(nums, start, pivot);
  quickSort(nums, pivot + 1, end);

  return nums;
}

// Explanation:
// -Sort array in place so that pivot is at correct index and smaller elements are below pivot
// -Return correct pivot index to quick sort
// -Keep sorting subarrays around pivot
// -Return nums once list is fully sorted

// Notes:
// -Time complexity: O(n log n) average case, O(n^2) worst case
// -Space complexity: O(log n) space complexity on the recursion stack, as the array is sorted in place

console.log(quickSort([3, 1, 7, 4]));
console.log(quickSort([9, -1, 5, 2, 12, 7]));

// Given an array of single digit integers, sort it in O(n) time

function linearSort(nums) {
  let map = {};

  for (let num of nums) {
    map[num] = map[num] ? map[num] + 1 : 1;
  }

  let result = [];

  for (let num in map) {
    while (map[num]) {
      result.push(num);
      map[num]--;
    }
  }

  return result;
}

// Explanation:
// -Create map of integer counts
// -Set result to empty array
// -For each num in map:
// -While num has count:
// -Push num to result
// -Once done iterating, return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(linearSort([1, 7, 3, 3, 2, 5]));