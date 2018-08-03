const whoGotJumped = (() => {

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

  const flatten2DArray = (arr) => {
    return arr.reduce((a, b) => {
      a = [...a, ...b];
      return a;
    }, []);
  }

  const getTilePerPathPoint = (path, tiles) => {
    let flatTiles = flatten2DArray(tiles);
    return path.reduce((a, point) => {
      let pointTile = flatTiles.filter(tile => {
        return tile.x < point.x &&
          tile.x + tile.width > point.x &&
          tile.y < point.y &&
          tile.y + tile.height > point.y;
      })[0];
      a.push(pointTile);
      return a;
    }, []);
  }

  const getTileLocations = (tilesPerPathPoint) => {
    return tilesPerPathPoint.map(tile => {
      return tile && tile.color == '#444444' ? tile.index2d : null;
    }).filter(item => item);
  }

  const getTilesTravled = (path, tiles) => {
    let tilesPerPathPoint = getTilePerPathPoint(path, tiles);
    let tileLocations = getTileLocations(tilesPerPathPoint);
    return tileLocations.reduce((a, tile, index, arr) => {
      if (tile == arr[index + 1]) {
        return a;
      }
      a.push(tile);
      return a;
    }, []);
  }

  const didItComeFromThere = (location, pieceStart, validMoves) => {
    return location == pieceStart || validMoves.includes(location);
  }

  const lookBack = (path, options) => {
    let { validMoves, pieceStart, pieceEnd, backLeft, backRight } = options;
    let lookLeft = Number(pieceEnd) + backLeft;
    let lookRight = Number(pieceEnd) + backRight;
    let lookLeft2 = (lookLeft + backLeft).toString();
    let lookRight2 = (lookRight + backRight).toString();
    console.log('look right', lookRight);
    console.log('look left', lookLeft);
    if (lookLeft2 == pieceStart || validMoves.includes(lookLeft2)) {
      console.log('Came from the left');
    }
    if (lookRight2 == pieceStart || validMoves.includes(lookRight2)) {
      console.log('Came from the right');
    }
  }

  const tracePath = (options) => {
    let path = [];
    lookBack(path, options);
    return path;
  }

  const normalizePath = (movedPiece, pieceStart, pieceEnd, validMoves, game) => {
    const { tiles } = game;
    const { path, player } = movedPiece
    let tilesTravled = getTilesTravled(path, tiles);
    if (Math.abs(Number(pieceStart.location[0]) - Number(pieceEnd.location[0])) == 1) {      
      return;
    } else {
      const traceBackOptions = {
        validMoves,
        pieceStart: pieceStart.location,
        pieceEnd: pieceEnd.location,
        backRight: player == 'p1' ? 11 : -9,
        backLeft: player == 'p1' ? 9 : -11,
      }
      let playerPath = tracePath(traceBackOptions);
    }
  }

  return {
    normalizePath,
  }

})();