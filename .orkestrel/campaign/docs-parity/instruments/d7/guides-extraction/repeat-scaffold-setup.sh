#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
out="$SCR/d7n-scaffold-setup-root-red"
test ! -e "$out"
mkdir -p "$out"
status=0
node node_modules/vitest/vitest.mjs run tests/setupServer.test.ts --config vite.config.ts --no-cache --reporter=dot --project setup > "$out/test.log.txt" 2>&1 || status=$?
printf '%s\n' "$status" > "$out/test.exit.txt"
cat "$out/test.log.txt"
exit "$status"
