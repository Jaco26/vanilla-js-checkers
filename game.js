const move = ( ({canvas}, board, validator, moves) => {  
  const { Validator, PossibleMoves } = validator;

  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);

    moves.findViableMoves(clickedPiece, game);

    const pieceStart = clickedPiece.getCurrentLocation(game);
    
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
      const pieceEnd = clickedPiece.getCurrentLocation(game);      
      const movedFromTile = Validator.movedFromTile(pieceStart.location, pieceEnd.location);
      const validMove = pieceEnd.tile.color == '#444444'; // TODO: replace 'true' with value returned from actual validation method
      if (movedFromTile) {
        if (validMove) {
          game.mapGameBoard();
          clickedPiece.snapToTile();
          game.reRenderPieces();
        } else {
          clickedPiece.snapToTile(pieceStart.tile);
          game.reRenderPieces();
        }
      } else {
        // player didn't move piece off of the square it occupied on mousedown
        clickedPiece.snapToTile();
        game.reRenderPieces();
      }
      
    }
  }


})(canvas, gameBoard, validator, moves);