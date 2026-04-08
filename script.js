/* Tarlan Trans Plus — Script */

// Loader
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 1200);
});

// Header scroll
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', scrollY > 50);
    document.getElementById('topBtn').classList.toggle('show', scrollY > 500);
}, { passive: true });

// Burger
const burger = document.getElementById('burger');
const mob = document.getElementById('mob');
burger.addEventListener('click', () => {
    burger.classList.toggle('on');
    mob.classList.toggle('on');
    document.body.style.overflow = mob.classList.contains('on') ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('on');
    mob.classList.remove('on');
    document.body.style.overflow = '';
}));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll animations
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('[data-a]').forEach(el => obs.observe(el));

// Back to top
document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav a');
window.addEventListener('scroll', () => {
    const y = scrollY + 100;
    secs.forEach(s => {
        const link = document.querySelector(`.nav a[href="#${s.id}"]`);
        if (link) link.classList.toggle('active', y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
    });
}, { passive: true });

// Form → WhatsApp
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
