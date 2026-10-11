import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Riwayat Hasil Asesmen | Gapless',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { db } from '@/db';
import { assessmentResults } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { Navbar } from '@/components/Navbar';
import AnimatedResultsClient, { ResultType } from './ResultsClient';

export default async function ResultsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/api/auth/signin?callbackUrl=/results');
  }

  const results = await db
    .select()
    .from(assessmentResults)
    .where(
      and(
        eq(assessmentResults.userId, session.user.id),
        eq(assessmentResults.isActive, true)
      )
    );

  // Parse out the fields required by the client component type ResultType
  const parsedResults = results.map(r => ({
    id: r.id,
    createdAt: r.createdAt,
    dominantTrait: r.dominantTrait || '',
    selectedCareer: r.selectedCareer,
    quizType: r.quizType,
    traitScores: r.traitScores
  }));

  const belumTahu = parsedResults.find(r => r.quizType === 'belum_tahu_minat') as ResultType;
  const sudahTahu = parsedResults.find(r => r.quizType === 'sudah_tahu_minat') as ResultType;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <AnimatedResultsClient belumTahu={belumTahu} sudahTahu={sudahTahu} />
    </div>
  );
}