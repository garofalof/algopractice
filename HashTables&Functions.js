// Generate a hash function for a string

function hash(str) {
  let hash = 0;
  let x = 53;

  for (let i = 0; i < str.length; i++) {
    hash = hash * x + str.charCodeAt(i);
  }

  return hash;
}

// Explanation:
// -Create map of alphabet with assigned place
// -Set hash to 0 and x to any prime number
// -For each char in string:
// -Set hash to product of hash times prime plus curr char position in alphabet map
// -Once done iterating through string, return hash

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(hash('hello there my old friend'));

// String Search: Find the index where the larger string contains a target string

function stringSearch(str, target) {
  if (!str || !target) {
    return -1;
  }
  if (target.length === 0) {
    return 0;
  }
  if (target.length > str.length) {
    return -1;
  }

  let x = 53;
  let hashT = 0;
  let hash = 0;

  for (let i = 0; i < target.length; i++) {
    hashT = hashT * x + target.charCodeAt(i);
    hash = hash * x + str.charCodeAt(i);
  }

  if (hashT === hash && target === str.substring(0, target.length)) {
    return 0;
  }

  let xPow = 1;

  for (let i = 0; i < target.length - 1; i++) {
    xPow *= x;
  }

  for (let i = target.length; i < str.length; i++) {
    let toRemove = str.charCodeAt(i - target.length);
    hash = ((hash - toRemove * xPow)) * x + str.charCodeAt(i);
    if (hash === hashT && target === str.substring(i - target.length + 1, i + 1)) {
      return i - target.length + 1;
    }
  }

  return -1;
}

// Explanation:
// -If string or target null, return -1
// -If target empty string, return index 0, as empty string always exists in string
// -If target length > string length, return -1
// -Set x to prime
// -Calculate hash values for target and first portion of string equal to target length
// -If hash values are equal and target and first substring are equal, return index 0
// -Set xPow to greatest polynomial. We'll use xPow to calculate hash val for first char of each substring.
// -For each index in string starting at target length:
// -Remove first char hash val from hash and multiply x times char code at curr index in string
// -Check to see if hash vals and substrings are equal for string and target
// -If so, return curr index - target length + 1
// -If we iterate through full string without returning index, return -1 as no substring found

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(1)

console.log(stringSearch('hello', 'llo'));