#!/bin/bash
# Lands REBOOT-153 on Veneer's session branch after the MODAL and FACTOR push. Successor to eid-land-12.sh. What changed:
# one unit (r153, cut from 6052e25, an ancestor of the session branch), so git integrates it three-way through a squash
# merge rather than per-file merge-file, and the gates are the scoped set the unit's files reach. It commits the unit's
# round 2 on unit/r153, squash-merges the branch as one integration commit with $S/eid-msg-r153.txt, and runs the
# gates; it stops at the first red and pushes nothing. Log: $S/eid-land-13.log.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/eid-land-13.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
W=/home/user/veneer-r153
if [ -n "$(git -C $W status --porcelain -- . ':!tmp')" ]; then
  git -C $W add -- guides tests >> $LOG 2>&1 && git -C $W commit -q -F $S/eid-msg-r153.txt >> $LOG 2>&1 || { echo "=== unit commit failed" >> $LOG; exit 3; }
fi
echo "=== unit/r153 $(git -C $W rev-parse --short HEAD)" >> $LOG
cd /home/user/veneer || exit 1
[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }
echo "=== base $(git rev-parse --short HEAD)" >> $LOG
git merge --squash unit/r153 >> $LOG 2>&1 || { echo "=== squash merge conflicted; stopped" >> $LOG; git status --short >> $LOG; exit 4; }
git commit -q -F $S/eid-msg-r153.txt >> $LOG 2>&1 || { echo "=== integration commit failed" >> $LOG; exit 3; }
echo "=== integrated $(git rev-parse --short HEAD)" >> $LOG
rm -rf node_modules/.vite
step "format:check" npm run format:check
step "lint:check" npm run lint:check
step "check" npm run check
step "build:src:styles" npm run build:src:styles
step "styles (form-reading consumers)" npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/button.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/navbar.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/pagination.test.ts tests/src/styles/components/accordion.test.ts
step "setup:browser" npx vitest run --config vite.config.ts --no-cache --project setup:browser
step "test:guides" npm run test:guides
step "test:policy" npm run test:policy
echo "=== eid land 13 done ($(date -u +%H:%M:%S))" >> $LOG
