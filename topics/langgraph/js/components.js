// LangChain Learning Journey - Interactive Components

document.addEventListener('DOMContentLoaded', function() {

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.section, .card, .level').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Interactive diagrams (if present)
    const diagramElements = document.querySelectorAll('.architecture-diagram, .flow-diagram');
    diagramElements.forEach(diagram => {
        diagram.addEventListener('click', function(e) {
            if (e.target.tagName === 'rect' || e.target.tagName === 'circle') {
                // Add a subtle pulse effect
                e.target.style.transition = 'all 0.3s';
                const originalOpacity = e.target.style.opacity || '1';
                e.target.style.opacity = '0.6';
                setTimeout(() => {
                    e.target.style.opacity = originalOpacity;
                }, 300);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Arrow keys for navigation between pages
        if (e.key === 'ArrowRight') {
            const nextLink = document.querySelector('.navigation .button.primary');
            if (nextLink) {
                window.location.href = nextLink.href;
            }
        } else if (e.key === 'ArrowLeft') {
            const prevLink = document.querySelector('.navigation .button.secondary');
            if (prevLink) {
                window.location.href = prevLink.href;
            }
        }
    });

    // Table of Contents generation (if enabled)
    const tocContainer = document.getElementById('table-of-contents');
    if (tocContainer) {
        const headings = document.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            const toc = document.createElement('ul');
            toc.className = 'toc-list';

            headings.forEach(heading => {
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.href = `#${heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-')}`;
                link.textContent = heading.textContent;
                link.className = heading.tagName === 'H3' ? 'toc-sub-item' : 'toc-main-item';
                item.appendChild(link);
                toc.appendChild(item);
            });

            tocContainer.appendChild(toc);
        }
    }

    // Search functionality (if search input exists)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.section, .level, .card');

            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    section.style.display = '';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // Progress indicator
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Copy code functionality
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const wrapper = block.parentElement;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button';
        copyBtn.textContent = 'Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

        wrapper.style.position = 'relative';
        wrapper.appendChild(copyBtn);

        copyBtn.addEventListener('click', async function() {
            const text = block.textContent;
            try {
                await navigator.clipboard.writeText(text);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });

    // External link handling
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('aria-label', link.textContent + ' (opens in new tab)');
        }
    });

    // Print optimization
    window.addEventListener('beforeprint', function() {
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.add('active');
        });
    });

    // Accessibility: Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = 'position:absolute;left:-9999px;top:0;z-index:999;padding:10px;background:var(--primary);color:white;';
    document.body.insertBefore(skipLink, document.body.firstChild);

    skipLink.addEventListener('focus', function() {
        this.style.left = '10px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });

    // Theme toggle (if enabled)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update toggle icon/text
            this.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        });
    }

    // Reading time calculator
    const content = document.querySelector('.container');
    if (content) {
        const text = content.textContent;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / 200); // 200 words per minute

        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.textContent = `📖 ${readingTime} min read`;
        readingTimeElement.style.cssText = 'color:var(--text-muted);font-size:0.85rem;margin-bottom:20px;';

        const h1 = content.querySelector('h1');
        if (h1 && h1.nextSibling) {
            h1.parentNode.insertBefore(readingTimeElement, h1.nextSibling);
        }
    }

    console.log('🦜 LangChain Learning Journey loaded successfully!');
    console.log('💡 Tip: Use arrow keys (← →) to navigate between sections');
});
