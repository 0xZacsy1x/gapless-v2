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

  // Unified Status Badge System for real evaluation status (Apple HIG Dark Palette)
  const getStatusBadge = (score: number) => {
    if (score >= 70) {
      return {
        text: "Siap",
        className: "bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30",
        icon: <Check className="w-2.5 h-2.5 text-[#30d158] stroke-[2.5]" />,
      };
    }
    if (score >= 40) {
      return {
        text: "Cukup siap",
        className: "bg-[#0a84ff]/15 text-[#0a84ff] border-[#0a84ff]/30",
        icon: <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff] shrink-0" />,
      };
    }
    return {
      text: "Perlu ditingkatkan",
      className: "bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30",
      icon: <span className="w-1.5 h-1.5 rounded-full bg-[#ff9f0a] shrink-0" />,
    };
  };

  const status = getStatusBadge(displayScore > 0 ? displayScore : data.readinessScore);

  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#28282a] border border-white/[0.08] shadow-xs space-y-2.5 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#0a84ff]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f5f5f7]">
            Analisis Kesiapan Skill
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#98989d] font-medium">
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
                className="text-[#3a3a3c]"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Ring with smooth liquid easing */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-[#0a84ff]"
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
              <span className="text-base sm:text-lg font-bold text-[#f5f5f7] leading-none tabular-nums font-mono">
                {displayScore}%
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold text-[#86868b] mt-0.5">
                Readiness
              </span>
            </div>
          </div>
          {/* Status Badge using unified 4px system */}
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
                <span className="font-semibold text-[#e5e5e7] truncate max-w-[115px]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {skill.isPriority && (
                    <span className="px-1.5 py-0.2 rounded-md text-[8.5px] font-mono font-bold uppercase tracking-wider bg-[#ff453a]/20 text-[#ff453a] border border-[#ff453a]/30">
                      Prioritas
                    </span>
                  )}
                  <span className="font-semibold tabular-nums font-mono text-[10px]">
                    <span className="text-[#0a84ff] font-bold">{skill.userLevel}</span>
                    <span className="text-[#86868b]">/{skill.requiredLevel}</span>
                  </span>
                </div>
              </div>
              {/* Dual-Level Bar with smooth transition */}
              <div className="h-1.5 w-full bg-[#3a3a3c] rounded-full overflow-hidden relative">
                {/* Required Level Mark */}
                <div
                  className="absolute top-0 bottom-0 bg-[#48484a] rounded-full"
                  style={{ width: `${skill.requiredLevel}%` }}
                />
                {/* User Current Level */}
                <div
                  className={`relative h-full rounded-full ${
                    skill.isPriority ? "bg-[#0a84ff] shadow-sm shadow-[#0a84ff]/50" : "bg-[#0a84ff]/90"
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
