document.addEventListener('DOMContentLoaded', () => {
    // ─── Accordions ───
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.icon');
            const isOpen = content.classList.contains('open');

            // Close all siblings in the same parent
            const parent = header.closest('.accordion-group');
            if (parent) {
                parent.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
                parent.querySelectorAll('.icon').forEach(i => i.textContent = '+');
            }

            if (!isOpen) {
                content.classList.add('open');
                if (icon) icon.textContent = '−';
            }
        });
    });

    // ─── Tabs ───
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

    // ─── Scroll Reveal ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .highlight-box, .diagram-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
