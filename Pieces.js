const gameBoardPieces = (() => {
  class Piece {
    constructor(location, id, x, y, radius, color) {
      this.location = location;
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
    originalPosition(e) {
      return {
        offsetX: this.x,
        offsetY: this.y
      }
    }
    getCurrentLocation({tiles}) {
      this.location = tiles.reduce( (a, b) => {
        a = [...a, ...b];
        return a;
      }, []).filter(tile => {
        return this.x > tile.x
          && this.x < tile.x + tile.width
          && this.y > tile.y
          && this.y < tile.y + tile.height
      })[0].index2d;
      return this.location;
    }
  };


  const createPlayerPieces = (tilesArray, tileClrObj, pieceColors, clr) => {
    let tiles = tilesArray.reduce((a, b) => {
      a = [...a, ...b];
      return a;
    }, []);
    if (pieceColors[clr] == pieceColors.dark) {
      tiles.reverse();
    }
    let id = 1;
    return tiles.reduce((accumulator, tile, index) => {
      if (index < 24 && tile.color == tileClrObj.black) {
        let x = (tile.x + (tile.width / 2));
        let y = (tile.y + (tile.height / 2));
        let { label } = tile
        let radius = (tile.width / 2) - (tile.width * 0.1);   
        let location = tile.index2d;
        let piece = new Piece(location, id, x, y, radius, pieceColors[clr]);
        accumulator.push(piece);
        id += 1;
      }
      return accumulator;
    }, []);
  };

  const drawPiece = ({ ctx }, { x, y, radius, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  };
  const drawPieces = (canvas, playerPieces) => {
    playerPieces.forEach(piece => drawPiece(canvas, piece));
  };

  return {
    createPlayerPieces,
    drawPieces
  }


})();