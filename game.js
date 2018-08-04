const move = ( ({canvas}, board, moveFinder, bi, jumps) => {  

  const game = board.startNewGame();
  console.log(game);
  
  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const validMoves = moveFinder.getValidMoves(clickedPiece, game);       
    const pieceStart = clickedPiece.getCurrentLocation(game);

    bi.hiliteValidMoves(validMoves, game);

    if (clickedPiece) {
      clickedPiece.setPathEmpty();
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    }   

    function handleMousemove(e) {
      clickedPiece.changePosition(e);
      clickedPiece.trackPath();
      game.reRenderPieces();
    }

    function handleMouseup(e) {
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup);
      const pieceEnd = clickedPiece.getCurrentLocation(game);    
      const validMove = moveFinder.isValidMove(pieceEnd, validMoves);      
      if (validMove) {
        clickedPiece.snapToTile(pieceEnd.tile);
        bi.removeValidMovesHiliting(validMoves, game); // IMPORTANT: remove valid-tile hilighting and redraw the game pieces to see the dropped piece "snap" to tile
        game.drawPath(clickedPiece.path); // draw small squares reperesenting the piece's path as it was dragged along the board
        game.mapGameBoard(); // IMPORTANT: must be called after clickedPiece position-change is registered by clickedPiece.snapToTile
        jumps.findPath(clickedPiece, pieceStart, pieceEnd, validMoves, game); // IMPORTANT: must be called after mapGameBoard to provide an up-to-date version of the game board to the functions determining which pieces got jumped (if any)
      } else {
        clickedPiece.snapToTile(pieceStart.tile);
        clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
        bi.removeValidMovesHiliting(validMoves, game); 
      } 
      
    }
  }

})(canvas, gameBoard, moveFinder, boardInteraction, whoGotJumped);