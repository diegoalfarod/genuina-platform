"use client";

// Tab "Equipo" — sala de operaciones del equipo de agentes. Patrón extraído de Radar
// (Masluxled): roster con presencia (izquierda) + panel de "latido en vivo" (derecha).
// Simplificado a propósito para el estado de hoy: el roster SIEMPRE está vacío en esta
// plantilla ("aún no tienes agentes activos"), así que este componente solo orquesta
// el roster + el latido en modo "sin-agentes" — nada de búsqueda/conversación/perfil
// en vivo (eso requiere un agente real conectado). Cuando exista el primer agente de
// Genuina (ver src/components/equipo/agents.ts → ACTIVO), esta pantalla se amplía para
// mostrar su header, sus tabs Conversación/Perfil (Worklog.tsx/AgentProfile.tsx, ya
// listos en este mismo directorio) y las acciones reales de activar/pausar/trabajar.

import { useState } from "react";
import { getAgentSnapshot } from "@genuina/core/src/agentPresence/agentPresence";
import { ToolPicker } from "./ToolPicker";
import { TeamRoster } from "./equipo/TeamRoster";
import { LiveHeartbeat } from "./equipo/LiveHeartbeat";

export function EquipoClient({
  snapshot,
}: {
  snapshot: Awaited<ReturnType<typeof getAgentSnapshot>>;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <ToolPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />

      <div className="mx-auto flex h-[calc(100dvh-12.5rem)] min-h-[480px] max-w-5xl overflow-hidden rounded-2xl glass-strong">
        <TeamRoster
          presencia="sin-agentes"
          workStartedAt={null}
          trabajandoMision={null}
          snapshot={snapshot}
          onOpenPicker={() => setPickerOpen(true)}
        />

        <section className="flex min-w-0 flex-1 flex-col">
          <LiveHeartbeat
            presencia="sin-agentes"
            workStartedAt={null}
            trabajandoMision={null}
            frase=""
            snapshot={snapshot}
          />

          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Aún no tienes agentes activos
            </p>
            <p className="max-w-sm text-sm text-muted">
              Cuando sumes tu primer agente de IA, esta pantalla se convierte en su sala
              de operación: qué está haciendo ahora, su bitácora y su rendimiento.
            </p>
            <button onClick={() => setPickerOpen(true)} className="btn btn-primary mt-2">
              Ver herramientas disponibles
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
