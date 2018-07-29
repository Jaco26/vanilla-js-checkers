const move = ( ({canvas}, board, moveFinder, bi) => {  

  const game = board.startNewGame();
  console.log(game);
  
  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const validMoves = moveFinder.getValidMoves(clickedPiece, game);       
    bi.outlineValidMoves(validMoves, game);
    const pieceStart = clickedPiece.getCurrentLocation(game);

    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    }   

    function handleMousemove(e) {
      clickedPiece.changePosition(e);
      game.reRenderPieces();
    }

    function handleMouseup(e) {
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup);
      const pieceEnd = clickedPiece.getCurrentLocation(game);    
      const validMove = moveFinder.isValidMove(pieceEnd, validMoves);      
      if (validMove) {
        clickedPiece.snapToTile();
        bi.removeValidMovesHiliting(validMoves, game); // IMPORTANT: remove valid-tile hilighting and redraw the game pieces to see the dropped piece "snap" to tile
        game.mapGameBoard(); // IMPORTANT: must be called after clickedPiece position-change is registered by clickedPiece.snapToTile
      } else {
        clickedPiece.snapToTile(pieceStart.tile);
        clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
        bi.removeValidMovesHiliting(validMoves, game); 
      } 
    }
  }

})(canvas, gameBoard, moveFinder, boardInteraction);