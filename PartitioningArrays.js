// You are given an array of integers. Rearrange the array so that all zeroes are at the beginning of the array.
// For example, [4,2,0,1,0,3,0] -> [0,0,0,4,1,2,3]

let nums1 = [4,2,0,1,0,3,0];

function zerosFirst(nums) {
  let bound = 0;
  let i = 0;
  while (i < nums.length) {
    let curr = nums[i];
    if (curr === 0) {
      [nums[i], nums[bound]] = [nums[bound], nums[i]];
      bound++;
    }
    i++;
  }
  return nums;
}

// Explanation:
// -Set boundary and i to zero
// -While i < array length
  // -If curr is equal to zero, swap with val at boundary index and increment       boundary index
  // -Increment i
// -If done interating, return array

console.log('Result for zerosFirst: ', zerosFirst(nums1));

// You are given an array of integers and a pivot. Rearrange the array in thefollowing order:
// [all elements less than pivot, elements equal to pivot, elements greater than pivot]

// For example,
// a = [5,2,4,4,6,4,4,3] and pivot = 4 --> result = [3,2,4,4,4,4,5,6].

let nums2 = [5,2,4,4,6,4,4,3];

function dutchFlag(nums, pivot) {
  let lowB = 0;
  let highB = nums.length - 1;
  let i = 0;
  while (i <= highB) {
    let curr = nums[i];
    if (curr < pivot) {
      [nums[i], nums[lowB]] = [nums[lowB], nums[i]];
      lowB++;
      i++;
    } else if (curr > pivot) {
      [nums[i], nums[highB]] = [nums[highB], nums[i]];
      highB--;
    } else {
      i++;
    }
  }
  return nums;
}

// Explanation:
// -Set low bound and high bound at start and end of array
// -Set iterator to zero
// -While iterator < high bound
  // -If curr is less than pivot
    // -Swap curr with low bound
    // -Increment iterator and low bound
  // -If curr is greater than pivot
    // -Swap curr with high bound
    // -Decrement high bound
  // -Else
    // -Increment iterator
// -If done iterating, return array

console.log('Result for dutchFlag: ', dutchFlag(nums2, 4));