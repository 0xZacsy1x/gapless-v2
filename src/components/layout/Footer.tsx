"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  FileText, 
  Lock, 
  ChevronRight 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50/70 border-t border-gray-200/80 text-gray-900 pt-16 pb-12 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 xl:gap-32 pb-14 border-b border-gray-200/70">
          
          {/* Kolom 1: Brand & Info Gapless */}
          <div className="max-w-md space-y-4">
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

            <p className="text-sm text-gray-600 leading-relaxed">
              Platform evaluasi kesiapan karier dan roadmap belajar berbasis AI untuk mahasiswa &amp; fresh graduate.
            </p>

            <p className="text-xs text-gray-500 leading-relaxed pt-1 border-t border-gray-200/60 font-medium">
              Berbasis data 702+ lowongan industri nyata, model psikometri RIASEC, dan 15 skenario Situational Judgement Test (SJT) kerja terapan.
            </p>
          </div>

          {/* Kolom Navigasi Kanan (Produk & Legal) */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 lg:gap-24 xl:gap-32">
            {/* Kolom 2: Navigasi Produk & Fitur */}
            <div className="space-y-4 min-w-[170px]">
              <h3 className="text-xs font-black tracking-widest uppercase text-gray-900">
                Produk &amp; Fitur
              </h3>
              <ul className="space-y-2.5 text-xs font-medium text-gray-600">
                <li>
                  <Link href="/assessment" className="hover:text-brand-primary transition-colors flex items-center justify-between gap-4">
                    <span>Asesmen Karier</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="hover:text-brand-primary transition-colors flex items-center justify-between gap-4">
                    <span>Roadmap Belajar</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/gap-analysis" className="hover:text-brand-primary transition-colors flex items-center justify-between gap-4">
                    <span>Hasil &amp; Skill Gap</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-brand-primary transition-colors flex items-center justify-between gap-4">
                    <span>Pilihan Paket &amp; Biaya</span>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Legal & Dukungan */}
            <div className="space-y-4 min-w-[180px]">
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

              {/* System Status Indicator (Clean Status Chip 4px radius) */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] font-medium text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Layanan Berjalan Normal</span>
                </div>
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
    </footer>
  );
}
