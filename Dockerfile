# syntax=docker/dockerfile:1.7

# ---------- base: node + pnpm via corepack ----------
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN apk add --no-cache libc6-compat && \
    corepack enable pnpm && \
    corepack prepare pnpm@11.1.2 --activate

# ---------- deps: install node_modules ----------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ---------- builder: compile next ----------
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Build-time envs. SATFLOW_URL is baked into prerendered HTML
# (app/(custom)/page.tsx). NEXT_PUBLIC_* are always inlined into the
# bundle at build time by Next, regardless of where they're read.
ARG SATFLOW_URL
ENV SATFLOW_URL=${SATFLOW_URL}
ARG NEXT_PUBLIC_ROOT_DOMAIN
ENV NEXT_PUBLIC_ROOT_DOMAIN=${NEXT_PUBLIC_ROOT_DOMAIN}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---------- runner: minimal runtime ----------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public            ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone  ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static      ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
