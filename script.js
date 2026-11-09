const surpriseBtn = document.getElementById("surpriseBtn");
const surprise = document.getElementById("surprise");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function celebrate() {
  const colors = ["#ff9bc7", "#f3d7a3", "#ffffff", "#c9a7ff", "#ff6e9e"];
  pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.4,
    size: 4 + Math.random() * 6,
    speed: 2 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 2.5,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.12,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  if (animationId) cancelAnimationFrame(animationId);
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces.forEach(piece => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.spin;
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 1.5);
    ctx.restore();
  });
  pieces = pieces.filter(piece => piece.y < window.innerHeight + 20);
  if (pieces.length) animationId = requestAnimationFrame(drawConfetti);
  else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    animationId = null;
  }
}

surpriseBtn.addEventListener("click", () => {
  surprise.hidden = false;
  surpriseBtn.textContent = "সারপ্রাইজ খুলে গেছে 💖";
  surpriseBtn.disabled = true;
  celebrate();
});
