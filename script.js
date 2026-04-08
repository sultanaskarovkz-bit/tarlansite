/* ============================
   TARLAN TRANS PLUS — Production JS
   ============================ */

// --- Loader ---
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('done'), 2400);
});

// --- Header scroll ---
const header = document.getElementById('header');
const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('topBtn').classList.toggle('show', window.scrollY > 500);
};
window.addEventListener('scroll', onScroll, { passive: true });

// --- Burger ---
const burger = document.getElementById('burger');
const overlay = document.getElementById('mobOverlay');
const closeMob = () => { burger.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});
overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));

// --- Smooth scroll ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- Counter animation ---
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    if (!target) return;
    const dur = 2200;
    const start = performance.now();
    const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target).toLocaleString('ru-RU');
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('[data-target]').forEach(animateCounter);
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.4 });

const hc = document.querySelector('.hero-counters');
if (hc) counterObs.observe(hc);

// --- AOS (Animate on Scroll) ---
const aosObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

// --- Back to top ---
document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Active nav link ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');
window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    sections.forEach(s => {
        const top = s.offsetTop, h = s.offsetHeight, id = s.id;
        const link = document.querySelector(`.desktop-nav a[href="#${id}"]`);
        if (link) {
            if (y >= top && y < top + h) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}, { passive: true });

// --- Form → WhatsApp ---
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('serviceType').value;
        const msg = document.getElementById('message').value.trim();

        let text = `Здравствуйте! Меня зовут ${name}.%0AТелефон: ${phone}`;
        if (service) text += `%0AТип перевозки: ${service}`;
        if (msg) text += `%0AСообщение: ${msg}`;

        window.open(`https://wa.me/77087211651?text=${text}`, '_blank');

        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Перенаправление в WhatsApp...</span>';
        btn.style.background = '#25D366';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
    });
}

// --- Parallax hero video subtle ---
window.addEventListener('scroll', () => {
    const video = document.querySelector('.hero-video');
    if (video && window.scrollY < window.innerHeight) {
        video.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    }
}, { passive: true });
