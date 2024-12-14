// Paddle properties and behavior
if (!window.paddle) {
    window.paddle = {
        x: canvas.width / 2 - 50,
        y: canvas.height - 40,
        width: 100,
        height: 15,
        dx: 15,
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
ctx.closePath(); `,
  
      controls: `// Keyboard controls setup
if (!window.keys) {
    window.keys = {};

    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
}