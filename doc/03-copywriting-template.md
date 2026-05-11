# Copywriting Template — Wedding Invitation Website
> Semua teks yang dibutuhkan agent untuk mengisi konten website.
> Agent wajib mengganti placeholder [dalam kurung siku] dengan data nyata dari pengguna.
> Sediakan fallback teks default agar agent bisa langsung render tanpa data.

---

## 🔧 Data Pasangan (Isi sebelum generate)

```yaml
groom:
  name_full:    "[Nama Lengkap Pengantin Pria]"
  name_short:   "[Nama Panggilan Pria]"        # contoh: Ahmad
  name_display: "[Nama Tampilan]"              # contoh: Ahmad Fauzi, S.T.
  father:       "[Nama Ayah Pria]"
  mother:       "[Nama Ibu Pria]"
  child_order:  "[Putra ke-N]"                 # contoh: Putra pertama

bride:
  name_full:    "[Nama Lengkap Pengantin Wanita]"
  name_short:   "[Nama Panggilan Wanita]"
  name_display: "[Nama Tampilan]"
  father:       "[Nama Ayah Wanita]"
  mother:       "[Nama Ibu Wanita]"
  child_order:  "[Putri ke-N]"

event:
  akad_date:    "[Hari, DD Bulan YYYY]"         # contoh: Sabtu, 12 Juli 2025
  akad_time:    "[HH:MM WIB]"                   # contoh: 08:00 WIB
  akad_venue:   "[Nama Tempat Akad]"
  akad_address: "[Alamat Lengkap Akad]"

  resepsi_date:    "[Hari, DD Bulan YYYY]"
  resepsi_time:    "[HH:MM – HH:MM WIB]"
  resepsi_venue:   "[Nama Tempat Resepsi]"
  resepsi_address: "[Alamat Lengkap Resepsi]"

meta:
  hashtag:     "#[NamaPria][NamaWanita]"       # contoh: #AhmadDanSiti
  website_url: "https://[domain].com"
  og_image:    "/og-cover.jpg"
```

---

## 📝 Teks Per Section

### HERO SECTION
```
[Nama Pria] & [Nama Wanita]

Tanggal: [DD · MM · YYYY]
```

**Tagline alternatif (pilih satu):**
- *"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri"*
- *"Dua jiwa, satu janji, selamanya bersama"*
- *"The best love story is ours"*
- *"Dengan penuh syukur dan kebahagiaan, kami mengundang kehadiran Anda"*

---

### OPENING / KALIMAT PEMBUKA

**Versi Formal (Islam):**
```
Bismillahirrahmanirrahim

Assalamu'alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta'ala, 
kami bermaksud menyelenggarakan pernikahan putra-putri kami:
```

**Versi Formal (Umum):**
```
Dengan penuh sukacita dan kebahagiaan,
bersama keluarga kami mengundang Bapak / Ibu / Saudara/i
untuk turut hadir dan memberikan doa restu
pada acara pernikahan putra-putri kami:
```

**Versi Kasual / Modern:**
```
Hai! 👋

Dua orang yang saling jatuh cinta
akhirnya akan menyempurnakan separuh agama mereka.

Kami dengan penuh kebahagiaan mengundangmu
untuk menjadi bagian dari hari istimewa kami.
```

---

### PROFIL PENGANTIN

**Template Pria:**
```
[Nama Lengkap Pria]
Putra [urutan] dari Bapak [Nama Ayah]
dan Ibu [Nama Ibu]
```

**Template Wanita:**
```
[Nama Lengkap Wanita]
Putri [urutan] dari Bapak [Nama Ayah]
dan Ibu [Nama Ibu]
```

**Bio singkat (opsional):**
```
"[Kata-kata singkat dari pengantin — bisa berupa quote favorit, 
 profesi, atau sesuatu yang personal]"
```

---

### JADWAL ACARA

**Akad Nikah:**
```
Akad Nikah
[Hari], [Tanggal Bulan Tahun]
Pukul [HH:MM] WIB

[Nama Venue Akad]
[Alamat Venue]
```

**Resepsi:**
```
Resepsi Pernikahan
[Hari], [Tanggal Bulan Tahun]
Pukul [HH:MM] – [HH:MM] WIB

[Nama Venue Resepsi]
[Alamat Venue]
```

**Countdown heading:**
- *"Menghitung Hari"*
- *"The Big Day Is Coming"*
- *"Hari Istimewa Kami"*

---

### LOKASI

**Heading section:**
- *"Temukan Kami"*
- *"Lokasi Acara"*
- *"Come & Celebrate With Us"*

**Teks tombol:**
- *"Buka di Google Maps"*
- *"Petunjuk Arah"*
- *"Get Directions"*

---

### GALERI FOTO

**Heading:**
- *"Momen Kami"*
- *"Our Story in Frames"*
- *"Prewedding Gallery"*
- *"Sepotong Cerita Kami"*

**Subheading:**
- *"Setiap gambar menyimpan cerita yang tak terlupakan"*
- *"Perjalanan cinta yang diabadikan"*

