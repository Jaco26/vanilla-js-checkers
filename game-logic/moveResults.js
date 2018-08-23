const MOVE_RESULTS = ((tilesTraveled) => {

  function comparePaths(realPath, validPaths) {
    console.log('tiles traveled', realPath);
    // console.log(validPaths);
    const bestPath = validPaths.reduce((bestPathSoFar, potentialPath) => {
      realPath.forEach(tile => {

      });
    }, []);
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