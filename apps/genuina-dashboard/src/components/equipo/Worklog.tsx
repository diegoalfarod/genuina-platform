"use client";

// Bitácora del agente activo — patrón extraído de Radar (Masluxled). No la usa
// EquipoClient.tsx todavía (el roster está vacío hoy), pero queda lista para
// conectar cuando exista el primer agente real: pásale su feed de notificaciones
// como `messages` y sus mensajes locales como `outcomes`.

import { useEffect, useRef } from "react";
import { relativeTime } from "@/lib/format";

export type WorklogMessage = {
  id: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  createdAt: string;
};
export type Outcome = { id: string; mensaje: string };

function diaLabel(iso: string): string {
  const d = new Date(iso);
  const hoy = new Date();
  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(d, hoy)) return "Hoy";
  if (sameDay(d, ayer)) return "Ayer";
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "long" });
}

export function Worklog({
  agentIcon: AgentIcon,
  messages,
  outcomes,
  working,
  frase,
}: {
  agentIcon: (p: { className?: string }) => React.ReactNode;
  messages: WorklogMessage[];
  outcomes: Outcome[];
  working: boolean;
  frase: string;
}) {
  const vacio = messages.length === 0 && outcomes.length === 0 && !working;
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ block: "end" }));
  }, [messages.length, outcomes.length, working]);

  let ultimoDia = "";

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      <p className="mx-auto w-fit rounded-full bg-surface-2 px-3 py-1 text-center text-[11px] text-subtle">
        Su trabajo aparece aquí en vivo.
      </p>

      {vacio && (
        <div className="pt-10 text-center text-sm text-subtle">
          Cuando el agente haga algo, lo verás aquí.
        </div>
      )}

      {messages.map((m) => {
        const dia = diaLabel(m.createdAt);
        const nuevoDia = dia !== ultimoDia;
        ultimoDia = dia;
        return (
          <div key={m.id} className="space-y-3">
            {nuevoDia && (
              <div className="flex items-center gap-2 py-1">
                <span className="h-px flex-1 bg-hairline" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-subtle">{dia}</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
            )}
            <MessageBubble m={m} Icon={AgentIcon} />
          </div>
        );
      })}

      {outcomes.map((o) => (
        <SimpleBubble key={o.id} mensaje={o.mensaje} Icon={AgentIcon} />
      ))}

      {working && <WorkingBubble frase={frase} Icon={AgentIcon} />}
      <div ref={endRef} />
    </div>
  );
}

function Avatar({ Icon }: { Icon: (p: { className?: string }) => React.ReactNode }) {
  return (
    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-accent-ink">
      <Icon className="h-4 w-4" />
    </span>
  );
}

function MessageBubble({
  m,
  Icon,
}: {
  m: WorklogMessage;
  Icon: (p: { className?: string }) => React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <Avatar Icon={Icon} />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-sm border border-hairline bg-surface-2 p-3">
          <p className="text-sm font-medium text-ink">{m.titulo}</p>
          <p className="mt-0.5 text-xs text-muted">{m.mensaje}</p>
        </div>
        <p className="mt-1 px-1 text-[10px] text-subtle">{relativeTime(m.createdAt)}</p>
      </div>
    </div>
  );
}

function SimpleBubble({
  mensaje,
  Icon,
}: {
  mensaje: string;
  Icon: (p: { className?: string }) => React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <Avatar Icon={Icon} />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-sm border border-hairline bg-surface-2 p-3">
          <p className="text-xs text-muted">{mensaje}</p>
        </div>
      </div>
    </div>
  );
}

function WorkingBubble({
  frase,
  Icon,
}: {
  frase: string;
  Icon: (p: { className?: string }) => React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <Avatar Icon={Icon} />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-sm border border-hairline bg-surface-2 p-3">
          <div className="mb-1.5 flex items-center gap-1">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" style={{ animationDelay: "0.15s" }} />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-accent" style={{ animationDelay: "0.3s" }} />
          </div>
          <p className="text-xs text-muted">{frase}</p>
        </div>
      </div>
    </div>
  );
}
