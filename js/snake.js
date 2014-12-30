(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Snake = Snakes.Snake = function () {
    this.nextDir = 37;
    this.dir = 37;
    this.segments = [];
    this.isGrowing = false;
    this.buildSnake();
  };

  Snake.DIRS = {
    38: [ -1, 0], // Up
    39: [ 0, 1], // right
    40: [ 1, 0], // down
    37: [0, -1] // left
  };

  Snake.ENGDIRS = {
    38: 'up',
    39: 'right',
    40: 'down',
    37: 'left'
  }

  Snake.LENGTH = 3;

  Snake.prototype.move = function () {
    var dCoord = Snake.DIRS[this.dir];
    var newCoord = new Snakes.Coord(dCoord[0], dCoord[1]);
    var head = this.segments[0];
    var newHead = head.plus(newCoord);
    if (this.isInSegments(newHead)) {
      alert("You SUCK!");
      window.location.reload();
    }

    if (newHead.x >= Snakes.Board.DIM_X || newHead.y >= Snakes.Board.DIM_Y) {
      newHead = new Snakes.Coord(newHead.x % Snakes.Board.DIM_X, newHead.y % Snakes.Board.DIM_Y);
    } else if (newHead.x < 0) {
      newHead.x += Snakes.Board.DIM_X;
    } else if (newHead.y < 0) {
      newHead.y += Snakes.Board.DIM_Y;
    }

    this.segments.unshift(newHead);
    if (!this.isGrowing) {
      this.segments.pop();
    } else {
      this.isGrowing = false;
    }
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  Snake.prototype.buildSnake = function () {
    for (var i = 0; i < Snake.LENGTH; i++) {
      var segX = Math.floor(Snakes.Board.DIM_X / 2);
      var segY = Math.floor(Snakes.Board.DIM_Y / 2) + i;
      var newSegment = new Snakes.Coord(segX, segY);
      this.segments.push(newSegment);
    }
  };

  Snake.prototype.isLastSegment = function(coord) {
    var segX = this.segments[this.segments.length-1].x;
    var segY = this.segments[this.segments.length-1].y;
    var coordX = coord.x;
    var coordY = coord.y;
    if (segX === coordX && segY === coordY) {
      return true;
    }
  }

  Snake.prototype.isHeadSegment = function(coord) {
    var segX = this.segments[0].x;
    var segY = this.segments[0].y;
    var coordX = coord.x;
    var coordY = coord.y;
    if (segX === coordX && segY === coordY) {
      return true;
    }
  }

  Snake.prototype.isInSegments = function (coord) {
    for (var i = 0; i < this.segments.length; i++) {
      var segX = this.segments[i].x;
      var segY = this.segments[i].y;
      var coordX = coord.x;
      var coordY = coord.y;
      if (segX === coordX && segY === coordY) {
        return true;
      }
    }

    return false;
  };

})();
