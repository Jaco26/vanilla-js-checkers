const moveFinderPart2 = (() => {

  const outOfBounds = (i) => i ? (!Number(i) && Number(i) != 0) || Number(i) > 7 : undefined;

  function getTileIndex(origin, nRows, player, colDirection) {
    let initial = (Number(origin) + getOriginModifier(nRows, player, colDirection)).toString();    
    let secondary = initial.length == 2 ? initial : '0' + initial;
    return Number(secondary) > 0 ? secondary : undefined;
  }

  function tileContent(occupant, player) {
    const playerOpponent = player == 'p1' ? 2 : 1;
    switch(occupant) {
      case playerOpponent:
        return 'opponent';
      case 0:
        return 'empty';
      default: 
        return 'team';
    }
  }

  function getOriginModifier(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -9 : -11) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 9 : 11) * nRows;
  }

  function getTileNRowsAhead(origin, nRows, colDirection, options) {
    const { board, player } = options;
    const tileIndex = getTileIndex(origin, nRows, player, colDirection);   

    if (!tileIndex) return; 

    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);

    if (outOfBounds(row) || outOfBounds(col)) return;
    
    console.log('tileindex', tileIndex, 'forkcount', options.forkCount); // IMPORTANT: Keep this here, info could be helpful in building path tree
        
    const occupant = board[row][col];
    const contents = tileContent(occupant, player);    
    if (contents) {
      return {
        contents,
        locale: tileIndex,
      };
    }
  }

  function handlePossibleJump(moves, possibleJump, options) {
    if (possibleJump.contents == 'empty') {
      moves.push(possibleJump);
      fork(moves, possibleJump.locale, options);
    }
  }

  function fork(moves, origin, options) {
    options.forkCount += 1;

    let nextRowLeft = getTileNRowsAhead(origin, 1, 'left', options);
    if (options.forkCount == 1 && nextRowLeft.contents == 'empty') {
      moves.push(nextRowLeft);
    } else if (nextRowLeft && nextRowLeft.contents == 'opponent') {
      let possibleJumpTo = getTileNRowsAhead(origin, 2, 'left', options);
      
      if (possibleJumpTo) handlePossibleJump(moves, possibleJumpTo, options);
    }

    let nextRowRight = getTileNRowsAhead(origin, 1, 'right', options);
    if (options.forkCount == 1 && nextRowRight.contents == 'empty') {
      moves.push(nextRowRight);
    } else if (nextRowRight && nextRowRight.contents == 'opponent') {
      let possibleJumpTo = getTileNRowsAhead(origin, 2, 'right', options);
      if (possibleJumpTo) handlePossibleJump(moves, possibleJumpTo, options);
    }
    
    
  }

  function getValidMoves(clickedPiece, game) {
    let origin = clickedPiece.location;
    const options = {
      board: game.history[game.history.length - 1],
      player: clickedPiece.player,
      forkCount: 0,
    };
    const moves = [];
    fork(moves, origin, options);
    return moves;
  }

  const isValidMove = (piece, validMoves) => validMoves.includes(piece.location);

  // const game = {
  //   history: [
  //     [
  //       [null, 2, null, 2, null, 0, null, 2],
  //       [0, null, 2, null, 2, null, 2, null],
  //       [null, 2, null, 2, null, 2, null, 0],
  //       [0, null, 0, null, 0, null, 2, null],
  //       [null, 0, null, 2, null, 0, null, 0],
  //       [1, null, 1, null, 2, null, 1, null],
  //       [null, 1, null, 1, null, 1, null, 1],
  //       [1, null, 0, null, 1, null, 1, null],
  //     ],
  //   ]
  // }

  // const piece = {
  //   location: '54',
  //   player: 'p2'
  // }


  // console.log(getValidMoves(piece, game));

  return {
    getValidMoves,
    isValidMove,
  };

})();