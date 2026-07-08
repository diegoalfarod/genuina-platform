"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import { GenuinaSeal } from "@/components/GenuinaSeal";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="animate-page w-full max-w-sm">
        <div className="glass-strong rounded-2xl p-8">
          <div className="mb-7 text-center">
            <p className="font-display text-2xl font-semibold text-ink">Genuina</p>
            <p className="mt-1 text-sm text-muted">Panel interno</p>
          </div>

          <form action={action} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Correo
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="input"
                required
              />
            </div>

            {state?.error && (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-300">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn btn-primary w-full"
            >
              {pending ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        </div>

        <div className="mt-5 flex justify-center">
          <GenuinaSeal />
        </div>
      </div>
    </div>
  );
}
