import { notFound } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchLeadTranscript } from "@/lib/genuinaAiClient";
import { Tag } from "@genuina/core/src/ui/Badge";
import { NotasForm } from "@/components/NotasForm";

const CHANNEL_LABEL: Record<string, string> = {
  web: "Web",
  whatsapp: "WhatsApp",
  email: "Email",
  voice: "Voz",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const transcript = lead.externalId ? await fetchLeadTranscript(lead.externalId) : null;

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/leads" className="text-xs text-subtle hover:text-ink">
        ← Volver a leads
      </Link>

      <div className="mb-6 mt-3 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{lead.nombre}</h1>
          <p className="text-sm text-muted">
            {lead.negocio ?? "—"} · {lead.email}
          </p>
        </div>
        <Tag>{lead.fuente === "demo_web" ? "Demo web" : "Manual"}</Tag>
      </div>

      <div className="card mb-5 space-y-3 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Contacto</h2>
        <p className="text-sm text-ink">📞 {lead.telefono}</p>
        {lead.telefono && (
          <a
            href={`https://wa.me/${lead.telefono.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Hola ${lead.nombre}, te escribo de Genuina.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost inline-flex text-xs"
          >
            Contactar por WhatsApp →
          </a>
        )}
      </div>

      <div className="card mb-5 p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Notas</h2>
        <NotasForm leadId={lead.id} notasIniciales={lead.notas ?? ""} />
      </div>

      {lead.externalId && (
        <div className="card p-0">
          <div className="border-b border-hairline px-5 py-3">
            <p className="text-sm font-semibold text-ink">
              Conversación completa {transcript ? `(${transcript.length} mensajes)` : ""}
            </p>
          </div>
          {!transcript || transcript.length === 0 ? (
            <p className="p-8 text-center text-sm text-subtle">Sin mensajes todavía.</p>
          ) : (
            <div className="flex flex-col gap-3 p-5">
              {transcript.map((m, i) => {
                const isAgente = m.from === "agente" || m.from === "humano";
                return (
                  <div key={i} className={`flex ${isAgente ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                        isAgente
                          ? "rounded-br-sm bg-gradient-to-br from-accent to-accent-2 text-accent-ink"
                          : "rounded-bl-sm border border-hairline bg-surface-2 text-ink"
                      }`}
                    >
                      {m.text}
                      <div className="mt-1.5 flex items-center gap-2 text-[10px] opacity-70">
                        <span className="rounded-full border border-current/30 px-1.5 py-0.5">
                          {CHANNEL_LABEL[m.channel] ?? m.channel}
                        </span>
                        {new Date(m.createdAt).toLocaleString("es", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
