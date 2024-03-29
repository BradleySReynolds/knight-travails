# Knight's Tour Problem Solver

Welcome to the Knight's Tour Problem Solver project! This project demonstrates a solution to the classic Knight's Tour problem using Breadth-First Search (BFS) algorithm. The goal is to find the minimum number of moves required for a Knight to traverse a chessboard and visit every square exactly once.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Algorithm Explanation](#algorithm-explanation)
- [Contributing](#contributing)

## Overview

The Knight's Tour Problem Solver tackles the challenge of finding the shortest path a Knight can take on a chessboard to cover all squares. This project includes the following main components:

- `boardSize`: Configurable variable to determine the size of the chessboard.
- `possibleMoves`: An array defining all possible moves a Knight can make on the chessboard.
- `MoveNode` class: Represents a node in the search tree, tracking positions, parents, and children.
- `knightMoves` function: Uses BFS to find the shortest path for the Knight to reach a destination.
- `checkValues` function: Validates the input positions to ensure they are within the chessboard range.

## Getting Started

### Prerequisites

To run this project, you'll need:

- A JavaScript environment (browser or Node.js).

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/knights-tour-solver.git
   ```

### Usage

1. Open the project in your preferred environment.
2. Set the `boardSize`, `start`, and `end` positions as required.
3. Execute the script to see the shortest path and the number of moves needed for the Knight to reach the destination.

### Algorithm Explanation

The Knight's Tour Problem Solver uses a Breadth-First Search (BFS) algorithm to find the shortest path for the Knight to reach the destination. It constructs a search tree with `MoveNode` objects representing positions on the board. BFS ensures that the shortest path is found by exploring positions level by level.

The `knightMoves` function initializes a queue and processes each node in the queue, considering valid moves from that position. The algorithm continues until the destination position is reached. The `depth` method calculates the number of moves taken, and the `printPath` method constructs the path taken by the Knight.

### Contributing

Contributions are welcome! If you encounter issues, have ideas for improvements, or want to add new features, feel free to open an issue or submit a pull request.

Please ensure that your code follows the project's coding style and conventions. Also, consider including unit tests for any new functionality you introduce.

Thank you for contributing to the Knight's Tour Problem Solver project!
