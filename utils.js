const utils = ( () => {

  const flatten = (array, nLevels = 1) => {
    if (array.constructor != Array) throw new Error('The value provided as the `array` argument is not an Array, please pass in an Array');
    let result = [];
    const flattener = (arr, n) => {
      if (n == 0) return;
      result = arr.reduce((a, b) => {
        if (b.constructor == Array) {
          a.push(...b);
        } else {
          a.push(b);
        }
        return a;
      }, []);
      n -= 1;
      flattener(result, n);
    }
    flattener(array, nLevels);
    return result;
  }


  


  const getTileIndex = (traceOrigin, originModifier) => (Number(traceOrigin) + originModifier).toString();

  const isValid = (tileIndex, validMoves) => validMoves.includes(tileIndex);

  const getOriginModifier = (nRows, player, colDirection) => {
    if (player == 'p1') return (colDirection == 'right' ? 11 : 9) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? -9 : -11) * nRows;
  }

  

  const traceBackPath = {
    examineTile: (nRows, colDirection, options) => {
      const { traceOrigin, player, validMoves } = options;
      const originModifier = getOriginModifier(nRows, player, colDirection);      
      const tileIndex = getTileIndex(traceOrigin, originModifier)      
      if ( isValid(tileIndex, validMoves) ) {
        console.log(`The tile at location ${tileIndex} is valid`);
        
      } else {
        console.log(`The tile at location ${tileIndex} is not included in the list of valid moves`);
        
      }
      // return tileContent;
    },
  }

  return {
    flatten,
    traceBackPath,
  }

})();