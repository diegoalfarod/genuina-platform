"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchDemoLeads } from "@/lib/genuinaAiClient";
import type { LeadEstado } from "@prisma/client";

/**
 * Importa/sincroniza los demos del funnel de Genuina AI como Lead(fuente=demo_web).
 * En CREACIÓN: todos los campos + estado inicial "nuevo". En ACTUALIZACIÓN (el lead
 * ya existía): solo refresca datos de contacto/negocio — NUNCA toca `estado` ni
 * `notas`, que son el trabajo de seguimiento de Diego y no se pisan al resincronizar.
 */
export async function importDemoLeadsAction() {
  await requireUser();

  const demos = await fetchDemoLeads();
  let creados = 0;
  let actualizados = 0;

  for (const d of demos) {
    const existing = await prisma.lead.findUnique({
      where: { email_fuente: { email: d.contactEmail, fuente: "demo_web" } },
    });

    if (existing) {
      await prisma.lead.update({
        where: { id: existing.id },
        data: {
          nombre: d.contactName,
          telefono: d.contactPhone,
          negocio: d.businessName,
          externalId: d.businessId,
          ultimoContacto: d.lastActive,
        },
      });
      actualizados++;
    } else {
      await prisma.lead.create({
        data: {
          nombre: d.contactName,
          email: d.contactEmail,
          telefono: d.contactPhone,
          negocio: d.businessName,
          fuente: "demo_web",
          estado: "nuevo",
          externalId: d.businessId,
          ultimoContacto: d.lastActive,
        },
      });
      creados++;
    }
  }

  revalidatePath("/leads");
  return { ok: true, creados, actualizados, total: demos.length };
}

export async function updateLeadEstadoAction(id: string, estado: LeadEstado) {
  await requireUser();
  await prisma.lead.update({ where: { id }, data: { estado } });
  revalidatePath("/leads");
}

export async function updateLeadNotasAction(id: string, notas: string) {
  await requireUser();
  await prisma.lead.update({ where: { id }, data: { notas } });
  revalidatePath("/leads");
}
