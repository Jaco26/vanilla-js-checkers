const BOARD_MODULE = (function(pieceMod, tileMod) {

  const { Piece } = pieceMod;
  const { Tile } = tileMod;

  const util = {
    generateTiles() {
      const { width, height } = this;
      const tileWidth = width / 8;
      const tileHeight = height / 8;
      const allRows = [];
      for (let i = 0; i < 7; i++) {
        const row = {};
        for (let j = 0; j < 7; j++) {
          row[`${i}${j}`] = new Tile(tileWidth * j, tileHeight * i, tileWidth, tileHeight, i, j);
        }
        allRows.push(row);
      }
      return allRows;
    },
  };

  class Board {
    constructor({ canvasId, width, height }) {
      const canvas = document.getElementById(canvasId);
      this.width = canvas.width = width;
      this.height = canvas.height = height;

      this.p1Pieces = [];
      this.p2Pieces = [];
      this.tiles = util.generateTiles.call(this);
    }
    

  }

  clog(new Board({
    canvasId: 'checkers-game', 
    width: 600, 
    height: 600,
  }))

  return { Board };

})(PIECE_MODULE, TILE_MODULE);