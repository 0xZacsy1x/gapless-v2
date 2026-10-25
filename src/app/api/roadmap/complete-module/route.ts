import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'Forbidden',
      message: 'Penyelesaian manual telah dinonaktifkan. Modul diselesaikan secara otomatis setelah mempelajari materi eksternal (minimal 60 detik) melalui endpoint /api/roadmap/check-study.',
    },
    { status: 403 }
  );
}
