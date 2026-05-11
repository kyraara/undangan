# Technical Architecture & Component Spec
> Panduan teknis lengkap untuk agent menghasilkan kode yang konsisten dan production-ready.

---

## 1. Tech Stack Final (Next.js — Direkomendasikan)

```
Runtime         : Node.js 20+
Framework       : Next.js 14 (App Router)
Language        : TypeScript 5
Styling         : Tailwind CSS 3 + CSS Custom Properties
Animation       : Framer Motion 11
Database        : Supabase (PostgreSQL + Realtime)
Deploy          : Vercel
Forms           : React Hook Form + Zod validation
Maps            : Google Maps Embed API (iframe)
Audio           : Howler.js
Image optimasi  : next/image (built-in)
Icons           : Lucide React
```

---

## 2. Struktur Folder Lengkap

```
wedding-invitation/
│
├── app/
│   ├── layout.tsx              ← Root layout: fonts, metadata, providers
│   ├── page.tsx                ← Main page: semua section di-render di sini
│   ├── globals.css             ← CSS variables & base styles
│   └── api/
│       ├── rsvp/
│       │   └── route.ts        ← POST /api/rsvp
│       └── wishes/
│           └── route.ts        ← POST /api/wishes, GET /api/wishes
│
├── components/
│   ├── layout/
│   │   ├── LoadingScreen.tsx   ← Splash screen animasi awal
│   │   └── MusicPlayer.tsx     ← Floating music toggle
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── OpeningSection.tsx
│   │   ├── CoupleSection.tsx
│   │   ├── StorySection.tsx    ← opsional
│   │   ├── EventSection.tsx
│   │   ├── VenueSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── GiftSection.tsx
│   │   ├── RSVPSection.tsx
│   │   ├── WishesSection.tsx
│   │   └── FooterSection.tsx
│   │
│   └── ui/
│       ├── CountdownTimer.tsx
│       ├── FloralDivider.tsx
│       ├── SectionTitle.tsx
│       ├── AnimatedReveal.tsx  ← Wrapper animasi scroll
│       ├── GalleryGrid.tsx
│       ├── WishCard.tsx
│       └── CopyButton.tsx
│
├── lib/
│   ├── supabase.ts             ← Supabase client
│   ├── config.ts               ← Semua data wedding (nama, tanggal, dsb)
│   └── utils.ts                ← Helper functions
│
├── types/
│   └── index.ts                ← TypeScript interfaces
│
├── public/
│   ├── images/
│   │   ├── couple/             ← Foto pengantin
│   │   ├── gallery/            ← Foto prewedding
│   │   ├── decorations/        ← SVG ornamen & botanik
│   │   └── og-cover.jpg        ← OG image 1200×630
│   └── audio/
│       └── background.mp3
│
├── .env.local                  ← Environment variables (tidak di-commit)
├── .env.example                ← Template env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. File Config Utama

### `lib/config.ts` — WAJIB DIISI
```typescript
export const weddingConfig = {
  groom: {
    name: 'Ahmad Fauzi',
    nameShort: 'Ahmad',
    father: 'Bapak Hendra',
    mother: 'Ibu Ratna',
    childOrder: 'Putra pertama',
    photo: '/images/couple/groom.jpg',
  },
  bride: {
    name: 'Siti Rahayu',
    nameShort: 'Siti',
    father: 'Bapak Wahyu',
    mother: 'Ibu Dewi',
    childOrder: 'Putri kedua',
    photo: '/images/couple/bride.jpg',
  },
  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      date: '2025-07-12',
      time: '08:00',
      timeEnd: '10:00',
      venue: 'Masjid Al-Ikhlas',
      address: 'Jl. Sudirman No. 12, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com/?q=...',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=...',
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      date: '2025-07-12',
      time: '11:00',
      timeEnd: '15:00',
      venue: 'Ballroom Hotel Mulia',
      address: 'Jl. Asia Afrika No. 8, Jakarta',
      mapsUrl: 'https://maps.google.com/?q=...',
      mapsEmbed: 'https://www.google.com/maps/embed?pb=...',
    },
  ],
  hashtag: '#AhmadDanSiti',
  rsvpDeadline: '2025-07-05',
  bankAccounts: [
    {
      bank: 'BCA',
      number: '1234567890',
      holder: 'Ahmad Fauzi',
    },
    {
      bank: 'Mandiri',
      number: '0987654321',
      holder: 'Siti Rahayu',
    },
  ],
  music: {
    src: '/audio/background.mp3',
    title: 'A Thousand Years — Piano Cover',
    autoplay: false,
  },
  gallery: [
    { src: '/images/gallery/1.jpg', alt: 'Prewedding 1' },
    { src: '/images/gallery/2.jpg', alt: 'Prewedding 2' },
    // ... tambahkan sesuai jumlah foto
  ],
  concept: 'A', // A | B | C | D | E | F — pilih konsep dari PRD
} as const;
```

### `.env.example`
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Maps (opsional, jika pakai API bukan iframe)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key

# App URL
NEXT_PUBLIC_APP_URL=https://namadomain.com
```

