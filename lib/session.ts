import crypto from 'crypto'
import { cookies } from 'next/headers'

const ALGORITHM = 'aes-256-cbc'
const IV_LENGTH = 16
const COOKIE_NAME = 'admin_session'

// Ensure we have a valid key length of 32 bytes (256 bits)
function getSecretKey() {
  const secret = process.env.SESSION_SECRET || 'a_fallback_secret_must_be_32_chars_long!!'
  return crypto.createHash('sha256').update(secret).digest()
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

export function decrypt(text: string): string | null {
  try {
    const parts = text.split(':')
    const ivHex = parts.shift()
    const encryptedText = parts.join(':')
    if (!ivHex || !encryptedText) return null

    const iv = Buffer.from(ivHex, 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    console.error('Decryption failed:', err)
    return null
  }
}

export async function createSession(email: string) {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const sessionData = JSON.stringify({ email, expires: expiresAt })
  const encryptedSession = encrypt(sessionData)
  
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)
  if (!sessionCookie) return false

  const decrypted = decrypt(sessionCookie.value)
  if (!decrypted) return false

  try {
    const session = JSON.parse(decrypted)
    if (session.expires > Date.now()) {
      return true
    }
  } catch {
    return false
  }

  return false
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
