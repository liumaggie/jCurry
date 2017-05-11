class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;

    const mid = Math.floor(this.board.length/2) - 1;
    const center = [mid, mid];
    this.segments = [center, [mid+1, mid], [mid+2, mid], [mid+3, mid]];
  }

  move() {
    const currDir = Snake.DIRS[this.direction];
    const currPos = this.segments[0];

    const first = this.segments[0];
    const newX = first[0] + currDir[0];
    const newY = first[1] + currDir[1];

    this.checkGameover(newX, newY);
    this.segments.unshift([newX, newY]);
    const last = this.segments.pop();

    if (this.segments.length !== 0 && this.eatApple()) {
      const lastPos = this.segments.slice(-1)[0];
      const newPos = [lastPos[0] + currDir[0], lastPos[1] + currDir[1]];
      this.segments.push(newPos);
      this.board.renderApple();
    }
  }

  eatApple() {
    const head = this.segments[0];
    const x = head[0];
    const y = head[1];
    if (this.board.grid[x][y] === 'A') {
      this.board.grid[x][y] = ' ';
      return true;
    }
    return false;
  }

  collide() {
    for (let i=1; i < this.segments.length; i++) {
      if (this.segments[i] === this.segments[0]) {
        return true;
      }
    }
    return false;
  }

  checkGameover(x, y) {
    if (x < 0 || y < 0 ||
        x >= this.board.length || y >= this.board.length ||
        this.collide()) {
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
