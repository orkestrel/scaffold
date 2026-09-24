#!/usr/bin/env bash
# Runs the unit's scoped gates over the validation copy and records each exit.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$(dirname "$0")/../probe/base"
run() { local name=$1; shift; "$@" > "../gate-$name.log.txt" 2>&1; echo "$name exit $?"; grep -E "Tests  |Test Files" "../gate-$name.log.txt" | tail -2; }
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/float.test.ts tests/src/styles/utilities/overflow.test.ts tests/src/styles/utilities/object-fit.test.ts tests/src/styles/components/clearfix.test.ts tests/src/styles/components/stretched-link.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FloatSection.test.ts tests/app/browser/sections/OverflowSection.test.ts tests/app/browser/sections/ObjectFitSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run setup npm run test:setup
run policy npm run test:policy
run guides npm run test:guides
run service npm run test:service
