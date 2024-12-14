// New object properties and behavior
if (!window.caca) {
  window.caca = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    color: '#00ff00'
  };
}

const obj = window.caca;

// Draw object
ctx.beginPath();
ctx.rect(obj.x, obj.y, obj.width, obj.height);
ctx.fillStyle = obj.color;
ctx.fill();
ctx.closePath();