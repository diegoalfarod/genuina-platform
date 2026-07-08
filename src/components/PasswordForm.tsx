"use client";

import { useActionState } from "react";
import { changePasswordAction } from "@/app/(app)/ajustes/actions";

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, null);

  return (
    <form action={action} className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Contraseña actual
        </label>
        <input name="actual" type="password" autoComplete="current-password" className="input" required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Nueva</label>
          <input name="nueva" type="password" autoComplete="new-password" className="input" required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Confirmar</label>
          <input name="confirmar" type="password" autoComplete="new-password" className="input" required />
        </div>
      </div>

      {state?.error && (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-300">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-300">
          ✅ {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? "Guardando…" : "Cambiar contraseña"}
      </button>
    </form>
  );
}
