import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Cliente de SOLO LECTURA hacia la base de datos de Genuina AI (usagenuina.com —
 * el funnel público de demos). Conecta con el rol `genuina_dashboard_ro`, que
 * SOLO puede ejecutar un puñado de funciones SECURITY DEFINER (no puede leer ni
 * escribir ninguna tabla directo — ver migración de creación del rol). Es
 * deliberadamente su propia conexión, separada de `prisma` (que apunta a la base
 * PROPIA de Genuina Base) — dos bases de datos distintas, dos clientes distintos.
 */

function client() {
  const url = process.env.GENUINA_AI_DATABASE_URL;
  if (!url) throw new Error("GENUINA_AI_DATABASE_URL no está definida");
  return neon(url);
}

export type DemoLeadSummary = {
  businessId: string;
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  source: string;
  createdAt: Date;
  expiresAt: Date;
  channels: string[];
  msgCount: number;
  lastActive: Date | null;
  ctaClicked: boolean;
  hasKnowledge: boolean;
};

/** Todos los demos/leads del funnel de Genuina AI (vía app_admin_leads). */
export async function fetchDemoLeads(limit = 500): Promise<DemoLeadSummary[]> {
  const sql = client();
  const rows = await sql`SELECT * FROM app_admin_leads(${limit})`;
  return rows.map((r) => ({
    businessId: r.businessId,
    businessName: r.businessName,
    contactName: r.contactName,
    contactEmail: r.contactEmail,
    contactPhone: r.contactPhone,
    source: r.source,
    createdAt: new Date(r.createdAt),
    expiresAt: new Date(r.expiresAt),
    channels: r.channels ?? [],
    msgCount: Number(r.msgCount ?? 0),
    lastActive: r.lastActive ? new Date(r.lastActive) : null,
    ctaClicked: Boolean(r.ctaClicked),
    hasKnowledge: Boolean(r.hasKnowledge),
  }));
}

export type TranscriptItem = {
  channel: string;
  from: string;
  text: string;
  createdAt: Date;
};

/** Transcript completo (todos los canales, cronológico) de un demo puntual. */
export async function fetchLeadTranscript(businessId: string): Promise<TranscriptItem[]> {
  const sql = client();
  const rows = await sql`SELECT * FROM app_demo_history(${businessId}, 300)`;
  return rows.map((r) => ({
    channel: r.channel,
    from: r.from,
    text: r.text,
    createdAt: new Date(r.createdAt),
  }));
}
