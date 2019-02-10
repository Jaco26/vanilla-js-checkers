const GAME_MODEL = (function(boardMod, validPathsMod, animationMod) {

  const { Board } = boardMod;
  const { CheckersAnimations } = animationMod;
  const { ValidPaths } = validPathsMod;

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

    findValidPaths(start) {
      return new ValidPaths(start, this.tiles);
    }

  }

  return { Game };

})(BOARD_MODEL, VALID_PATHS_MODEL, ANIMATION_MODEL);
