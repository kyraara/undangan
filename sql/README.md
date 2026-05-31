# Database Setup — Wedding Invitation

## Langkah Setup

### 1. Buat database & tabel

Jalankan `schema.sql` di MySQL client (phpMyAdmin, TablePlus, MySQL Workbench, dsb.):

```sql
SOURCE sql/schema.sql;
```

Atau via terminal:
```bash
mysql -u root -p < sql/schema.sql
```

### 2. Buat admin user pertama

Jalankan script berikut (pastikan `.env` sudah dikonfigurasi):

```bash
node scripts/create-admin.js admin@wedding.com password123 "Admin"
```

Format: `node scripts/create-admin.js [email] [password] [name]`

Untuk mengubah password admin yang sudah ada, jalankan script yang sama dengan email yang sama — password akan diperbarui otomatis.

### 3. Konfigurasi `.env`

Salin `.env.example` ke `.env` dan isi:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=wedding
MYSQL_PORT=3306
SESSION_SECRET=<generated 64-char hex>
```

### 4. Jalankan aplikasi

```bash
pnpm dev
```

---

## Struktur Tabel

| Tabel | Deskripsi |
|-------|-----------|
| `admin_users` | Akun admin panel (email + hashed password) |
| `rsvp` | Konfirmasi kehadiran tamu |
| `ucapan` | Ucapan & doa dari tamu |

## Keamanan Password

Password admin **tidak pernah disimpan dalam bentuk plain text**. 
Menggunakan algoritma `scrypt` (Node.js built-in) dengan salt acak 16 byte — lebih aman dari bcrypt untuk beban kerja tunggal.
