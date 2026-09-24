#!/bin/bash
# RP control 4: applies the RP round-2 diff (rp-2.diff) to a fresh Veneer worktree at 1ee0faf whose node_modules carry
# the registry's @orkestrel/test 0.0.23 and whose Vite dependency cache is built on this worktree's first run, from that
# build. Runs the round-2 case scoped on both journeys with CAPTURE unset (the gate's condition). A red reading is the
# case distinguishing the 0.0.23 park from the round-5 park. Log: rp-control-4.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; unset CAPTURE
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
W=/home/user/vrpc4; LOG=$S/rp-control-4.log.txt; : > $LOG
cd /home/user/veneer && git worktree add -q --detach $W 1ee0faf && cp -al /home/user/veneer/node_modules $W/node_modules || exit 1
rm -rf $W/node_modules/.vite
cd $W && git apply /home/user/scaffold/.orkestrel/veneer/units/rp-2.diff; echo "apply exit=$? test=$(node -p "require('./node_modules/@orkestrel/test/package.json').version") dist park-outside=$(grep -c 'x: -1' node_modules/@orkestrel/test/dist/src/browser/index.js)" >> $LOG
for p in journey:light-390 journey:dark-1280; do
  ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "$p" -t "takes no mouseover event from the parked pointer" > $S/rp-control-4-${p#journey:}.log.txt 2>&1
  code=$?; echo "$p exit=$code $(sed 's/\x1b\[[0-9;]*m//g' $S/rp-control-4-${p#journey:}.log.txt | grep -E 'Tests |AssertionError' | head -2 | tr '\n' ' ')" >> $LOG
done
f=$(ls -t node_modules/.vite/vitest/*/deps/@orkestrel_test_browser.js | head -1); echo "active pre-bundle park-at-origin=$(grep -c 'x: 0,' $f) park-outside=$(grep -c 'x: -1' $f)" >> $LOG
echo "=== done" >> $LOG
