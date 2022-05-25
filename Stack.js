// Find if a given number N exists in a stack S

function findN(num, stack) {
  let found = false;

  while (stack.length) {
    let curr = stack.pop();
    if (curr === num) {
      found = true;
      break;
    }
  }
  return found;
}

// Explanation:
// -Set found variable to false. If we find num, we'll update to true
// -While stack has nums:
// -Set curr to stack.pop()
// -If curr equals num, set found to true and break
// -Once done iterating, return found

console.log(findN(9, [1, 7, 9, 3, 2]));

// Implement a queue using 2 stacks

function queue() {
  return {
    s1: [],
    s2: [],
    enqueue: function (val) {
      this.s1.push(val);
    },
    dequeue: function () {
      while (this.s1.length) {
        this.s2.push(this.s1.pop());
      }
      return this.s2.pop();
    },
  };
}

// Explanation:
// -Set stack 1 and 2 to empty array
// -For enqueue function, push val to stack 1
// -For dequeue function, flush stack 1 vals to stack 2
// -Once done flushing, return popped val from stack 2

// Notes:
// -Time complexity: O(1) for enqueue function. For dequeue, worst case is O(n) because we might flush s1 to s2, but subsequent dequeue functions are O(1) so time complexity is O(1) amortized.
// -Space complexity: O(1) because the only memory we're allocating are the two stack pointers

let q = new queue();
q.enqueue(5);
q.enqueue(4);
q.enqueue(3);
q.enqueue(2);
q.enqueue(1);
q.dequeue();
q.dequeue();
q.dequeue();

console.log(q);

// Use an array to implement 2 stacks

function twoStacks(n) {
  return {
    size: n,
    s1: -1,
    s2: n,
    arr: [],
    push1: function (e) {
      if (this.s1 < this.s2 - 1) {
        this.s1++;
        this.arr[this.s1] = e;
      } else {
        return false;
      }
    },
    push2: function (e) {
      if (this.s1 < this.s2 - 1) {
        this.s2--;
        this.arr[this.s2] = e;
      } else {
        return false;
      }
    },
    pop1: function () {
      if (this.s1 >= 0) {
        let e = this.arr[this.s1];
        this.s1--;
        return e;
      } else {
        return false;
      }
    },
    pop2: function () {
      if (this.s2 < this.size) {
        let e = this.arr[this.s2];
        this.s2++;
        return e;
      } else {
        return false;
      }
    },
  };
}

// Explanation:
// -Set size to provided param n, stack 1 pointer to -1, stack 2 pointer to n, and arr to empty array
// -For pushing to stack 1, we check to see if stack 1 pointer is less than stack 2 pointer minus 1
// -If so, we increase stack 1 pointer by 1 and add element at that index
// -For pushing to stack 2, we perform the same check
// -If so, we decrease stack 2 pointer by 1 and add element at that index
// -For popping from stack 1, we check to see if the pointer is >= index 0
// -If so, we store element at stack 1 pointer index, decrement pointer index by 1, and return popped element
// -For popping from stack 2, we check to see if stack 2 pointer is under array size
// -If so, we store element at stack 2 pointer index, increase pointer index by 1, and return popped element

let stack = new twoStacks(10);
stack.push1(1);
stack.push1(2);
stack.push1(3);
stack.push2(1);
stack.push2(2);
stack.push2(3);
console.log(stack.pop1());
console.log(stack.pop2());

// Implement a stack with a max() function. This function runs in O(1) time and returns the value of the maximum number on the stack.

function stackWithMax() {
  return {
    main: [],
    max: [],
    push: function (e) {
      this.main.push(e);
      let last = this.max.length - 1;
      if (last < 0 || e >= this.max[last]) {
        this.max.push(e);
      }
    },
    findMax: function () {
      let last = this.max.length - 1;
      if (last < 0) {
        return false;
      }
      return this.max[last];
    },
    pop: function () {
      let curr = this.main.pop();
      let last = this.max.length - 1;
      if (curr === undefined) {
        return false;
      }
      if (this.max[last] === curr) {
        this.max.pop();
      }
      return curr;
    },
  };
}

