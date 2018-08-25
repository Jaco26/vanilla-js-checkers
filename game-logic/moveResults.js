const MOVE_RESULTS = ((tilesTraveled) => {
  
  function getBestPaths(matchScoreObj, validPaths) {    
    const highScore = Math.max(...Object.values(matchScoreObj));
    const highScorePaths = Object.entries(matchScoreObj).reduce((accum, [key, value]) => {
      if (value === highScore) {
        accum.push(validPaths[key]);
      }
      return accum;
    }, []);
    return highScorePaths
  }

  /*
    Compare the path that the piece actually (excluding non-dark squares) took from 
    its starting position to its end position against the array of possible valid paths.
    Allow, the user to drag the piece along a path that deviates from all "valid" paths and
    return the path that best fits the one the user took.
  */
  function getMatchScore(realPath, validPaths) {
    // find the path from "validPaths" that most closely resembles the "realPath"
    // create an object on which to keep track of valid paths' level of matching the "realPath"
    const matchScore = validPaths.reduce((a, b, pathIndex) => {
      a[pathIndex] = 0;
      return a;
    }, {});
    // iterate through each tile of the "realPath"
    realPath.forEach(tile => {
      // for each tile, iterate through the array of "validPaths"
      validPaths.forEach((path, pathIndex) => {
        // for each path, check if it contains a value equal to tile
        if (path.indexOf(tile) >= 0) {
          // if it does, increment that array index's "match-score"
          matchScore[pathIndex] += 1;
        }
      });
    });
    return matchScore;
  }

  function getValidPathTraveled(clickedPiece, valid, game) {
    const validPaths = valid.paths;
    const realPath = tilesTraveled.getTilesTraveled(clickedPiece.path, game.tiles);
    // rank each "validPath" based on how many times a tile value in "realPath"
    // matches a tile value in it.
    const matchScore = getMatchScore(realPath, validPaths);
    // get the best-match paths based on the "matchScore"
    const bestPaths = getBestPaths(matchScore, validPaths);
    console.log('possible valid path(s) intended', bestPaths);
    
    // if there is only one "bestPath", return the portion of it that was traveled
    if (bestPaths.length === 1) {

    } else {

    }
    
  }

  return {
    getValidPathTraveled,
  }

})(TILES_TRAVELED);