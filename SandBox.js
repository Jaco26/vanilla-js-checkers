const board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
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
  let clickedPiecePosition = rowStart.toString() + colStart.toString();
  fork(board, rowStart, colStart, viableMoves);
  return [...new Set(viableMoves)].filter(move => move != clickedPiecePosition);
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
  if (activeRowI > board.length) {
    return;
  }  
  let forwardRowI = activeRowI + 1; 
  let nextRow = board[forwardRowI];   
  if (!nextRow) {    
    viableMoves.push(activeRowI.toString() + colI.toString());
    return;
  }
  let colLeft = colI - 1; 
  let colRight = colI + 1;   
  if ( nextRow[colLeft] == 1 ) {    
    let potentialMove = searchNext(board, forwardRowI, colLeft, -1); 
    if ( potentialMove == 1 ) {      
      viableMoves.push(activeRowI.toString() + colI.toString());
      return;
    } else {      
      viableMoves.push(activeRowI.toString() + colI.toString());
      let nextActiveColI = colLeft - 1;
      let nextActiveRowI = forwardRowI + 1;
      fork(board, nextActiveRowI, nextActiveColI, viableMoves);
    }
  } else {
    viableMoves.push(activeRowI.toString() + colI.toString());
  }
  if (nextRow[colRight] == 1) {
    let potentialMove = searchNext(board, forwardRowI, colRight, 1)
    if (potentialMove == 1) {
      viableMoves.push(activeRowI.toString() + colI.toString());
      return;
    } else {
      viableMoves.push(activeRowI.toString() + colI.toString());
      let nextActiveColI = colRight + 1;
      let nextActiveRowI = forwardRowI + 1;
      fork(board, nextActiveRowI, nextActiveColI, viableMoves);
    }
  } else {
    viableMoves.push(activeRowI.toString() + colI.toString());
  }
}

function searchNext(arr, rowI, colI, dir) {
  let thisRow = arr[rowI + 1]; 
  let thisCol = thisRow[colI + dir]; 
  return thisCol; 
}

let result = testArraySearch();

console.log(result);

