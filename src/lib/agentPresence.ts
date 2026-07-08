import "server-only";

// Snapshot genérico del "equipo de agentes" — patrón extraído de Radar (Masluxled).
// Hoy no hay ningún agente real conectado (roster vacío en src/components/equipo/agents.ts),
// así que getAgentSnapshot() es un STUB que devuelve datos vacíos. Cuando exista el primer
// agente real de Genuina, reemplaza el cuerpo de esta función por una consulta real contra
// lo que sea que alimente a ese agente (su propia tabla de "misiones"/actividad, etc.) —
// diseña ese modelo de datos a la medida, no reuses HunterSetting/Lead de Masluxled.

export type AgentMision = {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  activa: boolean;
  ultimaEjecucion: string | null;
  proximaDisponible: string | null;
};

export type AgentEvento = {
  id: string;
  empresa: string;
  tipo: string;
  estado: string;
  score: number | null;
  createdAt: string;
};

export type AgentSnapshot = {
  global: boolean;
  activadoEn: string | null;
  trabajandoDesde: string | null;
  trabajandoMision: string | null;
  misiones: AgentMision[];
  hoy: number;
  estaSemana: number;
  totalEncontrados: number;
  serie7d: number[];
  recientes: AgentEvento[];
};

const EMPTY_SNAPSHOT: AgentSnapshot = {
  global: false,
  activadoEn: null,
  trabajandoDesde: null,
  trabajandoMision: null,
  misiones: [],
  hoy: 0,
  estaSemana: 0,
  totalEncontrados: 0,
  serie7d: [0, 0, 0, 0, 0, 0, 0],
  recientes: [],
};

/** Todo lo que necesita el panel de presencia del equipo, en un solo viaje. */
export async function getAgentSnapshot(): Promise<AgentSnapshot> {
  return EMPTY_SNAPSHOT;
}
