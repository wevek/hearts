class Canvas {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.context = this.setupCanvas(this.canvas);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.particles = [];
    this.numParticles = 290;
  }

  setupCanvas(canvas) {
    let dpr = window.devicePixelRatio || 1;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const context = canvas.getContext("2d");
    context.scale(dpr, dpr);
    return context;
  }

  init() {
    for (let i = 0; i < this.numParticles; i++) {
      let size = Math.random() * 20;
      let x = Math.random() * (this.canvas.clientWidth - size * 2);
      let y = Math.random() * (this.canvas.clientHeight - size * 2);
      let directionX = Math.random() * 0.4 - 0.2;
      let directionY = Math.random() * 0.4 - 0.2;
      let color = "white";
      this.particles.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }
    this.animate();
  }

  animate() {
    const self = this;
    requestAnimationFrame(self.animate.bind(self));
    this.context.fillStyle = "black";
    this.context.fillRect(
      0,
      0,
      this.canvas.clientWidth,
      this.canvas.clientHeight
    );

    for (const particle of this.particles) {
      particle.update(
        this.context,
        this.canvas.clientWidth,
        this.canvas.clientHeight
      );
    }
  }
}

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(context) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
  }

  update(context, canvasWidth, canvasHeight) {
    if (this.x + this.size > canvasWidth || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvasHeight || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(context);
  }
}
