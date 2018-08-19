const PATH_BUILDER = (() => {

  const sortMoves = (player, moves) => {
    return moves.sort((a, b) => {
      if (player == 'p1') {
        return Number(a.locale) > Number(b.locale) ? -1 : 1
      } else {
        return Number(a.locale) < Number(b.locale) ? -1 : 1
      }
    });
  };

  const getForwardModifier = (player) => ({
    left: player == 'p1' ? -11 : 9,
    right: player == 'p1' ? -9 : 11,
  });

  const getPathEnds = (paths) => {
    return paths.reduce((a, path) => {
      a.push(path[path.length - 1]);
      return a;
    }, []);
  }

  const doesLocaleMatchEmbeddedIndex = (locale, paths) => { 
    const slicedPaths = paths.map(path => path.slice(0, -1));
    return slicedPaths.reduce((embeddedIndexes, path, pathI) => {
      const localeIndex = path.indexOf(locale);
      if (localeIndex >= 0) {
        embeddedIndexes.push({
          localeIndex,
          pathI
        });
      }
      return embeddedIndexes;
    }, []);
    
    
  }

  function getRelations(player, sortedMoves) {
    const forward = getForwardModifier(player);
    const numLocales = sortedMoves.map(move => Number(move.locale));   
    const paths = [];
    numLocales.forEach((locale, i, arr) => {
      const forwardLeft = locale + forward.left;
      const forwardRight = locale + forward.right;
      const localeMatchPreexistingEmbeddedPathIndexes = doesLocaleMatchEmbeddedIndex(locale, paths);
      if (arr.includes(forwardLeft)) {     
        const pathEnds = getPathEnds(paths);
        const localeMatchPathEndIndex = pathEnds.indexOf(locale);
        if (localeMatchPathEndIndex >= 0) {
          paths[localeMatchPathEndIndex].push(forwardLeft);
        } else if (localeMatchPreexistingEmbeddedPathIndexes[0]) {
          /*
          * Find indexes of all paths which have the locale value embedded
          * For each of those, find the index of the locale.
          * 
          * make a copy of each array ending at the embedded-locale index
          * push to those arrays
          */
          localeMatchPreexistingEmbeddedPathIndexes.forEach(item => {            
            const newPathWithCopiedBase = paths[item.pathI].slice(0, item.localeIndex);
            paths.push([...newPathWithCopiedBase, locale]);
          });
        } else {
          paths.push([locale, forwardLeft]);
        }
      }

      if (arr.includes(forwardRight)) {
        const pathEnds = getPathEnds(paths);
        const localeMatchPathEndIndex = pathEnds.indexOf(locale);  
        if (localeMatchPathEndIndex >= 0) {          
          paths[localeMatchPathEndIndex].push(forwardRight);
        } else if (localeMatchPreexistingEmbeddedPathIndexes[0]) {
          localeMatchPreexistingEmbeddedPathIndexes.forEach(item => {
            const newPathWithCopiedBase = paths[item.pathI].slice(0, item.localeIndex);
            paths.push([...newPathWithCopiedBase, locale]);
          });
        } else {
          paths.push([locale, forwardRight]);
        }
      }

    });
    
    return paths;
  }

  function buildPath(clickedPiece, pieceStart, moves) {
    const { player } = clickedPiece;
    const origin = {
      contents: 'start',
      locale: pieceStart,
    };
    const sortedMoves = sortMoves(player, [...moves, origin]);
    return getRelations(player, sortedMoves);
  }

  return {
    buildPath,
  };

})();