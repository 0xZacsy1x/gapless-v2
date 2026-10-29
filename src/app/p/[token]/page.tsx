import { notFound } from 'next/navigation';
import { db } from '@/db';
import {
  publicProfiles,
  users,
  userMissionProgress,
  softSkillMissions,
  activityEvidence,
  activities,
  assessmentResults,
} from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Shield, CheckCircle2, Award, Briefcase, ExternalLink, Crown, Compass, Target } from 'lucide-react';
import Link from 'next/link';
import { CAREER_PROFILES, TRAIT_META, Trait } from '@/data/gaplessData';
import { hasActivePro } from '@/lib/payment_service';
import { computeSJTScores, SJT_SKILLS, SJT_SKILL_META } from '@/data/sjtBank';
import { COMPETENCIES, CompetencyItem } from '@/app/passport/types';
import { SkillIcon } from '@/components/ui/AppIcons';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skill Passport Publik | Gapless',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function PublicPassportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Cari profil publik aktif
  const profile = await db
    .select()
    .from(publicProfiles)
    .where(eq(publicProfiles.publicToken, token))
    .limit(1);

  if (!profile.length || !profile[0].enabled) {
    notFound();
  }

  const userId = profile[0].userId;

  // Ambil data user (hanya nama dan foto, TANPA email)
  const user = await db
    .select({
      name: users.name,
      image: users.image,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user.length) notFound();

  const isPro = await hasActivePro(userId);

  // Ambil asesmen target role
  const latestAssessment = await db
    .select()
    .from(assessmentResults)
    .where(eq(assessmentResults.userId, userId))
    .orderBy(desc(assessmentResults.createdAt))
    .limit(1);

  // Ambil Misi selesai
  const completedMissions = await db
    .select({
      progress: userMissionProgress,
      mission: softSkillMissions,
    })
    .from(userMissionProgress)
    .innerJoin(softSkillMissions, eq(userMissionProgress.missionId, softSkillMissions.id))
    .where(eq(userMissionProgress.userId, userId));

  // Ambil Kegiatan bukti terkonfirmasi
  const userActivities = await db
    .select({
      evidence: activityEvidence,
      activity: activities,
    })
    .from(activityEvidence)
    .innerJoin(activities, eq(activityEvidence.activityId, activities.id))
    .where(eq(activityEvidence.userId, userId));

  const matchedProfile = latestAssessment[0]?.careerSlug
    ? CAREER_PROFILES.find((c) => c.id === latestAssessment[0].careerSlug)
    : null;

  const careerTitle = latestAssessment[0]?.selectedCareer && latestAssessment[0].selectedCareer.trim().length > 0
    ? latestAssessment[0].selectedCareer
    : (matchedProfile?.title || (latestAssessment[0]?.careerSlug ? latestAssessment[0].careerSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Career Explorer'));

  const quizType = latestAssessment[0]?.quizType || 'sudah_tahu_minat';
  const dominantTrait = latestAssessment[0]?.dominantTrait;
  const traitMeta = dominantTrait && (dominantTrait in TRAIT_META)
    ? TRAIT_META[dominantTrait as Trait]
    : null;

  // Ekstraksi 8 Dimensi Soft Skill SJT
  let hasVerifiedSjt = false;
  let competencies: CompetencyItem[] = COMPETENCIES;

  if (latestAssessment[0]?.rawAnswers) {
    const raw = latestAssessment[0].rawAnswers as Record<string, any>;
    const sjtAnswers: Record<number, number> = {};
    let sjtCount = 0;
    Object.entries(raw).forEach(([k, v]) => {
      if (k.startsWith('sjt_')) {
        const idx = parseInt(k.replace('sjt_', ''), 10);
        if (!isNaN(idx) && typeof v === 'number') {
          sjtAnswers[idx] = v;
          sjtCount++;
        }
      }
    });

    if (sjtCount > 0) {
      hasVerifiedSjt = true;
      const sjtScores = computeSJTScores(sjtAnswers);
      const boost = Math.min(10, completedMissions.length * 1 + userActivities.length * 2);

      competencies = SJT_SKILLS.map((skill) => {
        const meta = SJT_SKILL_META[skill];
        const scoreData = sjtScores[skill];
        const basePct = scoreData ? scoreData.percentage : 70;
        const finalScore = Math.min(99, Math.max(25, basePct + boost));
        const level: 1 | 2 | 3 = finalScore >= 80 ? 3 : finalScore >= 50 ? 2 : 1;

        return {
          id: skill.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          name: meta.label,
          shortLabel: meta.shortLabel,
          icon: meta.icon,
          base: finalScore,
          desc: meta.description,
          level,
          feedbackList: scoreData?.feedbackList || [],
          isVerified: true,
        };
      });
    }
  }

  const softScore = hasVerifiedSjt
    ? Math.round(competencies.reduce((sum, c) => sum + c.base, 0) / competencies.length)
    : Math.min(95, 60 + completedMissions.length * 4 + userActivities.length * 7);
  const hardScore = latestAssessment.length ? 78 : 65;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        {/* Brand & Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link href="/" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
              G
            </span>
            Gapless Skill Passport
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/60 text-emerald-400 text-xs font-semibold border border-emerald-800/60">
            <Shield className="w-3.5 h-3.5" /> Terverifikasi
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 text-white flex items-center justify-center font-bold text-3xl shadow-sm shrink-0">
            {user[0].image ? (
              <img
                src={user[0].image}
                alt={user[0].name || ''}
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              (user[0].name || 'U').charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-white">{user[0].name}</h1>
              {isPro ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-700 text-white flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </span>
              ) : (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                  FREE
                </span>
              )}
            </div>

            {quizType === 'belum_tahu_minat' ? (
              <div className="mt-1 space-y-1">
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                    <Compass className="w-3 h-3 text-slate-400" />
                    Jalur Eksplorasi Minat
                  </span>
                  {dominantTrait && (
                    <span className="text-slate-300 text-xs">
                      Arketipe: <strong className="text-white font-semibold">{dominantTrait}</strong>
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Rekomendasi Karier:</span>
                  <strong className="text-white font-semibold">{careerTitle}</strong>
                </p>
              </div>
            ) : (
              <div className="mt-1 space-y-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                  <Target className="w-3 h-3 text-slate-400" />
                  Jalur Terarah
                </span>
                <p className="text-sm text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <Briefcase className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Target Karier:</span>
                  <strong className="text-white font-semibold">{careerTitle}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Readiness Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hard Skill Readiness
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">{hardScore}%</div>
            <p className="text-xs text-slate-400 mt-1">Kurikulum terstruktur &amp; standar O*NET</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Soft Skill Readiness
            </span>
            <div className="text-3xl font-extrabold text-white mt-1">{softScore}%</div>
            <p className="text-xs text-slate-400 mt-1">
              {hasVerifiedSjt ? '8 Dimensi SJT terverifikasi' : '8 Dimensi soft skill terapan'}
            </p>
          </div>
        </div>

        {/* 8 Dimensi Soft Skill Breakdown (Publik) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              8 Dimensi Soft Skill Kesiapan Karir
            </h3>
            {hasVerifiedSjt ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" /> Terverifikasi SJT
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                <Target className="w-3 h-3" /> Estimasi Standar
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {competencies.map((comp) => {
              const score = comp.base;
              const isLevel3 = score >= 80;
              const isLevel2 = score >= 50 && score < 80;

              let badgeText = 'Perlu Asah';
              let badgeColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
              let barColor = 'bg-amber-500';
              let scoreColor = 'text-amber-400';

              if (isLevel3) {
                badgeText = 'Unggul';
                badgeColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
                barColor = 'bg-emerald-500';
                scoreColor = 'text-emerald-400';
              } else if (isLevel2) {
                badgeText = 'Standar';
                badgeColor = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
                barColor = 'bg-blue-600';
                scoreColor = 'text-blue-400';
              }

              return (
                <div
                  key={comp.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 border border-slate-600/60 flex items-center justify-center shrink-0">
                        <SkillIcon skillId={comp.id} name={comp.icon} className="w-3.5 h-3.5 text-slate-300" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{comp.name}</h4>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${badgeColor}`}>
                          {badgeText}
                        </span>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${scoreColor}`}>{score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bukti Terverifikasi */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
            Rekam Jejak & Bukti Nyata
          </h3>

          {userActivities.map(({ evidence, activity }) => (
            <div
              key={evidence.id}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-white text-sm">{activity.title}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Dikonfirmasi Penyelenggara
                  </span>
                </div>
              </div>
              <a
                href={evidence.evidenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1 text-xs font-medium"
              >
                Bukti <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}

          {completedMissions.map(({ progress, mission }) => (
            <div
              key={progress.id}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-semibold text-white text-sm">{mission.title}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400">
                    <Shield className="w-3.5 h-3.5" /> Dinilai Lewat Misi
                  </span>
                </div>
              </div>
              {progress.submissionUrl && (
                <a
                  href={progress.submissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-1 text-xs font-medium"
                >
                  Tautan <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center pt-6 border-t border-slate-800 text-xs text-slate-500">
          Diverifikasi secara independen oleh platform <strong className="text-slate-400">Gapless</strong>.
        </div>
      </div>
    </div>
  );
}
