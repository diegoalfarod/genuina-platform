"use server";

// Wrappers de acciones del patrón "Equipo" (extraído de Radar/Masluxled). Hoy son
// no-ops: no hay ningún agente activo ni tabla equivalente a HunterSetting — cuando
// exista el primer agente real de Genuina, diséñale su propio modelo de
// activación/misiones (a la medida) y conecta estas acciones a él.

import { requireUser } from "@/lib/auth";

export async function toggleGlobalAction() {
  await requireUser();
  // no-op: sin agente activo que activar/pausar todavía.
}

export async function toggleMisionAction(_misionId: string) {
  await requireUser();
  // no-op: sin misiones/especialidades reales todavía.
}
