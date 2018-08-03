const move = ( ({canvas}, board, moveFinder, bi, jumps) => {  

  const game = board.startNewGame();
  console.log(game);
  
  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const validMoves = moveFinder.getValidMoves(clickedPiece, game);       
    const pieceStart = clickedPiece.getCurrentLocation(game);

    let sortedValidMoves = validMoves.sort((a, b) => {
      return Number(a) < Number(b);
    });
   
    

    bi.outlineValidMoves(validMoves, game);

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


      //  console.log('Start Point', pieceStart.location);
      //  console.log('Sorted Valid Moves', sortedValidMoves);
      //  console.log('End Point', pieceEnd.location);
       

      if (validMove) {
        clickedPiece.snapToTile(pieceEnd.tile);
        bi.removeValidMovesHiliting(validMoves, game); // IMPORTANT: remove valid-tile hilighting and redraw the game pieces to see the dropped piece "snap" to tile
        game.drawPath(clickedPiece.path);
        jumps.normalizePath(clickedPiece, pieceStart, pieceEnd, validMoves, game);
        game.mapGameBoard(); // IMPORTANT: must be called after clickedPiece position-change is registered by clickedPiece.snapToTile
      } else {
        clickedPiece.snapToTile(pieceStart.tile);
        clickedPiece.getCurrentLocation(game); // IMPORTANT: reset location of clicked piece
        bi.removeValidMovesHiliting(validMoves, game); 
      } 


      // // experiment with path tracking...
      // let path = clickedPiece.path;
      // // console.log(path);
      // clickedPiece.setPathEmpty();
      // // console.log(clickedPiece);
      
    }
  }

})(canvas, gameBoard, moveFinder, boardInteraction, whoGotJumped);