const game = ( ({canvas}, board, validator) => {  
  const { Validator } = validator;


  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    const originalPosition = clickedPiece.originalPosition(e);
    const possibleMoves = Validator.possibleMoves(clickedPiece, game);
    console.log(possibleMoves);
  

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
      if (true) {
        game.mapGameBoard()
      }
      console.log(game.history);
      
    }

  }



})(canvas, gameBoard, validator);