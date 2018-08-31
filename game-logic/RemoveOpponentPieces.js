const REMOVE_OPPONENT_PIECES = (() => {

  function getOpponentPiecesToRemove(validPathTaken, possible) {
    return validPathTaken.filter(tile => {
      return possible.moves.filter(move => move.locale === tile && move.contents === 'opponent');
    });
  }

  return {
    getOpponentPiecesToRemove,
  }

})();