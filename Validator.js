const validator = ( () => {
  class Validator {
  
    static possibleMoves (piece, game) {
      const {history} = game;
    }

    static nextRowIndex (piece, clickedRowIndex, nRowsAhead) {
      if (piece.player == 'p1') { 
        if (clickedRowIndex + nRowsAhead <= 7) {
          return clickedRowIndex + nRowsAhead;
        } 
      } else if (clickedRowIndex - nRowsAhead >= 0) {
        return clickedRowIndex - nRowsAhead;
      } 
    }

    static nextColIndex (dir, prevColIndex) {
      if (dir == 'right') {
        if (prevColIndex + 1 <= 7) {
          return prevColIndex + 1;
        } 
      } else if (prevColIndex - 1 >= 0) {
        return prevColIndex - 1;
      }
    }

    static nextRow (piece, prevRowIndex, nRowsAhead, currentBoard) {
      const nextRowIndex = this.nextRowIndex(piece, prevRowIndex, nRowsAhead);      
      if (!nextRowIndex) {        
        return 'End of board';
      }
      return currentBoard[nextRowIndex];
    }

    static possibleMoves (piece, {history}) {
      const currentBoard = history[history.length - 1];
      const clickedRowIndex = Number(piece.location[0]);
      const clickedColIndex = Number(piece.location[1]);
      const nextRow = this.nextRow(piece, clickedRowIndex, 1, currentBoard);
      const andTheNextRow = this.nextRow(piece, clickedRowIndex, 2, currentBoard);
      console.log('nextRow', nextRow);
      console.log('andTheNextRow', andTheNextRow);
 
    }

    static movedFromTile (pos1, pos2) {
      return pos1 == pos2;
    }

  }


  return {
    Validator,
  }
})();