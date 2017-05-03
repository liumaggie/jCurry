const SnakeView = require('./snake-view');

$l(() => {
  const root = $l('.snake-game');
  new SnakeView(root);
});
