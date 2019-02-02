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
      for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          isRed = !isRed;
          row.push(
            new Tile(tileWidth * j, tileHeight * i, tileWidth, tileHeight, i, j, isRed)
          );
        }
        isRed = !isRed;
        allRows.push(row);
      }
      this.tiles = allRows;
    },
    drawTiles() {
      const { ctx, tiles } = this;
      tiles.forEach(row => {
        row.forEach(tile => {
          const { x, y, width, height, color } = tile;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.fillRect(x, y, width, height);
          ctx.closePath();
        });
      });
    },
    generatePieces(graph) {
      const { tiles, p1Pieces, p2Pieces } = this;
      const radius = tiles[0][0].width * 0.4; 
      graph.forEach((row, i) => {
        row.forEach((col, j) => {
          if (col) {
            const tile = tiles[i][j];
            const x = tile.x + (tile.width / 2);
            const y = tile.y + (tile.height / 2);
            if (col == 1) {
              p1Pieces.push(new Piece(x, y, radius, i, j, 'white', 'p1'));
            } else if (col == 2) {
              p2Pieces.push(new Piece(x, y, radius, i, j, 'purple', 'p2'));
            }
          }
        });
      });
    },
    drawPieces() {
      const { ctx, p1Pieces, p2Pieces } = this;
      [...p1Pieces, ...p2Pieces].forEach(piece => {
        const { x, y, radius, color } = piece;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y,radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      });
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

      this.history = [];
      
      util.generateTiles.call(this);
      this.drawTiles()
    }

    drawTiles() {
      util.drawTiles.call(this);
    }

    generatePieces(graph) {
      this.history.push(graph);
      util.generatePieces.call(this, graph);
    }

    drawPieces() {
      util.drawPieces.call(this);
    }
  }

  const board = new Board({
    canvasId: 'checkers-game', 
    width: 700, 
    height: 700,
  });

  clog(board)

  board.generatePieces([
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ]);

  board.drawPieces();

  return { Board };

})(PIECE_MODULE, TILE_MODULE);