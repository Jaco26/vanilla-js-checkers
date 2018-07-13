const game = ( ({canvas}, board) => {  
  canvas.addEventListener('mousedown', handleMousedown)

  function handleMousedown (e) {
    const allPieces = [...board.pieces.p1Pieces, ...board.pieces.p2Pieces];
    const clickedPiece = whichPieceGotClicked(e);
    
    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    } 
    
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
      board.checkGameLogic()      
    }

  }



})(canvas, gameBoard);