const move = ( ({canvas}, board, validator) => {  
  const { Validator } = validator;

  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const location1 = clickedPiece.getCurrentLocation(game);
    const possibleMoves = Validator.possibleMoves(clickedPiece, game);
    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    }   
    

    function handleMousemove(e) {
      clickedPiece.changePosition(e)
      game.reRenderPieces()
    }

    function handleMouseup(e) {
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup);
      const location2 = clickedPiece.getCurrentLocation(game);
      const movedFromTile = Validator.movedFromTile(location1, location2)
      if (movedFromTile) {
        // player didn't move piece off of the square it occupied on mousedown
        clickedPiece.snapToTile();
        game.reRenderPieces();
      } else {
        game.mapGameBoard();
        clickedPiece.snapToTile();
        game.reRenderPieces();
      }
    }
  }


})(canvas, gameBoard, validator);