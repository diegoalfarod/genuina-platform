"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@genuina/core/src/ui/icons";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") ??
      "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("genuina-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
