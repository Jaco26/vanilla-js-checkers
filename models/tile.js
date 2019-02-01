const TILE_MODULE = (function() {

  const util = {
    generateNeighbors() {
      const rowColNumber = Number(this.row.toString() + this.col.toString());
      let upLeft = (rowColNumber - 11).toString();
      let upRight = (colRowNumber - 9).toString();
      let downLeft = (rowColNumber + 9).toString();
      let downRight =  (rowColNumber + 11).toString();
      if (this.row === 0) {
        upLeft = null;
        upRight = null;
      } 
      if (this.row === 7) {
        downLeft = null;
        downRight = null;
      }
      if (this.col === 0) {
        upLeft = null;
        downLeft = null;
      }
      if (this.col === 7) {
        upRight = null;
        downRight = null;
      }
      return { upLeft, upRight, downLeft, downRight };
    }
  }

  class Tile {
    constructor(x, y, width, height, row, col) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.row = row;
      this.col = col;
      this.neighbors = util.generateNeighbors.call(this);

      this.hasPiece = false;
    }

    get name() {
      return this.row.toString() + this.col.toString();
    }
  }

  return { Tile };

})();



