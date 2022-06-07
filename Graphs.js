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

  let q = [str1];
  let edges = [];
  let visited = new Set();
  let levels = 0;

  while (q.length) {
    let word = q.pop();

    if (word === str2) {
      return levels + 1;
    }

    for (let i = 0; i < word.length; i++) {
      let root = word.substring(0, i) + '*' + word.substring(i + 1);

      for (let edge of (combinations[root] || [])) {
        if (!visited.has(edge)) {
          visited.add(edge);
          edges.push(edge);
        }
      }
    }

    if (q.length === 0) {
      q = edges;
      edges = [];
      levels++;
    }
  }

  return 0;
}

// Explanation:
// -For each word in dict, create roots and push words to root. For example, word 'dog' will exist in roots '*og', 'd*g', and 'do*'.
// -Add start string to queue
// -Create buffer array for edges
// -Create set of visited words
// -Set levels to 0
// -While queue has work:
// -Pop curr word from queue
// -If curr word equals end word, return levels + 1
// -For each char in curr word:
// -Create root
// -For each edge at curr root in map:
// -If edge not visited, add edge to visited and push edge to edges
// -Once curr level is done, update queue to edges and increase levels by 1
// -If while loop breaks, we return 0 as path not possible

// Notes
// -Time complexity: O(n * m^2), where n is the number of words in dict and m is the length of the longest word. This is due to substring operations in mapping process.
// -Space complexity: O(n * m^2), where n is the number of words in dict and m is the length of the longest word

console.log(wordLadder('hit', 'cog', ['hot','dot','dog','lot','log','cog']));

// Sort a graph in topological order

function topoSort(graph) {
  function dfs(node, stack) {
    node.state = 'Visiting';

    for (let edge of node.edges) {
      if (edge.state !== 'Visiting' && edge.state !== 'Visited') {
        dfs(edge, stack);
      }
    }

    node.state = 'Visited';
    stack.push(node);
  }

  let stack = [];

  for (let node of graph.nodes) {
    if (node.state !== 'Visiting' && node.state !== 'Visited') {
      dfs(node, stack);
    }
  }

  return stack;
}

// Explanation:
// -Set stack to empty array
// -For each node in graph:
// -If node unvisited:
// -Set node to visiting
// -For each node edge:
// -If edge unvisited, recurse on edge
// -At max depth, mark edge as visited and push node to stack
// -Once done recursing through graph, return stack

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
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
g.addNode(5);
g.addEdge(g.nodes[0], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[3]);
g.addEdge(g.nodes[2], g.nodes[4]);
g.addEdge(g.nodes[3], g.nodes[4]);
console.log(topoSort(g));

// Given a directed graph, find the length of the longest path in the graph. The path can start from any node, not necessarily a root node.

function findDiameter(root) {
  function topoSort(node) {
    function dfs(node, stack) {
      node.state = 'Visiting';

      for (let edge of node.edges) {
        if (edge.state !== 'Visiting' && edge.state !== 'Visited') {
          dfs(edge, stack);
        }
      }

      node.state = 'Visited';
      stack.push(node);
    }

    let stack = [];
    dfs(node, stack);
    return stack;
  }

  if (root === null) {
    return 0;
  }

  let stack = topoSort(root);
  console.log('stack is ', JSON.stringify(stack));

  for (let node of stack) {
    node.longestPath = 0;
  }

  let diameter = 0;

  while (stack.length) {
    let curr = stack.pop();
    diameter = Math.max(diameter, curr.longestPath);

    for (let edge of curr.edges) {
      if (curr.longestPath + 1 > edge.longestPath) {
        edge.longestPath = curr.longestPath + 1;
      }
    }
  }

  return diameter;
}

// Explanation:
// -If root is null, return 0
// -Set stack to topologically sorted graph
// -For each node in stack, set longest path to 0
// -Set initial diameter to 0
// -While stack has work:
// -Pop last node off stack
// -Update diameter to greater of diameter or curr node longest path
// -For each edge of curr node:
// -If curr longest path + 1 is greater than edge longest path, update edge longest path to curr longest path + 1
// -Once done iterating through stack, return diameter

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
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
          break;
        }
      }
    }
  };
}

let g = new Graph();
g.addNode('A'); 0
g.addNode('B'); 1
g.addNode('C'); 2
g.addNode('D'); 3
g.addNode('E'); 4
g.addNode('F'); 5
g.addNode('G'); 6
g.addNode('H'); 7
g.addNode('I'); 8
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[0], g.nodes[3]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[1], g.nodes[5]);
g.addEdge(g.nodes[3], g.nodes[4]);
g.addEdge(g.nodes[4], g.nodes[8]);
g.addEdge(g.nodes[5], g.nodes[6]);
g.addEdge(g.nodes[5], g.nodes[7]);
g.addEdge(g.nodes[7], g.nodes[8]);
console.log(findDiameter(g.nodes[0]));

// Given a graph, find if there is a cycle

function detectCycle(graph) {
  let { nodes } = graph;

  if (nodes.length === 0 || nodes === null) {
    return false;
  }

  function dfs(node) {
    node.state = 'Visiting';

    let { edges } = node;

    for (let edge of edges) {
      if (edge.state === 'Visiting' || dfs(edge)) {
        return true;
      }
    }

    node.state = 'Visited';
    return false;
  }

  for (let node of nodes) {
    console.log('on node: ', node);
    if (node.state === 'Visiting' || dfs(node)) {
      return true;
    }
  }

  return false;
}

