# Checkers!

This is an attempt to implement the game "checkers" with HTML5 canvas and vanilla JavaScript. Check out the board <a href="https://jaco26.github.io/vanilla-js-checkers/">here</a>

### V2

The `models` and `controllers` directories contain new code which utilizes graph/adjacency list data structures to more cleanly and efficiently accomplish what the code in `game-logic` and `rendor-board` did. So far, when you click a checker piece, the `controllers/path.js` module builds an array of all possible paths that piece might take. This array will be used to implement the functionality provided in the old code.