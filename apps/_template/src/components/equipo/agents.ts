import type { SVGProps } from "react";

// Roster del equipo de agentes de IA. Patrón extraído de Radar (Masluxled) — hoy
// vacío a propósito: "aún no tienes agentes activos". Cuando Genuina conecte su
// primer agente real, agrégalo aquí como ACTIVO (mismo shape que tenía RADAR en
// Masluxled) y ese agente pasa a controlar el panel derecho de /equipo.

export type AgentEstadoRoster = "activo" | "por-sumar";

export type AgentMeta = {
  id: string;
  nombre: string;
  rol: string;
  bio: string;
  Icon: (p: SVGProps<SVGSVGElement>) => React.ReactNode;
  estado: AgentEstadoRoster;
};

/** El agente activo hoy, o null (roster vacío). */
export const ACTIVO: AgentMeta | null = null;

/** Agentes "por sumar" — vacío hasta que haya un roadmap concreto que mostrar aquí
 *  (el ToolPicker de BottomDock ya cubre esa narrativa con más detalle). */
export const POR_SUMAR: AgentMeta[] = [];
