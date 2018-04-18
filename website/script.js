var canvas;
var move = new Image();
var attack = new Image();
var unitPosition = [0,0];
var unitRot = 0;
var prevTime = new Date();
var attacking = false;
var attackingTimer = 0;
var attackingTime = 200;
var sheildColliders = [[5, -40], [25, -40], [-15, -40]];
var otherPlayers = [];
var socket

function setup(){
  canvas = document.getElementById('window');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  move.src = '0.png';
  attack.src = '1.png';
  canvas.addEventListener('mousemove', mouseInput);
  document.addEventListener('keydown', inputOn);
	document.addEventListener('keyup', inputOff);
  document.addEventListener('mouseup', mouseUp);
  document.addEventListener('mousedown', mouseDown);
  window.setInterval(updateGame, 5);
  window.setInterval(sendToServer, 5);

  window.onbeforeunload = close;

  cameraPos = [ 0 - canvas.width / 2, 0 - canvas.height / 2];

  socket = new WebSocket('ws://192.168.1.92');

  socket.onopen = function(){
    updateGame();
    sendToServer();
  };

  socket.onerror = function(error){
    console.log('WebSocket Error ' + error);
  };

  socket.onmessage = function (e) {
    console.log('Server: ' + e.data);
    handleServerMessage(e.data);
  };
}

function updateGame(){
  clearDrawing();
  let currentTime = new Date();
  let mili = currentTime.getMilliseconds();
  let sec = currentTime.getSeconds();
  let min = currentTime.getMinutes();
  let hour = currentTime.getHours();
  let xOffset = canvas.width / 2;
  let yOffset = canvas.height / 2;

  //Draw Background
  drawBackground();
  //Demo Unit
  let delta = (currentTime.getTime() - prevTime.getTime()) / 1000;
  let movementSpeed = 900;
  let tempUnitPos = [unitPosition[0], unitPosition[1]];

  if(attacking)
  {
    if(attackingTimer < currentTime.getTime())
    {
      attacking = false;
    }
    if(attacking)
      movementSpeed = 150;
  }

  if(inputAttack)
  {
    if(!attacking){
      attacking = true;
      attackingTimer = currentTime.getTime() + attackingTime;
    }
  }

  if(inputDown)
  {
    unitPosition[1] += movementSpeed * delta;
  }

  if(inputUp)
  {
    unitPosition[1] += -movementSpeed * delta;
  }

  if(inputLeft)
  {
    unitPosition[0] += -movementSpeed * delta;
  }

  if(inputRight)
  {
    unitPosition[0] += movementSpeed * delta;
  }

  if(distance(0,0, unitPosition[0], unitPosition[1]) > 1000 / 2)
  {
    unitPosition = tempUnitPos;
  }
  //Set camera position
  cameraPos = [unitPosition[0] - canvas.width / 2, unitPosition[1] - canvas.height / 2];
  prevTime = currentTime;
  if(mouseMoved){
    mouseMoved = false;
    unitRot = lookAt(mouseCanvasPos[0], mouseCanvasPos[1], unitPosition[0], unitPosition[1]) - Math.PI / 2;
  }

  for(let s = 0; s < sheildColliders.length; s++){
    let testRotationObjectPos = pointRotation(unitPosition[0], unitPosition[1], unitPosition[0] + sheildColliders[s][0], unitPosition[1] + sheildColliders[s][1], unitRot);
    drawElipse(testRotationObjectPos[0], testRotationObjectPos[1], 12, 'green', 0, Math.PI * 2);
  }

  /* Draw other players */
  for(i in otherPlayers){
    let player = otherPlayers[i];
    if(!player[2]){
      drawImage(player[0][0], player[0][1], move, 300, 300, player[1]);
    }
    else{
      drawImage(player[0][0], player[0][1], attack, 300, 300, player[1]);
    }
  }

  if(attacking){
    let testRotationObjectPosSpear = pointRotation(unitPosition[0], unitPosition[1], unitPosition[0] + 45, unitPosition[1] - 130, unitRot);
    drawElipse(testRotationObjectPosSpear[0], testRotationObjectPosSpear[1], 15, 'red', 0, Math.PI * 2);
  }else{
    let testRotationObjectPosSpear = pointRotation(unitPosition[0], unitPosition[1], unitPosition[0] + 45, unitPosition[1] - 45, unitRot);
    drawElipse(testRotationObjectPosSpear[0], testRotationObjectPosSpear[1], 15, 'blue', 0, Math.PI * 2);
  }
  drawElipse(unitPosition[0], unitPosition[1], 30, 'orange', 0, Math.PI * 2);


  if(!attacking){
    drawImage(unitPosition[0], unitPosition[1], move, 300, 300, unitRot);
  }
  else{
    drawImage(unitPosition[0], unitPosition[1], attack, 300, 300, unitRot);
  }

}

function drawBackground(){
  drawElipse(0, 0, 1050 / 2, 'orange', 0, Math.PI * 2);
  drawElipse(0, 0, 1000 / 2, 'tomato', 0, Math.PI * 2);
/*  drawElipse(150, 150, 200, 'LightGoldenRodYellow', 0, Math.PI * 2);
  drawElipse(-150, 150, 200, 'LightGoldenRodYellow', 0, Math.PI * 2);
  drawElipse(-150, -150, 200, 'LightGoldenRodYellow', 0, Math.PI * 2);
  drawElipse(150, -150, 200, 'LightGoldenRodYellow', 0, Math.PI * 2);*/
}

function sendToServer(){
  socket.send(JSON.stringify([unitPosition,unitRot, attacking]));
}

function handleServerMessage(msg){
  let gameState = JSON.parse(msg);
  otherPlayers = [];
  for(let i = 0; i < gameState.length; i++){
    let player = gameState[i];
    if(player.length > 0){
      console.log(player);
      otherPlayers.push(player);
    }
  }
}


function pointRotation(x, y, a, b, theta){
  let tempX = a - x;
  let tempY = b - y;

  let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
  let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

  return [rotatedX + x, rotatedY + y];
}

function lookAt(x, y, a, b){
  return Math.atan2(b - y, a - x);
}

function distance(x, y, a, b){
    return Math.sqrt(Math.pow(x-a, 2) + Math.pow(y-b, 2));
}

function close(){
  socket.close();
   return null;
}