---

### AMPLOP DIGITAL

**Heading:**
```
Hadiah & Doa
```

**Teks utama:**
```
Kehadiran dan doa restu Anda adalah hadiah 
yang paling berarti bagi kami.

Namun jika Anda ingin memberikan hadiah,
Anda dapat menyampaikannya melalui:
```

**Template rekening:**
```
Bank [Nama Bank]
[Nomor Rekening]
a.n. [Nama Pemilik]
```

**Teks tombol:**
- *"Salin Nomor Rekening"*
- *"Copied! ✓"* (setelah diklik)

---

### RSVP FORM

**Heading:**
- *"Konfirmasi Kehadiran"*
- *"RSVP"*
- *"Apakah Anda Akan Hadir?"*

**Subheading:**
```
Mohon konfirmasi kehadiran Anda 
paling lambat [X] hari sebelum acara.
```

**Label field:**
```
Nama Lengkap          → [text input]
Jumlah Tamu           → [number 1–5]
Konfirmasi Kehadiran  → [radio: Hadir / Tidak Hadir / Belum Pasti]
Pesan untuk Pasangan  → [textarea, opsional]
```

**Pesan sukses:**
```
Terima kasih, [Nama]! 🎉
Kami tidak sabar menunggu kehadiran Anda.
Sampai jumpa di hari istimewa kami!
```

**Pesan jika tidak hadir:**
```
Terima kasih sudah mengkonfirmasi, [Nama].
Kami memahami dan tetap berterima kasih atas
doa dan dukungan Anda. 🙏
```

---

### WALL UCAPAN

**Heading:**
- *"Ucapan & Doa"*
- *"Doa & Harapan"*
- *"Wishes for Us"*

**Subheading:**
```
Tulis doa dan harapanmu untuk perjalanan kami.
Setiap kata adalah berkat yang kami jaga.
```

**Placeholder textarea:**
```
"Sampaikan doa dan harapan terbaikmu untuk kami..."
```

**Teks tombol kirim:**
- *"Kirim Ucapan"*
- *"Send Wishes"*

**Empty state (belum ada ucapan):**
```
Jadilah yang pertama memberikan doa! 🌸
```

---

### FOOTER / CLOSING

**Teks penutup:**
```
Merupakan suatu kehormatan bagi kami 
atas kehadiran Bapak/Ibu/Saudara/i.

Terima kasih atas doa dan restu yang telah diberikan.

Kami yang berbahagia,

[Nama Pria] & [Nama Wanita]
beserta keluarga
```

**Teks musik:**
```
🎵 Memutar musik...
```

**Credit:**
```
Made with ❤️ for [Nama Pria] & [Nama Wanita]
[Tanggal Pernikahan]
```

---

## 🌐 Meta Tags & SEO

```html
<title>[Nama Pria] & [Nama Wanita] — [DD Bulan YYYY]</title>

<meta name="description" content="Dengan penuh kebahagiaan kami mengundang kehadiran Anda di pernikahan [Nama Pria] & [Nama Wanita] pada [Tanggal]." />

<!-- Open Graph (WhatsApp / Facebook) -->
<meta property="og:title" content="Undangan Pernikahan [Nama Pria] & [Nama Wanita]" />
<meta property="og:description" content="[Tanggal] · [Nama Venue] · Bersama kami merayakan hari istimewa ini." />
<meta property="og:image" content="[URL og-image]" />
<meta property="og:url" content="[URL website]" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Undangan Pernikahan [Nama Pria] & [Nama Wanita]" />
<meta name="twitter:image" content="[URL og-image]" />
```

---

## 🎵 Rekomendasi Musik Background

| Judul | Artis | Suasana |
|---|---|---|
| Can't Help Falling in Love | Elvis Presley (instrumental) | Klasik, romantis |
| A Thousand Years | Christina Perri (piano cover) | Emosional, sweet |
| Perfect | Ed Sheeran (instrumental) | Modern, sweet |
| All of Me | John Legend (piano) | Emosional, dalam |
| Bless the Broken Road | (instrumental) | Perjalanan cinta |
| Satu Rasa Cinta | (instrumental lokal) | Indonesia vibes |

> **Catatan teknis:** Gunakan format `.mp3`, ukuran < 5MB. Autoplay memerlukan interaksi user terlebih dahulu (browser policy).

---

## 📋 Checklist Konten Sebelum Launch

- [ ] Nama pengantin (pria & wanita) sudah benar
- [ ] Nama orang tua sudah benar
- [ ] Tanggal & waktu akad sudah benar
- [ ] Tanggal & waktu resepsi sudah benar
- [ ] Alamat venue sudah benar & Google Maps mengarah ke tempat yang tepat
- [ ] Nomor rekening sudah benar
- [ ] Foto prewedding sudah diupload
- [ ] Musik sudah dipilih & berfungsi
- [ ] Deadline RSVP sudah ditentukan
- [ ] Hashtag wedding sudah ditentukan
- [ ] OG image (1200×630px) sudah siap
