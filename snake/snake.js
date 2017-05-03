class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;

    const mid = Math.random(this.board.length/2);
    const center = [mid, mid];
    this.segments = [center];
  }

  move() {
    const currDir = Snake.DIRS[this.direction];
    const currPos = this.segments[0];
    const newX = currPos[0] + currDir[0];
    const newY = currPos[1] + currDir[1];
    this.segments.push(newX, newY);
  }

  checkOpposite(x, y, dir) {
    this.direction === x && dir !== y;
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
  'W': [-1, 0]
};

module.exports = Snake;
