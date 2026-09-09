#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
phase="${1:-before}"
set +e
node node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'the guides entry' 2>&1 | tee "tmp/pass/scaffold-parity-adopt/${phase}.log.txt"
status="${PIPESTATUS[0]}"
set -e
printf '%s\n' "$status" > "tmp/pass/scaffold-parity-adopt/${phase}.exit.txt"
exit "$status"
