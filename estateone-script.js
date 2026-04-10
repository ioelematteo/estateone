document.addEventListener('DOMContentLoaded', () => {

  // ── BAR ANIMATION ON SCROLL ──────────────────────
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          bars.forEach(b => { b.style.width = b.dataset.width + '%'; });
          barObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    barObs.observe(document.getElementById('bars'));
  }

  // ── REVEAL ON SCROLL ─────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => revealObs.observe(r));
  }

  // ── STICKY NAV SHADOW ────────────────────────────
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(255,184,0,0.25)'
      : 'rgba(255,184,0,0.15)';
  }, { passive: true });

  // ── NEWSLETTER FORM ──────────────────────────────
  const nlForm = document.getElementById('nl-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('.nl-input');
      const btn   = nlForm.querySelector('.nl-submit');
      if (!input.value || !input.value.includes('@')) {
        input.style.borderColor = 'rgba(255,80,80,0.6)';
        return;
      }
      btn.textContent = 'Done ✓';
      btn.style.background = '#2a9d45';
      input.value = '';
      input.disabled = true;
      btn.disabled = true;
    });
  }

  // ── CONTACT FORM ─────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2a9d45';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Talk to an Advisor →';
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ── SMOOTH ANCHOR ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
