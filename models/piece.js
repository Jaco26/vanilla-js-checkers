const PIECE_MODULE = (function() {

  const util = {

  };

  class Piece {
    constructor(x, y, r, row, col, color, player) {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.row = row;
      this.col = col;

      this.color = color
      this.player = color
    }


    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }

  return { Piece };

})();