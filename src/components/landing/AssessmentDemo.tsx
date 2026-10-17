"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Brain, CheckCircle2, Sparkles, ChevronRight, AlertCircle } from "lucide-react";
import FakeCursor from "./FakeCursor";
import SkillReadiness from "./SkillReadiness";
import {
    DEMO_QUESTIONS,
    DEMO_ARCHETYPES,
    CAREER_ROLES_DATA,
} from "@/constants/assessmentDemoData";

type ScreenPosition = "enter" | "active" | "exit" | "hidden";

export default function AssessmentDemo() {
    const stageRef = useRef<HTMLDivElement>(null);

    // Targets for fake cursor calculation
    const optRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const chipSeRef = useRef<HTMLButtonElement>(null);
    const chipDaRef = useRef<HTMLButtonElement>(null);
    const roadmapCardRef = useRef<HTMLDivElement>(null);

    // Screen Positions for Silky Upward Sliding Transitions
    const [questionPos, setQuestionPos] = useState<ScreenPosition>("active");
    const [analyzingPos, setAnalyzingPos] = useState<ScreenPosition>("hidden");
    const [resultPos, setResultPos] = useState<ScreenPosition>("hidden");
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    // Question & Role State
    const [questionCycle, setQuestionCycle] = useState<number>(0);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [isBtnHovered, setIsBtnHovered] = useState<boolean>(false);
    const [isBtnPressed, setIsBtnPressed] = useState<boolean>(false);
    const [activeRole, setActiveRole] = useState<string>("Software Engineer");

    // Analyzing Stage Progress
    const [analyzingProgress, setAnalyzingProgress] = useState<number>(0);

    // Result Stage Staggered Entrance (1: Profile, 2: SkillReadiness, 3: Gap row, 4: Roadmap)
    const [renderResult, setRenderResult] = useState<boolean>(false);
    const [resultStaggerStep, setResultStaggerStep] = useState<number>(0);

    // Fake Cursor State
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 90, y: 90 });
    const [isClicking, setIsClicking] = useState<boolean>(false);
    const [cursorVisible, setCursorVisible] = useState<boolean>(false);

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
            { threshold: 0.15 }
        );

        if (stageRef.current) {
            observer.observe(stageRef.current);
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            observer.disconnect();
        };
    }, []);

    // Calculate coordinates relative to stage container
    const getCoordinates = useCallback(
        (element: HTMLElement | null, offset?: { x?: number; y?: number }) => {
            if (!element || !stageRef.current) return { x: 90, y: 90 };
            const sRect = stageRef.current.getBoundingClientRect();
            const eRect = element.getBoundingClientRect();
            const centerX = eRect.left - sRect.left + eRect.width / 2 + (offset?.x ?? 0);
            const centerY = eRect.top - sRect.top + eRect.height / 2 + (offset?.y ?? 0);
            return {
                x: centerX - 3,
                y: centerY - 2,
            };
        },
        []
    );

    // Current question data
    const currentQ = DEMO_QUESTIONS[questionCycle % DEMO_QUESTIONS.length];
    const roleData = CAREER_ROLES_DATA[activeRole] || CAREER_ROLES_DATA["Software Engineer"];

    // Helper for Screen Styles with Velvety Deceleration and Depth Scaling
    const getScreenStyle = (pos: ScreenPosition) => {
        let transform = "translate3d(0, 0, 0) scale(1)";
        let opacity = 1;
        let visibility: "visible" | "hidden" = "visible";
        let pointerEvents: "auto" | "none" = "auto";

        if (pos === "enter") {
            transform = "translate3d(0, 100%, 0) scale(0.97)";
            opacity = 0;
            visibility = "visible";
            pointerEvents = "none";
        } else if (pos === "exit") {
            transform = "translate3d(0, -100%, 0) scale(0.97)";
            opacity = 0;
            visibility = "visible";
            pointerEvents = "none";
        } else if (pos === "hidden") {
            transform = "translate3d(0, 100%, 0) scale(0.97)";
            opacity = 0;
            visibility = "hidden";
            pointerEvents = "none";
        }

        return {
            transform,
            opacity,
            visibility,
            pointerEvents,
            transition: isTransitioning
                ? "transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 750ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "none",
            willChange: isTransitioning ? "transform, opacity" : "auto",
        };
    };

    // Helper for staggered items in Result Screen (gentle 12px float-up + soft fade)
    const getResultStaggerStyle = (stepNumber: number) => {
        const isRevealed = prefersReducedMotion || resultStaggerStep >= stepNumber;
        return {
            transform: isRevealed ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
            opacity: isRevealed ? 1 : 0,
            transition: "transform 480ms cubic-bezier(0.16, 1, 0.3, 1), opacity 480ms ease-out",
            pointerEvents: isRevealed ? ("auto" as const) : ("none" as const),
        };
    };

    // Main Animation State Machine Loop with Natural Human Pacing
    useEffect(() => {
        if (prefersReducedMotion || !isInView || !isTabActive) return;

        let active = true;
        const timerIds: NodeJS.Timeout[] = [];
        let animFrameId: number;

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
            // -------------------------------------------------------------
            // PHASE 1: QUESTION STAGE
            // -------------------------------------------------------------
            setIsOptionSelected(false);
            setIsBtnPressed(false);
            setIsBtnHovered(false);
            setActiveRole("Software Engineer");
            setAnalyzingProgress(0);
            setRenderResult(false);
            setResultStaggerStep(0);

            // 500ms: Reveal fake cursor smoothly
            schedule(() => {
                if (optRef.current) {
                    setCursorPos(getCoordinates(optRef.current, { y: 22 }));
                }
                setCursorVisible(true);
            }, 500);

            // 900ms: Silky glide cursor to Option A
            schedule(() => {
                if (optRef.current) {
                    setCursorPos(getCoordinates(optRef.current));
                }
            }, 900);

            // 1800ms: Click Option A with organic ripple
            schedule(() => {
                triggerClick();
                setIsOptionSelected(true);
            }, 1800);

            // 2500ms: Glide cursor to "Lihat Hasil Asesmen" button
            schedule(() => {
                if (nextBtnRef.current) {
                    setCursorPos(getCoordinates(nextBtnRef.current, { y: -2 }));
                }
            }, 2500);

            // 3300ms: Hover on button with soft glow
            schedule(() => {
                setIsBtnHovered(true);
            }, 3300);

            // 3800ms: Click button with tactile spring press
            schedule(() => {
                triggerClick();
                setIsBtnPressed(true);
            }, 3800);

            // 4150ms: Softly fade out cursor before slide starts
            schedule(() => {
                setIsBtnPressed(false);
                setIsBtnHovered(false);
                setCursorVisible(false);
            }, 4150);

            // -------------------------------------------------------------
            // TRANSITION 1: QUESTION -> ANALYZING (750ms Silky Upward Slide)
            // -------------------------------------------------------------
            schedule(() => {
                setAnalyzingPos("enter");
            }, 4250);

            schedule(() => {
                setIsTransitioning(true);
                setQuestionPos("exit");
                setAnalyzingPos("active");
            }, 4300);

            // 5050ms: Transition 1 completes. Question hidden and reset.
            schedule(() => {
                setIsTransitioning(false);
                setQuestionPos("hidden");

                // Start Analyzing Archetype Bars Animation with quartic deceleration (~2s)
                const startTime = performance.now();
                const duration = 2000; // ms
                const animateBars = (currentTime: number) => {
                    if (!active) return;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutQuart
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    setAnalyzingProgress(easeProgress);
                    if (progress < 1) {
                        animFrameId = requestAnimationFrame(animateBars);
                    }
                };
                animFrameId = requestAnimationFrame(animateBars);
            }, 5050);

            // -------------------------------------------------------------
            // TRANSITION 2: ANALYZING -> RESULT (750ms Silky Upward Slide)
            // -------------------------------------------------------------
            // Mount result screen at "enter" position right before transition
            schedule(() => {
                setRenderResult(true);
                setResultPos("enter");
            }, 7350);

            schedule(() => {
                setIsTransitioning(true);
                setAnalyzingPos("exit");
                setResultPos("active");
            }, 7400);

            // 8150ms: Transition 2 completes. Analyzing hidden.
            schedule(() => {
                setIsTransitioning(false);
                setAnalyzingPos("hidden");
            }, 8150);

            // -------------------------------------------------------------
            // PHASE 3: RESULT STAGE (Gentle Staggered Entrance)
            // -------------------------------------------------------------
            // 8300ms: 1. Profile card floats in
            schedule(() => {
                setResultStaggerStep(1);
            }, 8300);

            // 8480ms: 2. Skill Readiness card floats in & count-up begins
            schedule(() => {
                setResultStaggerStep(2);
            }, 8480);

            // 8660ms: 3. Gap terbesar row floats in
            schedule(() => {
                setResultStaggerStep(3);
            }, 8660);

            // 8840ms: 4. Roadmap notification card floats in
            schedule(() => {
                setResultStaggerStep(4);
            }, 8840);

            // -------------------------------------------------------------
            // CURSOR INTERACTION ON RESULT SCREEN
            // -------------------------------------------------------------
            // 9500ms: Recalculate coordinates and reveal cursor smoothly
            schedule(() => {
                if (chipDaRef.current) {
                    setCursorPos(getCoordinates(chipDaRef.current, { y: 24 }));
                }
                setCursorVisible(true);
            }, 9500);

            // 9850ms: Silky glide cursor to "Data Analyst" chip
            schedule(() => {
                if (chipDaRef.current) {
                    setCursorPos(getCoordinates(chipDaRef.current));
                }
            }, 9850);

            // 10700ms: Click "Data Analyst" chip -> Smooth liquid in-place transition to 54%
            schedule(() => {
                triggerClick();
                setActiveRole("Data Analyst");
            }, 10700);

            // 11800ms: Glide cursor to "Software Engineer" chip
            schedule(() => {
                if (chipSeRef.current) {
                    setCursorPos(getCoordinates(chipSeRef.current));
                }
            }, 11800);

            // 12650ms: Click "Software Engineer" chip -> Smooth in-place transition to 68%
            schedule(() => {
                triggerClick();
                setActiveRole("Software Engineer");
            }, 12650);

            // 13550ms: Glide cursor down towards Roadmap card
            schedule(() => {
                if (roadmapCardRef.current) {
                    setCursorPos(getCoordinates(roadmapCardRef.current));
                }
            }, 13550);

            // 14450ms: Fade out cursor softly before reset transition
            schedule(() => {
                setCursorVisible(false);
            }, 14450);

            // -------------------------------------------------------------
            // TRANSITION 3: RESULT -> NEXT QUESTION (750ms Upward Slide)
            // -------------------------------------------------------------
            schedule(() => {
                setQuestionCycle((prev) => prev + 1);
                setIsOptionSelected(false);
                setQuestionPos("enter");
            }, 14700);

            schedule(() => {
                setIsTransitioning(true);
                setResultPos("exit");
                setQuestionPos("active");
            }, 14750);

            // 15500ms: Transition 3 completes. Result hidden and loop restarts!
            schedule(() => {
                setIsTransitioning(false);
                setResultPos("hidden");
                setRenderResult(false);
                setResultStaggerStep(0);
                runTimeline();
            }, 15500);
        };

        runTimeline();

        return () => {
            active = false;
            timerIds.forEach(clearTimeout);
            if (animFrameId) cancelAnimationFrame(animFrameId);
        };
    }, [isInView, isTabActive, prefersReducedMotion, getCoordinates]);

    return (
        <div
            className="w-full max-w-[440px] xl:max-w-[480px] min-h-[620px] sm:min-h-[630px] mx-auto rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.09),0_4px_16px_-4px_rgba(0,0,0,0.04)] p-5 sm:p-6 flex flex-col justify-between relative select-none [contain:layout]"
            aria-hidden="true"
        >
            {/* Ambient Gradient Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-2xl rounded-full pointer-events-none" />

            {/* Top Meta Header (Fixed - never moves) */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 relative z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        <Brain className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-900">Simulasi Asesmen Minat</div>
                        <div className="text-[10px] text-gray-400 font-medium transition-colors duration-300">
                            {analyzingPos === "active"
                                ? "Menganalisis matriks..."
                                : resultPos === "active" || prefersReducedMotion
                                    ? "Hasil Terverifikasi"
                                    : currentQ.stepLabel}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                    Contoh tampilan
                </span>
            </div>

            {/* STAGE CONTAINER (Fixed Height, Overflow Hidden - Clips Screen Slides & Fake Cursor) */}
            <div
                ref={stageRef}
                className="relative w-full h-[470px] sm:h-[480px] overflow-hidden my-auto"
            >
                {/* ===================================================================
            SCREEN 1: QUESTION SCREEN
        =================================================================== */}
                <div
                    style={prefersReducedMotion ? { display: "none" } : getScreenStyle(questionPos)}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3.5 px-0.5"
                >
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                            <span>Progres Evaluasi</span>
                            <span className="text-brand-primary font-bold tabular-nums">
                                {!isOptionSelected ? currentQ.progressLabel : `${currentQ.progressPercent + 7}% Selesai`}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: !isOptionSelected
                                        ? `${currentQ.progressPercent}%`
                                        : `${currentQ.progressPercent + 7}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Question Box */}
                    <div className="p-4 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                                {currentQ.scenarioTitle}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">
                                {currentQ.questionNumber}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed min-h-[38px]">
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
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-300 ${isSelected
                                                ? "bg-white border-2 border-brand-primary shadow-xs ring-2 ring-brand-primary/10"
                                                : "bg-white border-gray-200/80 text-gray-700 hover:border-gray-300"
                                            }`}
                                        style={{
                                            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? "border-brand-primary" : "border-gray-300"
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full bg-brand-primary transition-transform duration-300 ${isSelected ? "scale-100" : "scale-0"
                                                    }`}
                                                style={{
                                                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-gray-900 leading-snug">
                                            {choice.text}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Trigger Button */}
                    <div className="pt-2 flex justify-end">
                        <button
                            ref={nextBtnRef}
                            type="button"
                            tabIndex={-1}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-sm ${isBtnPressed
                                    ? "bg-[#004ECC] text-white scale-[0.96] ring-4 ring-brand-primary/40 shadow-inner"
                                    : isBtnHovered
                                        ? "bg-brand-primary text-white scale-[1.04] shadow-lg shadow-brand-primary/30 ring-4 ring-brand-primary/20"
                                        : isOptionSelected
                                            ? "bg-brand-primary text-white scale-[1.01] shadow-brand-primary/20"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                                }`}
                            style={{
                                transition: "all 280ms cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            Lihat Hasil Asesmen <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* ===================================================================
            SCREEN 2: ANALYZING SCREEN
        =================================================================== */}
                <div
                    style={prefersReducedMotion ? { display: "none" } : getScreenStyle(analyzingPos)}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-4 text-center px-0.5"
                >
                    <div className="relative w-14 h-14 mx-auto">
                        <div className="absolute inset-0 rounded-2xl bg-brand-primary/20 animate-ping opacity-40" />
                        <div className="relative w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/30">
                            <Brain className="w-7 h-7 animate-pulse" />
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

                    {/* Sequential Archetype Progress Bars with Live Quartic Count-up */}
                    <div className="space-y-2.5 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-left max-w-sm mx-auto w-full">
                        {DEMO_ARCHETYPES.map((bar) => {
                            const liveVal = Math.round(bar.val * analyzingProgress);
                            return (
                                <div key={bar.label} className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-600">
                                        <span>{bar.label}</span>
                                        <span className="text-brand-primary tabular-nums font-bold">{liveVal}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-primary rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${liveVal}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ===================================================================
            SCREEN 3: RESULT SCREEN (STAGGERED ITEMS)
        =================================================================== */}
                {(renderResult || prefersReducedMotion) && (
                    <div
                        style={
                            prefersReducedMotion
                                ? { position: "relative", width: "100%", height: "100%" }
                                : getScreenStyle(resultPos)
                        }
                        className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-2.5 px-0.5"
                    >
                        {/* ITEM 1: Profile Card + Career Chips (Stagger Step 1) */}
                        <div
                            style={getResultStaggerStyle(1)}
                            className="p-3 sm:p-3.5 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                                    Profil Teridentifikasi
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary text-white">
                                    Cocok 95%
                                </span>
                            </div>

                            <div>
                                <h4 className="text-base sm:text-lg font-black tracking-tight text-gray-900 leading-snug">
                                    Kamu adalah <span className="text-brand-primary">The Builder</span>
                                </h4>
                                <p className="text-[11px] text-gray-600 leading-relaxed mt-0.5">
                                    Kekuatan alamimu terletak pada pemecahan masalah logis, pembangunan sistem yang andal, dan eksekusi terstruktur.
                                </p>
                            </div>

                            {/* Career Role Chips */}
                            <div className="pt-0.5">
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    Pilih Peran untuk Cek Kesiapan:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    <button
                                        ref={chipSeRef}
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setActiveRole("Software Engineer")}
                                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-300 ${activeRole === "Software Engineer"
                                                ? "bg-brand-primary text-white shadow-xs scale-105"
                                                : "bg-white border border-gray-200 text-gray-700 hover:border-brand-primary/50"
                                            }`}
                                        style={{
                                            transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
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
                                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-300 ${activeRole === "Data Analyst"
                                                ? "bg-brand-primary text-white shadow-xs scale-105"
                                                : "bg-white border border-gray-200 text-gray-700 hover:border-brand-primary/50"
                                            }`}
                                        style={{
                                            transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
                                    >
                                        <span className="flex items-center gap-1">
                                            {activeRole === "Data Analyst" && (
                                                <CheckCircle2 className="w-3 h-3" />
                                            )}
                                            Data Analyst
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setActiveRole("Technical Lead")}
                                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-300 ${activeRole === "Technical Lead"
                                                ? "bg-brand-primary text-white shadow-xs scale-105"
                                                : "bg-white border border-gray-200 text-gray-700 hover:border-brand-primary/50"
                                            }`}
                                        style={{
                                            transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                                        }}
                                    >
                                        <span className="flex items-center gap-1">
                                            {activeRole === "Technical Lead" && (
                                                <CheckCircle2 className="w-3 h-3" />
                                            )}
                                            Technical Lead
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ITEM 2: SKILL READINESS Component (Stagger Step 2) */}
                        <div style={getResultStaggerStyle(2)}>
                            <SkillReadiness
                                data={roleData}
                                isAnimated={!prefersReducedMotion}
                                triggerAnimation={prefersReducedMotion || resultStaggerStep >= 2}
                            />
                        </div>

                        {/* ITEM 3: Gap Terbesar Callout Row (Stagger Step 3) */}
                        <div
                            style={getResultStaggerStyle(3)}
                            className="p-2 sm:p-2.5 rounded-xl bg-brand-primary/5 border border-brand-primary/15 text-[11px] text-gray-700 flex items-center gap-2"
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
                            style={getResultStaggerStyle(4)}
                            className="p-2.5 sm:p-3 rounded-2xl bg-white border border-gray-200/80 shadow-xs flex items-center gap-2.5"
                        >
                            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                                <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-gray-900">Roadmap belajarmu siap!</div>
                                <div className="text-[10px] text-gray-400">
                                    Kurikulum terstruktur untuk mempercepat kesiapan kariermu.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Virtual Animated Cursor (Clipped inside stage container) */}
                {!prefersReducedMotion && (
                    <FakeCursor
                        x={cursorPos.x}
                        y={cursorPos.y}
                        isClicking={isClicking}
                        visible={cursorVisible}
                    />
                )}
            </div>

            {/* Bottom Assistant Snapshot Preview (Fixed - never moves) */}
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-4 relative z-10 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                            AI Persona Compass
                        </div>
                        <div className="text-[11px] font-bold text-gray-800 truncate transition-colors duration-300">
                            {resultPos === "active" || prefersReducedMotion
                                ? "Hasil siap dieksplorasi"
                                : "Memetakan kepribadian ke karier nyata"}
                        </div>
                    </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5 shrink-0">
                    Ilustrasi <ChevronRight className="w-3 h-3" />
                </span>
            </div>
        </div>
    );
}
