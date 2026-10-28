import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi (Privacy Policy) | Gapless',
  description: 'Kebijakan privasi platform evaluasi karier dan simulasi industri Gapless.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 pb-24">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pl-2.5 border-l-2 border-brand-primary">
              <span>Legal &amp; Kebijakan Privasi</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Kebijakan Privasi (Privacy Policy)
            </h1>
            <p className="text-sm text-slate-500 mt-2">Terakhir diperbarui: 11 Oktober 2026</p>
          </div>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">1. Pendahuluan</h2>
            <p>
              Selamat datang di <strong>Gapless</strong> (<Link href="/" className="text-blue-600 underline">https://gapless.id</Link>). 
              Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda bagikan saat menggunakan layanan evaluasi kompetensi karier, simulasi industri, dan panduan belajar kami.
            </p>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">2. Data yang Kami Kumpulkan</h2>
            <p>Saat Anda menggunakan Gapless, kami mengumpulkan beberapa data berikut:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Informasi Akun (Google OAuth):</strong> Nama lengkap, alamat email, dan foto profil publik yang disediakan melalui integrasi Google Sign-In.
              </li>
              <li>
                <strong>Aktivitas Asesmen & Belajar:</strong> Jawaban tes minat/bakat, penyelesaian studi kasus, skor kompetensi, progres roadmap, dan interaksi simulasi AI.
              </li>
              <li>
                <strong>Transaksi & Langganan:</strong> Data status langganan dan histori pembayaran yang diproses secara aman melalui payment gateway berlisensi (kami tidak menyimpan nomor kartu kredit secara langsung).
              </li>
            </ul>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">3. Penggunaan Informasi</h2>
            <p>Informasi yang dikumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Menyediakan analisis gap kompetensi yang personal dan akurat berbasis AI.</li>
              <li>Menghasilkan kurikulum belajar, simulasi interaktif, dan rekomendasi karier.</li>
              <li>Menyimpan progres sertifikat mikro dan paspor kompetensi Anda.</li>
              <li>Mengirimkan notifikasi akun, keamanan, dan pembaruan penting platform.</li>
            </ul>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">4. Perlindungan Data & Keamanan</h2>
            <p>
              Kami menerapkan standar enkripsi dan keamanan data yang ketat untuk mencegah akses tanpa izin, perubahan data, atau pengungkapan data yang tidak sah. Kami <strong>tidak pernah menjual</strong> data pribadi Anda kepada pihak ketiga manapun untuk kepentingan periklanan.
            </p>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">5. Layanan Pihak Ketiga</h2>
            <p>
              Platform kami memanfaatkan autentikasi dari <strong>Google OAuth</strong> dan model analitik kecerdasan buatan dari <strong>Google Gemini AI</strong>. Pemrosesan data pihak ketiga tunduk pada kebijakan privasi masing-masing penyedia teknologi.
            </p>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">6. Kontak & Dukungan</h2>
            <p>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi atau ingin mengajukan permohonan penghapusan data akun, silakan hubungi tim kami di:
            </p>
            <p className="font-semibold text-slate-900">
              Email:{' '}
              <a href="mailto:nauvaldzakwanbaihaqi@gmail.com" className="text-blue-600 underline">
                nauvaldzakwanbaihaqi@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
