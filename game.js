const move = ( ({canvas}, templates, board, moveFinder, bi, validPathTaken, rmOppPcs) => {  

  const game = board.startNewGame(templates.standard);
  console.log(game);
  
  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const valid = moveFinder.getValidMoves(clickedPiece, game);  
    bi.highlightValidPaths(valid, game);
         
    const pieceStart = clickedPiece.getCurrentLocation(game);

    console.log(valid);
    
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
      const validMove = moveFinder.isValidMove(pieceEnd, valid);
      if (validMove) {
        const pathTaken = validPathTaken.getValidPathTraveled(clickedPiece, valid, game); // determine which path the piece took
        if (pathTaken) {
          rmOppPcs.removeOpponentPieces(clickedPiece, pathTaken, valid, game);
          clickedPiece.snapToTile(pieceEnd.tile);
          bi.removeValidMovesHiliting(valid, game); // IMPORTANT: remove valid-tile hilighting and redraw the game pieces to see the dropped piece "snap" to tile
          game.drawPath(clickedPiece.path); // draw small squares reperesenting the piece's path as it was dragged along the board
          game.mapGameBoard(); // IMPORTANT: must be called after clickedPiece position-change is registered by clickedPiece.snapToTile
        } else {
          // TODO: find way to get rid of this repeating code. Me want DRY not WET
          clickedPiece.snapToTile(pieceStart.tile);
          clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
          bi.removeValidMovesHiliting(valid, game);
        }
      } else {
        clickedPiece.snapToTile(pieceStart.tile);
        clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
        bi.removeValidMovesHiliting(valid, game);
      } 
      
    }
  }

})(canvas, SETUP_TEMPLATES, GAMEBOARD, moveFinder, boardInteraction, VALID_PATH_TAKEN, REMOVE_OPPONENT_PIECES);