"use client";

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function LoginModal({
  isOpen,
  onClose,
  title = "Masuk untuk Melanjutkan",
  description = "Simpan hasil tes dan progres belajarmu dengan masuk terlebih dahulu."
}: LoginModalProps) {
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
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={modalRef}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl pointer-events-auto border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => signIn("google", { callbackUrl: window.location.pathname })}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Masuk dengan Google
            </button>
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-2xl font-semibold transition-all cursor-pointer"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
