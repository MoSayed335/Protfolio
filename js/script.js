/* ═══════════════════════════════════════
   script.js — Mohamed Abdelkader Portfolio
═══════════════════════════════════════ */

// ── 1. NAVBAR: scroll effect + hamburger ──────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── 2. ACTIVE NAV LINK on scroll ─────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

// ── 3. INTERSECTION OBSERVER: reveal cards ────────────────────────────────
const revealItems = document.querySelectorAll('.skill-card, .project-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('visible'), delay);
    observer.unobserve(el);
  });
}, { threshold: 0.15 });

revealItems.forEach(el => observer.observe(el));

// ── 4. CONTACT FORM ───────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('nameInput').value.trim();
  const email   = document.getElementById('emailInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormMsg('Please fill in all fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showFormMsg('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with real API call / EmailJS / etc.)
  const btn = contactForm.querySelector('.btn-primary');
  btn.disabled    = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    showFormMsg('✓ Message sent! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    btn.disabled    = false;
    btn.innerHTML   = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
  }, 1500);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMsg(text, type) {
  formMsg.textContent  = text;
  formMsg.className    = `form-msg ${type}`;
  setTimeout(() => { formMsg.className = 'form-msg'; }, 4000);
}

// ── 5. SMOOTH SCROLL for buttons ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── 6. CURSOR GLOW (desktop only) ────────────────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px; border-radius:50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events:none; z-index:0; transform:translate(-50%,-50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── 7. TYPING EFFECT in hero title ───────────────────────────────────────
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const titles  = ['> Backend Developer', '> .NET Specialist', '> API Architect', '> SQL Expert'];
  let tIdx      = 0;
  let cIdx      = 0;
  let deleting  = false;

  function type() {
    const current = titles[tIdx];

    if (!deleting) {
      titleEl.textContent = current.slice(0, cIdx + 1);
      cIdx++;
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      titleEl.textContent = current.slice(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        tIdx     = (tIdx + 1) % titles.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }

  setTimeout(type, 1200);
}