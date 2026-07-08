"use client";

import { useTransition } from "react";

export function ToggleSwitch({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => Promise<void>;
  label?: string;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={pending}
      onClick={() => start(onToggle)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-60 ${
        checked ? "bg-emerald-500" : "bg-slate-300 dark:bg-white/15"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
