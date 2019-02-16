const VALID_PATHS_MODEL = (function() {

  const util = {
    getDirectionKeys(startPiece) {
      if (startPiece.isKing) {
        return ['upLeft', 'upRight', 'downLeft', 'downRight'];
      } else if (startPiece.player === 'p1') {
        return ['downLeft', 'downRight'];
      } else {
        return ['upLeft', 'upRight'];
      }
    },
    isOpponentAndCanJump(currentPlayer, neighborTile, direction, tiles) {
      function isOpponent() {
        // console.log(currentPlayer, neighborTile.hasPiece.player);
        return currentPlayer !== neighborTile.hasPiece.player;
      }
      function canJump() {
        const { row, col } = neighborTile.neighbors[direction];
        if (row !== null && col !== null) {
          return !tiles[row][col].hasPiece; // there is empty space on the other side of neighborTile
        }
        return false;
      }
      return isOpponent() && canJump();
    }
  }

  class AdjacencyListNode {
    constructor(isRoot = false, isOpponent = false) {
      this.isOpponent = isOpponent;
      this.isRoot = isRoot;
      this.neighbors = [];
    }
  }

  class ValidPaths {
    constructor(start, tiles) {
      const keys = util.getDirectionKeys(start.hasPiece);
      this.adjacencyList = this.buildAdjacencyList(start, tiles, keys);
      this.list = this.parseAdjacencyListV1();
      // this.list = [];
      // this.parseAdjacencyListV2();
    }

    buildAdjacencyList(start, tiles, keys) {
      const adjacencyList = {};
      const currentPlayer = start.hasPiece.player;

      function handleJump(currentTile, directionKeys, neighbor, key, callback) {

        if (!adjacencyList[currentTile.name].neighbors.includes(neighbor.name)) {
          adjacencyList[currentTile.name].neighbors.push(neighbor.name); // that piece is an opponent and there is space on the other side to jump to
        }
        
        const { row, col } = neighbor.neighbors[key];
        const openTile = tiles[row][col];

        // register the neighbor with the opponent piece so that we can parse
        // the adjacency list later
        if (!adjacencyList[neighbor.name]) {
          adjacencyList[neighbor.name] = new AdjacencyListNode(false, true);
        }
        if (!adjacencyList[neighbor.name].neighbors.includes(openTile.name)) {
          adjacencyList[neighbor.name].neighbors.push(openTile.name);
          callback(openTile, directionKeys);
        }
      }

      (function traverse(currentTile, directionKeys, isRoot = false) {
        // register currentNode if it is not registered on the adjacency list
        if (!adjacencyList[currentTile.name]) {
          adjacencyList[currentTile.name] = new AdjacencyListNode(isRoot);
        }
        directionKeys.forEach(key => {
          const { row, col } = currentTile.neighbors[key]; // row and column number of neighbor
          if (row !== null && col !== null) {
            const neighbor = tiles[row][col];
            if (isRoot) { // the currentTile is the one we clicked
              if (neighbor.hasPiece) { // the neighbor tile has a piece
                if (util.isOpponentAndCanJump(currentPlayer, neighbor, key, tiles)) {
                  handleJump(currentTile, directionKeys, neighbor, key, traverse);
                }
              } else { // neighbor of clicked piece is empty
                adjacencyList[currentTile.name].neighbors.push(neighbor.name);
              }
            } else { // the current tile is one we have jumped to
              if (neighbor.hasPiece) {
                if (util.isOpponentAndCanJump(currentPlayer, neighbor, key, tiles)) {
                  handleJump(currentTile, directionKeys, neighbor, key, traverse);
                } 
              }
            }
          } 
        });
      })(start, keys, true);
      // })(start, ['downRight', 'downLeft', 'upRight', 'upLeft'], true);
      return adjacencyList;
    }

    parseAdjacencyListV1() {
      const listKeys = Object.keys(this.adjacencyList);    
      const rootKey = listKeys.find(key => this.adjacencyList[key].isRoot);

      const queue = [];
      const visited = {};
      const results = [];
      
      this.adjacencyList[rootKey].neighbors.forEach(nbr => {        
        results.push([rootKey, nbr]);
        queue.push(nbr);
      });

      visited[rootKey] = true;

      while (queue.length) {
        let key = queue.shift();
        if (!visited[key]) { 
          // if key has not been visited, mark it as visited and look for it in the adjacency list
          visited[key] = true;
          if (this.adjacencyList[key]) {
            // look at each of list[key]'s neighbors
            this.adjacencyList[key].neighbors.forEach(nbr => {
              // look at each item in results
              results.forEach(item => {
                // if key is in item
                if (item[item.length - 1] === key) { // if the last value in item is the key
                  // push neighbor onto it
                  item.push(nbr);
                } else if (item.includes(key)) { // otherwise, if item includes the key
                  // create a slice of the item from index 0 to indexOf(key) + 1
                  const slice = item.slice(0, item.indexOf(key) + 1);                
                  // push nbr onto it
                  slice.push(nbr);
                  // push the slice onto results
                  results.push(slice);                
                } 
              });
              queue.push(nbr);   
            });
          }
        }
      }
      return results;
    }


    parseAdjacencyListV2() {
      const listKeys = Object.keys(this.adjacencyList);
      const rootKey = listKeys.find(key => this.adjacencyList[key].isRoot);

      const queue = [];
      const results = [];
      const previousMoves = [];

      function movePreviouslyMade(from, to) {
        const fromTo = [from, to].join();
        const toFrom = [to, from].join();      
        return previousMoves.some(item => item.join() === fromTo || item.join() === toFrom);
      }

      this.adjacencyList[rootKey].neighbors.forEach(nbr => {
        results.push([rootKey, nbr]);
        queue.push(nbr);
      });

      while (queue.length) {
        let currentKey = queue.pop();
        if (this.adjacencyList[currentKey]) {
          this.adjacencyList[currentKey].neighbors.forEach(nbr => {
            if (!movePreviouslyMade(currentKey, nbr)) {              
              results.forEach(item => {
                if (item[item.length - 1] === currentKey) {
                  item.push(nbr);
                } else if (item.includes(currentKey)) {
                  const slice = item.slice(0, item.indexOf(currentKey) + 1);
                  slice.push(nbr);
                  results.push(slice);
                }
              });
              previousMoves.push([currentKey, nbr]);
              queue.push(nbr);
            }
          });
        }
      }
      this.list = results;
    }
  }

  return { ValidPaths };

})();


