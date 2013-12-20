ExpeditionCenter = function(planet) {
  this.robots = [];
  this.scents = [];

  if (planet != undefined)
    this.setPlanet(planet);
};

ExpeditionCenter.prototype = {
  /* -- set planet ------ */
  setPlanet: function(planet) {
    this.planet = planet;
  },

  /* -- add a robot ------ */
  addRobot: function(robot) {
    robot.expeditionCenter = this;
    this.robots.push(robot);
  },

  /* -- amount of robots ------ */
  getRobotsCount: function() {
    return this.robots.length;
  },

  /* -- get robot at position ------ */
  getRobot: function(pos) {
    return this.robots[pos];
  },

  /* -- add a lost robot scent ------ */
  addScent: function(position) {
    this.scents.push(position);
  },

  /* -- get scent at potions ------ */
  getScent: function(pos) {
    return this.scents[pos];
  },

  /* -- check if a scent is at a position ------ */
  scentHere: function(position) {
    if (this.scents.indexOf(position) != -1)
      return true;

    return false;
  }
}