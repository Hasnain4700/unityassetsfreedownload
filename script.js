const canvas = document.querySelector('.stars');
const ctx = canvas.getContext('2d');

let w, h, particles;
let mouse = {
  x: undefined,
  y: undefined
};

function init() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.radius = Math.random() * 1.5 + 1;
    this.color = '#00eaff';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > w) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > h) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 234, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    const dxMouse = particles[i].x - mouse.x;
    const dyMouse = particles[i].y - mouse.y;
    const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    if (distanceMouse < 150) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 234, 255, ${1 - distanceMouse / 150})`;
      ctx.lineWidth = 1;
      ctx.moveTo(particles[i].x, mouse.x);
      ctx.lineTo(particles[i].y, mouse.y);
      ctx.stroke();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  handleParticles();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  init();
});

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

init();
animate();
