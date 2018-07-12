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
    const allPieces = [...pieces.p1Pieces, ...pieces.p2Pieces];
    tiles.tilesArray.forEach(tile => {
      let piece = tile.hasPiece(allPieces)
      if (piece && piece.color == pieces.pieceColors['dark']) {
        gameBoardMap[tile.label[0]][tile.label[1]] = 1
      } else if (piece && piece.color == pieces.pieceColors['light']) {
        gameBoardMap[tile.label[0]][tile.label[1]] = 2;
      } else {
        gameBoardMap[tile.label[0]][tile.label[1]] = 0;
      }
    });
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
    mapGameBoard,
    gameBoardMap,
    tiles, 
    pieces,
    reRenderPieces,
  }

})(canvas, gameBoardTiles, gamePieces);