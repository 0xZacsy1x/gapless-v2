"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  FileText, 
  Lock, 
  ArrowUpRight 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] border-t border-zinc-200/90 text-zinc-900 pt-16 pb-12 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 xl:gap-32 pb-14 border-b border-zinc-200/80">
          
          {/* Kolom 1: Brand & Info Gapless */}
          <div className="max-w-md space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/logo.png"
                alt="Gapless Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
                priority
              />
              <span className="text-2xl font-black tracking-tight text-zinc-950 font-sans">
                Gapless
              </span>
            </Link>

            <p className="text-sm text-zinc-600 leading-relaxed font-normal">
              Platform evaluasi kesiapan karier dan roadmap belajar terstruktur berbasis AI perilaku untuk mahasiswa &amp; fresh graduate Indonesia.
            </p>

            <div className="space-y-2 pt-1 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Standar Riset 702+ Lowongan Industri</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Model Psikometri RIASEC + 15 Simulasi SJT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                <span>Dirancang Khusus untuk Talenta Indonesia</span>
              </div>
            </div>
          </div>

          {/* Kolom Navigasi Kanan (Produk & Legal) */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-24 xl:gap-32">
            {/* Kolom 2: Navigasi Produk & Fitur */}
            <div className="space-y-4 min-w-[170px]">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400">
                PRODUK &amp; FITUR
              </h3>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-600">
                <li>
                  <Link href="/assessment" className="hover:text-blue-700 transition-colors flex items-center justify-between gap-4 group">
                    <span>Asesmen Karier</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-700 transition-colors" />
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="hover:text-blue-700 transition-colors flex items-center justify-between gap-4 group">
                    <span>Roadmap Belajar</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-700 transition-colors" />
                  </Link>
                </li>
                <li>
                  <Link href="/gap-analysis" className="hover:text-blue-700 transition-colors flex items-center justify-between gap-4 group">
                    <span>Hasil &amp; Skill Gap</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-700 transition-colors" />
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-blue-700 transition-colors flex items-center justify-between gap-4 group">
                    <span>Pilihan Paket &amp; Biaya</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-700 transition-colors" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Legal & Dukungan */}
            <div className="space-y-4 min-w-[180px]">
              <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400">
                LEGAL &amp; DUKUNGAN
              </h3>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-600">
                <li>
                  <Link href="/privacy" className="hover:text-blue-700 transition-colors flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Kebijakan Privasi</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-700 transition-colors flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Syarat &amp; Ketentuan</span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="mailto:nauvaldzakwanbaihaqi@gmail.com"
                    className="hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Bantuan &amp; Kontak</span>
                  </a>
                </li>
              </ul>

              {/* System Status Pill */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-mono text-zinc-700 shadow-3xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>Layanan Berjalan Normal</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-semibold text-zinc-800">
              © {new Date().getFullYear()} Gapless Platform.
            </span>
            <span className="hidden sm:inline text-zinc-300">•</span>
            <span>Dibuat dengan bangga untuk talenta masa depan Indonesia.</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Data Aman &amp; Terenkripsi</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span>Google Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
