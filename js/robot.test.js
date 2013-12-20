var expect = chai.expect;

describe("Robot", function() {
  describe("constructor", function() {
    it("default positon is 0:0:N", function() {
      var robot = new Robot();
      expect(robot.getX()).to.equal(0);
      expect(robot.getY()).to.equal(0);
      expect(robot.getDirection()).to.equal("N");
    });
  });

  describe("set position/direction", function() {
    it("set position", function() {
      var robot = new Robot();
      var success = robot.setPosition(3,6);
      expect(success).to.equal(true);
      expect(robot.getX()).to.equal(3);
      expect(robot.getY()).to.equal(6);
    });

    it("fail to set position if non integers supplied", function() {
      var robot = new Robot();
      var success = robot.setPosition("a",6);
      expect(success).to.equal(false);
      expect(robot.getX()).to.equal(0);
      expect(robot.getY()).to.equal(0);
    });

    it("get position and previous position", function() {
      var robot = new Robot();
      robot.init("3 6 N");
      robot.setInstructions("F");
      robot.performAllInstructions();
      expect(robot.getX()).to.equal(3);
      expect(robot.getY()).to.equal(7);
      expect(robot.getPosition()).to.equal("3:7:N");
      expect(robot.getPreviousX()).to.equal(3);
      expect(robot.getPreviousY()).to.equal(6);
      expect(robot.getPreviousPosition()).to.equal("3:6:N");
    });

    it("set direction to East", function() {
      var robot = new Robot();
      robot.setDirection("E");
      expect(robot.getDirection()).to.equal("E");
    });

    it("set direction to West", function() {
      var robot = new Robot();
      robot.setDirection("W");
      expect(robot.getDirection()).to.equal("W");
    });

    it("set direction to South", function() {
      var robot = new Robot();
      robot.setDirection("S");
      expect(robot.getDirection()).to.equal("S");
    });

    it("set direction to North", function() {
      var robot = new Robot();
      robot.setDirection("W");
      robot.setDirection("N");
      expect(robot.getDirection()).to.equal("N");
    });

    it("fail to set direction with invalid input", function() {
      var robot = new Robot();
      robot.setDirection("X");
      expect(robot.getDirection()).to.equal("N");
    });

    it("set position and direction via input '1 1 E'", function() {
      var robot = new Robot();
      robot.init("1 1 E");
      expect(robot.getX()).to.equal(1);
      expect(robot.getY()).to.equal(1);
      expect(robot.getDirection()).to.equal("E");
    });

    it("set position and direction via input '3 2 N'", function() {
      var robot = new Robot();
      robot.init("3 2 N");
      expect(robot.getX()).to.equal(3);
      expect(robot.getY()).to.equal(2);
      expect(robot.getDirection()).to.equal("N");
    });

    it("set position and direction via input '0 3 W'", function() {
      var robot = new Robot();
      robot.init("0 3 W");
      expect(robot.getX()).to.equal(0);
      expect(robot.getY()).to.equal(3);
      expect(robot.getDirection()).to.equal("W");
    });
  });

  describe("rotate right", function() {
    it("rotate right will be East", function() {
      var robot = new Robot();
      robot.rotateRight();
      expect(robot.getDirection()).to.equal("E");
    });

    it("rotate right twice will be South", function() {
      var robot = new Robot();
      robot.rotateRight();
      robot.rotateRight();
      expect(robot.getDirection()).to.equal("S");
    });

    it("rotate right three times will be West", function() {
      var robot = new Robot();
      robot.rotateRight();
      robot.rotateRight();
      robot.rotateRight();
      expect(robot.getDirection()).to.equal("W");
    });

   it("rotate right four times will be North", function() {
      var robot = new Robot();
      robot.rotateRight();
      robot.rotateRight();
      robot.rotateRight();
      robot.rotateRight();
      expect(robot.getDirection()).to.equal("N");
    });
  });

  describe("rotate left", function() {
    it("rotate left will be West", function() {
      var robot = new Robot();
      robot.rotateLeft();
      expect(robot.getDirection()).to.equal("W");
    });

    it("rotate twice left will be South", function() {
      var robot = new Robot();
      robot.rotateLeft();
      robot.rotateLeft();
      expect(robot.getDirection()).to.equal("S");
    });

    it("rotate three times left will be East", function() {
      var robot = new Robot();
      robot.rotateLeft();
      robot.rotateLeft();
      robot.rotateLeft();
      expect(robot.getDirection()).to.equal("E");
    });

    it("rotate four times left will be North", function() {
      var robot = new Robot();
      robot.rotateLeft();
      robot.rotateLeft();
      robot.rotateLeft();
      robot.rotateLeft();
      expect(robot.getDirection()).to.equal("N");
    });
  });

  describe("move", function() {
    it("move forward", function() {
      var robot = new Robot();
      robot.forward();
      expect(robot.getX()).to.equal(0);
      expect(robot.getY()).to.equal(1);
    });

    it("prev x and y are being set", function() {
      var robot = new Robot();
      robot.init("2 3 E");
      robot.forward();
      robot.forward();
      expect(robot.getPreviousX()).to.equal(3);

      robot.rotateRight();
      robot.forward();
      robot.forward();
      expect(robot.getPreviousY()).to.equal(2);
    });
  });

  describe("functions", function() {
    it("set 0 instructions", function() {
      var robot = new Robot();
      var success = robot.setInstructions("");
      expect(success).to.equal(false);
      expect(robot.getInstructionsCount()).to.equal(0);
    });

    it("set 5 instructions - fail", function() {
      var robot = new Robot();
      var success = robot.setInstructions("RRXFL");
      expect(success).to.equal(false);
      expect(robot.getInstructionsCount()).to.equal(0);
    });

    it("set 5 instructions", function() {
      var robot = new Robot();
      var success = robot.setInstructions("RRFFL");
      expect(success).to.equal(true);
      expect(robot.getInstructionsCount()).to.equal(5);
    });

    it("get instruction", function() {
      var robot = new Robot();
      robot.setInstructions("RRFFL");
      expect(robot.getInstruction(2)).to.equal("F");
    });

    it("output is being outputted", function() {
      var robot = new Robot();
      expect(robot.output()).to.equal("0 0 N");
    });

    it("output is being outputted with lost status", function() {
      var robot = new Robot();
      robot.status = "Lost"
      expect(robot.output()).to.equal("0 0 N LOST");
    });

    it("moving forward will drop the robot off the planet", function() {
      var planet = new Planet();
      planet.setSizeByString("5 5");
      var expeditionCenter = new ExpeditionCenter(planet);
      var robot = new Robot();
      robot.init("3 3 N");
      robot.setInstructions("FFFFFFFFFFFFF");
      expeditionCenter.addRobot(robot);
      robot.performAllInstructions();

      expect(robot.output()).to.equal("3 5 N LOST");
    });
  });
});