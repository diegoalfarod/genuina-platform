"use client";

import { useEffect, useState } from "react";

/** Reloj que tickea para animar cronómetros y tiempos relativos en vivo. */
export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

/** mm:ss desde un timestamp (para el cronómetro de "trabajando"). */
export function elapsed(fromMs: number, nowMs: number): string {
  const s = Math.max(0, Math.floor((nowMs - fromMs) / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
