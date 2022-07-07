// Implement a max heap

function MaxHeap() {
  return {
    heap: [null],
    parent: function (i) {
      return Math.floor(i / 2);
    },
    left: function (i) {
      return 2 * i;
    },
    right: function (i) {
      return 2 * i + 1;
    },
    swap: function (arr, index, target) {
      [arr[index], arr[target]] = [arr[target], arr[index]];
    },
    getMax: function () {
      return this.heap[1];
    },
    insert: function (val) {
      this.heap.push(val);
      let size = this.heap.length;
      if (size > 2) {
        let index = size - 1;
        let parent = this.parent(index);
        while (this.heap[index] > this.heap[parent]) {
          if (index >= 1) {
            this.swap(this.heap, index, parent);
            if (parent > 1) {
              index = parent;
              parent = this.parent(index);
            } else {
              break;
            }
          }
        }
      }
    },
    remove: function () {
      let largest = this.heap[1];
      let size = this.heap.length;
      if (size > 2) {
        this.heap[1] = this.heap[size - 1];
        this.heap.pop();
        if (size === 3) {
          if (this.heap[1] < this.heap[2]) {
            this.swap(this.heap, 1, 2);
          }
          return largest;
        }
        let index = 1;
        let left = this.left(index);
        let right = this.right(index);
        while (
          this.heap[index] <= this.heap[left] ||
          this.heap[index] <= this.heap[right]
        ) {
          if (this.heap[left] > this.heap[right]) {
            this.swap(this.heap, index, left);
            index = left;
          } else {
            this.swap(this.heap, index, right);
            index = right;
          }
          left = this.left(index);
          right = this.right(index);
          if (this.heap[left] === undefined || this.heap[right] === undefined) {
            break;
          }
        }
      } else if (this.heap.length === 2) {
        this.heap.pop();
      } else {
        return null;
      }
      return largest;
    },
  };
}

// Explanation:
// -Set heap to array with empty 0 index
// -For parent:
// -Return floor of index / 2
// -For left node:
// -Return 2 * index
// -For right node:
// -Return 2 * index + 1
// -For swap:
// -Swap index and target in heap
// -For insert:
// -Push val to heap
// -If heap has more than 1 element:
// -Set index to last index
// -Get that index's parent
// -While index value greater than parent:
// -If index >= 1, swap index and parent values
// -If parent > 1, set index to parent and parent to new index's parent. Else, break.
// -For remove:
// -Set largest to first element in heap
// -If heap size greater than 1 element:
// -Set first index to last element
// -Remove last element
// -If heap size equal to 2 elements:
// -Check to see if two elements need to be swapped
// -Return largest
// -Else set index to 1
// -Get left and right children
// -While curr index val less than left or right children:
// -If left > right, swap index and left and set index to left
// -Else swap index and right and set index to right
// -Update left and right children
// -If left or right undefined, break
// -Else if heap size is 1 element:
// -Remove last element
// -Else return null
// -Once done, return largest

// Notes
// -Time complexity: O(log n) insertion and deletion

let heap = new MaxHeap();
heap.insert(1);
heap.insert(6);
heap.insert(12);
heap.insert(9);
heap.insert(5);
heap.insert(10);
console.log(heap.getMax());
heap.remove();
heap.remove();
heap.remove();
console.log(heap);

// Implement a min heap

function MinHeap() {
  return {
    heap: [null],
    parent: function (i) {
      return Math.floor(i / 2);
    },
    left: function (i) {
      return 2 * i;
    },
    right: function (i) {
      return 2 * i + 1;
    },
    swap: function (arr, index, target) {
      [arr[index], arr[target]] = [arr[target], arr[index]];
    },
    getMin: function () {
      return this.heap[1];
    },
    insert: function (val) {
      this.heap.push(val);

      if (this.heap.length > 2) {
        let index = this.heap.length - 1;
        let parent = this.parent(index);

        while (this.heap[index] < this.heap[parent]) {
          if (index >= 1) {
            this.swap(this.heap, index, parent);
            index = parent;
            parent = this.parent(index);
          } else {
            break;
          }
        }
      }
    },
    remove: function () {
      let smallest = this.heap[1];
      let size = this.heap.length;

      if (size > 2) {
        this.heap[1] = this.heap[size - 1];
        this.heap.pop();

        if (this.heap.length === 3) {
          if (this.heap[1] > this.heap[2]) {
            this.swap(this.heap, 1, 2);
          }
          return smallest;
        }

        let index = 1;
        let left = this.left(index);
        let right = this.right(index);

        while (
          this.heap[index] >= this.heap[left] ||
          this.heap[index] >= this.heap[right]
        ) {
          if (this.heap[left] < this.heap[right]) {
            this.swap(this.heap, index, left);
            index = left;
          } else {
            this.swap(this.heap, index, right);
            index = right;
          }

          left = this.left(index);
          right = this.right(index);

          if (this.heap[left] === undefined || this.heap[right] === undefined) {
            break;
          }
        }
      } else if (size === 2) {
        this.heap.pop();
      } else {
        return null;
      }
      return smallest;
    },
  };
}

