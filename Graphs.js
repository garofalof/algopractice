// Implement an adjacency list

function Graph() {
  return {
    nodes: [],
    edges: [],
    addNode: function(val) {
      this.nodes.push(val);
    },
    contains: function(val) {
      return this.nodes.includes(val);
    },
    removeNode: function(val) {
      let curr = this.nodes.indexOf(val);
      this.nodes.splice(curr, 1);
      for (let i = 0; i < this.edges.length; i++) {
        let curr = this.edges[i];
        if (curr[0] === val || curr[1] === val) {
          this.edges.splice(i, 1);
        }
      }
    },
    hasEdge: function(from, to) {
      for (let i = 0; i < this.edges.length; i++) {
        let curr = this.edges[i];
        if (curr[0] === from && curr[1] === to || curr[0] === to && curr[1] === from) {
          return true;
        }
      }
      return false;
    },
    addEdge: function(from, to) {
      if (this.hasEdge(from, to)) {
        return;
      }
      this.edges.push([from, to]);
    },
    removeEdge: function(from, to) {
      if (!this.hasEdge(from, to)) {
        return;
      }
      let curr = this.edges.indexOf([from, to]);
      this.edges.splice(curr, 1);
    }
  };
}

// Explanation:
// -Store nodes and edges in separate arrays
// -For add node, push to nodes array
// -For contains, check to see if nodes list includes val
// -For remove node, remove node from node list and then remove all edges related to that node
// -For has edge, check to see if from / to exist in edge list
// -For add edge, if edge doesn't exist push it to list
// -For remove edge, if edge exists remove it from list

// Notes:
// For add node:
// -Time complexity: O(1)
// For contains:
// -Time complexity: O(n)
// For remove node:
// -Time complexity: O(n + m ^ 2), where n is length of nodes and m is length of edges
// For has edge:
// -Time complexity: O(n)
// For add edge:
// -Time complexity: O(1)
// -For remove edge:
// -Time complexity: O(n)

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
console.log(g.contains(3));
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(2, 3);
g.addEdge(3, 4);
console.log(g.hasEdge(2, 3));
g.removeEdge(1, 2);
console.log(g);
g.removeNode(1);
console.log(g);

// Given a graph and a target number T, find T exists in the graph

function findNode(graph, target) {
  function dfs(node, target) {
    node.state = 'Visiting';

    if (node.val === target) {
      return true;
    }

    for (let edge of node.edges) {
      if (edge.state === 'Unvisited' && dfs(edge, target)) {
        return true;
      }
    }

    node.state = 'Visited';
    return false;
  }

  let nodes = graph.nodes;

  for (let node of nodes) {
    node.state = 'Unvisited';
  }

  for (let node of nodes) {
    if (node.state === 'Unvisited' && dfs(node, target)) {
      return true;
    }
  }

  return false;
}

// Explanation:
// -For each node in graph, mark state as unvisited
// -For each node in graph:
// -If state is unvisited and dfs returns true, we return true
// -For dfs:
// -Set node state to visiting
// -If node val equals target, we return true
// -For each edge:
// -Check to see if edge is unvisited and dfs returns true
// -If so, we return true and exit our search
// -Else, we mark node as visited and return false
// -If we're done recursing without returning true, we return false

// Notes:
// -Time complexity: O(n + e), where n are nodes and e are edges
// -Space complexity: O(n), where n is the amount of nodes. We take O(n) space for both recursion stack and for storing state of each node

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      let node = { val, edges: [] };
      this.nodes.push(node);
    },
    addEdge: function(from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].edges.push(to);
        }
        if (curr === to) {
          this.nodes[i].edges.push(from);
        }
      }
    }
  };
}

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[0], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
console.log(findNode(g, 5));
console.log(findNode(g, 1));
console.log(findNode(g, 2));
console.log(findNode(g, 3));
console.log(findNode(g, 4));
console.log(findNode(g, 5));

// Given an directed graph, make a copy

function cloneGraph(root) {
  function dfs(root, map) {
    root.state = 'Visiting';
    let edges = root.edges;

    for (let edge of edges) {
      if (!map.has(edge)) {
        map.set(edge, edge);
      }
      if (edge.state !== 'Visiting' && edge.state !== 'Visited') {
        dfs(edge, map);
      }
    }

    root.state = 'Visited';
  }

  if (root === null) {
    return null;
  }

  let map = new Map();
  let rootCopy = root;

  map.set(root, rootCopy);
  dfs(root, map);

  let graph = { nodes: [] };

  for (let node of map.entries()) {
    graph.nodes.push(node[1]);
  }

  return graph;
}


// Explanation:
// -Create map and copy of root
// -Set key / value of root and root copy in map
// -Perform dfs on root and root copy
// -For each node in dfs:
// -Mark state as visiting
// -For each edge in curr node edges:
// -Set edge in map if it doesn't exist
// -If edge is unvisited, perform dfs on curr edge
// -Once we visit all edges, mark node as visited
// -Once done with dfs, push copied nodes to graph and return graph

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n + e), where n is number of nodes and e is number of edges

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      let node = { val, edges: [] };
      this.nodes.push(node);
    },
    addEdge: function(from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].edges.push(to);
        }
        if (curr === to) {
          this.nodes[i].edges.push(from);
        }
      }
    }
  };
}

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[0], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
console.log(cloneGraph(g.nodes[0]));

