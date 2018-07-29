const move = ( ({canvas}, board, moveFinder) => {  
  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    console.log(clickedPiece);
    
    const validMoves = moveFinder.getValidMoves(clickedPiece, game);    
    console.log(validMoves);
    
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
      const validMove = moveFinder.isValidMove(pieceEnd, validMoves);      
      if (validMove) {
        game.mapGameBoard();
        clickedPiece.snapToTile();
        game.reRenderPieces(); // IMPORTANT: need to redraw the game pieces to see the dropped piece "snap" to tile...
      } else {
        clickedPiece.snapToTile(pieceStart.tile);
        clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
        game.reRenderPieces();
      } 
    }
  }


})(canvas, gameBoard, moveFinder);