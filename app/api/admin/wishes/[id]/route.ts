import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifySession } from '@/lib/session'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await query('DELETE FROM ucapan WHERE id = ?', [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !['approved', 'pending', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Status tidak valid.' },
        { status: 400 }
      )
    }

    await query('UPDATE ucapan SET status = ? WHERE id = ?', [status, id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    )
  }
}
