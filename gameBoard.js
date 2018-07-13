const gameBoard = ( ({ctx, canvasWidth, canvasHeight}, tiles, pieces) => {

  const gameHistory = [];

  const mapGameBoard = () => {
    const allPieces = [...pieces.p1Pieces, ...pieces.p2Pieces];
    const boardMap = {H: [], G: [], F: [], E: [],  D: [], C: [], B: [], A: []};  
    return tiles.tilesArray.reduce( (a, b) => {
      let piece = b.hasPiece(allPieces);
      let letter = b.label[0];
      let index = b.label[1];
      if (piece && piece.color == pieces.pieceColors['dark']) {
        a[letter][index] = 1;
      } else if (piece && piece.color == pieces.pieceColors['light']) {
        a[letter][index] = 2;
      } else {
        a[letter][index] = 0;
      }
      return a;
    }, boardMap)  
  }

  const validMove = (newGameBoard) => {
    if (gameHistory.length >= 1) {
      const lastGameBoard = gameHistory[gameHistory.lenth - 1];
      // compare lastGameBoard against newGameBoard with some yet-to-be 
      // established rules and see if a given piece's new postition is valid
    } 
  }

  const checkGameLogic = () => {
    console.log('hey');
    
    const newGameBoard = mapGameBoard()
    if (validMove(newGameBoard)) {
      gameHistory.push(newGameBoard);
    } else {
      gameHistory.push(mapGameBoard())
    }
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
  gameHistory.push(mapGameBoard());
  console.log(mapGameBoard());
  
  console.log(gameHistory);

  return {
    checkGameLogic,
    gameHistory,
    tiles, 
    pieces,
    reRenderPieces,
  }

})(canvas, gameBoardTiles, gamePieces);