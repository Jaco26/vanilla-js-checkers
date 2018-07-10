const gamePieces = ( ({ctx}, board) => {
  const p1Pieces = [];
  const p2Pieces = [];
  
  class Piece {
    constructor(x, y, radius, color){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
  }

  const pieceColors = {
    light: 'pink',
    dark: 'beige'
  }

  const drawPiece = ({x, y, radius, color}) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  const generate = (clr) => {
    const tiles = clr == 'dark' ? board.tiles : board.tiles.reverse();
    tiles.forEach( (tile, i) => {
      if (i < 24 && tile.color == board.tileColors.black) {
        let x = (tile.x + (tile.width / 2));
        let y = (tile.y + (tile.height / 2));
        let radius = (tile.width / 2) - (tile.width * 0.1);
        let piece = new Piece(x, y, radius, clr);
        p1Pieces.push(piece);
        drawPiece(piece);
      }
    });
  }

  generate(pieceColors.light)
  generate(pieceColors.dark)

  return {
    p1Pieces,
    p2Pieces,
  }

})(canvas, gameBoard);