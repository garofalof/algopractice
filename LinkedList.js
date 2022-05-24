// Implement a linked list

function LinkedList() {
  return {
    head: null,
    tail: null,
  };
}

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

// Write a function to get the Nth node in a linked list

function getNthNode(list, n) {
  let node = list.head;
  for (let i = 0; i < n - 1; i++) {
    if (node.next !== null) {
      node = node.next;
    } else {
      node = -1;
      break;
    }
  }
  return node;
}

// Explanation:
// -Set curr node to list
// -Iterate up to n - 1
// -If next node isn't null, set curr node to next node
// -Else if null set curr node to -1 and break, as list isn't long enough
// -Once done iterating, return node

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(getNthNode(list, 3));

// Implement a function that adds a node to a linked list

function addNode(list, val) {
  let node = new ListNode(val);
  if (list.head === null) {
    list.head = node;
    list.tail = list.head;
  } else {
    list.tail.next = node;
    list.tail = list.tail.next;
  }
  return list;
}

// Explanation:
// -Create new node from val
// -If head is null, set head to node and set tail to head
// -Else set tail.next to node and tail to tail.next
// -If done, return list

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(addNode(list, 2));

// You are given a Linked List with nodes that have values 0, 1 or 2. Sort the linked list.

function sortList(list) {
  let ll0 = new LinkedList();
  let ll1 = new LinkedList();
  let ll2 = new LinkedList();
  let curr = list.head;

  while (curr !== null) {
    if (curr.val === 0) {
      ll0 = addNode(ll0, 0);
    }
    if (curr.val === 1) {
      ll1 = addNode(ll1, 1);
    }
    if (curr.val === 2) {
      ll2 = addNode(ll2, 2);
    }
    curr = curr.next;
  }

  if (ll0.tail !== null) {
    ll0.tail.next = null;
  }
  if (ll1.tail !== null) {
    ll1.tail.next = null;
  }
  if (ll2.tail !== null) {
    ll2.tail.next = null;
  }

  function appendList(toAppend, original) {
    if (toAppend.head === null) {
      return;
    }
    original = addNode(original, toAppend.head);
    original.tail = toAppend.tail;
  }

  let result = new LinkedList();
  appendList(ll0, result);
  appendList(ll1, result);
  appendList(ll2, result);

  return result;
}

// Explanation:
// -Create new linked lists for nums 0, 1, and 2
// -Set curr to list head
// -Iterate through unsorted list
// -Add node to appropriate list
// -Updated to curr to curr.next
// -Once done iterating through list, create next values on each list tail
// -Create new result list
// -Append each list in order on result and return result

let list = new LinkedList();
list.head = new ListNode(0);
let head = list.head;
head.next = new ListNode(1);
let child = head.next;
child.next = new ListNode(0);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(sortList(list));

// Given a Linked List L, separate it into 2 Linked Lists. One contains L's odd nodes and the other contains L's even nodes.
// For example:
// Input: Head -> 1 -> 2 -> 3 -> 4 -> 5
// Result 1: Head -> 1 -> 3 -> 5
// Result 2: Head -> 2 -> 4
// Note: Odd and Even here refer to the node's position, not value.

function getOddEven(list) {
  let odd = new LinkedList();
  let even = new LinkedList();
  let curr = list.head;
  let index = 0;
  while (curr !== null) {
    index++;
    desination = index % 2 === 0 ? even : odd;
    addNode(desination, curr);
    curr = curr.next;
  }
  if (even.tail !== null) {
    even.tail.next = null;
  }
  if (odd.tail !== null) {
    odd.tail.next = null;
  }
  return { odd, even };
}

// Explanation:
// -Set odd and even to empty linked lists
// -Set curr to list head
// -Loop through list
// -Increase index by 1
// -If index even, add node to even list, else add to odd list
// -Update curr to curr.next
// -If tail exists for each list, set tail.next to null
// -Return odd and even

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(getOddEven(list));

// Given a linked list and pointer to a node N, delete N from the linked list in constant time

function deleteNode(list, n) {
  n.val = n.next.val;
  n.next = n.next.next;
  return list;
}

// Explanation:
// -Set n.val to n.next.val and n.next to n.next.next

// Notes:
// -Doesn't work for tail

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(deleteNode(list, list.head));

// Given a linked list, find if it has a cycle

function findCycle(list) {
  let fast = list.head;
  let slow = list.head;
  while (fast !== null) {
    fast = fast.next;
    if (fast === slow) {
      return true;
    }
    if (fast !== null) {
      fast = fast.next;
      if (fast === slow) {
        return true;
      }
    }
    slow = slow.next;
  }
  return false;
}

