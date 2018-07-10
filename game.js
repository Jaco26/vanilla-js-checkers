const game = ( ({canvas}, board, {p1Pieces, p2Pieces}) => {  
  const allPieces = [...p1Pieces, ...p2Pieces];
  
  canvas.addEventListener('click', handleClick)
  
  function handleClick (e) {
    const clicked = clickedTile(e)[0];   
    clicked.hasPiece(allPieces)[0] 
      ? console.log(true)
      : console.log(false);
  }
  
  function clickedTile(e) {
    return board.tiles.filter(tile => {
      return tile.x < e.offsetX
        && tile.x + tile.width > e.offsetX
        && tile.y < e.offsetY
        && tile.y + tile.height > e.offsetY;
    });
  }

})(canvas, gameBoard, gamePieces);