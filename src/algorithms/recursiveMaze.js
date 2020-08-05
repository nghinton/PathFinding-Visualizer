export function recursiveMaze(grid, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS) {

    const wallsToAnimate = [];

    // Start by grabbing the outer walls of the table
    for (let i = 0; i < NUMBER_OF_ROWS; ++i) {
        wallsToAnimate.push(grid[i][0]);
    }
    for (let i = 0; i < NUMBER_OF_COLUMNS; ++i) {
        wallsToAnimate.push(grid[0][i]);
    }
    for (let i = 0; i < NUMBER_OF_ROWS; ++i) {
        wallsToAnimate.push(grid[i][NUMBER_OF_COLUMNS - 1]);
    }
    for (let i = 0; i < NUMBER_OF_COLUMNS; ++i) {
        wallsToAnimate.push(grid[NUMBER_OF_ROWS - 1][i]);
    }

    // Get the walls to animate by calling the recursive function
    recursiveMazeHelper(grid, 1, 1, NUMBER_OF_ROWS - 2, NUMBER_OF_COLUMNS - 2, wallsToAnimate);

    return wallsToAnimate;
}

function recursiveMazeHelper(grid, x, y, width, height, wallsToAnimate) {

    // log for debugging purposes
    console.log(wallsToAnimate);

    // Check base case
    if (width < 5 || height < 5) return;

    // Get the orientation of the subfield
    const orientation = getOrientation(width, height);

    // Decide which way to split the subfield based on orientation
    if (orientation) {
        // Select a random col to split and a random break in that col
        const randomCol = Math.round(Math.random() * (height-2)) + 1;
        const randomBreak = Math.round(Math.random() * width);
        // Push the cells to wallToAnimate
        for (let i = 0; i < width; i++) {
            if (i !== randomBreak) wallsToAnimate.push(grid[x + i][y + randomCol]);
        }
        // Call the helper function on both sides of the random col
        recursiveMazeHelper(grid, x, y, width, randomCol, wallsToAnimate);
        recursiveMazeHelper(grid, x, y + randomCol + 1, width, height - randomCol - 1, wallsToAnimate);
    }
    
    else {
        // Select a random row to split and a random break in that row
        const randomRow = Math.round(Math.random() * (width-2)) + 1;
        const randomBreak = Math.round(Math.random() * height);
        // Push the cells to wallToAnimate
        for (let i = 0; i < height; i++) {
            if (i !== randomBreak) wallsToAnimate.push(grid[x + randomRow][y + i]);
        }
        // Call the helper function on both sides of the random row
        recursiveMazeHelper(grid, x, y, randomRow, height, wallsToAnimate);
        recursiveMazeHelper(grid, x + randomRow + 1, y, width - randomRow - 1, height, wallsToAnimate);
    }
    

}

function getOrientation(width, height) {
    if (width < height) {
        return true;
    }
    return false;
}