#!/bin/bash
# E-ID-LAYOUT round 4 gate chain. Runs each gate, logs it to tmp/units/eil-4-<gate>.log.txt with its exit code as the
# log's last line, and prints each exit code. Supersedes eil-3-gates.sh: the Type section command drops
# tests/app/browser/integration.test.ts, which the app:browser project excludes.
source /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-env.sh
U=tmp/units
run() { local name=$1; shift; "$@" > "$U/eil-4-$name.log.txt" 2>&1; local code=$?; echo "exit=$code" >> "$U/eil-4-$name.log.txt"; echo "$name exit $code"; }
run owned /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh tests/src/styles/elements/dl.test.ts tests/src/styles/elements/blockquote.test.ts tests/src/styles/elements/figure.test.ts tests/src/styles/components/quote.test.ts tests/src/styles/components/image.test.ts
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run test-src-styles npm run test:src:styles
run test-setup npm run test:setup
run test-conformance npm run test:conformance
run test-guides npm run test:guides
run type-section npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts
