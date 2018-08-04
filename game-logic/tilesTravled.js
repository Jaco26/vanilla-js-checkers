const tilesTraveled = ( (utils) => {
  const { flatten } = utils;
  
  function getTilesPerPathPoint(path, tiles) {
     let flatTiles = flatten(tiles);
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

  function getTileLocations(tilesPerPathPoint) {
    return tilesPerPathPoint.map(tile => {
      return tile && tile.color == '#444444' ? tile.index2d : null;
    }).filter(item => item);
  }

  function getTilesTraveled(path, tiles) {
     let tilesPerPathPoint = getTilesPerPathPoint(path, tiles);
     let tileLocations = getTileLocations(tilesPerPathPoint);
     return tileLocations.reduce((a, tile, index, arr) => {
       if (tile == arr[index + 1]) {
         return a;
       }
       a.push(tile);
       return a;
     }, []);
  }

  return {
    getTilesTraveled
  };

})(utils);