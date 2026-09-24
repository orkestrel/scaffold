#!/bin/bash
# bcf-pf-stage.sh: stage the BCF (/home/user/veneer-bcf, unit/bcf) and PAGE-FRAME (veneer-pf, unit/pf) worktrees from dc92a09 (the session head),
# one writer per checkout. Staged while the batch-2 capture runs, so the build and conformance baseline are left to each unit.
# Each worktree's node_modules is a hard-linked copy of the checkout's with the Vite and Vitest caches removed, so a unit
# never writes a hard-linked file; each unit builds its own baseline. Log: bcf-pf-stage.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$U/bcf-pf-stage.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
BASE=dc92a09
cd /home/user/veneer || exit 1
[ "$(git rev-parse --short HEAD)" = "$BASE" ] || { echo "=== HEAD is not $BASE; refusing" >> $LOG; exit 2; }
for u in bcf pf; do
  W=/home/user/veneer-$u
  git worktree add -q -b unit/$u $W $BASE >> $LOG 2>&1 || { echo "=== worktree $u failed" >> $LOG; exit 3; }
  cp -al /home/user/veneer/node_modules $W/node_modules && rm -rf $W/node_modules/.vite $W/node_modules/.vitest $W/node_modules/.cache
  mkdir -p $W/tmp/units
done
echo "=== stage done ($(date -u +%H:%M:%S))" >> $LOG
