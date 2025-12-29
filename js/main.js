// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Active Navigation Link =====
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (currentPath.endsWith(href) ||
            (currentPath.endsWith('/') && href === 'index.html') ||
            (currentPath.includes('/pages/') && href.includes(currentPath.split('/').pop()))) {
            link.classList.add('active');
        }
    });
}

// ===== Sidebar Active Link =====
function setActiveSidebarLink() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (currentPath.includes(href.replace('.html', ''))) {
            link.classList.add('active');
        }
    });
}

// ===== Checkbox State Persistence =====
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const pageId = window.location.pathname;

    checkboxes.forEach((checkbox, index) => {
        const key = `${pageId}-checkbox-${index}`;

        // Restore state
        const savedState = localStorage.getItem(key);
        if (savedState === 'true') {
            checkbox.checked = true;
        }

        // Save state on change
        checkbox.addEventListener('change', function() {
            localStorage.setItem(key, this.checked);
        });
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    setActiveSidebarLink();
    initCheckboxes();
});

// ===== Copy Code Block =====
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'คัดลอก';

        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'คัดลอกแล้ว!';
                setTimeout(() => {
                    button.textContent = 'คัดลอก';
                }, 2000);
            });
        });

        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(button);
    });
}

// ===== Search Functionality =====
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.lesson-card, .guide-card, .module-card');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== Progress Tracking =====
function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    if (checkboxes.length === 0) return;

    const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);

    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = `${checked}/${total} เสร็จสิ้น (${percentage}%)`;
    }
}

// ===== Initialize All =====
document.addEventListener('DOMContentLoaded', function() {
    addCopyButtons();
    initSearch();

    // Update progress when checkbox changes
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    updateProgress();
});
