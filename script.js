/* Tarlan Trans Plus — V5 Script */

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 1500);
});

// ===== HEADER =====
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', scrollY > 50);
    document.getElementById('topBtn').classList.toggle('show', scrollY > 500);
}, { passive: true });

// ===== BURGER =====
const burger = document.getElementById('burger');
const mob = document.getElementById('mob');
burger.addEventListener('click', () => {
    burger.classList.toggle('on');
    mob.classList.toggle('on');
    document.body.style.overflow = mob.classList.contains('on') ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('on'); mob.classList.remove('on'); document.body.style.overflow = '';
}));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target); // only animate once
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal, .reveal-left').forEach(el => revealObs.observe(el));

// ===== COUNTER ANIMATION =====
function animateCount(el) {
    const target = parseInt(el.dataset.count);
    if (!target) return;
    const dur = 2500;
    const start = performance.now();
    const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * target).toLocaleString('ru-RU');
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('[data-count]').forEach(animateCount);
            counterObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
const hs = document.querySelector('.hero-stats');
if (hs) counterObs.observe(hs);

// ===== BACK TO TOP =====
document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ACTIVE NAV =====
const secs = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
    const y = scrollY + 120;
    secs.forEach(s => {
        const link = document.querySelector(`.nav a[href="#${s.id}"]`);
        if (link) link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
}, { passive: true });

// ===== FORM → WHATSAPP =====
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const n = document.getElementById('name').value.trim();
    const p = document.getElementById('phone').value.trim();
    const s = document.getElementById('serviceType').value;
    const m = document.getElementById('message').value.trim();
    let t = `Здравствуйте! Меня зовут ${n}.%0AТелефон: ${p}`;
    if (s) t += `%0AТип: ${s}`;
    if (m) t += `%0A${m}`;
    window.open(`https://wa.me/77087211651?text=${t}`, '_blank');
    const btn = form.querySelector('button');
    btn.textContent = '✓ Перенаправление в WhatsApp...';
    btn.style.background = '#25D366';
    setTimeout(() => { btn.textContent = 'Отправить заявку →'; btn.style.background = ''; form.reset(); }, 3000);
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.srv, .why').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-10px) perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
