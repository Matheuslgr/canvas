const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

// --- Bouncing ball ---
const ball = { x: 100, y: 100, r: 20, vx: 3.2, vy: 2.5, color: '#ffd166' };

function updateBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.x - ball.r < 0 || ball.x + ball.r > canvas.width) ball.vx *= -1;
  if (ball.y - ball.r < 0 || ball.y + ball.r > canvas.height) ball.vy *= -1;
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = ball.color;
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();
}

// --- Drawing with mouse ---
let drawing = false;
let drawColor = document.getElementById('color').value;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});

document.getElementById('color').addEventListener('change', (e) => {
  drawColor = e.target.value;
});

document.getElementById('clear').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let running = true;
document.getElementById('toggleAnim').addEventListener('click', () => {
  running = !running;
  document.getElementById('toggleAnim').textContent = running ? 'Pausar' : 'Retomar';
  if (running) loop();
});

// --- Demo loop ---
function loop() {
  if (!running) return;
  const drawingImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(drawingImage, 0, 0);
  updateBall();
  drawBall();
  requestAnimationFrame(loop);
}

// start
loop();
