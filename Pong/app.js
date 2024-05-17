const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");
const fireworksCanvas = document.getElementById("fireworksCanvas");
const fireworksContext = fireworksCanvas.getContext("2d");
const menu = document.getElementById("menu");
const winnerMessage = document.getElementById("winnerMessage");
const backgroundMusic = document.getElementById("backgroundMusic");
const paddleHitSound = document.getElementById("paddleHitSound");
const fireworksSound = document.getElementById("fireworksSound");
const scoreSound = document.getElementById("scoreSound");
const winningPose = document.getElementById("winning-pose");
const ballSpeedSlider = document.getElementById("ball-speed");
const pauseGameToggle = document.getElementById("pause-game");

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
let gamePaused = false;
let musicPlaying = false;
let soundEnabled = true;
let ballSpeed = ballSpeedSlider.value;



const player1ScoreDisplay = document.getElementById("player1-score");
const player2ScoreDisplay = document.getElementById("player2-score");


document.addEventListener("DOMContentLoaded", () => {
  const smallDeviceMessage = document.getElementById("smallDeviceMessage");

  function checkScreenSize() {
    if (window.innerWidth <= 1250) {
      smallDeviceMessage.classList.remove("hidden");
    } else {
      smallDeviceMessage.classList.add("hidden");
    }
  }

  window.addEventListener("resize", checkScreenSize);
  checkScreenSize();
});

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

// Play sound when fireworks are displayed
function playFireworksSound(delay = 0) {
    if (soundEnabled) {
        setTimeout(() => {
            fireworksSound.currentTime = 0;
            fireworksSound.play();
        }, delay);
    }
}

// Play sound when a player scores
function playScoreSound() {
  if (soundEnabled) {
      scoreSound.currentTime = 0;
      scoreSound.play();
  }
}

// Play picture taking sound after win

function playWinningPoseSound() {
  if (soundEnabled) {
      winningPose.currentTime = 0;
      winningPose.play();
  }
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ballRadius < paddle1.x + paddleWidth && ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
        ball.dx *= -1;
        increaseBallSpeed();
        playPaddleHitSound();
    }

    if (ball.x + ballRadius > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) {
        ball.dx *= -1;
        increaseBallSpeed();
        playPaddleHitSound();
    }

    if (ball.x - ballRadius < 0) {
        player2Score++;
        playScoreSound();
        resetBall();
    }

    if (ball.x + ballRadius > canvas.width) {
        player1Score++;
        playScoreSound();
        resetBall();
    }

    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;

    if (player1Score === 7 || player2Score === 7) {
        displayFireworks(player1Score === 7 ? 1 : 2);
    }
}

function increaseBallSpeed() {
    ball.dx *= 1.1;
    ball.dy *= 1.1;
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
    if (!gamePaused) {
        movePaddle(paddle1);
        movePaddle(paddle2);
        moveBall();

        if (gameMode === "ai") {
            moveAI();
        }
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight, "white");
    drawRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight, "white");

    if (!gamePaused) {
        drawCircle(ball.x, ball.y, ballRadius, "white");
    }
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
    console.log("Menu toggled");
    menu.classList.toggle("hidden");
}

document.getElementById("play-vs-ai").addEventListener("click", () => {
    gameMode = "ai";
    toggleMenu();
    resetGame();
    resetPaddles();
});

document.getElementById("play-vs-human").addEventListener("click", () => {
    gameMode = "human";
    toggleMenu();
    resetGame();
    resetPaddles();
});

document.getElementById("toggle-music").addEventListener("click", () => {
    if (musicPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    musicPlaying = !musicPlaying;
});

document.getElementById("toggle-sound").addEventListener("click", () => {
    soundEnabled = !soundEnabled;
});


function playPaddleHitSound() {
    if (soundEnabled) {
        paddleHitSound.currentTime = 0;
        paddleHitSound.play();
    }
}

function resetPaddles() {
    paddle1.y = canvas.height / 2 - paddleHeight / 2;
    paddle1.dy = 0;
    paddle2.y = canvas.height / 2 - paddleHeight / 2;
    paddle2.dy = 0;
}

function moveAI() {
    if (ball.y < paddle2.y + paddleHeight / 2) {
        paddle2.dy = -4;
    } else if (ball.y > paddle2.y + paddleHeight / 2) {
        paddle2.dy = 4;
    } else {
        paddle2.dy = 0;
    }
}



function displayFireworks(winner) {
  fireworksCanvas.classList.remove("hidden");
  playWinningPoseSound();
  
  const winningPoseDuration = 1000; // Duration of winning pose sound in milliseconds
  
  playFireworksSound(winningPoseDuration);

  const fireworksDuration = 3000; // Duration of fireworks in milliseconds

  const particles = [];
  const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#8B00FF"];

  // Display winner message
  winnerMessage.textContent = `Player ${winner} Wins!`;
  winnerMessage.classList.remove("hidden");

  function createParticle(x, y, color) {
      const particle = {
          x: x,
          y: y,
          dx: (Math.random() - 0.5) * 4,
          dy: (Math.random() - 0.5) * 4,
          life: Math.random() * 30 + 30,
          color: color
      };
      particles.push(particle);
  }

  function updateParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.x += particle.dx;
          particle.y += particle.dy;
          particle.dy += 0.02; // Gravity effect
          particle.life -= 1;
          if (particle.life <= 0) {
              particles.splice(i, 1);
          }
      }
  }

  function renderParticles() {
      fireworksContext.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
      for (const particle of particles) {
          fireworksContext.fillStyle = particle.color;
          fireworksContext.fillRect(particle.x, particle.y, 3, 3);
      }
  }

  function animateFireworks() {
      updateParticles();
      renderParticles();
      if (particles.length > 0) {
          requestAnimationFrame(animateFireworks);
      } else {
          fireworksCanvas.classList.add("hidden");
      }
  }

  function triggerFireworks() {
      for (let i = 0; i < 100; i++) {
          const x = Math.random() * fireworksCanvas.width;
          const y = Math.random() * fireworksCanvas.height;
          const color = colors[Math.floor(Math.random() * colors.length)];
          createParticle(x, y, color);
      }
      animateFireworks();
  }

  triggerFireworks();

  // Pause the game and show the winner message
  gamePaused = true;
  setTimeout(() => {
      gamePaused = false;
      fireworksCanvas.classList.add("hidden");
      winnerMessage.classList.add("hidden");
      resetGame();
  }, fireworksDuration);
}




gameLoop();
