const PIECE_MODULE = (function() {

  class Piece {
    constructor(x, y, r, row, col) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.row = row;
      this.col = col;

      this.color = '';
      this.player = '';
    }

    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }

  return { Piece };

})();