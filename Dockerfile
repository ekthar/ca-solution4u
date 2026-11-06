# syntax=docker/dockerfile:1

# ---- Base stage ----
FROM node:20-slim AS base
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ---- Dependencies stage ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci
RUN npm install --no-save lightningcss-linux-arm64-gnu@1.32.0 @tailwindcss/oxide-linux-arm64-gnu@4.3.3

# ---- Builder stage ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Runner stage ----
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", ".next/standalone/server.js"]
