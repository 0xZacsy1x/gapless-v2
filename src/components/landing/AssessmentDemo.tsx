"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Brain, CheckCircle2, Compass, ChevronRight, AlertCircle } from "lucide-react";
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

    const optRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const chipSeRef = useRef<HTMLButtonElement>(null);
    const chipDaRef = useRef<HTMLButtonElement>(null);
    const chipUiRef = useRef<HTMLButtonElement>(null);
    const roadmapCardRef = useRef<HTMLDivElement>(null);

    const [currentScreen, setCurrentScreen] = useState<"question" | "analyzing" | "result">("question");
    const [questionCycle, setQuestionCycle] = useState(0);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isBtnPressed, setIsBtnPressed] = useState(false);
    const [activeRole, setActiveRole] = useState("Software Engineer");

    // Coordinate calculation helper relative to stage container
    const getCoords = useCallback(
        (el: HTMLElement | null, off?: { x?: number; y?: number }) => {
            if (!el || !stageRef.current) return { x: 120, y: 150 };
            const s = stageRef.current.getBoundingClientRect();
            const e = el.getBoundingClientRect();
            return {
                x: Math.round(e.left - s.left + e.width / 2 + (off?.x ?? 0) - 3),
                y: Math.round(e.top - s.top + e.height / 2 + (off?.y ?? 0) - 2),
            };
        },
        []
    );

    // Ripple click pulse on cursor
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
                { scale: 0.3, opacity: 0.7 },
                { scale: 2.2, opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }
            );
        }
    }, []);

    // Pause/resume when tab visibility changes or when scrolled far out of view
    useEffect(() => {
        const onVis = () => {
            const isVisible = document.visibilityState === "visible";
            if (!tlRef.current) return;
            if (isVisible) {
                tlRef.current.resume();
            } else {
                tlRef.current.pause();
            }
        };
        document.addEventListener("visibilitychange", onVis);

        let io: IntersectionObserver | null = null;
        if (stageRef.current) {
            io = new IntersectionObserver(
                ([entry]) => {
                    if (!tlRef.current) return;
                    // Only pause if strictly scrolled out of viewport
                    if (!entry.isIntersecting && window.scrollY > 200) {
                        tlRef.current.pause();
                    } else if (entry.isIntersecting && document.visibilityState === "visible") {
                        tlRef.current.resume();
                    }
                },
                { threshold: 0.1 }
            );
            io.observe(stageRef.current);
        }

        return () => {
            document.removeEventListener("visibilitychange", onVis);
            if (io) io.disconnect();
        };
    }, []);

    // Master GSAP Timeline Orchestration
    useEffect(() => {
        const qScreen = questionScreenRef.current;
        const aScreen = analyzingScreenRef.current;
        const rScreen = resultScreenRef.current;
        const cursor = cursorRef.current;

        if (!qScreen || !aScreen || !rScreen || !cursor) return;

        // Reset positions
        gsap.set(qScreen, { yPercent: 0, opacity: 1, scale: 1 });
        gsap.set(aScreen, { yPercent: 100, opacity: 0, scale: 0.97 });
        gsap.set(rScreen, { yPercent: 100, opacity: 0, scale: 0.97 });
        gsap.set(cursor, { opacity: 0, scale: 1 });

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.8,
            defaults: { ease: "power2.out" },
        });
        tlRef.current = tl;

        // ── PHASE 1: QUESTION STAGE (Visible ~3.5s) ──
        tl.call(() => {
            setCurrentScreen("question");
            setIsOptionSelected(false);
            setIsBtnHovered(false);
            setIsBtnPressed(false);
            setActiveRole("Software Engineer");
            gsap.set(qScreen, { pointerEvents: "auto" });
            gsap.set(aScreen, { pointerEvents: "none" });
            gsap.set(rScreen, { pointerEvents: "none" });
        });

        // Initialize cursor position near the first choice
        tl.to(cursor, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            onStart: () => {
                const c = getCoords(optRef.current, { x: -60, y: 35 });
                gsap.set(cursor, { x: c.x, y: c.y });
            },
        }, "+=0.3");

        // Cursor glides towards the first option
        tl.to(cursor, {
            x: () => getCoords(optRef.current, { x: 20, y: 0 }).x,
            y: () => getCoords(optRef.current, { x: 20, y: 0 }).y,
            duration: 0.85,
            ease: "power2.inOut",
        });

        // Click on Option A
        tl.call(() => {
            triggerClickPulse();
            setIsOptionSelected(true);
        }, undefined, "+=0.1");

        // Short pause after selection
        tl.to({}, { duration: 0.4 });

        // Cursor moves to "Lihat Hasil Asesmen" button
        tl.to(cursor, {
            x: () => getCoords(nextBtnRef.current, { x: 0, y: 0 }).x,
            y: () => getCoords(nextBtnRef.current, { x: 0, y: 0 }).y,
            duration: 0.75,
            ease: "power2.inOut",
            onStart: () => setIsBtnHovered(true),
        });

        // Press CTA button
        tl.call(() => {
            setIsBtnPressed(true);
            triggerClickPulse();
        }, undefined, "+=0.1");

        // Release CTA button & hide cursor during transition
        tl.call(() => {
            setIsBtnPressed(false);
            setIsBtnHovered(false);
        }, undefined, "+=0.12");

        tl.to(cursor, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        }, "<");

        // ── TRANSITION 1: QUESTION -> ANALYZING (0.6s Silky Slide) ──
        tl.call(() => {
            setCurrentScreen("analyzing");
            gsap.set(qScreen, { pointerEvents: "none" });
            gsap.set(aScreen, { pointerEvents: "auto" });
        }, undefined, "+=0.05");

        // Prepare aScreen below before slide
        tl.set(aScreen, { yPercent: 100, opacity: 0, scale: 0.97 });

        tl.to(qScreen, {
            yPercent: -100,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: "power2.inOut",
        });

        tl.to(aScreen, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.inOut",
        }, "<");

        // ── PHASE 2: ANALYZING STAGE (Visible ~2.8s) ──
        tl.call(() => {
            const bars = aScreen.querySelectorAll<HTMLElement>(".demo-arch-bar");
            const nums = aScreen.querySelectorAll<HTMLElement>(".demo-arch-num");
            bars.forEach((bar) => {
                gsap.set(bar, { width: "0%" });
                gsap.to(bar, { width: bar.dataset.target || "0%", duration: 1.2, ease: "power2.out" });
            });
            nums.forEach((num) => {
                const targetVal = parseInt(num.dataset.target || "0", 10);
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: targetVal,
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: () => {
                        num.textContent = `${Math.round(obj.val)}%`;
                    },
                });
            });
        }, undefined, "+=0.1");

        // Hold analyzing screen so user can clearly view the RIASEC calculation
        tl.to({}, { duration: 2.2 });

        // ── TRANSITION 2: ANALYZING -> RESULT (0.6s Silky Slide) ──
        tl.call(() => {
            setCurrentScreen("result");
            gsap.set(aScreen, { pointerEvents: "none" });
            gsap.set(rScreen, { pointerEvents: "auto" });
        });

        // Prepare rScreen below before slide
        tl.set(rScreen, { yPercent: 100, opacity: 0, scale: 0.97 });

        tl.to(aScreen, {
            yPercent: -100,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: "power2.inOut",
        });

        tl.to(rScreen, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.inOut",
        }, "<");

        // Stagger reveal result card items
        tl.call(() => {
            const items = rScreen.querySelectorAll<HTMLElement>(".result-stagger-item");
            gsap.fromTo(
                items,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: "power2.out", immediateRender: false }
            );
        }, undefined, "-=0.1");

        // ── PHASE 3: RESULT STAGE (Visible ~5.0s) ──
        // Reveal cursor near role chips
        tl.to(cursor, {
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            onStart: () => {
                const c = getCoords(chipDaRef.current, { y: 18 });
                gsap.set(cursor, { x: c.x, y: c.y });
            },
        }, "+=0.3");

        // Glide cursor to "Data Analyst" chip
        tl.to(cursor, {
            x: () => getCoords(chipDaRef.current, { x: 0, y: 0 }).x,
            y: () => getCoords(chipDaRef.current, { x: 0, y: 0 }).y,
            duration: 0.7,
            ease: "power2.inOut",
        });

        // Click Data Analyst chip
        tl.call(() => {
            triggerClickPulse();
            setActiveRole("Data Analyst");
        }, undefined, "+=0.1");

        // Pause to inspect Data Analyst metrics
        tl.to({}, { duration: 1.3 });

        // Glide cursor to "UI/UX Designer" chip
        tl.to(cursor, {
            x: () => getCoords(chipUiRef.current, { x: 0, y: 0 }).x,
            y: () => getCoords(chipUiRef.current, { x: 0, y: 0 }).y,
            duration: 0.65,
            ease: "power2.inOut",
        });

        // Click UI/UX Designer chip
        tl.call(() => {
            triggerClickPulse();
            setActiveRole("UI/UX Designer");
        }, undefined, "+=0.1");

        // Pause to inspect UI/UX Designer metrics
        tl.to({}, { duration: 1.3 });

        // Fade out cursor before looping back to Question
        tl.to(cursor, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
        }, "+=0.4");

        // ── TRANSITION 3: RESULT -> NEXT QUESTION (0.6s Silky Slide) ──
        tl.call(() => {
            // Cycle question for varied experience on next loop
            setQuestionCycle((prev) => (prev + 1) % DEMO_QUESTIONS.length);
        });

        tl.set(qScreen, { yPercent: 100, opacity: 0, scale: 0.97 });

        tl.to(rScreen, {
            yPercent: -100,
            opacity: 0,
            scale: 0.97,
            duration: 0.6,
            ease: "power2.inOut",
        });

        tl.to(qScreen, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.inOut",
        }, "<");

        return () => {
            tl.kill();
        };
    }, [getCoords, triggerClickPulse]);

    const currentQ = DEMO_QUESTIONS[questionCycle];
    const roleData = CAREER_ROLES_DATA[activeRole] || CAREER_ROLES_DATA["Software Engineer"];

    return (
        <div className="relative w-full max-w-md mx-auto p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-4 font-sans select-none overflow-hidden text-slate-900">
            {/* macOS Window Controls + Simulated Test Header (Light Mode) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 relative z-10 shrink-0">
                <div className="flex items-center gap-2.5">
                    {/* macOS 3 Window Controls */}
                    <div className="flex items-center gap-1.5 shrink-0 pr-1">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                    </div>
                    <div className="h-3.5 w-px bg-slate-200 shrink-0" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-[#0066FF] border border-blue-100 shadow-3xs">
                            <Brain className="w-3.5 h-3.5 text-[#0066FF]" />
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-slate-900 font-sans leading-none tracking-tight">Simulasi Asesmen Minat</div>
                            <div className="text-[11px] text-slate-500 font-medium transition-colors duration-300 mt-0.5">
                                {currentScreen === "analyzing"
                                    ? "Menganalisis matriks psikometri..."
                                    : currentScreen === "result"
                                        ? "Hasil Terverifikasi"
                                        : currentQ.stepLabel}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-3xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Demo Interaktif</span>
                </div>
            </div>

            {/* Stage Container (Fixed Height, Overflow Hidden - Clips Screen Slides & Fake Cursor) */}
            <div
                ref={stageRef}
                className="relative w-full h-[470px] sm:h-[480px] overflow-hidden my-auto"
            >
                {/* ===================================================================
                    SCREEN 1: QUESTION SCREEN (Light Mode)
                =================================================================== */}
                <div
                    ref={questionScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3.5 px-0.5 z-20 pointer-events-auto bg-white"
                >
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-slate-500">
                            <span>Progres Evaluasi</span>
                            <span className="text-[#0066FF] font-bold tabular-nums">
                                {!isOptionSelected ? currentQ.progressLabel : `${currentQ.progressPercent + 7}% Selesai`}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                            <div
                                className="h-full bg-[#0066FF] rounded-full transition-[width] duration-500 ease-out"
                                style={{
                                    width: !isOptionSelected
                                        ? `${currentQ.progressPercent}%`
                                        : `${currentQ.progressPercent + 7}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Question Box */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3 shadow-3xs">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0066FF]">
                                {currentQ.scenarioTitle}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium font-mono">
                                {currentQ.questionNumber}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed min-h-[38px]">
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
                                                ? "bg-blue-50/80 border-2 border-[#0066FF] text-[#0066FF] shadow-xs ring-2 ring-[#0066FF]/15"
                                                : "bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${isSelected ? "border-[#0066FF] bg-[#0066FF]" : "border-slate-300 bg-white"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </div>
                                        <span className={`text-xs font-medium leading-snug ${isSelected ? "text-slate-900 font-semibold" : "text-slate-700"}`}>
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
                            className={`w-full h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${isOptionSelected
                                    ? isBtnPressed
                                        ? "bg-[#0052cc] text-white scale-[0.98]"
                                        : isBtnHovered
                                            ? "bg-[#005cd9] text-white shadow-md shadow-[#0066FF]/30 scale-[1.01]"
                                            : "bg-[#0066FF] text-white shadow-sm shadow-[#0066FF]/25"
                                    : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            <span>Lihat Hasil Asesmen</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 2: ANALYZING SCREEN (Light Mode)
                =================================================================== */}
                <div
                    ref={analyzingScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center space-y-6 px-4 z-10 pointer-events-none bg-white"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-3 border-slate-200 border-t-[#0066FF] animate-spin" />
                        <Brain className="w-7 h-7 text-[#0066FF] absolute" />
                    </div>

                    <div className="text-center space-y-1">
                        <h4 className="text-sm font-semibold text-slate-900">
                            Menganalisis Pola Responsmu...
                        </h4>
                        <p className="text-xs text-slate-500">
                            Memetakan orientasi psikometri RIASEC &amp; kompetensi industri.
                        </p>
                    </div>

                    {/* Archetype Bars Filling Up */}
                    <div className="w-full max-w-xs space-y-2.5 bg-slate-50/90 p-4 rounded-2xl border border-slate-200/90 shadow-3xs">
                        {DEMO_ARCHETYPES.map((arch) => (
                            <div key={arch.label} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-medium text-slate-700">
                                    <span>{arch.label}</span>
                                    <span
                                        className="demo-arch-num font-mono tabular-nums text-[#0066FF] font-bold"
                                        data-target={arch.val}
                                    >
                                        0%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="demo-arch-bar h-full bg-[#0066FF] rounded-full w-0"
                                        data-target={`${arch.val}%`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 3: RESULT SCREEN (Light Mode)
                =================================================================== */}
                <div
                    ref={resultScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-between py-1 px-0.5 space-y-2 z-10 pointer-events-none bg-white"
                >
                    {/* ITEM 1: Profile Top Match & Role Switcher Chips */}
                    <div className="result-stagger-item space-y-2">
                        <div className="flex items-center justify-between pb-0.5">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] font-semibold text-slate-900">Kecocokan Tertinggi</span>
                                <span className="font-mono text-xs font-bold text-[#0066FF] tabular-nums">94%</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 font-medium">
                                Profil Terverifikasi
                            </span>
                        </div>

                        <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-2">
                            <div className="text-xs font-bold text-slate-900">
                                Kamu adalah <span className="text-[#0066FF]">The Builder</span>
                            </div>
                            <div className="text-[11px] text-slate-600 leading-snug">
                                Berbakat merancang arsitektur sistem logis, memecahkan problematis teknikal, dan eksekusi presisi.
                            </div>

                            {/* Dynamic Career Role Chips */}
                            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto no-scrollbar">
                                <button
                                    ref={chipSeRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("Software Engineer")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${activeRole === "Software Engineer"
                                            ? "bg-[#0066FF] text-white shadow-xs scale-105 border border-[#0066FF]"
                                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "Software Engineer" && (
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        )}
                                        Software Engineer
                                    </span>
                                </button>

                                <button
                                    ref={chipDaRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("Data Analyst")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${activeRole === "Data Analyst"
                                            ? "bg-[#0066FF] text-white shadow-xs scale-105 border border-[#0066FF]"
                                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "Data Analyst" && (
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        )}
                                        Data Analyst
                                    </span>
                                </button>

                                <button
                                    ref={chipUiRef}
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setActiveRole("UI/UX Designer")}
                                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${activeRole === "UI/UX Designer"
                                            ? "bg-[#0066FF] text-white shadow-xs scale-105 border border-[#0066FF]"
                                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                                        }`}
                                >
                                    <span className="flex items-center gap-1">
                                        {activeRole === "UI/UX Designer" && (
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        )}
                                        UI/UX Designer
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ITEM 2: SKILL READINESS Component */}
                    <div className="result-stagger-item">
                        <SkillReadiness
                            data={roleData}
                            isAnimated={true}
                            triggerAnimation={true}
                        />
                    </div>

                    {/* ITEM 3: Gap Terbesar Callout Row */}
                    <div
                        className="result-stagger-item p-2 sm:p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-slate-800 flex items-center gap-2"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span className="truncate">
                            <strong className="text-[#0066FF] font-semibold">Gap terbesar:</strong>{" "}
                            {roleData.biggestGap}. Roadmap belajarmu mulai dari sini.
                        </span>
                    </div>

                    {/* ITEM 4: Roadmap Ready Notification Card */}
                    <div
                        ref={roadmapCardRef}
                        className="result-stagger-item p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-3xs flex items-center gap-2.5"
                    >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 border border-blue-200">
                            <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-slate-900">Roadmap belajarmu siap!</div>
                            <div className="text-[11px] text-slate-500">
                                Kurikulum 4 fase terstruktur untuk mempercepat kesiapan kariermu.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Virtual Animated Cursor (Clipped inside stage container) */}
                <div
                    ref={cursorRef}
                    className="absolute pointer-events-none z-50 top-0 left-0 opacity-0 will-change-transform"
                    aria-hidden="true"
                >
                    <div className="relative">
                        <svg
                            width="28"
                            height="34"
                            viewBox="0 0 24 28"
                            fill="none"
                            className="drop-shadow-md"
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
                            className="absolute w-12 h-12 rounded-full bg-[#0066FF]/20 border-2 border-[#0066FF] pointer-events-none opacity-0 -left-[19px] -top-[20px]"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Assistant Snapshot Preview (Fixed - never moves) */}
            <div className="mt-auto pt-3 border-t border-slate-100 relative z-10 shrink-0">
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/90">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 border border-blue-200">
                        <Compass className="w-4 h-4 text-[#0066FF]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-semibold tracking-wider text-[#0066FF] uppercase">
                            AI Persona Compass
                        </div>
                        <div className="text-[11px] font-semibold text-slate-900 truncate transition-colors duration-300">
                            {currentScreen === "result"
                                ? "Hasil siap dieksplorasi"
                                : "Memetakan kepribadian ke karier nyata"}
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 shrink-0">
                        Ilustrasi &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
}
