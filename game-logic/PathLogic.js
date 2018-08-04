const whoGotJumped = ((utils, tilesTraveled) => {
  const { flatten, traceBackPath } = utils;
  const { getTilesTraveled } = tilesTraveled;
  /*
    I need to:
      - calulate the possible valid paths a piece might take based on the valid tiles available to it
      - track the path the moved piece took 
      - compare the moved piece's path against the possible valid paths
  */

  /*
    To determine the path a players piece took, do the following:
      - FIND all valid paths from the piece's starting position
      - based on the piece's end position, try to ELIMINATE all paths but one 
      - IF that is successful
          - FIND all oponent pieces in the path
          - REMOVE them
      - ELSE 
        - USING the path tracked by the piece as it went, determine intended path based on proximity
        - FIND all oponent pieces in the path 
        - REMOVE them
  */


  const lookBack = (path, options) => {
    let oneLeft = traceBackPath.examineTile(1, 'left', options);
    let oneRight = traceBackPath.examineTile(1, 'right', options);
  }

  const tracePath = (options) => {
    let path = [];
    lookBack(path, options);
    return path;
  }

  

  const findPath = (movedPiece, pieceStart, pieceEnd, validMoves, game) => {
    const { tiles } = game;
    const { path, player } = movedPiece
    let tilesTravled = getTilesTraveled(path, tiles);
    console.log(tilesTravled);
    
      let tracePathOptions = {
        validMoves: validMoves,
        player: player,
        traceOrigin: pieceEnd.location,
      }; 
      let playerPath = tracePath(tracePathOptions);
    // }
  }

  return {
    findPath,
  }

})(utils, tilesTraveled);