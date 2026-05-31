import { NextResponse } from 'next/server'
import { createSession } from '@/lib/session'
import { query } from '@/lib/db'
import { verifyPassword } from '@/lib/admin/password'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      )
    }

    // Cek admin_users di database
    const rows = await query<any[]>(
      'SELECT id, email, password_hash, name FROM admin_users WHERE email = ? LIMIT 1',
      [email]
    )

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email atau kata sandi salah.' },
        { status: 401 }
      )
    }

    const user = rows[0]
    const valid = verifyPassword(password, user.password_hash)

    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Email atau kata sandi salah.' },
        { status: 401 }
      )
    }

    await createSession(user.email)
    return NextResponse.json({ success: true, name: user.name })
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem.' },
      { status: 500 }
    )
  }
}
