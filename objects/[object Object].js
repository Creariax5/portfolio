// Ball properties and behaviors
if (!window.ball) {
  window.ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 6,
    dy: -4,
    color: '#ff0000'
  };
}

const ball = window.ball;

// Bounce off walls
if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
  ball.dx = -ball.dx;
}
if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
  ball.dy = -ball.dy;
}
// Interact with paddle
if (window.paddle) {
  if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height && 
      ball.x > paddle.x && 
      ball.x < paddle.x + paddle.width) {
    ball.dy = -Math.abs(ball.dy);
  }
}

ball.x += ball.dx;
ball.y += ball.dy;

// Draw ball
ctx.beginPath();
ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
ctx.fillStyle = ball.color;
ctx.fill();
ctx.closePath()