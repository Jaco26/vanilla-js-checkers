const moveFinderPart2 = (() => {

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
    if (player == 'p2') return (colDirection == 'right' ? -9 : -11) * nRows;
  }

  function getTilesNRowsAhead(origin, nRows, colDirection, options) {
    const { board, player } = options;
    const tileIndex = (Number(origin) + getOriginModifier(nRows, player, colDirection)).toString();
    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);    
    const occupant = board[row][col];
    return {
      contents: tileContent(occupant, player),
      locale: tileIndex,
      tileLeft: getTilesNRowsAhead(tileIndex, 1, 'left', options),
      tileRight: getTilesNRowsAhead(tileIndex, 1, 'right', options),
    };
  }

  function fork(moves, origin, options) {
    moves.push(getTilesNRowsAhead(origin, 1, 'left', options));
    moves.push(getTilesNRowsAhead(origin, 1, 'right', options));
    console.log(moves);
    
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


  const game = {
    history: [
      [
        [null, 2, null, 2, null, 2, null, 2],
        [2, null, 2, null, 2, null, 2, null],
        [null, 2, null, 2, null, 2, null, 2],
        [0, null, 0, null, 0, null, 0, null],
        [null, 0, null, 0, null, 2, null, 0],
        [1, null, 1, null, 1, null, 1, null],
        [null, 1, null, 1, null, 1, null, 1],
        [1, null, 1, null, 1, null, 1, null],
      ],
    ]
  }

  const piece = {
    location: '54',
    player: 'p1'
  }


  getValidMoves(piece, game);

  return {
    getValidMoves,
  };

})();