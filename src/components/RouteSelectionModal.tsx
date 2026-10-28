'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { RouteSelectionCards } from './RouteSelectionCards';

interface RouteSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RouteSelectionModal({ isOpen, onClose }: RouteSelectionModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else if (isRendered && backdropRef.current && modalRef.current) {
      gsap.killTweensOf([backdropRef.current, modalRef.current]);
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setIsRendered(false);
        },
      });
    }
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (isOpen && isRendered && backdropRef.current && modalRef.current) {
      gsap.killTweensOf([backdropRef.current, modalRef.current]);
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [isOpen, isRendered]);

  if (!isRendered) return null;

  return (
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-100"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl pointer-events-auto border border-slate-100 relative"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6 mt-2">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pilih Jalur Asesmen</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Pilih salah satu dari opsi di bawah untuk menyesuaikan pengalaman tes kariermu.
            </p>
          </div>

          <RouteSelectionCards onSelect={onClose} />
        </div>
      </div>
    </>
  );
}
