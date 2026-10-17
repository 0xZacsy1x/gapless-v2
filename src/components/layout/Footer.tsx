"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Mail, 
  FileText,
  Lock,
  ChevronRight,
  Info,
  X,
  Compass,
  GraduationCap
} from "lucide-react";

export default function Footer() {
  const [showFreeModal, setShowFreeModal] = useState(false);

  const freeFeatures = [
    {
      title: "Asesmen Minat & Kepribadian (RIASEC + SJT)",
      desc: "Evaluasi lengkap tipe minat kerja dan ketahanan situasional tanpa dipungut biaya.",
      badge: "100% Gratis",
    },
    {
      title: "Ringkasan Skor Kesiapan & Rekomendasi Karier",
      desc: "Dapatkan analisis awal kecocokan peran kerja dari database 700+ pekerjaan terkemuka.",
      badge: "Langsung Tersedia",
    },
    {
      title: "Kurikulum Fondasi Roadmap Belajar",
      desc: "Akses modul dasar terstruktur untuk membangun fondasi skill utama di bidang pilihanmu.",
      badge: "Tanpa Batas Waktu",
    },
    {
      title: "Kurasi Lowongan Magang & Informasi Riset",
      desc: "Eksplorasi kesempatan magang terverifikasi serta studi kasus nyata dari industri.",
      badge: "Akses Terbuka",
    },
  ];

  return (
    <footer className="w-full bg-slate-50/70 border-t border-gray-200/80 text-gray-900 pt-16 pb-12 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-gray-200/70">
          
          {/* Kolom 1: Brand & Info Gapless (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/logo.png"
                alt="Gapless Logo"
                width={34}
                height={34}
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="text-2xl font-black tracking-tight text-gray-900">
                Gapless
              </span>
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Platform akselerasi dan evaluasi kesiapan karier berbasis AI perilaku psikometri terintegrasi (RIASEC &amp; SJT), dirancang dengan standar kompetensi dari <strong>702 lowongan pekerjaan</strong> di perusahaan terkemuka.
            </p>

            <div className="space-y-2 pt-1 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                <span>Standar 702+ Pekerjaan Industri Terkemuka</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Psikometri RIASEC + SJT Terintegrasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Dibuat Khusus untuk Mahasiswa Indonesia</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Fitur Akses Gratis (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black tracking-widest uppercase text-brand-primary">
                Fitur Akses Gratis
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                100% Free Tier
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Semua mahasiswa dapat mulai tanpa komitmen biaya. Berikut kapabilitas yang bisa kamu manfaatkan:
            </p>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tes Minat RIASEC &amp; SJT</strong> lengkap (5-7 menit).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Skor Kesiapan &amp; Profil Persona</strong> karier awal.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Modul Fondasi Roadmap</strong> untuk skill dasar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Kurasi Info Magang</strong> &amp; studi kasus terbuka.
                </span>
              </li>
            </ul>

            {/* Quick Links for Free Access */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary/90 px-3.5 py-1.5 rounded-lg transition-all shadow-xs"
              >
                <span>Mulai Asesmen Gratis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setShowFreeModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-brand-primary" />
                <span>Rincian Fitur Gratis</span>
              </button>
            </div>
          </div>

          {/* Kolom 3: Navigasi Produk & Fitur (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-gray-900">
              Produk &amp; Fitur
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li>
                <Link href="/assessment" className="hover:text-brand-primary transition-colors flex items-center justify-between">
                  <span>Asesmen Karier</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-brand-primary transition-colors flex items-center justify-between">
                  <span>Roadmap Belajar</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link href="/gap-analysis" className="hover:text-brand-primary transition-colors flex items-center justify-between">
                  <span>Hasil &amp; Skill Gap</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-primary transition-colors flex items-center justify-between">
                  <span>Pilihan Paket &amp; Biaya</span>
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legal & Ketentuan (Ujung Kanan - 2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black tracking-widest uppercase text-gray-900">
              Legal &amp; Dukungan
            </h3>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li>
                <Link href="/privacy" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-primary transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Syarat &amp; Ketentuan</span>
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:nauvaldzakwanbaihaqi@gmail.com"
                  className="hover:text-brand-primary transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>Bantuan &amp; Kontak</span>
                </a>
              </li>
            </ul>

            {/* System Status Pill */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-medium text-gray-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Layanan Berjalan Normal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-gray-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-semibold text-gray-700">
              © {new Date().getFullYear()} Gapless Platform.
            </span>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span>Dibuat dengan bangga untuk talenta masa depan Indonesia.</span>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>Data Aman &amp; Terenkripsi</span>
            </span>
            <span className="text-gray-300">•</span>
            <span>Google Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Modal Detail Fitur Akses Gratis */}
      {showFreeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowFreeModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFreeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Akses Gratis Tanpa Biaya</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Apa saja yang bisa kamu lakukan secara gratis?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Gapless percaya setiap mahasiswa berhak mendapatkan kejelasan arah karier tanpa hambatan biaya sejak hari pertama.
              </p>
            </div>

            <div className="space-y-3.5">
              {freeFeatures.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-primary/30 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.title}</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 pl-5.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/assessment"
                onClick={() => setShowFreeModal(false)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-center text-sm shadow-md shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Mulai Tes Gratis Sekarang</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                onClick={() => setShowFreeModal(false)}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-center text-xs transition-colors"
              >
                Bandingkan vs Pro
              </Link>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
