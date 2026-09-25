#!/bin/bash
# Lands E-ID-ANCHOR on Veneer's session branch over origin/main a65d308 (6586b11 plus the engine's J-CONCERNS-B, which the
# session branch fast-forwards to first). Successor to eid-land-13.sh. What changed: the unit is
# unit/anchor at c467527 (round 4, committed; cut from 0a0a252, an ancestor of the session branch), so there is no unit
# commit; the squash merge takes $S/eid-msg-anchor.txt; the gates are the set the unit's files reach, with the ledger
# gate, because the unit adds declarations the § Additions rows record. It stops at the first red and pushes nothing.
# Log: $S/eid-land-14.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-land-14.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
W=/home/user/veneer-anchor
[ -z "$(git -C $W status --porcelain -- . ':!tmp')" ] || { echo "=== unit tree dirty; refusing" >> $LOG; exit 2; }
echo "=== unit/anchor $(git -C $W rev-parse --short HEAD)" >> $LOG
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
git merge --ff-only a65d308 >> $LOG 2>&1 || { echo "=== fast-forward to a65d308 failed" >> $LOG; exit 5; }
echo "=== base $(git rev-parse --short HEAD)" >> $LOG
git merge --squash unit/anchor >> $LOG 2>&1 || { echo "=== squash merge conflicted; stopped" >> $LOG; git status --short >> $LOG; exit 4; }
git commit -q -F $S/eid-msg-anchor.txt >> $LOG 2>&1 || { echo "=== integration commit failed" >> $LOG; exit 3; }
echo "=== integrated $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src:styles" npm run build:src:styles
step "styles (anchor consumers)" npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts
step "build:src" npm run build:src
step "test:conformance" npm run test:conformance
observe() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S)), observed against $S/overlay-base.log.txt" >> $LOG; "$@" >> $LOG 2>&1; echo "=== $name exit=$?" >> $LOG; }
observe "src:browser (the engine's overlay proofs over the anchor rule)" npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Dropdown.test.ts tests/src/browser/Popover.test.ts tests/src/browser/Tooltip.test.ts
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
echo "=== eid land 14 done ($(date -u +%H:%M:%S))" >> $LOG
