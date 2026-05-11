import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    // Insert to Supabase
    const { error } = await supabase
      .from('rsvp')
      .insert([
        {
          nama,
          jumlah_tamu: Number(jumlah_tamu),
          kehadiran,
          pesan: pesan || null,
          ip_address,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Gagal menyimpan data RSVP.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
