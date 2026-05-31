import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

// Helper to sanitize basic HTML from string
function sanitizeText(text: string) {
  if (!text) return '';
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, pesan } = body;

    // Validation
    if (!nama || !pesan) {
      return NextResponse.json(
        { success: false, error: 'Nama dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    if (pesan.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Pesan tidak boleh lebih dari 500 karakter.' },
        { status: 400 }
      );
    }

    const sanitizedPesan = sanitizeText(pesan);
    const sanitizedNama = sanitizeText(nama);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Insert to MySQL
    await query(
      `INSERT INTO ucapan (id, nama, pesan, status) VALUES (?, ?, ?, 'pending')`,
      [id, sanitizedNama, sanitizedPesan]
    );

    const insertedData = [{
      id,
      nama: sanitizedNama,
      pesan: sanitizedPesan,
      status: 'pending',
      created_at: createdAt
    }];

    return NextResponse.json({ success: true, data: insertedData }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitRaw = parseInt(searchParams.get('limit') || '50', 10);
    const limit = isNaN(limitRaw) || limitRaw < 1 ? 50 : Math.min(limitRaw, 200);

    // Fetch from MySQL (Only show approved wishes on public page)
    // LIMIT cannot use prepared-statement placeholder (?) in mysql2 execute — embed the safe integer directly.
    const wishes = await query(
      `SELECT * FROM ucapan WHERE status = 'approved' ORDER BY created_at DESC LIMIT ${limit}`,
    );

    // Also get count
    const countResult = await query(`SELECT COUNT(*) as count FROM ucapan WHERE status = 'approved'`);
    const count = countResult[0]?.count || 0;

    return NextResponse.json(
      { success: true, data: wishes, count },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
