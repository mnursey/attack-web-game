var mouseCanvasPos = [0, 0];
var inputUp = false;
var inputDown = false;
var inputLeft = false;
var inputRight = false;
var inputAttack = false;
var inputAccept = false;
var mouseMoved = false;
function mouseInput(event)
{
  let rect = canvas.getBoundingClientRect();
  mouseCanvasPos = [event.clientX - rect.left + cameraPos[0], event.clientY - rect.top + cameraPos[1]];
  mouseMoved = true;
}

function inputOn(event)
{
  if(event.keyCode == 65 || event.keyCode == 37) {
	   inputLeft = true;
  }
  if(event.keyCode == 68 || event.keyCode == 39) {
	   inputRight = true;
  }

  if(event.keyCode == 87 || event.keyCode == 38)
  {
	  inputUp = true;
  }

  if(event.keyCode == 40 || event.keyCode == 83)
  {
	  inputDown = true;
  }

  if(event.keyCode == 32)
  {
	  inputAttack = true;
  }

  if(event.keyCode == 13)
  {
	  inputAccept = true;
  }
}

function inputOff(event)
{
  if(event.keyCode == 65 || event.keyCode == 37) {
	   inputLeft = false;
  }
  if(event.keyCode == 68 || event.keyCode == 39) {
	   inputRight = false;
  }

  if(event.keyCode == 87 || event.keyCode == 38)
  {
	  inputUp = false;
  }

  if(event.keyCode == 40 || event.keyCode == 83)
  {
	  inputDown = false;
  }

  if(event.keyCode == 32)
  {
	  inputAttack = false;
  }

  if(event.keyCode == 13)
  {
	  inputAccept = false;
  }

  //console.log("Key Up:" + event.keyCode);
}

function mouseDown(event)
{
  inputAttack = true;
};

function mouseUp(event)
{
  inputAttack = false;
};
