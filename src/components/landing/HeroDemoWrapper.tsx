"use client";

import React, { useState, useEffect } from "react";
import HeroDemoStatic from "./HeroDemoStatic";
import HeroDemoAnimation from "./HeroDemoAnimation";

export default function HeroDemoWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Enable dynamic animation after client hydration & idle
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return <HeroDemoStatic />;
  }

  return <HeroDemoAnimation />;
}
