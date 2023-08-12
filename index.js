// Set the board size; a larger size can demonstrate the time complexity of Breadth-First Search.
const boardSize = 8;

// Possible moves for a Knight on a chess board.
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

// Class representing a node for each possible move of a Knight.
class MoveNode {
  constructor(pos, parent = null) {
    this.pos = pos; // Current position on the board.
    this.parent = parent; // Parent node that led to this move.
    this.children = this.validMoves(); // Array of valid next moves from this position.
  }

  // Method to find valid moves for the Knight.
  validMoves = (moves = []) => {
    for (const ele of possibleMoves) {
      const newX = ele[0] + this.pos[0];
      const newY = ele[1] + this.pos[1];

      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
        moves.push([newX, newY]);
      }
    }

    return moves;
  };

  // Method to calculate the depth of the node in relation to its first parent.
  depth = (node = this, count = 0) => {
    while (node.parent !== null) {
      node = node.parent;
      count++;
    }
    return count;
  };

  // Method to print the path from the start position to the current node.
  printPath = (node = this, str = "") => {
    while (node.parent != null) {
      str = `[${node.pos}] --> ` + str;
      node = node.parent;
    }

    return `[${node.pos}] --> ` + str.slice(0, -5);
  };
}

// Function to find the minimum number of moves for a Knight to go from start to end.
const knightMoves = (start, end) => {
  checkValues(start);
  checkValues(end);

  const knight = new MoveNode(start);

  const queue = [knight];
  const visited = new Set();
  visited.add(queue[0].pos);

  let endNode;

  // If start and end are the same, return 0 moves.
  if (queue[0].pos[0] === end[0] && queue[0].pos[1] === end[1]) {
    return "Start and End are the Same. 0 Moves.";
  }

  while (queue.length !== 0) {
    let current = queue.shift();

    // If end position is found, set endNode to current Node and exit the loop.
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

// Function to check if the given position is within the valid range.
const checkValues = (pos) => {
  if (pos[0] < 0 || pos[0] >= boardSize || pos[1] >= boardSize || pos[1] < 0) {
    throw new Error(
      `One or more inputs is out of range. All inputs must be in the range of 0-${
        boardSize - 1
      }. You used these values in one of your inputs: ${pos}`
    );
  }
};