// Explanation:
// -For each node in graph:
// -Perform dfs on node
// -While in dfs search:
// -Mark node as visiting
// -For each node's edge:
// -If node's edge is marked as visiting or result of dfs on edge is true, return true and exit
// -Else mark node as visited and return false
// -If we perform dfs on a node and its edges without finding a cycle, mark node as visited and return false

// Notes:
// -Time complexity: O(n + e), where n is number of nodes and e is number of edges
// -Space complexity: O(n)
// -We look for neighbors in visiting state, not visited. This is because if a neighbor has been visited, that means we have processed all nodes from that neighbor without finding a cycle.

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      this.nodes.push({ val, edges: [] });
    },
    addEdge: function(from, to) {
      for (let i = 0; i < this.nodes.length; i++) {
        let curr = this.nodes[i];
        if (curr === from) {
          this.nodes[i].edges.push(to);
          break;
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
g.addNode(5);
g.addEdge(g.nodes[1], g.nodes[0]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
console.log(detectCycle(g));

 // Given a graph, color its nodes with 2 colors - red and blue - such that no 2 neighbors have the same color

 function colorGraph(graph) {
   for (let node of graph.nodes) {
     node.state = 'Unvisited';
     node.level = -1;
   }

   let red = [];
   let blue = [];

   for (let node of graph.nodes) {
     if (node.state === 'Unvisited') {
       let groups = getBipartiteGroups(node);

       if (groups === null) {
         return null;
       }

       red.push(groups[0]);
       blue.push(groups[1]);
     }
   }

   return { red, blue };

   function getBipartiteGroups(start) {
     start.level = 0;
     start.state = 'Visiting';
     let queue = [start];
     let odds = [];
     let evens = [];

     while (queue.length) {
       let curr = queue.shift();

       if (curr.level % 2 === 0) {
         evens.push(curr);
       } else {
         odds.push(curr);
       }

       for (let edge of curr.edges) {
         if (edge.state === 'Unvisited') {
           edge.level = curr.level + 1;
           queue.push(edge);
           edge.state = 'Visiting';
         } else if (edge.level === curr.level) {
           return null;
         }
       }

       curr.state = 'Visited';
     }

     return [odds, evens];
   }
 }

 // Explanation:
 // -Map over nodes setting state to unvisited and level to -1
 // -Create red and blue arrays
 // -For each node in nodes:
 // -If state is unvisited:
 // -Set curr node level to 0 and push node to queue
 // -While queue has work:
 // -Dequeue curr node
 // -Add to odds or evens based on curr level
 // -For each edge in curr node's edges:
 // -If edge not visited:
 // -Set edge level to 1 + curr level, add edge to queue, and mark edge as visiting
 // -Else if edge level equals curr level, odd cycle found so we return null
 // -Once done iterating through edges, mark curr node as visited
 // -Once done iterating through queue, return odds and evens to curr node groups
 // -Push odds to red and evens to blue
 // -Once done iterating through nodes, return red and blue groups

 // Notes:
 // -Time complexity: O(n + e), where n is number of nodes and e is number of edges, if we can remove from queue in constant time. O(n^2 * e) if we use JS shift
 // -Space complexity: O(n), where n is number of nodes

 function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      this.nodes.push({ val, edges: [] });
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
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[3]);
g.addEdge(g.nodes[3], g.nodes[0]);
console.log(colorGraph(g));

// Given a graph, mark each connected component with a different color

function connectedColor(graph) {
  let color = 0;

  for (let node of graph.nodes) {
    if (!node.state) {
      color++;
      dfs(node, color);
    }
  }

  return graph;

  function dfs(node, color) {
    node.state = true;
    node.color = color;

    for (let edge of node.edges) {
      if (!edge.state) {
        dfs(edge, color);
      }
    }
  };
}

function Graph() {
  return {
    nodes: [],
    addNode: function(val) {
      this.nodes.push({ val, edges: [] });
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
g.addNode(5);
g.addNode(6);
g.addEdge(g.nodes[0], g.nodes[1]);
g.addEdge(g.nodes[1], g.nodes[2]);
g.addEdge(g.nodes[2], g.nodes[0]);
g.addEdge(g.nodes[3], g.nodes[4]);
g.addEdge(g.nodes[4], g.nodes[5]);
g.addEdge(g.nodes[5], g.nodes[3]);
console.log(connectedColor(g));

// You are given a 2d array of 1s and 0s. 1 denotes land and 0 denotes water. Land can be connected diagonally or on either 4 ends. You want to find the number of islands in the array.

function countIslands(matrix) {
  let count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let curr = matrix[row][col];

      if (curr === 1) {
        count++;
        dfs(matrix, row, col);
      }
    }
  }

  function dfs(matrix, row, col) {
    if (row < 0 || col < 0 || row >= matrix.length || col >= matrix[row].length || matrix[row][col] === 0) {
      return;
    }

    matrix[row][col] = 0;
    let directions = [0, 1, 0, -1, 0];

    for (let i = 0; i < directions.length - 1; i++) {
      dfs(matrix, row + directions[i], col + directions[i + 1]);
    }
  }

  return count;
}

// Explanation:
// -Set count to 0
// -For each node in matrix:
// -If node equals 1:
// -Increase count by 1
// -Perform dfs on node
// -In dfs:
// -Base case: if node out of bounds or equal to 0, return and exit dfs
// -Set node to 0, as we don't want to revisit
// -Recurse on left, right, up, and down neighbors of node
// -Once done recursing, return count

// Notes:
// -Time complexity: O(r + c), where r is number of rows and c is number of columns
// -Space complexity: O(r + c) on the recursion stack

console.log(countIslands([
  [1, 0, 1, 0, 1],
  [1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1]
]));