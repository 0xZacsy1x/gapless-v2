'use client';

import { GaplessApp } from '@/components/GaplessApp';
import { useGaplessContext } from '@/contexts/CareerContext';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { findCareerProfile } from '@/data/gaplessData';

export function AssessmentPageClient() {
  const {
    currentView,
    setCurrentView,
    setSelectedRole,
    selectCareer,
    selectedCareer,
    selectedRole,
    setQuizType,
  } = useGaplessContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    const quizTypeParam = searchParams.get('quizType');
    const roleParam = searchParams.get('role');

    // Hanya masuk ke jalur 'sudah_tahu_minat' jika eksplisit ditentukan di query parameter
    const isSudahTahu = quizTypeParam === 'sudah_tahu_minat';

    if (isSudahTahu) {
      setQuizType('sudah_tahu_minat');
      setCurrentView('case-study');
      try {
        localStorage.setItem('gapless:active_quiz_type', 'sudah_tahu_minat');
      } catch (e) {}

      // Hydrate selectedCareer if not in state
      if (!selectedCareer) {
        try {
          const savedCareer = localStorage.getItem('gapless:selected_career');
          if (savedCareer) {
            selectCareer(JSON.parse(savedCareer));
          } else if (roleParam) {
            const found = findCareerProfile(roleParam);
            if (found) selectCareer(found);
          }
        } catch (e) {}
      }

      // Hydrate selectedRole if not in state
      if (!selectedRole) {
        try {
          const savedRole = localStorage.getItem('gapless:selected_role');
          if (savedRole) {
            setSelectedRole(JSON.parse(savedRole));
          }
        } catch (e) {}
      }
    } else {
      // Jalur Belum Tahu Minat (default untuk /assessment)
      // Selalu mulai dari asesmen eksplorasi dan bersihkan data karir lama agar tidak bocor
      setQuizType('belum_tahu_minat');
      setCurrentView('assessment');
      setSelectedRole(null);
      selectCareer(null);
      try {
        localStorage.setItem('gapless:active_quiz_type', 'belum_tahu_minat');
        localStorage.removeItem('gapless:selected_career');
        localStorage.removeItem('gapless:selected_role');
        localStorage.removeItem('gapless:active_role_slug');
      } catch (e) {}
    }
  }, [
    searchParams,
    setQuizType,
    setCurrentView,
    selectedCareer,
    selectedRole,
    selectCareer,
    setSelectedRole,
  ]);

  return <GaplessApp />;
}
