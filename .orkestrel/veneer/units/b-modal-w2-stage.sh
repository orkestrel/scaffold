#!/bin/bash
# b-modal-w2-stage.sh: stage the B-MODAL wave-2 worktrees from 2a3f223 (Veneer main), one writer per checkout: MODAL
# (/home/user/veneer-md, unit/md), OFFCANVAS (veneer-oc, unit/oc), TIP (veneer-tp, unit/tp), TOAST (veneer-to, unit/to).
# Each worktree's node_modules is a hard-linked copy of the checkout's with the Vite and Vitest caches removed, so a unit
# never writes a hard-linked file; each takes build:src and the conformance baseline. Log: b-modal-w2-stage.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$U/b-modal-w2-stage.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
BASE=2a3f223
cd /home/user/veneer || exit 1
[ "$(git rev-parse --short HEAD)" = "$BASE" ] || { echo "=== HEAD is not $BASE; refusing" >> $LOG; exit 2; }
for u in md oc tp to; do
  W=/home/user/veneer-$u
  git worktree add -q -b unit/$u $W $BASE >> $LOG 2>&1 || { echo "=== worktree $u failed" >> $LOG; exit 3; }
  cp -al /home/user/veneer/node_modules $W/node_modules && rm -rf $W/node_modules/.vite $W/node_modules/.vitest $W/node_modules/.cache
  mkdir -p $W/tmp/units
  (cd $W && npm run build:src > tmp/units/$u-stage-build.log.txt 2>&1; echo "=== $u build:src exit=$?" >> $LOG)
  (cd $W && npm run test:conformance > tmp/units/$u-stage-conformance.log.txt 2>&1; echo "=== $u test:conformance exit=$?" >> $LOG)
done
echo "=== stage done ($(date -u +%H:%M:%S))" >> $LOG
