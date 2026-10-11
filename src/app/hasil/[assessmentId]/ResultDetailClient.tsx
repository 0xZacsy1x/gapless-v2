'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CAREER_PROFILES, getSkillGapData, TRAIT_META, Trait } from '@/data/gaplessData';
import dynamic from 'next/dynamic';

const ArchetypeReasoningBlock = dynamic(
  () => import('@/components/ArchetypeReasoningBlock').then((mod) => mod.ArchetypeReasoningBlock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm animate-pulse min-h-65 flex flex-col justify-between">
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

const AnalysisResultBlock = dynamic(
  () => import('@/components/AnalysisResultBlock').then((mod) => mod.AnalysisResultBlock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm animate-pulse min-h-105 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-56 bg-slate-200 rounded-md" />
            <div className="h-4 w-72 bg-slate-100 rounded-md" />
          </div>
          <div className="h-8 w-28 bg-slate-200 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-72 w-full bg-slate-100/70 rounded-2xl flex items-center justify-center" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 rounded" />
            <div className="h-10 w-40 bg-slate-200 rounded-xl mt-6" />
          </div>
        </div>
      </div>
    ),
  }
);
import { GapInsight } from '@/contexts/CareerContext';

interface Props {
  resultId: string;
  selectedCareer: string;
  skillRatings: Record<string, number>;
  dominantTrait: string;
  quizType: string;
  traitScores: Record<string, number>;
}

export function ResultDetailClient({
  resultId,
  selectedCareer,
  skillRatings,
  dominantTrait,
  quizType,
  traitScores,
}: Props) {
  const router = useRouter();

  const [gapInsight, setGapInsight] = useState<GapInsight | null>(null);
  const [isPurchased, setIsPurchased] = useState<boolean>(true);
  const [freeSummary, setFreeSummary] = useState<{ matchingSkills: string[]; developmentSkills: string[] } | null>(null);
  const [isLoadingGapAi, setIsLoadingGapAi] = useState(false);
  const [chartReady, setChartReady] = useState(false);

  // Find career profile
  const careerProfile = useMemo(() => {
    return CAREER_PROFILES.find((c) => c.title === selectedCareer) || null;
  }, [selectedCareer]);

  const careerSlug = useMemo(() => {
    if (careerProfile?.id) return careerProfile.id;
    return selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }, [careerProfile, selectedCareer]);

  // Compute skill gap data
  const skillGapData = useMemo(() => {
    if (!careerProfile || !skillRatings) return [];
    return getSkillGapData(careerProfile, skillRatings);
  }, [careerProfile, skillRatings]);

  // Build radar data
  const radarData = useMemo(() => {
    return skillGapData.map((s) => ({
      name: s.name.split(' ').slice(0, 2).join(' '),
      required: s.required,
      current: s.current,
    }));
  }, [skillGapData]);

  const traitMetaColor = useMemo(() => {
    if (!careerProfile) return '#3b82f6';
    return TRAIT_META[careerProfile.trait as Trait]?.color || '#3b82f6';
  }, [careerProfile]);

  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fetchInsight = useCallback(async () => {
    if (!careerProfile || !skillGapData.length) return;

    setIsLoadingGapAi(true);
    try {
      const res = await fetch('/api/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillGapData,
          roleName: careerProfile.title,
          careerSlug,
        }),
      });

      if (res.status === 402) {
        const data = await res.json();
        setIsPurchased(false);
        setFreeSummary(data.freeSummary || null);
      } else if (res.ok) {
        const data = await res.json();
        setIsPurchased(true);
        setGapInsight(data);
      }
    } catch (err) {
      console.error('Failed to fetch gap insight', err);
    } finally {
      setIsLoadingGapAi(false);
    }
  }, [careerProfile, skillGapData, careerSlug]);

  useEffect(() => {
    fetchInsight();
  }, [fetchInsight]);

  const hasTraitScores = useMemo(() => {
    if (!traitScores) return false;
    return Object.values(traitScores).some((val) => typeof val === "number" && val > 0);
  }, [traitScores]);

  const isValidationPath = quizType === "sudah_tahu_minat" || !hasTraitScores;

  if (!careerProfile) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl flex justify-center">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Pilihan Karier Belum Lengkap</h2>
          <p className="text-slate-500 text-sm mb-6">
            Hasil asesmen kepribadian telah tercatat, namun kamu belum memilih rekomendasi karier spesifik.
          </p>
          <button
            onClick={() => router.push('/results')}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs"
          >
            Kembali ke Hasil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      {/* Header Validasi Karier (Khusus Jalur Sudah Tahu Minat / Studi Kasus) */}
      {isValidationPath ? (
        <div className="mb-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-xs relative">
                <Image
                  src={`/${careerProfile.trait}.png`}
                  alt={careerProfile.trait}
                  width={72}
                  height={72}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                    <Target className="w-3.5 h-3.5" />
                    Validasi Kompetensi Karier
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: `${traitMetaColor}12`,
                      color: traitMetaColor,
                      border: `1px solid ${traitMetaColor}30`,
                    }}
                  >
                    <span>{TRAIT_META[careerProfile.trait as Trait]?.emoji || "🎯"}</span>
                    <span>Archetype: {careerProfile.trait}</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  {careerProfile.icon && <span className="text-2xl">{careerProfile.icon}</span>}
                  <span>{careerProfile.title}</span>
                </h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Evaluasi kompetensi berbasis kuis studi kasus industri. Grafik radar dan analisis di bawah mengukur kesiapan skill kamu terhadap standar bursa kerja terkini.
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 gap-2 shrink-0">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Estimasi Gaji Industri
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-900 bg-slate-50 md:bg-transparent px-3 py-1 md:p-0 rounded-lg">
                {careerProfile.salaryRange}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Archetype Reasoning Section (Khusus Jalur Belum Tahu Minat) */
        <div className="mb-8">
          <ArchetypeReasoningBlock
            dominantTrait={dominantTrait}
            traitScores={traitScores}
          />
        </div>
      )}

      {/* Analysis Result (Radar + Gap Insight) */}
      <AnalysisResultBlock
        radarData={radarData}
        traitMetaColor={traitMetaColor}
        chartReady={chartReady}
        isLoadingGapAi={isLoadingGapAi}
        gapInsight={gapInsight}
        isPurchased={isPurchased}
        freeSummary={freeSummary}
        careerName={careerProfile.title}
        careerSlug={careerSlug}
        assessmentId={resultId}
        onPurchaseSuccess={() => {
          fetchInsight();
        }}
        roadmapHref={`/roadmap?assessmentId=${resultId}`}
      />
    </div>
  );
}
