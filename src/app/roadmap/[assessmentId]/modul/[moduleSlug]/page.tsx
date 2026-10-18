import Link from "next/link";
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { assessmentResults, roadmapProgress } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { CAREER_PROFILES, MODULE_DETAILS, findCareerProfile } from '@/data/gaplessData';
import { Navbar } from '@/components/Navbar';
import ModuleDetailClient from './ModuleDetailClient';
import { checkModuleSequence, isModuleDone } from '@/lib/roadmapSequence';
import { hasActivePro } from '@/lib/payment_service';
import { Lock, ArrowLeft } from 'lucide-react';

export default async function ModuleDetailPage({ params }: { params: Promise<{ assessmentId: string, moduleSlug: string }> }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  }

  const { assessmentId, moduleSlug } = await params;

  // 1. Ambil assessment result dari DB
  const rawResult = await db.query.assessmentResults.findFirst({
    where: eq(assessmentResults.id, assessmentId)
  });
  
  const result = rawResult?.userId === session.user.id ? rawResult : null;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Akses Ditolak</h2>
          <p className="text-slate-500 mb-6 text-sm">Hasil asesmen ini tidak ditemukan atau bukan milik akun kamu.</p>
          <Link href="/results" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition">
            Kembali ke Hasil Saya
          </Link>
        </div>
      </div>
    );
  }

  if (!result.selectedCareer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Roadmap Belum Dipilih</h2>
          <p className="text-slate-500 mb-6 text-sm">Kamu belum memilih fokus karier untuk asesmen ini.</p>
          <Link href={`/hasil/${assessmentId}`} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition">
            Pilih Karier Terlebih Dahulu
          </Link>
        </div>
      </div>
    );
  }

  // 2. Cocokkan profil karir
  const careerSlug = result.careerSlug || result.selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const profile = findCareerProfile(careerSlug) || findCareerProfile(result.selectedCareer) || CAREER_PROFILES[0];
  if (!profile || !profile.roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Profil Karier Tidak Ditemukan</h2>
          <p className="text-slate-500 mb-6 text-sm">Profil karier &quot;{result.selectedCareer}&quot; tidak ditemukan dalam sistem kurikulum.</p>
          <Link href={`/roadmap?assessmentId=${assessmentId}`} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition">
            Kembali ke Roadmap
          </Link>
        </div>
      </div>
    );
  }

  // 3. Ambil roadmap progress
  const progressRecord = await db.query.roadmapProgress.findFirst({
    where: (table, { and, eq }) => and(
      eq(table.careerSlug, careerSlug),
      eq(table.userId, session.user.id)
    )
  });
  
  const moduleStatuses = (progressRecord?.moduleStatuses as Record<string, any>) || {};
  const skillRatings = (result.skillRatings as Record<string, number>) || {};

  // 4. Validasi Sequence Unlocking & Pro Gating di Server
  const isPro = await hasActivePro(session.user.id);
  const sequenceStatus = checkModuleSequence({
    profile,
    moduleSlug,
    moduleStatuses,
    skillRatings,
    isPro,
  });

  if (!sequenceStatus.isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Modul Masih Terkunci</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {sequenceStatus.reason || 'Modul ini belum dapat diakses. Kamu harus menyelesaikan modul sebelumnya terlebih dahulu.'}
            </p>
            <Link
              href={`/roadmap?assessmentId=${assessmentId}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Roadmap Belajar
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const { targetPhaseIndex, targetModuleIndex, moduleTitle } = sequenceStatus;
  const phaseData = profile.roadmap[targetPhaseIndex];

  // 5. Cek apakah modul ini sudah selesai (idempotent)
  const isCompleted = isModuleDone({
    moduleSlug,
    moduleIndexInPhase: targetModuleIndex,
    profile,
    moduleStatuses,
    skillRatings,
  });

  const completedResourcesMap = (moduleStatuses._completed_resources as Record<string, number[]>) || {};
  const initialCompletedResources = completedResourcesMap[moduleSlug] || (isCompleted ? [0] : []);

  // 6. Ambil data kurasi modul
  const detailData = MODULE_DETAILS[moduleSlug] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F3FAFF]">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 relative z-10">
        <ModuleDetailClient 
          assessmentId={assessmentId}
          moduleSlug={moduleSlug}
          profile={profile}
          phaseData={phaseData}
          phaseIndex={targetPhaseIndex}
          detailData={detailData}
          moduleTitle={moduleTitle || moduleSlug}
          isCompleted={isCompleted}
          initialCompletedResources={initialCompletedResources}
        />
      </main>
    </div>
  );
}
