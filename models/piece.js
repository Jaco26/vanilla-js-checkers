const PIECE_MODULE = (function() {

  const util = {

  };

  class Piece {
    constructor(x, y, radius, color, player) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.player = player;
    }

    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }

  return { Piece };

})();