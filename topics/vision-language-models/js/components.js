
document.addEventListener('DOMContentLoaded', () => {
  // Accordions
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.classList.toggle('open');
      btn.querySelector('.icon').textContent = content.classList.contains('open') ? '−' : '+';
    });
  });

  // Tabs
  document.querySelectorAll('.tabs-container').forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    btns.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        contents[idx].classList.add('active');
      });
    });
  });
});
