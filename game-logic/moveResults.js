const MOVE_RESULTS = ((tilesTraveled) => {

  function comparePaths(realPath, validPaths) {
    console.log('tiles traveled', realPath);
    const bestPath = realPath.reduce((possiblePaths, tile) => {
      if (possiblePaths[0]) {
        possiblePaths = possiblePaths.filter(path => path.indexOf(tile) >= 0);
      } else {
        possiblePaths = validPaths.filter(path => path.indexOf(tile) >= 0);
      }
      return possiblePaths;
    }, []);
    console.log('best path', bestPath);
  }

  function getValidPathTraveled(clickedPiece, valid, game) {
    const validPaths = valid.paths;
    const realPath = tilesTraveled.getTilesTraveled(clickedPiece.path, game.tiles)
    comparePaths(realPath, validPaths);
  }

  return {
    getValidPathTraveled,
  }

})(TILES_TRAVELED);