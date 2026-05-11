# PRD — Wedding Invitation Website
> Product Requirements Document untuk AI Agent

---

## 1. Overview

**Nama Produk:** Website Undangan Pernikahan  
**Tipe:** Single-page application (SPA) atau multi-section scroll  
**Target Pengguna:** Tamu undangan (mayoritas mobile, WA-first)  
**Tujuan Utama:** Menyampaikan undangan secara digital, mengumpulkan RSVP, dan menjadi kenangan digital pasangan

---

## 2. Konsep Desain Tersedia

Agent wajib memilih SATU konsep dan konsisten di seluruh output.

### Konsep A — Romantic Botanical Luxury (Default)
- **Mood:** Hangat, romantis, organik, mewah
- **Warna:** `#F5ECD7` `#2C3E2D` `#C9A84C` `#C4857A` `#8A9E7E`
- **Font:** Great Vibes (display) + Playfair Display (heading) + Lora (body)
- **Elemen khas:** Ilustrasi daun & bunga SVG, ornamen emas, animated petals
- **Cocok untuk:** Pernikahan outdoor, garden party, rustic elegant

### Konsep B — Art Deco Glamour
- **Mood:** Mewah, elegan, berkarakter kuat, 1920s vibes
- **Warna:** `#1A1A1A` `#C9A84C` `#F5E6C8` `#8B7355` `#2D2D2D`
- **Font:** Cormorant Garamond (display) + Josefin Sans (heading) + EB Garamond (body)
- **Elemen khas:** Geometric border, pola chevron, garis simetris emas, pattern hexagon
- **Cocok untuk:** Ballroom, venue mewah, black-tie event

### Konsep C — Minimalist Japanese (Japandi)
- **Mood:** Bersih, tenang, haiku, mindful
- **Warna:** `#FAFAF8` `#1C1C1C` `#E8423C` `#C8B8A2` `#6B7B6E`
- **Font:** Noto Serif JP (display) + DM Sans (heading) + Noto Sans (body)
- **Elemen khas:** Banyak whitespace, garis tipis, ornamen sakura minimalis, satu aksen merah bold
- **Cocok untuk:** Pernikahan intimate, venue modern, konsep simple

### Konsep D — Tropical Bali
- **Mood:** Hangat, lokal, natural, festif
- **Warna:** `#E8C49A` `#3D5A3E` `#C45C26` `#F0E6D3` `#8B4513`
- **Font:** Abril Fatface (display) + Nunito (heading) + Source Serif 4 (body)
- **Elemen khas:** Motif batik/tenun sebagai texture, daun monstera & palm, palet tanah
- **Cocok untuk:** Outdoor Bali-style, garden, beach wedding

### Konsep E — Celestial Night
- **Mood:** Mistis, romantis, dramatis, luar biasa
- **Warna:** `#0D1B2A` `#C0C0C0` `#7B5EA7` `#E8D5B7` `#1B3A5C`
- **Font:** Cinzel Decorative (display) + Raleway (heading) + Merriweather (body)
- **Elemen khas:** Bintang & bulan sabit SVG, particle stars JS, gradient langit malam, shimmer effect
- **Cocok untuk:** Evening/malam, venue indoor mewah, tema romantis dramatis

### Konsep F — Modern Serif Editorial
- **Mood:** Editorial, bersih, sophisticated, contemporary
- **Warna:** `#F8F5F0` `#1A1A1A` `#8A7E6E` `#D4C4B0` `#4A4A4A`
- **Font:** Freight Display Pro / Bodoni Moda (display) + Inter (heading) + Freight Text (body)
- **Elemen khas:** Layout asimetris, foto full-bleed, tipografi besar bold, minimal ornamen
- **Cocok untuk:** Urban chic, modern venue, pasangan dengan selera kontemporer

---

## 3. Fitur Wajib (Must Have)

| ID | Fitur | Prioritas |
|---|---|---|
| F01 | Hero section dengan nama pasangan & tanggal | P0 |
| F02 | Countdown timer real-time | P0 |
| F03 | Profil singkat kedua pengantin & keluarga | P0 |
| F04 | Jadwal acara (akad + resepsi) | P0 |
| F05 | Lokasi + embed Google Maps | P0 |
| F06 | Form RSVP (nama, jumlah, kehadiran, pesan) | P0 |
| F07 | Wall ucapan & doa dari tamu | P0 |
| F08 | Galeri foto prewedding | P1 |
| F09 | Amplop digital (no. rekening + salin) | P1 |
| F10 | Musik background (toggle on/off) | P1 |
| F11 | Animasi masuk halaman (entrance animation) | P1 |
| F12 | Responsif mobile-first | P0 |
| F13 | Open Graph meta tags (share WA) | P0 |
| F14 | Loading screen / splash screen | P2 |
| F15 | Protokol kesehatan (opsional) | P2 |

---

## 4. Fitur Opsional (Nice to Have)

- QR Code lokasi venue
- Live streaming embed (YouTube/Zoom)
- Fitur "Bagikan Undangan" ke tamu lain
- Multi-bahasa (Indonesia + English)
- Animasi konfeti setelah submit RSVP
- Filter galeri (by moment/lokasi)
- Story timeline pasangan (how we met)

---

## 5. Halaman / Section Struktur

```
/ (root)
├── #hero           ← Layar pertama, nama + countdown
├── #opening        ← Teks pembuka undangan
├── #couple         ← Profil pengantin
├── #story          ← Kisah cinta (opsional)
├── #event          ← Jadwal acara
├── #venue          ← Lokasi & peta
├── #gallery        ← Foto prewedding
├── #gift           ← Amplop digital
├── #rsvp           ← Form konfirmasi
├── #wishes         ← Wall ucapan
└── #footer         ← Musik, credit
```

---

## 6. Performa Target

| Metrik | Target |
|---|---|
| First Contentful Paint | < 1.5 detik |
| Largest Contentful Paint | < 2.5 detik |
| Time to Interactive | < 3.5 detik |
| Mobile PageSpeed Score | > 80 |
| Ukuran bundle total | < 500KB (tanpa gambar) |
| Gambar | WebP, lazy loaded, max 200KB/foto |

---

## 7. Browser & Device Support

- iOS Safari 15+
- Android Chrome 100+
- Desktop Chrome / Firefox / Safari (latest)
- Viewport: mulai dari 375px hingga 1440px

---

## 8. Deliverable Agent

Agent harus menghasilkan:
1. `index.html` atau struktur Next.js yang siap dijalankan
2. CSS / Tailwind config sesuai design tokens
3. Semua komponen lengkap dan terkoneksi
4. Konfigurasi Supabase / Firebase (jika pakai backend)
5. File `.env.example` untuk environment variables
6. README deploy instructions
