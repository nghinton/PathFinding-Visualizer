

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nodesToVisit = [startNode];

  while (!!nodesToVisit.length) {

    // Sort the nodes by distance
    sortNodesByDistance(nodesToVisit);

    console.log(visitedNodesInOrder);

    // Pop off the clostest node
    const closestNode = nodesToVisit.shift();

    // Finish up if the closestNode is the finish node
    if (closestNode === finishNode) return visitedNodesInOrder;

    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;

    // If the node is already visited skip it
    if (closestNode.isVisited) continue;

    // Otherwise mark it as visited and push it to the returned array
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // Get the neighbors and calculate their distance
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    updateUnvisitedNeighbors(unvisitedNeighbors, closestNode, startNode, finishNode);

    // Then add those neighbors to nodesToVisit
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      nodesToVisit.push(unvisitedNeighbors[i]);
    }

  }

  // return if the loops ends and the finished node was not reached (failure)
  return visitedNodesInOrder;
}

function sortNodesByDistance(nodesToVisit) {
  nodesToVisit.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(unvisitedNeighbors, node, startNode, finishNode) {
  for (const neighbor of unvisitedNeighbors) {
    // Distance will be used as a psuedo score, calculated
    // based on minimizing the distance from both the start node 
    // and finish node
    const distanceToFinish = Math.abs(neighbor.row - finishNode.row) + Math.abs(neighbor.col - finishNode.col);
    const distanceToStart = Math.abs(neighbor.row - startNode.row) + Math.abs(neighbor.col - startNode.col);
    neighbor.distance = distanceToFinish + distanceToStart;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
