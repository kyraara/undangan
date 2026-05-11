import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Helper to sanitize basic HTML from string (very basic, can be improved)
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

    // Insert to Supabase
    const { data, error } = await supabase
      .from('ucapan')
      .insert([
        {
          nama: sanitizedNama,
          pesan: sanitizedPesan,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Gagal mengirim ucapan.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
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
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Fetch from Supabase
    const { data, error, count } = await supabase
      .from('ucapan')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Gagal mengambil data ucapan.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data, count },
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
