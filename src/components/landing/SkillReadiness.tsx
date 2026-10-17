"use client";

import React, { useEffect, useState, useRef } from "react";
import { CareerRoleData } from "@/constants/assessmentDemoData";
import { TrendingUp } from "lucide-react";

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
    const duration = start === 0 ? 1000 : 650; // 1000ms initial entrance, 650ms chip switch
    const startTime = performance.now();

    let animationFrameId: number;

    const updateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart: velvety smooth deceleration
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

  // Status helper based on rules: <40% Perlu dikembangkan, 40-69% Cukup siap, >=70% Siap
  const getStatusBadge = (score: number) => {
    if (score >= 70) {
      return {
        text: "Siap",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }
    if (score >= 40) {
      return {
        text: "Cukup siap",
        className: "bg-blue-50 text-brand-primary border-blue-200",
      };
    }
    return {
      text: "Perlu dikembangkan",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    };
  };

  const status = getStatusBadge(displayScore > 0 ? displayScore : data.readinessScore);

  return (
    <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2.5 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-brand-primary" />
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-900">
            Analisis Kesiapan Skill
          </span>
        </div>
        <span className="text-[10px] font-bold text-gray-400">
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
                className="text-gray-100"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress Ring with smooth liquid easing */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-brand-primary"
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
              <span className="text-base sm:text-lg font-black text-gray-900 leading-none tabular-nums">
                {displayScore}%
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold text-gray-400 mt-0.5">
                Readiness
              </span>
            </div>
          </div>
          <span
            className={`mt-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold border transition-all duration-300 ${status.className}`}
          >
            {status.text}
          </span>
        </div>

        {/* Right: 3 Mini Skill Gap Bars */}
        <div className="col-span-8 space-y-1.5">
          {data.skills.map((skill) => (
            <div key={skill.name} className="space-y-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-gray-700 truncate max-w-[115px]">
                  {skill.name}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  {skill.isPriority && (
                    <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200">
                      Prioritas
                    </span>
                  )}
                  <span className="font-semibold text-gray-500 tabular-nums text-[10px]">
                    <span className="text-brand-primary font-bold">{skill.userLevel}</span>
                    <span className="text-gray-400">/{skill.requiredLevel}</span>
                  </span>
                </div>
              </div>
              {/* Dual-Level Bar with smooth transition */}
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                {/* Required Level Mark */}
                <div
                  className="absolute top-0 bottom-0 bg-gray-300 rounded-full"
                  style={{ width: `${skill.requiredLevel}%` }}
                />
                {/* User Current Level */}
                <div
                  className={`relative h-full rounded-full ${
                    skill.isPriority ? "bg-brand-primary" : "bg-brand-primary/85"
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
