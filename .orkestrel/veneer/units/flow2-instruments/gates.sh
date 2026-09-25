#!/usr/bin/env bash
# Runs every gate unit E-ID-FLOW-2 names, each into its own log ending in exit=<code>.
# Usage: gates.sh <suffix>
set -u
source /home/user/veneer-flow2/tmp/units/flow2-instruments/env.sh
logs=tmp/units/flow2-instruments/logs
s=$1
run() { local name=$1; shift; { "$@"; echo "exit=$?"; } > "$logs/$name-$s.log.txt" 2>&1; echo "$name: $(tail -1 "$logs/$name-$s.log.txt") $(grep -a 'Tests ' "$logs/$name-$s.log.txt" | tail -1)"; }
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run build-src npm run build:src
run owned npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/dl.test.ts tests/src/styles/elements/pre.test.ts tests/src/styles/elements/hr.test.ts tests/src/styles/elements/figure.test.ts
run conformance npm run test:conformance
run src-styles npm run test:src:styles
run setup npm run test:setup
run guides npm run test:guides
run app-browser npx vitest run --config vite.config.ts --no-cache --project app:browser
echo done
