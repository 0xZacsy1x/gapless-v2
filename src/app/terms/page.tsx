import { Navbar } from '@/components/Navbar';
import Link from 'next/link';

export const metadata = {
  title: 'Syarat & Ketentuan Layanan (Terms of Service) | Gapless',
  description: 'Syarat dan ketentuan penggunaan platform Gapless.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 pb-24">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Legal & Ketentuan
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="text-sm text-slate-500 mt-2">Terakhir diperbarui: 11 Oktober 2026</p>
          </div>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">1. Ketentuan Umum</h2>
            <p>
              Dengan mengakses dan menggunakan platform <strong>Gapless</strong> (<Link href="/" className="text-blue-600 underline">https://gapless.id</Link>), Anda menyetujui untuk terikat oleh syarat dan ketentuan yang tercantum di bawah ini.
            </p>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">2. Akun & Penggunaan Layanan</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Pengguna bertanggung jawab atas keamanan akun dan aktivitas yang terjadi di bawah akun tersebut.</li>
              <li>Layanan ini ditujukan untuk evaluasi kesiapan karier, pembelajaran mandiri, dan simulasi industri.</li>
              <li>Dilarang menyalahgunakan API, melakukan scraping ilegal, atau mengganggu performa server platform.</li>
            </ul>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">3. Langganan & Pembayaran</h2>
            <p>
              Akses premium (Gapless Pro atau modul berbayar) tunduk pada verifikasi pembayaran. Pengembalian dana (refund) diproses sesuai dengan kebijakan yang berlaku bila terjadi kendala teknis dari pihak sistem kami.
            </p>
          </section>

          <section className="space-y-3 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-lg font-bold text-slate-900">4. Hubungi Kami</h2>
            <p>
              Untuk pertanyaan terkait syarat & ketentuan layanan, silakan hubungi:{' '}
              <a href="mailto:nauvaldzakwanbaihaqi@gmail.com" className="text-blue-600 underline font-semibold">
                nauvaldzakwanbaihaqi@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
