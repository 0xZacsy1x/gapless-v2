"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_ITEMS } from "@/config/navigation";

interface NavLinksProps {
  authButton: React.ReactNode;
  variant?: 'light' | 'dark';
}

export function NavLinks({ authButton, variant = 'light' }: NavLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const pathname = usePathname();
  const isDark = variant === 'dark';

  const navRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Entrance animations for navbar
  useGSAP(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      '.nav-logo',
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.nav-link-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.nav-auth',
      { opacity: 0, x: 40, filter: 'blur(8px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, delay: 0.4, ease: 'power2.out' }
    );
  }, { scope: navRef });

  // Hamburger SVG line animations
  useEffect(() => {
    if (line1Ref.current && line2Ref.current && line3Ref.current) {
      gsap.to(line1Ref.current, {
        rotation: isOpen ? 45 : 0,
        y: isOpen ? 6 : 0,
        transformOrigin: "50% 50%",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(line2Ref.current, {
        opacity: isOpen ? 0 : 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      gsap.to(line3Ref.current, {
        rotation: isOpen ? -45 : 0,
        y: isOpen ? -6 : 0,
        transformOrigin: "50% 50%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  // Mobile menu open / close animation
  useEffect(() => {
    if (isOpen) {
      setIsMenuRendered(true);
    } else if (isMenuRendered && mobileMenuRef.current) {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setIsMenuRendered(false),
      });
    }
  }, [isOpen, isMenuRendered]);

  useEffect(() => {
    if (isOpen && isMenuRendered && mobileMenuRef.current) {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen, isMenuRendered]);

  return (
    <nav ref={navRef} className="flex items-center justify-between px-4 md:px-6 py-4 max-w-7xl mx-auto w-full relative">
      
      {/* 1. Div Logo (Animasi dari Kiri ke Kanan) */}
      <div className="nav-logo flex-1 flex justify-start">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
        >
          <Image
            src="/logo.png"
            alt="Gapless Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
          <span className={`text-2xl md:text-3xl font-black tracking-tight transition-colors ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Gapless
          </span>
        </Link>
      </div>

      {/* 2. Div Links (Desktop) (Animasi dari Atas ke Bawah bergantian) */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-7">
        {NAV_ITEMS.map((link) => (
          <div key={link.href} className="nav-link-item">
            <Link
              href={link.href}
              className={`text-[15px] whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? isDark 
                    ? "text-white font-bold" 
                    : "text-slate-900 font-semibold"
                  : isDark 
                    ? "text-slate-300 hover:text-white font-normal" 
                    : "text-slate-700 hover:text-slate-900 font-normal"
              }`}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>

      {/* 3. Div Login & Mobile Toggle (Animasi Kanan ke Kiri + Blur) */}
      <div className="nav-auth flex-1 flex justify-end items-center gap-2 md:gap-4">
        {authButton}
        
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 focus:outline-none transition-colors ${
            isDark ? "text-slate-200 hover:text-white" : "text-slate-800 hover:text-slate-900"
          }`}
          aria-label="Buka menu navigasi"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <line
              ref={line1Ref}
              x1="4" y1="6" x2="20" y2="6"
            />
            <line
              ref={line2Ref}
              x1="4" y1="12" x2="20" y2="12"
            />
            <line
              ref={line3Ref}
              x1="4" y1="18" x2="20" y2="18"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown (Efek Fade In sederhana saat diklik) */}
      {isMenuRendered && (
        <div 
          ref={mobileMenuRef}
          className={`absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4 md:hidden z-50 rounded-2xl shadow-xl ${
            isDark 
              ? "bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white" 
              : "bg-white border-b border-gray-100 text-slate-800"
          }`}
        >
          {NAV_ITEMS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-base transition-colors ${
                pathname === link.href
                  ? isDark 
                    ? "text-blue-400 font-bold" 
                    : "text-slate-900 font-semibold"
                  : isDark 
                    ? "text-slate-300 hover:text-white" 
                    : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
