#!/bin/bash
# T5 round-5 consumer probe. Successor to t5-veneer-probe-3.sh: builds Test from /home/user/test-tf (round 5, the park
# ruling, over 80c419e) and runs its guide gate first, then packs, extracts the tarball over node_modules/@orkestrel/test
# in a fresh Veneer probe worktree at 1ee0faf (Veneer main after J-SLIDE; the registry copy it replaces is 0.0.23), and
# runs journey:light-390 and journey:dark-1280. Changed from round 3: the build marker reads the removed ancestor walk.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-t5probe-5
LOG=$S/t5-veneer-probe-5.log.txt
: > $LOG
cd /home/user/test-tf && npm run build > $S/t5-5-build.log.txt 2>&1; echo "build exit=$?" >> $LOG
npm run test:guides > $S/t5-5-guides.log.txt 2>&1; echo "guides exit=$?" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/t5-5-guides.log.txt | grep "Tests " >> $LOG
rm -rf $S/t5-pack-5 && mkdir -p $S/t5-pack-5 && npm pack --ignore-scripts --pack-destination $S/t5-pack-5 > /dev/null 2>&1 || { echo "pack failed" >> $LOG; exit 1; }
T=$(ls $S/t5-pack-5/orkestrel-test-*.tgz | head -1); echo "tarball $(basename $T) $(sha256sum $T | cut -c1-16)" >> $LOG
cd /home/user/veneer && git worktree add -q --detach $P 1ee0faf && cp -al /home/user/veneer/node_modules $P/node_modules
echo "replaced $(node -p "require('$P/node_modules/@orkestrel/test/package.json').version") (registry)" >> $LOG
rm -rf $P/node_modules/@orkestrel/test && mkdir -p $P/node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C $P/node_modules/@orkestrel/test
echo "round-5 build markers: $(grep -c 'will-change' $P/node_modules/@orkestrel/test/dist/src/browser/index.js) will-change, $(grep -c 'offsetParent' $P/node_modules/@orkestrel/test/dist/src/browser/index.js) offsetParent" >> $LOG
cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-390" > $S/t5-veneer-journey-5.log.txt 2>&1
echo "journey light-390 exit=$?" >> $LOG
sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-5.log.txt | grep -E "Tests |FAIL|AssertionError" | head -20 >> $LOG
cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-1280" > $S/t5-veneer-journey-5b.log.txt 2>&1
echo "journey dark-1280 exit=$?" >> $LOG
sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-5b.log.txt | grep -E "Tests |FAIL|AssertionError" | head -20 >> $LOG
echo "=== done" >> $LOG
