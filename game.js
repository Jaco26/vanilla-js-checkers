const game = ( ({canvas}, board) => {  
  
  const game = board.startNewGame();
  console.log(game);
  


  function handleMouseDown (e) {
    const allPieces = [...pieces.p1Pieces, ...pieces.p2Pieces];
    const clickedPiece = whichPieceGotClicked(e);
    const originalPosition = {
      offsetX: clickedPiece.x,
      offsetY: clickedPiece.y
    };
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

  canvas.addEventListener('mousedown', handleMouseDown);

})(canvas, gameBoard);