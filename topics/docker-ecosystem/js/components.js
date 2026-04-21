// ── ACCORDION ──
document.querySelectorAll('.accordion-header').forEach(h => {
  h.addEventListener('click', () => {
    const item = h.closest('.accordion-item');
    const wasOpen = item.classList.contains('open');
    // Optionally close siblings
    // item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    item.classList.toggle('open', !wasOpen);
  });
});

// ── TABS ──
document.querySelectorAll('.tab-list').forEach(list => {
  list.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const container = btn.closest('.tabs');
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      container.querySelector(`#${target}`)?.classList.add('active');
    });
  });
});

// ── INTERVIEW QUESTIONS ──
document.querySelectorAll('.iq-question').forEach(q => {
  q.addEventListener('click', () => {
    const container = q.closest('.interview-q');
    const body = container.querySelector('.iq-body');
    const isOpen = q.classList.contains('open');
    q.classList.toggle('open', !isOpen);
    body?.classList.toggle('visible', !isOpen);
    const chevron = q.querySelector('.chevron');
    if (chevron) chevron.textContent = isOpen ? '▼' : '▲';
  });
});

// ── ACTIVE NAV ──
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar a, .topnav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── PROGRESS BARS ANIMATE ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width;
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.progress-fill').forEach(bar => {
  const w = bar.style.width;
  bar.dataset.width = w;
  bar.style.width = '0';
  observer.observe(bar);
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
