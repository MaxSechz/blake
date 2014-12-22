(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.el = $el;
    this.board = new Snakes.Board();
    this.el.html(this.board.grid);
    var currentView = this;
    $(document).on("keydown", function (event) {
      if (!currentView.keyEventLive || currentView.board.snake.dir === event.keyCode) {
        currentView.keyEventLive = true;
        currentView.handleKeyEvent(event);
        currentView.gameStep();
      }
    });

    setInterval((function () {

      this.gameStep();
    }).bind(this), 100);
  };

  View.prototype.gameStep = function () {
    this.board.pageRender();
    this.board.snake.move();
    this.board.isEatApple();
    this.keyEventLive = false;
  }

  View.prototype.step = function () {
    var htmlString = this.board.render();
    this.el.html(htmlString);
    this.board.snake.move();
    this.board.isEatApple();
  };

  View.prototype.handleKeyEvent = function (event) {
    var code = event.keyCode;
    var currDir = this.board.snake.dir;
    var xOpp = Math.abs(Snakes.Snake.DIRS[code][0]) === Math.abs(Snakes.Snake.DIRS[currDir][0])
    var yOpp = Math.abs(Snakes.Snake.DIRS[code][1]) === Math.abs(Snakes.Snake.DIRS[currDir][1])
    if (!(xOpp && yOpp)) {
      this.board.snake.turn(event.keyCode);
    }
  };

})();
