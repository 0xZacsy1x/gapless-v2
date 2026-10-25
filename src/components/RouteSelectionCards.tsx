'use client';

import Link from 'next/link';
import { Compass, Target } from 'lucide-react';
import { useGaplessContext } from '@/contexts/CareerContext';

export function RouteSelectionCards({ onSelect }: { onSelect?: () => void }) {
  const { setSelectedRole, setCurrentView, setQuizType } = useGaplessContext();

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Link
        href="/assessment?quizType=belum_tahu_minat"
        onClick={() => {
          setSelectedRole(null);
          setCurrentView('assessment');
          setQuizType('belum_tahu_minat');
          try {
            localStorage.setItem('gapless:active_quiz_type', 'belum_tahu_minat');
            localStorage.removeItem('gapless:selected_career');
            localStorage.removeItem('gapless:selected_role');
            localStorage.removeItem('gapless:active_role_slug');
          } catch (e) {}
          if (onSelect) onSelect();
        }}
        className="flex-1 flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 hover:border-blue-500 rounded-2xl hover:bg-blue-50/50 transition-all group shadow-sm hover:shadow-md"
      >
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Compass size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1 text-sm sm:text-base">Belum Tahu Minat</h3>
        <span className="text-xs text-slate-500 text-center">Rekomendasi dari awal</span>
      </Link>
      <Link
        href="/career-test"
        onClick={() => {
          setCurrentView('selection');
          if (onSelect) onSelect();
        }}
        className="flex-1 flex flex-col items-center justify-center p-4 bg-white border-2 border-slate-100 hover:border-indigo-500 rounded-2xl hover:bg-indigo-50/50 transition-all group shadow-sm hover:shadow-md"
      >
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Target size={24} />
        </div>
        <h3 className="font-bold text-slate-800 mb-1 text-sm sm:text-base">Sudah Tahu Minat</h3>
        <span className="text-xs text-slate-500 text-center">Pilih target spesifik</span>
      </Link>
    </div>
  );
}