// Explanation:
// -Set fast and slow pointers to list head
// -While fast not null
// -Set fast to fast.next
// -If fast equals slow, return true
// -If fast not null
// -Set fast to fast.next and check if fast equals slow. If fast slow, return true.
// -Once done incrementing fast pointer and checking if equal to slow, set slow to slow.next
// -If break out of while loop, no cycle found so we return false

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
thirdChild.next = child;

console.log(findCycle(list));

// Given a linked list that has a cycle, find the length of the cycle. The length is in number of nodes.

function LinkedList() {
  return {
    head: null,
    tail: null,
  };
}

function ListNode(val) {
  return {
    val,
    next: null,
  };
}

function findCycleLength(list) {
  let fast = list.head;
  let slow = list.head;
  while (fast !== null) {
    fast = fast.next;
    if (fast === slow) {
      break;
    }
    if (fast !== null) {
      fast = fast.next;
      if (fast === slow) {
        break;
      }
    }
    slow = slow.next;
  }
  if (fast === null) {
    return -1;
  }
  fast = fast.next;
  let nodesPassed = 1;
  while (fast !== slow) {
    fast = fast.next;
    nodesPassed++;
  }
  return nodesPassed;
}

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
thirdChild.next = child;

console.log(findCycleLength(list));

// Explanation:
// -Set fast and slow pointers to head
// -While fast not null
// -Set fast to fast.next
// -If fast equals slow, break
// -If fast not null:
// -Set fast to fast.next
// -If fast equals slow, break
// -Set slow to slow.next
// -Once done iterating, if fast equals null return -1 as no cycle found
// -If cycle found, set fast to fast.next and set node count
// -Loop through cycle until fast and slow meet
// -On each cycle, update fast to fast.next and increase node count by one
// -Once fast and slow meet, return node count

// Notes:
// -Time complexity: O(n). At most you'll do two loops through cycle before fast and slow meet.
// -Space complexity: O(1)

// Find the median node of a linked list
// For example: 1 -> 2 -> 3 -> 4 -> 5
// Median node is: 3

function findMedianNode(list) {
  if (list.head === null || list.tail === null) {
    return null;
  }
  let fast = list.head;
  let slow = list.head;
  while (fast.next !== null) {
    fast = fast.next;
    if (fast.next !== null) {
      fast = fast.next;
      slow = slow.next;
    }
  }
  return slow;
}

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(findMedianNode(list));

// Explanation:
// -Check to see if list is greater than zero or one node
// -Set fast and slow pointers to head
// -While fast.next is not null
// -Set fast to fast.next
// -If fast.next not null, set fast to fast.next and slow to slow.next
// -Once fast pointer reaches end of list, return slow pointer

// Notes:
// -Time complexity: O(n), as we visit each node only once
// -Space complexity: O(1)

// Given a linked list with a cycle, find the node where the cycle begins.

function findCycleStart(list) {
  let fast = list.head;
  let slow = list.head;
  while (fast !== null) {
    fast = fast.next;
    if (fast === slow) {
      break;
    }
    if (fast !== null) {
      fast = fast.next;
      if (fast === slow) {
        break;
      }
    }
    slow = slow.next;
  }
  if (fast === null) {
    return null;
  }
  fast = fast.next;
  let cycleLength = 1;
  while (fast !== slow) {
    fast = fast.next;
    cycleLength++;
  }
  let front = list.head;
  let back = list.head;
  for (let i = 0; i < cycleLength; i++) {
    front = front.next;
  }
  while (front !== back) {
    front = front.next;
    back = back.next;
  }
  return front;
}

// Explanation:
// -Set fast and slow pointers to list head
// -Iterate through list until either fast and slow are equal or no cycle found
// -Once done iterating, if fast equals null no cycle found so we return null
// -Set fast to fast.next and start cycle length variable at 1
// -Move fast to fast.next and increase length by one until fast equals slow
// -Set front and back nodes to list head
// -Keep increasing front until we hit cycle length
// -Keep increasing front and back until they are equal
// -When front and back are equal, we return front as we've found cycle start

// Notes:
// Time Complexity: O(n)
// Space Complexity: O(1)

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
thirdChild.next = child;

console.log(findCycleStart(list));

// Implement a Least Recently Used (LRU) cache

function LRUCache(capacity) {
  return {
    map: new Map(),
    capacity,
    get: function (key) {
      if (!this.map.has(key)) {
        return -1;
      }
      let val = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, val);
      return val;
    },
    put: function (key, val) {
      this.map.delete(key);
      this.map.set(key, val);
      if (this.map.size > this.capacity) {
        let first = this.map.keys().next().value;
        this.map.delete(first);
      }
      return this.map;
    },
  };
}

let cache = new LRUCache(5);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
cache.put(4, 4);
cache.put(5, 5);
cache.put(6, 6);
cache.get(2);
cache.get(3);
cache.get(4);

console.log(cache);

