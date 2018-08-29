const REMOVE_OPPONENT_PIECES = (() => {

  // function removeOpponentPieces(movedPiece, validPathTaken, possible, game) {
  //   const { player } = movedPiece;
  //   const opponentPiecesToRemove = validPathTaken.filter(tile => {
  //     return possible.moves.filter(move => move.locale === tile && move.contents === 'opponent');
  //   }); 
  //   game.removeOpponentPieces(player, opponentPiecesToRemove);
  // }

  function getOpponentPiecesToRemove(validPathTaken, possible) {
    return validPathTaken.filter(tile => {
      return possible.moves.filter(move => move.locale === tile && move.contents === 'opponent');
    });
  }

  return {
    getOpponentPiecesToRemove,
  }

})();