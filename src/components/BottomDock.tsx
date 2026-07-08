"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconTeam,
  IconSettings,
  IconPlus,
} from "./icons";
import { ToolPicker } from "./ToolPicker";

const ITEMS = [
  { href: "/", label: "Inicio", Icon: IconDashboard },
  { href: "/equipo", label: "Equipo", Icon: IconTeam },
  { href: "/ajustes", label: "Ajustes", Icon: IconSettings },
] as const;

export function BottomDock({ unreadEquipo = 0 }: { unreadEquipo?: number }) {
  const pathname = usePathname();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <ToolPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <nav className="dock pointer-events-auto flex items-center gap-0.5 rounded-2xl p-1.5">
          {ITEMS.map(({ href, label, Icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            const badge = href === "/equipo" && unreadEquipo > 0 && !active;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`group relative flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
                  active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-xl bg-accent/12 ring-1 ring-accent/25" />
                )}
                <span className="relative">
                  <Icon
                    className={`h-[22px] w-[22px] transition-transform ${
                      active ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  {badge && (
                    <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                      {unreadEquipo > 9 ? "9+" : unreadEquipo}
                    </span>
                  )}
                </span>
                <span className="text-[10.5px] font-semibold leading-none tracking-wide">
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Separador sutil antes del botón de agregar */}
          <span className="mx-1 h-7 w-px bg-hairline/70" />

          {/* Agregar herramientas: acción secundaria, deliberadamente apagada
              para que no compita con la navegación principal. */}
          <button
            onClick={() => setPickerOpen((v) => !v)}
            aria-label="Agregar herramientas"
            aria-expanded={pickerOpen}
            title="Agregar herramientas"
            className={`group flex items-center justify-center rounded-xl px-2 py-2 transition ${
              pickerOpen ? "text-accent" : "text-subtle hover:text-muted"
            }`}
          >
            <span
              className={`flex h-[22px] w-[22px] items-center justify-center rounded-lg border border-dashed transition ${
                pickerOpen
                  ? "border-accent/50 bg-accent/10"
                  : "border-hairline group-hover:border-muted/40"
              }`}
            >
              <IconPlus
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  pickerOpen ? "rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
