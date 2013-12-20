var expeditionCenter;

/* -- submit instructions ------ */
function submitInstructions() {
  $("#output").html("");

  var instructions = $("#instructions").val().split("\n");
  var output = createObjects(instructions);
  if (output != true)
    $("#output").html(output);
  else
    $("#output").html(performInstructions());

  $("#output").show();
}

/* -- create all the objects for expedition ------ */
function createObjects(instructions) {
  /* -- first line is the planet ------ */
  var planet = new Planet();
  var success = planet.setSizeByString(instructions[0]);
  if (!success)
    return "<p>Planet input values are invalid</p>";

  expeditionCenter = new ExpeditionCenter(planet);
  var nextLineCreate = true;
  var robot;

  /* -- loop through lines to create robots ------ */
  for(var i=1; i < instructions.length; i++) {
    /* -- clear line, means next line will create a robot ------ */
    if (instructions[i].length == 0) {
      nextLineCreate = true;

    /* -- create robot ------ */
    } else if (nextLineCreate) {
      nextLineCreate = false;
      robot = new Robot();
      success = robot.init(instructions[i]);
      if (success)
        expeditionCenter.addRobot(robot);

    /* -- add instructions to the robot ------ */
    } else if (robot != undefined) {
      success = robot.setInstructions(instructions[i]);
      robot = undefined;
    }

    if (!success)
      return "<p>Robot "+ Math.ceil((i-1)/3) +"s inputs are invalid</p>";
  }

  return true;
}

/* -- perform robots instructions ------ */
function performInstructions() {
  /* -- loop through robots ------ */
  var output = "";
  for(var i=0; i < expeditionCenter.getRobotsCount(); i++) {
    expeditionCenter.getRobot(i).performAllInstructions();
    output += "<p>"+ expeditionCenter.getRobot(i).output() +"</p>"
  }
  return output;
}