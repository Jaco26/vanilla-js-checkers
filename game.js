const move = ( ({canvas}, templates, board, moveFinder, bi, validPathTaken, rmOppPcs, starfish) => {  

  const game = board.startNewGame(templates.standard);
  console.log(game);
  

  

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);

    const starfishResult = starfish.starfish(game.history[game.history.length - 1], clickedPiece.getCurrentLocation(game).location);

    console.log('starfish results for clicked piece\n', starfishResult);
    
    let possible, pieceStart;

    if (clickedPiece && clickedPiece.player === game.whoseTurn()) {
      clickedPiece.setPathEmpty(); 
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
      possible = moveFinder.getValidMoves(clickedPiece, game);
      pieceStart = clickedPiece.getCurrentLocation(game);
      bi.highlightValidPaths(possible, game);
    }   
    
    if (possible) {
      console.log(`Possible moves and paths for ${clickedPiece.player}:`, possible);
    } else if (clickedPiece) {
      console.log(`It is not ${clickedPiece.player}'s turn!`);
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
      if (!pieceEnd) { // if piece is dropped on the exact intersection of two or more tiles
        console.log('Piece was dropped on exact intersection of tiles')
        handleInvalidMove(clickedPiece, pieceStart, possible);
      } else {
        const validMove = moveFinder.isValidMove(pieceEnd, possible);
        if (validMove) {
          const pathTaken = validPathTaken.getValidPathTraveled(clickedPiece, possible, game); // determine which path the piece took
          if (pathTaken) {
            const piecesToRemove = rmOppPcs.getOpponentPiecesToRemove(pathTaken, possible);
            game.removeOpponentPieces(clickedPiece, piecesToRemove)
            clickedPiece.snapToTile(pieceEnd.tile);
            bi.removeValidMovesHiliting(possible, game); // IMPORTANT: remove valid-tile hilighting and redraw the game pieces to see the dropped piece "snap" to tile
            game.drawPath(clickedPiece.path); // draw small squares reperesenting the piece's path as it was dragged along the board
            game.mapGameBoard(); // IMPORTANT: must be called after clickedPiece position-change is registered by clickedPiece.snapToTile
            game.saveTurn(clickedPiece, pathTaken);
          } else {
            handleInvalidMove(clickedPiece, pieceStart, possible);
          }
        } else {
          handleInvalidMove(clickedPiece, pieceStart, possible);
        } 
      }   
    }
  }

  function handleInvalidMove(clickedPiece, pieceStart, possibleMoves) {
    clickedPiece.snapToTile(pieceStart.tile);
    clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
    bi.removeValidMovesHiliting(possibleMoves, game);
  }

})(canvas, SETUP_TEMPLATES, GAMEBOARD, moveFinder, boardInteraction, VALID_PATH_TAKEN, REMOVE_OPPONENT_PIECES, STARFISH);