const PATH_CONTROLLER = (function() {

  // class TreeNode {
  //   constructor(tile) {
  //     this.value = tile.name;
  //     this.parent = null;
  //     this.children = [];

  //     this.getNeighbors = tile.getNeighbors.bind(tile);
  //   }
  // }

  // function buildTree(start, tiles, keys) {
  //   const tree = { root: new TreeNode(start) };
  //   const adjacencyList = {};
  //   (function inner(currentNode) {
  //     const currentChildren = currentNode.getNeighbors(keys);
  //     currentChildren.forEach(childCoords => {
  //       const { row, col } = childCoords;
  //       if (row !== null && col !== null) {
  //         const childTile = tiles[row][col];
  //         const childNode = new TreeNode(childTile);
  //         if (!adjacencyList[currentNode.value]) {
  //           adjacencyList[currentNode.value] = { 
  //             isRoot: !currentNode.parent, 
  //             neighbors: [],
  //           };
  //         }
  //         if (!adjacencyList[currentNode.value].neighbors.includes(childNode.value)) {
  //           adjacencyList[currentNode.value].neighbors.push(childNode.value);
  //           childNode.parent = { value: currentNode.value };
  //           currentNode.children.push(childNode);
  //           inner(childNode);
  //         }
  //       }
  //     });
  //   })(tree.root);
  //   return { tree, adjacencyList };
  // }

  // function parseTree(tree) {
  //   const queue = [tree.root];
  //   const results = [];
  //   while (queue.length) {      
  //     const node = queue.shift();
  //     queue.push(...node.children);
  //     if (!node.parent) {
  //       // node is root
  //       results.push([node.value]);
  //     } else {
  //       results.forEach((item, i) => {
  //         if (item[item.length - 1] === node.parent.value) {
  //           results.push([...item, node.value]);
  //         }
  //       });
  //     }
  //   }
  //   return results;
  // }


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
    visited[rootKey] = true;
    queue.push(...list[rootKey].neighbors)
    while (queue.length) {
      const key = queue.shift();
      if (!visited[key]) {
        results.push(key);
        visited[key] = true;
        if (list[key]) {
          queue.push(...list[key].neighbors);
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