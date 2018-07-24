const moveFinder = ( () => {

  const determineTileOccupant = (tile, opponent) => {
    switch (tile) {
      case 0:
        return 'empty';
      case opponent:
        return 'opponent';
      default:
        return 'team';
    }
  }

  const examineTile = (board, rowIndex, colIndex, dir, opponent ) => {
    const row = board[rowIndex];
    if (dir != 'left' && dir != 'right') throw new Error('Incorrect value passed for `dir`. Pass "left" or "right"');
    direction = dir == 'left' ? -1 : 1;
    return {
      occpant: determineTileOccupant(row[colIndex + direction], opponent),
      location: rowIndex.toString() + (colIndex + direction).toString(),
    };
 
  }

  const dontSearchNextRow = (left, right) => {
    return left.occpant == 'empty' && right.occpant == 'empty'
  }



  const findMoves = (options) => {
    let moves = [];
    let firstIteration = true;
    let { currentBoard, colIndex, searchRowIndex, rowDirection, rowIterateN, opponent } = options;   
    while (rowIterateN > 0) {
      let left = examineTile(currentBoard, searchRowIndex, colIndex, 'left', opponent);
      let right = examineTile(currentBoard, searchRowIndex, colIndex, 'right', opponent);
      if (firstIteration && dontSearchNextRow(left, right)) {
     
        console.log('STOP THE SEARCH!', searchRowIndex);
        moves.push(left, right);
      } else {
        console.log('SEARCH NEXT ROW!', searchRowIndex);
        break
      }
      firstIteration = false;
      searchRowIndex += rowDirection;
      rowIterateN -= 1;
    }
    return moves;
  }

  
  const validMoves = (piece, game) => {
    const options = {
      // store reference to the currentBoard state
      currentBoard: game.history[game.history.length - 1],
      // store reference to the row nad column indexes of the clicked piece
     colIndex: Number(piece.location[1]),
    }
   
    /**
     * This function will return an array of the location indexes
     * of all valid moves for the piece passed into this function.
     * 
     * Assumning the piece is not a king:
     *  - look forward one row
     *    - if the tiles to the left and right of the piece are empty,
     *        return an array of those tile location indexes
     *    - if either of the tiles to the left or right of the piece
     *      contain an opponent, 
     *        look forward another row
     *          - if the tile diagnal from the occupied (or occupiable)
     *            tile is empty,
     *              save that tile's location index to the array
     *              look forward one row    
     */

    if (piece.player == 'p1') {
      options.rowDirection = -1; // decrement outer array index
      options.searchRowIndex = Number(piece.location[0]) - 1; // start search in rows[clickedRow - 1]
      options.opponent = 2;
      options.rowIterateN = 7 - (7 - Number(piece.location[0])); // n rows between the clicked piece and end of board
    } else {
      options.rowDirection = 1; // increment outer array index
      options.searchRowIndex = Number(piece.location[0]) + 1; // start search in rows[clickedRow + 1]
      options.opponent = 1;
      options.rowIterateN = 0 + (7 - Number(piece.location[0])); 
    }
    const moves = findMoves(options)
    return moves;
  }

  return {
    validMoves,
  }

})();