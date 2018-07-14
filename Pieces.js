const gameBoardPieces = ( ({ctx}, gameTiles) => {

  const p1Pieces = [];
  const p2Pieces = [];
  
  class Piece {
    constructor(label, id, x, y, radius, color){
      this.location = label;
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    changePosition (e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
    findLocation (gameTiles) {
      this.location = gameTiles.filter(tile => {
        return this.x > tile.x 
          && this.x < tile.x + tile.width
          && this.y > tile.y
          && this.y < tile.y + tile.height;
      })[0].label;
    }
  }


  const pieceColors = {
    light: 'orange',
    dark: 'green'
  }

  const storePieces = (clr, piece) => {
    if (pieceColors[clr] == pieceColors.dark) {
      p1Pieces.push(piece)
    } else {
      p2Pieces.push(piece);
    }
  }

  const generatePieces = (clr) => {
    const tiles = pieceColors[clr] == pieceColors.dark
      ? gameTiles.tilesArray 
      : gameTiles.tilesArray.reverse();
    let id = 1
    tiles.forEach( (tile, i) => {
      if (i < 24 && tile.color == gameTiles.tileColors.black) {
        let x = (tile.x + (tile.width / 2));
        let y = (tile.y + (tile.height / 2));
        let {label} = tile
        let radius = (tile.width / 2) - (tile.width * 0.1);
        let piece = new Piece(label, id, x, y, radius, pieceColors[clr]);
        storePieces(clr, piece);
        id += 1
      }
    });
    // console.log(tiles.gameBoardMap);
    
  }

  const drawPiece = ({ x, y, radius, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  const drawPieces = () => {
    p1Pieces.forEach(piece => drawPiece(piece));
    p2Pieces.forEach(piece => drawPiece(piece));
  }

  return {
    generatePieces,
    drawPieces,
    pieceColors,
    p1Pieces,
    p2Pieces
  }

})(canvas, gameBoardTiles);