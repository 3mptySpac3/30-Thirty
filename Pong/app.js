const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");
const menu = document.getElementById("menu");


// Game variables
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let paddle1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let paddle2 = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };
let player1Score = 0;
let player2Score = 0;
let gameMode = "human"; // "human" or "ai"

const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddleHeight > canvas.height) paddle.y = canvas.height - paddleHeight;
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ballRadius < paddle1.x + paddleWidth && ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
        ball.dx *= -1;
    }

    if (ball.x + ballRadius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) {
        ball.dx *= -1;
    }

    if (ball.x - ballRadius < 0) {
        player2Score++;
        resetBall();
    }

    if (ball.x + ballRadius > canvas.width) {
        player1Score++;
        resetBall();
    }

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    if (player1Score === 11 || player2Score === 11) {
        alert(`Player ${player1Score === 11 ? 1 : 2} wins!`);
        resetGame();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    resetBall();
}

function update() {
    movePaddle(paddle1);
    movePaddle(paddle2);
    moveBall();

    if (gameMode === "ai") {
        moveAI();
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight, "white");
    drawRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight, "white");
    drawCircle(ball.x, ball.y, ballRadius, "white");
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", event => {
  switch (event.key) {
      case "ArrowUp":
          paddle2.dy = -5;
          break;
      case "ArrowDown":
          paddle2.dy = 5;
          break;
      case "w":
          paddle1.dy = -5;
          break;
      case "s":
          paddle1.dy = 5;
          break;
      case "m":
          toggleMenu();
          break;
  }
});

document.addEventListener("keyup", event => {
  switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
          paddle2.dy = 0;
          break;
      case "w":
      case "s":
          paddle1.dy = 0;
          break;
  }
});


function toggleMenu() {
  menu.classList.toggle("hidden");
}

document.getElementById("play-vs-ai").addEventListener("click", () => {
  gameMode = "ai";
  menu.classList.add("hidden");
  resetGame();
});

document.getElementById("play-vs-human").addEventListener("click", () => {
  gameMode = "human";
  menu.classList.add("hidden");
  resetGame();
});

document.getElementById("toggle-music").addEventListener("click", () => {
  // Implement music toggle functionality
});

document.getElementById("toggle-sound").addEventListener("click", () => {
  // Implement sound toggle functionality
});

function moveAI() {
    if (ball.y < paddle2.y + paddleHeight / 2) {
        paddle2.dy = -4;
    } else if (ball.y > paddle2.y + paddleHeight / 2) {
        paddle2.dy = 4;
    } else {
        paddle2.dy = 0;
    }
}

gameLoop();
