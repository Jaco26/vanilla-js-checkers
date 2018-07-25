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
    console.log('board', board);
    console.log('rowIndex', rowIndex);
    console.log('colIndex', colIndex);
    console.log('dir', dir);
    console.log('opponent', opponent);
    
    const row = board[rowIndex];
    if (dir != 'left' && dir != 'right') throw new Error('Incorrect value passed for `dir`. Pass "left" or "right"');
    direction = dir == 'left' ? -1 : 1;
    return {
      occpant: determineTileOccupant(row[colIndex + direction], opponent),
      location: rowIndex.toString() + (colIndex + direction).toString(),
    };
 
  }
  

  const findMovesInDirection = (dir, movesArray, options, nIterations) => {
    let { currentBoard, rowIndex, rowDirection, colIndex, opponent } = options
    const tile = examineTile(currentBoard, rowIndex, colIndex, dir, opponent);
    if (tile.occpant == 'empty') {
      if (nIterations == 1) {
        movesArray.push(tile);
        return;
      } else {
        
      }
    }
  }


  const findMoves = (options) => {
    let moves = [];
    findMovesInDirection('left', moves, options, 1);
    findMovesInDirection('right', moves, options, 1);
    console.log(moves);
    
    // return moves;
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
      options.rowIndex = Number(piece.location[0]) - 1; // start search in rows[clickedRow - 1]
      options.opponent = 2;
      options.rowIterateN = 7 - (7 - Number(piece.location[0])); // n rows between the clicked piece and end of board
    } else {
      options.rowDirection = 1; // increment outer array index
      options.rowIndex = Number(piece.location[0]) + 1; // start search in rows[clickedRow + 1]
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