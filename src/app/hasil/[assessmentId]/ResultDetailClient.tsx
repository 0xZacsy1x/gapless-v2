"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Target, Sparkles, ArrowRight, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CAREER_PROFILES,
  getSkillGapData,
  TRAIT_META,
  Trait,
  CareerProfile,
  getRecommendedCareers,
} from "@/data/gaplessData";
import { useGaplessContext } from "@/contexts/CareerContext";
import dynamic from "next/dynamic";
import { GapInsight } from "@/contexts/CareerContext";

const ArchetypeReasoningBlock = dynamic(
  () => import("@/components/ArchetypeReasoningBlock").then((mod) => mod.ArchetypeReasoningBlock),
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
  () => import("@/components/AnalysisResultBlock").then((mod) => mod.AnalysisResultBlock),
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

interface Props {
  resultId: string;
  selectedCareer?: string | null;
  skillRatings?: Record<string, number> | null;
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
  const { selectCareer, setCurrentView, setQuizType, setCurrentAssessmentId } = useGaplessContext();

  const [gapInsight, setGapInsight] = useState<GapInsight | null>(null);
  const [isPurchased, setIsPurchased] = useState<boolean>(true);
  const [freeSummary, setFreeSummary] = useState<{ matchingSkills: string[]; developmentSkills: string[] } | null>(null);
  const [isLoadingGapAi, setIsLoadingGapAi] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  const [selectingCareerId, setSelectingCareerId] = useState<string | null>(null);

  // Find career profile if career is selected
  const careerProfile = useMemo(() => {
    if (!selectedCareer) return null;
    return CAREER_PROFILES.find((c) => c.title.toLowerCase() === selectedCareer.toLowerCase() || c.id === selectedCareer) || null;
  }, [selectedCareer]);

  const careerSlug = useMemo(() => {
    if (careerProfile?.id) return careerProfile.id;
    if (selectedCareer) return selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    return "";
  }, [careerProfile, selectedCareer]);

  // Compute skill gap data
  const skillGapData = useMemo(() => {
    if (!careerProfile || !skillRatings) return [];
    return getSkillGapData(careerProfile, skillRatings);
  }, [careerProfile, skillRatings]);

  // Build radar data
  const radarData = useMemo(() => {
    return skillGapData.map((s) => ({
      name: s.name.split(" ").slice(0, 2).join(" "),
      required: s.required,
      current: s.current,
    }));
  }, [skillGapData]);

  const traitMetaColor = useMemo(() => {
    if (!careerProfile) {
      return TRAIT_META[dominantTrait as Trait]?.color || "#3b82f6";
    }
    return TRAIT_META[careerProfile.trait as Trait]?.color || "#3b82f6";
  }, [careerProfile, dominantTrait]);

  // Recommended careers for this dominant trait
  const recommendedCareers = useMemo(() => {
    return getRecommendedCareers((dominantTrait as Trait) || "The Thinker");
  }, [dominantTrait]);

  useEffect(() => {
    const t = setTimeout(() => setChartReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fetchInsight = useCallback(async () => {
    if (!careerProfile || !skillGapData.length) return;

    setIsLoadingGapAi(true);
    try {
      const res = await fetch("/api/analyze-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      console.error("Failed to fetch gap insight", err);
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

  const handleSelectCareer = (career: CareerProfile) => {
    setSelectingCareerId(career.id);
    setCurrentAssessmentId(resultId);
    selectCareer(career);
    setQuizType(quizType || "belum_tahu_minat");
    setCurrentView("skills");
    router.push("/assessment");
  };

  // ── Render Tampilan Jika Belum Memilih Karier Spesifik ──
  if (!careerProfile) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
        {/* Archetype Reasoning Section */}
        <div className="mb-10">
          <ArchetypeReasoningBlock
            dominantTrait={dominantTrait}
            traitScores={traitScores}
          />
        </div>

        {/* CTA Banner: Pilih Karier untuk Lanjut */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none transform translate-x-20 -translate-y-20" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3 border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Langkah Selanjutnya: Validasi Karier</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">
              Pilih Fokus Kariermu &amp; Lanjutkan Studi Kasus
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-5">
              Berdasarkan kepribadian <strong className="text-white underline decoration-amber-300 font-bold">{dominantTrait}</strong>, kami telah menyaring rekomendasi karier paling ideal untuk potensimu. Pilih salah satu karier di bawah untuk menyelesaikan tes studi kasus (10 soal) dan membuka analisis kesiapan skill serta roadmap belajar personalmu.
            </p>
            <a
              href="#rekomendasi-karier"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-slate-100 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              <span>Pilih Karier untuk Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Daftar Rekomendasi Karier */}
        <div id="rekomendasi-karier" className="mb-12 scroll-mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>Rekomendasi Karier Terbaik</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {recommendedCareers.length} Pilihan
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Karier dengan kecocokan tertinggi untuk profil kepribadian {dominantTrait}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCareers.map((career, idx) => {
              const isFirst = idx === 0;
              const isSelected = selectingCareerId === career.id;

              return (
                <div
                  key={career.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md ${
                    isFirst ? "border-blue-300 ring-1 ring-blue-100" : "border-slate-200/90"
                  }`}
                >
                  {isFirst && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Pilihan Teratas
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl p-2.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs">
                        {career.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                          {career.title}
                        </h3>
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full mt-1">
                          {career.salaryRange}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {career.description}
                    </p>

                    {/* Skill Preview */}
                    <div className="mb-6">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Kompetensi Kunci
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.slice(0, 4).map((sk) => (
                          <span
                            key={sk.name}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/60 font-medium"
                          >
                            {sk.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectCareer(career)}
                    disabled={selectingCareerId !== null}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isFirst
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {isSelected ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Membuka Studi Kasus...</span>
                      </>
                    ) : (
                      <>
                        <span>Pilih Karier Ini &amp; Lanjut Studi Kasus</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Placeholder Bagian Terkunci: Skill Gap & Roadmap */}
        <div className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-200/80 shadow-xs">
            <Lock className="w-5 h-5 text-slate-500" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Analisis Radar Kompetensi &amp; Learning Roadmap
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-4">
            Grafik radar skill gap, evaluasi kesiapan kerja, dan kurikulum roadmap akan otomatis terbuka setelah kamu memilih salah satu rekomendasi karier di atas dan menyelesaikan 10 soal studi kasus industri.
          </p>
          <a
            href="#rekomendasi-karier"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>Pilih salah satu karier di atas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // ── Render Tampilan Normal (Karier Sudah Terpilih) ──
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
