#!/usr/bin/env bash
# Runs round 2's criterion gates over the validation copy at tmp/probe/base and records each result line.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
units="$(cd "$(dirname "$0")" && pwd)"
cd "$units/../probe/base"
run() { local name=$1; shift; "$@" > "$units/ufl-2-gate-$name.log.txt" 2>&1; echo "$name exit $?: $(grep -E 'Tests  |Test Files' "$units/ufl-2-gate-$name.log.txt" | tail -1 | sed 's/^ *//')"; }
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/float.test.ts tests/src/styles/utilities/overflow.test.ts tests/src/styles/utilities/object-fit.test.ts tests/src/styles/components/clearfix.test.ts tests/src/styles/components/stretched-link.test.ts
run routeb-styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/components/card.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FloatSection.test.ts tests/app/browser/sections/OverflowSection.test.ts tests/app/browser/sections/ObjectFitSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run setupstyles npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
