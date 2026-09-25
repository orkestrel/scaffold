#!/bin/bash
# Runs REBOOT-153's landing gates over its integration commit on Veneer's session branch. Successor to eid-land-13.sh,
# which stopped when the squash merge conflicted in the export-list case of tests/setupBrowser.test.ts (the engine's
# 'HINT_CLOSES' and the unit's 'LINE_STYLES' at one sorted position); the Orchestrator kept both in order and committed
# the integration. What changed: no unit commit and no merge; the gate list is eid-land-13.sh's, unchanged. Log:
# $S/eid-gates-13.log.txt; nothing is pushed here.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-gates-13.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
echo "=== head $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src:styles" npm run build:src:styles
step "styles (form-reading consumers)" npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/button.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/navbar.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/pagination.test.ts tests/src/styles/components/accordion.test.ts
step "setup:browser" npx vitest run --config vite.config.ts --no-cache --project setup:browser
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
echo "=== eid gates 13 done ($(date -u +%H:%M:%S))" >> $LOG