---

## 4. TypeScript Interfaces

```typescript
// types/index.ts

export interface RSVPEntry {
  id: string;
  nama: string;
  jumlah_tamu: number;
  kehadiran: 'hadir' | 'tidak_hadir' | 'belum_pasti';
  pesan?: string;
  created_at: string;
}

export interface WishEntry {
  id: string;
  nama: string;
  pesan: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  timeEnd: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbed: string;
}

export interface BankAccount {
  bank: string;
  number: string;
  holder: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}
```

---

## 5. Spesifikasi Komponen

### `CountdownTimer.tsx`
```
Props    : targetDate: string (ISO format "2025-07-12T08:00:00")
State    : { days, hours, minutes, seconds }
Behavior : Update setiap detik via setInterval
Display  : 4 kotak (Hari | Jam | Menit | Detik)
Edge case: Jika hari H sudah lewat, tampilkan "Hari Istimewa Telah Tiba 🎉"
Animation: Flip/fade saat angka berubah
```

### `RSVPSection.tsx`
```
Library  : React Hook Form + Zod
Fields   : nama (required), jumlah_tamu (1–10), kehadiran (required), pesan (optional)
Submit   : POST ke /api/rsvp → simpan ke Supabase tabel rsvp
Success  : Tampilkan pesan terima kasih sesuai status kehadiran
Error    : Inline validation message per field
Loading  : Disable tombol + spinner saat submitting
```

### `WishesSection.tsx`
```
Fetch    : GET /api/wishes → load dari Supabase
Realtime : Subscribe ke Supabase Realtime untuk live update
Render   : Card grid, newest first
Form     : nama + pesan, POST ke /api/wishes
Empty    : Tampilkan empty state jika belum ada ucapan
Limit    : max 500 karakter per pesan
```

### `GallerySection.tsx`
```
Layout   : CSS Grid masonry (3 kolom desktop, 2 kolom tablet, 1 mobile)
Lightbox : Klik foto → modal lightbox dengan navigasi prev/next
Images   : next/image dengan lazy loading
Hover    : Scale + overlay effect
```

### `AnimatedReveal.tsx`
```
Library  : Framer Motion
Behavior : Elemen muncul saat masuk viewport (IntersectionObserver via Framer)
Variants : fadeUp (default), fadeIn, slideLeft, slideRight, scaleIn
Props    : delay?: number, duration?: number, variant?: string
```

### `MusicPlayer.tsx`
```
Library  : Howler.js
Position : Fixed bottom-right (z-index: 400)
State    : isPlaying (default: false)
Behavior : Mulai play hanya setelah user interaksi pertama (klik/scroll)
Visual   : Tombol bulat, icon ♪ / ⏸ dengan animasi pulse saat playing
```

### `LoadingScreen.tsx`
```
Trigger  : Tampil saat page pertama kali load
Duration : 2–3 detik
Content  : Inisial nama pasangan + animasi (sesuai konsep)
Exit     : Fade out sebelum konten utama muncul
```

---

## 6. API Routes