// Explanation:
// -Set heap to array with 0 index as null
// -For parent:
// -Return floor of index divided by 2
// -For left:
// -Return index * 2
// -For right:
// -Return (index * 2) + 1
// -For swap:
// -Swap index and target in input array
// -For insert:
// -Push val to heap
// -If heap size is greater than one element:
// -Set index to last element in heap
// -Get curr index parent
// -While curr index val is less than parent val:
// -Swap index with parent
// -If we get to top of heap after swapping, break
// -For remove:
// -Smallest equal to first element in heap
// -Size equal to heap length
// -If size > 2:
// -Set first element to last element in heap
// -Pop off last element from heap
// -If heap has two elements:
// -Swap first and second if second is smaller than first and return smallest
// -Else set index to 1
// -Get index's left and right children
// -While index >= left or right children
// -If left < right val, swap index and left and set index to left
// -Else swap index with right and set index to right
// -Once swap is done and index is reassigned, update left and right children
// -If new left or right is undefined, break out of loop as we've reached end of heap
// -Else if heap has one element, pop last element off
// -Else return null
// -After heapifying, return smallest

// Notes:
// -Time complexity: O(log n) for insertion and deletion

let h = new MinHeap();
h.insert(5);
h.insert(1);
h.insert(3);
h.insert(4);
h.insert(7);
console.log(h.getMin());
h.remove();
h.remove();
console.log(h.getMin());

// Finding K smallest elements with a Heap

function findKSmallest(nums, k) {
  let heap = new MaxHeap();

  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];

    if (i < k) {
      heap.insert(curr);
    } else if (curr < heap.getMax()) {
      heap.remove();
      heap.insert(curr);
    }
  }

  return heap.heap.slice(1);
}

// Explanation:
// -Create new max heap
// -Add first 0 through k elements to heap
// -For all subsequent elements past k:
// -If curr less than max, remove max and insert curr
// -Return heap list of k elements

// Notes:
// -Time complexity: O(n log k)
// -Space complexity: O(k)

console.log(findKSmallest([1, 10, 3, 5, 7, 4, 2], 4));

// Given a stream of integers, find their median. If an integer is added to the stream, you should be able to update the median quickly.

function medianStream() {
  return {
    low: new MaxHeap(),
    high: new MinHeap(),
    getMedian: function () {
      let low = this.low.heap;
      let high = this.high.heap;

      if (low.length < 2 && high.length < 2) {
        return false;
      }

      if (low.length === high.length) {
        return (this.low.getMax() + this.high.getMin()) / 2;
      }

      return this.high.getMin();
    },
    insert: function (val) {
      let low = this.low.heap;
      let high = this.high.heap;

      if (high.length < 2) {
        this.high.insert(val);
        return;
      }

      if (high.length === low.length) {
        if (val < this.low.getMax()) {
          this.high.insert(this.low.remove());
          this.low.insert(val);
        } else {
          this.high.insert(val);
        }
      } else {
        if (val > this.high.getMin()) {
          this.low.insert(this.high.remove());
          this.high.insert(val);
        } else {
          this.low.insert(val);
        }
      }
    },
  };
}

// Explanation:
// -Initiate lower half as max heap and higher half as min heap
// -For get median:
// -If low and high half are empty, return false
// -If low and high half are equal size, return (low max + high min) / 2
// -Else return high min
// -For insert:
// -If high half is empty, insert val into high half and return
// -If high half and low half are equal in size:
// -If val < low max, remove max from low half, insert it into high half, and insert val into low half
// -Else insert val into high half
// -Else if high half is greater in size than low half
// -If val greater than high half min, remove min from high half, insert it into low half, and insert val into high half
// -Else insert val into low half

// Notes:
// -Time complexity: O(log n) for insert and O(1) for median lookup
// -Space complexity: O(n)

let stream = new medianStream();
console.log(stream.getMedian());
stream.insert(1);
stream.insert(2);
stream.insert(3);
stream.insert(4);
console.log(stream.getMedian());
stream.insert(5);
console.log(stream.getMedian());