import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, jumlah_tamu, kehadiran, pesan } = body;

    // Basic validation
    if (!nama || !jumlah_tamu || !kehadiran) {
      return NextResponse.json(
        { success: false, error: 'Nama, jumlah tamu, dan kehadiran wajib diisi.' },
        { status: 400 }
      );
    }

    // Get IP Address (optional, useful for basic rate limiting/spam protection)
    const ip_address =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const id = crypto.randomUUID();

    // Insert to MySQL
    await query(
      `INSERT INTO rsvp (id, nama, jumlah_tamu, kehadiran, pesan, ip_address) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, nama, Number(jumlah_tamu), kehadiran, pesan || null, ip_address]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
