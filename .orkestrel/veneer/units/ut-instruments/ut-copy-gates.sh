#!/usr/bin/env bash
# Runs the validation copy's gates, one log per gate, and records each exit.
cd /home/user/veneer-ut/tmp/probe/base || exit 1
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
L=/home/user/veneer-ut/tmp/units/ut-copy
run() { local name=$1; shift; "$@" > "$L-$name.log.txt" 2>&1; echo "$name exit $?" | tee -a "$L-summary.log.txt"; }
: > "$L-summary.log.txt"
run format-check npm run format:check
run lint-check npm run lint:check
run check npm run check
run build-src npm run build:src
run setup npm run test:setup
run styles-owned npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/text.test.ts tests/src/styles/utilities/color.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/text-truncation.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TextSection.test.ts tests/app/browser/sections/ColorSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run policy npm run test:policy
run guides npm run test:guides
run service npm run test:service
