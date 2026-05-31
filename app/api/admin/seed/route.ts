import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'Supabase Auth seeding is deprecated. Database has been migrated to MySQL.',
  })
}
