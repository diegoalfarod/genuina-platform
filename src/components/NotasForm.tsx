"use client";

import { useState, useTransition } from "react";
import { updateLeadNotasAction } from "@/app/(app)/leads/actions";

export function NotasForm({
  leadId,
  notasIniciales,
}: {
  leadId: string;
  notasIniciales: string;
}) {
  const [notas, setNotas] = useState(notasIniciales);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(false);
    start(async () => {
      await updateLeadNotasAction(leadId, notas);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="space-y-2">
      <textarea
        value={notas}
        onChange={(e) => setNotas(e.target.value)}
        placeholder="Notas de seguimiento…"
        rows={3}
        className="input"
      />
      <div className="flex items-center gap-2">
        <button onClick={save} disabled={pending} className="btn btn-ghost text-xs">
          {pending ? "Guardando…" : "Guardar notas"}
        </button>
        {saved && <span className="text-xs text-emerald-600 dark:text-emerald-300">✅ Guardado</span>}
      </div>
    </div>
  );
}
