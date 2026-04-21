// ═══════════════════════════════════════════
// CLAUDE CODE MASTERY — Shared Components
// ═══════════════════════════════════════════

// Accordion
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.acc-header').forEach(h => {
        h.addEventListener('click', () => {
            const item = h.parentElement;
            const wasOpen = item.classList.contains('open');
            item.closest('.accordion').querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    // Active nav link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === currentPage) a.classList.add('active');
    });
});
