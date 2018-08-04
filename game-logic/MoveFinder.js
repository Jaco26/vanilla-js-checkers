const moveFinder = ( () => {

  function findTeam(opponent) {
    return [1, 2].find(n => n != opponent);
  } 

  function searchNext(board, options) {
    let thisRow;
    let nextRowI = options.forwardRowI + options.forwardDirection
    if (nextRowI < 0) {
      thisRow = board[0];
    } else if (nextRowI > 7) {
      thisRow = board[7];
    } else {
      thisRow = board[nextRowI];
    }     
    let thisCol = thisRow[options.adjacentColI + options.colDirection];
    return thisCol;
  }

  function handlePossibleJump(moves, paths, options) {
    let { board, activeRowI, activeColI, forwardDirection, opponent, forkCount, colDirection, forwardRowI, adjacentColI } = options;
    let possibleJumpOptions = { forwardRowI, adjacentColI, forwardDirection, colDirection};
    let possibleJump = searchNext(board, possibleJumpOptions);    
    if (possibleJump == opponent || possibleJump == findTeam(opponent)) {
      moves.push(activeRowI.toString() + activeColI.toString());
    } else {
      moves.push(activeRowI.toString() + activeColI.toString());
      let nextForkOptions = {
        board,
        forwardDirection, 
        opponent, 
        forkCount,
        activeRowI: forwardRowI + forwardDirection,
        activeColI: adjacentColI + colDirection,
      };
      fork(moves, paths, nextForkOptions);
    }
  }

  function fork(moves, paths, options) {
    let { board, activeRowI, activeColI, forwardDirection, opponent } = options;    
    options.forkCount += 1;
    let forwardRowI = activeRowI + forwardDirection;
    let nextRow = board[forwardRowI];

    if (!nextRow) {
      moves.push(activeRowI.toString() + activeColI.toString());
      return;
    }   

    let colLeft = activeColI - 1;
    let colRight = activeColI + 1;

    if (nextRow[colLeft] == opponent) {   
      let handlePossibleJumpOptions = { 
        forwardRowI,
        adjacentColI: colLeft,
        colDirection: -1,
      }    
      handlePossibleJump(moves, paths, { ...options, ...handlePossibleJumpOptions});
    } else if (options.forkCount == 1 && nextRow[colLeft] != findTeam(opponent)) {       
      moves.push( (activeRowI + forwardDirection).toString() + (activeColI - 1).toString()); 
    } else {
      moves.push(activeRowI.toString() + activeColI.toString());
    }

    if (nextRow[colRight] == opponent) {
      let handlePossibleJumpOptions = {
        forwardRowI,
        adjacentColI: colRight,
        colDirection: 1,
      };
      handlePossibleJump(moves, paths, { ...options, ...handlePossibleJumpOptions});
    } else if (options.forkCount == 1 && nextRow[colRight] != findTeam(opponent)) {
      moves.push((activeRowI + forwardDirection).toString() + (activeColI + 1).toString());
    } else {
      moves.push(activeRowI.toString() + activeColI.toString());
    }
  };

  const getValidMoves = (clickedPiece, game) => {    
    let startPosition = clickedPiece.location;
    let options = {
      board: game.history.slice(-1)[0],
      activeRowI: Number(clickedPiece.location[0]),
      activeColI: Number(clickedPiece.location[1]),
      forwardDirection: clickedPiece.player == 'p1' ? -1 : 1,
      opponent: clickedPiece.player == 'p1' ? 2 : 1,
      forkCount: 0,
    };
    let moves = [];
    let paths = [];
    fork(moves, paths, options);
    return [...new Set(moves)].filter(move => {
      return move != startPosition 
        && Number(move) > -1
        && Number(move[0]) <= 7
        && Number(move[1]) <= 7
      });
  };

  const isValidMove = (piece, validMoves) => validMoves.includes(piece.location);  

  return {
    getValidMoves,
    isValidMove,
  };

})();