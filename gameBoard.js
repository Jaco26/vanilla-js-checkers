const gameBoard = ( ({ctx, canvasWidth, canvasHeight}, tiles, pieces) => {

  const gameTilesInit = () => {
    tiles.generateTiles();
    tiles.drawTiles()
  }
  
  const gamePiecesInit = () => {
    pieces.generatePieces('dark')
    pieces.generatePieces('light')
    console.log('Hey');
    
    pieces.drawPieces();
  }

  const reRenderPieces = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    gameTilesInit();
    pieces.drawPieces()
  }
  
  gameTilesInit();
  gamePiecesInit();

  return {
    tiles, 
    pieces,
    reRenderPieces,
  }

})(canvas, gameBoardTiles, gamePieces);