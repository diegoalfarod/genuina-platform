"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Lead, LeadEstado } from "@prisma/client";
import { Tag } from "./Badge";
import { relativeTime } from "@/lib/format";
import { importDemoLeadsAction, updateLeadEstadoAction } from "@/app/(app)/leads/actions";

const ESTADOS: LeadEstado[] = ["nuevo", "contactado", "calificado", "ganado", "perdido"];
const ESTADO_LABEL: Record<LeadEstado, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  calificado: "Calificado",
  ganado: "Ganado",
  perdido: "Perdido",
};

export function LeadsClient({ leads: initial }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [syncing, startSync] = useTransition();
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  function sync() {
    setSyncMsg(null);
    startSync(async () => {
      const r = await importDemoLeadsAction();
      setSyncMsg(`${r.creados} nuevo(s), ${r.actualizados} actualizado(s) de ${r.total} demos.`);
      // El server action ya revalida la ruta; recargamos localmente para reflejar sin esperar.
      location.reload();
    });
  }

  function onEstadoChange(id: string, estado: LeadEstado) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, estado } : l)));
    updateLeadEstadoAction(id, estado);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <button onClick={sync} disabled={syncing} className="btn btn-primary">
          {syncing ? "Sincronizando…" : "🔄 Sincronizar demos"}
        </button>
        {syncMsg && <p className="text-xs text-muted">{syncMsg}</p>}
      </div>

      {leads.length === 0 ? (
        <div className="card p-8 text-center text-sm text-subtle">
          Sin leads todavía. Sincroniza los demos de usagenuina.com para traer los primeros.
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-hairline text-[11px] uppercase tracking-wide text-subtle">
                <th className="px-4 py-2.5 font-medium">Lead</th>
                <th className="px-3 py-2.5 font-medium">Negocio</th>
                <th className="px-3 py-2.5 font-medium">Fuente</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
                <th className="px-3 py-2.5 font-medium">Últ. contacto</th>
                <th className="px-4 py-2.5 font-medium">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-hairline last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{l.nombre}</p>
                    <p className="text-xs text-subtle">{l.email}</p>
                  </td>
                  <td className="px-3 py-3 text-muted">{l.negocio ?? "—"}</td>
                  <td className="px-3 py-3">
                    <Tag>{l.fuente === "demo_web" ? "Demo web" : "Manual"}</Tag>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={l.estado}
                      onChange={(e) => onEstadoChange(l.id, e.target.value as LeadEstado)}
                      className="input py-1 text-xs"
                    >
                      {ESTADOS.map((e) => (
                        <option key={e} value={e}>
                          {ESTADO_LABEL[e]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-3 text-xs text-subtle">
                    {l.ultimoContacto ? relativeTime(l.ultimoContacto) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/leads/${l.id}`} className="text-xs font-semibold text-accent hover:underline">
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
