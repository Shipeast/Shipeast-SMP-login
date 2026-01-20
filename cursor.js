const dot = document.querySelector('.cursor-dot');
const halo = document.querySelector('.cursor-halo');
const outline = document.querySelector('.cursor-outline');

let mx = 0, my = 0;
let hx = 0, hy = 0;

document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.cursor-dot');
  const halo = document.querySelector('.cursor-halo');
  const outline = document.querySelector('.cursor-outline');

  let mx = 0, my = 0;   // aktuální pozice myši
  let hx = 0, hy = 0;   // pozice halo

  // pohyb myši
document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.cursor-dot');
  const halo = document.querySelector('.cursor-halo');
  const outline = document.querySelector('.cursor-outline');

  let mx = 0, my = 0;   // myš
  let hx = 0, hy = 0;   // halo

  // sledování myši
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // animace halo
  function animate() {
    hx += (mx - hx) * 0.15;
    hy += (my - hy) * 0.15;
    halo.style.left = hx + 'px';
    halo.style.top = hy + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.opacity = 1;
      dot.style.transition = 'width .2s ease, height .2s ease, background .2s ease';
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.background = 'rgba(0,0,0,0.6)';
      halo.style.width = '40px';
      halo.style.height = '40px';
    });

    el.addEventListener('mouseleave', () => {
      outline.style.opacity = 0;
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.background = '#000';
      halo.style.width = '28px';
      halo.style.height = '28px';
      el.style.transform = 'translate(0,0)';
    });

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();

      // magnetický posun tlačítka
      const dx = (e.clientX - (r.left + r.width/2)) * 0.12;
      const dy = (e.clientY - (r.top + r.height/2)) * 0.12;
      el.style.transform = `translate(${dx}px, ${dy}px)`;

      // outline sleduje tlačítko
      outline.style.left = r.left + r.width/2 + dx + 'px';
      outline.style.top = r.top + r.height/2 + dy + 'px';
      outline.style.width = r.width + 30 + 'px';
      outline.style.height = r.height + 30 + 'px';

      // tečka + halo uvnitř outline
      const centerX = r.left + r.width/2 + dx;
      const centerY = r.top + r.height/2 + dy;
      dot.style.left = centerX + 'px';
      dot.style.top = centerY + 'px';
      halo.style.left = centerX + 'px';
      halo.style.top = centerY + 'px';
    });
  });

  // vypnout na mobile
  if ('ontouchstart' in window) {
    dot.style.display = halo.style.display = outline.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
});
