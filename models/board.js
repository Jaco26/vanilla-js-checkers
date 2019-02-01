const BOARD_MODULE = (function() {

  const util = {

  }

  class Board {
    constructor() {
      this.p1Pieces = [];
      this.p2Pieces = [];
      this.tiles = [];
    }

    addTile(tile) {
      this.tiles.push(tile);
    }

    addPiece(piece) {
      this[piece.player + 'Pieces'].push(piece);
    }
    

  }

  return { Board };

})();