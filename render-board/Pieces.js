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
      this.tile = {}; // mutated by getCurrentLocation
      this.path = []; // mutated by trackPath
    }

    changePosition(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }

    trackPath() {
      this.path.push({
        x: this.x,
        y: this.y,
      });
    }

    setPathEmpty() {
      this.path = [];
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
      if (!this.tile) return; // IMPORTANT: handle pieces being dropped on the exact intersection of two or more tiles
      this.location = this.tile.index2d;
      return {
        location: this.location, 
        tile: this.tile
      };
    }

    snapToTile (tile = {}) {      
      if (tile.x) this.tile = tile;
      this.x = this.tile.x + (this.tile.width / 2);
      this.y = this.tile.y + (this.tile.height / 2);
    }
  };
 
  const flattenArray = (array) => {
    return array.reduce( (a, b) => {
      a = [...a, ...b];
      return a;
    }, []);
  };

  const mapTemplate = (template, playerNum) => {
    return flattenArray(template).reduce((a, b, i) => {            
      if (b === playerNum) a.push({playerNum, i});
      return a;
    }, []);
  }

  const getTemplateIndexes = (template, playerNum) => mapTemplate(template, playerNum);

  const createPlayerPieces = (tilesArray, setupTemplate, pieceColors, playerNum) => {
    let tiles = flattenArray(tilesArray);
    let id = 1;
    let piecePlayerIndexes = getTemplateIndexes(setupTemplate, playerNum);
    let pieceIndexes = piecePlayerIndexes.map(piece => piece.i);
    return tiles.reduce((accumulator, tile, i) => {
      if (pieceIndexes.includes(i)) {
        let x = (tile.x + (tile.width / 2));
        let y = (tile.y + (tile.height / 2));
        let radius = (tile.width / 2) - (tile.width * 0.1);   
        let location = tile.index2d;
        let player = playerNum == 1 ? 'p1' : 'p2';
        let color = player == 'p1' ? 'dark' : 'light';
        let piece = new Piece(player, location, id, x, y, radius, pieceColors[color]);
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