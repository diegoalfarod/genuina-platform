"use client";

// Tool picker del espacio Genuina: el botón "Agregar" del dock abre este panel
// lateral (drawer glassy desde la derecha). Hoy ningún módulo está activo — son
// vistas previas bloqueadas con un mini-mockup de cómo se verá cada uno, para que
// el usuario perciba hacia dónde crece la plataforma AI-first (roadmap real de
// Genuina: Inbox/Pay/Loop/Studio/Sync — ver documento de visión del producto).

import { useEffect } from "react";
import { IconLock } from "@genuina/core/src/ui/icons";

type Tool = {
  id: string;
  nombre: string;
  desc: string;
  activa?: boolean;
  Mock: () => React.ReactNode;
};

const TOOLS: Tool[] = [
  {
    id: "pagos",
    nombre: "Pagos y facturación",
    desc: "Un agente acompaña la compra, envía el link de pago y confirma la transacción.",
    Mock: MockPagos,
  },
  {
    id: "atencion",
    nombre: "Atención al cliente",
    desc: "Responde a tus clientes 24/7 con el contexto real de tu negocio.",
    Mock: MockAtencion,
  },
  {
    id: "cotizador",
    nombre: "Cotizador inteligente",
    desc: "Arma cotizaciones desde tu catálogo de productos.",
    Mock: MockCotizador,
  },
  {
    id: "campanas",
    nombre: "Campañas",
    desc: "Secuencias de WhatsApp y correo que el agente redacta y programa por ti.",
    Mock: MockCampanas,
  },
  {
    id: "reportes",
    nombre: "Reportes ejecutivos",
    desc: "Resúmenes semanales de tu operación, escritos por IA.",
    Mock: MockReportes,
  },
];

