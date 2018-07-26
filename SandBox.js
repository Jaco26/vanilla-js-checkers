const board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let rowStart = 0; // start row index
let colStart = 3; // start column index



function testArraySearch() {
  fork(board, rowStart, colStart)
}

/**
 * @param {Array} board 2 dimensional array to represent checker board
 * @param {Number} rowI the row index of the 'active' tile
 * @param {Number} colI the column index of the 'active' tile
 */
function fork(board, rowI, colI) {
  if (rowI > board.length) {
    return;
  }
  let nextRow = board[rowI + 1];
  let colLeft = colI - 1;
  let colRight = colI + 1;
  console.log(nextRow);
  
  if (nextRow[colLeft] == 1) {

    
    // if the column to the left of the active column (and one row ahead) contains the number 1
    // (i.e. is occupied) look one tile ahead in the same direction to see if the next tile is empty
    let next = searchNext(board, rowI, colLeft, -1)
    console.log('next row, col LEFT', next);
    if (next == 1) {
      // the tile cannot be jumped to, a path from the active column toward the left does not exist
    } else {
      // the tile can be jumped to, a path from the active column toward the left does exist
      // treat "next" as a new 'active tile' and search for possible jumps from it.
    }
  }
  if (row[colRight] == 1) {
    console.log('next row, col RIGHT', searchNext(arr, rowI, colRight, 1));
  }
}


function searchNext(arr, prevRowI, prevColI, dir) {
  // find the next row in the array by accessing the previous row index + 1
  let thisRow = arr[prevRowI + 1];
  // access a column to the left or right of the previous column index
  let thisCol = thisRow[prevColI + dir];
  // return the contents of the column
  return thisCol
}

testArraySearch();