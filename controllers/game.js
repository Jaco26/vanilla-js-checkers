const templates = {
  standard: [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ],
};

const game = new GAME_MODULE.Game({
  board: {
    canvasId: 'checkers-game',
    width: 700,
    height: 700,
  },
  template: templates.standard,
});

game.canvas.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e) {
  const tile = game.findTile(e);
  clog(tile);
  
  
}
