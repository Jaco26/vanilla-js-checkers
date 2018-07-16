const game = ( ({canvas}, board) => {  
  
  const game = board.startNewGame();
  console.log(game);

  canvas.addEventListener('mousedown', handleMouseDown);

  function handleMouseDown (e) {
    const clickedPiece = game.clickedPiece(e);
    console.log(clickedPiece);
    const originalPosition = clickedPiece.originalPosition(e);
    console.log(originalPosition);
    
    
    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    } 

    validMove.findPossibleMoves(null, clickedPiece)
    

    function whichPieceGotClicked (e) {
      return allPieces.filter(piece => {
        return piece.x + piece.radius > e.offsetX
          && piece.x - piece.radius < e.offsetX
          && piece.y + piece.radius > e.offsetY
          && piece.y - piece.radius < e.offsetY;
      })[0];
    }

    function handleMousemove(e) {
      clickedPiece.changePosition(e)
      board.reRenderPieces()
    }

    function handleMouseup(e) {      
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup);
      let isValid = board.checkGameLogic();
      if (!isValid) {
        clickedPiece.changePosition(originalPosition);
        board.reRenderPieces();
      }
      console.log(board.gameHistory);
      
    }

  }



})(canvas, gameBoard);