const dot = document.querySelector('.cursor-dot');
const halo = document.querySelector('.cursor-halo');
const outline = document.querySelector('.cursor-outline');

let mx = 0, my = 0;
let hx = 0, hy = 0;

document.addEventListener('DOMContentLoaded', () => {
  const dot = document.querySelector('.cursor-dot');
  const halo = document.querySelector('.cursor-halo');
  const outline = document.querySelector('.cursor-outline');

  let mx = 0, my = 0;
  let hx = 0, hy = 0;
  let outlineX = 0, outlineY = 0, outlineW = 0, outlineH = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // animace pohybu dot a halo
  function animateCursor() {
    hx += (mx - hx) * 0.2;
    hy += (my - hy) * 0.2;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    halo.style.left = hx + 'px';
    halo.style.top = hy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // outline animace
  function animateOutline() {
    const curX = parseFloat(outline.style.left || 0);
    const curY = parseFloat(outline.style.top || 0);
    const curW = parseFloat(outline.style.width || 0);
    const curH = parseFloat(outline.style.height || 0);

    outline.style.left = curX + (outlineX - curX) * 0.15 + 'px';
    outline.style.top = curY + (outlineY - curY) * 0.15 + 'px';
    outline.style.width = curW + (outlineW - curW) * 0.15 + 'px';
    outline.style.height = curH + (outlineH - curH) * 0.15 + 'px';
    outline.style.borderRadius = '50%';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // tlačítka a odkazy
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', e => {
      const r = el.getBoundingClientRect();

      outline.style.opacity = 1;
      outlineX = r.left + r.width / 2;
      outlineY = r.top + r.height / 2;
      outlineW = r.width + 30;
      outlineH = r.height + 30;

      // transformace tečky a halo
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      halo.style.width = r.width + 30 + 'px';
      halo.style.height = r.height + 30 + 'px';
      halo.style.border = '2px solid rgba(0,0,0,0.5)';
    });

    el.addEventListener('mouseleave', () => {
      outline.style.opacity = 0;
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      halo.style.width = '28px';
      halo.style.height = '28px';
      halo.style.border = '1.5px solid rgba(0,0,0,0.35)';
      el.style.transform = 'translate(0,0)';
    });

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) * 0.12;
      const dy = (e.clientY - (r.top + r.height/2)) * 0.12;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      outlineX = r.left + r.width/2 + dx;
      outlineY = r.top + r.height/2 + dy;
    });
  });

  // deaktivace na mobilu
  if ('ontouchstart' in window) {
    dot.style.display = halo.style.display = outline.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
});
