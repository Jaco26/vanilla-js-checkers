const TILE_MODEL = (function() {

  const util = {
    toCoods(rowColNum, direction) {
      const neighborNum = rowColNum + direction;
      let neighborStr = neighborNum.toString();
      neighborStr = neighborStr[1] ? neighborStr : '0' + neighborStr;
      const coords = {
        row: Number(neighborStr[0]),
        col: Number(neighborStr[1]),
      };
      if (
        isNaN(coords.row) 
        || coords.row > 7 
        || coords.row < 0 
        || isNaN(coords.col)
        || coords.col > 7 
        || coords.col < 0
      ) {
        coords.row = null;
        coords.col = null;
      }
      return coords;
    },
    generateNeighbors() {
      const rowColNum = Number(this.name);
      return {
        upLeft: util.toCoods(rowColNum, -11),
        upRight: util.toCoods(rowColNum, -9),
        downLeft: util.toCoods(rowColNum, 9),
        downRight: util.toCoods(rowColNum, 11),
      }
    }
  }

  class Tile {
    constructor(x, y, width, height, row, col, isRed) {
      this.isRed = isRed;
      this.color = isRed ? '#FFA' : '#444444';
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.row = row;
      this.col = col;
      this.neighbors = util.generateNeighbors.call(this);

      this.hasPiece = null;
    }

    get name() {
      return this.row.toString() + this.col.toString();
    }

    getNeighbors(keys) {
      return keys.map(key => this.neighbors[key]);
    }

    centerPiece() {
      const piece = this.hasPiece;
      if (piece) {
        piece.x = this.x + (this.width / 2);
        piece.y = this.y + (this.height / 2);
      }
    }
  }

  return { Tile };

})();



