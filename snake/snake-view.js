const Board = require('./board');
const Snake = require('./snake');

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
