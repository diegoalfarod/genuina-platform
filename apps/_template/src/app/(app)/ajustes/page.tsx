import { requireUser } from "@/lib/auth";
import { PasswordForm } from "@/components/PasswordForm";
import { GenuinaSeal } from "@/components/GenuinaSeal";

export default async function AjustesPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Ajustes</h1>
        <p className="text-sm text-muted">
          Tu cuenta y la configuración de la plataforma.
        </p>
      </div>

      {/* Cuenta */}
      <div className="card mb-5 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Cuenta
        </h2>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-lg font-bold text-accent-ink">
            {user.nombre.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="font-medium text-ink">{user.nombre}</p>
            <p className="text-sm text-muted">{user.email}</p>
            <p className="text-xs text-subtle">
              {user.rol === "ADMIN" ? "Administrador" : "Asesor"}
            </p>
          </div>
        </div>
      </div>

      {/* Seguridad */}
      <div className="card mb-5 p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          Cambiar contraseña
        </h2>
        <PasswordForm />
      </div>

      {/* Plataforma — próximamente */}
      <div className="card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Plataforma
        </h2>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-3 py-2.5">
            <span>👥 Equipo y agentes de IA</span>
            <span className="text-xs text-subtle">Próximamente</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-3 py-2.5">
            <span>🔌 Integraciones (WhatsApp, correo)</span>
            <span className="text-xs text-subtle">Próximamente</span>
          </li>
          <li className="flex items-center justify-between rounded-lg border border-hairline bg-surface-2 px-3 py-2.5">
            <span>🔔 Preferencias de notificaciones</span>
            <span className="text-xs text-subtle">Próximamente</span>
          </li>
        </ul>
        <div className="mt-4 flex justify-center">
          <GenuinaSeal />
        </div>
      </div>
    </div>
  );
}
