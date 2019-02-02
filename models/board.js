const BOARD_MODULE = (function(pieceMod, tileMod) {

  const { Piece } = pieceMod;
  const { Tile } = tileMod;

  const util = {
    generateTiles() {
      const { width, height } = this;
      const tileWidth = width / 8;
      const tileHeight = height / 8;
      const allRows = [];
      let isRed = false;
      for (let i = 0; i < 7; i++) {
        const row = {};
        for (let j = 0; j < 7; j++) {
          isRed = !isRed;
          row[`${i}${j}`] = new Tile(tileWidth * j, tileHeight * i, tileWidth, tileHeight, i, j, isRed);
        }
        allRows.push(row);
      }
      this.tiles = allRows;
    },
    drawTiles() {
      const { ctx, tiles } = this;
      tiles.forEach(row => {
        Object.keys(row).forEach(key => {
          const { x, y, width, height, color } = row[key];
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(x, y, width, height);
          ctx.closePath();
        });
      });
    },
    generatePieces() {

    },
    drawPieces() {

    },
  };

  class Board {
    constructor({ canvasId, width, height }) {
      const canvas = document.getElementById(canvasId);
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width = width;
      this.height = canvas.height = height;

      this.p1Pieces = [];
      this.p2Pieces = [];
      this.tiles = [];
      
      util.generateTiles.call(this);
      util.generatePieces.call(this);
      this.drawTiles()
      this.drawPieces();
    }

    drawTiles() {
      util.drawTiles.call(this);
    }

    drawPieces() {
      util.drawPieces.call(this);
    }
    

  }

  clog(new Board({
    canvasId: 'checkers-game', 
    width: 700, 
    height: 700,
  }))

  return { Board };

})(PIECE_MODULE, TILE_MODULE);