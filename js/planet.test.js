var expect = chai.expect;

describe("Planet", function() {
  describe("constructor", function() {
    it("no input uses default values", function() {
      var planet = new Planet();
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });

    it("input must be integer values", function() {
      var planet = new Planet();
      planet.setSizeByString("test words");
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });

    it("part integer values are not allowed", function() {
      var planet = new Planet();
      planet.setSizeByString("30a 5b");
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });

    it("min size is 1x1 - fail", function() {
      var planet = new Planet();
      planet.setSizeByString("0 0");
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });
    it("min size is 1x1 - success", function() {
      var planet = new Planet();
      planet.setSizeByString("1 1");
      expect(planet.getWidth()).to.equal(1);
      expect(planet.getHeight()).to.equal(1);
    });

    it("max size is 50x50 - fail", function() {
      var planet = new Planet();
      planet.setSizeByString("60 60");
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });
    it("max size is 50x50 - success", function() {
      var planet = new Planet();
      planet.setSizeByString("50 50");
      expect(planet.getWidth()).to.equal(50);
      expect(planet.getHeight()).to.equal(50);
    });
  });

  describe("functions", function() {
    it("set planet size - fail", function() {
      var planet = new Planet();
      var success = planet.setSize(60, 20);
      expect(success).to.equal(false);
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });

    it("set planet size", function() {
      var planet = new Planet();
      var success = planet.setSize(30, 20);
      expect(success).to.equal(true);
      expect(planet.getWidth()).to.equal(30);
      expect(planet.getHeight()).to.equal(20);
    });

    it("set planet size by string - fail", function() {
      var planet = new Planet();
      var success = planet.setSizeByString("60 20");
      expect(success).to.equal(false);
      expect(planet.getWidth()).to.equal(10);
      expect(planet.getHeight()).to.equal(10);
    });

    it("set planet size by string", function() {
      var planet = new Planet();
      var success = planet.setSizeByString("30 20");
      expect(success).to.equal(true);
      expect(planet.getWidth()).to.equal(30);
      expect(planet.getHeight()).to.equal(20);
    });

    it("co-ord on planet", function() {
      var planet = new Planet("10 10");
      expect(planet.onPlanet(5, 5)).to.equal(true);
    });

    it("co-ord off planet", function() {
      var planet = new Planet("10 10");
      expect(planet.onPlanet(10, 10)).to.equal(true);
    });
  });
});