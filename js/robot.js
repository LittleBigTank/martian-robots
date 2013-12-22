Robot = function() {
  this.status = "Alive";
  this.instructions = [];
  this.validInstructions = ["L", "R", "F"];
  this.directions = ["N", "E", "S", "W"];
  this.dir = 0;
  this.prevX = 0;
  this.prevY = 0;
  this.x = 0;
  this.y = 0;
};

Robot.prototype = {
  /* -- initalize robot ------ */
  init: function(input) {
    /* -- split input into parts ------ */
    var parts = input.split(" ");
    if (parts.length != 3) {
      parts = input.split(String.fromCharCode(160));
      if (parts.length != 3)
        return false;
    }

    var success = this.setPosition(parts[0], parts[1]);
    if (!success)
      return false;

    return this.setDirection(parts[2]);
  },

  /* -- store instructions for robot ------ */
  setInstructions: function(input) {
    if (input.length == 0)
      return false;

    var instructions = input.split("");
    for (var i=0; i<instructions.length; i++) {
      if (this.validInstructions.indexOf(instructions[i]) == -1)
        return false;
    }
    this.instructions = instructions;
    return true;
  },

  /* -- get instructions length ------ */
  getInstructionsCount: function() {
    return this.instructions.length;
  },

  /* -- get instruction at position ------ */
  getInstruction: function(pos) {
    return this.instructions[pos];
  },

  /* -- set position of robot ------ */
  setPosition: function(x, y) {
    /* -- check values are integers ------ */
    var intRegex = /^\d+$/;
    if(!intRegex.test(x) || !intRegex.test(y))
      return false;

    this.x = x;
    this.y = y;
    return true;
  },

  /* -- return previous x position ------ */
  getPreviousX: function() {
    return Number(this.prevX);
  },

  /* -- return x position ------ */
  getX: function() {
    return Number(this.x);
  },

  /* -- return previous y position ------ */
  getPreviousY: function() {
    return Number(this.prevY);
  },

  /* -- return y position ------ */
  getY: function() {
    return Number(this.y);
  },

  /* -- set direction robot is pointing ------ */
  setDirection: function(d) {
    var pos = this.directions.indexOf(d);

    /* -- check direction is valid ------ */
    if (pos == -1)
      return false;

    this.dir = pos;
    return true;
  },

  /* -- output robots direction ------ */
  getDirection: function() {
    return this.directions[this.dir];
  },

  /* -- set robots status ------ */
  setStatus: function(status) {
    this.status = status;
  },

  /* -- output robots status ------ */
  getStatus: function() {
    return this.status;
  },

  /* -- perform all store instructions ------ */
  performAllInstructions: function() {
    this.checkOnPlanet();

    for(var i=0; i<this.getInstructionsCount(); i++) {
      /* -- check robot is not lost ------ */
      if (this.getStatus() == "Alive")
        this.performInstruction(this.getInstruction(i));
    }
  },

  /* -- perform a single instruction ------ */
  performInstruction: function(instruction) {
    /* -- call function for the instruction passed ------ */
    switch(instruction) {
      case "L":
        this.rotateLeft();
        break;
      case "R":
        this.rotateRight();
        break;
      case "F":
        this.forward();
        break;
    }    
  },

  /* -- rotate robot left ------ */
  rotateLeft: function() {
    var d = this.dir -1;
    if (d < 0)
      d = this.directions.length -1;
    this.dir = d;
  },

  /* -- rotate robot right ------ */
  rotateRight: function() {
    var d = this.dir +1;
    if (d >= this.directions.length) {
      d = 0;
    }
    this.dir = d;
  },

  /* -- move robot forward ------ */
  forward: function() {
    var scent = false;

    /* -- check for previous robot scents ------ */
    if (this.expeditionCenter != undefined && this.expeditionCenter.scentHere(this.getPosition()))
      scent = true;

    /* -- if no scent left, then move ------ */
    if (!scent) {
      this.prevX = this.getX();
      this.prevY = this.getY();

      switch(this.getDirection()) {
        case "N":
          this.y++;
          break;
        case "E":
          this.x++;
          break;
        case "S":
          this.y--;
          break;
        case "W":
          this.x--;
          break;
      }

      this.checkOnPlanet();
    }
  },

  /* -- check robot is still on the planet ------ */
  checkOnPlanet: function() {
    if (this.expeditionCenter != undefined) {
      /* -- check robot isn't lost ------ */
      if (!this.expeditionCenter.planet.onPlanet(this.getX(), this.getY())) {
        this.setStatus("Lost");
        this.expeditionCenter.addScent(this.getPreviousPosition());
      }
    }
  },

  /* -- output robot position/status ------ */
  output: function() {
    if (this.getStatus() == "Lost")
      return this.getPreviousX() +" "+ this.getPreviousY() +" "+ this.getDirection() + " LOST";

    return this.getX() +" "+ this.getY() +" "+ this.getDirection();
  },

  /* -- output robot position ------ */
  getPosition: function() {
    return this.getX() +":"+ this.getY() +":"+ this.getDirection();
  },

  /* -- output robots previous position ------ */
  getPreviousPosition: function() {
    return this.getPreviousX() +":"+ this.getPreviousY() +":"+ this.getDirection();
  }
}