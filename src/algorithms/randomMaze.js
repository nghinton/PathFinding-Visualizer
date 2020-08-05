

export function randomMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS) {

  const wallsToAnimate = [];

  // Run over the grid and give every cell a 1/4 chance of being a wall
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      if (Math.random() < 0.25) {
        const node = grid[i][j];
        wallsToAnimate.push(node);
      }
    }
  }

  // Return walls of the grid
  return wallsToAnimate;
}