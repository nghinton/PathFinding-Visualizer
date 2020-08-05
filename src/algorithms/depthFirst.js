

export function depthFirst(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nodesToVisit = [startNode];
  
  while (!!nodesToVisit.length) {
    // Pop the next node to be checked off the array
    const node = nodesToVisit.pop();

    // Is it a wall?
    if(node.isWall) continue;

    // Have we visited it before?
    if (node.isVisited) continue;

    // Mark the node and push it to the final array otherwise
    node.isVisited = true;
    visitedNodesInOrder.push(node);

    // Check and see if we are done
    if (node === finishNode) return visitedNodesInOrder;

    // If not update the nodesToVisit array with the neighbors
    const neighbors = getUnvisitedNeighbors(node, grid);
    for (let i = 0; i < neighbors.length; i++) {
      neighbors[i].previousNode = node;
      nodesToVisit.push(neighbors[i]);
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (col > 0) neighbors.push(grid[row][col - 1]);                      // LEFT
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);        // DOWN
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);     // RIGHT
  if (row > 0) neighbors.push(grid[row - 1][col]);                      // UP
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
