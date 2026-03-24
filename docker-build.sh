#!/usr/bin/env bash
# Windows-compatible Docker build script.
# Docker Desktop's desktop-linux builder can't read Windows filesystem paths
# directly, so we stream the build context as a tar archive instead.
#
# Usage: ./docker-build.sh

set -e

# Always run from the project root (the directory this script lives in)
cd "$(dirname "$0")"

# Load env vars from .env.local
if [ ! -f .env.local ]; then
  echo "Error: .env.local not found. Copy .env.example to .env.local and fill in your values."
  exit 1
fi

get_env() {
  grep "[[:space:]]*$1=" .env.local | head -1 | sed 's/[[:space:]]*[^=]*=//'
}

echo "Building softly Docker image..."

tar -czf - \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='*.log' \
  --exclude='.env*' \
  --exclude='tsconfig.tsbuildinfo' \
  --exclude='docs' \
  --exclude='qa' \
  --exclude='.firebase' \
  -C "$(pwd)" . | \
docker build - \
  --build-arg NEXT_PUBLIC_FIREBASE_API_KEY="$(get_env NEXT_PUBLIC_FIREBASE_API_KEY)" \
  --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="$(get_env NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN)" \
  --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID="$(get_env NEXT_PUBLIC_FIREBASE_PROJECT_ID)" \
  --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="$(get_env NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)" \
  --build-arg NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="$(get_env NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID)" \
  --build-arg NEXT_PUBLIC_FIREBASE_APP_ID="$(get_env NEXT_PUBLIC_FIREBASE_APP_ID)" \
  --build-arg NEXT_PUBLIC_ADMIN_UIDS="$(get_env NEXT_PUBLIC_ADMIN_UIDS)" \
  -t softly:latest

echo ""
echo "Build complete. Run the app with: docker compose up"
