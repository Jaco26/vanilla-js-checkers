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


const game = new GAME_MODEL.Game({
  board: {
    canvasId: 'checkers-game',
    width: 700,
    height: 700,
  },
  template: templates.standard,
});

game.canvas.addEventListener('mousedown', handleMouseDown);

function handleMouseDown(e) {
  const clickedTile = game.findTile(e);
  const clickedPiece = clickedTile.hasPiece;
  let validPaths;

  if (clickedPiece) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    if (game.animations.intervalId) clearInterval(game.animations.intervalId);
    validPaths = PATH_CONTROLLER.findValidPaths(clickedTile, game.tiles);
  }

  if (validPaths && validPaths.list.length) {
    game.animations.possiblePaths(validPaths.list, game)
  } 

  function handleMouseMove(e) { 
    if (game.animations.intervalId) clearInterval(game.animations.intervalId);   
    clickedPiece.changePosition(e);
    game.board.renderBoard();
  }
  
  function handleMouseUp(e) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    try {
      const newTile = game.findTile(e);
      console.log(validPaths);
      if (!newTile.hasPiece && !newTile.isRed) {
        if (game.animations.intervalId) clearInterval(game.animations.intervalId);
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


