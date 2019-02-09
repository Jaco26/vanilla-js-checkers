const ANIMATION_MODEL = (function() {

  const util = {
    changeTileColor(path, color) {
      path.forEach(key => {
        let row = Number(key[0]);
        let col = Number(key[1]);   
        this.tiles[row][col].color = color;
      });
    },
  }

  class CheckersAnimations {
    constructor() {
      this.intervalIds = {
        possiblePaths: null
      }
    }

    stop(key) {
      clearInterval(this.intervalIds[key]);
    }

    possiblePaths(pathsList, game) {
      let i = 0;      
      const drawList = () => {
        const path = pathsList[i];
        const originalColor = '#444444';

        util.changeTileColor.call(game, path, 'green');
        game.board.renderBoard();
        util.changeTileColor.call(game, path, originalColor);

        if (i === pathsList.length - 1) {
          setTimeout(() => {
            game.board.renderBoard();
          }, 500);
          this.stop('possiblePaths');
        }
        
        i++;
      }

      this.intervalIds.possiblePaths = setInterval(drawList, 500);
    }
  }

  return { CheckersAnimations }

})();