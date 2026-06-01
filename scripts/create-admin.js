/**
 * Script untuk membuat admin user di database.
 *
 * Cara pakai:
 *   node scripts/create-admin.js [email] [password] [name]
 *
 * Contoh:
 *   node scripts/create-admin.js admin@wedding.com rahasia123 "Admin Wedding"
 */

const crypto = require('crypto')
const mysql = require('mysql2/promise')
try { require('dotenv').config() } catch (e) { /* dotenv optional, env vars may already be set */ }

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  const email    = process.argv[2] || 'admin@wedding.com'
  const password = process.argv[3] || 'admin1234'
  const name     = process.argv[4] || 'Admin'

  const id           = crypto.randomUUID()
  const passwordHash = await hashPassword(password)

  let conn
  try {
    conn = await mysql.createConnection({
      host:     process.env.MYSQL_HOST     || 'localhost',
      user:     process.env.MYSQL_USER     || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'wedding',
      port:     Number(process.env.MYSQL_PORT || 3306),
    })

    // Cek apakah email sudah ada
    const [existing] = await conn.execute(
      'SELECT id FROM admin_users WHERE email = ?', [email]
    )
    if (existing.length > 0) {
      // Update password jika sudah ada
      await conn.execute(
        'UPDATE admin_users SET password_hash = ?, name = ? WHERE email = ?',
        [passwordHash, name, email]
      )
      console.log(`✅ Password admin "${email}" berhasil diperbarui.`)
    } else {
      await conn.execute(
        'INSERT INTO admin_users (id, email, password_hash, name) VALUES (?, ?, ?, ?)',
        [id, email, passwordHash, name]
      )
      console.log(`✅ Admin user berhasil dibuat!`)
      console.log(`   Email   : ${email}`)
      console.log(`   Password: ${password}`)
      console.log(`   Name    : ${name}`)
    }
  } catch (err) {
    console.error('❌ Gagal terhubung ke database:', err.message)
    console.error('   Pastikan .env sudah dikonfigurasi dan schema sudah dijalankan (sql/schema.sql)')
    process.exit(1)
  } finally {
    if (conn) await conn.end()
  }
}

main()
