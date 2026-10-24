'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  Download,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  AlertTriangle,
  FileText,
  Brain,
  Target,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { ComprehensiveReportData } from '@/lib/report_generator';
import { ReportSvgRadar } from '@/components/ReportSvgRadar';
import { downloadBlobFile } from '@/lib/download-helper';
import { getDetailedSoftSkillAnalysis, SoftSkillDetailReport } from '@/data/sjtAnalysisData';

interface Props {
  report: ComprehensiveReportData;
  assessmentId: string;
}

export function ReportDocumentClient({ report, assessmentId }: Props) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const TOTAL_PAGES = 11;

  // Fallback defensif untuk actionPlan & list
  const day30 = report.actionPlan?.day30 || {
    phaseTitle: 'Fondasi Esensial & Penutupan Gap Kritis',
    focusSkills: [],
    weeksFirstHalf: 'Mempelajari modul teoretis dan framework kerja standar industri.',
    weeksSecondHalf: 'Pengerjaan latihan mandiri terstruktur dan telaah studi kasus nyata.',
    milestone: 'Mampu mereplikasi 1 studi kasus industri standar dengan benar secara mandiri.',
  };

  const day60 = report.actionPlan?.day60 || {
    phaseTitle: 'Pengembangan Kompetensi Lanjutan & Integrasi',
    focusSkills: [],
    weeksFirstHalf: 'Eksplorasi teknik lanjutan dan praktik integrasi lintas-fitur.',
    weeksSecondHalf: 'Membangun mini-proyek mandiri untuk memvalidasi pemahaman teknis.',
    milestone: 'Menghasilkan 1 mini-proyek teruji yang mendemonstrasikan skill target.',
  };

  const day90 = report.actionPlan?.day90 || {
    phaseTitle: 'Konsolidasi & Kesiapan Kerja Profesional',
    focusSkills: [],
    weeksFirstHalf: 'Simulasi skenario kerja tim dan pemecahan kendala (troubleshooting).',
    weeksSecondHalf: 'Dokumentasi portofolio komprehensif dan persiapan wawancara teknis.',
    milestone: 'Portofolio siap presentasi dengan bukti kesiapan kerja level entry-level.',
  };

  const skillInterpretations = Array.isArray(report.skillInterpretations) ? report.skillInterpretations : [];
  const priorityList = Array.isArray(report.priorityList) ? report.priorityList : [];
  const skillResources = report.skillResources || {};

  // Data Soft Skills Analisis Mendalam
  const softSkills: SoftSkillDetailReport[] =
    report.softSkillsAnalysis && report.softSkillsAnalysis.length > 0
      ? report.softSkillsAnalysis
      : getDetailedSoftSkillAnalysis({}, report.targetRole);

  const topSoftStrengths = softSkills.filter((s) => s.level >= 2).slice(0, 2);
  const softDevPriorities = softSkills.filter((s) => s.level <= 2).sort((a, b) => a.level - b.level).slice(0, 2);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 150);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      const res = await fetch(`/api/report/${assessmentId}/pdf`);
      if (!res.ok) throw new Error('Gagal mengunduh file PDF');
      const blob = await res.blob();
      const filename = `Gapless-Laporan-${(report.targetRole || 'Executive').replace(/[^a-zA-Z0-9_-]/g, '_')}-${report.reportNumber}.pdf`;
      downloadBlobFile(blob, filename);
    } catch (err) {
      console.error(err);
      window.print();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Reusable Page Header
  const PageHeader = () => (
    <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-300 text-[10px] text-slate-500 font-medium">
      <div className="flex items-center gap-2">
        <img src="/Asset 1.png" alt="Gapless Logo" className="h-4.5 w-auto" />
        <span className="font-bold text-slate-800 tracking-wider">GAPLESS ADVISORY</span>
        <span className="text-slate-300">|</span>
        <span>Laporan Analisis Kesiapan Karier</span>
      </div>
      <div className="flex items-center gap-3 text-slate-600 font-mono">
        <span>No: <strong>{report.reportNumber}</strong></span>
        <span>•</span>
        <span>{report.generatedAt}</span>
      </div>
    </div>
  );

  // Reusable Page Footer
  const PageFooter = ({ pageNum }: { pageNum: number }) => (
    <div className="mt-auto pt-3 border-t border-slate-200 flex items-center justify-between text-[9.5px] text-slate-400">
      <span>Dokumen ini bersifat rahasia &amp; eksklusif untuk <strong>{report.userName}</strong></span>
      <span>Halaman {pageNum} dari {TOTAL_PAGES}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200/70 py-6 sm:py-10 print:bg-white print:py-0 text-slate-900 font-sans">
      {/* ── Screen Floating Action Toolbar ── */}
      <div className="max-w-[210mm] mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <Link
          href={`/hasil/${assessmentId}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Halaman Hasil</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terverifikasi: {report.reportNumber}</span>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloadingPdf ? 'Menyiapkan...' : `Unduh File PDF (${TOTAL_PAGES} Hal)`}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-[#1a1a2e] hover:bg-[#2d4a8a] text-white text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isPrinting ? 'Menyiapkan...' : 'Cetak (Browser)'}</span>
          </button>
        </div>
      </div>

      {/* ── Document Container (A4 Sheets) ── */}
      <div className="max-w-[210mm] mx-auto space-y-8 print:space-y-0 print:max-w-none print:w-full">

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 1 — COVER
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1a1a2e] via-[#2d4a8a] to-[#0e7490]" />

          <div className="pt-8 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
              <img src="/Asset 1.png" alt="Gapless Logo" className="h-12 w-auto" />
            </div>
            <p className="text-[11px] tracking-widest font-semibold uppercase text-slate-500">
              Gapless Career Readiness Institute
            </p>
          </div>

          <div className="text-center my-auto py-10 space-y-6">
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1a2e] font-bold tracking-tight leading-tight">
                Laporan Analisis Kesiapan Karier
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Penilaian Komprehensif Kompetensi Industri, Evaluasi Soft Skills &amp; Rencana Aksi Terarah
              </p>
            </div>

            <div className="inline-block w-24 h-0.5 bg-[#2d4a8a] mx-auto" />

            <div className="space-y-2 pt-2">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Disusun Khusus Untuk</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] tracking-tight">
                {report.userName}
              </h2>
              {report.userEmail && (
                <p className="text-xs text-slate-500 font-mono">{report.userEmail}</p>
              )}
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-sm font-bold shadow-xs">
                <span>🎯 Target Peran:</span>
                <span className="text-[#2d4a8a]">{report.targetRole}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="grid grid-cols-2 text-xs text-slate-600 gap-4">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nomor Registrasi Laporan</span>
                <strong className="font-mono text-slate-800">{report.reportNumber}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tanggal Diterbitkan</span>
                <strong className="text-slate-800">{report.generatedAt}</strong>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 leading-relaxed text-justify">
              <strong>Disclaimer:</strong> Laporan ini disusun berdasarkan evaluasi studi kasus industri, tes Situational Judgement (SJT 40 skenario kerja), dan tolok ukur standar data O*NET (Occupational Information Network, U.S. Department of Labor). Dokumen ini memberikan estimasi analitis kesiapan kerja edukatif dan konsultatif, bukan psikotes klinis medis.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 2 — RINGKASAN EKSEKUTIF
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 1</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Ringkasan Eksekutif</h2>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Kolom Kiri: Gauge & Status */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-center">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Skor Kesiapan Karier (Skill Readiness)
                  </span>
                  <div className="relative inline-flex items-center justify-center my-2">
                    <svg className="w-36 h-36 transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="58"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="58"
                        stroke="#2d4a8a"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - report.readinessScore / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-[#1a1a2e] font-mono">{report.readinessScore}%</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Readiness</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Status Kesiapan Keseluruhan</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    report.readinessScore >= 80
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : report.readinessScore >= 60
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {report.overallStatus}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 text-left text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Archetype Dominan:</span>
                    <strong className="text-slate-900">{report.dominantTrait}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Target Peran:</span>
                    <strong className="text-slate-900">{report.targetRole}</strong>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: 3 Poin Kunci & Estimasi Jam */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2d4a8a]" />
                    <span>3 Temuan Kunci Asesmen:</span>
                  </h3>

                  <div className="space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <div>
                        <strong>Kekuatan Utama:</strong>{' '}
                        {report.keyStrengths.length > 0 ? report.keyStrengths.join(', ') : 'Fondasi awal kepribadian kerja yang baik.'}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <div>
                        <strong>Gap Prioritas:</strong>{' '}
                        {report.priorityGaps.length > 0 ? report.priorityGaps.join(', ') : 'Tidak ada gap kritis terdeteksi.'}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <strong>Rekomendasi Pertama:</strong>{' '}
                        {report.firstActionRecommendation}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Waktu Estimasi */}
                <div className="p-4 rounded-xl bg-[#1a1a2e] text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Estimasi Waktu Menuju Siap Kerja</span>
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-white">
                    {report.totalEstHoursMin} – {report.totalEstHoursMax} Jam Belajar
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Setara dengan <strong>{report.totalEstWeeksMin} – {report.totalEstWeeksMax} minggu</strong> pembelajaran terstruktur (asumsi komitmen 5 jam/minggu, kombinasi modul teori, pengasahan soft skills, dan studi kasus terapan).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNum={2} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 3 — ANALISIS SKILL GAP DETAIL
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 2</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Analisis Kesenjangan Kompetensi (Skill Gap)</h2>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="border border-slate-300 rounded-xl overflow-hidden mb-5">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <th className="py-2.5 px-3">Kompetensi (Skill)</th>
                    <th className="py-2.5 px-2 text-center">Level Kamu</th>
                    <th className="py-2.5 px-2 text-center">Level Target</th>
                    <th className="py-2.5 px-2 text-center">Gap</th>
                    <th className="py-2.5 px-3 text-center">Prioritas</th>
                    <th className="py-2.5 px-3 text-right">Est. Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {report.skillGapTable.map((item, idx) => (
                    <tr key={item.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-semibold text-slate-800">{item.name}</td>
                      <td className="py-2 px-2 text-center font-mono">Level {item.current}</td>
                      <td className="py-2 px-2 text-center font-mono text-slate-600">Level {item.required}</td>
                      <td className="py-2 px-2 text-center font-mono font-bold">
                        <span className={item.gap < 0 ? 'text-rose-600' : 'text-emerald-600'}>
                          {item.gap > 0 ? `+${item.gap}` : item.gap}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                          item.priority === 'Kritis'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'Penting'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          <span>{item.priorityIcon}</span>
                          <span>{item.priority}</span>
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-slate-600 text-[11px]">
                        {item.hoursMin > 0 ? `${item.weeksMin}–${item.weeksMax} minggu` : 'Tercapai'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 flex items-center justify-between gap-2 mb-4">
              <span><strong>🔴 Kritis:</strong> Selisih ≥ 2 level atau skill berbobot tinggi.</span>
              <span><strong>🟡 Penting:</strong> Selisih 1 level pada target menengah.</span>
              <span><strong>🟢 Sesuai:</strong> Telah memenuhi atau melampaui level industri.</span>
            </div>

            <div className="pt-2">
              <div className="text-center mb-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Pemetaan Visual Radar Kompetensi Terhadap Standar Industri
                </span>
              </div>
              <ReportSvgRadar data={report.radarData} size={360} />
            </div>
          </div>

          <PageFooter pageNum={3} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 4 — EVALUASI 8 SOFT SKILLS & MATRIKS PERILAKU KERJA (SJT)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 3</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">
                Evaluasi 8 Dimensi Soft Skills &amp; Situational Judgement
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pemetaan psikometri perilaku alami terhadap 40 skenario kerja nyata untuk peran <strong>{report.targetRole}</strong>.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            {/* Tabel 8 Dimensi Soft Skills */}
            <div className="border border-slate-300 rounded-xl overflow-hidden mb-5">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <th className="py-2.5 px-3">Dimensi Soft Skill</th>
                    <th className="py-2.5 px-2 text-center">Status Kematangan</th>
                    <th className="py-2.5 px-2 text-center">Efektivitas</th>
                    <th className="py-2.5 px-3">Karakteristik Respon Alami di Dunia Kerja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {softSkills.map((item, idx) => (
                    <tr key={item.skill} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2 px-3 font-semibold text-slate-900 flex items-center gap-1.5">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.shortLabel}</span>
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            item.level === 3
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : item.level === 2
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {item.maturityStatus}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-bold text-slate-700">
                        {item.scorePercentage}%
                      </td>
                      <td className="py-2 px-3 text-[11px] text-slate-600 leading-snug">
                        {item.behavioralTendency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Highlight: 2 Kekuatan Perilaku Terverifikasi */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Analisis Mendalam 2 Kekuatan Soft Skill Utama:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {topSoftStrengths.map((str) => (
                  <div
                    key={str.skill}
                    className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{str.icon}</span>
                        <span>{str.label}</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {str.scorePercentage}% Skor
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {str.behavioralTendency}
                    </p>
                    <div className="pt-1 border-t border-emerald-200/60">
                      <span className="font-bold text-emerald-900 text-[10.5px] block mb-1">
                        Kekuatan Terverifikasi di Tim:
                      </span>
                      <ul className="space-y-0.5 text-[10.5px] text-emerald-950">
                        {str.workplaceStrengths.slice(0, 2).map((ws, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{ws}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter pageNum={4} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 5 — BLIND SPOTS & PANDUAN INTERVIEW STAR METHOD
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 4</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">
                Mitigasi Risiko Kerja (Blind Spots) &amp; Panduan Wawancara STAR
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Peringatan dini jebakan perilaku profesional dan contekan terstruktur wawancara kerja untuk peran <strong>{report.targetRole}</strong>.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            {/* Area Pengembangan Prioritas (Blind Spots) */}
            <div className="mb-5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Peringatan Dini: 2 Area Pengembangan &amp; Blind Spots di Dunia Kerja:</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {softDevPriorities.map((dev) => (
                  <div
                    key={dev.skill}
                    className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{dev.icon}</span>
                        <span>{dev.label}</span>
                      </span>
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                        {dev.levelLabel}
                      </span>
                    </div>

                    <div className="text-[11px] text-rose-950">
                      <strong className="block mb-0.5">Potensi Risiko &amp; Blind Spot:</strong>
                      <ul className="space-y-0.5">
                        {dev.blindSpotsAndRisks.slice(0, 2).map((bs, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{bs}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-1.5 border-t border-rose-200/60 text-[10.5px] text-blue-900 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                      <strong>Latihan Intervensi Mingguan (Action Drill):</strong>{' '}
                      <span>{dev.actionableCoaching}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kamus Panduan Wawancara Kerja (STAR Method) */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulasi Jawaban Wawancara Kerja (Metode STAR untuk {report.targetRole}):</span>
              </h3>

              <div className="space-y-3">
                {softSkills.slice(0, 2).map((item) => (
                  <div
                    key={item.skill}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        Format: STAR Method
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200">
                      &ldquo;{item.interviewTalkingPoint.promptQuestion}&rdquo;
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px] pt-1">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <strong className="text-blue-900 block">S - Situation:</strong>
                        <span className="text-slate-600">{item.interviewTalkingPoint.starStory.situation}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <strong className="text-blue-900 block">T - Task:</strong>
                        <span className="text-slate-600">{item.interviewTalkingPoint.starStory.task}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <strong className="text-blue-900 block">A - Action:</strong>
                        <span className="text-slate-600">{item.interviewTalkingPoint.starStory.action}</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <strong className="text-blue-900 block">R - Result:</strong>
                        <span className="text-slate-600">{item.interviewTalkingPoint.starStory.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <PageFooter pageNum={5} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 6 — INTERPRETASI MENDALAM PER SKILL (HARD SKILLS)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 5</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Interpretasi Mendalam Kompetensi Teknis</h2>
              <p className="text-xs text-slate-500 mt-1">
                Dekomposisi kapabilitas praktis hard skills: apa yang sudah dikuasai vs ekspektasi nyata dunia kerja.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="space-y-4">
              {skillInterpretations.length > 0 ? (
                skillInterpretations.map((item) => (
                  <div
                    key={item.skillName}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                      <h3 className="font-bold text-sm text-[#1a1a2e]">{item.skillName}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-mono text-[11px] font-semibold">
                        Level {item.currentLevel} dari Target Level {item.targetLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                          ✓ Di Level {item.currentLevel} Kamu Sudah Mampu:
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                          {item.canDo.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-rose-800 block mb-1">
                          ✗ Yang Belum Dikuasai (Kebutuhan Level {item.targetLevel}):
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                          {item.cannotDo.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-slate-800">
                      <strong>Contoh Kasus Nyata di Industri:</strong>{' '}
                      <em>{item.industryExample}</em>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800">
                  Seluruh kompetensi inti telah berada pada atau melampaui level standar industri yang disyaratkan.
                </div>
              )}
            </div>
          </div>

          <PageFooter pageNum={6} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 7 — URUTAN PRIORITAS DENGAN ALASAN
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 6</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Urutan Prioritas Pengembangan</h2>
              <p className="text-xs text-slate-500 mt-1">
                Alasan strategis mengapa skill tertentu wajib dituntaskan terlebih dahulu.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="space-y-3 mb-6">
              {priorityList.map((item) => (
                <div
                  key={item.rank}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#2d4a8a] text-white flex items-center justify-center font-bold font-mono shrink-0">
                    {item.rank}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{item.skillName}</h3>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      <strong>Kenapa Diutamakan:</strong> {item.reason}
                    </p>
                    <p className="text-rose-700 leading-relaxed text-[11px]">
                      <strong>Dampak Jika Tidak Ditutup:</strong> {item.consequenceIfNotClosed}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Prinsip Penentuan Urutan Prioritas:
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Urutan dihitung secara algoritmik dengan menimbang: (1) Ukuran gap absolut, (2) Ketergantungan struktural skill dasar terhadap skill tingkat lanjut (prerequisite dependency), dan (3) Frekuensi kemunculan skill pada deskripsi rekrutmen bursa kerja terkini.
              </p>
            </div>
          </div>

          <PageFooter pageNum={7} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 8 — ESTIMASI WAKTU BELAJAR
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 7</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Estimasi Waktu Belajar Realistis</h2>
              <p className="text-xs text-slate-500 mt-1">
                Kalkulasi jam komitmen terstruktur (asumsi 5 jam/minggu) berbasis ukuran kesenjangan skill.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                    <th className="py-2.5 px-3">Kompetensi</th>
                    <th className="py-2.5 px-2 text-center">Gap Level</th>
                    <th className="py-2.5 px-3 text-center">Rentang Jam Belajar</th>
                    <th className="py-2.5 px-3 text-right">Durasi Minggu (5 Jam/Mgg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {report.skillGapTable.map((item, idx) => (
                    <tr key={item.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.name}</td>
                      <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-600">
                        {item.gap < 0 ? Math.abs(item.gap) : 0} Level
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        {item.hoursMin > 0 ? `${item.hoursMin} – ${item.hoursMax} Jam` : '0 Jam (Tercapai)'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-700 font-bold">
                        {item.weeksMin > 0 ? `${item.weeksMin} – ${item.weeksMax} Minggu` : 'Siap Kerja'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 rounded-2xl bg-[#1a1a2e] text-white flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="text-[11px] text-blue-300 uppercase font-semibold tracking-wider">
                  Total Estimasi Waktu Penutupan Seluruh Gap
                </span>
                <h3 className="text-2xl font-extrabold font-mono text-white">
                  {report.totalEstHoursMin} – {report.totalEstHoursMax} Jam Pembelajaran
                </h3>
                <p className="text-[11px] text-slate-300">
                  Diasumsikan dengan alokasi disiplin 5 jam per minggu (kombinasi 3 jam materi &amp; 2 jam pengerjaan studi kasus mandiri).
                </p>
              </div>
              <div className="text-right shrink-0 pl-6 border-l border-slate-700">
                <span className="text-[11px] text-slate-400 block uppercase">Target Kalender</span>
                <span className="text-lg font-bold font-mono text-white">
                  ~{report.totalEstWeeksMin} – {report.totalEstWeeksMax} Minggu
                </span>
              </div>
            </div>
          </div>

          <PageFooter pageNum={8} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 9 — RENCANA BELAJAR 30/60/90 HARI
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 8</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Rencana Tindakan 30 / 60 / 90 Hari</h2>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="space-y-4">
              {/* Fase 1: 30 Hari Pertama */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[10px] font-mono">
                      HARI 1–30
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{day30.phaseTitle}</h3>
                  </div>
                  <span className="text-[10.5px] font-mono text-blue-900 font-semibold">Fase Fondasi</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <strong className="text-slate-700 block">Minggu 1–2:</strong>
                    <span className="text-slate-600">{day30.weeksFirstHalf}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 block">Minggu 3–4:</strong>
                    <span className="text-slate-600">{day30.weeksSecondHalf}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-blue-200/80 text-[11px] text-blue-900 font-medium">
                  🎯 <strong>Milestone Akhir 30 Hari:</strong> {day30.milestone}
                </div>
              </div>

              {/* Fase 2: Hari 31–60 */}
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-indigo-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px] font-mono">
                      HARI 31–60
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{day60.phaseTitle}</h3>
                  </div>
                  <span className="text-[10.5px] font-mono text-indigo-900 font-semibold">Fase Integrasi</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <strong className="text-slate-700 block">Minggu 5–6:</strong>
                    <span className="text-slate-600">{day60.weeksFirstHalf}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 block">Minggu 7–8:</strong>
                    <span className="text-slate-600">{day60.weeksSecondHalf}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-indigo-200/80 text-[11px] text-indigo-900 font-medium">
                  🎯 <strong>Milestone Akhir 60 Hari:</strong> {day60.milestone}
                </div>
              </div>

              {/* Fase 3: Hari 61–90 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] font-mono">
                      HARI 61–90
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{day90.phaseTitle}</h3>
                  </div>
                  <span className="text-[10.5px] font-mono text-emerald-900 font-semibold">Fase Kesiapan Kerja</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <strong className="text-slate-700 block">Minggu 9–10:</strong>
                    <span className="text-slate-600">{day90.weeksFirstHalf}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 block">Minggu 11–12:</strong>
                    <span className="text-slate-600">{day90.weeksSecondHalf}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900 font-medium">
                  🎯 <strong>Milestone Akhir 90 Hari:</strong> {day90.milestone}
                </div>
              </div>
            </div>
          </div>

          <PageFooter pageNum={9} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 10 — REKOMENDASI SUMBER BELAJAR TERKURASI
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 9</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Rekomendasi Sumber Belajar Terkurasi</h2>
              <p className="text-xs text-slate-500 mt-1">
                Referensi materi gratis &amp; berbayar berkualitas tinggi yang dicocokkan spesifik dengan gap kompetensimu.
              </p>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="space-y-4">
              {Object.keys(skillResources).length > 0 ? (
                Object.entries(skillResources).map(([skillName, resList]) => (
                  <div key={skillName} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>Materi untuk: {skillName}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                      {resList.map((res, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-2xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-semibold">{res.provider}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${res.isFree ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                              {res.isFree ? 'GRATIS' : 'BERBAYAR'}
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-900 text-[11px] line-clamp-1">{res.title}</h4>
                          <span className="text-[9.5px] text-blue-600 block truncate">{res.url || 'gapless.id/roadmap'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 space-y-2">
                  <p>Materi kurikulum lengkap dapat diakses interaktif pada halaman Learning Roadmap akun Gapless kamu.</p>
                  <span className="font-mono text-xs text-blue-600 font-bold block">gapless.id/roadmap</span>
                </div>
              )}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-slate-100 border border-slate-200 text-[10.5px] text-slate-600">
              💡 <strong>Catatan:</strong> Daftar kurikulum dan materi sumber belajar terus diperbarui secara berkala oleh tim pakar industri Gapless. Kunjungi <code>gapless.id/roadmap</code> untuk modul interaktif dan latihan mandiri.
            </div>
          </div>

          <PageFooter pageNum={10} />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            HALAMAN 11 — PENUTUP & METODOLOGI
        ═══════════════════════════════════════════════════════════════ */}
        <section className="a4-page bg-white p-[20mm] shadow-lg print:shadow-none flex flex-col justify-between min-h-[297mm] box-border page-break">
          <PageHeader />

          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#2d4a8a] uppercase tracking-wider">Bagian 10</span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a2e]">Penutup &amp; Metodologi Asesmen</h2>
              <div className="w-12 h-0.5 bg-[#2d4a8a] mt-1.5" />
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-3 leading-relaxed mb-6">
              <h3 className="font-bold text-sm text-[#1a1a2e]">Kesimpulan Akhir &amp; Langkah Lanjutan</h3>
              <p className="text-justify">
                Berdasarkan evaluasi menyeluruh terhadap profil kompetensimu saat ini, keunggulan kariermu sebagai <strong>{report.targetRole}</strong> bertumpu pada perpaduan penguasaan skill teknis terukur dan kedewasaan respon psikometri 8 dimensi soft skills. Mempertahankan kekuatan utama sembari menutup celah blind spots melalui latihan terstruktur akan menempatkanmu di jajaran kandidat paling kompetitif saat proses rekrutmen.
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Lanjutkan Eksekusi Pembelajaran:</span>
                <span className="px-3 py-1 rounded-lg bg-[#2d4a8a] text-white font-bold text-xs font-mono">
                  gapless.id/roadmap
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 mb-6">
              <h4 className="font-bold text-slate-800 uppercase text-[11px] tracking-wider">
                Metodologi &amp; Landasan Analisis:
              </h4>
              <p className="text-justify text-[11px] leading-relaxed">
                Laporan ini disusun secara komprehensif menggunakan tiga pilar metodologi teruji:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-justify leading-relaxed">
                <li>
                  <strong>Asesmen Mandiri &amp; Situational Judgement Test (SJT):</strong> Pengukuran 40 simulasi skenario kerja industri nyata yang memetakan kecenderungan perilaku alami pada 8 dimensi soft skills.
                </li>
                <li>
                  <strong>O*NET (Occupational Information Network) Database:</strong> Standar rujukan taksonomi kompetensi kerja resmi dari U.S. Department of Labor, Employment and Training Administration (USDOL/ETA) yang diintegrasikan dengan bursa kerja modern.
                </li>
                <li>
                  <strong>Sistem Inferensi Model Bahasa Cerdas:</strong> Analisis kesenjangan, sintesis kapabilitas praktis, serta perancangan rencana aksi 30/60/90 hari yang dipersonalisasi sesuai profilmu.
                </li>
              </ol>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Diterbitkan Secara Digital Oleh</span>
                <strong className="text-slate-800 text-sm">Gapless Advisory System</strong>
                <p className="text-[11px] text-slate-500">Accelerating Career Readiness</p>
              </div>
              <div className="text-right font-mono text-[10px] text-slate-400">
                <span>Dokumen ID: {report.reportNumber}</span>
                <div className="text-[9px] text-slate-400">Status: Verified Official Report</div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="py-2 text-center text-[10px] text-slate-400 border-t border-slate-200">
              © {new Date().getFullYear()} Gapless. Laporan ini dibuat eksklusif untuk <strong>{report.userName}</strong> dan tidak diperkenankan untuk disebarluaskan tanpa izin.
            </div>
            <PageFooter pageNum={11} />
          </div>
        </section>

      </div>
    </div>
  );
}
