import type { SVGProps } from "react";

export type Presencia = "trabajando" | "online" | "offline" | "por-sumar";

const SIZES = {
  sm: { box: "h-9 w-9", icon: "h-4.5 w-4.5", dot: "h-3 w-3", rounded: "rounded-lg" },
  md: { box: "h-11 w-11", icon: "h-5 w-5", dot: "h-3.5 w-3.5", rounded: "rounded-xl" },
  lg: { box: "h-14 w-14", icon: "h-7 w-7", dot: "h-4 w-4", rounded: "rounded-2xl" },
} as const;

export function PresenceAvatar({
  Icon,
  presencia,
  size = "md",
}: {
  Icon: (p: SVGProps<SVGSVGElement>) => React.ReactNode;
  presencia: Presencia;
  size?: keyof typeof SIZES;
}) {
  const s = SIZES[size];
  const activo = presencia !== "por-sumar";
  const ring =
    presencia === "trabajando"
      ? "presence-work"
      : presencia === "online"
        ? "presence-breathe"
        : "";
  const dot =
    presencia === "trabajando"
      ? "bg-amber-400"
      : presencia === "online"
        ? "bg-emerald-500"
        : "bg-slate-400";

  return (
    <span
      className={`relative flex ${s.box} shrink-0 items-center justify-center ${s.rounded} ${ring} ${
        activo
          ? "bg-gradient-to-br from-accent to-accent-2 text-accent-ink"
          : "border border-hairline bg-surface-2 text-subtle"
      }`}
    >
      <Icon className={s.icon} />
      <span
        className={`absolute -bottom-0.5 -right-0.5 ${s.dot} rounded-full border-2 border-surface-solid ${dot}`}
      />
    </span>
  );
}
