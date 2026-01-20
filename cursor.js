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

  // pohyb myši
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // plovoucí halo
  function animate() {
    hx += (mx - hx) * 0.15;
    hy += (my - hy) * 0.15;

    // jen pokud není outline aktivní, halo a dot sledují myš
    if (!outlineActive) {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      halo.style.left = hx + 'px';
      halo.style.top = hy + 'px';
    }

    requestAnimationFrame(animate);
  }
  animate();

  let outlineActive = false;

  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', e => {
      outlineActive = true;

      const r = el.getBoundingClientRect();
      outline.style.width = r.width + 20 + 'px';
      outline.style.height = r.height + 20 + 'px';
      outline.style.left = r.left + r.width/2 + 'px';
      outline.style.top = r.top + r.height/2 + 'px';
      outline.style.opacity = 1;

      // tečka a halo transformace plynule do outline
      dot.style.transition = 'all 0.3s ease';
      halo.style.transition = 'all 0.3s ease';
      dot.style.width = '0px';
      dot.style.height = '0px';
      halo.style.width = r.width + 20 + 'px';
      halo.style.height = r.height + 20 + 'px';
      halo.style.border = '2px solid rgba(0,0,0,0.5)';
    });

    el.addEventListener('mouseleave', e => {
      outlineActive = false;
      outline.style.opacity = 0;
      el.style.transform = 'translate(0,0)';

      // vrátit tečku a halo zpět plynule
      dot.style.width = '6px';
      dot.style.height = '6px';
      halo.style.width = '28px';
      halo.style.height = '28px';
      halo.style.border = '1.5px solid rgba(0,0,0,0.35)';
    });

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) * 0.12;
      const dy = (e.clientY - (r.top + r.height/2)) * 0.12;
      el.style.transform = `translate(${dx}px, ${dy}px)`;

      // outline sleduje tlačítko
      outline.style.left = r.left + r.width/2 + dx + 'px';
      outline.style.top = r.top + r.height/2 + dy + 'px';
    });
  });

  // vypnout na mobilu
  if ('ontouchstart' in window) {
    dot.style.display = halo.style.display = outline.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
});
