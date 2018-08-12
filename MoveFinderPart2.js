const moveFinderPart2 = (() => {

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

  function getOriginModifier(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -9 : -11) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 11 : 9) * nRows;
  }

  function getTileIndex(origin, nRows, player, colDirection) {
    let initial = (Number(origin) + getOriginModifier(nRows, player, colDirection)).toString();
    let secondary = initial.length == 2 ? initial : '0' + initial;
    return Number(secondary) > 0 ? secondary : undefined;
  }

  function getTileNRowsAhead(origin, nRows, colDirection, options) {
    const { board, player } = options;
    const tileIndex = getTileIndex(origin, nRows, player, colDirection);   
    if (!tileIndex) return; 
    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);
    if (outOfBounds(row) || outOfBounds(col)) return;
    console.log('Active tile index', tileIndex, 'forkcount', options.forkCount); // IMPORTANT: Keep this here, info could be helpful in building path tree   
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
    options.forkCount += 1;
    let nextRowLeft = getTileNRowsAhead(origin, 1, 'left', options);
    // console.log(nextRowIsOneOutFromRoot(nextRowLeft, options));

    if (nextRowLeft && nextRowLeft.contents == 'opponent') {
      let possibleJump = getTileNRowsAhead(origin, 2, 'left', options);
      if (possibleJumpIsValid(possibleJump)) {
        moves.push(nextRowLeft, possibleJump);
        fork(moves, possibleJump.locale, options);
      }
    } else if (nextRowIsOneOutFromRoot(nextRowLeft, options) && nextRowLeft.contents == 'empty') {
      moves.push(nextRowLeft);
    } 

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
  }

  function getValidMoves(clickedPiece, game) {
    let origin = clickedPiece.location;
    const options = {
      root: origin,
      board: game.history[game.history.length - 1],
      player: clickedPiece.player,
      forkCount: 0,
    };
    const moves = [];
    fork(moves, origin, options);
    return moves;
  }

  const isValidMove = (piece, validPaths) => {
    return validPaths.filter(tile => tile.contents == 'empty')
      .map(tile => tile.locale)
      .includes(piece.location);
  };

  return {
    getValidMoves,
    isValidMove,
  };

})();