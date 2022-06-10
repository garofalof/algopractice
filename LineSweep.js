// Given a list of time intervals, find if any of them overlap. Each interval has a start time and a stop time.

function findOverlap(intervals) {
  let map = {};

  for (let interval of intervals) {
    let [start, end] = [interval[0], interval[1]];
    if (map[start] || map[end]) {
      return true;
    }
    map[start] = true;
    map[end] = false;
  }

  let count = 0;

  for (let point in map) {
    let curr = map[point];

    if (curr === true) {
      count++;
    } else {
      count--;
    }

    if (count > 1) {
      return true;
    }
  }

  return false;
}

// Explanation:
// -Create map obj
// -For each interval in intervals:
// -If start or end already exist in map, return true
// -Else set map[start] to true and map[end] to false
// -Set count to zero
// -For each point in sorted map:
// -If curr point equals true, increase count by 1
// -Else decrease count by 1
// -If count > 1, we have more than two starts in a row so we return true
// -If we iterate through sorted map without returning true, no overlap found so we return false

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n)

console.log(
  findOverlap([
    [1, 3],
    [5, 7],
    [6, 9],
  ])
);

// Given a list of intervals, merge all overlapping intervals. At the end of the merge, there should be no overlapping intervals.

function mergeIntervals(intervals) {
  if (!intervals.length) {
    return intervals;
  }

  intervals.sort((a, b) => a[0] - b[0]);
  let result = [intervals[0]];

  for (let [start, end] of intervals) {
    let last = result.length - 1;
    if (start <= result[last][1]) {
      result[last][1] = Math.max(result[last][1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

// Explanation:
// -If interval list is empty, return empty array
// -Sort intervals
// -Set result to array containing first interval
// -For each interval in intervals:
// -If curr start <= prev end:
// -Set prev end to max of prev end or curr end
// -Else push interval to result
// -Once done iterating through list, return result

// Notes:
// -Time complexity: O(n log n), n for linear scan of list and log n for sort
// -Space complexity: O(n)

console.log(
  mergeIntervals([
    [7, 9],
    [1, 3],
    [6, 8],
    [3, 5],
  ])
);

// You are given a list of buildings that are part of a skyline. For each building, you are given the start, end, and height points. So if a building has [start=1, end=4, height=5], it represents a building of height 5 from point 1 on a number line to point 4.
// Given a list of such buildings that may overlap, you want to draw the skyline.

function drawSkyline(buildings) {
  let points = [];

  for (let [start, end, height] of buildings) {
    points.push([start, height], [end, -height]);
  }

  points.sort(([a, h1], [b, h2]) => a - b || h2 - h1);

  function addHeight(heights, height) {
    let left = 0;
    let right = heights.length - 1;

    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);

      if (height <= heights[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    heights.splice(left, 0, height);
  }

  let heights = [];
  let result = [];
  let prev = 0;

  for (let [point, height] of points) {
    if (height > 0) {
      addHeight(heights, height);
    } else {
      let index = heights.indexOf(-height);
      heights.splice(index, 1);
    }

    let curr = heights[heights.length - 1] || 0;

    if (curr !== prev) {
      result.push([point, curr]);
      prev = curr;
    }
  }

  return result;
}

// Explanation:
// -Create points array
// -For each building:
// -Push start / height and end / -height to points array
// -Sort from leftmost to rightmost points. If there's a tie, we first pick those points with higher height.
// -Set heights to empty array
// -Set result to empty array
// -Set prev height to 0
// -For each point in points:
// -If curr point height is positive, use binary search to add height to sorted position in list
// -Else if height is negative delete height from list
// -Set curr height to max height in list or 0 if height list is empty
// -If curr height not equal to prev height:
// -Push point and curr height to result
// -Set prev height to curr height
// -Once done iterating through points, return result

// Notes:
// -Time complexity: O(n^2), as we perform linear splice operation on every point. If we were to use max heap, we could bring down to O(n log n)
// -Space complexity: O(n)

console.log(
  drawSkyline([
    [2, 9, 10],
    [3, 7, 15],
    [5, 12, 12],
    [15, 20, 10],
    [19, 24, 8],
  ])
);
