/* ============================================================
   KALA REAL ESTATE — script.js
   Animasi, interaksi navbar, counter, tabs, form, dll.
   ============================================================ */

/* ── 1. NAVBAR scroll effect + hamburger ── */
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

// Tutup menu saat klik link
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── 2. ACTIVE NAV LINK saat scroll ── */
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

/* ── 3. REVEAL ON SCROLL (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 4. COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
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

/* ── 5. SEARCH TABS (Beli / Sewa di hero) ── */
document.querySelectorAll('[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.search-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── 6. PRICE TABS (Beli / Sewa di section Harga) ── */
document.querySelectorAll('[data-ptab]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update tab style
    btn.closest('.price-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Toggle grid
    const tab = btn.dataset.ptab;
    document.getElementById('price-beli').classList.toggle('hidden', tab !== 'beli');
    document.getElementById('price-sewa').classList.toggle('hidden', tab !== 'sewa');

    // Re-trigger reveal on newly visible cards
    document.querySelectorAll('#price-' + tab + ' .reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => revealObserver.observe(el), 50);
    });
  });
});

/* ── 7. SPEC TABS (Spring Villa / River Side / Lily) ── */
document.querySelectorAll('.spec-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.spec;
    document.querySelectorAll('.spec-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('spec-' + target);
    if (panel) {
      panel.classList.add('active');
      // Re-trigger reveal
      panel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => {
          el.classList.add('visible');
        }, 80);
      });
    }
  });
});

/* ── 8. FORM SUBMISSION ── */
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

  // Simulasi pengiriman (ganti dengan fetch ke backend / Formspree)
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  setTimeout(() => {
    note.textContent = '✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.';
    note.className = 'form-note success';
    btn.textContent = 'Kirim Pesan';
    btn.disabled = false;

    // Reset form
    ['form-name','form-email','form-wa','form-prop','form-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Hilangkan pesan setelah 5 detik
    setTimeout(() => { note.textContent = ''; }, 5000);
  }, 1400);

  /* ── ✏️ EDIT: Untuk integrasi Formspree, ganti blok setTimeout di atas dengan:
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, message: msg })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      note.textContent = '✅ Pesan berhasil dikirim!';
      note.className = 'form-note success';
    }
  })
  .catch(() => {
    note.textContent = '❌ Gagal mengirim. Coba lagi.';
    note.className = 'form-note error';
  })
  .finally(() => { btn.textContent = 'Kirim Pesan'; btn.disabled = false; });
  ── */
}

/* ── 9. SMOOTH SCROLL untuk link anchor ── */
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

/* ── 10. BACK TO TOP ── */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 11. WISHLIST toggle (simpan favorit) ── */
document.querySelectorAll('.wishlist-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const svg = this.querySelector('svg');
    const isActive = svg.style.fill === 'rgb(239, 68, 68)';
    svg.style.fill = isActive ? 'none' : '#ef4444';
    svg.style.stroke = isActive ? 'currentColor' : '#ef4444';
    this.style.background = isActive ? '' : '#fee2e2';
  });
});

/* ── 12. SEARCH PROPERTY (placeholder) ── */
document.querySelector('.search-btn')?.addEventListener('click', () => {
  const loc  = document.querySelector('.search-fields input')?.value || '';
  /* ✏️ EDIT: Hubungkan ke sistem pencarian / filter properti Anda */
  if (loc) {
    alert(`Mencari properti di: ${loc}\n\n(Hubungkan tombol ini ke sistem pencarian Anda di script.js)`);
  } else {
    alert('Masukkan lokasi untuk mencari properti.');
  }
});
