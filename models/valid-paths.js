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
      this.list = this.parseAdjacencyList();
    }

    buildAdjacencyList(start, tiles, keys) {
      const adjacencyList = {};
      const currentPlayer = start.player;
      (function inner(currentTile, directionKeys, isRoot = false) {

        // register currentNode if it is not registered on the adjacency list
        if (!adjacencyList[currentTile.name]) {
          adjacencyList[currentTile.name] = new AdjacencyListNode(isRoot);
        }

        directionKeys.forEach(key => {
          const { row, col } = currentTile.neighbors[key]; // row and column number of neighbor

          if (row !== null && col !== null) {
            const neighbor = tiles[row][col];

            if (isRoot) {
              // the currentTile is the one we clicked
              if (neighbor.hasPiece) {
                // the neighbor tile has a piece
                if (util.isOpponentAndCanJump(currentPlayer, neighbor, key, tiles)) {
                  // that piece is an opponent and there is space on the other side to jump to
                  adjacencyList[currentTile.name].neighbors.push(neighbor.name);

                  const { row, col } = neighbor.neighbors[key];
                  const openTile = tiles[row][col];

                  // register the neighbor with the opponent piece so that we can parse
                  // the adjacency list later
                  adjacencyList[neighbor.name] = new AdjacencyListNode(false, true);
                  adjacencyList[neighbor.name].neighbors.push(openTile.name)

                  inner(openTile, directionKeys);
                }
              } else {
                // neighbor of clicked piece is empty
                adjacencyList[currentTile.name].neighbors.push(neighbor.name);
              }
            } else {
              // the current tile is one we have jumped to
              if (neighbor.hasPiece) {
                if (util.isOpponentAndCanJump(currentPlayer, neighbor, key, tiles)) {
                  
                  adjacencyList[currentTile.name].neighbors.push(neighbor.name);
                  const { row, col } = neighbor.neighbors[key];
                  const openTile = tiles[row][col];

                  adjacencyList[neighbor.name] = new AdjacencyListNode(isRoot, true);
                  adjacencyList[neighbor.name].neighbors.push(openTile.name)

                  // console.log(`${currentTile.name}'s neighbor ${neighbor.name} can be jumped so that we end up in ${openTile.name}`);
                  inner(openTile, directionKeys);
                } 
              }
            }
          } 
        })


      })(start, keys, true);
    // })(start, ['downRight', 'downLeft', 'upRight', 'upLeft'], true);

      return adjacencyList;
    }

    parseAdjacencyList() {
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

  }

  return { ValidPaths };

})();
