const moves = ( () => {

  const opponentsInNextRow = (rowI, colILeft, colIRight, player, currentBoard) => {
    const opponent = player == 'p1' ? 2 : 1;    
    if (rowI) {
      return currentBoard[rowI].map((tile, i) => {
        return tile == opponent && (i == colILeft || i == colIRight) ? rowI.toString() + i.toString() : null;
      }).filter(item => item != null)
    }
     
        
  } 


  const recursiveMutateValidMoves = (currentRowI, currentColI, player, currentBoard, rowsAhead) => {
    const direction = player == 'p1' ? -1 : 1;
    if (currentRowI == 0 || currentRowI == 7) {      
      return;
    }
    currentRowI += direction;
    let iLeft = currentColI - 1;
    let iRight = currentColI + 1;
    let opponents = opponentsInNextRow(currentRowI, iLeft, iRight, player, currentBoard);

    const nextRow = currentBoard[currentRowI];
    rowsAhead.push(opponents);
    // rowsAhead.push(nextRow);
    recursiveMutateValidMoves(currentRowI, currentColI, player, currentBoard, rowsAhead);
  }


  const validMoves = (piece, game) => {
    const currentRowI = Number(piece.location[0]);
    const currentColI = Number(piece.location[1]);
    const player = piece.player;
    const currentBoard = game.history[game.history.length - 1];
    // "rowsAhead" is mutated by "recursiveRowsAhead"
    // TODO: find more elegant way to do this
    const validMoves = [];
    recursiveMutateValidMoves(currentRowI, currentColI, player, currentBoard, validMoves);
    return validMoves
  }

  return {
    validMoves,
    
  }

})();