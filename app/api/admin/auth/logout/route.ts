import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST() {
  try {
    await deleteSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem.' },
      { status: 500 }
    )
  }
}
