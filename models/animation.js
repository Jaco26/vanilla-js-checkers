const ANIMATION_MODEL = (function() {

  class CheckersAnimations {
    constructor() {
      this.intervalId = null;
    }

    possiblePaths(pathsList, game) {
      let listI = 0;      

      const drawList = () => {
        const path = pathsList[listI];
        const originalColor = '#444444';
        path.forEach(key => {
          let row = Number(key[0]);
          let col = Number(key[1]);          
          game.tiles[row][col].color = 'green'
        });
        game.board.renderBoard();
        path.forEach(key => {
          let row = Number(key[0]);
          let col = Number(key[1]);
          game.tiles[row][col].color = originalColor
        });
        listI++;
        if (listI === pathsList.length) {
          game.board.renderBoard();
          return clearInterval(this.intervalId);
        }
      }
      this.intervalId = setInterval(drawList, 500);
    }
  }

  return { CheckersAnimations }

})();