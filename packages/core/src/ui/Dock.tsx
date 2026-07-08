"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type DockItem = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: number;
};

/** Shell genérico del dock de navegación flotante — los ítems y el slot "extra"
 * (ej. un botón de acción secundaria) los define cada app que lo consume. */
export function Dock({ items, extra }: { items: DockItem[]; extra?: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <nav className="dock pointer-events-auto flex items-center gap-0.5 rounded-2xl p-1.5">
        {items.map(({ href, label, Icon, badge }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
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
                {!!badge && badge > 0 && !active && (
                  <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </span>
              <span className="text-[10.5px] font-semibold leading-none tracking-wide">
                {label}
              </span>
            </Link>
          );
        })}

        {extra && (
          <>
            <span className="mx-1 h-7 w-px bg-hairline/70" />
            {extra}
          </>
        )}
      </nav>
    </div>
  );
}
