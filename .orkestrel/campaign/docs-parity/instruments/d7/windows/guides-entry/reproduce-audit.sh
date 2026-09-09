#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/guides-test-file-audit-red"
test ! -e "$out"
mkdir -p "$out"
cd "$SCAFFOLD"
status=0
timeout --kill-after=15s 180 node node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'runs the native command when VITEST is false|keeps summary and example namespaces distinct' > "$out/regression.log.txt" 2>&1 || status=$?
printf '%s\n' "$status" > "$out/regression.exit.txt"
git -C "$SCAFFOLD" diff HEAD -- tests/src/core/compilers.test.ts > "$out/regression.diff.txt"
printf 'audit reproduction exit %s\n' "$status"
test "$status" -eq 1
