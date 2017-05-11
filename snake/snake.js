class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;

    const mid = Math.floor(this.board.length/2) - 1;
    const center = [mid, mid];
    this.segments = [center];
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  move() {
    const currDir = Snake.DIRS[this.direction];
    let first = this.head();
    const newX = first[0] + currDir[0];
    const newY = first[1] + currDir[1];
    this.checkGameover(newX, newY);

    this.segments.push([newX, newY]);
    this.segments.shift();


    if (this.segments.length !== 0 && this.eatApple()) {
      first = this.head();
      const newPos = [first[0] + currDir[0], first[1] + currDir[1]];
      if (!this.offBoundaries(newPos[0], newPos[1])) {
        this.segments.push(newPos);
      } else {
        const tail = this.segments[0];
        this.segments.unshift([tail[0] - currDir[0], tail[1] - currDir[1]]);
      }
      this.board.apple.updateApple();
    }
  }

  isOccupied(pos) {
    let occupied = false;
    this.segments.forEach((segment) => {
      if (segment[0] === pos[0] && segment[1] === pos[1]) {
        occupied = true;
      }
    });
    return occupied;
  }

  offBoundaries(x, y) {
    if (x < 0 || y < 0 ||
      x >= this.board.length || y >= this.board.length) {
        return true;
    }
    return false;
  }

  eatApple() {
    const head = this.head();
    const x = head[0];
    const y = head[1];

    if (x === this.board.apple.pos[0] && y === this.board.apple.pos[1]) {
      return true;
    }
    return false;
  }

  collide() {
    for (let i=0; i < this.segments.length-1; i++) {
      // checks if any snake segments are equal to the first segment
      if (this.segments[i][0] === this.head()[0] &&
        this.segments[i][1] === this.head()[1]) {
          return true;
      }
    }
    return false;
  }

  checkGameover(x, y) {
    if (this.offBoundaries(x, y) || this.collide()) {
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
