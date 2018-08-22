const MOVE_RESULTS = ((tilesTraveled) => {


  function getValidPathTraveled(clickedPiece, valid, game) {
    
    const realPath = tilesTraveled.getTilesTraveled(clickedPiece.path, game.tiles)
    console.log('Tiles traveled', realPath);
  }

  return {
    getValidPathTraveled,
  }

})(TILES_TRAVELED);