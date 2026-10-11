'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CAREER_PROFILES, getSkillGapData, TRAIT_META, Trait } from '@/data/gaplessData';
import dynamic from 'next/dynamic';

const ArchetypeReasoningBlock = dynamic(
  () => import('@/components/ArchetypeReasoningBlock').then((mod) => mod.ArchetypeReasoningBlock),
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

const AnalysisResultBlock = dynamic(
  () => import('@/components/AnalysisResultBlock').then((mod) => mod.AnalysisResultBlock),
  {
    ssr: false,
    loading: () => (
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm animate-pulse min-h-[420px] space-y-6">
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
      {/* Archetype Reasoning Section */}
      <div className="mb-8">
        <ArchetypeReasoningBlock
          dominantTrait={dominantTrait}
          traitScores={traitScores}
        />
      </div>

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
