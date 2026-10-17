"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { LogOut, User, Crown } from "lucide-react";

interface AuthButtonProps {
  variant?: "light" | "dark";
}

interface CustomUser {
  isPro?: boolean;
  tier?: string;
}

export default function AuthButton({ variant = "light" }: AuthButtonProps) {
  const { session, status } = useAuthGuard();
  const isDark = variant === "dark";

  const user = session?.user as CustomUser | undefined;
  const sessionIsPro = Boolean(
    user?.isPro ||
      (user?.tier &&
        user.tier !== "FREE" &&
        user.tier.toLowerCase().includes("pro"))
  );

  const [liveIsPro, setLiveIsPro] = useState<boolean | null>(null);
  const isPro = liveIsPro ?? sessionIsPro;

  useEffect(() => {
    if (!session?.user?.id) return;
    let isMounted = true;
    fetch("/api/user/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && typeof data?.isPro === "boolean") {
          setLiveIsPro(data.isPro);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [session?.user?.id]);

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`${
            isDark ? "bg-slate-800" : "bg-gray-100"
          } animate-pulse h-8 w-24 rounded-full border border-gray-200/50`}
        />
        <div
          className={`${
            isDark ? "bg-slate-800" : "bg-gray-100"
          } animate-pulse h-8 w-18 rounded-full border border-gray-200/50`}
        />
      </div>
    );
  }

  // Kalau User sudah login
  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/results"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold shadow-xs ${
            isDark
              ? "bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-white"
              : "bg-gray-50/90 hover:bg-gray-100 border-gray-200 text-gray-700"
          }`}
          title={session.user.name || "Akun Saya"}
        >
          {session.user.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={session.user.image}
              alt="Profil Pengguna"
              className="w-5 h-5 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              <User className="w-3 h-3" />
            </div>
          )}
          <span className="max-w-[100px] truncate">
            {session.user.name?.split(" ")[0] || "Akun Saya"}
          </span>
          {isPro && (
            <Crown className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
          )}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition-all shadow-xs ${
            isDark
              ? "border-red-900/50 text-red-400 hover:bg-red-950/40"
              : "border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
          }`}
          aria-label="Keluar"
        >
          <LogOut className="w-3.5 h-3.5 text-red-600" />
          <span>Keluar</span>
        </button>
      </div>
    );
  }

  // Kalau User belum login
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold cursor-pointer shadow-xs ${
          isDark
            ? "bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-white"
            : "bg-gray-50/90 hover:bg-gray-100 border-gray-200 text-gray-700"
        }`}
        aria-label="Login"
      >
        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <User className="w-3 h-3" />
        </div>
        <span>Login</span>
      </button>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className={`rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition-all shadow-xs ${
            isDark
              ? "border-red-900/50 text-red-400 hover:bg-red-950/40"
              : "border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
        }`}
        aria-label="Keluar"
      >
        <LogOut className="w-3.5 h-3.5 text-red-600" />
        <span>Keluar</span>
      </button>
    </div>
  );
}
