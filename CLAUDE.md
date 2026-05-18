# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Next.js 13 App Router landing site for Bemp Research, derived from the `websitesieutoc/nextjs-template`. Currently the live app is a single static homepage at `app/(custom)/page.tsx`; most of the template scaffolding (auth, i18n, Chakra providers, SWR, Jotai) is wired up but unused by any rendered route.

Package manager is `pnpm`. Node 18 is what CI uses.

## Commands

```bash
pnpm dev          # next dev
pnpm build        # next build
pnpm start        # next start (after build)
pnpm lint         # eslint ./ --ext .ts,.tsx
pnpm typecheck    # tsc --noEmit  (CI runs this; next.config.js ignores TS errors at build time)
pnpm clean        # nuke node_modules + .next + dist and reinstall
```

CI (`.github/workflows/code-checking.yaml`) runs `pnpm lint` and `pnpm run typecheck` on PR. There is no test runner configured.

No local infrastructure required — the landing page is fully static. Copy `.env.example` to `.env` if you need the next-auth / TinyMCE / SMTP envs for future work.

## Architecture

**Routing.** App Router. The only rendered route group is `app/(custom)/`, which renders a static marketing page. `app/layout.tsx` is the root layout; it wraps everything in `ClientCookiesProvider` + `Providers` (`components/client/Providers/index.tsx`). The `params: { locale }` prop in layouts is leftover from the template — there is no `[locale]` dynamic segment in the current routes.

**Component layering.**
- `components/chakra/index.ts` re-exports `@chakra-ui/react` with a `'use client'` directive. Always import Chakra primitives from `@/components/chakra`, never from `@chakra-ui/react` directly — this is the only thing that keeps Chakra working inside RSC trees here.
- `components/client/*` are client-only wrappers (NextImage, NextLink, AccessDenied, CookiesProvider, Providers). Re-exported via `components/client/index.ts`.
- Server components go directly under `app/`.

**Providers stack** (`components/client/Providers/index.tsx`, outer → inner): `SWRConfig` → `SessionProvider` (next-auth) → `JotaiProvider` → `CacheProvider` (Chakra emotion cache) → `ChakraProvider`. `ColorModeScript` is dynamically imported with `ssr: false`.

**Path alias.** `@/*` maps to the repo root (see `tsconfig.json`). Use `@/components/...`, `@/utils/...`, `@/types`, etc.

**Types.** Shared types live in `types/index.ts` (`Locale`, `Dictionary`, `HttpMethod`, `RecursivePartial`) and re-export `ReactNode`, `Metadata`, etc. from React/Next so consuming code imports them from `@/types`.

**i18n.** `configs/i18n.config.ts` defines `en` and `vi` locales; dictionaries are loaded server-side via `utils/dictionary.ts` (uses `server-only`). Not currently wired into any route — kept for future use.

**State / data.**
- Jotai for client state (`atoms/index.ts` has `columnFiltersAtom`, `globalFilterAtom` — used nowhere yet).
- SWR with `fetcher` from `utils/fetcher.ts` (uses `deepmerge` on RequestInit; default `Content-Type: application/json`).

## Lint & style

- ESLint extends `next/core-web-vitals` + `prettier`. `no-console` is **error** — use a logger or `console.warn`/`console.error` only when justified, never `console.log`.
- Prettier config in `.prettierrc.json`.

## Gotchas

- `next.config.js` has `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`. The build will succeed even if `pnpm typecheck` or `pnpm lint` would fail. Run them manually before merging.
- `experimental.serverActions: true` is set — this project predates Server Actions being stable in Next 13.5.
- Prisma was removed (commits `04b33b1`, `edc5d53`). All local DB/Docker scaffolding (Postgres, Redis, Mailpit, Vercel KV rate limiting, argon2 password hashing) has also been removed — there is no `docker-compose.yaml`, no `utils/password.ts`, and no `utils/rateLimit.ts`. `next-auth` is still a dep and `SessionProvider` is mounted, but there is no adapter, no auth route handler, and no schema. Treat auth as wired-but-inactive.
- Root layout always renders `<html lang="en">` regardless of locale.
- `IS_VERCEL`/`SITE_URL`/`getSiteUrl()` in `utils/constants.ts` rely on `NEXTAUTH_URL`, `VERCEL_URL`, `VERCEL_BRANCH_URL`, `VERCEL_ENV` — keep that in mind when adding URL-dependent code.
