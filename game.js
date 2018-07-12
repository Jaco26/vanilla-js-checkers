const game = ( ({canvas}, board) => {  
  canvas.addEventListener('mousedown', handleMousedown)

  function handleMousedown (e) {
    const allPieces = [...board.pieces.p1Pieces, ...board.pieces.p2Pieces];
    const clicked = whichTileGotClicked(e);     
    const tileHasPiece = clicked.hasPiece(allPieces);
    const clickedPiece = whichPieceGotClicked(e);
    console.log(clickedPiece);

    
    if (clickedPiece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    } 

    function whichTileGotClicked(e) {
      return board.tiles.tilesArray.filter(tile => {
        return tile.x < e.offsetX
          && tile.x + tile.width > e.offsetX
          && tile.y < e.offsetY
          && tile.y + tile.height > e.offsetY;
      })[0];
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
      clickedPiece.findLocation(board.tiles.tilesArray);
      console.log(clickedPiece);
      
    }

  }

})(canvas, gameBoard);