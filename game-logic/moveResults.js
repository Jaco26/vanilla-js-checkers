const MOVE_RESULTS = ((tilesTraveled) => {
  /*
    Compare the path that the piece actually (excluding non-dark squares) took from 
    its starting position to its end position against the array of possible valid paths.
    Allow, the user to drag the piece along a path that deviates from all "valid" paths and
    return the path that best fits the one the user took.
  */
  function comparePaths(realPath, validPaths) {
    const bestPath = realPath.slice().reverse()
      .reduce((possiblePaths, tile, i) => {
        if (i === 0) {
          // get all paths with elements matching "tile"
          const matchesEnd = validPaths.filter(path => {            
            return path.indexOf(tile) >= 0;
          });
          console.log(matchesEnd);
          
        }


        // if (possiblePaths[0]) {
        //   possiblePaths = possiblePaths.filter(path => path.indexOf(tile) >= 0);
        // } else {
        //   possiblePaths = validPaths.filter(path => path.indexOf(tile) >= 0);
        // }
        // return possiblePaths;
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