#!/usr/bin/env bash
# The unit's scoped gates: format and lint in the worktree, then every shared-file gate on the
# validation copy with the owned files synced and the shared patches applied.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp
tmp/units/usp-base.sh
gate() { local label="$1"; shift; echo "== $label: $*"; "$@" > /tmp/usp-gate 2>&1; local code=$?; echo "exit $code"; grep -v externalized /tmp/usp-gate | grep -E "Test Files |^\s+Tests |FAIL|error|All matched|Found [0-9]+ warning" | head -12; }
gate "worktree format:check" npm run format:check
gate "worktree lint:check" npm run lint:check
cd tmp/probe/base
gate "copy check" npm run check
gate "copy build:src" npm run build:src
echo "== copy cascade census"; node ../../units/usp-cascade.mjs
gate "copy owned styles proofs" npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts
gate "copy section proofs" npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts
gate "copy setup" npm run test:setup
gate "copy conformance" npm run test:conformance
gate "copy service" bash -c "npm run build:src:styles && npm run test:service"
