import { NextResponse } from 'next/server';
import { db } from '@/db';
import { assessmentResults, roadmapProgress } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/auth';
import { z } from 'zod';
import { findCareerProfile, CAREER_PROFILES } from '@/data/gaplessData';
import { checkModuleSequence, MIN_STUDY_SECONDS } from '@/lib/roadmapSequence';
import { hasActivePro } from '@/lib/payment_service';

const RequestSchema = z.object({
  assessmentId: z.string().min(1, 'Missing assessmentId'),
  moduleSlug: z.string().min(1, 'Missing moduleSlug'),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await req.json();
    const validationResult = RequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Bad Request', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { assessmentId, moduleSlug } = validationResult.data;

    // 1. Ambil data asesmen milik user
    const assessment = await db.query.assessmentResults.findFirst({
      where: and(
        eq(assessmentResults.id, assessmentId),
        eq(assessmentResults.userId, session.user.id)
      ),
    });

    if (!assessment || !assessment.selectedCareer) {
      return NextResponse.json(
        { error: 'Asesmen tidak ditemukan atau karier belum dipilih' },
        { status: 404 }
      );
    }

    const careerSlug =
      assessment.careerSlug ||
      assessment.selectedCareer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const profile =
      findCareerProfile(careerSlug) ||
      findCareerProfile(assessment.selectedCareer) ||
      CAREER_PROFILES[0];

    // 2. Ambil roadmap progress
    const progress = await db.query.roadmapProgress.findFirst({
      where: and(
        eq(roadmapProgress.careerSlug, careerSlug),
        eq(roadmapProgress.userId, session.user.id)
      ),
    });

    if (!progress) {
      return NextResponse.json({ error: 'Progress belum diinisialisasi' }, { status: 404 });
    }

    const moduleStatuses = (progress.moduleStatuses as Record<string, any>) || {};
    const skillRatings = (assessment.skillRatings as Record<string, number>) || {};

    // 3. Jika modul sudah selesai sebelumnya, langsung return sukses idempotent
    if (moduleStatuses[moduleSlug] === true) {
      return NextResponse.json({
        success: true,
        completed: true,
        alreadyCompleted: true,
        message: 'Modul sudah selesai sebelumnya.',
      });
    }

    // 4. Validasi urutan (Sequence Gating)
    const isPro = await hasActivePro(session.user.id);
    const sequenceCheck = checkModuleSequence({
      profile,
      moduleSlug,
      moduleStatuses,
      skillRatings,
      isPro,
    });

    if (!sequenceCheck.isUnlocked) {
      return NextResponse.json(
        {
          error: 'Forbidden',
          message: sequenceCheck.reason || 'Modul ini masih terkunci.',
        },
        { status: 403 }
      );
    }

    // 5. Cek Sesi Belajar yang aktif
    const studySessions = (moduleStatuses._study_sessions as Record<string, any>) || {};
    const sessionData = studySessions[moduleSlug];

    if (!sessionData || !sessionData.startedAt) {
      return NextResponse.json({
        success: true,
        completed: false,
        noSession: true,
        message: 'Belum ada sesi belajar yang dimulai untuk modul ini.',
      });
    }

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - sessionData.startedAt) / 1000);

    if (elapsedSeconds >= MIN_STUDY_SECONDS) {
      // Waktu belajar memenuhi syarat (>= 120 detik) -> Tandai Selesai Otomatis!
      const updatedSessions = { ...studySessions };
      delete updatedSessions[moduleSlug];

      const updatedStatuses = {
        ...moduleStatuses,
        [moduleSlug]: true,
        _study_sessions: updatedSessions,
      };

      await db
        .update(roadmapProgress)
        .set({
          moduleStatuses: updatedStatuses,
          updatedAt: new Date(),
        })
        .where(eq(roadmapProgress.id, progress.id));

      return NextResponse.json({
        success: true,
        completed: true,
        elapsedSeconds,
        message: 'Selamat! Modul telah berhasil diselesaikan.',
      });
    } else {
      // Waktu belajar belum mencapai syarat
      const remainingSeconds = MIN_STUDY_SECONDS - elapsedSeconds;
      return NextResponse.json({
        success: true,
        completed: false,
        elapsedSeconds,
        remainingSeconds,
        message: `Pelajari materi minimal ${MIN_STUDY_SECONDS} detik. Sisa waktu: ${remainingSeconds} detik lagi.`,
      });
    }
  } catch (error) {
    console.error('Error checking study session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
