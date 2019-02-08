const PATH_CONTROLLER = (function() {

  function buildAdjacencyList(start, tiles, keys) {
    const adjacencyList = {};
    (function inner(currentNode, isRoot = false) {      
      const currentChildren = currentNode.getNeighbors(keys);
      currentChildren.forEach(childCoords => {
        const { row, col } = childCoords;
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
    return { adjacencyList };
  }


  function parseAdjacencyList(list) {
    const listKeys = Object.keys(list);    
    const rootKey = listKeys.find(key => list[key].isRoot);

    const queue = [];
    const visited = {};
    const results = [];
    
    list[rootKey].neighbors.forEach(nbr => {
      results.push([rootKey, nbr]);
      queue.push(nbr);
    });

    visited[rootKey] = true;

    while (queue.length) {
      let key = queue.shift();
      if (!visited[key]) { 
        // if key has not been visited, mark it as visited and look for it in the adjacency list
        visited[key] = true;
        if (list[key]) {
          // look at each of list[key]'s neighbors
          list[key].neighbors.forEach(nbr => {
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




  function build(start, tiles, keys) {    
    const { adjacencyList } = buildAdjacencyList(start, tiles, keys);
    const parsed = parseAdjacencyList(adjacencyList);
    return { adjacencyList, parsed };
  }

  function findValidPaths(start, tiles) {
    const startPiece = start.hasPiece;
    let keys = [];
    if (startPiece.isKing) {
      keys = ['upLeft', 'upRight', 'downLeft', 'downRight'];
    } else if (startPiece.player === 'p1') {
      keys = ['downLeft', 'downRight'];
    } else {
      keys = ['upLeft', 'upRight'];
    }
    return build(start, tiles, keys);
    // return build(start, tiles, ['upLeft', 'upRight', 'downLeft', 'downRight']);
  }

  return { findValidPaths };

})();