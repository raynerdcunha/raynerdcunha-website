// ── Cursor (instant position, no lag) ──────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mx = -100, my = -100;   // mouse
let rx = -100, ry = -100;   // ring (lerped)
let raf;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  // Dot follows instantly
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function lerpRing() {
  // Fast lerp so ring never feels sluggish
  rx += (mx - rx) * 0.22;
  ry += (my - ry) * 0.22;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  raf = requestAnimationFrame(lerpRing);
}
lerpRing();

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ── Nav scroll style ────────────────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav link ─────────────────────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Scroll reveal ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
