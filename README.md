# 🏠 Kala Real Estate — Dokumentasi Website

Website real estate statis yang modern, responsif, dan siap deploy ke Vercel.

---

## 📁 Struktur File

```
kala-real-estate/
├── index.html          ← Struktur halaman utama (semua konten ada di sini)
├── style.css           ← Semua tampilan & animasi CSS
├── script.js           ← Semua interaksi JavaScript
├── vercel.json         ← Konfigurasi deployment Vercel
├── images/             ← 📸 FOLDER GAMBAR — ISI INI!
│   ├── hero-bg.jpg         Hero background utama
│   ├── about-main.jpg      Foto di section Tentang
│   ├── property1.jpg       Foto Spring Villa
│   ├── property2.jpg       Foto River Side
│   ├── property3.jpg       Foto Lily Residence
│   ├── spec-villa.jpg      Foto spesifikasi Spring Villa
│   ├── spec-riverside.jpg  Foto spesifikasi River Side
│   ├── spec-lily.jpg       Foto spesifikasi Lily Residence
│   ├── avatar1.jpg         Foto testimoni / badge pelanggan 1
│   ├── avatar2.jpg         Foto testimoni / badge pelanggan 2
│   └── avatar3.jpg         Foto testimoni / badge pelanggan 3
└── README.md           ← Dokumentasi ini
```

---

## 🎨 Panduan Edit Konten

Semua area yang perlu diedit ditandai dengan komentar `✏️ EDIT` di dalam file.

### 1. Warna Brand (`style.css` — baris ~8)
```css
:root {
  --teal:   #2b6475;   /* Warna utama (hero, navbar) */
  --yellow: #f5e642;   /* Warna aksen (tombol, badge) */
}
```
Ubah kode hex sesuai warna brand Anda.

### 2. Logo & Nama Perusahaan (`index.html`)
Cari teks `Kala` dan ganti dengan nama perusahaan Anda.

### 3. Hero Section
- **Gambar hero** → ganti `images/hero-bg.jpg`
- **Judul** → cari `Temukan Properti Impian Anda`
- **Subjudul** → cari paragraf di bawah `hero-sub`
- **Badge pelanggan** → cari `55K+ Pelanggan`

### 4. Menambah Properti Baru
Di section **Listing Terbaru** & **Harga**, salin blok `.listing-card` atau `.price-card`:
```html
<div class="listing-card reveal delay-X">
  <img src="images/FOTO_BARU.jpg" alt="Nama Properti" class="card-img" />
  <div class="card-body">
    <!-- ... isi detail properti ... -->
  </div>
</div>
```

### 5. Spesifikasi Properti
Untuk menambah tab spesifikasi baru:
1. Tambah tombol di `.spec-tabs`:
   ```html
   <button class="spec-tab" data-spec="namaID">Nama Properti</button>
   ```
2. Tambah panel:
   ```html
   <div class="spec-panel" id="spec-namaID">
     <!-- isi detail spesifikasi -->
   </div>
   ```

### 6. Harga
- Edit angka di `.price-num` untuk setiap kartu harga.
- Tambah/hapus item di `.price-features`.

### 7. Kontak
- **Nomor telepon** → cari `+62 800 1234 567`
- **Email** → cari `halo@kala.id`
- **Alamat** → cari `Jl. Sudirman No. 88`

### 8. Testimonial
Salin blok `.testi-card` dan ubah isi teks + foto avatar.

---

## 📸 Panduan Gambar

| File                  | Ukuran Ideal       | Keterangan              |
|-----------------------|--------------------|-------------------------|
| `hero-bg.jpg`         | 1920×1080px        | Background hero utama   |
| `about-main.jpg`      | 800×600px          | Foto section Tentang    |
| `property1/2/3.jpg`   | 800×500px          | Foto listing properti   |
| `spec-*.jpg`          | 800×550px          | Foto detail spesifikasi |
| `avatar1/2/3.jpg`     | 200×200px          | Foto profil (persegi)   |

**Tips:**
- Kompres gambar di [squoosh.app](https://squoosh.app) sebelum upload
- Format disarankan: `.jpg` untuk foto, `.webp` untuk performa terbaik
- Jika belum ada gambar, website akan menampilkan placeholder berwarna teal

---

## 🔌 Integrasi Form Kontak

### Opsi A: Formspree (Gratis, mudah)
1. Daftar di [formspree.io](https://formspree.io)
2. Buat form baru, salin Form ID (contoh: `xpwzabcd`)
3. Di `script.js`, ganti bagian `setTimeout` di fungsi `handleFormSubmit()` dengan:
```javascript
fetch('https://formspree.io/f/xpwzabcd', {
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
```

### Opsi B: WhatsApp langsung
Di `script.js`, ganti fungsi `handleFormSubmit()` dengan:
```javascript
const waNumber = '6281234567890'; // Ganti nomor WhatsApp Anda
const text = `Halo Kala, saya ${name} ingin menanyakan properti.\n\n${msg}`;
window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
```

---

## 🚀 Cara Deploy ke Vercel

### Metode 1: Vercel CLI (Disarankan)
```bash
# Install Vercel CLI
npm install -g vercel

# Masuk ke folder project
cd kala-real-estate

# Deploy
vercel

# Ikuti instruksi: login, pilih akun, nama project
# Setelah selesai, URL live akan ditampilkan
```

### Metode 2: Upload via Website
1. Buka [vercel.com](https://vercel.com) → Login
2. Klik **"Add New Project"**
3. Klik **"Import Git Repository"** ATAU drag-drop folder project
4. Klik **Deploy** — selesai!

### Metode 3: GitHub + Auto-deploy
1. Push project ke GitHub
2. Di Vercel, klik **"Import from GitHub"**
3. Pilih repository → Deploy
4. Setiap kali push ke `main`, Vercel auto-deploy

---

## ⚙️ Menambah Halaman Baru

Karena ini website statis satu halaman (single-page), navigasi menggunakan scroll ke section.

Untuk menambah section baru:
1. Tambah tombol nav di navbar: `<a href="#namaSection" class="nav-link">Nama</a>`
2. Buat section: `<section class="nama section" id="namaSection">...</section>`
3. Tambah styling di `style.css`

---

## 📱 Breakpoints Responsif (style.css)

| Breakpoint | Target             |
|------------|--------------------|
| `1024px`   | Tablet landscape   |
| `768px`    | Tablet / Mobile    |
| `480px`    | Mobile kecil       |

---

## 💡 Tips Pengembangan Lanjutan

- **Google Maps**: Embed di section kontak dengan `<iframe src="https://maps.google.com/..."/>`
- **Galeri Foto**: Gunakan library [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/) untuk tampilan galeri
- **Animasi lebih**: Tambahkan [AOS](https://michalsnik.github.io/aos/) untuk animasi scroll yang lebih kaya
- **Font Kustom**: Ganti link Google Fonts di `<head>` index.html dan update `--font-display` & `--font-body` di CSS

---

## 📞 Butuh Bantuan?

Cari komentar `✏️ EDIT` di semua file untuk menemukan area yang perlu dikustomisasi.
