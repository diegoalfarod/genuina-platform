"use client";

import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/app/login/actions";
import { IconLogout } from "@genuina/core/src/ui/icons";

export function UserMenu({ nombre, rol }: { nombre: string; rol: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const iniciales = nombre.trim().slice(0, 1).toUpperCase();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition hover:bg-surface-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-accent-ink">
          {iniciales}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-xs font-semibold leading-tight text-ink">
            {nombre}
          </span>
          <span className="block text-[10px] leading-tight text-subtle">
            {rol === "ADMIN" ? "Administrador" : "Asesor"}
          </span>
        </span>
      </button>

      {open && (
        <div className="glass-strong absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl p-1.5">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-ink">{nombre}</p>
            <p className="text-xs text-subtle">
              {rol === "ADMIN" ? "Administrador" : "Asesor"}
            </p>
          </div>
          <div className="my-1 h-px bg-hairline" />
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-muted transition hover:bg-surface-2 hover:text-ink">
              <IconLogout className="h-4 w-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
