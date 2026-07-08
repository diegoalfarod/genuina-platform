"use client";

// Perfil del agente activo — patrón extraído de Radar (Masluxled), generalizado
// (sin la sección "Últimos leads", específica del CRM). No la usa EquipoClient.tsx
// todavía (roster vacío hoy); queda lista para conectar con el primer agente real.

import { ToggleSwitch } from "../ToggleSwitch";
import { inTime } from "@/lib/format";
import type { AgentSnapshot } from "@/lib/agentPresence";

export function AgentProfile({
  snapshot,
  onToggleMision,
}: {
  snapshot: AgentSnapshot;
  onToggleMision: (id: string) => () => Promise<void>;
}) {
  const misionesActivas = snapshot.misiones.filter((m) => m.activa).length;

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-4">
      {/* Rendimiento */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Rendimiento</p>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Hoy" value={snapshot.hoy} />
          <Stat label="Esta semana" value={snapshot.estaSemana} />
          <Stat label="Total" value={snapshot.totalEncontrados} />
        </div>
        <Sparkline serie={snapshot.serie7d} />
      </section>

      {/* Especialidades / misiones */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Especialidades</p>
          <span className="text-[11px] text-subtle">{misionesActivas}/{snapshot.misiones.length} activas</span>
        </div>
        <div className="space-y-2">
          {snapshot.misiones.length === 0 && (
            <p className="text-xs text-subtle">Sin especialidades configuradas todavía.</p>
          )}
          {snapshot.misiones.map((m) => {
            const disponible =
              !m.proximaDisponible || new Date(m.proximaDisponible).getTime() <= Date.now();
            return (
              <div
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-2 p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span>{m.icono}</span>
                    <p className="truncate text-sm font-medium text-ink">{m.nombre}</p>
                  </div>
                  {m.activa && (
                    <p className="text-[11px] text-subtle">
                      {disponible ? "✅ Disponible ahora" : `⏳ Disponible ${inTime(m.proximaDisponible)}`}
                    </p>
                  )}
                </div>
                <ToggleSwitch checked={m.activa} onToggle={onToggleMision(m.id)} label={m.nombre} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-hairline bg-surface-2 p-3 text-center">
      <p className="font-display text-lg font-semibold text-ink">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-subtle">{label}</p>
    </div>
  );
}

function Sparkline({ serie }: { serie: number[] }) {
  const max = Math.max(1, ...serie);
  const dias = ["L", "M", "M", "J", "V", "S", "D"]; // etiqueta genérica; el último es hoy
  return (
    <div className="mt-2 rounded-xl border border-hairline bg-surface-2 p-3">
      <p className="mb-2 text-[10px] uppercase tracking-wide text-subtle">Últimos 7 días</p>
      <div className="flex items-end gap-1.5" style={{ height: 44 }}>
        {serie.map((v, i) => {
          const hoy = i === serie.length - 1;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <span
                  className={`w-full rounded-t-sm ${hoy ? "bg-accent/60" : "bg-muted/25"}`}
                  style={{ height: `${Math.max(6, (v / max) * 100)}%` }}
                  title={`${v}`}
                />
              </div>
              <span className="text-[9px] text-subtle">{dias[i] ?? ""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
