'use client';

import Link from 'next/link';
import { useGaplessContext } from '@/contexts/CareerContext';
import { motion, Variants } from 'motion/react';

export function AssessmentNav() {
    const { setSelectedRole, setCurrentView, setQuizType } = useGaplessContext();

    // Varian animasi blur ke full (dari bawah ke atas)
    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            // Mengatur antrean: Tombol kiri jalan, tunggu 0.2 detik, baru tombol kanan
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                }
            }}
        >
            {/* Left: AI Assessment (Tombol Biru) */}
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
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
            </motion.div>

            {/* Right: Career Test (Tombol Putih) */}
            <motion.div variants={buttonVariants} className="w-full sm:w-auto">
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
            </motion.div>
        </motion.div>
    );
}