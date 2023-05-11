// Board Size is dynamic in this application, only because it allows me to demonstate the time complexity of Breadth-First Search. I increased the board size to 20 and my browser completly exploded since the algorithm, in its worse case scenerio is O(2^n).
const boardSize = 8;

// Possible Moves for a Knight to make on a chess board.
const possibleMoves = [
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
];

// Node Class assigns a position, a parent node and a children nodes array.
class MoveNode {
  constructor(pos, parent = null) {
    this.pos = pos;
    this.parent = parent;
    this.children = this.validMoves();
  }

  // Parses through possibleMoves and determines what moves are considered 'valid', meaning that they stay on the board.
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

  // Depth Method returns the distance of the current node from the first parent
  depth = (node = this, count = 0) => {
    while (node.parent !== null) {
      node = node.parent;
      count++;
    }
    return count;
  };

  printPath = (node = this, str = "") => {
    while (node.parent != null) {
      str = `[${node.pos}] --> ` + str;
      node = node.parent;
    }

    return `[${node.pos}] --> ` + str.slice(0, -5);
  };
}

const knightMoves = (start, end) => {
  checkValues(start);
  checkValues(end);

  const knight = new MoveNode(start);

  const queue = [knight];
  const visited = new Set();
  visited.add(queue[0].pos);

  let endNode;

  // if start = end return 0
  if (queue[0].pos[0] === end[0] && queue[0].pos[1] === end[1]) {
    return "Start and End are the Same. 0 Moves.";
  }

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

  return `${endNode.printPath()} in ${endNode.depth()} moves!`;
};

// Function to check variables.
const checkValues = (pos) => {
  if (pos[0] < 0 || pos[0] >= boardSize || pos[1] >= boardSize || pos[1] < 0) {
    throw new Error(
      `One or more inputs is out of range. All inputs must be in the range of 0-${
        boardSize - 1
      }. You used these values in one of your inputs: ${pos}`
    );
  }
};

console.log(knightMoves([0, 0], [7, 7]));
