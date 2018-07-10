const gameBoard = ( ({ctx, canvasWidth, canvasHeight}) => {
  
  const tiles = [];

  class Tile {
    constructor(x, y, color, label) {
      this.x = x;
      this.y = y;
      this.width = canvasWidth / 8;
      this.height = canvasHeight / 8;
      this.color = color;
      this.label = label;
    }
  }

  const yLabels = [1, 2, 3, 4, 5, 6, 7, 8];
  const xLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const red = '#FAA';
  const black = '#444444';

  const drawTile = ({x, y, width, height, color, label}) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.font = '12px sans-serif'
    ctx.fillStyle = 'beige'
    ctx.fillText(label, x + (width / 2) - 7, y + (height * 0.8))
    ctx.closePath();
  }
  
  const generate = () => {
    let xPos = 0;
    let yPos = 0;
    let colorRed = true;
    xLabels.reverse().forEach( (xLab, i) => { 
      yLabels.forEach( (yLab, i) => {
        let color = colorRed ? red : black;
        let tile = new Tile(xPos, yPos, color, xLab + yLab);
        tiles.push(tile);
        drawTile(tile);
        xPos += canvasWidth / 8;
        colorRed = !colorRed;
      });
      xPos = 0;
      yPos += canvasHeight / 8;
      colorRed = !colorRed;
    });
  }

  generate();

  return {
    tiles,
    tileColors: {
      red,
      black,
    }
  }

})(canvas);