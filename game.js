const game = ( ({canvas}, board, validator) => {  
  const { Validator } = validator;


  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const originalPosition = clickedPiece.originalPosition(e);
    const originalLocation = clickedPiece.getCurrentLocation(game);
    const possibleMoves = Validator.possibleMoves(clickedPiece, game);
    
 
  

    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    } 

    // validMove.findPossibleMoves(null, clickedPiece)
    
    function handleMousemove(e) {
      clickedPiece.changePosition(e)
      game.reRenderPieces()
    }

    function handleMouseup(e) {      
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup);
      const newLocation = clickedPiece.getCurrentLocation(game);
      console.log(originalLocation);
      console.log(newLocation);

      if (originalLocation == newLocation) {
        // player didn't move piece off of the square it occupied
        // on mousedown
        clickedPiece.changePosition(originalPosition);
        game.reRenderPieces()
      } else {
        game.mapGameBoard();
      }

     
      
    }

  }



})(canvas, gameBoard, validator);