// Explanation:
// -Set main and max to empty arrays
// -For push function, first push element to main. Then check to see if max is empty or if curr element is greater than last in max
// -If so, push element to max
// -For find max function, first check to see if max is empty.
// -If so, return false. Else, return last val in max.
// -For pop function, set curr to main.pop()
// -If curr is undefined, main array is empty so we return false
// -If max val equals curr, we pop max val off max list
// -Finally, we return curr

let stack = new stackWithMax();
stack.push(1);
stack.push(3);
stack.push(9);
stack.push(7);
stack.pop();
stack.pop();
console.log(stack.findMax());

// Given an arithmetic expression with *, /, - & + operators and single digit numbers, evaluate it and return the result

function evaluateExpression(exp) {
  function isOperand(num) {
    return num >= 0 && num <= 9;
  }

  function process(operator, operand) {
    let num2 = operand.pop();
    let num1 = operand.pop();
    let op = operator.pop();
    let result = 0;
    if (op === "/") {
      result = num1 / num2;
    } else if (op === "*") {
      result = num1 * num2;
    } else if (op === "+") {
      result = num1 + num2;
    } else {
      result = num1 - num2;
    }
    operand.push(result);
  }

  exp = exp.split(" ");
  let operand = [];
  let operator = [];
  let precedence = {
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1,
  };

  for (let char of exp) {
    if (isOperand(Number(char))) {
      operand.push(Number(char));
    } else if (precedence[char]) {
      let lastOperator = operator.length - 1;
      while (
        operator.length &&
        precedence[operator[lastOperator]] >= precedence[char]
      ) {
        process(operator, operand);
      }
      operator.push(char);
    }
  }

  while (operator.length) {
    process(operator, operand);
  }

  return operand.pop();
}

// Explanation:
// -Split string into array to get rid of empty spaces
// -Set operand and operator stacks to empty arrays
// -Create precedence object w/ greater weight for division and multiplication
// -For each char in expression array:
// -If char is operand, push to operand stack
// -Else if char is an operator:
// -While operator stack has operations and last operator in operator stack has higher precedence than curr operator:
// -Process operations
// -Once done processing operations, push operator to operator stack
// -While operator stack has nums, process final operations
// -Once done process final operations, return last num in operand stack

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n), as we store a copy of operand / operator in each of the stacks

console.log(evaluateExpression("1 / 3 + 2"));

// Given an arithmetic expression with *, /, - & + operators and single digit numbers, evaluate it and return the result. The expression can also contain parantheses.

function evaluateExpressionWithParen(exp) {
  function isOperand(num) {
    return num >= 0 && num <= 9;
  }

  function process(operator, operand) {
    let num2 = operand.pop();
    let num1 = operand.pop();
    let op = operator.pop();
    let result = 0;
    if (op === "/") {
      result = num1 / num2;
    } else if (op === "*") {
      result = num1 * num2;
    } else if (op === "+") {
      result = num1 + num2;
    } else {
      result = num1 - num2;
    }
    operand.push(result);
  }

  exp = exp.split(" ");
  let operand = [];
  let operator = [];
  let precedence = {
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1,
    "(": 0,
    ")": 0,
  };

  for (let char of exp) {
    if (isOperand(Number(char))) {
      operand.push(Number(char));
    } else if (precedence[char] > 0) {
      let lastOperator = operator.length - 1;
      while (
        operator.length &&
        precedence[operator[lastOperator]] >= precedence[char]
      ) {
        process(operator, operand);
      }
      operator.push(char);
    } else if (char === "(") {
      operator.push(char);
    } else if (char === ")") {
      while (operator[operator.length - 1] !== "(") {
        process(operator, operand);
      }
      operator.pop();
    }
  }

  while (operator.length) {
    process(operator, operand);
  }

  return operand.pop();
}

// Explanation:
// -Similar to problem above w/ the following conditionals added:
// -If we encounter char '(', we push that char to operator stack
// -If we encounter char ')', we process all operations inside parantheses until we reach '(' in operator stack.
// After we reach '(' in operator stack, we are done processing everything inside parantheses, so we pop '(' from operator stack.

// Notes:
// -Time complexity: O(n)
// -Space complexity: O(n), as we store a copy of operand / operator in each of the stacks

console.log(evaluateExpressionWithParen("1 + ( 3 / 2 )"));
