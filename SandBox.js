const board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
];

let rowStart = 0; // start row index
let colStart = 3; // start column index

let forkCounter = 0;

function testArraySearch() {
  let viableMoves = [];
  
  fork(board, rowStart, colStart, viableMoves)
  console.log(viableMoves);
  
}

/**
 * @param {Array} board 2 dimensional array to represent checker board
 * @param {Number} rowI the row index of the 'active' tile
 * @param {Number} colI the column index of the 'active' tile
 */
function fork(board, activeRowI, colI, viableMoves) {
  forkCounter += 1;
  let loggerObj = {
    activeRowI,
    colI,
    viableMoves
  }
  console.log('fork number', forkCounter, loggerObj);
  
  if (activeRowI > board.length) {
    return;
  }
  
  let forwardRowI = activeRowI + 1;

  let nextRow = board[forwardRowI];

  let colLeft = colI - 1;

  let colRight = colI + 1;  

  if ( nextRow[colLeft] == 1 ) {

    // if the column to the left of the active column (and one row ahead) contains the number 1
    // (i.e. is occupied) look one tile ahead in the same direction to see if the next tile is empty

    let potentialMove = searchNext(board, forwardRowI, colLeft, -1)
        
    if ( potentialMove == 1 ) {

      // the tile cannot be jumped to, a path from the active column toward the left does not exist
      
      viableMoves.push(activeRowI.toString() + colI.toString());

      return;

    } else {
      // the tile can be jumped to, a path from the active column toward the left does exist
      // treat "potentialMove" as a new 'active tile' and search for possible jumps from it.
      viableMoves.push(activeRowI.toString() + colI.toString());
      let nextActiveColI = colLeft - 1;
      let nextActiveRowI = forwardRowI + 1;
      fork(board, nextActiveRowI, nextActiveColI, viableMoves);
    }
  }
  if (nextRow[colRight] == 1) {
    console.log('next row, col RIGHT', searchNext(arr, rowI, colRight, 1));
    let potentialMove = searchNext(board, forwardRowI, colRight, 1)

    if (potentialMove == 1) {

      // the tile cannot be jumped to, a path from the active column toward the left does not exist

      viableMoves.push(activeRowI.toString() + colI.toString());

      return;

    } else {
      // the tile can be jumped to, a path from the active column toward the left does exist
      // treat "potentialMove" as a new 'active tile' and search for possible jumps from it.
      viableMoves.push(activeRowI.toString() + colI.toString());
      let nextActiveColI = colLeft + 1;
      let nextActiveRowI = forwardRowI + 1;
      fork(board, nextActiveRowI, nextActiveColI, viableMoves);
    }
  }
}


function searchNext(arr, prevRowI, prevColI, dir) {
  // find the next row in the array by accessing the previous row index + 1
  let thisRow = arr[prevRowI + 1];
  
  // access a column to the left or right of the previous column index
  let thisCol = thisRow[prevColI + dir];
  
  // return the contents of the column
  return thisCol;
}

testArraySearch();