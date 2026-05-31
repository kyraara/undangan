import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { verifySession } from '@/lib/session'

const DIR_MAP: Record<string, string> = {
  couple:  'images/couple',
  gallery: 'images/gallery',
  image:   'images/gallery',
  audio:   'audio',
  video:   'Vidio',
}

const ALLOWED_EXT: Record<string, string[]> = {
  couple:  ['.jpg', '.jpeg', '.png', '.webp'],
  gallery: ['.jpg', '.jpeg', '.png', '.webp'],
  image:   ['.jpg', '.jpeg', '.png', '.webp'],
  audio:   ['.mp3', '.wav', '.ogg'],
  video:   ['.mp4', '.webm'],
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File | null
    const type     = (formData.get('type') as string) || 'image'
    const filename = formData.get('filename') as string | null

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'File tidak ditemukan.' }, { status: 400 })
    }

    const MAX_SIZE: Record<string, number> = {
      couple: 5, gallery: 5, image: 5, audio: 20, video: 100,
    }
    const maxBytes = (MAX_SIZE[type] ?? 5) * 1024 * 1024
    if (file.size > maxBytes) {
      return NextResponse.json(
        { success: false, error: `File terlalu besar. Maks ${MAX_SIZE[type] ?? 5} MB.` },
        { status: 413 },
      )
    }

    const ext     = path.extname(file.name).toLowerCase()
    const allowed = ALLOWED_EXT[type] ?? ALLOWED_EXT['image']
    if (!allowed.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `Format file tidak didukung. Gunakan: ${allowed.join(', ')}` },
        { status: 400 },
      )
    }

    const subDir   = DIR_MAP[type] ?? DIR_MAP['image']
    const baseName = filename
      ? filename.replace(/[^a-zA-Z0-9_-]/g, '-')
      : path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '-')

    const fullDir  = path.join(process.cwd(), 'public', subDir)
    await mkdir(fullDir, { recursive: true })

    const savedName = `${baseName}${ext}`
    const buffer    = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(fullDir, savedName), buffer)

    return NextResponse.json({ success: true, path: `/${subDir}/${savedName}` }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Gagal mengunggah file.' }, { status: 500 })
  }
}
