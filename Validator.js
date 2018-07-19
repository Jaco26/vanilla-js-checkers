const validator = ( () => {
  class Validator {

    static nextRowIndex (piece, prevRowIndex) {
      if (piece.player == 'p1') {
        if (prevRowIndex + 1 < 7) {
          return prevRowIndex + 1;
        } else if (prevRowIndex + 1 == 7) {
          return 'KING KING KING KING KING';
        }
      } else if (prevRowIndex - 1 > 0) {
        return prevRowIndex - 1;
      } else if (prevRowIndex - 1 == 0) {
        return 'KING KING KING KING KING'
      }
      
    }

    static nextColIndex (dir, prevColIndex) {
      return dir == 'right' ? prevColIndex + 1 : prevColIndex - 1;
    }

    static possibleMoves (piece, {history}) {
      const currentBoard = history[history.length - 1];
      const rowIndex = Number(piece.location[0]);
      const colIndex = Number(piece.location[1]);
      const row = currentBoard[rowIndex];
      const nextRowIndex = this.nextRowIndex(piece, rowIndex);
      const colRightIndex = this.nextColIndex('right', colIndex);
      const colLeftIndex = this.nextColIndex('left', colIndex);
      const nextRow = currentBoard[nextRowIndex];
      console.log('####################### DIVIDER #########################');
      
      console.log(piece);
      console.log('Row', row);
      console.log('nextRow', nextRow);
      console.log('nextRowIndex', nextRowIndex);
      console.log('colIndex', colIndex);
      console.log('colLeftIndex', colLeftIndex);
      console.log('colRightIndex', colRightIndex);
      
      
      
      return true;
    }

    static movedFromTile (pos1, pos2) {
      return pos1 == pos2;
    }

  }


  return {
    Validator,
  }
})();