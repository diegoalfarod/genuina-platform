import { requireUser } from "@/lib/auth";
import { getAgentSnapshot } from "@/lib/agentPresence";
import { EquipoClient } from "@/components/EquipoClient";

export default async function EquipoPage() {
  await requireUser();
  const snapshot = await getAgentSnapshot();
  return <EquipoClient snapshot={snapshot} />;
}
