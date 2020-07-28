import React, { Component } from 'react';
import $ from 'jquery';

import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

import Node from './Node/Node';
import { dijkstra } from '../algorithms/dijkstra';
import { depthFirst } from '../algorithms/depthFirst';
import { breadthFirst } from '../algorithms/breadthFirst';

import './PathfinderView.css';

const NUMBER_OF_ROWS = Math.floor($(window).innerHeight() * 0.77 / 25);
const NUMBER_OF_COLUMNS = 60;

export default class PathfindingView extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: Math.floor(NUMBER_OF_ROWS / 2),
      START_NODE_COL: 15,
      FINISH_NODE_ROW: Math.floor(NUMBER_OF_ROWS / 2),
      FINISH_NODE_COL: 45,
      mouseIsPressed: false,
      movingStartNode: false,
      movingFinishNode: false,
      pathFinding: false,
      algorithm: 1,
      algorithmChoice: 'Dijkstra\'s',
      speed: 1,
      speedChoice: 'Average'
    };
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  refreshPage() {
    window.location.reload();
  }

  handleMouseDown(row, col) {
    const grid = this.state.grid;
    const node = grid[row][col];
    if (node.isStart) {
      this.setState({movingStartNode: true});
      return;
    }
    if (node.isFinish) {
      this.setState({movingFinishNode: true});
      return;
    }
    const newGrid = this.getNewGridWithWallToggled(grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (this.state.movingStartNode) {
      const newGrid = this.getNewGridWithNewStart(this.state.grid, row, col);
      this.setState({ grid: newGrid, START_NODE_ROW: row, START_NODE_COL: col});
    }
    if (this.state.movingFinishNode) {
      const newGrid = this.getNewGridWithNewFinish(this.state.grid, row, col);
      this.setState({ grid: newGrid, FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
    }
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false, movingStartNode: false, movingFinishNode: false });
  }

  setSlowSpeed() {
    this.setState({ speed: 2, speedChoice: 'Slow'});
  }

  setAverageSpeed() {
    this.setState({ speed: 1, speedChoice: 'Average'});
  }

  setFastSpeed() {
    this.setState({ speed: 0.5, speedChoice: 'Fast'});
  }

  setDijkstra() {
    this.setState({ algorithm: 1, algorithmChoice: 'Dijkstra\'s'});
  }

  setDepthFirst() {
    this.setState({ algorithm: 2, algorithmChoice: 'Depth First'});
  }

  setBreadthFirst() {
    this.setState({ algorithm: 3, algorithmChoice: 'Breadth First'});
  }

  clearBoard() {
    this.clearWalls();
    this.clearPath();
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  clearWalls() {
    const wallsToClear = Array.prototype.slice.call(document.getElementsByClassName('node-wall'));
    for (let i = 0; i < wallsToClear.length; i++) {
      wallsToClear[i].className = 'node ';
    }
    const grid = this.state.grid;
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
        const node = grid[i][j];
        node.isWall = false;
      }
    }
  }

  clearPath() {
    const visitedToClear = Array.prototype.slice.call(document.getElementsByClassName('node-visited'));
    for (let i = 0; i < visitedToClear.length; i++) {
      visitedToClear[i].className = 'node ';
    }
    const pathToClear = Array.prototype.slice.call(document.getElementsByClassName('node-shortest-path'));
    for (let i = 0; i < pathToClear.length; i++) {
      pathToClear[i].className = 'node ';
    }
    const grid = this.state.grid;
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
        const node = grid[i][j];
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
      }
    }
  }

  mazeRandom() {
    this.clearWalls();
    const grid = this.state.grid;
    const wallsToAnimate = [];
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
      for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
        if (Math.random() < 0.25) {
          if (!(i === this.state.START_NODE_ROW && j === this.state.START_NODE_COL) && !(i === this.state.FINISH_NODE_ROW && j === this.state.FINISH_NODE_COL)) {
            wallsToAnimate.push([i,j]);
          }
        }
      }
    }
    for (let i = 0; i < wallsToAnimate.length; i++) {
      const [row, col] = wallsToAnimate[i];
      const node = grid[row][col];
      node.isWall = true;
      setTimeout(() => {
        document.getElementById(`node-${row}-${col}`).className = 'node node-wall';
      }, i * this.state.speed);
    }
  }

  visualizeAlgorithm() {
    this.clearPath();
    const {algorithm} = this.state;

    switch (algorithm) {
      case(1) :
        this.setState({pathFinding : true}, () => this.visualizeDijkstra());
        break;
      case(2) :
        this.setState({pathFinding : true}, () => this.visualizeDepthFirst());
        break;
      case(3) :
        this.setState({pathFinding : true}, () => this.visualizeBreadthFirst());
        break;
      default :
        this.setState({pathFinding : true}, () => this.visualizeDijkstra());
        break;
    }
  }

  visualizeDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);
    
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);

    setTimeout(() => {
      this.setState({pathFinding: false});
    }, (visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50) * this.state.speed);
  }

  
  visualizeDepthFirst() {
    const grid = this.state.grid;
    const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = depthFirst(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);
    
    console.log(visitedNodesInOrder);

    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    
    setTimeout(() => {
      this.setState({pathFinding: false});
    }, (visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50) * this.state.speed);
  }

  visualizeBreadthFirst() {
    const grid = this.state.grid;
    const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    const visitedNodesInOrder = breadthFirst(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrder(finishNode);

    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    
    setTimeout(() => {
      this.setState({pathFinding: false});
    }, (visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50) * this.state.speed);
  }

  getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.state.speed * 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
      }, this.state.speed * 10 * i);
    }
  }
 
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
      }, this.state.speed * 50 * i);
    }
  }

  render() {
    const { grid, mouseIsPressed, pathFinding, algorithmChoice, speedChoice} = this.state;

    return (
      <div className='app-container'>

        <Container fluid>
          <div className="navbar">

            <button onClick={() => this.refreshPage()}>Pathfinding Visualizer</button>

            <button disabled={pathFinding ? true : false} onClick={() => this.clearBoard()}>
              Clear Board
            </button>
            <button disabled={pathFinding ? true : false} onClick={() => this.clearWalls()}>
              Clear Walls
            </button>
            <button disabled={pathFinding ? true : false} onClick={() => this.clearPath()}>
              Clear Path
            </button>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Algorithm: {algorithmChoice}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.setDijkstra()}>Dijkstra's</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setDepthFirst()}>Depth First</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setBreadthFirst()}>Breadth First</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <button disabled={pathFinding ? true : false} onClick={() => this.visualizeAlgorithm()}>
              Visualize Algorithm
            </button>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Speed: {speedChoice}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.setSlowSpeed()}>Slow</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setAverageSpeed()}>Average</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setFastSpeed()}>Fast</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <button disabled={pathFinding ? true : false} onClick={() => this.mazeRandom()}>
              Create Random Maze
            </button>

          </div>
        </Container>

        <div id='mainText'>
          <ul>
            <li>
              <div className="start"></div>Start Node</li>
            <li>
              <div className="finish"></div>Finish Node</li>
            <li>
              <div className="unvisited"></div>Unvisited Nodes</li>
            <li>
              <div className="visited"></div>Visited Nodes</li>
            <li>
              <div className="shortest-path"></div>Shortest-path Node</li>
            <li>
              <div className="wall"></div>Wall Node</li>
          </ul>
        </div>

        <div className='table-container'>
          <table className='table'>
          <tbody>
            {grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      ></Node>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>

      </div>
    );
  }

  getInitialGrid() {
    const grid = [];
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }
  
  createNode(col, row) {
    return {
      col,
      row,
      isStart: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish: row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
    };
  }
  
  getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }
  
  getNewGridWithNewStart(grid, row, col) {
    const oldStart = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
    oldStart.isStart = false;

    const newGrid = grid.slice();

    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: true
    };
    newGrid[row][col] = newNode;

    return newGrid;
  }
  
  getNewGridWithNewFinish(grid, row, col) {
    const oldFinish = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];
    oldFinish.isFinish = false;

    const newGrid = grid.slice();

    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: true
    };
    newGrid[row][col] = newNode;

    return newGrid;
  }

}