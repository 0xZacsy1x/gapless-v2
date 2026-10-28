'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Sparkles, Target, Zap, Users } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

const RouteSelectionModal = dynamic(
  () => import('./RouteSelectionModal').then((m) => m.RouteSelectionModal),
  { ssr: false }
);

const archetypes = [
  { image: '/The Creator.png', name: 'The Creator', desc: 'Kamu yang membangun visual, narasi, dan estetika.', color: 'from-violet-500 to-pink-500', roles: ['UI/UX Designer', 'Content Creator', 'Product Designer'], icon: Sparkles },
  { image: '/The Builder.png', name: 'The Builder', desc: 'Kamu yang membangun sistem, aplikasi, dan infrastruktur.', color: 'from-blue-500 to-cyan-500', roles: ['Software Engineer', 'AI Engineer', 'Cloud Engineer'], icon: Zap },
  { image: '/The Thinker.png', name: 'The Thinker', desc: 'Kamu yang menemukan pola di balik data dan riset.', color: 'from-emerald-500 to-teal-500', roles: ['Data Analyst', 'Researcher', 'Data Scientist'], icon: Target },
  { image: '/The Connector.png', name: 'The Connector', desc: 'Kamu yang menjembatani produk, pasar, dan manusia.', color: 'from-amber-500 to-orange-500', roles: ['Digital Marketing', 'Bizdev', 'Product Marketing'], icon: Users },
];

/**
 * Animated "4 Tipe Karier" section.
 */
export function ArchetypesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(sectionRef.current.querySelectorAll('.archetype-reveal'), {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.archetype-header-item'),
            { opacity: 0, y: 40, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out', stagger: 0.2 }
          );

          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.archetype-card-item'),
            { opacity: 0, y: 40, filter: 'blur(8px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.2, ease: 'power2.out', stagger: 0.15 }
          );

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative z-10 px-6 pb-28 max-w-6xl mx-auto overflow-hidden">
      {/* HEADER SECTION */}
      <div className="text-center mb-12">
        <h2 className="archetype-reveal archetype-header-item text-3xl font-bold text-slate-900 mb-3" style={{ opacity: 0 }}>
          4 Tipe Karier
        </h2>
        <p className="archetype-reveal archetype-header-item text-gray-500" style={{ opacity: 0 }}>
          Kamu termasuk yang mana?
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {archetypes.map((arch) => (
          <div
            key={arch.name}
            className="archetype-reveal archetype-card-item glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
            style={{ opacity: 0 }}
          >
            <div className="w-24 h-24 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Image src={arch.image} alt={arch.name} width={96} height={96} className="object-contain drop-shadow-md rounded-2xl" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{arch.name}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{arch.desc}</p>
            <div className="flex flex-col gap-1.5">
              {arch.roles.map((r) => (
                <span key={r} className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                  {r}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Animated footer section with "Curtain Reveal" background.
 */
export function FooterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (curtainRef.current) gsap.set(curtainRef.current, { scaleY: 1 });
      gsap.set(footerRef.current.querySelectorAll('.footer-reveal-item'), {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (curtainRef.current) {
            gsap.fromTo(
              curtainRef.current,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.8, ease: 'power3.out' }
            );
          }

          gsap.fromTo(
            footerRef.current!.querySelectorAll('.footer-reveal-item'),
            { opacity: 0, y: 40, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              delay: 0.5,
              ease: 'power2.out',
              stagger: 0.2,
            }
          );

          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, { scope: footerRef });

  return (
    <section ref={footerRef} className="w-full mt-20 relative">
      <footer className="pt-24 pb-10 px-6 md:px-16 lg:px-24 relative flex flex-col items-center justify-center z-10">

        {/* --- EFEK TIRAI BACKGROUND --- */}
        <div
          ref={curtainRef}
          className="absolute inset-0 rounded-t-[2.5rem] md:rounded-t-[3rem] -z-10 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, 
              #0010BE 0%, #0010BE 26%, #0244E3 38%, 
              #0676FB 49%, #08A6FD 62%, #0ABEFE 88%, 
              #0ACAFE 94%, #0BD6FF 100%)`,
            transformOrigin: 'bottom',
            transform: 'scaleY(0)',
          }}
        />

        {/* --- KONTEN FOOTER (Teks & Tombol) --- */}
        <div className="max-w-3xl mx-auto text-center w-full flex flex-col items-center justify-center">
          {/* Judul Utama */}
          <h2 className="footer-reveal-item text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ opacity: 0 }}>
            Bangun Perjalanan Kariermu<br className="hidden md:block" /> Bersama Gapless
          </h2>

          {/* Teks Deskripsi */}
          <p className="footer-reveal-item text-blue-50/90 mb-12 text-base md:text-lg lg:text-xl leading-relaxed" style={{ opacity: 0 }}>
            Gapless membantu kamu memahami potensi dan kemampuanmu untuk menemukan arah karier yang lebih jelas dan sesuai dengan kebutuhan industri.
          </p>

          {/* Tombol Ikuti Tes */}
          <div className="footer-reveal-item" style={{ opacity: 0 }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-lg px-10 py-4 rounded-full hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Ikuti Tes <span>&rarr;</span>
            </button>
          </div>

          {/* Copyright */}
          <div className="footer-reveal-item mt-20 md:mt-28 w-full flex justify-center" style={{ opacity: 0 }}>
            <p className="text-blue-200/80 text-xs md:text-sm font-medium">
              © 2026 Gapless. Seluruh hak cipta dilindungi.
            </p>
          </div>
        </div>

      </footer>

      <RouteSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
