const GAME_MODEL = (function(boardMod, animationMod) {

  const { Board } = boardMod;
  const { CheckersAnimations } = animationMod;

  class Game {
    constructor(config) {
      this.board = new Board(config.board);
      this.history = [config.template];

      this.animations = new CheckersAnimations();

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

    get tiles() {
      return this.board.tiles;
    }

    tileCoords(e) {
      const { width, height } = this.board.tileDimensions;
      const rowIndex = Math.floor(e.offsetY / height);
      const colIndex = Math.floor(e.offsetX / width);
      return { rowIndex, colIndex };
    }

    findTile(e) {
      const { rowIndex, colIndex } = this.tileCoords(e);
      return this.tiles[rowIndex][colIndex];
    }

  }

  return { Game };

})(BOARD_MODEL, ANIMATION_MODEL);
