"use client";

import { inTime } from "@/lib/format";
import { IconPlus } from "@genuina/core/src/ui/icons";
import { PresenceAvatar } from "./PresenceAvatar";
import { useNow, elapsed } from "./useNow";
import { proximaRevision, type PresenciaAgente } from "./estado";
import { ACTIVO, POR_SUMAR } from "./agents";
import type { AgentSnapshot } from "@genuina/core/src/agentPresence/agentPresence";

export function TeamRoster({
  presencia,
  workStartedAt,
  trabajandoMision,
  snapshot,
  onOpenPicker,
}: {
  presencia: PresenciaAgente;
  workStartedAt: number | null;
  trabajandoMision: string | null;
  snapshot: AgentSnapshot;
  onOpenPicker: () => void;
}) {
  const now = useNow(1000);
  const prox = proximaRevision(snapshot.misiones, now);

  const estadoLinea =
    presencia === "trabajando"
      ? `🔍 Trabajando${trabajandoMision ? ` · ${trabajandoMision}` : ""}${workStartedAt != null ? ` · ${elapsed(workStartedAt, now)}` : ""}`
      : presencia === "online"
        ? `🟢 En línea${prox ? ` · revisa ${inTime(new Date(prox))}` : ""}`
        : presencia === "sin-agentes"
          ? "😴 Sin agentes"
          : "😴 Descansando";

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline md:flex">
      <div className="flex items-center justify-between gap-2 border-b border-hairline p-4">
        <div>
          <p className="font-display text-sm font-semibold text-ink">Tu equipo</p>
          <p className="text-[11px] text-subtle">
            {ACTIVO ? "1 activo" : "0 activos"} · {snapshot.hoy} hoy
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-subtle">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-rose-500" />
          En vivo
        </span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {ACTIVO && (
          <div className="flex items-center gap-2.5 rounded-xl bg-accent/10 p-2 ring-1 ring-accent/20">
            <PresenceAvatar Icon={ACTIVO.Icon} presencia={presencia === "sin-agentes" ? "offline" : presencia} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-ink">{ACTIVO.nombre}</p>
                <span className="rounded-full bg-surface-2 px-1.5 text-[9px] font-medium text-subtle">
                  {ACTIVO.rol}
                </span>
              </div>
              <p className="truncate text-[11px] text-muted">{estadoLinea}</p>
            </div>
          </div>
        )}

        {!ACTIVO && (
          <p className="px-2 py-3 text-center text-xs text-subtle">
            Aún no tienes agentes activos.
          </p>
        )}

        {POR_SUMAR.length > 0 && (
          <p className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-subtle">
            Por sumar a tu equipo
          </p>
        )}
        {POR_SUMAR.map((a) => (
          <button
            key={a.id}
            onClick={onOpenPicker}
            className="flex w-full items-center gap-2.5 rounded-xl p-2 text-left opacity-70 transition hover:bg-surface-2 hover:opacity-100"
          >
            <PresenceAvatar Icon={a.Icon} presencia="por-sumar" size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{a.nombre}</p>
              <p className="truncate text-[11px] text-subtle">{a.rol}</p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onOpenPicker}
        className="m-2 flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-hairline p-2.5 text-xs font-medium text-muted transition hover:border-accent/40 hover:text-ink"
      >
        <IconPlus className="h-3.5 w-3.5" />
        Sumar un agente
      </button>
    </aside>
  );
}
