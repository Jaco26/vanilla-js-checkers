const NEW_GAME_CONTROLLER = (function(pieceMod, tileMod, boardMod) {

  const { Piece } = pieceMod;
  const { Tile } = tileMod;
  const { Board } = boardMod;

  function generateTiles() {
    out(this);
  }

  function generatePieces() {
    out(this);
  }

  function newBoard() {
    const board = new Board();
    generateTiles.call(board);
    generatePieces.call(board);
    return board;
  }


  return { newBoard };

})(PIECE_MODULE, TILE_MODULE, BOARD_MODULE);