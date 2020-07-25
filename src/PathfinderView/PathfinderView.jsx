import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';

import './PathfinderView.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const NUMBER_OF_ROWS = 20;
const NUMBER_OF_COLUMNS = 40;

export default class PathfindingView extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      pathFinding: false,
      algorithm: 1,
      algorithmChoice: 'Dijkstra\'s',
      speed: 1,
      speedChoice: 'Average'
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleTest() {
    console.log(this.state.grid);
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
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
    this.setState({ algorithm: 1})
  }

  clearBoard() {
    this.clearWalls();
    this.clearPath();
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  clearWalls() {
    const wallsToClear = Array.prototype.slice.call(document.getElementsByClassName('node-wall'));
    for (let i = 0; i < wallsToClear.length; i++) {
      wallsToClear[i].className = 'node ';
    }
    const grid = getInitialGrid();
    this.setState({ grid });
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
  }

  visualizeAlgorithm() {
    this.clearPath();
    const {algorithm} = this.state;

    switch (algorithm) {
      case(1) :
        this.setState({pathFinding : true}, () => this.visualizeDijkstra());
        break;
      default :
        this.setState({pathFinding : true}, () => this.visualizeDijkstra());
        break;
    }
  }

  visualizeDijkstra() {
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    setTimeout(() => {
      this.setState({pathFinding: false});
    }, (visitedNodesInOrder.length * 10 + nodesInShortestPathOrder.length * 50) * this.state.speed);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
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

            <Button onClick={() => this.handleTest()}> Test Grid</Button>

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

          </div>
        </Container>

        <div className='grid-container'>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
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
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUMBER_OF_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
