export function primMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS) {

    const wallsToAnimate = [];

    // Start with a grid of filled cells
    for (let i = 0; i < NUMBER_OF_ROWS; ++i) {
        for (let j = 0; j < NUMBER_OF_COLUMNS; ++j) {
            const node = grid[i][j];
            node.isWall = true;
        }
    }

    // Start of maze
    const startNode = grid[1][1];
    startNode.isWall = false;

    // Get its neighbors
    const startNeighbors = getNeighbors(startNode, grid);

    // Add the neighbors to the list
    const nodesToVisit = [];
    for (let i = 0; i < startNeighbors.length; ++i) {
        nodesToVisit.push(startNeighbors[i]);
    }

    while (!!nodesToVisit.length) {

        console.log(nodesToVisit);

        // Splice a random node off  the list
        const rand = Math.floor(Math.random()*nodesToVisit.length);
        const node = nodesToVisit[rand];
        nodesToVisit.splice(rand, 1);

        // Get the node's neighbors
        const neighbors = getNeighbors(node, grid);

        // Check if it has 2 unexplored neighbors
        const exploredNeighbors = neighbors.filter(neighbor => neighbor.isWall);
        if (exploredNeighbors.length > 2) {
            // If it doesnt clear the cell and add the neighbors to the list
            node.isWall = false;
            for (let i = 0; i < exploredNeighbors.length; ++i) {
                nodesToVisit.push(exploredNeighbors[i]);
            }
        }

    }

    // Run over the grid and grab everything thats still a wall
    for (let i = 0; i < NUMBER_OF_ROWS; ++i) {
        for (let j = 0; j < NUMBER_OF_COLUMNS; ++j) {
            const node = grid[i][j];
            if (node.isWall) {
                wallsToAnimate.push(node);
            }
        }
    }

    // Return the walls of the grid
    return wallsToAnimate;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);                      // LEFT
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);        // DOWN
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);     // RIGHT
    if (row > 0) neighbors.push(grid[row - 1][col]);                      // UP
    return neighbors;
  }