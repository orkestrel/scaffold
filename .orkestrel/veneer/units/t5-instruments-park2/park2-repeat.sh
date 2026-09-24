#!/bin/bash
# Park-2 repeat: runs probe D (park, then stagePane at the tester's size, copy at the tester origin, journey:light-390)
# three times in each of the scratch worktree veneer-rpctl3 and the short-path worktree /home/user/vp3, alternating, on
# the same round-5 build and the same test file, and records each run's result. Log: park2-repeat.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/park2-repeat.log.txt; : > $LOG
for W in $S/veneer-rpctl3 /home/user/vp3; do cp $S/rpctl3-probe-d.ts.txt $W/tests/app/browser/integration.test.ts; echo "$W build $(sha256sum $W/node_modules/@orkestrel/test/dist/src/browser/index.js | cut -c1-16)" >> $LOG; done
for n in 1 2 3; do for W in $S/veneer-rpctl3 /home/user/vp3; do
  cd $W && ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t "takes no mouseover event from the parked pointer" > $S/park2-repeat-$n-$(basename $W).log.txt 2>&1
  echo "run $n $(basename $W) exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $S/park2-repeat-$n-$(basename $W).log.txt | grep -oE 'primary-parked [a-z-]+ [0-9-]+,[0-9-]+' | head -1)" >> $LOG
done; done
echo "=== done" >> $LOG
