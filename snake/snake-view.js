const Board = require('./board');
const Snake = require('./snake');

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(20);
    this.renderGrid();
    this.updateRender();

    $l(window).on('keydown', this.handleKey.bind(this));
    this.interval = window.setInterval(this.step.bind(this), 100);
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

  renderGrid() {
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
    this.board.snake.segments.forEach((segment, idx) => {
      this.addClasses(segment, 'snake', idx);
    });
    this.addClasses(this.board.apple.pos, 'apple');
  }

  addClasses(obj, type, idx) {
    let allUl = $l('ul');
    const row = obj[0];
    const col = obj[1];

    if (!this.board.snake.offBoundaries()) {
      const objCol = allUl.selectEl(col);
      $l(objCol).addClass(`col-of-${type}-${idx}`);

      let ulCol = $l(`ul.col-of-${type}-${idx}`);

      const allLiInCol = ulCol.children();
      const objLi = allLiInCol.selectEl(row);
      $l(objLi).addClass(`${type}`);
    }
  }


  step() {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.renderGrid();
      this.updateRender();
    } else {
      alert("You lose!");
      window.clearInterval(this.interval);
    }
  }
}

module.exports = SnakeView;
