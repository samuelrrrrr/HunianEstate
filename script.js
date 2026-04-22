const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.search-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.querySelectorAll('[data-ptab]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.price-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const tab = btn.dataset.ptab;
    document.getElementById('price-beli').classList.toggle('hidden', tab !== 'beli');
    document.getElementById('price-sewa').classList.toggle('hidden', tab !== 'sewa');

    document.querySelectorAll('#price-' + tab + ' .reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => revealObserver.observe(el), 50);
    });
  });
});

document.querySelectorAll('.spec-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.spec;
    document.querySelectorAll('.spec-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('spec-' + target);
    if (panel) {
      panel.classList.add('active');
      panel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => {
          el.classList.add('visible');
        }, 80);
      });
    }
  });
});

function handleFormSubmit() {
  const name   = document.getElementById('form-name').value.trim();
  const email  = document.getElementById('form-email').value.trim();
  const msg    = document.getElementById('form-msg').value.trim();
  const note   = document.getElementById('form-note');
  const btn    = document.getElementById('send-btn');

  if (!name || !email || !msg) {
    note.textContent = '⚠️ Mohon lengkapi nama, email, dan pesan Anda.';
    note.className = 'form-note error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    note.textContent = '⚠️ Format email tidak valid.';
    note.className = 'form-note error';
    return;
  }

  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    note.textContent = '✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.';
    note.className = 'form-note success';
    btn.textContent = 'Kirim Pesan';
    btn.disabled = false;

    ['form-name','form-email','form-wa','form-prop','form-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    setTimeout(() => { note.textContent = ''; }, 5000);
  }, 1400);

 
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = 80; // tinggi navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const svg = this.querySelector('svg');
    const isActive = svg.style.fill === 'rgb(239, 68, 68)';
    svg.style.fill = isActive ? 'none' : '#ef4444';
    svg.style.stroke = isActive ? 'currentColor' : '#ef4444';
    this.style.background = isActive ? '' : '#fee2e2';
  });
});

document.querySelector('.search-btn')?.addEventListener('click', () => {
  const loc  = document.querySelector('.search-fields input')?.value || '';
  if (loc) {
    alert(`Mencari properti di: ${loc}\n\n(Hubungkan tombol ini ke sistem pencarian Anda di script.js)`);
  } else {
    alert('Masukkan lokasi untuk mencari properti.');
  }
});
