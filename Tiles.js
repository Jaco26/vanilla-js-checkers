const gameBoardTiles = ( ({ctx, canvasWidth, canvasHeight}) => {

  


  const tilesArray = [];

  class Tile {
    constructor(x, y, color, label) {
      this.x = x;
      this.y = y;
      this.width = canvasWidth / 8;
      this.height = canvasHeight / 8;
      this.color = color;
      this.label = label;
    }
    hasPiece(pieces) {
      return pieces.filter(piece => {
        return piece.x > this.x
          && piece.x < this.x + this.width
          && piece.y > this.y
          && piece.y < this.y + this.height
      });
    }
  }

  const yLabels = [0, 1, 2, 3, 4, 5, 6, 7];
  const xLabels = ['H', 'G',  'F', 'E', 'D', 'C', 'B', 'A'];

  tileColors = {
    red: '#FAA',
    black: '#444444',
  }

  const generateTiles = () => {
    let xPos = 0;
    let yPos = 0;
    let colorRed = true;
    xLabels.forEach(xLab => {
      yLabels.forEach(yLab => {
        let color = colorRed ? tileColors.red : tileColors.black;
        let tile = new Tile(xPos, yPos, color, xLab + yLab);
        tilesArray.push(tile);
        xPos += canvasWidth / 8;
        colorRed = !colorRed;
      });
      xPos = 0;
      yPos += canvasHeight / 8;
      colorRed = !colorRed;
    });
    
  }

  const drawTile = ({ x, y, width, height, color, label }) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText(label, x + (width / 2) - 7, y + (height * 0.8))
    ctx.closePath();
  }

  const drawTiles = () => {
    tilesArray.forEach(tile => drawTile(tile))
  }

  return {
    tilesArray,
    tileColors,
    drawTiles,
    generateTiles
  }

})(canvas)