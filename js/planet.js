Planet = function() {
  this.minSize = 1;
  this.maxSize = 50;
  this.width = 10;
  this.height = 10;
};

Planet.prototype = {
  /* -- set size of planet via string i.e. '3 5' ------ */
  setSizeByString: function(input) {
    /* -- split input into parts ------ */
    var parts = input.split(" ");
    if (parts.length != 2) {
      parts = input.split(String.fromCharCode(160));
      if (parts.length != 2)
        return false;
    }

    /* -- check values are integers ------ */
    var intRegex = /^\d+$/;
    if(!intRegex.test(parts[0]) || !intRegex.test(parts[1]))
      return false;

    return this.setSize(parts[0], parts[1]);
  },

  /* -- set size of planet ------ */
  setSize: function(w, h) {
    /* -- check values are large enough ------ */
    if (w < this.minSize || h < this.minSize)
      return false;

    /* -- check values aren't too large ------ */
    if (w > this.maxSize || h > this.maxSize)
      return false;

    this.width = w;
    this.height = h;
    return true;
  },

  /* -- return width ------ */
  getWidth: function() {
    return Number(this.width);
  },

  /* -- return height ------ */
  getHeight: function() {
    return Number(this.height);
  },

  /* -- check position is on the planet ------ */
  onPlanet: function(x, y) {
    if (x < 0 || x > this.getWidth() || y < 0 || y > this.getHeight())
      return false;

    return true;
  }

/*
  draw: function(div) {
    $(div).html("");
    $(div).css("width", this.width *22);

    for(var i = 0; i < this.getHeight(); i++) {
      for(var j = 0; j < this.getWidth(); j++) {
        var css = "planetBlock block"+ i+j;
        if (j == 0) css = "first planetBlock block"+i+j;
        $(div).append("<div class=\"" + css + "\">&nbsp;</div>");
      }
    }
  }
*/
}