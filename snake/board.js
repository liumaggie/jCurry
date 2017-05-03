const Snake = require('./snake');

class Board {
  constructor(length) {
    this.snake = new Snake(this);
    this.length = length;
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

  render() {
    const grid = this.setup();
    this.snake.segments.forEach((segment) => {
      const x = segment[0];
      const y = segment[1];
      grid[x][y] = "S";
    });

  }

}

module.exports = Board;
