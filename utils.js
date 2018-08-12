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

  return {
    flatten,
  }

})();