(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Board = Snakes.Board = function ($score) {
    this.snake = new Snakes.Snake();
    this.apples = [];
    this.addApple();
    this.setupGrid();
    this.score = 0;
    this.$score = $score;
    this.$score.html(this.score);
  };

  Board.DIM_X = 30;
  Board.DIM_Y = 30;

  Board.prototype.setupGrid = function() {
    var newGrid
    for (var i = 0; i < Board.DIM_Y; i++) {
      var newPiece = $('<ul>')
      if (newGrid) {
        newGrid = newGrid.add(newPiece);
      } else {
        newGrid = newPiece;
      }
      for (var j = 0; j < Board.DIM_X; j++) {
        newPiece.append($('<li>'));
      }
    }
    this.grid = newGrid;
  }
  Board.prototype.pageRender = function () {
    for (var i = 0; i < Board.DIM_X; i++) {
      for (var j = 0; j < Board.DIM_Y; j++) {
        var newCoord = new Snakes.Coord(i, j);
        var apple = this.apples[0];
        var gridPoint = $($(this.grid[i]).children()[j]);
        var currDirr = Snakes.Snake.ENGDIRS[this.snake.dir];
        if (this.snake.isInSegments(newCoord)) {
          if (this.snake.isHeadSegment(newCoord)){
            gridPoint.addClass('snake').addClass(currDirr);
          }
        } else if (apple.y === j && apple.x === i) {
          gridPoint.addClass('apple');
        } else {
          gridPoint.removeClass();
        }
      }
    }
  };

  Board.prototype.addApple =  function () {
   if (!this.apples[0]) {
     var x = Math.floor(Math.random() * (Board.DIM_X -1));
     var y = Math.floor(Math.random() * (Board.DIM_Y -1));
     var newApple = new Snakes.Coord(x, y);
     this.apples.push(newApple);
   }
  };

  Board.prototype.isEatApple = function () {
   if (this.snake.isInSegments(this.apples[0])) {
     this.snake.isGrowing = true;
     this.apples.pop();
     this.addApple();
     this.score += 1;
     this.$score.html(this.score)
   }
  };

})();
