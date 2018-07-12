const gameBoard = ( ({ctx, canvasWidth, canvasHeight}, tiles, pieces) => {

  const gameHistory = [];

  const mapGameBoard = () => {
    const allPieces = [...pieces.p1Pieces, ...pieces.p2Pieces];
    const boardMap = {H: [], G: [], F: [], E: [],  D: [], C: [], B: [], A: []};    
    tiles.tilesArray.forEach(tile => {
      let piece = tile.hasPiece(allPieces);      
      if (piece && piece.color == pieces.pieceColors['dark']) {
        boardMap[tile.label[0]][tile.label[1]] = 1
      } else if (piece && piece.color == pieces.pieceColors['light']) {
        boardMap[tile.label[0]][tile.label[1]] = 2;
      } else {
        boardMap[tile.label[0]][tile.label[1]] = 0;
      }
    });
    gameHistory.push(boardMap);
  }

  const mapPath = () => {
    
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
  mapGameBoard()
  console.log(gameHistory);

  return {
    mapGameBoard,
    gameHistory,
    tiles, 
    pieces,
    reRenderPieces,
  }

})(canvas, gameBoardTiles, gamePieces);