// Implement a trie

function Node() {
  return {
    keys: new Map(),
    wordEnd: false,
    setEnd: function(val) {
      this.wordEnd = val;
    },
    isEnd: function() {
      return this.wordEnd;
    }
  };
}

function Trie() {
  return {
    root: new Node(),
    insert: function(input) {
      let node = this.root;

      for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (!node.keys.has(char)) {
          let temp = new Node();
          node.keys.set(char, temp);
          node = temp;
        } else {
          node = node.keys.get(char);
        }
      }

      node.setEnd(true);
    },
    search: function(input) {
      let node = this.root;

      for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (node.keys.has(char)) {
          node = node.keys.get(char);
        } else {
          return false;
        }
      }

      return node.isEnd();
    },
    delete: function(input) {
      let node = this.root;

      for (let i = 0; i < input.length; i++) {
        let char = input[i];

        if (node.keys.has(char)) {
          node = node.keys.get(char);
        } else {
          return false;
        }
      }

      node.setEnd(false);
      return true;
    }
  };
}

// Explanation:
// -Implement node:
// -Set keys to empty hashmap
// -Set word end to false
// -For set end function:
// -Set word end to input boolean
// -For is end function:
// -Return word end
// -Implement trie:
// -Set root to new node
// -For insert function:
// -Set node pointer to root
// -For each char in input:
// -If curr node does not contain char, set temp to new node, set char / temp to node keys, and update node to temp
// -Else set node to char node in node keys
// -Once done iterating through input, set end to true on curr node
// -For search function:
// -Set node pointer to root
// -For each char in input:
// -If curr node has char, set curr to next node
// -Else return false
// -Once done searching, return is end on curr node
// -For delete function:
// -Set curr node to root
// -For each char in input:
// -If curr node has char, set curr to next node
// -Else return false
// -Once done iterating through input, set end to false and return true

// Notes:
// -Time complexity: O(n) for all operations, where n is the length of the input word
// -Space complexity: O(1) for search, O(n) for storing new nodes, and O(1) for delete

let t = new Trie();
t.insert('hello');
t.insert('hearsay');
t.insert('her');
t.insert('hero');
t.insert('apple');
t.insert('chapstick');
t.search('hear');
t.search('hearsay');
t.delete('her');
console.log(t.root);