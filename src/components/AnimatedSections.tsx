'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Target, Zap, Users } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
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

// --- VARIAN ANIMASI UMUM (BAWAH KE ATAS + BLUR KE FULL) ---
const itemFadeBlur: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } }
};

/**
 * Animated "4 Tipe Karier" section.
 */
export function ArchetypesSection() {
  return (
    <section className="relative z-10 px-6 pb-28 max-w-6xl mx-auto overflow-hidden">

      {/* HEADER SECTION */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        <motion.h2 variants={itemFadeBlur} className="text-3xl font-bold text-slate-900 mb-3">
          4 Tipe Karier
        </motion.h2>
        <motion.p variants={itemFadeBlur} className="text-gray-500">
          Kamu termasuk yang mana?
        </motion.p>
      </motion.div>

      {/* CARDS GRID */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } } // Muncul bergantian (stagger)
        }}
      >
        {archetypes.map((arch) => (
          <motion.div
            key={arch.name}
            variants={itemFadeBlur}
            className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/**
 * Animated footer section with "Curtain Reveal" background.
 */
export function FooterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full mt-20 relative">
      <footer className="pt-24 pb-10 px-6 md:px-16 lg:px-24 relative flex flex-col items-center justify-center z-10">

        {/* --- EFEK TIRAI BACKGROUND --- */}
        <motion.div
          className="absolute inset-0 rounded-t-[2.5rem] md:rounded-t-[3rem] -z-10 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, 
              #0010BE 0%, #0010BE 26%, #0244E3 38%, 
              #0676FB 49%, #08A6FD 62%, #0ABEFE 88%, 
              #0ACAFE 94%, #0BD6FF 100%)`,
            transformOrigin: 'bottom' // Ini yang bikin narik dari bawah ke atas
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Ease khusus biar mulus nariknya
        />

        {/* --- KONTEN FOOTER (Teks & Tombol) --- */}
        <motion.div
          className="max-w-3xl mx-auto text-center w-full flex flex-col items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5 // Tunggu efek tirai setengah jalan, baru teks muncul
              }
            }
          }}
        >
          {/* Judul Utama */}
          <motion.h2 variants={itemFadeBlur} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Bangun Perjalanan Kariermu<br className="hidden md:block" /> Bersama Gapless
          </motion.h2>

          {/* Teks Deskripsi */}
          <motion.p variants={itemFadeBlur} className="text-blue-50/90 mb-12 text-base md:text-lg lg:text-xl leading-relaxed">
            Gapless membantu kamu memahami potensi dan kemampuanmu untuk menemukan arah karier yang lebih jelas dan sesuai dengan kebutuhan industri.
          </motion.p>

          {/* Tombol Ikuti Tes */}
          <motion.div variants={itemFadeBlur}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-lg px-10 py-4 rounded-full hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Ikuti Tes <span>&rarr;</span>
            </button>
          </motion.div>

          {/* Copyright */}
          <motion.div variants={itemFadeBlur} className="mt-20 md:mt-28 w-full flex justify-center">
            <p className="text-blue-200/80 text-xs md:text-sm font-medium">
              © 2026 Gapless. Seluruh hak cipta dilindungi.
            </p>
          </motion.div>
        </motion.div>

      </footer>

      <RouteSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}