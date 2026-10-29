"use client";

import React, { useEffect, useState, useRef } from "react";
import { CareerRoleData } from "@/constants/assessmentDemoData";
import { TrendingUp, Check } from "lucide-react";

interface SkillReadinessProps {
  data: CareerRoleData;
  isAnimated?: boolean;
  triggerAnimation?: boolean;
}

export default function SkillReadiness({
  data,
  isAnimated = true,
  triggerAnimation = true,
}: SkillReadinessProps) {
  const [displayScore, setDisplayScore] = useState<number>(0);
  const prevScoreRef = useRef<number>(0);

  // Smooth Count-up animation for score with quartic deceleration
  useEffect(() => {
    if (!isAnimated || !triggerAnimation) {
      const frame = requestAnimationFrame(() => {
        if (!triggerAnimation) {
          setDisplayScore(0);
          prevScoreRef.current = 0;
        } else {
          setDisplayScore(data.readinessScore);
          prevScoreRef.current = data.readinessScore;
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    const start = prevScoreRef.current;
    const end = data.readinessScore;
    const duration = start === 0 ? 1000 : 650;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.round(start + (end - start) * easeProgress);

      setDisplayScore(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateScore);
      } else {
        prevScoreRef.current = end;
      }
    };

    animationFrameId = requestAnimationFrame(updateScore);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [data.readinessScore, isAnimated, triggerAnimation]);

  // SVG Ring calculation
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * displayScore) / 100;

  // Unified Status Badge System for real evaluation status (Light Theme)
  const getStatusBadge = (score: number) => {
    if (score >= 70) {
      return {
        text: "Siap",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />,
      };
    }
    if (score >= 40) {
      return {
        text: "Cukup siap",
        className: "bg-blue-50 text-[#0066FF] border-blue-200",
        icon: <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />,
      };
    }
    return {
      text: "Perlu ditingkatkan",
      className: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />,
    };
  };

  const status = getStatusBadge(displayScore > 0 ? displayScore : data.readinessScore);

  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-3xs space-y-2.5 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#0066FF]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-900">
            Analisis Kesiapan Skill
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 font-medium">
          Target: {data.role}
        </span>
      </div>

      {/* Donut Score & Mini Skill Comparison Bars */}
      <div className="grid grid-cols-12 gap-3 items-center">
        {/* Left: Donut Chart */}
        <div className="col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 80 80">
              {/* Background Ring */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-slate-200"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Ring with smooth liquid easing */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-[#0066FF]"
                style={{
                  transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={triggerAnimation ? strokeDashoffset : circumference}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-base sm:text-lg font-bold text-slate-900 leading-none tabular-nums font-mono">
                {displayScore}%
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold text-slate-500 mt-0.5">
                Readiness
              </span>
            </div>
          </div>
          {/* Status Badge */}
          <span
            className={`mt-1.5 px-2 py-0.5 rounded-md text-[9.5px] font-semibold border inline-flex items-center gap-1 transition-all duration-300 ${status.className}`}
          >
            {status.icon}
            <span>{status.text}</span>
          </span>
        </div>

        {/* Right: 3 Mini Skill Gap Bars */}
        <div className="col-span-8 space-y-1.5">
          {data.skills.map((skill) => (
            <div key={skill.name} className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-800 truncate max-w-[115px]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {skill.isPriority && (
                    <span className="px-1.5 py-0.2 rounded-md text-[8.5px] font-mono font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                      Prioritas
                    </span>
                  )}
                  <span className="font-semibold tabular-nums font-mono text-[10px]">
                    <span className="text-[#0066FF] font-bold">{skill.userLevel}</span>
                    <span className="text-slate-400">/{skill.requiredLevel}</span>
                  </span>
                </div>
              </div>
              {/* Dual-Level Bar */}
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative">
                {/* Required Level Mark */}
                <div
                  className="absolute top-0 bottom-0 bg-slate-300 rounded-full"
                  style={{ width: `${skill.requiredLevel}%` }}
                />
                {/* User Current Level */}
                <div
                  className={`relative h-full rounded-full ${
                    skill.isPriority ? "bg-[#0066FF]" : "bg-[#0066FF]/90"
                  }`}
                  style={{
                    width: triggerAnimation ? `${skill.userLevel}%` : "0%",
                    transition: "width 850ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
