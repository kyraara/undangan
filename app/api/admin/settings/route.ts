import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'
import { saveConfig } from '@/lib/get-config'

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { groom, bride, events, hashtag, rsvpDeadline, rsvpDeadlineDays, bankAccounts, music, gallery, hero, story, concept, socialMedia } = body

    if (!groom?.name || !bride?.name || !events?.length) {
      return NextResponse.json(
        { success: false, error: 'Data pengantin dan detail acara wajib diisi.' },
        { status: 400 }
      )
    }

    await saveConfig({
      groom,
      bride,
      events,
      hashtag: hashtag || '#HappyWedding',
      rsvpDeadline: rsvpDeadline || '2026-07-05',
      rsvpDeadlineDays: Number(rsvpDeadlineDays || 7),
      bankAccounts: bankAccounts || [],
      music: {
        src: music?.src || '/audio/background.mp3',
        title: music?.title || 'Background Music',
        autoplay: Boolean(music?.autoplay),
      },
      gallery: gallery || [],
      hero: {
        image: hero?.image || '/images/gallery/hero.jpg',
        videoMobile: hero?.videoMobile || '',
        tagline: hero?.tagline || '',
      },
      story: story || [],
      concept: concept || 'A',
      socialMedia: socialMedia || { groom: [], bride: [] },
    } as any)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update config:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan perubahan konfigurasi.' },
      { status: 500 }
    )
  }
}
