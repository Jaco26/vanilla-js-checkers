const game = ( ({canvas}, board, pieces) => {  
  canvas.addEventListener('click', (e) => {
    let clickedTile = board.tiles.filter(tile => {
      return tile.x < e.offsetX
          && tile.x + tile.width > e.offsetX
          && tile.y < e.offsetY
          && tile.y + tile.height > e.offsetY;
    });
    console.log(clickedTile[0].label);
    
  })

})(canvas, gameBoard, gamePieces);