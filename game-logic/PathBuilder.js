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

  function getRelations(player, sortedMoves) {
    const forward = getForwardModifier(player);
    const numLocales = sortedMoves.map(move => Number(move.locale));   
    const paths = [];
    numLocales.forEach((locale, i, arr) => {
      const forwardLeft = locale + forward.left;
      const forwardRight = locale + forward.right;
      const pathEnds = getPathEnds(paths);
      if (arr.includes(forwardLeft)) {        
        const localePathIndex = pathEnds.indexOf(locale);
        // console.log('i', i, 'locale', locale, 'locale exists as end of other path', localePathIndex, 'forwardLeft', forwardLeft);
        if (localePathIndex >= 0) {
          paths[localePathIndex].push(forwardLeft);
        } else {
          paths.push([locale, forwardLeft]);
        }
      }

      if (arr.includes(forwardRight)) {
        const localePathIndex = pathEnds.indexOf(locale);
        // console.log('pathEnds', pathEnds);
        
        // console.log('i', i, 'locale', locale, 'locale exists as end of other path', localePathIndex, 'forwardRight', forwardRight);
        if (localePathIndex >= 0) {
          paths[localePathIndex].push(forwardRight);
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