// ===== GLOBAL VARIABLES =====
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// ===== SMOOTH SCROLL =====
function handleSmoothScroll(e) {
    if (!e.target.classList.contains('nav-link')) return;

    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    }

    if (navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ===== ACTIVE NAV =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== DARK MODE =====
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const icon = themeToggle?.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const icon = themeToggle?.querySelector('i');
    if (savedTheme === 'dark' && icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ===== SCROLL ANIMATION =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.hero, .about, .skills, .portfolio, .experience, .blog, .contact, .footer');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
}

// ===== SKILL BAR =====
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                if (!progress) return;

                const width = progress.getAttribute('data-width');
                progress.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    });

    skillItems.forEach(item => observer.observe(item));
}

// ===== COUNTER =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    counters.forEach(counter => {
        let target = parseInt(counter.getAttribute('data-target'));
        let current = 0;

        function update() {
            if (current < target) {
                current += target / 100;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }

        update();
    });
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            items.forEach(item => {
                const category = item.getAttribute('data-category');

                item.style.display =
                    filter === 'all' || filter === category ? 'block' : 'none';
            });
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Pesan berhasil dikirim!');
        contactForm.reset();
    });
}

// ===== EVENTS =====
window.addEventListener('scroll', debounce(() => {
    handleNavbarScroll();
    updateActiveNavLink();
}, 10));

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initScrollAnimations();
    animateSkillBars();
    animateCounters();
    initPortfolioFilter();
    initContactForm();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});