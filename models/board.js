const BOARD_MODEL = (function(pieceMod, tileMod) {

  const { Piece } = pieceMod;
  const { Tile } = tileMod;

  class Board {
    constructor({ canvasId, width, height }) {
      const canvas = document.getElementById(canvasId);
      this.ctx = canvas.getContext('2d');
      this.width = canvas.width = width;
      this.height = canvas.height = height;

      this.p1Pieces = [];
      this.p2Pieces = [];
      this.tiles = [];

      this.generateTiles();
      this.renderBoard();
    }

    get tileDimensions() {
      return {
        width: this.width / 8,
        height: this.height / 8,
      };
    }

    generateTiles() {
      const tileWidth = this.tileDimensions.width;
      const tileHeight = this.tileDimensions.height;
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
    }

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
    }

    generatePieces(pieceMatrix) {
      const { tileDimensions, tiles, p1Pieces, p2Pieces } = this;
      const radius = tileDimensions.width * 0.4;       
      pieceMatrix.forEach((row, i) => {
        row.forEach((col, j) => {
          if (col) {
            const tile = tiles[i][j];
            const x = tile.x + (tile.width / 2);
            const y = tile.y + (tile.height / 2);
            const newPiece = new Piece(x, y, radius, i, j);
            tile.hasPiece = newPiece;
            if (col == 1) {
              newPiece.color = 'white';
              newPiece.player = 'p1';
              p1Pieces.push(newPiece);
            } else if (col == 2) {
              newPiece.color = 'purple';
              newPiece.player = 'p2';
              p2Pieces.push(newPiece);
            }
          }
        });
      });
    }

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
    }

    renderBoard() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawTiles();
      this.drawPieces();
    }
  }

  return { Board };

})(PIECE_MODEL, TILE_MODEL);