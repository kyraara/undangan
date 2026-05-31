import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'

export async function GET() {
  try {
    const isAuthenticated = await verifySession()
    return NextResponse.json({ authenticated: isAuthenticated })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json(
      { authenticated: false, error: 'Terjadi kesalahan sistem.' },
      { status: 500 }
    )
  }
}
