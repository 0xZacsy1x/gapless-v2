"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdaptiveCtaButton() {
    const [mounted, setMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasResult, setHasResult] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setMounted(true);
            const token = localStorage.getItem("gapless_session");
            const archetype = localStorage.getItem("userArchetype");
            setIsLoggedIn(!!token);
            setHasResult(!!archetype);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    const baseClass = "inline-flex items-center justify-center rounded-full px-9 md:px-11 bg-brand-primary hover:bg-brand-primary/90 text-white h-13 md:h-14 text-base font-bold transition-transform hover:scale-[1.02] border-none shadow-lg shadow-brand-primary/20 cursor-pointer";

    if (!mounted) {
        return (
            <Link href="/assessment" className={baseClass}>
                Mulai Tes Gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        );
    }

    if (isLoggedIn && hasResult) {
        return (
            <Link href="/roadmap" className={baseClass}>
                Lanjut ke Roadmap Belajar <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        );
    }

    if (isLoggedIn && !hasResult) {
        return (
            <Link href="/assessment" className={baseClass}>
                Mulai Tes <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        );
    }

    return (
        <Link href="/assessment" className={baseClass}>
            Mulai Tes Gratis <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
    );
}
