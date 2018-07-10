const game = ( ({canvas}, board) => {  
  // let gameOn = false;
  // let gameStart = document.getElementById('start-game');
  // gameStart.textContent = 'Start Game'
  // gameStart.onclick = () => {
  //   gameOn = !gameOn;
  //   gameStart.textContent = gameOn ? 'Reset' : 'StartGame'
  // };
  // console.log(board);
  canvas.addEventListener('mousedown', handleMousedown)
  
  function handleMousedown (e) {
    const allPieces = [...board.pieces.p1Pieces, ...board.pieces.p2Pieces];
    const clicked = clickedTile(e)[0]; 
    const piece = clicked.hasPiece(allPieces)[0];
    if (piece) {
      // console.log(`You clicked the ${piece.color} piece on tile: ${clicked.label}`)
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseup', handleMouseup);
      
    } 

    function clickedTile(e) {
      console.log(board);
      
      return board.tiles.tilesArray.filter(tile => {
        return tile.x < e.offsetX
          && tile.x + tile.width > e.offsetX
          && tile.y < e.offsetY
          && tile.y + tile.height > e.offsetY;
      });
    }

    function handleMousemove(e) {
      console.log(e.offsetX, e.offsetY);
      console.log(piece);
      piece.changePosition(e)

    }

    function handleMouseup(e) {      
      e.target.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseup', handleMouseup)
    }

  }

  

  
  
  

})(canvas, gameBoard);