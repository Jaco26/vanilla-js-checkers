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

const { uiConfig } = UI_CONTROLLER;

const game = new GAME_MODEL.Game({
  board: {
    canvasId: 'checkers-game',
    width: 700,
    height: 700,
  },
  template: templates.standard,
  shouldAnimate: false
});

game.canvas.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e) {
  const clickedTile = game.findTile(e);
  const clickedPiece = clickedTile.hasPiece;
  let validPaths;

  if (clickedPiece) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    game.animations.stop('possiblePaths');

    validPaths = game.findValidPaths(clickedTile);
    console.log(validPaths);
    
  }

  if (validPaths && validPaths.list.length && uiConfig.shouldAnimate) {
    game.animations.possiblePaths(validPaths.list, game)
  } 

  function handleMouseMove(e) { 
    game.animations.stop('possiblePaths')
    clickedPiece.changePosition(e);
    game.board.renderBoard();
  }
  
  function handleMouseUp(e) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    try {

      const newTile = game.findTile(e);

      if (!newTile.hasPiece && !newTile.isRed) {

        game.animations.stop('possiblePaths');

        clickedTile.hasPiece = null;

        newTile.hasPiece = clickedPiece;

        newTile.centerPiece();

      } else {

        clickedTile.centerPiece();
      }

    } catch (err) {
      clickedTile.centerPiece();
    }

    game.board.renderBoard();
    
  }
}


