'use client';

import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const COLORS = ['#FFD700', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#06B6D4'];

export function ConfettiEffect({ count = 50 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600,
      y: -(Math.random() * 350 + 150),
      rot: Math.random() * 720 - 360,
      scale: Math.random() * 0.6 + 0.6,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.2,
      duration: Math.random() * 1.5 + 1.8,
      size: Math.random() > 0.5 ? 'rect' : 'circle',
    }));
  }, [count]);

  useGSAP(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll<HTMLDivElement>('.confetti-particle');

    items.forEach((item, idx) => {
      const p = particles[idx];
      if (!p) return;

      const tl = gsap.timeline({ delay: p.delay });
      tl.fromTo(
        item,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
        },
        {
          x: p.x,
          rotation: p.rot,
          duration: p.duration,
          ease: 'power2.out',
        },
        0
      ).to(
        item,
        {
          keyframes: [
            { y: p.y, scale: p.scale, duration: p.duration * 0.4, ease: 'power2.out' },
            { y: p.y + 400, scale: p.scale * 0.8, opacity: 0, duration: p.duration * 0.6, ease: 'power2.in' },
          ],
        },
        0
      );
    });
  }, { scope: containerRef, dependencies: [particles] });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-50"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            position: 'absolute',
            width: p.size === 'rect' ? 10 : 8,
            height: p.size === 'rect' ? 14 : 8,
            backgroundColor: p.color,
            borderRadius: p.size === 'circle' ? '50%' : '2px',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
