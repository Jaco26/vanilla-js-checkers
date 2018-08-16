const PATH_BUILDER = (() => {

  const sortMoves = (player, moves) => {
    return moves.sort((a, b) => {
      return player == 'p1' ?
        Number(a.locale) < Number(b.locale) :
        Number(a.locale) > Number(b.locale);
    });
  };

  const getForwardModifier = (player) => ({
    left: player == 'p1' ? -11 : 9,
    right: player == 'p1' ? -9 : 11,
  });

  function getRelations(player, sortedMoves) {
    const forward = getForwardModifier(player);
    return 'This is the result!';
  }

  function buildPath(clickedPiece, pieceStart, moves) {
    const { player } = clickedPiece;
    const origin = {
      contents: 'start',
      locale: pieceStart,
    };
    const sortedMoves = sortMoves(player, [...moves, origin]);
    return getRelations(player, sortedMoves);
  }

  return {
    buildPath,
  };

})();