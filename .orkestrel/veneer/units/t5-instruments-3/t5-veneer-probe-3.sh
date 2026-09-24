#!/bin/bash
# T5 round-3 consumer probe. Successor to t5-veneer-probe-2.sh: builds Test from /home/user/test-tf (round 3 over
# 80c419e) and runs its guide gate first, then packs, extracts the tarball over node_modules/@orkestrel/test in a
# fresh Veneer probe worktree at 82e1120 (the registry copy it replaces is 0.0.23), and runs journey:light-390.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-t5probe-3
LOG=$S/t5-veneer-probe-3.log.txt
: > $LOG
cd /home/user/test-tf && npm run build > $S/t5-3-build.log.txt 2>&1; echo "build exit=$?" >> $LOG
npm run test:guides > $S/t5-3-guides.log.txt 2>&1; echo "guides exit=$?" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/t5-3-guides.log.txt | grep "Tests " >> $LOG
mkdir -p $S/t5-pack-3 && npm pack --ignore-scripts --pack-destination $S/t5-pack-3 > /dev/null 2>&1 || { echo "pack failed" >> $LOG; exit 1; }
T=$(ls $S/t5-pack-3/orkestrel-test-*.tgz | head -1); echo "tarball $(basename $T) $(sha256sum $T | cut -c1-16)" >> $LOG
cd /home/user/veneer && git worktree add -q --detach $P 82e1120 && cp -al /home/user/veneer/node_modules $P/node_modules
echo "replaced $(node -p "require('$P/node_modules/@orkestrel/test/package.json').version") (registry)" >> $LOG
rm -rf $P/node_modules/@orkestrel/test && mkdir -p $P/node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C $P/node_modules/@orkestrel/test
echo "round-3 build markers: $(grep -c 'will-change' $P/node_modules/@orkestrel/test/dist/src/browser/index.js) will-change, $(grep -c 'iframe\[data-vitest\]{top' $P/node_modules/@orkestrel/test/dist/src/browser/index.js) round-1 selectors" >> $LOG
cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-390" > $S/t5-veneer-journey-3.log.txt 2>&1
echo "journey exit=$?" >> $LOG
sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-3.log.txt | grep -E "Tests |FAIL|AssertionError" | head -20 >> $LOG
echo "=== done" >> $LOG
cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280" > $S/t5-veneer-journey-3b.log.txt 2>&1
echo "journey dark-1280 exit=$?" >> $LOG
sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-3b.log.txt | grep -E "Tests |FAIL|AssertionError" | head -20 >> $LOG
