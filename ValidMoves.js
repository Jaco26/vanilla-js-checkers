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
  

  const findPossibleTilesWithReduce = (currentBoard, options) => {
    let { colDirRange, clickedCol, rowIterateN, rowIterateDir, searchRowIndex, opponent} = options;
    const range = [...Array(rowIterateN).keys()]; // => [1, 2, 3...] 
    return range.reduce( (a, b) => {
      const start = clickedCol - colDirRange;
      const end = clickedCol + colDirRange;
      const currentRow = currentBoard[searchRowIndex];
      const row = [];
      for (let colI = start; colI <= end; colI++) {
        if (currentRow[colI] != null) {
          row.push({
            index2d: searchRowIndex.toString() + colI,
            occupant: determineTileOccupant(currentRow[colI], opponent),
          });
        }
      }
      a.push(row);
      colDirRange += 1; // ex
      searchRowIndex += rowIterateDir;
      return a;
    }, []);
  }








  const colLeftAndRight = (board, iRowStart, iColStart, opponent) => {
    const left = {
      index2d: iRowStart.toString() + (iColStart - 1).toString(),
      occupant: board[iRowStart][iColStart - 1]
    }; 
    const right = {
      index2d: iRowStart.toString() + (iColStart + 1).toString(),
      occupant: board[iRowStart][iColStart + 1]
    };
    return [left, right].map(tile => {      
      switch (tile.occupant) {
        case 0:
          tile.occupant = 'empty';
          break;
        case opponent:
          tile.occupant = 'opponent';
          break;
        default:
          tile.occupant = 'team';
      }
      return tile;       
    });
  }

  const searchRow = (board, iRowStart, iColStart, opponent) => { 
    const results = colLeftAndRight(board, iRowStart, iColStart, opponent);    
    const moves = {end: [], hasPossibleJump: []};    
    return results.reduce( (a, b) => {
      if (b.occupant == 'empty') {
        a.end.push(b);
      } else if (b.occupant == 'opponent') {
        a.hasPossibleJump.push(b);
      }
      return a;
    }, moves);
  }

  const recursiveFind = (board, opponent, tile, ends) => {
    if (tile.occupant == 'empty') {
      return 
    }     
    let iRowStart = Number(tile.index2d[0]);
    let iColStart = Number(tile.index2d[1]);
    searchRow(board, iRowStart, iColStart, opponent);
    
  }

  const findEnd = (board, opponent, {hasPossibleJump}) => {
    let ends = [];
    hasPossibleJump.forEach(tile => {
      recursiveFind(board, opponent, tile, ends);
    });
    return ends;
  }

  const boardCrawler = (board, options) => {
    let { iColStart, iRowStart, nRowIterate, rowIterateDir, opponent } = options;
    let validMoves = [];
    do {      
      let rowResults = searchRow(board, iRowStart, iColStart, opponent);
      validMoves = [...validMoves, ...rowResults.end];
      if (rowResults.hasPossibleJump[0]) {
        // console.log('HEYYY', iRowStart);
        // console.log(rowResults.hasPossibleJump[0]);
        
        validMoves = [...validMoves, ...findEnd(board, opponent, rowResults)]
      } else {
        break;
      }
      iRowStart += rowIterateDir;
      nRowIterate -= 1;
    } while (nRowIterate > 0);    
    return validMoves;
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
    let currentBoard = game.history[game.history.length - 1];    
    let options = {
      colDirRange: 1, // The range on either side of the clicked tile that could hold valid tiles
      iColStart: Number(location[1]),
    }
    if (player == 'p1') {
      options.iRowStart = Number(location[0]) - 1; // index of row to begin search for valid tiles
      options.nRowIterate = 7 - (7 - Number(location[0])); // n rows between the clicked piece and end of board
      options.rowIterateDir = -1; // Decrement `searchRowI` by 1
      options.opponent = 2; // Player two pieces are represented by the `2` 
    } else {
      options.iRowStart = Number(location[0]) + 1; 
      options.nRowIterate = 0 + (7 - Number(location[0])); 
      options.rowIterateDir = 1;
      options.opponent = 1;  
    }    
    return boardCrawler(currentBoard, options);
    // return findPossibleTilesWithReduce(currentBoard, options);
  }











  const opponentIsJumpable = (rows, rowAfter, jumpToColDirection, jumpToRowDirection, jumpFromLocation) => {
    const jumpFromCol = Number(jumpFromLocation[1]);
    if (rowAfter) {
      const tile = rowAfter.filter(col => {
        return Number(col.index2d[1]) == jumpFromCol + jumpToColDirection;
      })[0];
      if (tile && tile.occupant == 'empty') {
        return tile;
      }
    }
    
  }

  const findViableMoves = (piece, game) => {
    const potentialViableTiles = coneOfPossibility(piece, game);
    return potentialViableTiles.reduce( ( valid, tileRow, index, arr) => {
      let morePossibleMoves = false; 
      // console.log(arr);
      // arr.splice(1)
      tileRow.forEach((tile, i) => {
        if (tile.occupant == 'empty') {
          valid.push(tile);
        } else if (tile.occupant == 'opponent') {
          // morePossibleMoves = true;
          let jumpToColDirection = i == 0 ? -2 : 2;
          let jumpToRowDirection = piece.player == 'p1' ? -2 : 2;
          let okToLand = opponentIsJumpable(arr, arr[index + 1], jumpToColDirection, jumpToRowDirection, piece.location);
          if (okToLand) {

            valid.push(okToLand);
          }
        }
      });
      if (!morePossibleMoves) arr.splice(1); // only run once...at the end of the first iteration, splice the array at index 1
      return valid;
    }, []);
  }

  return {
    // validMoves,
    findViableMoves,
    coneOfPossibility
  }

})();