#!/usr/bin/env bash
cd /c/Users/mikes/WebstormProjects/roughnotes
for V in "$@"; do
  echo "=== $V ==="
  VITE_VARIANT="$V" VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts 2>&1 | tail -12
done
ls -1 tmp/capture/states/ 2>/dev/null | head -60
