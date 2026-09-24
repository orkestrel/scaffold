#!/usr/bin/env bash
# Round 2 gates: format and lint in the worktree, then every criterion gate on the validation copy
# with the owned files synced. Each run's output goes to tmp/units/usp-gate-2-run.log.txt.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=/home/user/veneer-usp/tmp/units/usp-gate-2-run.log.txt
cd /home/user/veneer-usp
tmp/units/usp-base-2.sh
gate() { echo "== $*"; "$@" > "$OUT" 2>&1; local code=$?; echo "exit $code"; grep -v externalized "$OUT" | grep -E "Test Files |^\s+Tests |FAIL|error|All matched|Found [0-9]+ (warning|error)|Finished in" | head -12; }
gate npm run format:check
gate npm run lint:check
cd tmp/probe/base
gate npm run check
gate npm run build:src
gate npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts
gate npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts
gate npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts
gate npm run test:conformance
gate npm run test:guides
gate npm run test:policy
