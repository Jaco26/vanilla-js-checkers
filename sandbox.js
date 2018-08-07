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
      location: tileIndex,
      tileLeft: {},
      tileRight: {},
    };
  }


  function fork(origin, options) {
    return {
      location: origin,
      tileLeft: getTileNRowsAhead(origin, 1, 'left', options),
      tileRight: getTileNRowsAhead(origin, 1, 'right', options),
    }
  }

  
  function getPathTree(paths, origin, options) {
    paths[origin] = fork(origin, options);

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
    
    let pathTree = getPathTree(paths.root, origin, options);
    console.log(paths);
    
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