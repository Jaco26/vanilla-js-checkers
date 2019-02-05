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
    const results = {  
      root: new TreeNode(start),
    };
    (function inner(currentNode) {
      const currentChildren = currentNode.getNeighbors(keys);
      currentChildren.forEach(childCoords => {
        const { row, col } = childCoords;
        if (row !== null && col !== null) {
          const childTile = tiles[row][col];
          const childNode = new TreeNode(childTile);
          childNode.parent = currentNode;
          currentNode.children.push(childNode);
        }
      });
      currentNode.children.forEach(child => {
        inner(child);
      });
    })(results.root);
    return results;
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

  function eliminateDuplicates(unwrapped) {
    return unwrapped.reverse().reduce((accum, item) => {
      const isDuplicate = accum.some(thing => thing.join().includes(item.join()));        
      if (!isDuplicate) {
        accum.push(item);
      }
      return accum;
    }, []);
  }

  function build(start, tiles, keys) {
    const pathTree = buildTree(start, tiles, keys);    
    const parsed = parseTree(pathTree);        
    const noDuplicates = eliminateDuplicates(parsed);
    return noDuplicates;
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