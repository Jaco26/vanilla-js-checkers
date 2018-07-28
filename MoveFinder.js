const moveFinder = ( () => {

  const findTeam = (opponent) => {
    return [1, 2].find(n => n != opponent);
  }

  let searchNextCounter = 0;

  const searchNext = (board, rowI, colI, options) => {
    searchNextCounter += 1;
    let loggerObj = {
      'Row Index': rowI,
      'Forward Direction': options.forwardDirection,
      'Column Index': colI,
      'Column Direction': options.colDirection,
      searchNextCounter
    }
    // console.log(loggerObj);
    let thisRow;
    let nextRowI = rowI + options.forwardDirection
    if (nextRowI < 0) {
      thisRow = board[0];
    } else if (nextRowI > 7) {
      thisRow = board[7];
    } else {
      thisRow = board[rowI + options.forwardDirection];
    }     
    let thisCol = thisRow[colI + options.colDirection];
    return thisCol;
  }

  const fork = (moves, options) => {
    let { board, activeRowI, activeColI, forwardDirection, opponent, forkCount } = options;    
    forkCount += 1;

    if (activeRowI > board.length) return;
    let forwardRowI = activeRowI + forwardDirection;
    let nextRow = board[forwardRowI];

    if (!nextRow) {
      moves.push(activeRowI.toString() + activeColI.toString());
      return;
    }   

    let colLeft = activeColI - 1;
    let colRight = activeColI + 1;

    if (nextRow[colLeft] == opponent) {      
      let possibleJumpOptions = {forwardDirection, colDirection: -1};
      let possibleJump = searchNext(board, forwardRowI, colLeft, possibleJumpOptions);
      if (possibleJump == opponent) {
        moves.push(activeRowI.toString() + activeColI.toString());
      } else {
        moves.push(activeRowI.toString() + activeColI.toString());
        let nextForkOptions = {
          board,
          forwardDirection,
          opponent,
          forkCount,
          activeRowI: forwardRowI + forwardDirection,
          activeColI: colLeft - 1,
        }
        fork(moves, nextForkOptions);
      }
    } else if (forkCount == 1 && nextRow[colRight] != findTeam(opponent)) { 
      moves.push( (activeRowI + forwardDirection).toString() + (activeColI - 1).toString()); 
    } else {
      moves.push(activeRowI.toString() + activeColI.toString());
    }

    if (nextRow[colRight] == opponent) {
      let possibleJumpOptions = { forwardDirection, colDirection: 1 }; // change
      let possibleJump = searchNext(board, forwardRowI, colRight, possibleJumpOptions); // change
      if (possibleJump == opponent) {
        moves.push(activeRowI.toString() + activeColI.toString());
      } else {
        moves.push(activeRowI.toString() + activeColI.toString());
        let nextForkOptions = {
          board,
          forwardDirection,
          opponent,
          forkCount,
          activeRowI: forwardRowI + forwardDirection,
          activeColI: colRight + 1, // change
        }
        fork(moves, nextForkOptions);
      }
    } else if (forkCount == 1 && nextRow[colRight] != findTeam(opponent)) {
      moves.push((activeRowI + forwardDirection).toString() + (activeColI + 1).toString());
    } else {
      moves.push(activeRowI.toString() + activeColI.toString());
    }
  }

  const validMoves = (clickedPiece, game) => {    
    let startPosition = clickedPiece.location;
    let options = {
      board: game.history.slice(-1)[0],
      activeRowI: Number(clickedPiece.location[0]),
      activeColI: Number(clickedPiece.location[1]),
      forwardDirection: clickedPiece.player == 'p1' ? -1 : 1,
      opponent: clickedPiece.player == 'p1' ? 2 : 1,
      forkCount: 0,
    }
    let moves = [];
    fork(moves, options);
    return [...new Set(moves)].filter(move => {
      return move != startPosition 
        && Number(move) > -1
        && Number(move[0]) >= 0
        && Number(move[0]) <= 7
      });
  }

  return {
    validMoves,
  }

})();