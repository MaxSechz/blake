(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    var currentView = this;
    this.$el = $el;
    this.$el.on("gameover", this.stopGame.bind(this));
    this.board = new Snakes.Board($("div.score"));
    this.$el.append(this.board.grid);
    this.$header = $("header");
    $(document).on("keydown", function (event) {
      if (!currentView.keyEventLive) {
        currentView.handleKeyEvent(event);
      }
    });
    this.gameStep();
    $("header").on("click", this.startGame.bind(this));
  };

  View.prototype.startGame = function () {
    this.$header.off("click");
    this.$header.css("opacity", 0);
    this.timer = setInterval((function () {
      this.keyEventLive = false;
      this.gameStep();
    }).bind(this), 100);
  };

  View.prototype.stopGame = function () {
    window.clearInterval(this.timer);
    this.$header.find("span").text("Awwwww...Blake wanted more oranges than that. Click to restart!");
    this.$header.on("click");
    this.$header.css("opacity", 0.5);
    this.board = new Snakes.Board($("div.score"));
    this.$el.find("ul").remove();
    this.$el.append(this.board.grid);
    this.gameStep();
    this.$header.on("click", this.startGame.bind(this));
  };

  View.prototype.gameStep = function () {
    this.board.pageRender();
    this.board.isEatApple();
    this.board.snake.move();
  };

  View.prototype.handleKeyEvent = function (event) {
    var code = event.keyCode;
    var currDir = this.board.snake.dir;
    var xOpp = Math.abs(Snakes.Snake.DIRS[code][0]) === Math.abs(Snakes.Snake.DIRS[currDir][0]);
    var yOpp = Math.abs(Snakes.Snake.DIRS[code][1]) === Math.abs(Snakes.Snake.DIRS[currDir][1]);
    if (!(xOpp && yOpp)) {
      this.board.snake.turn(event.keyCode);
      this.keyEventLive = true;
    }
  };

})();
