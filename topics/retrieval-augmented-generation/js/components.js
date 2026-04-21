// RAG Learning Journey - Interactive Components

// Progress tracking
const ProgressTracker = {
    save(sectionId) {
        const completed = JSON.parse(localStorage.getItem('rag-progress') || '[]');
        if (!completed.includes(sectionId)) {
            completed.push(sectionId);
            localStorage.setItem('rag-progress', JSON.stringify(completed));
        }
    },

    get() {
        return JSON.parse(localStorage.getItem('rag-progress') || '[]');
    },

    isCompleted(sectionId) {
        return this.get().includes(sectionId);
    }
};

// Accordion component
function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.classList.contains('open');

            // Close all other accordions in the same group
            header.closest('.accordion-group')?.querySelectorAll('.accordion-content')
                .forEach(c => c.classList.remove('open'));

            // Toggle current
            content.classList.toggle('open', !isOpen);
        });
    });
}

// Tabs component
function initTabs() {
    document.querySelectorAll('.tab-buttons').forEach(buttons => {
        buttons.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                const container = btn.closest('.tabs');

                // Update buttons
                container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update content
                container.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.toggle('active', content.id === tabId);
                });
            });
        });
    });
}

// Theme toggle
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('rag-theme') || 'dark';
    document.body.classList.toggle('theme-light', savedTheme === 'light');

    toggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('theme-light');
        localStorage.setItem('rag-theme', isLight ? 'light' : 'dark');
    });
}

// Mark section as complete
function markSectionComplete(sectionId) {
    ProgressTracker.save(sectionId);

    // Update UI
    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn) {
        completeBtn.textContent = '✓ Completed!';
        completeBtn.disabled = true;
        completeBtn.classList.add('completed');
    }
}

// Navigation
function setupNavigation() {
    const sections = [
        'section1-foundation', 'section2-analogy', 'section3a-learning-journey',
        'section3b-interview', 'section4-system-design', 'section5-ripple-effects',
        'section6-evolution', 'section7-patterns', 'section8-tradeoffs',
        'section9-scale', 'section10-landscape', 'section11-pitfalls',
        'section12-debugging', 'section13-eloquent', 'section14-practice',
        'section15-reference', 'section16-whats-next'
    ];

    const currentSection = sections.find(s => window.location.pathname.includes(s));

    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && currentIndex > 0) {
            prevBtn.href = sections[currentIndex - 1] + '.html';
        } else if (prevBtn) {
            prevBtn.disabled = true;
        }

        if (nextBtn && currentIndex < sections.length - 1) {
            nextBtn.href = sections[currentIndex + 1] + '.html';
        } else if (nextBtn) {
            nextBtn.disabled = true;
        }

        // Check if already completed
        if (ProgressTracker.isCompleted(currentSection)) {
            const completeBtn = document.getElementById('completeBtn');
            if (completeBtn) {
                completeBtn.textContent = '✓ Completed';
                completeBtn.disabled = true;
                completeBtn.classList.add('completed');
            }
        }
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.searchable-card');

        cards.forEach(card => {
            const title = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
            const content = card.querySelector('p')?.textContent.toLowerCase() || '';

            if (title.includes(query) || content.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = query ? 'none' : '';
            }
        });
    });
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied!';
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 2000);
    });
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Skip if in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const currentSection = [...document.querySelectorAll('.module-card, .section-content')]
            .findIndex(el => window.location.pathname.includes(el.dataset.section || ''));

        switch(e.key) {
            case 'ArrowLeft':
                document.getElementById('prevBtn')?.click();
                break;
            case 'ArrowRight':
                document.getElementById('nextBtn')?.click();
                break;
            case 'c':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    document.getElementById('completeBtn')?.click();
                }
                break;
        }
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initTabs();
    initThemeToggle();
    setupNavigation();
    initSearch();
    initKeyboardShortcuts();
    initSmoothScroll();

    // Add complete button handler
    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn && !completeBtn.disabled) {
        completeBtn.addEventListener('click', () => {
            const sectionId = completeBtn.dataset.section;
            markSectionComplete(sectionId);
        });
    }

    // Add fade-in animation
    document.querySelectorAll('.content-section, .module-card').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.05}s`;
        el.classList.add('fade-in');
    });
});

// Export for use in other scripts
window.RAGLearning = {
    ProgressTracker,
    markSectionComplete,
    copyToClipboard
};