// Given a graph and a target number, find if target exists in the graph

function Queue() {
  return {
    queue: {},
    front: 0,
    back: 0,
    enqueue: function(val) {
      this.queue[this.back] = val;
      this.back++;
    },
    dequeue: function() {
      let curr = this.queue[this.front];
      delete this.queue[this.front];
      this.front++;
      return curr;
    }
  }
}

function findTarget(root, target) {
  root.state = 'Visiting';
  let q = new Queue();
  q.enqueue(root);

  while (Object.keys(q.queue).length) {
    let curr = q.dequeue();

    if (curr.val === target) {
      return true;
    }

    for (let edge of curr.edges) {
      if (edge.state !== 'Visiting' && edge.state !== 'Visited') {
        edge.state = 'Visiting';
        q.enqueue(edge);
      }
    }

    curr.state = 'Visited';
  }

  return false;
}

// Explanation:
// -Set root node state to visiting
// -Implement queue
// -Add root node to queue
// -While queue has work:
// -Dequeue last node
// -If node val equals target, return true
// -For each edge in curr node edges:
// -If edge unvisited, set edge state to visit and add to queue
// -After adding edges to queue, set curr node state to visited
// -If we work through all nodes and don't return true, return false

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n), where n is number of nodes. We can store at most n nodes on the queue, and we also use n space to store state of each node

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      let node = { val, edges: [] };
      this.nodes.push(node);
    },
    addEdge: function(from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].edges.push(to);
        }
        if (curr === to) {
          this.nodes[i].edges.push(from);
        }
      }
    }
  };
}

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[0], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
console.log(findTarget(g.nodes[0], 4));
console.log(findTarget(g.nodes[0], 5));

// Given a graph and a node, print the graph in order of distance from node. All nodes of distance 1 from node, followed by nodes of distance 2 from node, etc.

function Queue() {
  return {
    queue: {},
    front: 0,
    back: 0,
    enqueue: function(val) {
      this.queue[this.back] = val;
      this.back++;
    },
    dequeue: function() {
      let curr = this.queue[this.front];
      delete this.queue[this.front];
      this.front++;
      return curr;
    }
  };
}

function printLevels(root) {
  let curr = new Queue();
  let next = new Queue();
  root.state = 'Visiting';
  curr.enqueue(root);

  let result = '';

  while (Object.keys(curr.queue).length) {
    let node = curr.dequeue();
    result += node.val + ' ';

    for (let edge of node.edges) {
      if (edge.state !== 'Visiting' && edge.state !== 'Visited') {
        next.enqueue(edge);
        edge.state = 'Visiting';
      }
    }

    node.state = 'Visited';

    if (Object.keys(curr.queue).length === 0) {
      result += '\n';
      curr = next;
      next = new Queue();
    }
  }

  return result;
}

// Explanation:
// -Implement queues for curr and next
// -Set root state to visiting
// -Add root to curr queue
// -Set result to empty string
// -While curr queue has work:
// -Set node to last element in curr
// -Add node to result on curr line
// -For each edge of node edges:
// -If edge is unvisited, add to next queue and update edge state to visiting
// -Once done adding edges, set curr node state to visited
// -If curr queue is empty:
// -Add new line to result and update curr queue to next and next to empty queue
// -Once done iterating through graph, return result

// Notes:
// -Time Complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n), where n is number of nodes

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      let node = { val, edges: [] };
      this.nodes.push(node);
    },
    addEdge: function(from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].edges.push(to);
        }
        if (curr === to) {
          this.nodes[i].edges.push(from);
        }
      }
    }
  };
}

let g = new Graph();
g.addNode(1);
g.addNode(2);
g.addNode(3);
g.addNode(4);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[0], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
console.log(printLevels(g.nodes[0]));

// You are given 2 words, both of the same length. Your task is to transform one word to another changing only one letter each time. Each intermediate word should be a valid word in the dictionary. Print out the length of the path.

function Queue() {
  return {
    queue: {},
    front: 0,
    back: 0,
    enqueue: function(val) {
      this.queue[this.back] = val;
      this.back++;
    },
    dequeue: function() {
      let curr = this.queue[this.front];
      delete this.queue[this.front];
      this.front++;
      return curr;
    }
  };
}

function wordLadder(str1, str2, dict) {
  let combinations = {};

  for (let word of dict) {
    for (let i = 0; i < word.length; i++) {
      let root = word.substring(0, i) + '*' + word.substring(i + 1);
      if (combinations[root] === undefined) {
        combinations[root] = [];
      }
      combinations[root].push(word);
    }
  }

  let q = new Queue();
  let visited = new Set();
  let levels = 0;
  q.enqueue(str1);

  while (Object.keys(q.queue).length) {
    let word = q.dequeue();

    if (word === str2) {
      return levels + 1;
    }

    for (let i = 0; i < word.length; i++) {
      let root = word.substring(0, i) + '*' + word.substring(i + 1);

      for (let edge of (combinations[root] || [])) {
        if (!visited.has(edge)) {
          visited.add(edge);
          q.enqueue(edge);
        }
      }
    }

    levels++;
  }

  return -1;
}

console.log(wordLadder('hit', 'cog', ['hot','dot','dog','lot','log','cog']));