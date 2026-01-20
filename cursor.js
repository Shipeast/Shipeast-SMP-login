const dot = document.querySelector('.cursor-dot');
const halo = document.querySelector('.cursor-halo');
const outline = document.querySelector('.cursor-outline');

let mx = 0, my = 0;
let hx = 0, hy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function loop() {
  hx += (mx - hx) * 0.12;
  hy += (my - hy) * 0.12;
  halo.style.left = hx + 'px';
  halo.style.top = hy + 'px';
  requestAnimationFrame(loop);
}
loop();

document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const r = el.getBoundingClientRect();
    outline.style.width = r.width + 16 + 'px';
    outline.style.height = r.height + 16 + 'px';
    outline.style.left = r.left + r.width / 2 + 'px';
    outline.style.top = r.top + r.height / 2 + 'px';
    outline.style.opacity = 1;
  });

  el.addEventListener('mouseleave', () => {
    outline.style.opacity = 0;
    el.style.transform = 'translate(0,0)';
  });

  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.12;

    // magnet jen na tlačítko
    el.style.transform = `translate(${dx}px, ${dy}px)`;

    // outline ZŮSTÁVÁ CENTROVANÝ
    outline.style.left = r.left + r.width / 2 + dx + 'px';
    outline.style.top = r.top + r.height / 2 + dy + 'px';
  });
});

if ('ontouchstart' in window) {
  dot.style.display = halo.style.display = outline.style.display = 'none';
  document.body.style.cursor = 'auto';
}
