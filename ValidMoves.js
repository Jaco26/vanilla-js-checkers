const moves = ( () => {

  // const opponentsInNextRow = (rowI, colILeft, colIRight, player, currentBoard) => {
  //   const opponent = player == 'p1' ? 2 : 1;    
  //   if (rowI) {
  //     return currentBoard[rowI].map((tile, i) => {
  //       return tile == opponent && (i == colILeft || i == colIRight) ? rowI.toString() + i.toString() : null;
  //     }).filter(item => item != null)
  //   }
     
        
  // } 


  // const recursiveMutateValidMoves = (currentRowI, currentColI, player, currentBoard, rowsAhead) => {
  //   const direction = player == 'p1' ? -1 : 1;
  //   if (currentRowI == 0 || currentRowI == 7) {      
  //     return;
  //   }
  //   currentRowI += direction;
  //   let iLeft = currentColI - 1;
  //   let iRight = currentColI + 1;
  //   let opponents = opponentsInNextRow(currentRowI, iLeft, iRight, player, currentBoard);

  //   const nextRow = currentBoard[currentRowI];
  //   rowsAhead.push(opponents);
  //   // rowsAhead.push(nextRow);
  //   recursiveMutateValidMoves(currentRowI, currentColI, player, currentBoard, rowsAhead);
  // }


  // const validMoves = (piece, game) => {
  //   const currentRowI = Number(piece.location[0]);
  //   const currentColI = Number(piece.location[1]);
  //   const player = piece.player;
  //   const currentBoard = game.history[game.history.length - 1];
  //   // "rowsAhead" is mutated by "recursiveRowsAhead"
  //   // TODO: find more elegant way to do this
  //   const validMoves = [];
  //   recursiveMutateValidMoves(currentRowI, currentColI, player, currentBoard, validMoves);
  //   return validMoves
  // }




  const determineTileOccupant = (tile, opponent) => {
    if (tile == 0) {
      return 'empty';
    } else if (tile == opponent) {
      return 'opponent';
    } else {
      return 'team';
    }
  }
  
  /**
   * 
   * @param {Number} colDirRange The number of index's to the left and right 
   * of the column index of the clicked piece. Start at 1 and each `findPossibleTiles`
   * call will increment it by 1
   * @param {Number} clickedCol The column index of the clicked piece
   * @param {Number} rowIterateN A number representing the number of rows between the 
   * clicked piece and the end of the board. Each `findPossibleTiles` call will decrement 
   * it by 1 and when it equals 0, `findPossibleTiles` will return.
   * @param {Number} rowDir Either 1 or -1. Will increment or decrement `currentRowI` appropriately
   * @param {Number} currentRowI The index of the current row of `currentBoard` to be searched
   * @param {Array} currentBoard A 2D array abstraction of the gameboard on mousedown
   * @param {Number} opponent 2 if the clicked piece.player == 'p1', otherwise, 1
   * @param {Array} possibleTiles Initially empty array that will be filled with possibly viable tiles
   */
  const findPossibleTiles = (colDirRange, clickedCol, rowIterateN, rowDir, currentRowI, currentBoard, opponent, possibleTiles) => {
    if (rowIterateN == 0) {
      return;
    }
    currentRowI += rowDir;
    let start = clickedCol - colDirRange >= 0 && clickedCol - colDirRange <= 7 
      ? clickedCol - colDirRange : 0;
    let end = clickedCol + colDirRange >= 0 && clickedCol + colDirRange <= 7 
      ? clickedCol + colDirRange : 7;
    let currentRow = currentBoard[currentRowI]
    for (let i = start; i <= end; i++) {
      if (currentRow[i] != null) {      
        possibleTiles.push({
          index2d: currentRowI.toString() + i,
          occupant: determineTileOccupant(currentRow[i], opponent),
        });
      }
    }
    colDirRange += 1;
    rowIterateN -= 1;
    findPossibleTiles(colDirRange, clickedCol, rowIterateN, rowDir, currentRowI, currentBoard, opponent, possibleTiles);
  }

  /**
   * coneOfPossibility returns an array of objects, each of which abstracts information
   * about possibly valid sqare for a checker piece to move to.
   *  - obj.index2d 
   *      A string composed of the concatinated outer and inner indexes of a 
   *      given element in the 2D array representation of the board produced 
   *      by Game.mapGameBoard(). 
   *  - obj.opponent
   *      A boolean; true if the represented gameboard tile contains an opponent 
   *      checker, and false if not.
  */
  const coneOfPossibility = ({player, location}, game) => {
    let possibleTiles = [];
    let currentBoard = game.history[game.history.length - 1];    
    let colDirRange = 1;
    let clickedCol = Number(location[1]);
    let startRow = Number(location[0]);
    let rowIterateN, rowIterateDir, opponent;
    if (player == 'p1') {
      rowIterateN = 7 - (7 - Number(location[0]));
      rowIterateDir = -1;
      opponent = 2;
    } else {
      rowIterateN = 0 + (7 - Number(location[0]));
      rowIterateDir = 1;
      opponent = 1;
    }
    findPossibleTiles(colDirRange, clickedCol, rowIterateN, rowIterateDir, startRow, currentBoard, opponent, possibleTiles);    
    return possibleTiles;
  }

  const findViableMoves = (piece, game) => {
    const potentialTiles = coneOfPossibility(piece, game);
    console.log(potentialTiles);
    
  }

  return {
    // validMoves,
    findViableMoves
  }

})();