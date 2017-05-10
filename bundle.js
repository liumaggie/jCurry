/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;

    const mid = Math.floor(this.board.length/2) - 1;
    const center = [mid, mid];
    this.segments = [center];
  }

  move() {
    const currDir = Snake.DIRS[this.direction];
    const currPos = this.segments[0];
    const newX = currPos[0] + currDir[0];
    const newY = currPos[1] + currDir[1];
    this.checkGameover(newX, newY);
    this.segments.push([newX, newY]);
    this.segments.shift();
  }

  checkGameover(x, y) {
    if (x < 0 || y < 0 ||
        x >= this.board.length || y >= this.board.length ) {
          this.segments = [];
    }
  }

  checkOpposite(x, y, dir) {
    return this.direction === x && dir !== y;
  }

  turn(newDir) {
    if (this.checkOpposite('N', 'S', newDir) ||
        this.checkOpposite('S', 'N', newDir) ||
        this.checkOpposite('W', 'E', newDir) ||
        this.checkOpposite('E', 'W', newDir)) {
          this.direction = newDir;
        }
  }
}

Snake.DIRS = {
  'N': [-1, 0],
  'S': [1, 0],
  'E': [0, 1],
  'W': [0, -1]
};

module.exports = Snake;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(2);
const Snake = __webpack_require__(0);

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(10);
    this.render();
    this.updateRender();
    // this.renderApple();

    $l(window).on('keydown', this.handleKey.bind(this));
    this.interval = window.setInterval(this.step.bind(this), 500);
  }

  handleKey(event) {
    event.preventDefault();
    if (event.keyCode === 37) {
      this.board.snake.turn('W');
    } else if (event.keyCode === 38) {
      this.board.snake.turn('N');
    } else if (event.keyCode === 39) {
      this.board.snake.turn('E');
    } else if (event.keyCode === 40) {
      this.board.snake.turn('S');
    }
  }

  render() {
    let html = "";
    for (let i=0; i < this.board.length; i++) {
      html += "<ul>";
      for (let j=0; j < this.board.length; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
  }

  updateRender() {
    let allUl = $l('ul');

    this.board.snake.segments.forEach((segment) => {
      const row = segment[1];
      const col = segment[0];
      const snakeRow = allUl.htmlElements[row];

      $l(snakeRow).addClass('row-of-snake');
      let liInRow = $l('ul.row-of-snake');

      const snakeLi = liInRow.children().htmlElements[col];
      $l(snakeLi).addClass('snake');
    });
    this.renderApple();
  }

  renderApple() {
    let allUl = $l('ul');
    const row = this.board.apple.pos[0];
    const col = this.board.apple.pos[1];
    // debugger
    const appleRow = allUl.htmlElements[row];
    $l(appleRow).addClass('row-of-apple');
    let liInRowOfApple = $l('ul.row-of-apple');

    const appleLi = liInRowOfApple.children().htmlElements[col];
    $l(appleLi).addClass('apple');
  }


  step() {
    this.board.render();
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
      this.updateRender();
    }
    // } else {
    //   alert("You lose!");
    //   window.clearInterval(this.interval);
    // }
  }
}

module.exports = SnakeView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Apple = __webpack_require__(4);

class Board {
  constructor(length) {
    this.length = length;
    this.snake = new Snake(this);
    this.grid = this.setup();
    this.render();
    this.renderApple();
  }

  setup() {
    const grid = [];
    for (let i=0; i < this.length; i++) {
      let row = [];
      for (let j=0; j < this.length; j++) {
        row.push(" ");
      }
      grid.push(row);
    }
    return grid;
  }

  renderApple() {
    let x = Math.floor(Math.random() * this.length);
    let y = Math.floor(Math.random() * this.length);
    while (this.grid[x][y] === "S") {
      x = Math.floor(Math.random() * this.length);
      y = Math.floor(Math.random() * this.length);
    }
    this.apple = new Apple(x, y);
    this.grid[x][y] = "A";
  }

  render() {
    this.snake.segments.forEach((segment) => {
      const x = segment[0];
      const y = segment[1];
      this.grid[x][y] = "S";
    });
    this.renderApple();
  }

}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const SnakeView = __webpack_require__(1);

$l(() => {
  const root = $l('.snake-game');
  new SnakeView(root);
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Apple {
  constructor(x, y) {
    this.pos = [x, y];
  }
}

module.exports = Apple;


/***/ })
/******/ ]);