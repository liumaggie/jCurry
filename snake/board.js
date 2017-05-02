const Snake = require('./snake');

class Board {
  constructor(size) {
    this.snake = new Snake(this);
    this.size = size;
  }

  setup() {
    const grid = [];
    for (let i=0; i < this.size; i++) {
      let row = [];
      for (let j=0; j < this.size; j++) {
        row.push(" ");
      }
      grid.push(row);
    }
  }

  render() {
    
  }

}

module.exports = Board;
