const PATH_CONTROLLER = (function() {

  function BFSBuildPath(start, tiles, keys) {
    
    return 'YAYA!'
  }

  function findValidPaths(start, tiles) {
    const startPiece = start.hasPiece;
    let keys = [];
    if (startPiece.isKing) {
      keys = ['upLeft', 'upRight', 'downLeft', 'downRight'];
    } else if (startPiece.player === 'p1') {
      keys = ['downLeft', 'downRight'];
    } else {
      keys = ['upLeft', 'upRight'];
    }
    return BFSBuildPath(start, tiles, keys);
  }

  return { findValidPaths };

})();