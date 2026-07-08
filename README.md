# genuina-platform

Monorepo (npm workspaces) para el dashboard interno de Genuina y las apps dedicadas de
cada cliente que necesite un deployment personalizado.

**`packages/core` es el sistema de diseño OFICIAL de Genuina de aquí en adelante**
(el look glassy extraído de Masluxled/Radar) — no un experimento paralelo al dashboard
de Genuina AI (usagenuina.com). Ese dashboard actual (Fase 6, look plano/técnico) queda
obsoleto frente a esta dirección; migrarlo a este sistema de diseño es trabajo futuro
explícito, no automático — mientras tanto sigue funcionando tal cual está.

## Estructura

```
packages/
  core/               → @genuina/core: dock, íconos, auth HMAC, tokens de diseño,
                        patrón "Equipo", convención Lead. Ver packages/core/README.md.
apps/
  genuina-dashboard/  → panel interno de Genuina (incluye el módulo de Leads).
  _template/          → punto de partida para el próximo cliente dedicado (clónalo).
```

Cada app tiene su propia base de datos Neon, sus propias migraciones y su propio
deployment de Vercel — nunca se comparten datos entre apps, solo el chrome visual de
`packages/core`.

## Empezar

```bash
npm install                          # instala todo el workspace desde la raíz
cd apps/genuina-dashboard             # o apps/_template, o apps/<cliente>
cp .env.example .env
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## Crear un cliente nuevo

1. Copia `apps/_template/` a `apps/<cliente>/`, renombra `package.json` (`name`).
2. Proyecto Neon propio → `.env` propio → `prisma migrate dev`.
3. Proyecto de Vercel propio con root directory = `apps/<cliente>`.
4. Personaliza libremente dentro de esa carpeta — nunca edites `packages/core` para
   algo que solo necesita un cliente; ese paquete solo crece cuando algo se repite en
   2+ apps.
5. Paleta de marca: `packages/core/styles/tokens.css` trae la paleta oficial de Genuina
   (terracota + teal) por defecto — sobreescribe `--accent`/`--accent-2`/`--accent-ink`/
   `--brand` en el `globals.css` de la nueva app después de importar los tokens del core
   si este cliente necesita otra paleta.

## Masluxled

Sigue viviendo en su propio repo, en producción para el primo de Diego — no forma parte
de este monorepo todavía. Su migración a `apps/masluxled/` (reemplazando su copia local
de dock/auth/tokens por imports de `@genuina/core`) es una etapa deliberada y posterior,
con ventana de mantenimiento explícita, no automática.
