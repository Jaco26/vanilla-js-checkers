const moveFinder = ((pathBuilder) => {

  const outOfBounds = (i) => i ? (!Number(i) && Number(i) != 0) || Number(i) > 7 : null;

  const nextRowIsOneOutFromRoot = (row, options) => row ? Math.abs(Number(options.root) - Number(row.locale)) < 12 : null;
  
  const possibleJumpIsValid = (possibleJump) => possibleJump && possibleJump.contents == 'empty';

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

  function getOriginModifierForward(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -9 : -11) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 11 : 9) * nRows;
  }

  function getOriginModifierBackward(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -11 : -9) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 9 : 11) * nRows;
  }

  function getTileIndex(origin, nRows, player, colDirection, forward) {
    let initial = forward
      ? (Number(origin) + getOriginModifierForward(nRows, player, colDirection)).toString()
      : (Number(origin) + getOriginModifierBackward(nRows, player, colDirection)).toString();    
    let secondary = initial.length == 2 ? initial : '0' + initial;
    return Number(secondary) > 0 ? secondary : null;
  }

  function getTileNRowsAhead(origin, nRows, colDirection, options, forward) {
    const { board, player } = options;
    const tileIndex = getTileIndex(origin, nRows, player, colDirection, forward);    
    if (!tileIndex) return; 
    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);
    if (outOfBounds(row) || outOfBounds(col)) return;
    const occupant = board[row][col];
    const contents = tileContent(occupant, player);    
    if (contents) {
      return {
        contents,
        locale: tileIndex,
      };
    }
  }

  function fork(moves, origin, options) {    
    let nextRowLeft = getTileNRowsAhead(origin, 1, 'left', options);
    if (nextRowLeft && nextRowLeft.contents == 'opponent') {
      let possibleJump = getTileNRowsAhead(origin, 2, 'left', options);
      if (possibleJumpIsValid(possibleJump)) {
        moves.push(nextRowLeft, possibleJump);
        fork(moves, possibleJump.locale, options);
      }
    } else if (nextRowIsOneOutFromRoot(nextRowLeft, options) && nextRowLeft.contents == 'empty') {
      moves.push(nextRowLeft);
    } 

    // let backRowLeft = getTileNRowsAhead(origin, -1, 'left', options);
    // if (backRowLeft && backRowLeft.contents == 'opponent') {
    //   let possibleJump = getTileNRowsAhead(origin, 2, 'left', options);
    //   if (possibleJumpIsValid(possibleJump)) {
    //     moves.push(backRowLeft, possibleJump);
    //     fork(moves, possibleJump.locale, options);
    //   }
    // } else if (nextRowIsOneOutFromRoot(backRowLeft, options) && backRowLeft.contents == 'empty') {
    //   moves.push(backRowLeft);
    // } 


    let nextRowRight = getTileNRowsAhead(origin, 1, 'right', options);
    if (nextRowRight && nextRowRight.contents == 'opponent') {
      let possibleJump = getTileNRowsAhead(origin, 2, 'right', options);
      if (possibleJumpIsValid(possibleJump)) {
        moves.push(nextRowRight, possibleJump);
        fork(moves, possibleJump.locale, options);
      }
    } else if (nextRowIsOneOutFromRoot(nextRowRight, options) && nextRowRight.contents == 'empty') {
      moves.push(nextRowRight);
    } 

    // let backRowRight = getTileNRowsAhead(origin, -1, 'right', options);
    // if (backRowRight && backRowRight.contents == 'opponent') {
    //   let possibleJump = getTileNRowsAhead(origin, 2, 'right', options);
    //   if (possibleJumpIsValid(possibleJump)) {
    //     moves.push(backRowRight, possibleJump);
    //     fork(moves, possibleJump.locale, options);
    //   }
    // } else if (nextRowIsOneOutFromRoot(backRowRight, options) && backRowRight.contents == 'empty') {
    //   moves.push(backRowRight);
    // } 

  }

  function getValidMoves(clickedPiece, game) {
    let origin = clickedPiece.location;
    const options = {
      root: origin,
      board: game.history[game.history.length - 1],
      player: clickedPiece.player,
      isKing: clickedPiece.isKing,
    };
    const moves = [];
    fork(moves, origin, options);    
    const paths = pathBuilder.buildPath(clickedPiece, origin, moves);
    return {
      moves,
      paths,
    };
  }

  const isValidMove = (piece, valid) => {
    return valid.moves.filter(tile => tile.contents == 'empty')
      .map(tile => tile.locale)
      .includes(piece.location);
  };

  return {
    getValidMoves,
    isValidMove,
  };

})(PATH_BUILDER);