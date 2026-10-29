'use client';
import { useEffect } from 'react';
import { useGaplessContext } from '@/contexts/CareerContext';
import { JobRole } from '@/types'; // Import dari file baru
import { CAREER_PROFILES } from '@/data/gaplessData';
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';

interface WrapperProps {
    roles: JobRole[];
}

function getRoleVisuals(roleName: string) {
    const name = roleName.toLowerCase();
    if (name.includes('designer') || name.includes('creative')) return { icon: '/The Creator.png' };
    if (name.includes('engineer') || name.includes('devops')) return { icon: '/The Builder.png' };
    if (name.includes('data') || name.includes('ml') || name.includes('ai')) return { icon: '/The Thinker.png' };
    if (name.includes('marketing') || name.includes('content') || name.includes('social')) return { icon: '/The Connector.png' };
    if (name.includes('business') || name.includes('e-commerce') || name.includes('account')) return { icon: '/The Connector.png' };
    return { icon: '/The Thinker.png' };
}

export function CareerSelectionWrapper({ roles }: WrapperProps) {
    const { setSelectedRole, selectCareer, setCurrentView, reset, setQuizType } = useGaplessContext();
    const router = useRouter();

    useEffect(() => {
        // Reset state so that previous career selections don't leak into this new selection flow
        reset();
        setQuizType('sudah_tahu_minat');
    }, [reset, setQuizType]);

    return (
        <div className="relative min-h-screen bg-slate-50 flex flex-col z-10 overflow-hidden">
            <Navbar />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex-1 w-full">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Eksplorasi <span className="text-blue-700">Jalur Kariermu</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Pilih role yang paling sesuai dengan minatmu dan mulailah perjalanan belajarmu dengan panduan AI.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role) => {
                        const visuals = getRoleVisuals(role.roleName);
                        return (
                            <button
                                key={role.id}
                                type="button"
                                onClick={() => {
                                    setSelectedRole(role);
                                    
                                    const PROFILE_ALIASES: Record<string, string> = {
                                        'ui/ux designer': 'ui/ux designer',
                                        'graphic designer / digital creative product designer': 'graphic designer / visual designer',
                                        'graphic designer / visual designer': 'graphic designer / visual designer', 
                                        'content creator / social media strategist': 'content creator / social media specialist', 
                                        'content creator / social media specialist': 'content creator / social media specialist',
                                        'software engineer (front/back/full-stack)': 'software engineer (front/back/full-stack)', 
                                        'ai/ml engineer / machine learning engineer': 'ai/ml engineer / machine learning engineer', 
                                        'devops engineer / qa automation engineer': 'devops engineer / qa automation engineer', 
                                        'data analyst / business intelligence': 'data analyst / business intelligence', 
                                        'data researcher / strategy analyst': 'data researcher / strategy analyst',
                                        'digital marketing specialist': 'digital marketing specialist', 
                                        'business development / account executive': 'business development / account executive', 
                                        'e-commerce / dropship specialist': 'e-commerce specialist / dropshipper',
                                        'e-commerce specialist / dropshipper': 'e-commerce specialist / dropshipper', 
                                    };

                                    const dbRoleLower = role.roleName.toLowerCase();
                                    const mappedTitle = PROFILE_ALIASES[dbRoleLower] || dbRoleLower;
                                    
                                    let careerProfile = CAREER_PROFILES.find(p => p.title.toLowerCase() === mappedTitle);
                                    if (!careerProfile) {
                                        careerProfile = {
                                            id: role.id,
                                            title: role.roleName,
                                            trait: 'The Thinker',
                                            icon: visuals.icon,
                                            description: role.dimension ? `Role in ${role.dimension}` : 'Role based on database.',
                                            salaryRange: role.salaryRange || 'N/A',
                                            growthOutlook: 'N/A',
                                            skills: [
                                                ...(role.hardSkills || []).map(s => ({ name: s, required: 3 })),
                                                ...(role.softSkills || []).map(s => ({ name: s, required: 2 }))
                                            ],
                                            roadmap: [
                                                { phase: 1, title: 'Dasar', subtitle: 'Pelajari dasar-dasar', description: `Fundamental skill untuk ${role.roleName}`, modules: role.hardSkills?.slice(0, 3) || ['Dasar 1', 'Dasar 2'], duration: '4 minggu' },
                                                { phase: 2, title: 'Menengah', subtitle: 'Tingkatkan keahlian', description: `Skill lanjutan untuk ${role.roleName}`, modules: role.hardSkills?.slice(3, 6) || ['Lanjutan 1', 'Lanjutan 2'], duration: '4 minggu' },
                                                { phase: 3, title: 'Mahir', subtitle: 'Praktik industri', description: `Soft skill dan praktik terbaik`, modules: role.softSkills?.slice(0, 3) || ['Praktik 1', 'Praktik 2'], duration: '4 minggu' },
                                                { phase: 4, title: 'Profesional', subtitle: 'Persiapan karir', description: `Siap terjun ke industri`, modules: ['Portfolio', 'Interview Prep'], duration: '2 minggu' }
                                            ]
                                        };
                                    }
                                    
                                    setSelectedRole(role);
                                    selectCareer(careerProfile); 
                                    setQuizType('sudah_tahu_minat');
                                    setCurrentView('case-study');

                                    const roleSlug = role.roleName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                                    try {
                                        localStorage.setItem('gapless:active_quiz_type', 'sudah_tahu_minat');
                                        localStorage.setItem('gapless:active_role_slug', roleSlug);
                                        localStorage.setItem('gapless:selected_role', JSON.stringify(role));
                                        localStorage.setItem('gapless:selected_career', JSON.stringify(careerProfile));
                                    } catch (e) {}

                                    router.push(`/assessment?quizType=sudah_tahu_minat&role=${encodeURIComponent(roleSlug)}`);
                                }}
                                className="group relative w-full text-left p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div 
                                    className="relative w-24 h-24 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-out"
                                >
                                    <Image src={visuals.icon} alt={role.roleName} width={96} height={96} className="object-contain drop-shadow-md rounded-2xl" />
                                </div>
                                <h3 className="relative text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">{role.roleName}</h3>
                                <div className="relative inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    MULAI ASSESMEN <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}