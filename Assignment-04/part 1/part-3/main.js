/*<!--
    Title: PART 3
    Author: Sahaj Dhakal
    Date: august 4,2024
    purpose: Application of Web for amending background 
-->*/

// setup canvas

// Setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Utility functions
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomRGB = () => `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

// Ball class definition
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX *= -1;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY *= -1;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  detectCollision(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + otherBall.size) {
      this.color = otherBall.color = randomRGB();
    }
  }
}

// BallManager class to handle multiple balls
class BallManager {
  constructor(numberOfBalls) {
    this.balls = this.createBalls(numberOfBalls);
  }

  createBalls(numberOfBalls) {
    const balls = [];
    while (balls.length < numberOfBalls) {
      const size = random(10, 20);
      const ball = new Ball(
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
      );
      balls.push(ball);
    }
    return balls;
  }

  updateAndDrawBalls() {
    this.balls.forEach(ball => {
      ball.draw();
      ball.update();
    });
  }

  detectCollisions() {
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = i + 1; j < this.balls.length; j++) {
        this.balls[i].detectCollision(this.balls[j]);
      }
    }
  }
}

// Main loop
const ballManager = new BallManager(25);

const loop = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  ballManager.updateAndDrawBalls();
  ballManager.detectCollisions();

  requestAnimationFrame(loop);
};

loop();

