class Apple {
  constructor(board) {
    this.board = board;
    this.updateApple();
  }

  updateApple() {
    let x = Math.floor(Math.random() * this.board.length);
    let y = Math.floor(Math.random() * this.board.length);
    while (this.board.snake.isOccupied([x, y])) {
      x = Math.floor(Math.random() * this.board.length);
      y = Math.floor(Math.random() * this.board.length);
    }
    this.pos = [x, y];
  }
}

module.exports = Apple;
