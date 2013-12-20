var expect = chai.expect;

describe("Expedition Center", function() {
  describe("constructor", function() {
    it("created without planet", function() {
      var expeditionCenter = new ExpeditionCenter();
      expect(expeditionCenter.planet).to.equal(undefined);
    });

    it("created fine with planet", function() {
      var planet = new Planet("5 5");
      var expeditionCenter = new ExpeditionCenter(planet);
      expect(expeditionCenter.planet).not.equal(undefined);
    });
  });

  describe("functions", function() {
    it("set planet", function() {
      var planet = new Planet("5 5");
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.setPlanet(planet);
      expect(expeditionCenter.planet).not.equal(undefined);
    });

    it("add robot", function() {
      var robot = new Robot();
      var expeditionCenter = new ExpeditionCenter();
      expect(expeditionCenter.getRobotsCount()).to.equal(0);
      expeditionCenter.addRobot(robot);
      expect(expeditionCenter.getRobotsCount()).to.equal(1);
    });

    it("count robots", function() {
      var robot1 = new Robot();
      var robot2 = new Robot();
      var robot3 = new Robot();
      var expeditionCenter = new ExpeditionCenter();
      expect(expeditionCenter.getRobotsCount()).to.equal(0);
      expeditionCenter.addRobot(robot1);
      expect(expeditionCenter.getRobotsCount()).to.equal(1);
      expeditionCenter.addRobot(robot2);
      expect(expeditionCenter.getRobotsCount()).to.equal(2);
      expeditionCenter.addRobot(robot3);
      expect(expeditionCenter.getRobotsCount()).to.equal(3);
    });

    it("add scent", function() {
      var scent = "1:1:N";
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.addScent(scent);
      expect(expeditionCenter.getScent(0)).to.equal(scent);
    });

    it("scent not at position (different x)", function() {
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.addScent("1:1:N");
      expect(expeditionCenter.scentHere("2:1:N")).to.equal(false);
    });

    it("scent not at position (different y)", function() {
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.addScent("1:1:N");
      expect(expeditionCenter.scentHere("1:2:N")).to.equal(false);
    });

    it("scent not at position (different direction)", function() {
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.addScent("1:1:N");
      expect(expeditionCenter.scentHere("1:1:E")).to.equal(false);
    });

    it("scent at position", function() {
      var expeditionCenter = new ExpeditionCenter();
      expeditionCenter.addScent("1:1:N");
      expect(expeditionCenter.scentHere("1:1:N")).to.equal(true);
    });
  });
});