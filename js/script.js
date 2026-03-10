/* ============================================================
   ALEX CHEN — PORTFOLIO | script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── HAMBURGER MENU ─────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.navbar__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      // Stagger siblings inside grids/lists
      const parent = el.parentElement;
      const siblings = parent ? parent.querySelectorAll('.reveal') : [];
      const idx = Array.from(siblings).indexOf(el);
      if (idx > 0 && idx < 8) {
        el.style.transitionDelay = `${idx * 0.08}s`;
      }
      revealObserver.observe(el);
    });
  }

  /* ── SKILL BAR ANIMATION ────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-box__bar');
  if (skillBars.length > 0) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('animated'), 200);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => barObserver.observe(bar));
  }

  /* ── CONTACT FORM ───────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      }, 1200);
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── NAVBAR SCROLL STYLE ────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.style.background = 'rgba(13,13,13,0.97)';
      } else {
        navbar.style.background = 'rgba(13,13,13,0.85)';
      }
    }, { passive: true });
  }

});
