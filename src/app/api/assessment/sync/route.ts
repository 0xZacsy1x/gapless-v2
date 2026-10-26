import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { assessmentResults, roadmapProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { computeTraitScores, getDominantTrait, CAREER_PROFILES } from '@/data/gaplessData';
import { z } from 'zod';
import { getRemainingAttempts } from '@/lib/assessmentLimit';

const RequestSchema = z.object({
  assessmentId: z.string().nullable().optional(),
  rawAnswers: z.record(z.string().or(z.number()), z.number()),
  selectedCareer: z.string().nullable().optional(),
  skillRatings: z.record(z.string(), z.number()).nullable().optional(),
  quizType: z.enum(['belum_tahu_minat', 'sudah_tahu_minat']).optional(),
  dominantTrait: z.enum(['The Thinker', 'The Creator', 'The Connector', 'The Builder']).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const rawBody = await req.json();
    const validationResult = RequestSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Bad Request', details: validationResult.error.format() }, { status: 400 });
    }

    const { assessmentId, rawAnswers, selectedCareer, skillRatings } = validationResult.data;
    const quizType = validationResult.data.quizType || 'belum_tahu_minat';
    let finalDominantTrait = validationResult.data.dominantTrait;

    let careerSlug: string | null = null;
    let actualTrait = finalDominantTrait;
    if (selectedCareer) {
      const profile = CAREER_PROFILES.find((p) => p.title === selectedCareer);
      if (profile) {
        careerSlug = profile.id;
        actualTrait = profile.trait;
      }
    }

    if (quizType === 'belum_tahu_minat') {
      // Recompute trait scores on server to ensure validity and security
      const serverTraitScores = computeTraitScores(rawAnswers);
      const serverDominantTrait = getDominantTrait(serverTraitScores);

      if (!serverDominantTrait) {
        return NextResponse.json({ error: 'Failed to compute dominant trait' }, { status: 400 });
      }
      finalDominantTrait = serverDominantTrait;
    } else {
      // For sudah_tahu_minat, use the trait from the career profile or fallback
      if (!finalDominantTrait) {
        finalDominantTrait = actualTrait || 'The Thinker';
      }
    }

    let newResult;

    const userTier = (session.user as any).tier || 'FREE';
    const { isAllowed, limit } = await getRemainingAttempts(userId, quizType, userTier);

    if (!assessmentId && !isAllowed) {
      return NextResponse.json(
        { error: 'Attempt Limit Reached', message: `Anda telah menggunakan ${limit} kesempatan gratis.` },
        { status: 403 }
      );
    }

    if (assessmentId) {
      // Update existing
      const existing = await db.query.assessmentResults.findFirst({
        where: and(eq(assessmentResults.id, assessmentId), eq(assessmentResults.userId, userId))
      });

      let updatedTraitScores = existing?.traitScores as Record<string, number> | undefined;
      if (!updatedTraitScores || quizType === 'belum_tahu_minat') {
        const computed = computeTraitScores(rawAnswers);
        const hasValidComputed = Object.values(computed).some(val => typeof val === 'number' && val > 0);
        if (hasValidComputed) {
          updatedTraitScores = computed;
        } else if (!updatedTraitScores) {
          updatedTraitScores = { 'The Thinker': 0, 'The Creator': 0, 'The Connector': 0, 'The Builder': 0 };
        }
      }

      const [updated] = await db.update(assessmentResults).set({
        rawAnswers,
        traitScores: updatedTraitScores,
        dominantTrait: finalDominantTrait || existing?.dominantTrait || 'The Thinker',
        selectedCareer: selectedCareer || existing?.selectedCareer || null,
        careerSlug: careerSlug || existing?.careerSlug || null,
        skillRatings: skillRatings || existing?.skillRatings || null,
      }).where(and(eq(assessmentResults.id, assessmentId), eq(assessmentResults.userId, userId))).returning();
      newResult = updated;
    } else {
      // Create new (Retake / First Time)
      // Soft-delete the previous active result for this quizType
      await db.update(assessmentResults)
        .set({ isActive: false })
        .where(
          and(
            eq(assessmentResults.userId, userId),
            eq(assessmentResults.quizType, quizType),
            eq(assessmentResults.isActive, true)
          )
        );

      // Insert the new one
      const [inserted] = await db.insert(assessmentResults).values({
        userId: userId,
        quizType: quizType,
        isActive: true,
        rawAnswers,
        traitScores: quizType === 'belum_tahu_minat' ? computeTraitScores(rawAnswers) : { 'The Thinker': 0, 'The Creator': 0, 'The Connector': 0, 'The Builder': 0 },
        dominantTrait: finalDominantTrait,
        selectedCareer: selectedCareer || null,
        careerSlug: careerSlug,
        skillRatings: skillRatings || null,
      }).returning();
      newResult = inserted;
    }

    if (newResult && careerSlug) {
      // Ensure roadmapProgress exists for this (userId, careerSlug)
      const existingProgress = await db.query.roadmapProgress.findFirst({
        where: and(
          eq(roadmapProgress.userId, userId),
          eq(roadmapProgress.careerSlug, careerSlug)
        )
      });
      if (!existingProgress) {
        await db.insert(roadmapProgress).values({
          userId: userId,
          careerSlug: careerSlug,
          moduleStatuses: {},
        });
      }
    }

    return NextResponse.json({ success: true, result: newResult });
  } catch (error) {
    console.error('Failed to sync assessment result:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
