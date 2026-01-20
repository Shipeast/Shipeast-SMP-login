const dot = document.querySelector('.cursor-dot');
const halo = document.querySelector('.cursor-halo');
const outline = document.querySelector('.cursor-outline');

let mx = 0, my = 0;
let hx = 0, hy = 0;

// cursor.js
document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.cursor-dot');
  const svg = document.querySelector('#cursor-blob');
  const path = svg.querySelector('path');

  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let dotPos = { x: mouse.x, y: mouse.y };
  let blobPos = { x: mouse.x, y: mouse.y };
  let blobSize = 40;
  let target = null;

  // Sledování myši
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Animace tečky
  function animateDot() {
    dotPos.x += (mouse.x - dotPos.x) * 0.2;
    dotPos.y += (mouse.y - dotPos.y) * 0.2;
    dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px)`;
    requestAnimationFrame(animateDot);
  }
  animateDot();

  // Animace blobu
  function animateBlob() {
    blobPos.x += (mouse.x - blobPos.x) * 0.15;
    blobPos.y += (mouse.y - blobPos.y) * 0.15;

    let r = blobSize;
    let cx = blobPos.x;
    let cy = blobPos.y;

    if(target){
      const rect = target.getBoundingClientRect();
      cx = rect.left + rect.width/2;
      cy = rect.top + rect.height/2;
      r = Math.max(rect.width, rect.height)/1.5;
    }

    const d = `
      M ${cx - r},${cy}
      C ${cx - r},${cy - r*0.6} ${cx - r*0.4},${cy - r} ${cx},${cy - r}
      C ${cx + r*0.4},${cy - r} ${cx + r},${cy - r*0.6} ${cx + r},${cy}
      C ${cx + r},${cy + r*0.6} ${cx + r*0.4},${cy + r} ${cx},${cy + r}
      C ${cx - r*0.4},${cy + r} ${cx - r},${cy + r*0.6} ${cx - r},${cy}
    `;
    path.setAttribute('d', d);

    requestAnimationFrame(animateBlob);
  }
  animateBlob();

  // Magnetický efekt tlačítka
  document.querySelectorAll('button, a').forEach(btn => {
    btn.addEventListener('mouseenter', () => target = btn);
    btn.addEventListener('mouseleave', () => target = null);
  });

  // vypnout na mobilech
  if ('ontouchstart' in window) {
    dot.style.display = svg.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
});