### `POST /api/rsvp`
```typescript
// Validasi: nama, jumlah_tamu, kehadiran wajib diisi
// Response: { success: true, data } atau { success: false, error }
// Rate limit: 1 submission per IP per 10 menit (gunakan Upstash/middleware)
```

### `POST /api/wishes`
```typescript
// Validasi: nama & pesan wajib, max 500 karakter
// Response: { success: true, data }
// Sanitasi: strip HTML tags dari input
```

### `GET /api/wishes`
```typescript
// Response: { data: WishEntry[], count: number }
// Order: created_at DESC
// Limit: 50 terbaru (pagination jika perlu)
```

---

## 7. Database Schema (Supabase)

```sql
-- Tabel RSVP
CREATE TABLE rsvp (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama        TEXT NOT NULL CHECK (char_length(nama) <= 100),
  jumlah_tamu INTEGER NOT NULL DEFAULT 1 CHECK (jumlah_tamu BETWEEN 1 AND 10),
  kehadiran   TEXT NOT NULL CHECK (kehadiran IN ('hadir', 'tidak_hadir', 'belum_pasti')),
  pesan       TEXT CHECK (char_length(pesan) <= 500),
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Ucapan
CREATE TABLE ucapan (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama       TEXT NOT NULL CHECK (char_length(nama) <= 100),
  pesan      TEXT NOT NULL CHECK (char_length(pesan) BETWEEN 1 AND 500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE rsvp   ENABLE ROW LEVEL SECURITY;
ALTER TABLE ucapan ENABLE ROW LEVEL SECURITY;

-- Policy: siapa pun bisa insert, hanya service role yang bisa read rsvp
CREATE POLICY "Public insert rsvp"   ON rsvp   FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public insert ucapan" ON ucapan  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public read ucapan"   ON ucapan  FOR SELECT TO anon USING (true);
-- RSVP hanya bisa dibaca oleh admin (service role), bukan anon
```

---

## 8. Animasi Masuk Halaman (Sesuai Konsep)

### Konsep A & D — Petal / Leaf Fall
```javascript
// Gunakan canvas atau div absolut dengan CSS animation
// Buat 20–30 elemen .petal dengan animasi jatuh diagonal
// Randomize: delay, durasi, posisi x awal, ukuran, opacity
```

### Konsep B — Art Deco Reveal
```javascript
// Garis-garis emas muncul dari tengah ke luar (scale animation)
// Nama pasangan reveal satu huruf per huruf
// Stagger delay antar elemen
```

### Konsep C — Ink Wash (Minimal)
```javascript
// Elemen muncul dengan opacity 0→1 dan translateY 20px→0
// Delay sequential, durasi panjang (1s+)
// Sangat halus, tidak mencolok
```

### Konsep E — Star Particles
```javascript
// Gunakan particles.js atau tsparticles
// Config: dots kecil berwarna silver/putih bergerak lambat
// Density rendah agar tidak menganggu readability
```

---

## 9. Performance Checklist untuk Agent

```
□ Semua gambar pakai next/image dengan width & height eksplisit
□ Gallery images lazy loaded (loading="lazy")
□ Font menggunakan next/font/google (zero layout shift)
□ Animasi pakai will-change: transform (bukan width/height)
□ Supabase realtime hanya di-subscribe jika section visible
□ Music file < 5MB, format MP3
□ OG image 1200×630px, format JPG, < 200KB
□ CSS variables didefinisikan di :root, bukan inline style
□ Tidak ada console.error di production
□ Loading skeleton saat RSVP/Wishes data loading
```

---

## 10. Deploy ke Vercel

```bash
# 1. Push ke GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/username/wedding
git push -u origin main

# 2. Import di vercel.com → New Project → Import dari GitHub

# 3. Set environment variables di Vercel dashboard:
#    NEXT_PUBLIC_SUPABASE_URL
#    NEXT_PUBLIC_SUPABASE_ANON_KEY
#    NEXT_PUBLIC_APP_URL

# 4. Deploy otomatis setiap push ke main
```

**Domain Custom (opsional):**
```
vercel.com → Project → Settings → Domains
→ Tambah domain: namapengantin.com
→ Update DNS di registrar: CNAME → cname.vercel-dns.com
```
