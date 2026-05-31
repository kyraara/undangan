import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import crypto from 'crypto'
import { verifySession } from '@/lib/session'

export async function GET() {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const socialMedia = await query(
      'SELECT * FROM social_media ORDER BY person, platform'
    ) as Array<{
      id: string
      person: 'groom' | 'bride'
      platform: string
      handle: string
      url: string
    }>

    // Group by person
    const grouped = {
      groom: socialMedia.filter(sm => sm.person === 'groom'),
      bride: socialMedia.filter(sm => sm.person === 'bride')
    }

    return NextResponse.json({ success: true, data: grouped })
  } catch (error) {
    console.error('Failed to fetch social media:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data media sosial.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { groom = [], bride = [] } = body

    // Delete existing entries
    await query('DELETE FROM social_media')

    // Insert groom social media
    for (const sm of groom) {
      if (sm.platform && sm.handle) {
        const id = crypto.randomUUID()
        await query(
          'INSERT INTO social_media (id, person, platform, handle, url) VALUES (?, ?, ?, ?, ?)',
          [id, 'groom', sm.platform, sm.handle, sm.url || null]
        )
      }
    }

    // Insert bride social media
    for (const sm of bride) {
      if (sm.platform && sm.handle) {
        const id = crypto.randomUUID()
        await query(
          'INSERT INTO social_media (id, person, platform, handle, url) VALUES (?, ?, ?, ?, ?)',
          [id, 'bride', sm.platform, sm.handle, sm.url || null]
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update social media:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan media sosial.' },
      { status: 500 }
    )
  }
}
