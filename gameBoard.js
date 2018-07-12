const gameBoard = ( ({ctx, canvasWidth, canvasHeight}, tiles, pieces) => {

  const gameBoardMap = {
    H: [],
    G: [],
    F: [],
    E: [],
    D: [],
    C: [],
    B: [],
    A: [],
  }

  const mapGameBoard = () => {
    const { p1Pieces, p2Pieces } = pieces
    console.log(p1Pieces);
    console.log(p2Pieces);
    console.log(tiles);
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

  const reRenderPieces = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    tiles.drawTiles()
    pieces.drawPieces()
  }
  
  gameTilesInit();
  gamePiecesInit();
  mapGameBoard();

  return {
    tiles, 
    pieces,
    reRenderPieces,
  }

})(canvas, gameBoardTiles, gamePieces);