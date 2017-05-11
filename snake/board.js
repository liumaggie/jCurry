const Snake = require('./snake');
const Apple = require('./apple');

class Board {
  constructor(length) {
    this.length = length;
    this.snake = new Snake(this);
    this.grid = this.setup();
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
  }

}

module.exports = Board;
