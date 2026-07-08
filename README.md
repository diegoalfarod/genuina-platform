# Genuina Base

Plantilla base para nuevos dashboards/backoffice de Genuina. Extraída del shell visual
de MasLux/Radar (dock de navegación, tema claro/oscuro, auth, tab "Equipo" con presencia
en vivo de agentes) **sin ningún CRM de leads** — lista para configurar un cliente nuevo
o el propio panel interno de Genuina.

## Qué trae

- Next.js 15 + React 19 + TypeScript, Tailwind 4 (tokens de diseño en `src/app/globals.css`).
- Auth casera (cookie firmada HMAC, sin librería externa) — `src/lib/auth.ts`.
- Prisma + Neon Postgres. Modelo mínimo: `User` + `Notification`.
- Shell autenticado: header glassy, dock flotante (Inicio · Equipo · Ajustes), tool picker
  con el roadmap de módulos de Genuina.
- Tab "Equipo": patrón de presencia en vivo de agentes de IA, roster vacío por defecto
  ("aún no tienes agentes activos"). Ver `src/components/equipo/` — `Worklog.tsx` y
  `AgentProfile.tsx` están generalizados y listos para conectar cuando exista el primer
  agente real (hoy no los usa `EquipoClient.tsx`, que muestra el estado vacío).
- Página de Ajustes con cambio de contraseña real.

## Qué NO trae (a propósito)

Ningún CRM/leads, ningún cron, ninguna integración de IA todavía. Ver el documento de
especificación original en el repo de Masluxled (`docs/GENUINA_TEMPLATE_SPEC.md`) para el
catálogo completo de qué se dejó fuera y por qué.

## Empezar

```bash
npm install
cp .env.example .env   # rellena DATABASE_URL / DATABASE_URL_UNPOOLED / AUTH_SECRET (Neon)
npx prisma migrate dev --name init
npm run db:seed         # crea admin@genuina.local / genuina
npm run dev
```

## Paleta de marca

`src/app/globals.css` tiene la paleta de MasLux (ámbar + azul marino) como **placeholder**
— reemplaza `--accent`/`--accent-2`/`--accent-ink`/`--brand` (tema claro y oscuro) por la
paleta real de Genuina cuando esté definida. El resto del sistema (`.glass`, `.card`,
`.btn`, `.dock`, animaciones) no cambia.

## Logo

`(app)/layout.tsx` y `login/page.tsx` usan un wordmark de texto ("Genuina") en vez de una
imagen — coloca tu logo en `public/logo.png` y reemplaza el `<span>` por un `<img>` cuando
tengas el asset real.

## Siguiente cliente / producto

Para configurar un nuevo cliente: clona este repo, ajusta `package.json` (`name`),
paleta, y arranca desde aquí. No reutilices esta misma instancia/base de datos entre
clientes — cada uno con su propio repo + proyecto Vercel + base Neon.
