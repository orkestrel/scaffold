#!/bin/bash
# RP control: applies the RP unit's diff (.orkestrel/veneer/units/rp.diff) to a fresh Veneer worktree at 1ee0faf whose
# node_modules carry the registry's @orkestrel/test 0.0.23 (the release before the park moved outside the page), and runs
# the unit's new case on journey:light-390 and journey:dark-1280. A red reading here is the case distinguishing the
# 0.0.23 park from the round-5 park. Log: rp-control.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-rpctl; LOG=$S/rp-control.log.txt; : > $LOG
cd /home/user/veneer && git worktree add -q --detach $P 1ee0faf && cp -al /home/user/veneer/node_modules $P/node_modules || exit 1
cd $P && git apply /home/user/scaffold/.orkestrel/veneer/units/rp.diff; echo "apply exit=$? test=$(node -p "require('./node_modules/@orkestrel/test/package.json').version") offsetParent=$(grep -c offsetParent node_modules/@orkestrel/test/dist/src/browser/index.js)" >> $LOG
for proj in journey:light-390 journey:dark-1280; do
  CAPTURE=1 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "$proj" -t "takes no mouseover event from the parked pointer" > $S/rp-control-$proj.log.txt 2>&1
  echo "$proj exit=$?" >> $LOG
  sed 's/\x1b\[[0-9;]*m//g' $S/rp-control-$proj.log.txt | grep -E "Tests |AssertionError|Error:" | head -6 >> $LOG
done
echo "=== done" >> $LOG
