const Board = require('./board');

class SnakeView {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(10);
    this.render();
    window.addEventListener('keydown', this.handleKey.bind(this));
    this.interval = setInterval(this.step.bind(this), 100);
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

  step() {
    if (this.board.snake.segments > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.interval);
    }
  }
}

module.exports = SnakeView;
