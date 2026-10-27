(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window !== window.top) return;

  const N = 72;
  const blob = (cx, cy, R, t, amp, ux, uy, st) => {
    const pts = [];
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2;
      const r = R * (1 + amp * (0.09 * Math.sin(3 * a + t * 1.3) + 0.06 * Math.sin(5 * a - t * 1.9) + 0.04 * Math.sin(2 * a + t * 0.9) + 0.03 * Math.sin(7 * a + t * 2.4)));
      let px = Math.cos(a) * r, py = Math.sin(a) * r;
      const along = px * ux + py * uy;
      const perp = -px * uy + py * ux;
      const al = along * (1 + st), pe = perp * (1 - st * 0.45);
      px = al * ux - pe * uy;
      py = al * uy + pe * ux;
      pts.push((cx + px).toFixed(1) + 'px ' + (cy + py).toFixed(1) + 'px');
    }
    return 'polygon(' + pts.join(',') + ')';
  };

  if (matchMedia('(hover:hover)').matches) {
    const lens = document.createElement('div');
    lens.className = 'xray';
    lens.setAttribute('aria-hidden', 'true');
    document.body.appendChild(lens);
    let tx = 0, ty = 0, x = 0, y = 0, scale = 1, target = 1, seen = false;
    const hit = (el) => (el && el.closest && el.closest('a,button') ? 1.5 : 1);
    const start = (px, py) => { tx = x = px; ty = y = py; seen = true; lens.classList.add('on'); };
    try {
      const c = JSON.parse(sessionStorage.getItem('cursor'));
      if (c) {
        lens.style.transition = 'none';
        start(c.x, c.y);
        target = hit(document.elementFromPoint(c.x, c.y));
        requestAnimationFrame(() => requestAnimationFrame(() => { lens.style.transition = ''; }));
      }
    } catch (err) {}
    addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!seen) start(tx, ty);
      target = hit(e.target);
    });
    addEventListener('scroll', () => { if (seen) target = hit(document.elementFromPoint(tx, ty)); }, { passive: true });
    addEventListener('pagehide', () => {
      try { if (seen) sessionStorage.setItem('cursor', JSON.stringify({ x: tx, y: ty })); } catch (err) {}
    });
    document.documentElement.addEventListener('mouseleave', () => lens.classList.remove('on'));
    document.documentElement.addEventListener('mouseenter', () => seen && lens.classList.add('on'));
    let vx = 0, vy = 0, t = 0;
    const R = 105, HALF = 210;
    const tick = () => {
      const px = x, py = y;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      vx += ((x - px) - vx) * 0.2;
      vy += ((y - py) - vy) * 0.2;
      scale += (target - scale) * 0.12;
      t += 0.016;
      const sp = Math.hypot(vx, vy);
      const st = Math.min(0.4, sp / 40);
      const ux = sp ? vx / sp : 1, uy = sp ? vy / sp : 0;
      const pts = [];
      for (let k = 0; k < N; k++) {
        const a = (k / N) * Math.PI * 2;
        const r = R * scale * (1 + 0.09 * Math.sin(3 * a + t * 1.3) + 0.06 * Math.sin(5 * a - t * 1.9) + 0.04 * Math.sin(2 * a + t * 0.9) + 0.03 * Math.sin(7 * a + t * 2.4));
        let px2 = Math.cos(a) * r, py2 = Math.sin(a) * r;
        const along = px2 * ux + py2 * uy;
        const perp = -px2 * uy + py2 * ux;
        const al = along * (1 + st), pe = perp * (1 - st * 0.45);
        px2 = al * ux - pe * uy;
        py2 = al * uy + pe * ux;
        pts.push(((HALF + px2) / (HALF * 2) * 100).toFixed(2) + '% ' + ((HALF + py2) / (HALF * 2) * 100).toFixed(2) + '%');
      }
      lens.style.clipPath = 'polygon(' + pts.join(',') + ')';
      lens.style.transform = `translate(${x}px,${y}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  let busy = false;
  document.querySelectorAll('a[data-go]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button || busy) return;
      e.preventDefault();
      busy = true;
      const r = a.getBoundingClientRect();
      const cx = e.detail ? e.clientX : r.left + r.width / 2;
      const cy = e.detail ? e.clientY : r.top + r.height / 2;
      const go = () => { try { sessionStorage.setItem('noFade', '1'); } catch (err) {} location.href = a.href; };
      const frame = document.createElement('iframe');
      frame.className = 'wave';
      frame.tabIndex = -1;
      frame.setAttribute('aria-hidden', 'true');
      frame.style.clipPath = blob(cx, cy, 0, 0, 1, 1, 0, 0);
      let done = false;
      const run = () => {
        if (done) return;
        done = true;
        clearTimeout(bail);
        const far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) * 1.25;
        const start = performance.now();
        const D = 950;
        const step = (now) => {
          const p = Math.min(1, (now - start) / D);
          const R = far * ease(p);
          const amp = 1 + 2.2 * (1 - p);
          frame.style.clipPath = blob(cx, cy, R, (now - start) / 1000 * 5, amp, 1, 0, 0);
          if (p < 1) requestAnimationFrame(step); else go();
        };
        requestAnimationFrame(step);
      };
      const bail = setTimeout(() => { if (!done) { done = true; go(); } }, 1800);
      frame.addEventListener('load', run);
      frame.src = a.href;
      document.body.appendChild(frame);
    });
  });
  addEventListener('pageshow', (e) => {
    if (e.persisted) { busy = false; document.querySelectorAll('.wave').forEach((f) => f.remove()); }
  });
})();
