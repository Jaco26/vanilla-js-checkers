const boardInteraction = (() => {

  const highlightValidPathTiles = (tileType, valid, game) => {
    if (tileType != 'opponent' && tileType != 'empty') throw new Error('Invalid value passed as "tileType" argument');
    valid.moves.filter(tile => tile.contents == tileType)
      .map(tile => tile.locale)
      .forEach(locale => {
        let rowI = Number(locale[0]);
        let colI = Number(locale[1]);
        let tile = game.tiles[rowI][colI];
        tile.color = tileType == 'empty' ? '#44aa99' : '#992288';
      });
    game.reRenderPieces(); // IMPORTANT: redraws pieces to reflect tiles' color change immediatly
  }

  const highlightValidPaths = (validPaths, game) => ['empty', 'opponent'].forEach(type => highlightValidPathTiles(type, validPaths, game));

  const removeValidMovesHiliting = (valid, game) => {
    valid.moves.map(tile => tile.locale)
    .forEach(move => {
      let rowI = Number(move[0]);
      let colI = Number(move[1]);
      let tile = game.tiles[rowI][colI];
      tile.color = '#444444';
    });
    game.reRenderPieces();
  }

  return {
    highlightValidPaths,
    removeValidMovesHiliting,
  };

})();