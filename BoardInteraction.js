const boardInteraction = ( () => {

  const outlineValidMoves = (validMoves, game) => {
    validMoves.forEach(move => {
      let rowI = Number(move[0]);
      let colI = Number(move[1]);
      let tile = game.tiles[rowI][colI];
      tile.color = '#44aa99';
    });
    game.reRenderPieces();
  }

  const removeValidMovesHiliting = (validMoves, game) => {
    validMoves.forEach(move => {
      let rowI = Number(move[0]);
      let colI = Number(move[1]);
      let tile = game.tiles[rowI][colI];
      tile.color = '#444444';
    });
    game.reRenderPieces();
  }

  return {
    outlineValidMoves,
    removeValidMovesHiliting,
  };

})();