# Knight Travails

![Knight Image](https://t3.ftcdn.net/jpg/02/00/32/66/240_F_200326685_fFj2wZJBgrPYrDFc276ZUcMbqb4qsCpO.jpg)

## Introduction

This was an assignment with the Odin Project, with the goal of creating a script with a function `knightMove([x,y], [x,y])`, that returns the minimum amount of moves that it will take for the knight to move from the first position to the second, end, position.

## The Code

### About the Parameters

This Program allows for the user to change the size of the board from 8 x 8, to say 3 x 3 or 20 x 20; however, this is not recommended because this program utilizes an algorithm called Breadth-First Search, meaning in the worse case scenerio the time complexity of this function is O(squares^n) -- exponential growth. Don't believe me? Set board size to 20 and get the knight to traverse the whole board.

For the sake of the script, the value [0,0] represents the top left of a chess board and [7,7] represents the bottom right. Imagine the board as a double indexed array with 8 rows and 8 columns.

### Why Use BFS?

For finding the minimum amount of moves we want to return the first instance of end value we can find. To do this BFS is ideal -- if the data set were way bigger this would be extremely inefficent, but since our contraints are a typical 8 x 8 chess board and the most moves possible to any point from any start for a knight is only 5-6 moves BFS is a perfect algorithm.

BFS takes a node tree, in this case the node tree will b e the current position, and a list of possible moves. The algorithm wants to check all the possible moves from the current position before moving on to the next position; then the algorithm wants to check all the children of the moves one away from the start before analyzing any value that is 2 moves away from the start etc. etc. Now is a good foyee into discussing the code

### BFS in the Code

Lets start with the construction of the Node Tree in this case a class called `MoveNode`:

```
class MoveNode {
  constructor(pos, parent = null) {
    this.pos = pos;
    this.parent = parent;
    this.children = this.validMoves();
  }
```

From an array outside the class, called `possibleMoves`, 8 values are listed that are expressions of the eight moves a knight can make from any position. However, we want to ignore any moves that would be off the board, so the method `validMoves()` within the class does this by testing each possible move and make sure it is greater than 0 but less than 8:

```
  validMoves = (moves = []) => {
    for (const ele of possibleMoves) {
      if (
        ele[0] + this.pos[0] >= 0 &&
        ele[0] + this.pos[0] < boardSize &&
        ele[1] + this.pos[1] < boardSize &&
        ele[1] + this.pos[1] >= 0
      ) {
        moves.push([ele[0] + this.pos[0], ele[1] + this.pos[1]]);
      }
    }

    return moves;
  };
```

Now for the meat! The `KnightMoves(start, end)` function starts by checking to make sure again that the input values are valid, if they are not a custom error is thrown:

```
// Within knightMoves
  checkValues(start);
  checkValues(end);

// Outside knightMoves. Function to check values
const checkValues = (pos) => {
  if (pos[0] < 0 || pos[0] >= boardSize || pos[1] >= boardSize || pos[1] < 0) {
    throw new Error(
      `One or more inputs is out of range. All inputs must be in the range of 0-${
        boardSize - 1
      }. You used these values in one of your inputs: ${pos}`
    );
  }
};
```

Then the `start` variable is used to create the first node. Its important to mention that each node has a `parent` value, the first node's `parent` value is set to `null`.

Next, the `queue` array and `visited` set are created. For the former, the queue will be used to keep our values in order. For example, the queue will start with the `start` node -- which is the only element in the array to start -- and then will add its children to the queue, etc, etc. For the latter, the `visited` set will make sure we are not looping over the same values multiple times.

```
  while (queue.length !== 0) {
    let current = queue.shift();

    // If end value is found, set endNode to current Node and break while loop
    if (current.pos[0] === end[0] && current.pos[1] === end[1]) {
      endNode = current;
      break;
    }

    visited.add(current.pos);

    for (const child of current.children) {
      if (!visited.has(child.pos)) {
        queue.push(new MoveNode(child, current));
      }
    }
  }
```

Finally the function will return a string that gives the path and the amount of moves to get to the point. Here are some examples of the output:

```
knightMoves([0, 0], [7, 7]);
// Output: [0,0] --> [2,1] --> [1,3] --> [3,2] --> [5,3] --> [6,5] --> [7,7] in 6 moves!

knightMoves([7, 7], [0, 0]);
// Output: [7,7] --> [5,6] --> [3,7] --> [1,6] --> [0,4] --> [1,2] --> [0,0] in 6 moves!

knightMoves([0, 0], [0, 0])
// Output: Start and End are the Same. 0 Moves.

knightMoves([4, 5], [1, 7])
// Output: [4,5] --> [3,7] --> [2,5] --> [1,7] in 3 moves!

knightMoves([2, 6], [6, 3])
// Output: [2,6] --> [3,4] --> [4,2] --> [6,3] in 3 moves!

```

### Other Methods in the MoveNode Class

`depth()` - this method will return the distance from the current node to the top of the node tree. This is used to give the amount of moves that it took to get from the `start` to the `end`.

```
  depth = (node = this, count = 0) => {
    while (node.parent !== null) {
      node = node.parent;
      count++;
    }
    return count;
  };
```

`printPath()` - this method creates an easy to read string that shows the path that the knight took to get from the `start` to the `end`.

```
  printPath = (node = this, str = "") => {
    while (node.parent != null) {
      str = `[${node.pos}] --> ` + str;
      node = node.parent;
    }

    return `[${node.pos}] --> ` + str.slice(0, -5);
  };
```
