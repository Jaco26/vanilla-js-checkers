const gameBoard = ((canvas, tiles, pieces) => {
  const miscIngredients = {
    yLabs: [7, 6, 5, 4, 3, 2, 1, 0],
    xLabs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    tileClrs: { red: '#FAA', black: '#444444' },
    pieceClrs: { light: 'orange', dark: 'green' }
  }

  class Game {
    constructor(canvas, tilesModule, piecesModule) {
      this.yLabs = [7, 6, 5, 4, 3, 2, 1, 0];
      this.xLabs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      this.tileClrs = { red: '#FAA', black: '#444444' };
      this.pieceClrs = { light: 'orange', dark: 'green' };

      this.tiles = tilesModule.createTiles(canvas, this.xLabs, this.yLabs, this.tileClrs);
      this.p1Pieces = piecesModule.createPlayerPieces(this.tiles, this.tileClrs, this.pieceClrs, 'light');
      this.p2Pieces = piecesModule.createPlayerPieces(this.tiles, this.tileClrs, this.pieceClrs, 'dark');
      this.boardMap = [];
      this.history = [];

      tilesModule.drawTiles(canvas, this.tiles);
      piecesModule.drawPieces(canvas, [...this.p1Pieces, ...this.p2Pieces]);
      this.mapGameBoard();
    }
    mapGameBoard() {
      const allPieces = [...this.p1Pieces, ...this.p2Pieces];      
      const currentMap = this.tiles.reduce((outerArray, innerTileArr) => {
        outerArray = [...outerArray, innerTileArr.reduce((a, currentTile, index) => {
          let piece = currentTile.hasPiece(allPieces);
          if (piece && piece.color == this.pieceClrs.dark) {
            a[index] = 1;
          } else if (piece && piece.color == this.pieceClrs.light) {
            a[index] = 2;
          } else {
            a[index] = 0;
          }
          return a;
        }, [])];
        return outerArray
      }, []);  
      this.history.push(currentMap);
    }

    clickedPiece (e) {
      return [...this.p1Pieces, ...this.p2Pieces].filter(piece => {
        return piece.x + piece.radius > e.offsetX
          && piece.x - piece.radius < e.offsetX
          && piece.y + piece.radius > e.offsetY
          && piece.y - piece.radius < e.offsetY;
      })[0];
    }

    removePiece({ id }) {
      const playersPieces = pieceColors[color] == pieceColors.dark
        ? 'p2Pieces'
        : 'p1Pieces';
      this[playersPieces] = this[playersPieces].filter(piece => {
        return piece.id != id;
      });
    }

  }

  const startNewGame = () => new Game(canvas, tiles, pieces, miscIngredients);

  return {
    startNewGame
  }

})(canvas, gameBoardTiles, gameBoardPieces);