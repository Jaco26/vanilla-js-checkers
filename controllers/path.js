const PATH_CONTROLLER = (function() {

  class Node {
    constructor(tile) {
      this.name = tile.name;
      this.parent = null;
      this.children = {};

      this.getNeighbors = tile.getNeighbors.bind(tile);
    }
  }

  function DFSBuildPath(start, tiles, keys) {
    const results = { 
      root: new Node(start),
    };
    
    (function innerHelper(node, accum) {
      const childCoords = node.getNeighbors(keys);
      childCoords.forEach(coord => {
        
      })
      
    })(results.root, results); 
    return results;
  }

  // function DFSBuildPath(start, tiles, keys) {
  //   const results = {};
  //   (function innerHelper(accum, current) {
  //     const newNode = new Node(current.name);
  //     accum[current.name] = newNode;
  //     keys.forEach(key => {
  //       const { row, col } = current.neighbors[key];
  //       const childRow = tiles[row];
  //       if (childRow) {
  //         const child = childRow[col];
  //         if (child) {
  //           const childNode = new Node(child.name);
  //           childNode.parent = newNode;
  //           newNode.children.push(childNode);
  //           innerHelper(accum[current.name], child)
  //         }
  //       }
  //     });
  //   })(results, start);
  //   return results;
  // }

  

  // function DFSBuildPath(start, tiles, keys) {
  //   const results = {};
  //   (function innerHelper(accum, current) {
  //     console.log('accum', accum);

  //     accum[current.name] = {};
  //     keys.forEach(key => {
  //       const { row, col } = current.neighbors[key];
  //       const neighborRow = tiles[row];
  //       if (neighborRow) {
  //         const neighbor = neighborRow[col];
  //         if (neighbor) {
  //           innerHelper(accum[current.name], neighbor);
  //         }
  //       }
  //     });
  //   })(results, start);
  //   return results;
  // }

  function unwrapResults(pathTree) {
    return pathTree;
  }

  function build(start, tiles, keys) {
    const pathTree = DFSBuildPath(start, tiles, keys);
    const unwrapped = unwrapResults(pathTree);
    return unwrapped;
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
  }

  return { findValidPaths };

})();