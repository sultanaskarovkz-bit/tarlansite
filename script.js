// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2200);
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link, .btn-mobile').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (target >= 1000) {
                counter.textContent = current.toLocaleString('ru-RU');
            } else {
                counter.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger counters when hero stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== SCROLL ANIMATIONS (AOS) =====
const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('serviceType').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        let waMessage = `Здравствуйте! Меня зовут ${name}.%0A`;
        waMessage += `Телефон: ${phone}%0A`;
        if (service) waMessage += `Тип перевозки: ${service}%0A`;
        if (message) waMessage += `Сообщение: ${message}`;

        // Open WhatsApp with the message
        window.open(`https://wa.me/77087211651?text=${waMessage}`, '_blank');

        // Show success feedback
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Перенаправление в WhatsApp...';
        btn.style.background = '#25D366';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.style.color = '');
                link.style.color = '#FF8C00';
            }
        }
    });
});
