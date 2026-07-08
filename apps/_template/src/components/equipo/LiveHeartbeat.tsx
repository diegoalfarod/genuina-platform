"use client";

import { inTime } from "@/lib/format";
import { useNow, elapsed } from "./useNow";
import { proximaRevision, type PresenciaAgente } from "./estado";
import type { AgentSnapshot } from "@genuina/core/src/agentPresence/agentPresence";

// Franja de estado SIEMPRE visible que narra qué está pasando ahora — el "latido" de la sala.
export function LiveHeartbeat({
  presencia,
  workStartedAt,
  trabajandoMision,
  frase,
  snapshot,
}: {
  presencia: PresenciaAgente;
  workStartedAt: number | null;
  trabajandoMision: string | null;
  frase: string;
  snapshot: AgentSnapshot;
}) {
  const now = useNow(1000);

  if (presencia === "sin-agentes") {
    return (
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">Aún no tienes agentes activos.</span>{" "}
          Súmalos desde &quot;Agregar herramientas&quot;.
        </p>
      </div>
    );
  }

  if (presencia === "trabajando") {
    return (
      <div className="mx-4 mt-3 overflow-hidden rounded-xl border border-accent/30 bg-accent/8 p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="typing-dot h-2 w-2 rounded-full bg-accent" />
            <span className="typing-dot h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "0.15s" }} />
            <span className="typing-dot h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "0.3s" }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">
              Trabajando{trabajandoMision ? ` · ${trabajandoMision}` : ""}
            </p>
            <p className="truncate text-xs text-muted">{frase}</p>
          </div>
          {workStartedAt != null && (
            <span className="shrink-0 rounded-lg border border-accent/30 bg-surface-solid/60 px-2 py-1 font-mono text-xs font-semibold text-amber-700 dark:text-accent">
              {elapsed(workStartedAt, now)}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (presencia === "online") {
    const prox = proximaRevision(snapshot.misiones, now);
    return (
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3">
        <span className="presence-breathe h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
        <p className="text-sm text-ink">
          <span className="font-semibold">Atento y en línea.</span>{" "}
          <span className="text-muted">
            {prox ? `Próxima revisión automática ${inTime(new Date(prox))}.` : "Sin misiones activas."}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-4 mt-3 flex items-center gap-3 rounded-xl border border-hairline bg-surface-2 p-3">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
      <p className="text-sm text-muted">
        <span className="font-semibold text-ink">Descansando.</span> Actívalo para que empiece a trabajar.
      </p>
    </div>
  );
}
