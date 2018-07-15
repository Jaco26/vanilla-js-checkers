const gameBoardTiles = (() => {
  class Tile {
    constructor(x, y, canvasWidth, canvasHeight, color, label) {
      this.x = x;
      this.y = y;
      this.width = canvasWidth / 8;
      this.height = canvasHeight / 8;
      this.color = color;
      this.label = label;
    };
    hasPiece(pieces) {
      return pieces.filter(piece => {
        return piece.x > this.x
          && piece.x < this.x + this.width
          && piece.y > this.y
          && piece.y < this.y + this.height
      })[0];
    };
  };


  const createTiles = ({ canvasWidth, canvasHeight }, xLabels, yLabels, tileColors) => {
    let xPos = 0;
    let yPos = 0;
    let colorRed = true;
    return yLabels.reduce((accumulator, yLab) => {
      accumulator = [...accumulator, xLabels.reduce((a, xLab) => {
        let color = colorRed ? tileColors.red : tileColors.black;
        let tile = new Tile(xPos, yPos, canvasWidth, canvasHeight, color, xLab + yLab);
        a.push(tile);
        xPos += canvasWidth / 8;
        colorRed = !colorRed;
        return a;
      }, [])];
      xPos = 0;
      yPos += canvasHeight / 8;
      colorRed = !colorRed;
      return accumulator
    }, [])
  };

  const drawTile = ({ ctx }, { x, y, width, height, color, label }) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText(label, x + (width / 2) - 7, y + (height * 0.8))
    ctx.closePath();
  };
  const drawTiles = (canvas, outerArr) => {
    outerArr.forEach(innerArr => innerArr.forEach(tile => {
      drawTile(canvas, tile)
    }))
  };

  return {
    createTiles,
    drawTiles
  }

})();


