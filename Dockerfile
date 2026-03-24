# ─── Stage 1: Install dependencies ───────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

# Upgrade Alpine packages to pull patched zlib (CVE-2026-22184, CVE-2026-27171)
RUN apk upgrade --no-cache

# Upgrade npm to fix CVEs in npm-bundled tar, minimatch, cross-spawn, glob
RUN npm install -g npm@11.12.0

COPY package.json package-lock.json ./
RUN npm ci

# ─── Stage 2: Build the app ───────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Upgrade Alpine packages to pull patched zlib (CVE-2026-22184, CVE-2026-27171)
RUN apk upgrade --no-cache

# Upgrade npm to fix CVEs in npm-bundled tar, minimatch, cross-spawn, glob
RUN npm install -g npm@11.12.0

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for Firebase env vars (passed at build time)
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_ADMIN_UIDS

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_ADMIN_UIDS=$NEXT_PUBLIC_ADMIN_UIDS

RUN npm run build

# ─── Stage 3: Production runner ───────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Upgrade Alpine packages to pull patched zlib (CVE-2026-22184, CVE-2026-27171)
RUN apk upgrade --no-cache

# Upgrade npm to fix CVEs in npm-bundled tar, minimatch, cross-spawn, glob
RUN npm install -g npm@11.12.0

ENV NODE_ENV=production

# Only copy what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
