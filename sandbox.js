const sandbox = ( () => {

  
  function tileContent(occupant, playerOpponent) {
    if (occupant == playerOpponent) {
      return 'opponent';
    } else if (occupant == 0) {
      return 'empty';
    } else {
      return 'team'
    }
  }

  function getOriginModifier(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -9 : -11) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 9 : 11) * nRows;
  } 

  function getTileNRowsAhead(nRows, colDirection, options) {
    const { board, player, origin } = options;    
    const tileIndex = (Number(origin) + getOriginModifier(nRows, player, colDirection)).toString();
    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);
    return {
      contents: board[row][col],
      location: tileIndex,
    };
  }


  function forkFromOrigin(paths, options) {
    let nextRowLeft = getTileNRowsAhead(1, 'left', options);
    let nextRowRight = getTileNRowsAhead(1, 'right', options);
    console.log(nextRowLeft);
    console.log(nextRowRight);
  }

  function getValidPaths(clickedPiece, game) {
    const startPos = clickedPiece.location;
    const options = {
      board: game.history[game.history.length - 1],
      player: clickedPiece.player,
      origin: clickedPiece.location,
      opponent: clickedPiece.player == 'p1' ? 2 : 1,
      count: 0,
    };    
    const paths = [];
    forkFromOrigin(paths, options)
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

  getValidPaths(piece, game)

})();