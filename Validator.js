const validator = ( () => {
  class Validator {
    /**
     * Conditions for valid move: 
     *    if (notKing && nRowsAhead == 1) {
     *      - tile is black
     *      - tile nColsOver == 1
     *      - tile is not occupied
     *    } else if (notKing && nRowsAhead == 2) {
     *      - tile is black
     *      - tile nColsOver == 2
     *      - tile not occupied
     *      - tile nRowsAhead 1 && nColsOver == 1 occupied by opponent
     *    }
     */

    static possibleMoves (piece, game) {
      const {history} = game;
    }

    static nextRowIndex (piece, clickedRowIndex, nRowsAhead) {
      if (piece.player == 'p2') { 
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

    static nextRow(nRowsAhead, prevRowIndex, piece, currentBoard) {
      const nextRowIndex = this.nextRowIndex(piece, prevRowIndex, nRowsAhead);            
      if (nextRowIndex == undefined) {        
        return 'End of board';
      }
      return currentBoard[nextRowIndex];
    }

    static possibleMoves (piece, {history}) {
      const currentBoard = history[history.length - 1];
      const clickedRowIndex = Number(piece.location[0]);
      const clickedColIndex = Number(piece.location[1]);
      const nextRow = this.nextRow(1, clickedRowIndex, piece, currentBoard);
      const andTheNextRow = this.nextRow(2, clickedRowIndex, piece, currentBoard);
      // console.log('nextRow', nextRow);
      // console.log('andTheNextRow', andTheNextRow);
    }

    static boardCrawler (currentBoard, clickedRowIndex, clickedColIndex, validMoves = []) {
      


      if (crawNextRow) this.boardCrawler()
      return validMoves;
    }

    static movedFromTile (pos1, pos2) {
      return pos1 != pos2;
    }

  }






  class PossibleMoves {
    constructor (piece, game) {
      this.piece = piece;
      this.currentBoard = game.history[game.history.length - 1];
      this.clickedRowIndex = Number(piece.location[0]);
      this.clickedColIndex = Number(piece.location[1]);
      this.nRowsAhead = 1;
      this.possibleMoves = this.findValidMoves();
    }

    findValidMoves() {
      // get the 'next' row in the game map 2d array
      const nextRow = this.nextRow();
      // check to see if the opponent occupies the next row in 
      // the tiles diagnally adjacent the current tile
      const startColIndex = this.clickedColIndex;
      const validMoves = this.validMoves(nextRow, startColIndex)

    }

    validMoves(nextRow, currentColIndex) {
      const iLeft = this.nextColIndex('left', currentColIndex);
      const iRight = this.nextColIndex('right', currentColIndex);
      const opponentInNextRow = this.opponentInNextRow(nextRow, {
        iLeft,
        iRight
      });
      let opponent
      if (opponentInNextRow) {
        
      }
    }

    opponentInNextRow(nextRow, {iLeft, iRight}) {
      return this.piece.player == 'p2' 
        ? nextRow[iLeft] == 1 || nextRow[iRight] == 1
        : nextRow[iLeft] == 2 || nextRow[iRight] == 2;
    }

    nextRow() {
      const nextRowIndex = this.nextRowIndex();
      if (nextRowIndex == undefined) {
        return 'End of board';
      }
      this.nRowsAhead += 1;
      return this.currentBoard[nextRowIndex];
    }

    nextRowIndex() {
      if (this.piece.player == 'p2') {
        if (this.clickedRowIndex + this.nRowsAhead <= 7) {
          return this.clickedRowIndex + this.nRowsAhead;
        }
      } else if (this.clickedRowIndex - this.nRowsAhead >= 0) {
        return this.clickedRowIndex - this.nRowsAhead;
      }
    }

    nextColIndex(dir, prevColIndex) {
      if (dir == 'right') {
        if (prevColIndex + 1 <= 7) {
          return prevColIndex + 1;
        }
      } else if (dir == 'left') {
        if (prevColIndex - 1 >= 0) {
          return prevColIndex - 1;
        }
      } else {
        throw new Error('Missing or incorrect "dir" option. Provide either "left" or "right" as first argument')
      }
    }

  }


  return {
    Validator,
    PossibleMoves
  }
})();