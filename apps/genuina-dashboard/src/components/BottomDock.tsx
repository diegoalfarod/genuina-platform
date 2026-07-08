"use client";

import { useState } from "react";
import { Dock, type DockItem } from "@genuina/core/src/ui/Dock";
import {
  IconDashboard,
  IconTarget,
  IconTeam,
  IconSettings,
  IconPlus,
} from "@genuina/core/src/ui/icons";
import { ToolPicker } from "./ToolPicker";

const ITEMS: DockItem[] = [
  { href: "/", label: "Inicio", Icon: IconDashboard },
  { href: "/leads", label: "Leads", Icon: IconTarget },
  { href: "/equipo", label: "Equipo", Icon: IconTeam },
  { href: "/ajustes", label: "Ajustes", Icon: IconSettings },
];

export function BottomDock({ unreadEquipo = 0 }: { unreadEquipo?: number }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const items = ITEMS.map((it) =>
    it.href === "/equipo" ? { ...it, badge: unreadEquipo } : it
  );

  return (
    <>
      <ToolPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
      <Dock
        items={items}
        extra={
          // Agregar herramientas: acción secundaria, deliberadamente apagada
          // para que no compita con la navegación principal.
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
        }
      />
    </>
  );
}
