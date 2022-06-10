// Implement a queue using an array

function queue(n) {
  return {
    arr: new Array(n),
    front: 0,
    back: 0,
    length: 0,
    add: function (item) {
      if (this.length === this.arr.length) {
        return false;
      }
      this.arr[this.back] = item;
      this.back = (this.back + 1) % this.arr.length;
      this.length++;
    },
    remove: function () {
      if (this.length === 0) {
        return false;
      }
      let result = this.arr[this.front];
      this.front = (this.front + 1) % this.arr.length;
      this.length--;
      return result;
    },
  };
}

// Explanation:
// -Set queue to empty arr of size n, front and back pointers to 0, and length to 0. We'll increase/decrease front, back, and length as we add/remove from queue.
// -For add function:
// -Check to see if queue is full. If so, return false.
// -Set queue[back] to item
// -Set back to remainder of (back + 1) / queue length. This ensures we stay within bounds.
// -Increase length by 1
// -For remove function:
// -If queue length is 0, return false as there's nothing to remove
// -Set result to element at front index in queue
// -Set front to remainder of (front + 1) / queue length
// -Decrease length by 1
// -Return result

// Notes:
// -Time complexity: O(1) for insertion and deletion
// -Space complexity: O(1) extra space after initial array

let q = new queue(4);
q.add(1);
q.add(2);
q.add(3);
q.add(4);
console.log(q.remove());

// Given an array of integers, find the sum of each sliding window of size N.
// Variation:​ Instead of an array, what if you were presented with a ​stream​ of numbers. A new numbercan be added anytime. You want to find the sum of the last K elements.

function slidingWindowSum(nums, n) {
  let q = new queue(n);
  let sum = 0;
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    if (q.length === n) {
      let last = q.remove();
      sum -= last;
    }
    q.add(nums[i]);
    sum += nums[i];
    if (q.length === n) {
      result.push(sum);
    }
  }
  return result;
}

// Explanation:
// -Create new queue of size n
// -Set sum to 0
// -Set result to empty array
// -For each num in nums:
// -If queue is full, remove last element and subtract that num from sum
// -Add curr num to queue
// -Increase sum by curr num
// -If queue is full, push sum to result
// -Once done iterating through nums, return result

// Notes:
// -Time complexity: O(n), where n is the size of nums array
// -Space complexity: O(k), where k is the size of sliding window because we store at most k nodes in the queue

console.log(slidingWindowSum([1, 2, 3, 4, 5, 6], 2));

// You are given stock prices and the corresponding day of each stock price.For example: (32, 1), (45, 1), (37, 2), (42, 3). Here, 32 is the price and 1 is the day of the price. Say you are given these prices as an input stream. Your system should be able to tell the maximum stock price in the last N days.

function getMaxStockPrice(prices, days) {
  let maxPrice = 0;
  let start = prices.length - days;
  for (let i = start; i < prices.length; i++) {
    let curr = prices[i];
    if (curr > maxPrice) {
      maxPrice = curr;
    }
  }
  return maxPrice;
}

// Explanation:
// -Find start by subtracting days from length of prices
// -For each price from start:
// -Check to see if curr > max price. If so, update max price to curr
// -Once done iterating, return max price

// Notes:
// -Time complexity: O(n), where n is the number of days
// -Space complexity: O(n)

console.log(getMaxStockPrice([23, 45, 17, 34, 26, 51], 3));

// Implement a Queue with O(1) lookup of the maximum element.

function queueWithMax() {
  return {
    main: [],
    max: [],
    enqueue: function (item) {
      this.main.unshift(item);
      while (this.max.length && this.max[0] < item) {
        this.max.shift();
      }
      this.max.unshift(item);
    },
    dequeue: function () {
      if (this.main.length === 0) {
        return false;
      }
      let item = this.main.pop();
      let first = this.max.length - 1;
      if (this.max[first] === item) {
        this.max.pop();
      }
    },
    findMax: function () {
      if (this.max.length === 0) {
        return false;
      }
      let first = this.max.length - 1;
      return this.max[first];
    },
  };
}

// Explanation:
// -Set main and max queues to empty arrays
// -For enqueue:
// -Add item to beginning of main array
// -While max queue has items and end of queue is less than item, remove nums from end of queue
// -Once done removing items, add item to end of queue
// For dequeue:
// -Set temp item to main.pop()
// -Check to see if first item in max queue equals item. If so, pop from max
// For find max:
// -If max length is 0, return false
// -Else return first item in max queue

// Notes:
// -Time complexity: O(n) for insertion, O(1) for deletion and find max
// -Space complexity: O(n) on the max queue

let q = new queueWithMax();
q.enqueue(1);
q.enqueue(4);
q.enqueue(3);
q.enqueue(2);
q.dequeue();
q.dequeue();
console.log(q.findMax());

// Given an array and an integer N, find the maximum element in each sliding window of size N

function findMaxSlidingWindow(arr, n) {
  let q = new queueWithMax();
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (q.main.length < n) {
      q.enqueue(arr[i]);
    } else {
      let max = q.findMax();
      result.push(max);
      q.dequeue();
      q.enqueue(arr[i]);
    }
  }
  let max = q.findMax();
  result.push(max);
  return result;
}

// Explanation:
// -Create new queue with max
// -Set result to empty array
// -For each num in array:
// -If main queue length < n, add num to queue
// -Else if main queue is size of window, push max to result, dequeue last num, and enqueue curr num
// -Once done iterating, push max to result one last time and return result

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n), where n is the size of window, as the queue will store up to n elements

console.log(findMaxSlidingWindow([2, 7, 3, 1, 5, 2, 6, 2], 4));
