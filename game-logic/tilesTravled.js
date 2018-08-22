const TILES_TRAVELED = ((utils) => {
  const { flatten } = utils;
  
  const tileIsDark = (tile) => {
    return (tile 
      && Number(tile.index2d[0]) % 2 !== 0
      && Number(tile.index2d[1]) % 2 === 0) 
      || (tile 
      && Number(tile.index2d[0]) % 2 === 0 
      && Number(tile.index2d[1]) % 2 !== 0);
  }
      

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
    const result = tilesPerPathPoint
      .map(tile => tileIsDark(tile) ? tile.index2d : '')
      .filter(item => item);
    return [...new Set(result)];
  }

  function getTilesTraveled(path, tiles) {
     let tilesPerPathPoint = getTilesPerPathPoint(path, tiles);
     let tileLocations = getTileLocations(tilesPerPathPoint);
     return tileLocations.reduce((a, tile, index, arr) => {
       a.push(tile);
       return a;
     }, []);
   
  }

  return {
    getTilesTraveled
  };

})(utils);