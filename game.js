const move = ( ({canvas}, board, moveFinder) => {  
  // const { Validator, PossibleMoves } = validator;

  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);

    // const validMoves = moves.findViableMoves(clickedPiece, game);
    // console.log(validMoves);

    // const validMoves = moves.coneOfPossibility(clickedPiece, game);
    // console.log(validMoves);
    console.log(moveFinder.validMoves(clickedPiece, game));
    
    
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
      // const movedFromTile = Validator.movedFromTile(pieceStart.location, pieceEnd.location);
      // const validMove = validMoves.some(tile => tile.index2d == pieceEnd.location);
      const validMove = pieceEnd.tile.color == '#444444';
      game.mapGameBoard();
      // if (movedFromTile) {
      //   if (validMove) {
      //     game.mapGameBoard();
      //     clickedPiece.snapToTile();
      //     game.reRenderPieces();
      //   } else {
      //     clickedPiece.snapToTile(pieceStart.tile);
      //     game.reRenderPieces();
      //   }
      // } else {
      //   // player didn't move piece off of the square it occupied on mousedown
      //   clickedPiece.snapToTile();
      //   game.reRenderPieces();
      // }
      
    }
  }


})(canvas, gameBoard, moveFinder);