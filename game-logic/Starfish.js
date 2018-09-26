const STARFISH = (() => {

  function tileContent(occupant, player) {
    const playerOpponent = player == 'p1' ? 2 : 1;
    switch (occupant) {
      case playerOpponent:
        return 'opponent';
      case 0:
        return 'empty';
      default:
        return 'team';
    }
  }

  function isOutOfBounds(x, y) {
    return x > 7 || x < 0 || y > 7 || y < 0;
  }

  function makeMatrixNode(value) {
    return {
      downLeft: { value: value + 9 },
      downRight: { value: value + 11 },
      upLeft: { value: value - 11 },
      upRight: { value: value - 9 },
      value: value,
    };
  }

  function makeEnhancedMatrixNode(value, matrix) {
    const coord = value.toString().length === 2 ? value.toString() : '0' + value.toString(),
          y = Number(coord[0]), 
          x = Number(coord[1]);
    if (isOutOfBounds(x, y) || value < 0) return;      
    const matrixVal = matrix[y][x];
    // console.log(matrixVal, coord);
    const newMatrixNode = makeMatrixNode(value);
    // console.log(matrixVal, newMatrixNode);
    
    
  }

  function injectAtLowestLevelOf(obj, key, matrix, player) {
    console.log(player);
    
    let thisLevel = obj[key];
    if (typeof thisLevel[key] === 'object') {
      // if value at obj[targetPropName] is an objec that itself has a prop of the same name...
      // go down again
      injectAtLowestLevelOf(thisLevel, key, matrix, player);
    } else {
      // we're at the bottom. set the new prop with the passed-in value     
      makeEnhancedMatrixNode(thisLevel.value, matrix);
      Object.assign(thisLevel, makeMatrixNode(thisLevel.value));
    }
  } 


  function starfish(matrix, clickedPiece) {
    console.log(clickedPiece);
    
    const startXYStr = Number(clickedPiece.location);
    const player = clickedPiece.player;
    let accum = {}, startPos = Number(startXYStr);
    let control = 0;
    function tenticle(start) {      
      if (control === 5) return accum;
      if (start) {
        // if this is the first invokation of `tenticle` (tenticle only gets passed a param the first time)
        accum = makeMatrixNode(start);
        control += 1
        tenticle();
      } else {
        // If tenticle has been invoked more than once
        const prevResultKeys = Object.keys(accum).filter(key => key !== 'value');
        prevResultKeys.forEach(key => {
          injectAtLowestLevelOf(accum, key, matrix, player)          
        });
        control += 1;
        tenticle();
      }
    }

    tenticle(startPos)

    return accum;
  }

  return {
    starfish,
  }

})();