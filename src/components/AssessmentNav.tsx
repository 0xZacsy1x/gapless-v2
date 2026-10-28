'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGaplessContext } from '@/contexts/CareerContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function AssessmentNav() {
    const { setSelectedRole, setCurrentView, setQuizType } = useGaplessContext();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        gsap.fromTo(
            containerRef.current.children,
            { opacity: 0, y: 30, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', stagger: 0.2 }
        );
    }, { scope: containerRef });

    return (
        <div 
            ref={containerRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
            {/* Left: AI Assessment (Tombol Biru) */}
            <div className="w-full sm:w-auto" style={{ opacity: 0 }}>
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
                    }}
                    className="block w-full"
                >
                    <button className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl font-medium text-white transition-all duration-200" style={{ backgroundColor: '#3b82f6' }}>
                        Saya Belum Tahu Minat Saya
                    </button>
                </Link>
            </div>

            {/* Right: Career Test (Tombol Putih) */}
            <div className="w-full sm:w-auto" style={{ opacity: 0 }}>
                <Link 
                    href="/career-test" 
                    onClick={() => {
                        setCurrentView('selection');
                        setQuizType('sudah_tahu_minat');
                    }}
                    className="block w-full"
                >
                    <button className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl font-medium text-slate-900 border border-slate-300 hover:bg-slate-50 transition-all duration-200 bg-transparent">
                        Saya Sudah Tahu Minat Saya
                    </button>
                </Link>
            </div>
        </div>
    );
}
