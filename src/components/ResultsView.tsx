'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TrendingUp, ArrowRight, ArrowLeft, Brain, AlertCircle, Zap } from 'lucide-react';
import Link from 'next/link';
import { TRAIT_META } from '@/data/gaplessData';
import { useGaplessContext } from '@/contexts/CareerContext';
import { Navbar } from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { CareerIcon } from '@/components/ui/AppIcons';

const ArchetypeReasoningBlock = dynamic(
  () => import('./ArchetypeReasoningBlock').then((mod) => mod.ArchetypeReasoningBlock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm animate-pulse min-h-[260px] flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-200" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-slate-200 rounded-md" />
            <div className="h-3 w-32 bg-slate-100 rounded-md" />
          </div>
        </div>
        <div className="h-40 w-full bg-slate-100/70 rounded-2xl flex items-center justify-center" />
      </div>
    ),
  }
);

export function ResultsView() {
  const {
    traitScores,
    dominantTrait,
    recommendedCareers,
    selectCareer,
    reset,
    aiInsight,
    isLoadingAi,
    aiError,
    fetchAiInsight,
  } = useGaplessContext();

  const resultsRef = useRef<HTMLDivElement>(null);

  // Trigger AI analysis on mount
  useEffect(() => {
    fetchAiInsight();
  }, [fetchAiInsight]);

  useGSAP(() => {
    if (!resultsRef.current) return;
    gsap.fromTo(
      '.results-ai-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.results-careers-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.35, ease: 'power2.out' }
    );
  }, { scope: resultsRef });

  if (!dominantTrait) return null;

  const meta = TRAIT_META[dominantTrait as keyof typeof TRAIT_META];

  return (
    <div className="min-h-screen bg-space flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 py-6 md:py-10">
        <div ref={resultsRef} className="max-w-5xl mx-auto">
          {/* ── Top Navigation Bar ── */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Beranda</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/results"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-xs transition-all cursor-pointer"
              >
                <span>Riwayat Hasil</span>
              </Link>
              <Link
                href="/passport"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200/60 shadow-xs transition-all cursor-pointer"
              >
                <span>Skill Passport</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── Archetype Reasoning ── */}
          <ArchetypeReasoningBlock 
            dominantTrait={dominantTrait} 
            traitScores={traitScores} 
            keyTraits={aiInsight?.traits} 
          />

        {/* ── AI Personality Narrative ── */}
        <div className="results-ai-card glass-card p-8 mb-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center text-white shadow-xs">
              <Brain size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Analisis Kepribadian AI</h2>
              <p className="text-xs text-gray-400">
                {isLoadingAi
                  ? 'Menghubungkan ke neural engine...'
                  : aiError
                    ? 'Analisis AI sedang tidak tersedia'
                    : 'Didukung oleh AI Cerdas Gapless — berdasarkan pola jawaban spesifikmu'
                }
              </p>
            </div>
          </div>

          {isLoadingAi && (
            <div className="flex items-center gap-3 py-8 justify-center">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-500">
                Menganalisis pola kepribadianmu...
              </span>
            </div>
          )}

          {aiError && !isLoadingAi && (
            <div
              className="flex items-center gap-3 py-6 px-4 rounded-xl"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
            >
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <div>
                <p className="text-sm text-red-600">Analisis AI tidak tersedia</p>
                <p className="text-xs text-gray-500">
                  Hasil berbasis aturanmu tetap akurat. Narasi AI tidak dapat dihasilkan.
                </p>
              </div>
            </div>
          )}

          {aiInsight && !isLoadingAi && (
            <div>
              <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
                {aiInsight.personality_summary}
              </p>

              {aiInsight.reasoning && (
                <div className="mt-4">
                  <details className="group [&_summary::-webkit-details-marker]:hidden bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-blue-900">
                      <div className="flex items-center gap-2">
                        <Brain size={16} className="text-[#0066FF]" />
                        Bagaimana AI menyimpulkan ini?
                      </div>
                      <span className="transition duration-300 group-open:-rotate-180 text-blue-500">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="text-gray-600 text-[14px] leading-relaxed px-4 pb-4 whitespace-pre-line border-t border-blue-100/50 pt-3 mt-1">
                      {aiInsight.reasoning}
                    </div>
                  </details>
                </div>
              )}

              {/* Strengths */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap size={14} style={{ color: '#10b981' }} />
                  Kekuatan Utama
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aiInsight.strengths.map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.15)',
                        color: '#475569',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: '#10b981' }}
                      />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Recommended Careers ── */}
        {recommendedCareers.length > 0 && (
          <div className="results-careers-card glass-card p-8 mb-8" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.15)',
                }}
              >
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-slate-900 text-xl font-bold">Karir yang Direkomendasikan</h2>
                <p className="text-xs text-gray-500">
                  Pilihan terbaik untuk profilmu {dominantTrait} — klik untuk menjelajahi
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedCareers.map((career, i) => {
                return (
                  <button
                    key={career.id}
                    onClick={() => selectCareer(career)}
                    className="glass-card p-5 text-left group cursor-pointer flex flex-col h-full transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]"
                    style={{
                      border: `1px solid ${i === 0 ? `${meta.color}30` : '#e5e7eb'}`,
                    }}
                  >
                    {i === 0 && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md mb-3 inline-flex items-center gap-1.5 border self-start"
                        style={{
                          background: `${meta.color}10`,
                          color: meta.color,
                          borderColor: `${meta.color}30`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                        Pilihan Terbaik
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 mb-2">
                      <CareerIcon careerId={career.id} name={career.icon} className="w-5 h-5 text-slate-800" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-slate-900 font-bold mb-1">{career.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      {career.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap mb-3 text-xs font-mono">
                      <span className="font-semibold text-emerald-700">
                        {career.salaryRange}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 font-medium">
                        Pertumbuhan {career.growthOutlook}
                      </span>
                    </div>
                    <div className="mt-auto pt-2">
                      <div className="btn-primary flex items-center justify-center gap-2 text-sm w-full py-3 shadow-md group-hover:shadow-lg transition-all">
                        Analisis kesenjangan skill
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Reset ── */}
        <div className="text-center pb-8">
          <button
            onClick={reset}
            className="text-sm text-slate-400 hover:text-slate-600 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-colors cursor-pointer"
          >
            Ulangi asesmen
          </button>
        </div>
      </div>
    </main>
  </div>
);
}