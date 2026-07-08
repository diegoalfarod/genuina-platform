# @genuina/core

Paquete interno (no se publica a npm) con lo genuinamente compartido entre todas las apps
del monorepo — chrome visual, no datos ni lógica de negocio.

- `src/ui/` — `Dock` (shell del dock flotante, ítems configurables por app), `icons.tsx`
  (set de íconos SVG), `Badge.tsx` (`Tag`).
- `src/auth/token.ts` — primitivas de sesión HMAC (firmar/verificar token, cookie).
  Cada app mantiene su propio `src/lib/auth.ts` que envuelve esto con su propio lookup
  de usuario (Prisma es de cada app, no de este paquete).
- `src/agentPresence/agentPresence.ts` — patrón "Equipo" (`AgentSnapshot`), stub vacío
  por defecto hasta que una app conecte un agente real.
- `styles/tokens.css` — tokens de diseño (`.glass`/`.card`/`.btn`/`.dock`, tema claro/oscuro).
  Cada app hace `@import "@genuina/core/styles/tokens.css";` en su `globals.css` y puede
  sobreescribir las variables de color después para su propia paleta de marca.
- `prisma-core.prisma` — referencia (no ejecutable) de los modelos base (`User`,
  `Notification`, `Lead`) que cada app nueva copia a su propio schema al arrancar.

No se le añade nada aquí que solo use una app — eso vive en esa app. Este paquete crece
solo cuando algo se repite en 2+ apps.
