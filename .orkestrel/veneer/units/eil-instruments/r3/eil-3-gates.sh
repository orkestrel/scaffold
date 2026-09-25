#!/bin/bash
# E-ID-LAYOUT round 3 gate chain. Runs each gate, logs it to tmp/units/eil-3-<gate>.log.txt, and prints each exit code.
source /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-env.sh
U=tmp/units
run() { local name=$1; shift; "$@" > "$U/eil-3-$name.log.txt" 2>&1; echo "$name exit $?"; }
run owned /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-test.sh tests/src/styles/elements/dl.test.ts tests/src/styles/elements/blockquote.test.ts tests/src/styles/elements/figure.test.ts tests/src/styles/components/quote.test.ts tests/src/styles/components/image.test.ts
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run test-src-styles npm run test:src:styles
run test-conformance npm run test:conformance
run test-guides npm run test:guides
run type-section npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/TypeSection.test.ts tests/app/browser/integration.test.ts
run test-setup npm run test:setup
