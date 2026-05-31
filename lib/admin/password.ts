import crypto from 'crypto'

/**
 * Hash password menggunakan scrypt (aman, built-in Node.js).
 * Format: "salt:hash" (keduanya hex)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verifikasi password terhadap hash yang tersimpan.
 * Menggunakan timingSafeEqual untuk mencegah timing attacks.
 */
export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(':')
    if (!salt || !hash) return false
    const hashBuffer = Buffer.from(hash, 'hex')
    const derivedBuffer = crypto.scryptSync(password, salt, 64)
    return crypto.timingSafeEqual(hashBuffer, derivedBuffer)
  } catch {
    return false
  }
}
