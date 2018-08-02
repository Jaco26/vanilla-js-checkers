const whoGotJumped = (() => {

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

  const normalizePath = (movedPiece, game) => {
    const { tiles } = game;
    const { path } = movedPiece
    let tilesTravled = getTilesTravled(path, tiles);
    console.log(tilesTravled);
    
  }

  return {
    normalizePath,
  }

})();