export function ToolPicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Cerrar con Escape y congelar el scroll de fondo mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        style={{ animation: "fade-in 0.2s ease both" }}
        onClick={onClose}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Agregar herramientas"
        className="glass-strong slide-in-right absolute inset-y-0 right-0 flex w-full max-w-[400px] flex-col overflow-hidden border-l border-hairline"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-hairline p-5 pb-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-subtle">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Genuina · AI Workforce
            </span>
            <h2 className="font-display mt-2 text-lg font-semibold text-ink">
              Agrega herramientas a tu espacio
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Cada módulo llega con un agente de IA que trabaja contigo.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-lg p-1.5 text-subtle transition hover:bg-surface-2 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Lista de herramientas con mini-mockup */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {TOOLS.map((t, i) => (
            <ToolCard key={t.id} tool={t} delayMs={i * 55} />
          ))}
        </div>

        {/* Aviso "en construcción" con barrido de luz */}
        <div className="border-t border-hairline p-4">
          <div className="relative overflow-hidden rounded-xl border border-dashed border-accent/35 bg-accent/8 p-3.5">
            <span className="shimmer-sweep pointer-events-none" aria-hidden />
            <div className="flex items-center gap-3">
              <span className="float-y flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-amber-700 dark:text-accent">
                <IconLock className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">
                  Genuina está construyendo más agentes
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">
                  Te avisaremos aquí cuando estén listos para unirse a tu equipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ToolCard({ tool, delayMs }: { tool: Tool; delayMs: number }) {
  const { nombre, desc, activa, Mock } = tool;
  return (
    <div
      aria-disabled={!activa}
      className={`overflow-hidden rounded-2xl border transition ${
        activa
          ? "border-accent/30 bg-accent/8"
          : "border-hairline bg-surface-2"
      }`}
      style={{ animation: "fade-in-up 0.4s ease both", animationDelay: `${delayMs}ms` }}
    >
      {/* Mockup / frame de vista previa */}
      <div className="relative border-b border-hairline p-3">
        <div className={activa ? "" : "opacity-55 grayscale-[35%]"}>
          <MockFrame>
            <Mock />
          </MockFrame>
        </div>
        {!activa && (
          <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-surface-solid/80 text-subtle shadow-sm backdrop-blur">
            <IconLock className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3 p-3 pt-2.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{nombre}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-muted">{desc}</p>
        </div>
        {activa ? (
          <span className="mt-0.5 shrink-0 rounded-full border border-emerald-500/25 bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
            ✓ Activo
          </span>
        ) : (
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-hairline bg-surface px-2 py-0.5 text-[10px] font-semibold text-subtle">
            Próximamente
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Mini-mockups: marcos de vista previa con el estilo glassy de Genuina.
   Construidos con esqueletos (barras/formas) para insinuar cada módulo sin
   pesar como una imagen real.
--------------------------------------------------------------------------- */

function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-hairline bg-surface">
      <div className="flex items-center gap-1 border-b border-hairline px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/40" />
      </div>
      <div className="h-[92px] p-2.5">{children}</div>
    </div>
  );
}

function Bar({ w, tone = "muted" }: { w: string; tone?: "muted" | "accent" | "faint" }) {
  const bg =
    tone === "accent" ? "bg-accent/45" : tone === "faint" ? "bg-muted/15" : "bg-muted/25";
  return <span className={`block h-1.5 rounded-full ${bg}`} style={{ width: w }} />;
}

function MockPagos() {
  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="rounded-lg border border-hairline bg-surface-2 p-2">
        <div className="flex items-center justify-between">
          <Bar w="30%" tone="faint" />
          <Bar w="22%" tone="accent" />
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="h-3 w-4 rounded-[3px] bg-accent/40" />
          <Bar w="45%" />
        </div>
      </div>
      <div className="mt-auto flex h-4 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-2">
        <span className="h-1.5 w-12 rounded-full bg-accent-ink/50" />
      </div>
    </div>
  );
}

function MockAtencion() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <div className="max-w-[70%] space-y-1 self-start rounded-lg rounded-tl-sm border border-hairline bg-surface-2 p-1.5">
        <Bar w="90%" />
        <Bar w="55%" tone="faint" />
      </div>
      <div className="max-w-[70%] space-y-1 self-end rounded-lg rounded-tr-sm bg-accent/20 p-1.5">
        <Bar w="80%" tone="accent" />
      </div>
      <div className="max-w-[55%] space-y-1 self-start rounded-lg rounded-tl-sm border border-hairline bg-surface-2 p-1.5">
        <Bar w="70%" />
      </div>
    </div>
  );
}

function MockCotizador() {
  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Bar w="40%" tone="accent" />
        <Bar w="18%" tone="faint" />
      </div>
      {[68, 82, 54].map((w, i) => (
        <div key={i} className="flex items-center justify-between gap-2">
          <Bar w={`${w}%`} />
          <span className="h-1.5 w-8 shrink-0 rounded-full bg-muted/25" />
        </div>
      ))}
      <div className="mt-auto flex items-center justify-between border-t border-hairline pt-1.5">
        <Bar w="24%" tone="faint" />
        <span className="h-2 w-12 rounded-full bg-accent/45" />
      </div>
    </div>
  );
}

function MockCampanas() {
  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="space-y-1 rounded-lg border border-hairline bg-surface-2 p-2">
        <Bar w="85%" />
        <Bar w="60%" tone="faint" />
      </div>
      <div className="mt-auto flex items-center gap-1.5">
        <span className="rounded-full bg-accent/20 px-1.5 py-0.5">
          <span className="block h-1.5 w-6 rounded-full bg-accent/50" />
        </span>
        <span className="rounded-full bg-surface-2 px-1.5 py-0.5">
          <span className="block h-1.5 w-8 rounded-full bg-muted/30" />
        </span>
        <span className="rounded-full bg-surface-2 px-1.5 py-0.5">
          <span className="block h-1.5 w-5 rounded-full bg-muted/30" />
        </span>
      </div>
    </div>
  );
}

function MockReportes() {
  const bars = [40, 68, 52, 88, 72];
  return (
    <div className="flex h-full flex-col gap-1.5">
      <Bar w="35%" tone="faint" />
      <div className="mt-auto flex items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm ${i === 3 ? "bg-accent/55" : "bg-muted/25"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="h-px w-full bg-hairline" />
    </div>
  );
}
