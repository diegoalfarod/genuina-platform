import { requireUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Bienvenido, {user.nombre.split(" ")[0]}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Este es tu panel Genuina. Cuando conectes tu primer agente, su actividad y
        métricas aparecerán aquí.
      </p>
    </div>
  );
}
