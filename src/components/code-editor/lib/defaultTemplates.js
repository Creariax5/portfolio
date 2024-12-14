export const OBJECT_TEMPLATE = `// New object properties and behavior
if (!window.objectName) {
  window.objectName = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    color: '#00ff00'
  };
}

const obj = window.objectName;

// Draw object
ctx.beginPath();
ctx.rect(obj.x, obj.y, obj.width, obj.height);
ctx.fillStyle = obj.color;
ctx.fill();
ctx.closePath();`;

export const DEFAULT_OBJECTS = {
  ball: `// Ball properties and behavior
if (!window.ball) {
  window.ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 2,
    dy: -2,
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
ctx.closePath();`,

  paddle: `// Paddle properties and behavior
if (!window.paddle) {
  window.paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    dx: 5,
    color: '#0095DD'
  };
}

const paddle = window.paddle;

// Move paddle with arrow keys
if (window.keys) {
  if (keys.ArrowRight && paddle.x < canvas.width - paddle.width) {
    paddle.x += paddle.dx;
  }
  if (keys.ArrowLeft && paddle.x > 0) {
    paddle.x -= paddle.dx;
  }
}

// Draw paddle
ctx.beginPath();
ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
ctx.fillStyle = paddle.color;
ctx.fill();
ctx.closePath();`,

  controls: `// Keyboard controls setup
if (!window.keys) {
  window.keys = {};
  
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });
}`
};
