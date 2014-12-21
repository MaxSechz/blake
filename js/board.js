(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Board = Snakes.Board = function () {
    this.snake = new Snakes.Snake();
    this.apples = [];
    this.addApple();
    this.setupGrid();
  };

  Board.DIM_X = 20;
  Board.DIM_Y = 20;

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
        if (this.snake.isInSegments(newCoord)) {
          $($(this.grid[i]).children()[j]).addClass('snake');
            console.log($($(this.grid[i]).children()[j]));
        } else if (apple.y === j && apple.x === i) {
          $($(this.grid[i]).children()[j]).addClass('apple');
        } else {
          $($(this.grid[i]).children()[j]).removeClass();
        }
      }
    }
  }

  Board.prototype.render = function () {
   var htmlString = '<pre>';
   for (var i = 0; i < Board.DIM_X; i++) {
     for (var j = 0; j < Board.DIM_Y; j++) {
      var newCoord = new Snakes.Coord(i, j);
      var apple = this.apples[0];
      if (this.snake.isInSegments(newCoord)) {
        htmlString += 'S';
      } else if (apple.y === j && apple.x === i) {
        htmlString += 'A';
      } else {
        htmlString += '.';
      }
     }
     htmlString += '\n';
   }

   return htmlString + '</pre>';
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
   }
  };

})();
