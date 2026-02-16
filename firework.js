const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.particles = [];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x, y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 6 + 2,
        life: 120,
        color: `hsl(${Math.random() * 360},100%,60%)`
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.speed *= 0.97;
      p.life--;
    });
  }

  draw() {
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.06) {
    fireworks.push(new Firework(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.5
    ));
  }

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();
    if (fw.particles[0].life <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(loop);
}
loop();

// Countdown đến giao thừa Tết Âm Lịch 2026
const countdownEl = document.getElementById("countdown");
const newYear = new Date("2026-02-17T00:00:00");

setInterval(() => {
  const now = new Date();
  const diff = newYear - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "🎆 CHÚC MỪNG NĂM MỚI 2026 🎆";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor(diff / (1000 * 60 * 60) % 24);
  const m = Math.floor(diff / (1000 * 60) % 60);
  const s = Math.floor(diff / 1000 % 60);

  countdownEl.innerHTML = `Còn ${d} ngày ${h} giờ ${m} phút ${s} giây`;
}, 1000);

// Phát video nền
function playVideo() {
  const video = document.getElementById("bgm");
  video.muted = false;     // bật tiếng
  video.style.display = "block";
  video.play().catch(err => console.log("Play error:", err));
  document.getElementById("playBtn").style.display = "none";
}


// Click bất kỳ để bật video (hỗ trợ mobile)
document.body.addEventListener("click", () => {
  const video = document.getElementById("bgm");
  video.muted = false;
  video.play();
}, { once: true });
