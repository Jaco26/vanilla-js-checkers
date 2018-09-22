const STARFISH = (() => {

  function makeMatrixNode(value) {
    return {
      downLeft: { value: value + 9 },
      downRight: { value: value + 11 },
      upLeft: { value: value - 11 },
      upRight: { value: value - 9 },
      value: value,
    };
  }

  function injectAtLowestLevelOf(obj, targetPropName) {
    let thisLevel = obj[targetPropName];
    if (typeof thisLevel[targetPropName] === 'object') {
      // if value at obj[targetPropName] is an objec that itself has a prop of the same name...
      // go down again
      injectAtLowestLevelOf(thisLevel, targetPropName);
    } else {
      // we're at the bottom. set the new prop with the passed-in value     
      // console.log(thisLevel);
      thisLevel[targetPropName] = makeMatrixNode(thisLevel.value);
      
    }
  } 

  // var test = {
  //   h: {
  //     h: {
  //       h: {
  //         h: {

  //         }
  //       }
  //     }
  //   }
  // }

  // injectAtLowestLevelOf(test, 'h', 44);
  // console.log(test);
  
  

  function starfish(matrix, startXYStr) {
    let accum = {}, startPos = Number(startXYStr);
    let control = 0;
    function tenticle(start) {
      if (control === 10) return accum;
      if (start) {
        // if this is the first invokation of `tenticle` (tenticle only gets passed a param the first time)
        accum = makeMatrixNode(start);
        control += 1
        tenticle();
      } else {
        // If tenticle has been invoked more than once
        const prevResultKeys = Object.keys(accum).filter(key => key !== 'value');
        prevResultKeys.forEach(key => {
          injectAtLowestLevelOf(accum, key)          
        });
        control += 1;
        tenticle();
      }
    }

    tenticle(startPos)
    setTimeout(() => {
      console.log(accum);
    }, 500)
    
    
  }

  return {
    starfish,
  }

})();