const validator = ( () => {
  class Validator {
    static possibleMoves (piece, {history}) {
      const currentBoard = history[history.length - 1];
      // console.log(piece.location);
      // console.log(piece.color);
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