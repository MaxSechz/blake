(function () {
  if (typeof Snakes === 'undefined') {
    window.Snakes = {};
  }

  var Coord = Snakes.Coord = function(x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function (otherCoord) {
    var newX = this.x + otherCoord.x;
    var newY = this.y + otherCoord.y;
    return new Snakes.Coord(newX, newY);
  };
})();