// Explanation:
// -Return object with properties map, capacity, get, and put
// -For get property:
// -If key doesn't exist in map, return -1
// -Get key and set to temp value
// -Delete key from curr position in list
// -Set key, val pair at end of list
// -For put property:
// -Delete key
// -Set key, val pair at beginning of list
// -Check if cache size exceeds capacity
// -If so, grab first value and delete

// Notes:
// -Time complexity: O(1) for both reads and writes
// -Space complexity: O(n), where n is the amount of data in cache

// Given two strings S and T, return the minimum window substring of S such that every character in T (including duplicates) is included in the window.

const s = "ADOBECODEBANC";
const t = "ABC";

function minWindow(s, t) {
  let charCount = t.length;
  let minLength = Infinity;
  let minStartIndex = 0;
  let char = new Map();

  for (let i = 0; i < t.length; i++) {
    let curr = t[i];
    char[curr] = (char[curr] || 0) + 1;
  }

  let l = 0;
  let r = 0;

  while (r < s.length) {
    if (char[s[r]] > 0) {
      charCount--;
    }
    char[s[r]]--;
    r++;
    while (charCount === 0) {
      if (r - l < minLength) {
        minLength = r - l;
        minStartIndex = l;
      }
      char[s[l]]++;
      if (char[s[l]] > 0) {
        charCount++;
      }
      l++;
    }
  }
  return minLength === Infinity
    ? ""
    : s.substring(minStartIndex, minStartIndex + minLength);
}

// Explanation:
// -Set char count to length of t. Each time we encounter a character in t, we decrement char count until we reach zero.
// -Set minLength to Infinity. We'll update minLength when right - left < minLength.
// -Set minStartIndex to zero. We'll update minStartIndex to left index every time right - left < minLength.
// -Set char to empty map. We'll use map to check chars as we traverse s.
// -Loop through t and add count to char map
// -Set left and right pointer to zero
// -While right index less than s length:
// -If char at right pointer in t and count greater than 0, decrement charCount
// -Decrement char at right pointer by 1 in char map
// -Increase right pointer index by 1
// -Once all characters in t have been encountered in s:
// -If right - left < minLength, update minLength to right - left and set minStartIndex to left pointer index
// -Increase char at left pointer by 1 in char map
// -If char at left pointer in char map > 0, increase charCount by 1
// -Increase left pointer index by 1
// -Once done iterating, check to see if minLength equals Infinity. If so, return empty string as no substring found, else return substring expanding out from minStartIndex

// Notes:
// -Time complexity: O(n), where n is length of string s. We iterate through the entire doc and we do O(1) work at each step.
// -Space complexity: O(n), where n is the length of string s. At worst, the result might contain the entire string.

console.log(minWindow(s, t));

// Reverse a linked list in place

function reverseLinkedList(list) {
  let prev = null;
  let curr = list.head;

  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// Explanation:
// -Set prev to null and curr to head
// -While curr not null:
// -Set temp variable next to curr.next
// -Set curr.next to prev
// -Set prev to curr
// -Set curr to next
// -Once done iterating through list, return prev

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

let list = new LinkedList();
list.head = new ListNode(5);
let head = list.head;
head.next = new ListNode(4);
let child = head.next;
child.next = new ListNode(3);
let secondChild = child.next;
secondChild.next = new ListNode(2);
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(reverseLinkedList(list));

// Given a linked list, determine if it is a palindrome

function linkedListPalindrome(list) {
  if (list.head === null) {
    return false;
  }

  function findMedian(list) {
    let fast = list.head;
    let slow = list.head;
    while (fast.next !== null) {
      fast = fast.next;
      if (fast.next === null) {
        break;
      }
      fast = fast.next;
      slow = slow.next;
    }
    return slow;
  }

  function reverse(node) {
    let prev = null;
    let curr = node;
    while (curr !== null) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev;
  }

  let median = findMedian(list);
  let last = reverse(median);
  let start = list.head;
  let end = last;

  while (start !== null && end !== null) {
    if (start.val !== end.val) {
      return false;
    }
    start = start.next;
    end = end.next;
  }

  return true;
}

// Explanation:
// -If list head is null, return false as linked list is empty
// -Set median to median node using slow and fast pointer helper function
// -Reverse back half of list starting at median using reverse helper function and set last to new median node
// -Set start to list head and end to last
// -While start and end not null:
// -If start val and end val not equal, return false as no palindrome present
// -Else set start to start.next and end to end.next
// -If iterate through whole list without returning false, list is palindrome so we return true

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

let list = new LinkedList();
list.head = new ListNode('A');
let head = list.head;
head.next = new ListNode('B');
let child = head.next;
child.next = new ListNode('B');
let secondChild = child.next;
secondChild.next = new ListNode('A');
let thirdChild = secondChild.next;
list.tail = thirdChild;

console.log(linkedListPalindrome(list));