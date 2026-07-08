# genuina-template

Punto de partida para el próximo cliente dedicado. Parte del monorepo `genuina-platform`
(ver README raíz) — consume `@genuina/core` para el chrome (dock, auth, tokens, patrón
"Equipo"). Sin CRM de leads, sin marketing de Genuina, sin nada específico de un cliente
en particular: eso lo agregas tú al clonarlo.

## Usar esto para un cliente nuevo

1. Copia esta carpeta a `apps/<cliente>/` (fuera del monorepo también funciona si el
   cliente necesita su propio repo — ver README raíz, sección "Masluxled").
2. Renombra `package.json` (`name`).
3. Proyecto Neon propio → `.env` (copia `.env.example`) → `npx prisma migrate dev --name init`.
4. `npm run db:seed` → crea `admin@genuina.local` / `genuina` (cambia esto en producción).
5. Personaliza libremente: agrega modelos a `prisma/schema.prisma`, páginas en
   `src/app/(app)/`, ítems al dock en `src/components/BottomDock.tsx`. Nunca edites
   `packages/core` para algo que solo necesita este cliente.
6. Paleta de marca: sobreescribe las variables de color en `src/app/globals.css` después
   de importar `@genuina/core/styles/tokens.css`.

## Qué trae

- Next.js 15 + React 19 + TypeScript, Tailwind 4 vía `@genuina/core`.
- Auth casera (cookie firmada HMAC) — `src/lib/auth.ts` delega la parte criptográfica a
  `@genuina/core/src/auth/token`.
- Prisma + Neon Postgres. Modelo mínimo: `User` + `Notification`.
- Shell autenticado: header glassy, dock flotante (Inicio · Equipo · Ajustes).
- Tab "Equipo": patrón de presencia en vivo de agentes de IA, roster vacío por defecto.
- Página de Ajustes con cambio de contraseña real.

## Qué NO trae (a propósito)

Ningún CRM de leads, ningún `ToolPicker`/roadmap de Genuina, ningún cron, ninguna
integración de IA todavía — agrega lo que este cliente específico necesite.
