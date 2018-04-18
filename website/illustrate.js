var cameraPos = [0, 0];
function drawRect(x, y, width, height, style, rotation){
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(x - cameraPos[0], y - cameraPos[1]);
  ctx.rotate(rotation);
  ctx.fillStyle= style;
  ctx.fillRect(width / -2, height / -2, width, height);
  ctx.restore();
}

function drawRectOutline(x, y, width, height, style, thickness, rotation){
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(x - cameraPos[0], y - cameraPos[1]);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.strokeStyle = style;
  ctx.lineWidth = thickness;
  ctx.rect(width / -2, height / -2, width, height);
  ctx.stroke();
  ctx.restore();
}

function drawElipse(x, y, radius, style, startAngle, endAngle) {
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(x - cameraPos[0], y - cameraPos[1]);
  ctx.fillStyle = style;
  ctx.beginPath();
  ctx.arc(0, 0, radius, startAngle, endAngle);
  ctx.fill();
  ctx.restore();
}

function drawElipseOutline(x, y, radius, style, width,startAngle, endAngle){
  let ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(x - cameraPos[0], y - cameraPos[1]);
  ctx.strokeStyle = style;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(0, 0, radius, startAngle, endAngle);
  ctx.stroke();
  ctx.restore();
}

function drawImage(x, y, image, width, height, rotation){
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(x - cameraPos[0], y - cameraPos[1]);
    ctx.rotate(rotation);
    ctx.drawImage(image, width/-2, height/-2, width, height);
    ctx.restore();
}

function clearDrawing(){
  let ctx= canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
