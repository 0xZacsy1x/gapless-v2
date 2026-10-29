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

    const currentQ = DEMO_QUESTIONS[questionCycle % DEMO_QUESTIONS.length];
    const roleData = CAREER_ROLES_DATA[activeRole] || CAREER_ROLES_DATA["Software Engineer"];

    // ── Main GSAP Animation Cycle ─────────────────────────────────────
    useEffect(() => {
        const qScreen = questionScreenRef.current;
        const aScreen = analyzingScreenRef.current;
        const rScreen = resultScreenRef.current;
        const cursor = cursorRef.current;

        if (!qScreen || !aScreen || !rScreen || !cursor) return;

        let isCancelled = false;

        // Reset elements for this cycle using GSAP exclusively (no React inline style fighting)
        gsap.set(qScreen, { yPercent: 0, opacity: 1, scale: 1, pointerEvents: "auto" });
        gsap.set(aScreen, { yPercent: 100, opacity: 0, scale: 0.97, pointerEvents: "none" });
        gsap.set(rScreen, { yPercent: 100, opacity: 0, scale: 0.97, pointerEvents: "none" });

        // Position cursor slightly offset from Option A
        const startCoords = getCoords(optRef.current, { x: 30, y: 22 });
        gsap.set(cursor, { opacity: 0, scale: 1, x: startCoords.x, y: startCoords.y, transformOrigin: "3px 2px" });

        // Build cycle timeline with natural pacing
        const tl = gsap.timeline({
            onComplete: () => {
                if (!isCancelled) {
                    setQuestionCycle((prev) => prev + 1);
                }
            },
        });
        tlRef.current = tl;

        // ── PHASE 1: QUESTION STAGE (Visible ~3.3s) ──
        tl.call(() => {
            setCurrentScreen("question");
            setIsOptionSelected(false);
            setIsBtnHovered(false);
            setIsBtnPressed(false);
            setActiveRole("Software Engineer");
        });

        // 0.2s: Fade in cursor smoothly
        tl.to(cursor, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
        }, "+=0.2");

        // 0.5s: Silky glide cursor to Option A center
        tl.to(cursor, {
            duration: 0.55,
            ease: "power2.out",
            x: () => getCoords(optRef.current).x,
            y: () => getCoords(optRef.current).y,
        }, "+=0.05");

        // 1.1s: Click Option A with organic ripple & select it
        tl.call(() => {
            triggerClickPulse();
            setIsOptionSelected(true);
        }, undefined, "+=0.15");

        // 1.7s: Glide cursor down to "Lihat Hasil Asesmen" button
        tl.to(cursor, {
            duration: 0.55,
            ease: "power2.out",
            x: () => getCoords(nextBtnRef.current).x,
            y: () => getCoords(nextBtnRef.current).y,
        }, "+=0.45");

        // 2.35s: Hover on submit button
        tl.call(() => {
            setIsBtnHovered(true);
        }, undefined, "+=0.1");

        // 2.6s: Click button with spring compression
        tl.call(() => {
            setIsBtnPressed(true);
            triggerClickPulse();
        }, undefined, "+=0.15");

        // 2.85s: Release button press
        tl.call(() => {
            setIsBtnPressed(false);
            setIsBtnHovered(false);
        }, undefined, "+=0.1");

        // 3.0s: Fade out cursor before stage transition
        tl.to(cursor, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        }, "+=0.05");

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
            duration: 0.45,
            ease: "power2.out",
            x: () => getCoords(chipDaRef.current).x,
            y: () => getCoords(chipDaRef.current).y,
        }, "+=0.05");

        // Click "Data Analyst" -> switch role & trigger ripple
        tl.call(() => {
            triggerClickPulse();
            setActiveRole("Data Analyst");
        }, undefined, "+=0.15");

        // Glide cursor to "Software Engineer" chip
        tl.to(cursor, {
            duration: 0.45,
            ease: "power2.out",
            x: () => getCoords(chipSeRef.current).x,
            y: () => getCoords(chipSeRef.current).y,
        }, "+=0.7");

        // Click "Software Engineer" -> switch back
        tl.call(() => {
            triggerClickPulse();
            setActiveRole("Software Engineer");
        }, undefined, "+=0.15");

        // Glide cursor down towards Roadmap card
        tl.to(cursor, {
            duration: 0.45,
            ease: "power2.out",
            x: () => getCoords(roadmapCardRef.current).x,
            y: () => getCoords(roadmapCardRef.current).y,
        }, "+=0.35");

        // Fade out cursor before hold
        tl.to(cursor, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
        }, "+=0.4");

        // Hold on result screen so user can clearly read roadmap and gap details (~2.2s)
        tl.to({}, { duration: 2.2 });

        // ── TRANSITION 3: RESULT -> NEXT QUESTION (0.6s Upward Slide) ──
        tl.call(() => {
            setCurrentScreen("question");
            setIsOptionSelected(false);
            setIsBtnHovered(false);
            setIsBtnPressed(false);
            setActiveRole("Software Engineer");
            gsap.set(rScreen, { pointerEvents: "none" });
            gsap.set(qScreen, { pointerEvents: "auto" });
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

        tl.to({}, { duration: 0.2 });

        return () => {
            isCancelled = true;
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
            gsap.killTweensOf([qScreen, aScreen, rScreen, cursor]);
        };
    // Re-run cycle whenever questionCycle updates
    }, [questionCycle, getCoords, triggerClickPulse]);

    return (
        <div
            className="w-full max-w-[440px] xl:max-w-[480px] min-h-[620px] sm:min-h-[630px] mx-auto rounded-[32px] bg-[#1c1c1e] border border-white/[0.12] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)] p-5 sm:p-6 flex flex-col justify-between relative select-none [contain:layout] font-sans text-[#f5f5f7] overflow-hidden"
            aria-hidden="true"
        >
            {/* Top Window Bar (macOS Pro Template Header - Fixed) */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 relative z-10 shrink-0">
                <div className="flex items-center gap-2.5">
                    {/* macOS Window Controls (Traffic Lights) */}
                    <div className="flex items-center gap-1.5 shrink-0 pr-1">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] inline-block" />
                    </div>
                    <div className="h-3.5 w-px bg-white/[0.1] shrink-0" />
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-white/[0.08] flex items-center justify-center text-[#f5f5f7] border border-white/10">
                            <Brain className="w-3.5 h-3.5 text-[#0a84ff]" />
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-[#f5f5f7] font-sans leading-none tracking-tight">Simulasi Asesmen Minat</div>
                            <div className="text-[11px] text-[#98989d] font-medium transition-colors duration-300 mt-0.5">
                                {currentScreen === "analyzing"
                                    ? "Menganalisis matriks psikometri..."
                                    : currentScreen === "result"
                                        ? "Hasil Terverifikasi"
                                        : currentQ.stepLabel}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#2c2c2e] border border-white/10 text-xs font-semibold text-[#f5f5f7] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] " />
                    <span>Demo Interaktif</span>
                </div>
            </div>

            {/* Stage Container (Fixed Height, Overflow Hidden - Clips Screen Slides & Fake Cursor) */}
            <div
                ref={stageRef}
                className="relative w-full h-[470px] sm:h-[480px] overflow-hidden my-auto"
            >
                {/* ===================================================================
                    SCREEN 1: QUESTION SCREEN (Visible immediately on initial render)
                =================================================================== */}
                <div
                    ref={questionScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center space-y-3.5 px-0.5 z-20 pointer-events-auto bg-[#1c1c1e]"
                >
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-medium text-[#98989d]">
                            <span>Progres Evaluasi</span>
                            <span className="text-[#0a84ff] font-bold tabular-nums">
                                {!isOptionSelected ? currentQ.progressLabel : `${currentQ.progressPercent + 7}% Selesai`}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#2c2c2e] rounded-full overflow-hidden border border-white/[0.04]">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-[width] duration-500 ease-out"
                                style={{
                                    width: !isOptionSelected
                                        ? `${currentQ.progressPercent}%`
                                        : `${currentQ.progressPercent + 7}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Question Box (macOS Secondary Surface) */}
                    <div className="p-4 rounded-2xl bg-[#28282a] border border-white/[0.08] space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0a84ff]">
                                {currentQ.scenarioTitle}
                            </span>
                            <span className="text-[11px] text-[#a1a1a6] font-medium font-mono">
                                {currentQ.questionNumber}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-[#f5f5f7] leading-relaxed min-h-[38px]">
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
                                                ? "bg-[#0a84ff]/15 border-2 border-[#0a84ff] text-white shadow-sm ring-2 ring-[#0a84ff]/20"
                                                : "bg-[#323236] border-white/[0.06] text-[#e5e5e7] hover:border-white/15 hover:bg-[#3a3a3e]"
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${isSelected ? "border-[#0a84ff] bg-[#0a84ff]" : "border-[#636366]"
                                                }`}
                                        >
                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
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
                            className={`w-full h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${isOptionSelected
                                    ? isBtnPressed
                                        ? "bg-[#0071e3]/80 text-white scale-[0.98]"
                                        : isBtnHovered
                                            ? "bg-[#0077ed] text-white shadow-lg shadow-[#0071e3]/40 scale-[1.01]"
                                            : "bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/30"
                                    : "bg-[#2c2c2e] border border-white/[0.06] text-[#636366] cursor-not-allowed"
                                }`}
                        >
                            <span>Lihat Hasil Asesmen</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 2: ANALYZING SCREEN (Handled by GSAP)
                =================================================================== */}
                <div
                    ref={analyzingScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center space-y-6 px-4 z-10 pointer-events-none bg-[#1c1c1e]"
                >
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-3 border-[#3a3a3c] border-t-[#0a84ff] animate-spin" />
                        <Brain className="w-7 h-7 text-[#0a84ff] absolute" />
                    </div>

                    <div className="text-center space-y-1">
                        <h4 className="text-sm font-semibold text-[#f5f5f7]">
                            Menganalisis Pola Responsmu...
                        </h4>
                        <p className="text-xs text-[#98989d]">
                            Memetakan orientasi psikometri RIASEC &amp; kompetensi industri.
                        </p>
                    </div>

                    {/* Archetype Bars Filling Up */}
                    <div className="w-full max-w-xs space-y-2.5 bg-[#28282a] p-4 rounded-2xl border border-white/[0.08] shadow-xs">
                        {DEMO_ARCHETYPES.map((arch) => (
                            <div key={arch.label} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-medium text-[#e5e5e7]">
                                    <span>{arch.label}</span>
                                    <span
                                        className="demo-arch-num font-mono tabular-nums text-[#0a84ff] font-bold"
                                        data-target={arch.val}
                                    >
                                        0%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-[#3a3a3c] rounded-full overflow-hidden">
                                    <div
                                        className="demo-arch-bar h-full bg-[#0a84ff] shadow-xs shadow-[#0a84ff]/40 rounded-full w-0"
                                        data-target={`${arch.val}%`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===================================================================
                    SCREEN 3: RESULT SCREEN (Handled by GSAP)
                =================================================================== */}
                <div
                    ref={resultScreenRef}
                    className="absolute inset-0 w-full h-full flex flex-col justify-between py-1 px-0.5 space-y-2 z-10 pointer-events-none bg-[#1c1c1e]"
                >
                    {/* ITEM 1: Profile Top Match & Role Switcher Chips (Stagger Step 1) */}
                    <div className="result-stagger-item space-y-2">
                        <div className="flex items-center justify-between pb-0.5">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-[11px] font-semibold text-[#f5f5f7]">Kecocokan Tertinggi</span>
                                <span className="font-mono text-xs font-bold text-[#0a84ff] tabular-nums">94%</span>
                            </div>
                            <span className="text-[11px] font-mono text-[#98989d] font-medium">
                                Profil Terverifikasi
                            </span>
                        </div>

                        <div className="p-3 rounded-2xl bg-[#28282a] border border-white/[0.08] space-y-2">
                            <div className="text-xs font-bold text-[#f5f5f7]">
                                Kamu adalah <span className="text-[#0a84ff]">The Builder</span>
                            </div>
                            <div className="text-[11px] text-[#98989d] leading-snug">
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
                                            ? "bg-[#0071e3] text-white shadow-sm scale-105 border border-[#0a84ff]"
                                            : "bg-[#323236] border border-white/[0.08] text-[#e5e5e7] hover:border-white/15 hover:bg-[#3a3a3e]"
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
                                            ? "bg-[#0071e3] text-white shadow-sm scale-105 border border-[#0a84ff]"
                                            : "bg-[#323236] border border-white/[0.08] text-[#e5e5e7] hover:border-white/15 hover:bg-[#3a3a3e]"
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
                                            ? "bg-[#0071e3] text-white shadow-sm scale-105 border border-[#0a84ff]"
                                            : "bg-[#323236] border border-white/[0.08] text-[#e5e5e7] hover:border-white/15 hover:bg-[#3a3a3e]"
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

                    {/* ITEM 2: SKILL READINESS Component (Stagger Step 2) */}
                    <div className="result-stagger-item">
                        <SkillReadiness
                            data={roleData}
                            isAnimated={true}
                            triggerAnimation={true}
                        />
                    </div>

                    {/* ITEM 3: Gap Terbesar Callout Row (Stagger Step 3) */}
                    <div
                        className="result-stagger-item p-2 sm:p-2.5 rounded-xl bg-[#0a84ff]/10 border border-[#0a84ff]/25 text-[11px] text-[#f5f5f7] flex items-center gap-2"
                    >
                        <AlertCircle className="w-3.5 h-3.5 text-[#0a84ff] shrink-0" />
                        <span className="truncate">
                            <strong className="text-[#0a84ff] font-semibold">Gap terbesar:</strong>{" "}
                            {roleData.biggestGap}. Roadmap belajarmu mulai dari sini.
                        </span>
                    </div>

                    {/* ITEM 4: Roadmap Ready Notification Card (Stagger Step 4) */}
                    <div
                        ref={roadmapCardRef}
                        className="result-stagger-item p-2.5 sm:p-3 rounded-2xl bg-[#28282a] border border-white/[0.08] shadow-xs flex items-center gap-2.5"
                    >
                        <div className="w-7 h-7 rounded-lg bg-[#0a84ff]/15 text-[#0a84ff] flex items-center justify-center shrink-0 border border-[#0a84ff]/25">
                            <Compass className="w-3.5 h-3.5 text-[#0a84ff]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-[#f5f5f7]">Roadmap belajarmu siap!</div>
                            <div className="text-[11px] text-[#98989d]">
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
                            className="drop-shadow-lg filter drop-shadow-[0_4px_16px_rgba(10,132,255,0.6)]"
                        >
                            <path
                                d="M2.5 1.5L21.5 13.5L12 16L8 25.5L2.5 1.5Z"
                                fill="#0a84ff"
                                stroke="white"
                                strokeWidth="2.2"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span
                            ref={clickPulseRef}
                            className="absolute w-12 h-12 rounded-full bg-[#0a84ff]/30 border-2 border-[#0a84ff] pointer-events-none opacity-0 -left-[19px] -top-[20px]"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Assistant Snapshot Preview (Fixed - never moves) */}
            <div className="mt-auto pt-3 border-t border-white/[0.08] relative z-10 shrink-0">
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#28282a] border border-white/[0.08]">
                    <div className="w-7 h-7 rounded-lg bg-[#0a84ff]/15 text-[#0a84ff] flex items-center justify-center shrink-0 border border-[#0a84ff]/25">
                        <Compass className="w-4 h-4 text-[#0a84ff]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-semibold tracking-wider text-[#0a84ff] uppercase">
                            AI Persona Compass
                        </div>
                        <div className="text-[11px] font-semibold text-[#f5f5f7] truncate transition-colors duration-300">
                            {currentScreen === "result"
                                ? "Hasil siap dieksplorasi"
                                : "Memetakan kepribadian ke karier nyata"}
                        </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#a1a1a6] shrink-0">
                        Ilustrasi &rarr;
                    </span>
                </div>
            </div>
        </div>
    );
}
