const sandbox = ( () => {

  function firstCharToUpper(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  function handleForkResult(direction, forkResult, options) {
    let concern = forkResult[`nextRow${firstCharToUpper(direction)}`];
    console.log(concern);
    console.log(options);
  }


  function tileContent(occupant, player) {
    const playerOpponent = player == 'p1' ? 2 : 1;
    switch(occupant) {
      case playerOpponent:
        return 'opponent';
      case 0:
        return 'empty';
      default:
        return 'team';
    }
  }

  function getOriginModifier(nRows, player, colDirection) {
    if (player == 'p1') return (colDirection == 'right' ? -9 : -11) * nRows;
    if (player == 'p2') return (colDirection == 'right' ? 9 : 11) * nRows;
  } 

  function getTileNRowsAhead(origin, nRows, colDirection, options) {
    const { board, player } = options;    
    const tileIndex = (Number(origin) + getOriginModifier(nRows, player, colDirection)).toString();
    const row = Number(tileIndex[0]);
    const col = Number(tileIndex[1]);
    const occupant = board[row][col];
    return {
      contents: tileContent(occupant, player),
      locale: tileIndex,
      tileLeft: {},
      tileRight: {},
    };
  }


  function fork(origin, options) {
    return {
      locale: origin,
      tileLeft: getTileNRowsAhead(origin, 1, 'left', options),
      tileRight: getTileNRowsAhead(origin, 1, 'right', options),
    }
  }

  let count = 0;
  
  function getPathTree(paths, origin, options) {
    // console.log(options);
    
    count += 1;
    let pathKeys;
    // if (Object.keys(paths)) {
    //   pathKeys = Object.keys(paths);
    // }

    if (Object.values(paths)) {
      pathValues = Object.keys(paths);
    }
    
    const { locale, tileLeft, tileRight } = fork(origin, options);
    if (pathValues[0]) {
      paths[pathKeys[pathKeys.length - 1]] = { locale, tileLeft, tileRight };
    } else {
      paths[origin] = { locale, tileLeft, tileRight };
    }
    [tileLeft, tileRight].forEach(tile => {
      if (count > 3) return;
      getPathTree(paths, tile.locale, options);
    })
    
    
  }

  function getValidPaths(clickedPiece, game) {
    let origin = clickedPiece.location;
    const options = {
      board: game.history[game.history.length - 1],
      player: clickedPiece.player,
      forkCount: 0,
    };    
    const paths = {
      root: {}
    };
    
    // let pathTree = getPathTree(paths.root, origin, options);
    // console.log(paths);
    
    return paths;
  }



  const game = {
    history: [
      [
        [null, 2, null, 2, null, 2, null, 2],
        [2, null, 2, null, 2, null, 2, null],
        [null, 2, null, 2, null, 2, null, 2],
        [0, null, 0, null, 0, null, 0, null],
        [null, 0, null, 0, null, 2, null, 0],
        [1, null, 1, null, 1, null, 1, null],
        [null, 1, null, 1, null, 1, null, 1],
        [1, null, 1, null, 1, null, 1, null],
      ],
    ]
  } 

  const piece = {
    location: '54',
    player: 'p1'
  }

  getValidPaths(piece, game)

})();


var count = 3; 

function objectOpener(obj) {
  if (count < 0) return obj; // no infinite loop
  
  // get all top level properties of obj
  const keys = Object.keys(obj)

  // console.log(keys);
  
  // remove the top layer
  obj = keys.reduce((a, b) => {  
    // console.log(a[b]);
    
    a = obj[b];  
    console.log(a);
     
    return a;
  }, {});
  
  count--;

  objectOpener(obj);
}

const testObj = {
  l1: {
    l2: {
      l3: {
        l4: {

        }
      }
    }
  }
}


console.log(objectOpener(testObj))

// console.log(testObj);


// function reducer(n, obj) {
//   if (n == 0) {
//     return obj;
//   } 
//   obj[n] = {
//     number: n,
//     square: n * n,
//     squareRoot: Math.sqrt(n),
//   };
//   n -= 1;
//   reducer(n, obj)
// }

// let thing = {};
// reducer(4, thing)
// console.log(thing);



 /* 
     origin = {
       location: 54,
       tileLeft: {
         location: 43,
         tileLeft: {
           location: 32,
           tileLeft: {

           },
           tileRight: {

           }
         },
         tileRight: {
           location: 34,
           tileLeft: {

           },
           tileRight: {

           }
         }
       },
       tileRight: {
         location: 45,
         tileLeft: {
           location: 36,
           tileLeft: {

           },
           tileRight: {

           }
         },
         tileRight: {
           location: 32,
           tileLeft: {

           },
           tileRight: {

           }
         }
       }
     }
   */