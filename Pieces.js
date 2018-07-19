const gameBoardPieces = (() => {
  class Piece {
    constructor(player, location, id, x, y, radius, color) {
      this.player = player;
      this.location = location;
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.isKing = false;
      this.tile = {};
    }
    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
    getCurrentLocation({tiles}) {
      this.tile = tiles.reduce( (a, b) => {
        a = [...a, ...b];
        return a;
      }, []).filter(tile => {
        return this.x > tile.x
          && this.x < tile.x + tile.width
          && this.y > tile.y
          && this.y < tile.y + tile.height
      })[0];
      this.location = this.tile.index2d;
      return this.location;
    }
    snapToTile () {
      this.x = this.tile.x + (this.tile.width / 2);
      this.y = this.tile.y + (this.tile.height / 2);
    }


  };


  const flattenArray = (array) => {
    return array.reduce( (a, b) => {
      a = [...a, ...b];
      return a;
    }, []);
  }

  const createPlayerPieces = (tilesArray, tileClrObj, pieceColors, clr) => {
    let tiles = flattenArray(tilesArray);
    let id = 1;
    let player = 'p1';
    if (pieceColors[clr] == pieceColors.dark) {
      tiles.reverse();
      player = 'p2';
    }
    return tiles.reduce((accumulator, tile, index) => {
      if (index < 24 && tile.color == tileClrObj.black) {
        let x = (tile.x + (tile.width / 2));
        let y = (tile.y + (tile.height / 2));
        let { label } = tile
        let radius = (tile.width / 2) - (tile.width * 0.1);   
        let location = tile.index2d;
        let piece = new Piece(player, location, id, x, y, radius, pieceColors[clr]);
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