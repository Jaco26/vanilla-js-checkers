const gamePieces = ( ({ctx}, gameTiles) => {
  const p1Pieces = [];
  const p2Pieces = [];
  
  class Piece {
    constructor(id, x, y, radius, color){
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    changePosition (e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      drawPiece(this);
    }
  }

  const pieceColors = {
    light: 'pink',
    dark: 'beige'
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
        let radius = (tile.width / 2) - (tile.width * 0.1);
        let piece = new Piece(id, x, y, radius, pieceColors[clr]);
        pieceColors[clr] == pieceColors.dark 
          ? p1Pieces.push(piece) 
          : p2Pieces.push(piece);
        id += 1
      }
    });
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