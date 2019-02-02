const TILE_MODULE = (function() {

  const toCoordStr = (rowColNum, dir) => rowColNum + dir < 10 
    ? '0' + (rowColNum + dir).toString() 
    : (rowColNum + dir).toString();

  const util = {
    generateNeighbors() {
      const rowStr = this.row.toString();
      const colStr = this.col.toString();
      const rowColNumber = Number(rowStr + colStr);      
      let upLeft =  toCoordStr(rowColNumber, -11);
      let upRight = toCoordStr(rowColNumber, -9);
      let downLeft = toCoordStr(rowColNumber, 9);
      let downRight =  toCoordStr(rowColNumber, 11);
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

      this.hasPiece = false;
    }

    get name() {
      return this.row.toString() + this.col.toString();
    }
  }

  return { Tile };

})();



