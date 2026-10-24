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
    const localQuizType = typeof window !== 'undefined' ? localStorage.getItem('gapless:active_quiz_type') : null;

    const isSudahTahu = quizTypeParam === 'sudah_tahu_minat' || (!quizTypeParam && localQuizType === 'sudah_tahu_minat');

    if (isSudahTahu) {
      setQuizType('sudah_tahu_minat');
      setCurrentView('case-study');

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
      if (quizTypeParam) {
        setQuizType(quizTypeParam);
      }
      if (currentView === 'selection') {
        setSelectedRole(null);
        setCurrentView('assessment');
      }
    }
  }, [
    searchParams,
    setQuizType,
    setCurrentView,
    selectedCareer,
    selectedRole,
    selectCareer,
    setSelectedRole,
    currentView,
  ]);

  return <GaplessApp />;
}
