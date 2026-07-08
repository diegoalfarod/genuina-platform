import type { AgentSnapshot } from "@/lib/agentPresence";

// Un marcador de "trabajando" más viejo que esto se considera pegado (p. ej. una función
// serverless que crasheó) y se ignora — así el agente no queda "trabajando" para siempre.
export const WORK_STALE_MS = 6 * 60 * 1000;

/** "sin-agentes": no hay ningún agente activo en el roster (estado por defecto de
 *  esta plantilla). Los otros 3 solo aplican cuando SÍ hay un agente activo. */
export type PresenciaAgente = "trabajando" | "online" | "offline" | "sin-agentes";

/**
 * Timestamp de inicio del trabajo en curso, o null si no está trabajando. Prioriza la
 * búsqueda/acción manual local; si no, usa el marcador del servidor mientras esté fresco.
 */
export function inicioTrabajo(
  snapshot: AgentSnapshot,
  localStart: number | null,
  nowMs: number
): number | null {
  if (localStart) return localStart;
  if (snapshot.trabajandoDesde) {
    const t = new Date(snapshot.trabajandoDesde).getTime();
    if (nowMs - t < WORK_STALE_MS) return t;
  }
  return null;
}

export function presenciaDe(online: boolean, trabajando: boolean): PresenciaAgente {
  return trabajando ? "trabajando" : online ? "online" : "offline";
}

/** Próxima revisión automática: la próxima hora en punto si hay misión disponible;
 *  si todas están en enfriamiento, cuándo se libera la primera. Null si no hay activas. */
export function proximaRevision(
  misiones: AgentSnapshot["misiones"],
  nowMs: number
): number | null {
  const activas = misiones.filter((m) => m.activa);
  if (activas.length === 0) return null;

  const algunaDisponible = activas.some(
    (m) => !m.proximaDisponible || new Date(m.proximaDisponible).getTime() <= nowMs
  );
  if (algunaDisponible) return Math.ceil(nowMs / 3_600_000) * 3_600_000;

  const futuras = activas
    .map((m) => (m.proximaDisponible ? new Date(m.proximaDisponible).getTime() : Infinity))
    .filter((t) => t > nowMs);
  return futuras.length ? Math.min(...futuras) : null;
}
