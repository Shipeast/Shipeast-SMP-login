const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animate() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animate);
}
animate();

document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('active'));
  el.addEventListener('mouseleave', () => {
    ring.classList.remove('active');
    el.style.transform = 'translate(0,0)';
  });

  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform =
      `translate(${(e.clientX - (r.left+r.width/2))*0.25}px,
                 ${(e.clientY - (r.top+r.height/2))*0.25}px)`;
  });
});

if ('ontouchstart' in window) {
  dot.style.display = ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}
