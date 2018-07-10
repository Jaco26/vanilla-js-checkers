const gameBoard = ( (tiles, pieces) => {
  const board = {
    tiles,
    pieces
  }
  const gameTilesInit = () => {
    tiles.generateTiles();
    tiles.drawTiles()
  }
  
  const gamePiecesInit = () => {
    pieces.generatePieces('dark')
    pieces.generatePieces('light')
    pieces.drawPieces();
  }
  
  gameTilesInit()
  gamePiecesInit()

  return board

})(gameBoardTiles, gamePieces);