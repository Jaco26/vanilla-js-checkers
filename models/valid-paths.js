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
      (function inner(currentNode, isRoot = false) {      
        const currentChildren = currentNode.getNeighbors(keys);
        const childKeys = Object.keys(currentChildren);        
        childKeys.forEach(key => {
          const { row, col } = currentChildren[key];
          if (row !== null && col !== null) {
            const childTile = tiles[row][col];
            if (!adjacencyList[currentNode.name]) {
              adjacencyList[currentNode.name] = { isRoot,  neighbors: [] };
            }
            if (!adjacencyList[currentNode.name].neighbors.includes(childTile.name)) {
              adjacencyList[currentNode.name].neighbors.push(childTile.name);
              inner(childTile);
            }
          }
        });
      })(start, true);
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


// buildAdjacencyList(start, tiles, directionKeys) {
//   const adjacencyList = {};
//   (function inner(currentNode, keys, checkingJump, isRoot = false) {      
//     if (!adjacencyList[currentNode.name]) {
//       adjacencyList[currentNode.name] = { isRoot, isOpponent: false, neighbors: [] };
//     }
//     // console.log('currentNode keys', currentNode.name, keys );
    
//     const currentChildren = currentNode.getNeighbors(keys);
//     keys.forEach(key => {
//       const { row, col } = currentChildren[key];
//       if (row !== null && col !== null) {
//         const childTile = tiles[row][col];
//         if (isRoot) {
//           if (childTile.hasPiece) {
//             adjacencyList[currentNode.name].neighbors.push(childTile.name);
//             inner(childTile, [key], true);
//           } else {
//             adjacencyList[currentNode.name].neighbors.push(childTile.name);
//           }
//         } else if (checkingJump) {
//           if (childTile.hasPiece) {
//             console.log('child tile', childTile.name);
//           } else {
//             // console.log(childTile.name, directionKeys);
            
//             adjacencyList[currentNode.name].neighbors.push(childTile.name);
//             inner(childTile, directionKeys);
//           }
//         } else {
//           if (childTile.hasPiece) {
//             // if the adjacent tile has a piece,
//             // add that tile's name to the adjacency list
//             adjacencyList[currentNode.name].neighbors.push(childTile.name);
//             // tell the next function call that we are checking for an open tile on the other side of the adjacent tile
//             inner(childTile, [key], true);
//           } else {
//             // we're done     
//             // adjacencyList[parentValue].neighbors.pop();  
//           }
//         }
//       }
//     });
//   })(start, directionKeys, false, true);
//   return adjacencyList;
// }