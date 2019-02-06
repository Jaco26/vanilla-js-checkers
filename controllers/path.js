const PATH_CONTROLLER = (function() {

  class TreeNode {
    constructor(tile) {
      this.value = tile.name;
      this.parent = null;
      this.children = [];

      this.getNeighbors = tile.getNeighbors.bind(tile);
    }
  }

  function buildTree(start, tiles, keys) {
    const tree = { root: new TreeNode(start) };
    const adjacencyList = {};
    (function inner(currentNode) {
      const currentChildren = currentNode.getNeighbors(keys);
      currentChildren.forEach(childCoords => {
        const { row, col } = childCoords;
        if (row !== null && col !== null) {
          const childTile = tiles[row][col];
          const childNode = new TreeNode(childTile);
          if (!adjacencyList[currentNode.value]) adjacencyList[currentNode.value] = [];
          if (!adjacencyList[currentNode.value].includes(childNode.value)) {
            adjacencyList[currentNode.value].push(childNode.value);
            childNode.parent = { value: currentNode.value };
            currentNode.children.push(childNode);
            inner(childNode);
          }
        }
      });
    })(tree.root);
    return { tree, adjacencyList };
  }

  function unzip(adjacencyList) {
    const visited = {};
    const results = [];
    Object.keys(adjacencyList).forEach(key => {

    })
  }

  function parseTree(tree) {
    const queue = [tree.root];
    const results = [];
    while (queue.length) {      
      const node = queue.shift();
      queue.push(...node.children);
      if (!node.parent) {
        // node is root
        results.push([node.value]);
      } else {
        results.forEach((item, i) => {
          if (item[item.length - 1] === node.parent.value) {
            results.push([...item, node.value]);
          }
        });
      }
    }
    return results;
  }

  function build(start, tiles, keys) {
    const { tree, adjacencyList } = buildTree(start, tiles, keys);
    return { 
      parsedTree: parseTree(tree), 
      unzipped: unzip(adjacencyList),
      tree,
      adjacencyList,
    };
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