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
        // get array of the end items of each of "paths" sub-arrays     
        const pathEnds = getPathEnds(paths);
        // get the index of the pathEnds value that matches "locale"
        const pathEndIndexOfLocale = pathEnds.indexOf(locale);
        // check to see if pathEndIndexOfLocale exists –– does "locale" match a path's end value?
        if (pathEndIndexOfLocale >= 0) {
          // if it does, push "forwardLeft" onto the end of the subarray of paths at index "pathEndIndexOfLocale"
          paths[pathEndIndexOfLocale].push(forwardLeft);
        // otherwise, check if the locale exists embedded in one or more already-built paths
        } else if (localeMatchPreexistingEmbeddedPathIndexes[0]) {
          // if it does,
          localeMatchPreexistingEmbeddedPathIndexes.forEach(item => {
            // for each matching path index, create a copy of that path ending at the locale-index
            const newPathWithCopiedBase = paths[item.pathI].slice(0, item.localeIndex);
            // check if the last item in the merged copy plus "forward.right" equals the "locale" value
            if (newPathWithCopiedBase.slice(-1)[0] + forward.left == locale) {
               // if it does, push an array containing the merged copy, "locale" and "forwardLeft" values on the end to paths
              paths.push([...newPathWithCopiedBase, locale, forwardLeft]);
            } else {
              // otherwise, push an array containing the merged copy and locale on the end to paths
              paths.push([...newPathWithCopiedBase, locale]);
            }
          });
          // otherwise, if we are more than one out from the start
        } else if (forwardLeft - forward.left != arr[0]) {
          // create a new copy and push forwardLeft onto it
          // TODO: account for multiple paths to slicegi
          const newPathWithCopiedBase = paths[0].slice(0, -1);
          paths.push([...newPathWithCopiedBase, locale, forwardLeft]);
        } else {
          // push a new array [0] = locale, [1] = forwardLeft to paths 
          paths.push([locale, forwardLeft]);
        }
      }

      if (arr.includes(forwardRight)) {
        // get array of the end items of each of "paths" sub-arrays     
        const pathEnds = getPathEnds(paths);
        // get the index of the pathEnds value that matches "locale"
        const pathEndIndexOfLocale = pathEnds.indexOf(locale);
        // check to see if pathEndIndexOfLocale exists –– does locale match a path's end value?
        if (pathEndIndexOfLocale >= 0) {
          // if it does, push "forwardLeft" onto the end of the subarray of paths at index "pathEndIndexOfLocale"
          paths[pathEndIndexOfLocale].push(forwardRight);
          // otherwise, check if the locale exists embedded in one or more already-built paths
        } else if (localeMatchPreexistingEmbeddedPathIndexes[0]) {
          // if it does,
          localeMatchPreexistingEmbeddedPathIndexes.forEach(item => {
            // for each matching path index, create a copy of that path ending at the locale-index
            const newPathWithCopiedBase = paths[item.pathI].slice(0, item.localeIndex);
            // check if the last item in the merged copy plus "forward.right" equals the "locale" value
            if (newPathWithCopiedBase.slice(-1)[0] + forward.right == locale) {    
              // if it does, push an array containing the merged copy, "locale" and "forwardRight" values on the end to paths
              paths.push([...newPathWithCopiedBase, locale, forwardRight]);
            } else {
              // otherwise, push an array containing the merged copy and locale on the end to paths              
              paths.push([...newPathWithCopiedBase, locale]);
            }
          });
          // otherwise, if we are more than one out from the start
        } else if (forwardLeft - forward.left != arr[0]) {
          // create a new copy and push forwardLeft onto it
          // TODO: account for multiple paths to slice
          const newPathWithCopiedBase = paths[0].slice(0, -1);
          paths.push([...newPathWithCopiedBase, forwardRight]);
        } else {
          // push a new array [0] = locale, [1] = forwardLeft to paths
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