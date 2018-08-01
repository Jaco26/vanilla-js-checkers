const whoGotJumped = (() => {


  const normalizePath = (movedPiece, game) => {
    const { tiles } = game;
    const { path } = movedPiece
    game.drawPath(path);
    
  }

  return {
    normalizePath,
  }

})();