# genuina-dashboard

Panel interno de Genuina — parte del monorepo `genuina-platform` (ver README raíz).
Consume `@genuina/core` para el chrome (dock, auth, tokens, patrón "Equipo").

## Qué trae (además de `@genuina/core`)

- Página de Ajustes con cambio de contraseña real.
- **Leads** (`/leads`): entidad `Lead` propia (estado/notas/seguimiento, siempre tuyo) que
  cualquier producto futuro puede alimentar — hoy, un conector importa los demos de
  usagenuina.com (Genuina AI) vía conexión de **solo lectura** a esa base (rol Postgres
  `genuina_dashboard_ro`, sin permisos de escritura ni de lectura de tablas — solo puede
  ejecutar un puñado de funciones `SECURITY DEFINER`). Ver `src/lib/genuinaAiClient.ts`.
  Esto es, en la práctica, el arranque de **Genuina Loop**: cuando exista un agente de
  prospección real, se le agrega su propio `LeadFuente` + su propio conector — la tabla,
  el pipeline de estados y la UI de detalle no cambian.
- `ToolPicker`: drawer con el roadmap real de módulos de Genuina (Pagos/Atención/
  Cotizador/Campañas/Reportes) — marketing propio de esta app, por eso no vive en
  `@genuina/core` (un cliente no debería ver el roadmap interno de Genuina).

## Empezar

```bash
npm install   # desde la raíz del monorepo
cp .env.example .env   # rellena DATABASE_URL / DATABASE_URL_UNPOOLED / AUTH_SECRET (Neon)
npx prisma migrate dev --name init
npm run db:seed         # crea admin@genuina.local / genuina
npm run dev
```

### Conectar el módulo de Leads a Genuina AI

`GENUINA_AI_DATABASE_URL` ya está en tu `.env` local — connection string del rol de solo
lectura `genuina_dashboard_ro` sobre la base de Genuina AI. Verificado funcionalmente:
puede ejecutar `app_admin_leads`/`app_demo_history`, NO puede leer ni escribir ninguna
tabla directo (permission denied confirmado). Si rotas ese password algún día, hazlo en
la base de Genuina AI y actualiza esta env — nunca se comparte por chat.

## Logo

`(app)/layout.tsx` y `login/page.tsx` usan un wordmark de texto ("Genuina") en vez de una
imagen — coloca tu logo en `public/logo.png` y reemplaza el `<span>` por un `<img>` cuando
tengas el asset real.
