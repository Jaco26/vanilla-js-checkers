const GAME_MODULE = (function(boardMod) {

  const { Board } = boardMod;

  class Game {
    constructor(config) {
      this.board = new Board(config.board);
      this.board.generatePieces(config.pieces);
      this.board.drawPieces();

      this.history = [config.pieces];

    }
  }

  return { Game };

})(BOARD_MODULE);


const game = new GAME_MODULE.Game({
  board: {
    canvasId: 'checkers-game', 
    width: 700, 
    height: 700,
  },
  pieces: [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ]
});

clog(game);