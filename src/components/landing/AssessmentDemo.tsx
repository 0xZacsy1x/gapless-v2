"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Brain, CheckCircle2, Sparkles, ChevronRight, AlertCircle } from "lucide-react";
import SkillReadiness from "./SkillReadiness";
import {
    DEMO_QUESTIONS,
    DEMO_ARCHETYPES,
    CAREER_ROLES_DATA,
} from "@/constants/assessmentDemoData";

export default function AssessmentDemo() {
    const stageRef = useRef<HTMLDivElement>(null);
    const questionScreenRef = useRef<HTMLDivElement>(null);
    const analyzingScreenRef = useRef<HTMLDivElement>(null);
    const resultScreenRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const clickPulseRef = useRef<HTMLSpanElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Targets for fake cursor calculation
    const optRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const chipSeRef = useRef<HTMLButtonElement>(null);
    const chipDaRef = useRef<HTMLButtonElement>(null);
    const chipUiRef = useRef<HTMLButtonElement>(null);
    const roadmapCardRef = useRef<HTMLDivElement>(null);

    // Active screen tracking for meta label
    const [currentScreen, setCurrentScreen] = useState<"question" | "analyzing" | "result">("question");

    // Question & Role State
    const [questionCycle, setQuestionCycle] = useState<number>(0);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
    const [isBtnPressed, setIsBtnPressed] = useState<boolean>(false);
    const [activeRole, setActiveRole] = useState<string>("Software Engineer");

    // Observers & Accessibility
    const [isInView, setIsInView] = useState<boolean>(true);
    const [isTabActive, setIsTabActive] = useState<boolean>(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }
        return false;
    });

    // Check prefers-reduced-motion
    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
            const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
            mediaQuery.addEventListener("change", listener);
            return () => mediaQuery.removeEventListener("change", listener);
        }
    }, []);

    // Viewport & Tab Visibility listeners
    useEffect(() => {
        const handleVisibility = () => {
            setIsTabActive(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handleVisibility);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (stageRef.current) {
            observer.observe(stageRef.current);
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            observer.disconnect();
        };
    }, []);

    // Helper: calculate coordinates relative to stage container
    const getCoords = useCallback(
        (element: HTMLElement | null, offset?: { x?: number; y?: number }) => {
            if (!element || !stageRef.current) return { x: 120, y: 150 };
            const sRect = stageRef.current.getBoundingClientRect();
            const eRect = element.getBoundingClientRect();
            const centerX = eRect.left - sRect.left + eRect.width / 2 + (offset?.x ?? 0);
            const centerY = eRect.top - sRect.top + eRect.height / 2 + (offset?.y ?? 0);
            return {
                x: Math.round(centerX - 3),
                y: Math.round(centerY - 2),
            };
        },
        []
    );

    // Helper: trigger clicking pulse with pure GSAP (zero React re-renders)
    const triggerClickPulse = useCallback(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                scale: 0.88,
                duration: 0.08,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
            });
        }
        if (clickPulseRef.current) {
            gsap.fromTo(
                clickPulseRef.current,
                { scale: 0.3, opacity: 0.7, autoAlpha: 1 },
                { scale: 2.2, opacity: 0, autoAlpha: 0, duration: 0.35, ease: "power2.out" }
            );
        }
    }, []);

    // Current question data
    const currentQ = DEMO_QUESTIONS[questionCycle % DEMO_QUESTIONS.length];
    const roleData = CAREER_ROLES_DATA[activeRole] || CAREER_ROLES_DATA["Software Engineer"];

    // Main GSAP Master Timeline — Snappy, Instant Start
    useGSAP(
        () => {
            const qScreen = questionScreenRef.current;
            const aScreen = analyzingScreenRef.current;
            const rScreen = resultScreenRef.current;
            const cursor = cursorRef.current;

            if (!qScreen || !aScreen || !rScreen || !cursor) return;

            // Handle prefers-reduced-motion: static final state
            if (prefersReducedMotion) {
                gsap.set(qScreen, { autoAlpha: 0, display: "none" });
                gsap.set(aScreen, { autoAlpha: 0, display: "none" });
                gsap.set(rScreen, { autoAlpha: 1, yPercent: 0, scale: 1, display: "flex" });
                gsap.set(cursor, { autoAlpha: 0, display: "none" });
                setCurrentScreen("result");
                return;
            }

            // Immediate initial setup via GSAP autoAlpha (visibility + opacity)
            gsap.set(qScreen, { yPercent: 0, autoAlpha: 1, scale: 1, display: "flex" });
            gsap.set(aScreen, { yPercent: 100, autoAlpha: 0, scale: 0.97, display: "flex" });
            gsap.set(rScreen, { yPercent: 100, autoAlpha: 0, scale: 0.97, display: "flex" });

            // Start cursor slightly offset and immediately visible
            const initialCoords = getCoords(optRef.current, { x: 35, y: 25 });
            gsap.set(cursor, { autoAlpha: 1, scale: 1, x: initialCoords.x, y: initialCoords.y });

            const tl = gsap.timeline({ repeat: -1 });
            tlRef.current = tl;

            // -------------------------------------------------------------
            // PHASE 1: QUESTION STAGE (Starts IMMEDIATELY at 0.05s)
            // -------------------------------------------------------------
            tl.call(() => {
                setCurrentScreen("question");
                setIsOptionSelected(false);
                setIsBtnHovered(false);
                setIsBtnPressed(false);
                setActiveRole("Software Engineer");
            });

            // 0.05s: Immediately glide cursor to Option A center (0.42s duration)
            tl.to(cursor, {
                autoAlpha: 1,
                duration: 0.42,
                ease: "power2.out",
                x: () => getCoords(optRef.current).x,
                y: () => getCoords(optRef.current).y,
            }, "+=0.05");

            // 0.50s: Click Option A with organic ripple & select it
            tl.call(() => {
                triggerClickPulse();
                setIsOptionSelected(true);
            }, undefined, "+=0.08");

            // 0.60s: Glide cursor straight down to "Lihat Hasil Asesmen" button
            tl.to(cursor, {
                duration: 0.38,
                ease: "power2.out",
                x: () => getCoords(nextBtnRef.current).x,
                y: () => getCoords(nextBtnRef.current).y,
            }, "+=0.1");

            // 1.00s: Hover state on submit button
            tl.call(() => {
                setIsBtnHovered(true);
            }, undefined, "+=0.05");

            // 1.15s: Click button with organic compression
            tl.call(() => {
                setIsBtnPressed(true);
                triggerClickPulse();
            }, undefined, "+=0.15");

            // 1.25s: Release button press
            tl.call(() => {
                setIsBtnPressed(false);
                setIsBtnHovered(false);
            }, undefined, "+=0.1");

            // 1.35s: Fade out cursor before stage transition
            tl.to(cursor, {
                autoAlpha: 0,
                duration: 0.15,
                ease: "power2.in",
            }, "+=0.05");

            // -------------------------------------------------------------
            // TRANSITION 1: QUESTION -> ANALYZING (0.45s Snappy Slide)
            // -------------------------------------------------------------
            tl.call(() => {
                setCurrentScreen("analyzing");
            }, undefined, "+=0.05");

            tl.to(qScreen, {
                yPercent: -100,
                autoAlpha: 0,
                scale: 0.97,
                duration: 0.45,
                ease: "power2.inOut",
            });

            tl.fromTo(aScreen, {
                yPercent: 100,
                autoAlpha: 0,
                scale: 0.97,
            }, {
                yPercent: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                ease: "power2.inOut",
            }, "<");

            // Animate Archetype Bars filling up smoothly (0.9s)
            tl.call(() => {
                const bars = aScreen.querySelectorAll<HTMLElement>(".demo-arch-bar");
                const nums = aScreen.querySelectorAll<HTMLElement>(".demo-arch-num");
                bars.forEach((bar) => {
                    gsap.set(bar, { width: "0%" });
                    const target = bar.getAttribute("data-target") || "0%";
                    gsap.to(bar, { width: target, duration: 0.9, ease: "power2.out" });
                });
                nums.forEach((num) => {
                    const targetVal = parseInt(num.getAttribute("data-target") || "0", 10);
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: targetVal,
                        duration: 0.9,
                        ease: "power2.out",
                        onUpdate: () => {
                            num.textContent = `${Math.round(obj.val)}%`;
                        },
                    });
                });
            }, undefined, "+=0.05");

            // Analyzing stage display time (~1.0s)
            tl.set({}, {}, "+=1.05");

            // -------------------------------------------------------------
            // TRANSITION 2: ANALYZING -> RESULT (0.45s Snappy Slide)
            // -------------------------------------------------------------
            tl.call(() => setCurrentScreen("result"));

            tl.to(aScreen, {
                yPercent: -100,
                autoAlpha: 0,
                scale: 0.97,
                duration: 0.45,
                ease: "power2.inOut",
            });

            tl.fromTo(rScreen, {
                yPercent: 100,
                autoAlpha: 0,
                scale: 0.97,
            }, {
                yPercent: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                ease: "power2.inOut",
            }, "<");

            // Stagger reveal of result items (0.3s total)
            tl.fromTo(
                rScreen.querySelectorAll(".result-stagger-item"),
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
                "-=0.1"
            );

            // Reveal cursor on Result Screen
            tl.to(cursor, {
                autoAlpha: 1,
                duration: 0.2,
                ease: "power2.out",
                onStart: () => {
                    const coords = getCoords(chipDaRef.current, { y: 18 });
                    gsap.set(cursor, { x: coords.x, y: coords.y });
                },
            }, "+=0.1");

            // Glide cursor to "Data Analyst" chip
            tl.to(cursor, {
                duration: 0.35,
                ease: "power2.out",
                x: () => getCoords(chipDaRef.current).x,
                y: () => getCoords(chipDaRef.current).y,
            }, "+=0.05");

            // Click "Data Analyst" chip -> Switch role instantly
            tl.call(() => {
                triggerClickPulse();
                setActiveRole("Data Analyst");
            }, undefined, "+=0.15");

            // Glide cursor to "Software Engineer" chip
            tl.to(cursor, {
                duration: 0.35,
                ease: "power2.out",
                x: () => getCoords(chipSeRef.current).x,
                y: () => getCoords(chipSeRef.current).y,
            }, "+=0.35");

            // Click "Software Engineer" chip -> Switch back
            tl.call(() => {
                triggerClickPulse();
                setActiveRole("Software Engineer");
            }, undefined, "+=0.15");

            // Glide cursor down towards Roadmap card
            tl.to(cursor, {
                duration: 0.4,
                ease: "power2.out",
                x: () => getCoords(roadmapCardRef.current).x,
                y: () => getCoords(roadmapCardRef.current).y,
            }, "+=0.3");

            // Pause slightly so user can view the result and roadmap card (~1.2s)
            tl.set({}, {}, "+=1.2");

            // Fade out cursor before reset
            tl.to(cursor, {
                autoAlpha: 0,
                duration: 0.2,
                ease: "power2.in",
            });

            // -------------------------------------------------------------
            // TRANSITION 3: RESULT -> NEXT QUESTION (0.45s Upward Slide)
            // -------------------------------------------------------------
            tl.call(() => {
                setQuestionCycle((prev) => prev + 1);
                setIsOptionSelected(false);
            }, undefined, "+=0.1");

            tl.to(rScreen, {
                yPercent: -100,
                autoAlpha: 0,
                scale: 0.97,
                duration: 0.45,
                ease: "power2.inOut",
            });

            tl.fromTo(qScreen, {
                yPercent: 100,
                autoAlpha: 0,
                scale: 0.97,
            }, {
                yPercent: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.45,
                ease: "power2.inOut",
            }, "<");

            // Short pause before starting next loop
            tl.set({}, {}, "+=0.1");
        },
        { scope: stageRef, dependencies: [prefersReducedMotion, getCoords, triggerClickPulse] }
    );

    // Play / pause timeline based on tab visibility and viewport intersection
    useEffect(() => {
        if (!tlRef.current) return;
        if (!isInView || !isTabActive) {
            tlRef.current.pause();
        } else {
            tlRef.current.resume();
        }
    }, [isInView, isTabActive]);

    return (
        <div
            className="w-full max-w-[440px] xl:max-w-[480px] min-h-[620px] sm:min-h-[630px] mx-auto rounded-[32px] bg-white border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18),0_8px_24px_-4px_rgba(0,0,0,0.08)] p-5 sm:p-6 flex flex-col justify-between relative select-none [contain:layout] font-sans"
            aria-hidden="true"
        >
            {/* Ambient Blue Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-2xl rounded-full pointer-events-none" />

            {/* Top Meta Header (Fixed - never moves) */}
            <div className="flex items-center justify-between border-b border-blue-50 pb-3 relative z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary border border-blue-100">
                        <Brain className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-900 font-sans">Simulasi Asesmen Minat</div>
                        <div className="text-[10px] text-slate-400 font-medium transition-colors duration-300">
                            {currentScreen === "analyzing"
                                ? "Menganalisis matriks psikometri..."
                                : currentScreen === "result"
                                    ? "Hasil Terverifikasi"
                                    : currentQ.stepLabel}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-brand-primary border border-blue-100">
                    Live Demo
                </span>
            </div>

            {/* STAGE CONTAINER (Fixed Height, Overflow Hidden - Clips Screen Slides & Fake Cursor) */}
            <div
                ref={stageRef}
                className="relative w-full h-[470px] sm:h-[480px] overflow-hidden my-auto"
            >
                {/* ===================================================================
                    SCREEN 1: QUESTION SCREEN (Visible immediately on initial render)
                =================================================================== */}
                <div
                    ref={questionScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3.5 px-0.5 z-20"
                >
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                            <span>Progres Evaluasi</span>
                            <span className="text-brand-primary font-bold tabular-nums">
                                {!isOptionSelected ? currentQ.progressLabel : `${currentQ.progressPercent + 7}% Selesai`}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-brand-primary rounded-full transition-[width] duration-500 ease-out"
                                style={{
                                    width: !isOptionSelected
                                        ? `${currentQ.progressPercent}%`
                                        : `${currentQ.progressPercent + 7}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Question Box */}
                    <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100/80 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                                {currentQ.scenarioTitle}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                                {currentQ.questionNumber}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed min-h-[38px]">
                            {currentQ.questionText}
                        </p>

                        {/* Choices */}
                        <div className="space-y-2 pt-1">
                            {currentQ.choices.map((choice, idx) => {
                                const isSelected = idx === 0 && isOptionSelected;
                                return (
                                    <button
                                        key={choice.id}
                                        ref={idx === 0 ? optRef : undefined}
                                        type="button"
                                        tabIndex={-1}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${isSelected
                                                ? "bg-white border-2 border-brand-primary shadow-xs ring-2 ring-brand-primary/10"
                                                : "bg-white border-slate-200/80 text-slate-700 hover:border-blue-200"
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${isSelected ? "border-brand-primary" : "border-slate-300"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium leading-snug">
                                            {choice.text}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1">
                        <button
                            ref={nextBtnRef}
                            type="button"
                            tabIndex={-1}
                            className={`w-full h-11 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${isOptionSelected
                                    ? isBtnPressed
                                        ? "bg-brand-primary/80 text-white scale-[0.98]"
                                        : isBtnHovered
                                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25 scale-[1.01]"
                                            : "bg-brand-primary text-white shadow-xs"
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            <span>Lihat Hasil Asesmen</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 2: ANALYZING SCREEN (Invisible initially, handled by GSAP)
                =================================================================== */}
                <div
                    ref={analyzingScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center space-y-6 px-4 z-10 invisible"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-3 border-blue-100 border-t-brand-primary animate-spin" />
                        <Brain className="w-7 h-7 text-brand-primary absolute" />
                    </div>

                    <div className="text-center space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">
                            Menganalisis Pola Responsmu...
                        </h4>
                        <p className="text-xs text-slate-400">
                            Memetakan orientasi psikometri RIASEC &amp; kompetensi industri.
                        </p>
                    </div>

                    {/* Archetype Bars Filling Up */}
                    <div className="w-full max-w-xs space-y-2.5 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 shadow-xs">
                        {DEMO_ARCHETYPES.map((arch) => (
                            <div key={arch.label} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                                    <span>{arch.label}</span>
                                    <span
                                        className="demo-arch-num font-mono tabular-nums text-brand-primary font-bold"
                                        data-target={arch.val}
                                    >
                                        0%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-blue-100/70 rounded-full overflow-hidden">
                                    <div
                                        className="demo-arch-bar h-full bg-brand-primary rounded-full w-0"
                                        data-target={`${arch.val}%`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 3: RESULT SCREEN (Invisible initially, handled by GSAP)
                =================================================================== */}
                <div
                    ref={resultScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-between py-1 px-0.5 space-y-2 z-10 invisible"
                >
                    {/* ITEM 1: Profile Top Match & Role Switcher Chips (Stagger Step 1) */}
                    <div className="result-stagger-item space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary text-[10px] font-bold border border-blue-200">
                                <Sparkles className="w-3 h-3 text-brand-primary" />
                                Kecocokan Tertinggi (94%)
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                                Profil Terverifikasi
                            </span>
                        </div>

                        <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100/90 space-y-2">
                            <div className="text-xs font-bold text-slate-800">
                                Kamu adalah <span className="text-brand-primary">The Builder</span>
                            </div>
                            <div className="text-[11px] text-slate-500 leading-snug">
                                Berbakat merancang arsitektur sistem logis, memecahkan problematis teknikal, dan eksekusi presisi.
                            </div>

                            {/* Dynamic Career Role Chips */}
                            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                                <button
                                    ref={chipSeRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("Software Engineer")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeRole === "Software Engineer"
                                            ? "bg-brand-primary text-white shadow-xs scale-105"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-brand-primary/50"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "Software Engineer" && (
                                            <CheckCircle2 className="w-3 h-3" />
                                        )}
                                        Software Engineer
                                    </span>
                                </button>

                                <button
                                    ref={chipDaRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("Data Analyst")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeRole === "Data Analyst"
                                            ? "bg-brand-primary text-white shadow-xs scale-105"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-brand-primary/50"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "Data Analyst" && (
                                            <CheckCircle2 className="w-3 h-3" />
                                        )}
                                        Data Analyst
                                    </span>
                                </button>

                                <button
                                    ref={chipUiRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("UI/UX Designer")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeRole === "UI/UX Designer"
                                            ? "bg-brand-primary text-white shadow-xs scale-105"
                                            : "bg-white border border-slate-200 text-slate-700 hover:border-brand-primary/50"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "UI/UX Designer" && (
                                            <CheckCircle2 className="w-3 h-3" />
                                        )}
                                        UI/UX Designer
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 2: SKILL READINESS Component (Stagger Step 2) */}
                    <div className="result-stagger-item">
                        <SkillReadiness
                            data={roleData}
                            isAnimated={!prefersReducedMotion}
                            triggerAnimation={true}
                        />
                    </div>

                    {/* ITEM 3: Gap Terbesar Callout Row (Stagger Step 3) */}
                    <div
                        className="result-stagger-item p-2 sm:p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] text-slate-700 flex items-center gap-2"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        <span className="truncate">
                            <strong className="text-brand-primary font-bold">Gap terbesar:</strong>{" "}
                            {roleData.biggestGap}. Roadmap belajarmu mulai dari sini.
                        </span>
                    </div>

                    {/* ITEM 4: Roadmap Ready Notification Card (Stagger Step 4) */}
                    <div
                        ref={roadmapCardRef}
                        className="result-stagger-item p-2.5 sm:p-3 rounded-2xl bg-white border border-blue-100 shadow-xs flex items-center gap-2.5"
                    >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center shrink-0 border border-blue-100">
                            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900">Roadmap belajarmu siap!</div>
                            <div className="text-[10px] text-slate-400">
                                Kurikulum 4 fase terstruktur untuk mempercepat kesiapan kariermu.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Virtual Animated Cursor (Clipped inside stage container) */}
                <div
                    ref={cursorRef}
                    className="absolute pointer-events-none z-50 top-0 left-0 invisible"
                    style={{
                        transformOrigin: "3px 2px",
                        willChange: "transform, opacity",
                    }}
                    aria-hidden="true"
                >
                    <div className="relative">
                        <svg
                            width="28"
                            height="34"
                            viewBox="0 0 24 28"
                            fill="none"
                            className="drop-shadow-lg filter drop-shadow-[0_4px_12px_rgba(0,102,255,0.4)]"
                        >
                            <path
                                d="M2.5 1.5L21.5 13.5L12 16L8 25.5L2.5 1.5Z"
                                fill="#0066FF"
                                stroke="white"
                                strokeWidth="2.2"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            ref={clickPulseRef}
                            className="absolute w-12 h-12 rounded-full bg-brand-primary/25 border-2 border-brand-primary pointer-events-none invisible"
                            style={{
                                left: "-19px",
                                top: "-20px",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Assistant Snapshot Preview (Fixed - never moves) */}
            <div className="mt-auto pt-3 border-t border-blue-50 relative z-10 shrink-0">
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-blue-50/50 border border-blue-100/80">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-brand-primary flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-bold tracking-wider text-brand-primary uppercase">
                            AI Persona Compass
                        </div>
                        <div className="text-[11px] font-bold text-slate-800 truncate transition-colors duration-300">
                            {currentScreen === "result"
                                ? "Hasil siap dieksplorasi"
                                : "Memetakan kepribadian ke karier nyata"}
                        </div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                        Ilustrasi &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
}
