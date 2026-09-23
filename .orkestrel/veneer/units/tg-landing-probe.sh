#!/bin/bash
# dry-check-tg.sh: probe the TOGGLES round-3 shared patch three-way against the UTIL-DISPLAY landing tip in a scratch worktree, map every conflict, run the resolver, the seam joiner, and the sort, then typecheck and lint (the owned files are absent, so their missing-module diagnostics are expected). Log: $S/dry-check-tg.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
TIP=$(git -C /home/user/veneer rev-parse --short HEAD)
cd /home/user/veneer && git worktree remove --force $S/probe-land-tg > /dev/null 2>&1; rm -rf $S/probe-land-tg
git worktree add -q --detach $S/probe-land-tg $TIP && cd $S/probe-land-tg || exit 1
echo "=== tg apply --3way of tg-shared-3.patch on $TIP $(date -u +%H:%M:%S)"; git apply --3way $U/tg-shared-3.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- resolve"; python3 $U/tg-resolve.py; python3 $U/land-seams.py
grep -rlE '^(<<<<<<<|>>>>>>>)' app tests guides src 2>/dev/null | sed 's/^/MARKERS LEFT: /'
for f in src/styles/components/_button-group.scss src/styles/components/_input-group.scss tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts; do cp /home/user/veneer-tg/$f $f; done; echo "--- owned files copied from the worktree"
[ -e node_modules ] || cp -al /home/user/veneer/node_modules node_modules
nice npx oxfmt app tests guides src > /dev/null 2>&1
echo "=== tg check $(date -u +%H:%M:%S)"; nice npm run check 2>&1 | grep -E "error TS" | head -12; echo "tg check exit=${PIPESTATUS[0]}"
echo "=== tg lint $(date -u +%H:%M:%S)"; nice npm run lint:check 2>&1 | grep -E "error|Found" | head -6; echo "tg lint exit=${PIPESTATUS[0]}"
echo "=== done $(date -u +%H:%M:%S)"
