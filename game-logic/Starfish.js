const STARFISH = (() => {

  function Base10MatrixNode(value) {
    this.value = value;
    this.downLeft = {
      value: value + 9,
    };
    this.downRight = {
      value: value + 11,
    };
    this.upLeft = {
      value: value - 11,
    };
    this.upRight = {
      value: value - 9,
    };
  }

  function starfish(matrix, startXYStr) {
    let accum = [], startPos = Number(startXYStr);
    function tenticle(start) {
      if (start) {
        // if this is the first invokation of `tenticle` (tenticle only gets passed a param the first time)
        accum.push(new Base10MatrixNode(start));
        tenticle();
      } else {
        // If tenticle has been invoked more than once
        const prevResults = Object.keys(accum).filter(key => key !== 'value');
        // const thisLevelAccum = [];
        console.log(accum);
        let i;
        
        
      }
    }

    tenticle(startPos)

  }

  return {
    starfish,
  }

})();