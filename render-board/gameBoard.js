const GAMEBOARD = ((canvas, tiles, pieces) => {

  class Game {
    constructor(canvas, setupTemplate, tilesModule, piecesModule) {
      this.canvas = canvas;
      this.yLabs = [7, 6, 5, 4, 3, 2, 1, 0];
      this.xLabs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      this.tileClrs = { red: '#FAA', black: '#444444' };
      this.pieceClrs = { light: 'orange', dark: 'green' };

      this.tiles = tilesModule.createTiles(canvas, this.xLabs, this.yLabs, this.tileClrs);
      this.p1Pieces = piecesModule.createPlayerPieces(this.tiles, setupTemplate, this.pieceClrs, 1);
      this.p2Pieces = piecesModule.createPlayerPieces(this.tiles, setupTemplate, this.pieceClrs, 2);
      this.history = [];
      this.turns = [];

      this.createTiles = tilesModule.createTiles;
      this.drawTiles = tilesModule.drawTiles;
      this.drawPieces = piecesModule.drawPieces;

      tilesModule.drawTiles(canvas, this.tiles);
      piecesModule.drawPieces(canvas, [...this.p1Pieces, ...this.p2Pieces]);
      this.mapGameBoard();
    }

    whoseTurn() {
      if (this.turns.length > 0) {
        return this.turns.slice(-1)[0].player === 'p1'
          ? 'p2'
          : 'p1'
      }
      return 'p1';
    }

    saveTurn({ player, id }, move) {      
      const piecesRemaining = this[`${player}Pieces`].map(piece => ({
        id: piece.id,
        pieceLocation: piece.location,
      }));
      this.turns.push({
        player,
        move,
        pieceId: id,
        piecesRemaining,
      });
    }

    mergePlayerPieceArrays() {
      return [...this.p1Pieces, ...this.p2Pieces];
    }
    
    mapGameBoard() {
      const allPieces = this.mergePlayerPieceArrays();      
      const currentMap = this.tiles.reduce((outerArray, innerTileArr) => {        
        outerArray = [...outerArray, innerTileArr.reduce((a, currentTile, index) => {
          let piece = currentTile.hasPiece(allPieces);
          if (piece && piece.color == this.pieceClrs.dark) {
            a[index] = 1;
          } else if (piece && piece.color == this.pieceClrs.light) {
            a[index] = 2;
          } else if (currentTile.color == this.tileClrs.black) {
            a[index] = 0;
          } else {
            a[index] = null;
          }
          return a;
        }, [])];
        return outerArray
      }, []);  
      this.history.push(currentMap);
    }

    drawPath(path = []) {
      const ctx = this.canvas.ctx;      
      ctx.beginPath();
      path.forEach(pt => {
        ctx.beginPath();
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(pt.x, pt.y, 5, 5);
        ctx.closePath();
      });
    }

    clickedPiece(e) {
      return this.mergePlayerPieceArrays().filter(piece => {
        return piece.x + piece.radius > e.offsetX
          && piece.x - piece.radius < e.offsetX
          && piece.y + piece.radius > e.offsetY
          && piece.y - piece.radius < e.offsetY;
      })[0];
    }

    removeOpponentPieces(movedPiece, opponentPiecesToRemove) {      
      const opponentPieces = movedPiece.player === 'p1' ? this.p2Pieces : this.p1Pieces;
      opponentPiecesToRemove.forEach(piece => {
        const indexOfPieceToRemove = opponentPieces.map(piece => piece.location).indexOf(piece);
        if (indexOfPieceToRemove > -1) {
          opponentPieces.splice(indexOfPieceToRemove, 1);
        }
      });
    }

    reRenderPieces() {
      this.drawTiles(this.canvas, this.tiles)
      this.drawPieces(this.canvas, [...this.p1Pieces, ...this.p2Pieces]);
    }
  }

  const startNewGame = (template) => new Game(canvas, template, tiles, pieces);

  return {
    startNewGame
  }

})(canvas, GAMEBOARD_TILES, gameBoardPieces);