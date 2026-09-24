#!/bin/bash
# T5 round-2 consumer probe, second variant: journey:dark-1280 in the probe worktree t5-veneer-probe-2.sh built.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
cd $S/veneer-t5probe-2 && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280" > $S/t5-veneer-journey-2b.log.txt 2>&1
echo "journey dark-1280 exit=$?" >> $S/t5-veneer-probe-2.log.txt
sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-2b.log.txt | grep -E "Tests |FAIL|AssertionError" | head -20 >> $S/t5-veneer-probe-2.log.txt
