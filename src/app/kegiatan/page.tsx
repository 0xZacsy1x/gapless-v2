import { hasActivePro } from '@/lib/payment_service';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Navbar } from '@/components/Navbar';
import { LearningTabsNav } from '@/components/LearningTabsNav';
import { getEntitlements } from '@/lib/entitlements';
import { db } from '@/db';
import { activities, savedActivities, activityEvidence, assessmentResults } from '@/db/schema';
import { eq, asc, desc } from 'drizzle-orm';
import { KegiatanClient, ActivityItem } from './KegiatanClient';
import { findCareerProfile, formatShortCareer } from '@/data/gaplessData';

export const metadata = { title: 'Rekomendasi Kegiatan | Gapless' };

export default async function KegiatanPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/api/auth/signin?callbackUrl=/kegiatan');

  const [isPro, savedRows, evidenceRows, latestAssessment] = await Promise.all([
    hasActivePro(session.user.id),
    db
      .select({ activityId: savedActivities.activityId })
      .from(savedActivities)
      .where(eq(savedActivities.userId, session.user.id)),
    db
      .select()
      .from(activityEvidence)
      .where(eq(activityEvidence.userId, session.user.id)),
    db
      .select({
        careerSlug: assessmentResults.careerSlug,
        selectedCareer: assessmentResults.selectedCareer,
      })
      .from(assessmentResults)
      .where(eq(assessmentResults.userId, session.user.id))
      .orderBy(desc(assessmentResults.createdAt))
      .limit(1),
  ]);

  const ent = getEntitlements(isPro);

  // Ambil profil karier user jika ada
  const userCareerIdent = latestAssessment[0]?.selectedCareer || latestAssessment[0]?.careerSlug || null;
  const userProfile = findCareerProfile(userCareerIdent);
  const userCareerTitle = userProfile?.title || null;

  // Ambil kegiatan aktif
  const allDbActivities = await db
    .select()
    .from(activities)
    .where(eq(activities.isActive, true))
    .orderBy(asc(activities.sortOrder));

  // Hitung kecocokan role per kegiatan
  const formattedActivities: ActivityItem[] = allDbActivities.map((act) => {
    let isRoleMatch = false;
    let matchPercent = act.matchPercent || 80;

    if (userProfile && act.relevantRoles && act.relevantRoles.length > 0) {
      const rolesLower = act.relevantRoles.map((r) => r.toLowerCase());
      const careerTitleLower = userProfile.title.toLowerCase();
      const careerIdLower = userProfile.id.toLowerCase();

      // Cek apakah ada role yang cocok dengan profil user
      const matched = rolesLower.some((r) => {
        return (
          careerTitleLower.includes(r) ||
          r.includes(careerTitleLower) ||
          careerIdLower.includes(r.replace(/\s+/g, '-')) ||
          (r.includes('ai/ml') && careerIdLower.includes('ai-ml')) ||
          (r.includes('software engineer') && careerIdLower.includes('startup-founder')) ||
          (r.includes('devops') && careerIdLower.includes('product-manager')) ||
          (r.includes('ui/ux') && careerIdLower.includes('ux-designer')) ||
          (r.includes('data analyst') && careerIdLower.includes('data-scientist')) ||
          (r.includes('data researcher') && careerIdLower.includes('research-scientist')) ||
          (r.includes('digital marketing') && careerIdLower.includes('community-manager')) ||
          (r.includes('business development') && careerIdLower.includes('hr-business-partner')) ||
          (r.includes('content creator') && careerIdLower.includes('content-strategist')) ||
          (r.includes('graphic designer') && careerIdLower.includes('graphic-designer')) ||
          (r.includes('e-commerce') && careerIdLower.includes('ecommerce-specialist'))
        );
      });

      if (matched) {
        isRoleMatch = true;
        matchPercent = 95;
      }
    }

    return {
      id: act.id,
      title: act.title,
      type: act.type,
      organizer: act.organizer,
      description: act.description,
      competencyTags: act.competencyTags,
      skillTags: act.skillTags,
      relevantRoles: act.relevantRoles,
      fee: act.fee,
      semester: act.semester,
      location: act.location,
      deadline: act.deadline,
      registrationUrl: act.registrationUrl,
      matchPercent,
      isSample: act.isSample,
      isRoleMatch,
    };
  });

  // Jika user Pro atau memiliki target karier, prioritaskan kegiatan yang cocok dengan role di atas
  if (ent.isPro) {
    formattedActivities.sort((a, b) => {
      if (a.isRoleMatch && !b.isRoleMatch) return -1;
      if (!a.isRoleMatch && b.isRoleMatch) return 1;
      return (b.matchPercent || 0) - (a.matchPercent || 0);
    });
  }

  const savedIds = savedRows.map((r) => r.activityId);

  const evidenceMap = Object.fromEntries(
    evidenceRows.map((e) => [e.activityId, e])
  );

  // Gating: Free hanya lihat N kegiatan (misal 3 atau sesuai kuota)
  const limit = ent.activities.limit;
  const openActivities = Number.isFinite(limit)
    ? formattedActivities.slice(0, limit)
    : formattedActivities;
  const lockedCount = formattedActivities.length - openActivities.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex flex-col">
      <Navbar />
      <LearningTabsNav />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 pb-28 md:pb-8">
        <KegiatanClient
          activities={openActivities}
          savedIds={savedIds}
          evidenceMap={evidenceMap}
          isPro={ent.isPro}
          lockedCount={lockedCount}
          monthlyQuota={ent.activities.limit}
          userCareerTitle={userCareerTitle}
        />
      </main>
    </div>
  );
}
