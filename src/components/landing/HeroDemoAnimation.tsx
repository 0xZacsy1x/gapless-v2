"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Brain, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

export default function HeroDemoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const optARef = useRef<HTMLButtonElement>(null);
  const optBRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  // Animation Stages:
  // 0: Initial Question (Pertanyaan 3 dari 15)
  // 1: Option A selected (bar 20% -> 27%)
  // 2: Question 4 (bar 33%)
  // 3: Option B selected & click "Lihat Hasil"
  // 4: Analyzing DNA (spinner & bars filling)
  // 5: Outcome Reveal ("Kamu adalah The Builder" + career chips)
  // 6: Fade reset
  const [stage, setStage] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 80, y: 70 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isBtnPressed, setIsBtnPressed] = useState<boolean>(false);
  const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [isTabActive, setIsTabActive] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Viewport & Visibility listeners
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  // Calculate coordinates relative to containerRef, directing enlarged SVG hotspot (3px, 2px) precisely to center
  const getCoordinates = useCallback((element: HTMLElement | null, offset?: { x?: number; y?: number }) => {
    if (!element || !containerRef.current) return { x: 90, y: 70 };
    const cRect = containerRef.current.getBoundingClientRect();
    const eRect = element.getBoundingClientRect();
    const centerX = eRect.left - cRect.left + eRect.width / 2 + (offset?.x ?? 0);
    const centerY = eRect.top - cRect.top + eRect.height / 2 + (offset?.y ?? 0);
    return {
      x: centerX - 3,
      y: centerY - 2,
    };
  }, []);

  // Main Declarative Animation Loop
  useEffect(() => {
    if (prefersReducedMotion || !isInView || !isTabActive) return;

    let active = true;
    const timerIds: NodeJS.Timeout[] = [];

    const schedule = (fn: () => void, delayMs: number) => {
      const id = setTimeout(() => {
        if (active) fn();
      }, delayMs);
      timerIds.push(id);
    };

    const triggerClick = () => {
      setIsClicking(true);
      setTimeout(() => {
        if (active) setIsClicking(false);
      }, 350);
    };

    const runTimeline = () => {
      // 0.0s: Reset to initial stage
      setStage(0);
      setIsBtnPressed(false);
      setIsBtnHovered(false);
      setCursorVisible(true);
      setCursorPos({ x: 90, y: 70 });

      // 1.0s: Move cursor to Option A
      schedule(() => {
        if (optARef.current) {
          setCursorPos(getCoordinates(optARef.current));
        }
      }, 1000);

      // 1.8s: Click Option A
      schedule(() => {
        triggerClick();
        setStage(1);
      }, 1800);

      // 2.7s: Quick transition to Question 4
      schedule(() => {
        setStage(2);
        if (optBRef.current) {
          setCursorPos(getCoordinates(optBRef.current));
        }
      }, 2700);

      // 3.5s: Click Option on Question 4
      schedule(() => {
        triggerClick();
        setStage(3);
      }, 3500);

      // 4.1s: Move cursor deliberately towards "Lihat Hasil Asesmen" button
      schedule(() => {
        if (nextBtnRef.current) {
          setCursorPos(getCoordinates(nextBtnRef.current, { y: -3 }));
        }
      }, 4100);

      // 4.8s: Cursor arrives at button -> triggers active hover illumination!
      schedule(() => {
        setIsBtnHovered(true);
      }, 4800);

      // 5.5s: Click "Lihat Hasil" with tactile feedback (dwell time gives clear view)
      schedule(() => {
        triggerClick();
        setIsBtnPressed(true);
      }, 5500);

      // 5.85s: Release button press
      schedule(() => {
        setIsBtnPressed(false);
        setIsBtnHovered(false);
      }, 5850);

      // 6.0s: Advance to Analyzing Stage
      schedule(() => {
        setStage(4);
      }, 6000);

      // 7.6s: Reveal Result Stage
      schedule(() => {
        setStage(5);
      }, 7600);

      // 8.8s: Move cursor to Software Engineer Chip
      schedule(() => {
        if (chipRef.current) {
          setCursorPos(getCoordinates(chipRef.current));
        }
      }, 8800);

      // 11.6s: Fade out / reset
      schedule(() => {
        setStage(6);
      }, 11600);

      // 12.4s: Restart timeline loop
      schedule(() => {
        runTimeline();
      }, 12400);
    };

    runTimeline();

    return () => {
      active = false;
      timerIds.forEach(clearTimeout);
    };
  }, [isInView, isTabActive, prefersReducedMotion, getCoordinates]);

  // Recalculate target position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (stage === 1 && optARef.current) {
        setCursorPos(getCoordinates(optARef.current));
      } else if (stage === 3 && optBRef.current) {
        setCursorPos(getCoordinates(optBRef.current));
      } else if (stage === 4 && nextBtnRef.current) {
        setCursorPos(getCoordinates(nextBtnRef.current, { y: -3 }));
      } else if (stage === 5 && chipRef.current) {
        setCursorPos(getCoordinates(chipRef.current));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [stage, getCoordinates]);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-[440px] xl:max-w-[480px] h-[620px] mx-auto rounded-[32px] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none [contain:layout] transition-opacity duration-500 ${
        stage === 6 ? "opacity-30" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 relative z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Simulasi Asesmen Minat</div>
            <div className="text-[10px] text-gray-400 font-medium">
              {stage < 2 ? "Pertanyaan 3 dari 15" : stage < 4 ? "Pertanyaan 4 dari 15" : stage === 4 ? "Menganalisis..." : "Hasil Terverifikasi"}
            </div>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
          Contoh tampilan
        </span>
      </div>

      {/* Middle Visual Area: Grid-area 1 / 1 Stacking Container */}
      <div className="grid grid-cols-1 grid-rows-1 my-auto relative z-10 w-full">
        {/* LAYER 1 (Stage 0, 1, 2, 3): Interactive Question Form */}
        <div
          className={`col-start-1 row-start-1 [grid-area:1/1] w-full flex flex-col justify-center space-y-3.5 transition-all duration-400 ease-out ${
            stage <= 3
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-semibold text-gray-400">
              <span>Progres Evaluasi</span>
              <span className="text-brand-primary font-bold">
                {stage === 0 ? "20%" : stage === 1 ? "27%" : "33%"} Selesai
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full transition-all duration-500 ease-out"
                style={{
                  width: stage === 0 ? "20%" : stage === 1 ? "27%" : "33%",
                }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-4 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                Kasus Situasional
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">
                {stage < 2 ? "03/15" : "04/15"}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed min-h-[38px]">
              {stage < 2
                ? "Saat memulai proyek baru dalam tim, bagian mana yang paling menarik perhatianmu terlebih dahulu?"
                : "Ketika sistem menghadapi kendala tak terduga, apa reaksi alamimu?"}
            </p>

            {/* Choices */}
            <div className="space-y-2 pt-1">
              {stage < 2 ? (
                <>
                  <button
                    ref={optARef}
                    type="button"
                    tabIndex={-1}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                      stage >= 1
                        ? "bg-white border-2 border-brand-primary shadow-xs ring-2 ring-brand-primary/10"
                        : "bg-white border-gray-200/80 text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        stage >= 1 ? "border-brand-primary" : "border-gray-300"
                      }`}
                    >
                      {stage >= 1 && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      Membedah struktur logika dan arsitektur sistem
                    </span>
                  </button>

                  <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600 text-left">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                    <span className="text-xs font-medium text-gray-600">
                      Merancang tampilan visual dan alur interaksi pengguna
                    </span>
                  </div>

                  <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600 text-left">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                    <span className="text-xs font-medium text-gray-600">
                      Menghubungkan kolaborasi tim dan strategi komunikasi
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <button
                    ref={optBRef}
                    type="button"
                    tabIndex={-1}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                      stage >= 3
                        ? "bg-white border-2 border-brand-primary shadow-xs ring-2 ring-brand-primary/10"
                        : "bg-white border-gray-200/80 text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        stage >= 3 ? "border-brand-primary" : "border-gray-300"
                      }`}
                    >
                      {stage >= 3 && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      Melacak akar masalah teknis baris demi baris
                    </span>
                  </button>

                  <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600 text-left">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                    <span className="text-xs font-medium text-gray-600">
                      Mencari solusi kreatif dan eksplorasi alternatif visual
                    </span>
                  </div>

                  <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600 text-left">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                    <span className="text-xs font-medium text-gray-600">
                      Mengomunikasikan kendala ke tim dan menyelaraskan solusi
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-3 flex justify-end relative z-20">
            <button
              ref={nextBtnRef}
              type="button"
              tabIndex={-1}
              className={`relative z-20 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
                isBtnPressed
                  ? "bg-[#004ECC] text-white scale-[0.95] shadow-inner ring-4 ring-brand-primary/40"
                  : isBtnHovered
                  ? "bg-brand-primary text-white scale-[1.06] shadow-lg shadow-brand-primary/30 ring-4 ring-brand-primary/25"
                  : stage >= 3
                  ? "bg-brand-primary text-white scale-[1.02] shadow-brand-primary/20"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              Lihat Hasil Asesmen <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* LAYER 2 (Stage 4): AI Analysis & Archetype Bars Filling */}
        <div
          className={`col-start-1 row-start-1 [grid-area:1/1] w-full flex flex-col justify-center space-y-4 text-center transition-all duration-400 ease-out ${
            stage === 4
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="relative w-14 h-14 mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-brand-primary/20 animate-ping opacity-50" />
            <div className="relative w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 " />
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-black text-gray-900 tracking-tight">
              Menganalisis Matriks Perilaku...
            </h4>
            <p className="text-xs text-gray-400">
              Menghitung keselarasan pola pikir dengan 4 Archetype nyata.
            </p>
          </div>

          {/* Sequential Archetype Progress Bars */}
          <div className="space-y-2.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-left max-w-sm mx-auto w-full">
            {[
              { label: "The Thinker", val: 85 },
              { label: "The Creator", val: 70 },
              { label: "The Connector", val: 90 },
              { label: "The Builder", val: 95 },
            ].map((bar) => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-600">
                  <span>{bar.label}</span>
                  <span className="text-brand-primary">{bar.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out"
                    style={{ width: stage >= 4 ? `${bar.val}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LAYER 3 (Stage 5): Result Reveal ("The Builder" + Real Roles + Assistant Bubble) */}
        <div
          className={`col-start-1 row-start-1 [grid-area:1/1] w-full flex flex-col justify-center space-y-3 transition-all duration-400 ease-out ${
            stage === 5
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                Profil Teridentifikasi
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">
                Cocok 95%
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
                Kamu adalah <span className="text-brand-primary">The Builder</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Kekuatan alamimu terletak pada pemecahan masalah logis, pembangunan sistem yang andal, dan eksekusi terstruktur.
              </p>
            </div>

            {/* Career Chips */}
            <div className="pt-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Rekomendasi Karier Teratas:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <div
                  ref={chipRef}
                  className="px-3 py-1.5 rounded-xl bg-brand-primary text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-transform scale-105"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Software Engineer
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold">
                  Data Analyst
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold">
                  Technical Lead
                </div>
              </div>
            </div>
          </div>

          {/* Assistant Bubble Notification */}
          <div className="p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-gray-900">Roadmap belajarmu siap!</div>
              <div className="text-[10px] text-gray-400">
                Kurikulum terstruktur untuk mempercepat kesiapan kariermu.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Assistant Snapshot Preview */}
      <div className="mt-6 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4 relative z-10 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
              AI Persona Compass
            </div>
            <div className="text-[11px] font-bold text-gray-800 truncate">
              {stage >= 5 ? "Hasil siap dieksplorasi" : "Memetakan kepribadian ke karier nyata"}
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5 shrink-0">
          Ilustrasi <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* VIRTUAL ANIMATED CURSOR */}
      {!prefersReducedMotion && cursorVisible && (
        <div
          className="absolute pointer-events-none z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) scale(${isClicking ? 0.85 : 1})`,
            transformOrigin: "3px 2px",
          }}
        >
          {/* SVG Brand Cursor - Enlarged 28x34 with high-detail brand shadow */}
          <div className="relative">
            <svg
              width="28"
              height="34"
              viewBox="0 0 24 28"
              fill="none"
              className="drop-shadow-lg filter drop-shadow-[0_4px_10px_rgba(0,102,255,0.35)]"
            >
              <path
                d="M2.5 1.5L21.5 13.5L12 16L8 25.5L2.5 1.5Z"
                fill="#0066FF"
                stroke="white"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>

            {/* Click Ripple Effect centered on hotspot (3px, 2px) */}
            {isClicking && (
              <span
                className="absolute w-11 h-11 rounded-full bg-brand-primary/35 border-2 border-brand-primary animate-ping pointer-events-none"
                style={{
                  left: "-18px",
                  top: "-19px",
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
