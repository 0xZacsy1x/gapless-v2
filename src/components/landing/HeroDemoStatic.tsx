import React from "react";
import { Brain, Sparkles, ChevronRight } from "lucide-react";

export default function HeroDemoStatic() {
  return (
    <div 
      className="w-full max-w-[440px] xl:max-w-[480px] h-[620px] mx-auto rounded-[32px] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none [contain:layout]"
      aria-label="Contoh simulasi asesmen minat karier"
    >
      {/* Decorative Brand Gradient Accent */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-brand-primary/5 blur-2xl rounded-full pointer-events-none" />

      {/* Top Meta Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 relative z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Simulasi Asesmen Minat</div>
            <div className="text-[10px] text-gray-400 font-medium">Langkah 3 dari 15</div>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
          Contoh tampilan
        </span>
      </div>

      {/* Middle Area */}
      <div className="my-auto space-y-3.5 relative z-10 w-full">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-gray-400">
            <span>Progres Evaluasi</span>
            <span className="text-brand-primary font-bold">20% Selesai</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-1/5 bg-brand-primary rounded-full" />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-4 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Kasus Situasional
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">
              03/15
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed min-h-[38px]">
            Saat memulai proyek baru dalam tim, bagian mana yang paling menarik perhatianmu terlebih dahulu?
          </p>

          {/* Option Choices */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border-2 border-brand-primary shadow-xs">
              <div className="w-4 h-4 rounded-full border-2 border-brand-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
              </div>
              <span className="text-xs font-semibold text-gray-900">
                Membedah struktur logika dan arsitektur sistem
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              <span className="text-xs font-medium text-gray-600">
                Merancang tampilan visual dan alur interaksi pengguna
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/80 text-gray-600">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
              <span className="text-xs font-medium text-gray-600">
                Menghubungkan kolaborasi tim dan strategi komunikasi
              </span>
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
              Memetakan kepribadian ke karier nyata
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
