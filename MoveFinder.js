const moveFinder = ( () => {

  const searchNext = (board, rowI, colI, options) => {
    let thisRow = board[rowI + options.forwardDirection];
    console.log(options);
    
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
        return;
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
    } else { 
      moves.push((activeRowI + forwardDirection).toString() + (activeColI - 1).toString()); 
    }

    if (nextRow[colRight] == opponent) {
      let possibleJumpOptions = { forwardDirection, colDirection: 1 }; // change
      let possibleJump = searchNext(board, forwardRowI, colRight, possibleJumpOptions); // change
      if (possibleJump == opponent) {
        moves.push(activeRowI.toString() + activeColI.toString());
        return;
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
    } else  {
      moves.push( (activeRowI + forwardDirection).toString() + (activeColI + 1).toString()); // change
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
    return [...new Set(moves)].filter(move => move != startPosition);
  }

  return {
    validMoves,
  }

})();