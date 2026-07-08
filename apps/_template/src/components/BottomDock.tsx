"use client";

import { Dock, type DockItem } from "@genuina/core/src/ui/Dock";
import { IconDashboard, IconTeam, IconSettings } from "@genuina/core/src/ui/icons";

const ITEMS: DockItem[] = [
  { href: "/", label: "Inicio", Icon: IconDashboard },
  { href: "/equipo", label: "Equipo", Icon: IconTeam },
  { href: "/ajustes", label: "Ajustes", Icon: IconSettings },
];

export function BottomDock({ unreadEquipo = 0 }: { unreadEquipo?: number }) {
  const items = ITEMS.map((it) =>
    it.href === "/equipo" ? { ...it, badge: unreadEquipo } : it
  );
  return <Dock items={items} />;
}
