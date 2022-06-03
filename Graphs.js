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