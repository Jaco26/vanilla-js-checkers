const GAME_MODULE = (function(boardMod) {

  const { Board } = boardMod;

  class Game {
    constructor(config) {
      this.board = new Board(config.board);
      this.history = [config.pieces];

      this.board.generatePieces(config.template);
      this.board.drawPieces();
    }

    get canvas() {
      return this.board.ctx.canvas;
    }

    get pieces() {
      return player => player 
        ? this.board[player + 'Pieces'] 
        : [...this.board.p1Pieces, ...this.board.p2Pieces];
    }

    findTile(e) {
      const { width, height } = this.board.tileDimensions;
      const rowIndex = Math.floor(e.offsetY / height);
      const colIndex = Math.floor(e.offsetX / width);
      return { rowIndex, colIndex };
    }

  }

  return { Game };

})(BOARD_MODULE);
