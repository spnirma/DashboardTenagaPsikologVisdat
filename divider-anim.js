// Animasi kesehatan di garis pembatas hero dan konten
const canvas = document.createElement('canvas');
canvas.style.cssText = `
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  pointer-events: none;
  z-index: 10;
`;
document.querySelector('.hero').appendChild(canvas);

const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

// Objek animasi: detak jantung, kapsul, bintang plus
const items = [];

const TYPES = ['pulse', 'pill', 'plus', 'heart'];

function randomItem() {
  return {
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    x: Math.random() * canvas.width,
    y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
    size: 8 + Math.random() * 8,
    speed: 0.4 + Math.random() * 0.6,
    opacity: 0.5 + Math.random() * 0.4,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.02,
  };
}

for (let i = 0; i < 18; i++) {
  const item = randomItem();
  item.x = Math.random() * canvas.width; // sebar merata awal
  items.push(item);
}

function drawPulse(c, x, y, s, op) {
  c.save();
  c.globalAlpha = op;
  c.strokeStyle = '#ffffff';
  c.lineWidth = 1.5;
  c.beginPath();
  c.moveTo(x - s, y);
  c.lineTo(x - s * 0.5, y);
  c.lineTo(x - s * 0.25, y - s * 0.9);
  c.lineTo(x, y + s * 0.9);
  c.lineTo(x + s * 0.25, y - s * 0.5);
  c.lineTo(x + s * 0.5, y);
  c.lineTo(x + s, y);
  c.stroke();
  c.restore();
}

function drawPill(c, x, y, s, op) {
  c.save();
  c.globalAlpha = op;
  c.fillStyle = 'rgba(255,255,255,0.7)';
  c.strokeStyle = '#ffffff';
  c.lineWidth = 1;
  const w = s * 1.6, h = s * 0.7;
  c.beginPath();
  c.roundRect(x - w/2, y - h/2, w, h, h/2);
  c.fill();
  // garis tengah
  c.beginPath();
  c.moveTo(x, y - h/2);
  c.lineTo(x, y + h/2);
  c.globalAlpha = op * 0.5;
  c.strokeStyle = 'rgba(0,100,50,0.5)';
  c.stroke();
  c.restore();
}

function drawPlus(c, x, y, s, op) {
  c.save();
  c.globalAlpha = op;
  c.strokeStyle = '#ffffff';
  c.lineWidth = 2;
  c.lineCap = 'round';
  c.beginPath();
  c.moveTo(x, y - s * 0.7);
  c.lineTo(x, y + s * 0.7);
  c.moveTo(x - s * 0.7, y);
  c.lineTo(x + s * 0.7, y);
  c.stroke();
  c.restore();
}

function drawHeart(c, x, y, s, op) {
  c.save();
  c.globalAlpha = op;
  c.fillStyle = 'rgba(255,255,255,0.85)';
  c.beginPath();
  c.moveTo(x, y + s * 0.6);
  c.bezierCurveTo(x - s * 1.2, y - s * 0.2, x - s * 1.2, y - s, x, y - s * 0.3);
  c.bezierCurveTo(x + s * 1.2, y - s, x + s * 1.2, y - s * 0.2, x, y + s * 0.6);
  c.fill();
  c.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  items.forEach(item => {
    item.x += item.speed;
    item.wobble += item.wobbleSpeed;
    const wy = item.y + Math.sin(item.wobble) * 6;

    if (item.x > canvas.width + 30) {
      item.x = -30;
      item.y = canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
    }

    if      (item.type === 'pulse') drawPulse(ctx, item.x, wy, item.size, item.opacity);
    else if (item.type === 'pill')  drawPill (ctx, item.x, wy, item.size, item.opacity);
    else if (item.type === 'plus')  drawPlus (ctx, item.x, wy, item.size, item.opacity);
    else if (item.type === 'heart') drawHeart(ctx, item.x, wy, item.size, item.opacity);
  });

  requestAnimationFrame(animate);
}

animate();
