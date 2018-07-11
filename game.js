const game = ( ({canvas}, board) => {  
  canvas.addEventListener('mousedown', handleMousedown)
  


  function handleMousedown (e) {
    const allPieces = [...board.pieces.p1Pieces, ...board.pieces.p2Pieces];
    const clicked = clickedTile(e)[0]; 
    console.log(clicked);
    
    const piece = clicked.hasPiece(allPieces)[0];
    console.log(piece);
    
    if (piece) {
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
    } 

    function clickedTile(e) {
      return board.tiles.tilesArray.filter(tile => {
        return tile.x < e.offsetX
          && tile.x + tile.width > e.offsetX
          && tile.y < e.offsetY
          && tile.y + tile.height > e.offsetY;
      });
    }

    function handleMousemove(e) {
      piece.changePosition(e)
      board.reRenderPieces()
    }

    function handleMouseup(e) {      
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup)
    }

  }

})(canvas, gameBoard);