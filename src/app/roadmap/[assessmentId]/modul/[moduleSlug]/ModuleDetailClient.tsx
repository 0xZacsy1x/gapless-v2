'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ArrowLeft,
  Target,
  Play,
  Book,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink,
  Clock,
  Check,
  X
} from 'lucide-react';
import type { CareerProfile, CurriculumPhase, ModuleDetail } from '@/data/gaplessData';
import { useGaplessContext } from '@/contexts/CareerContext';

interface Props {
  assessmentId?: string;
  moduleSlug: string;
  profile: CareerProfile;
  phaseData: CurriculumPhase;
  phaseIndex: number;
  detailData: ModuleDetail | null;
  moduleTitle: string;
  isCompleted: boolean;
  initialCompletedResources?: number[];
}

export default function ModuleDetailClient({
  assessmentId,
  moduleSlug,
  profile,
  phaseData,
  phaseIndex,
  detailData: initialDetailData,
  moduleTitle,
  isCompleted: initialCompleted,
  initialCompletedResources = [],
}: Props) {
  const router = useRouter();
  const context = useGaplessContext();

  const [detailData, setDetailData] = useState<ModuleDetail | null>(initialDetailData);
  const totalResources = detailData?.resources?.length || 4;

  const [completedResources, setCompletedResources] = useState<number[]>(
    initialCompletedResources.length > 0 ? initialCompletedResources : []
  );
  const isAllResourcesDone = completedResources.length >= totalResources && totalResources > 0;
  const [isCompleted, setIsCompleted] = useState(
    initialCompleted && initialCompletedResources.length >= totalResources
  );
  const [isStudying, setIsStudying] = useState(false);
  const [studyNotice, setStudyNotice] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openedResources, setOpenedResources] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(!initialDetailData);
  const isCheckingRef = useRef(false);

  // Auto-dismiss toast setelah 4 detik
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Fungsi pengecekan durasi belajar ke server (Idempotent)
  const checkStudyProgress = useCallback(async (showNoticeOnIncomplete = true) => {
    if (!assessmentId || isCheckingRef.current) return;

    try {
      isCheckingRef.current = true;
      const res = await fetch('/api/roadmap/check-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          moduleSlug,
          totalResources: detailData?.resources?.length || 4,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedCompleted = data.completedResources || [];
        setCompletedResources(updatedCompleted);

        const currentTotal = data.totalResources || detailData?.resources?.length || 4;
        const isNowAllDone = updatedCompleted.length >= currentTotal;

        if (isNowAllDone) {
          setIsCompleted(true);
          setIsStudying(false);
          setStudyNotice(null);
          setToastMessage('Selamat! Seluruh materi selesai dan modul ini telah tuntas ✓');
          router.refresh();
        } else if (data.newlyCompletedResource) {
          setIsCompleted(false);
          setIsStudying(data.isStudying || false);
          setStudyNotice(null);
          setToastMessage('Materi selesai! Silakan lanjutkan ke materi berikutnya ✓');
        } else if (data.isStudying) {
          setIsStudying(true);
          if (showNoticeOnIncomplete) {
            setStudyNotice(
              'Sedang dipelajari — Pelajari materi di tab baru dengan fokus. Centang hijau akan otomatis muncul setelah kamu kembali.'
            );
          }
        } else {
          setIsStudying(false);
        }
      }
    } catch (err) {
      console.error('Failed to check study status', err);
    } finally {
      isCheckingRef.current = false;
    }
  }, [assessmentId, moduleSlug, detailData, router]);

  // Event listener saat user kembali ke tab (visibilitychange / focus / pageshow)
  useEffect(() => {
    if (isCompleted || isAllResourcesDone) return;

    const handleReturnToTab = () => {
      if (document.visibilityState === 'visible') {
        checkStudyProgress(true);
      }
    };

    const handleFocus = () => {
      checkStudyProgress(true);
    };

    document.addEventListener('visibilitychange', handleReturnToTab);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleFocus);

    // Cek status saat pertama kali load halaman
    checkStudyProgress(false);

    return () => {
      document.removeEventListener('visibilitychange', handleReturnToTab);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleFocus);
    };
  }, [isCompleted, checkStudyProgress]);

  // Handler saat user mengklik sumber belajar eksternal (Harus urut dari atas)
  const handleOpenResource = async (index: number, url?: string) => {
    const isUnlocked = index === 0 || completedResources.includes(index - 1);
    if (!isUnlocked) {
      setStudyNotice("Selesaikan materi sebelumnya terlebih dahulu untuk membuka materi ini.");
      return;
    }

    setOpenedResources((prev) => (prev.includes(index) ? prev : [...prev, index]));

    if (!assessmentId || completedResources.includes(index)) return;

    setIsStudying(true);
    setStudyNotice('Sesi belajar aktif. Pelajari materi di tab baru dengan fokus, centang hijau akan otomatis muncul saat kamu kembali.');

    try {
      await fetch('/api/roadmap/start-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          moduleSlug,
          resourceIndex: index,
        }),
      });
    } catch (err) {
      console.error('Failed to start study session', err);
    }
  };

  // Fallback AI dynamic generation jika silabus belum terisi
  useEffect(() => {
    if (!initialDetailData && !detailData) {
      const fetchInsight = async () => {
        setIsGenerating(true);
        try {
          const res = await fetch('/api/module-insight', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              moduleName: moduleTitle,
              roleName: profile.title,
              moduleSlug: moduleSlug,
              careerSlug: profile.id,
            }),
          });

          if (res.ok) {
            const fetched = await res.json();
            setDetailData({
              slug: moduleSlug,
              title: moduleTitle,
              ...fetched,
            });
          } else {
            setDetailData({
              slug: moduleSlug,
              title: moduleTitle,
              duration: 'Estimasi 1-2 Jam',
              target: 'Menguasai konsep dasar materi ini dalam proyek industri nyata.',
              breakdown: [{ title: 'Dasar Pemahaman', description: 'Pengenalan dan terminologi esensial' }],
              resources: [
                {
                  title: `Tutorial "${moduleTitle}" di YouTube`,
                  type: 'Video',
                  url: `https://www.youtube.com/results?search_query=${encodeURIComponent(moduleTitle)}`,
                  isFree: true,
                  provider: 'YouTube',
                },
                {
                  title: `Panduan & Artikel "${moduleTitle}"`,
                  type: 'Artikel',
                  url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(moduleTitle)}`,
                  isFree: true,
                  provider: 'freeCodeCamp',
                },
                {
                  title: `Dokumentasi Teknis "${moduleTitle}"`,
                  type: 'Dokumentasi',
                  url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(moduleTitle)}`,
                  isFree: true,
                  provider: 'MDN Web Docs',
                },
              ],
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsGenerating(false);
        }
      };

      fetchInsight();
    }
  }, [initialDetailData, detailData, moduleTitle, moduleSlug, profile.title, profile.id]);

  const handleBack = () => {
    if (!assessmentId) {
      context.setView('roadmap');
    } else {
      router.push(`/roadmap?assessmentId=${assessmentId}`);
    }
  };

  const badgeStatus = isCompleted ? (
    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
      Selesai
    </span>
  ) : isStudying ? (
    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs animate-pulse">
      <Clock className="w-3.5 h-3.5 text-blue-600" />
      Sedang Dipelajari
    </span>
  ) : (
    <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
      Belum Selesai
    </span>
  );

  if (isGenerating || !detailData) {
    return (
      <div className="flex flex-col gap-8 pb-20 items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Book className="w-12 h-12 text-blue-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-800">Memuat Silabus Modul...</h2>
          <p className="text-slate-500 max-w-md text-sm">
            Menyiapkan materi terstruktur dan sumber belajar terverifikasi untuk modul &quot;{moduleTitle}&quot;.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Toast Notification — Auto dismiss dalam 4 detik, posisi di bawah navbar agar tidak menutupi akun */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:top-24 sm:right-8 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 text-sm font-semibold animate-in fade-in slide-in-from-top-3 duration-300">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-1 p-1 hover:bg-emerald-700/60 rounded-lg transition-colors cursor-pointer text-emerald-100 hover:text-white"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center text-xs sm:text-sm text-slate-500 gap-1.5 font-medium mb-2 flex-wrap">
        <button onClick={handleBack} className="hover:text-blue-600 hover:underline transition-colors cursor-pointer">
          Roadmap Belajar {profile.title}
        </button>
        <ChevronRight size={14} className="opacity-50" />
        <button onClick={handleBack} className="hover:text-blue-600 hover:underline transition-colors cursor-pointer">
          Fase {phaseIndex + 1}: {phaseData.title}
        </button>
        <ChevronRight size={14} className="opacity-50" />
        <span className="text-slate-900 font-bold underline decoration-slate-300 underline-offset-4">
          {detailData.title}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="w-max bg-slate-100 text-slate-700 px-3.5 py-1 rounded-full text-xs font-bold border border-slate-200">
          Fase {phaseIndex + 1}: {phaseData.title}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {detailData.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
          Pahami konsep ini dan pelajari sumber referensi pilihan untuk meningkatkan kesiapan kariermu.
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
            {detailData.duration}
          </span>
          {badgeStatus}
        </div>
      </div>

      {/* Study Notice Banner */}
      {studyNotice && !isCompleted && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-bold">Proses Belajar Berlangsung: </span>
            {studyNotice}
          </div>
        </div>
      )}

      {/* Target Modul */}
      <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-xs flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shrink-0 shadow-xs">
          <Target size={22} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Target Kompetensi</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1">
            {detailData.target}
          </p>
        </div>
      </div>

      {/* Konten 2 Kolom */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {/* Header Card Fase */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl w-28 h-24 shrink-0 shadow-md relative overflow-hidden px-2">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full blur-md"></div>
            <span className="text-xs font-semibold opacity-90">Fase {phaseIndex + 1}</span>
            <span className="text-base sm:text-lg font-black text-center truncate w-full">
              {['Dasar', 'Menengah', 'Lanjutan', 'Ekspert'][phaseIndex] || 'Ekspert'}
            </span>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 font-bold mb-1 tracking-wider uppercase">{phaseData.duration}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 tracking-tight">{phaseData.subtitle}</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{phaseData.description}</p>
          </div>
        </div>

        {/* 2 Kolom Konten */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri: Breakdown Materi */}
          <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center gap-2.5 mb-6">
              <Book className="text-blue-600 w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Silabus &amp; Pokok Bahasan</h3>
            </div>
            
            <div className="space-y-4">
              {detailData.breakdown.map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    <span className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Sumber Belajar Rekomendasi */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <Unlock className="text-blue-600 w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Sumber Belajar Rekomendasi</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Otomatis tercatat
              </span>
            </div>

            <div className="space-y-3">
              {detailData.resources.map((res, idx) => {
                const isVideo = res.type === 'Video';
                const hasOpened = openedResources.includes(idx);
                const isResourceDone = completedResources.includes(idx);
                // Terbuka hanya jika materi pertama (idx === 0) atau materi tepat sebelumnya sudah selesai
                const isUnlocked = idx === 0 || completedResources.includes(idx - 1);
                const Icon = !isUnlocked ? Lock : isVideo ? Play : res.isFree ? Book : Lock;
                const isValidUrl = res.url && res.url !== '#';
                
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center p-4 rounded-2xl border transition-all gap-4 ${
                      !isUnlocked
                        ? 'border-slate-200/60 bg-slate-50/60 opacity-60 select-none'
                        : isResourceDone
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : hasOpened
                            ? 'border-blue-300 bg-blue-50/10'
                            : 'border-slate-200 hover:border-blue-300 bg-white shadow-xs'
                    }`}
                  >
                    <div className={`${!isUnlocked ? 'bg-slate-300 text-slate-500' : isResourceDone ? 'bg-emerald-600 text-white' : hasOpened ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'} p-3 rounded-xl shrink-0 transition-colors`}>
                      <Icon size={18} fill={!isUnlocked ? "none" : isVideo ? "currentColor" : "none"} />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      {isUnlocked && isValidUrl ? (
                        <a 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={() => handleOpenResource(idx, res.url)}
                          className="font-bold text-blue-700 text-sm truncate hover:underline flex items-center gap-1.5"
                          title="Buka link materi di tab baru"
                        >
                          <span className="truncate">{res.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        </a>
                      ) : (
                        <span className={`font-bold text-sm truncate flex items-center gap-1.5 ${!isUnlocked ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span className="truncate">{res.title}</span>
                          {!isUnlocked && <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                        </span>
                      )}
                      <span className="text-xs text-slate-400 mt-0.5">{res.provider}</span>
                      <div className="flex items-center gap-2 mt-2">
                        {res.isFree ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">Free</span>
                        ) : (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">{res.price || 'Berbayar'}</span>
                        )}
                        <span className="bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{res.type}</span>
                      </div>
                    </div>

                    {/* Status Tombol Buka / Terkunci */}
                    {!isUnlocked ? (
                      <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200/80 cursor-not-allowed">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Terkunci</span>
                      </div>
                    ) : isValidUrl ? (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOpenResource(idx, res.url)}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          isResourceDone
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : hasOpened
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900 shadow-xs'
                        }`}
                      >
                        {isResourceDone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="hidden sm:inline">Selesai</span>
                          </>
                        ) : hasOpened ? (
                          <>
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Buka Lagi</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Buka Materi</span>
                          </>
                        )}
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Info Box Alur Belajar Otomatis */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-2.5 mt-4 leading-relaxed">
              <span className="text-base shrink-0">💡</span>
              <span>
                <strong>Cara menyelesaikan modul:</strong> Pelajari setiap materi di atas secara berurutan dari atas ke bawah. Saat kamu kembali ke tab Gapless ini setelah mempelajari suatu materi, materi tersebut akan otomatis tercentang dan materi selanjutnya akan terbuka. Selesaikan seluruh ke-4 materi untuk menuntaskan modul ini dan membuka modul berikutnya di roadmap.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigasi */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <Link 
          href={assessmentId ? `/roadmap?assessmentId=${assessmentId}` : "/roadmap"}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs text-xs sm:text-sm cursor-pointer"
        >
          <ArrowLeft size={16} /> Kembali ke Roadmap Belajar
        </Link>

        {isAllResourcesDone || isCompleted ? (
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-xs sm:text-sm">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Modul Ini Telah Selesai ✓</span>
          </div>
        ) : isStudying ? (
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200 text-xs sm:text-sm">
            <Loader2 size={16} className="text-blue-600 animate-spin" />
            <span>Sedang Dipelajari — Kembali ke tab ini setelah selesai belajar</span>
          </div>
        ) : completedResources.length > 0 ? (
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium border border-slate-200 text-xs sm:text-sm">
            <span>Materi {completedResources.length} dari {totalResources} Selesai — Lanjutkan materi berikutnya</span>
          </div>
        ) : (
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-500 font-medium border border-slate-200 text-xs sm:text-sm">
            <span>Buka materi di atas untuk memulai sesi belajar</span>
          </div>
        )}
      </div>
    </div>
  );
}
