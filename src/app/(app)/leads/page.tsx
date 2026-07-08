import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LeadsClient } from "@/components/LeadsClient";

export default async function LeadsPage() {
  await requireUser();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Leads</h1>
          <p className="text-sm text-muted">
            Prospectos de todos los productos de Genuina — hoy solo el funnel de demos.
          </p>
        </div>
      </div>

      <LeadsClient leads={leads} />
    </div>
  );
}
