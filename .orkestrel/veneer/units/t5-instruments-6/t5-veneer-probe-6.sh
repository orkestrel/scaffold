#!/bin/bash
# T5 round-6 consumer probe. Successor to t5-veneer-probe-5.sh: builds Test from /home/user/test-tf (round 6 over
# 80c419e) and runs its guide gate, packs, and extracts the tarball over node_modules/@orkestrel/test in a fresh Veneer
# probe worktree at 3203369 (Veneer main after the engine's showcase move; the registry copy it replaces is 0.0.23),
# then runs journey:light-390 and journey:dark-1280. Changed from round 5: the base commit, the build marker (the
# bounded window-fit move), and the probe deletes the worktree's Vite dependency cache after the swap and reads the
# active pre-bundle's park after the journeys, because a same-version tarball does not invalidate that cache.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-t5probe-6
LOG=$S/t5-veneer-probe-6.log.txt
: > $LOG
cd /home/user/test-tf && npm run build > $S/t5-6-build.log.txt 2>&1; echo "build exit=$?" >> $S/t5-6-build.log.txt; echo "build exit=$(tail -1 $S/t5-6-build.log.txt | cut -d= -f2)" >> $LOG
npm run test:guides > $S/t5-6-guides.log.txt 2>&1; code=$?; echo "exit=$code" >> $S/t5-6-guides.log.txt; echo "guides exit=$code" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/t5-6-guides.log.txt | grep "Tests " >> $LOG
rm -rf $S/t5-pack-6 && mkdir -p $S/t5-pack-6 && npm pack --ignore-scripts --pack-destination $S/t5-pack-6 > /dev/null 2>&1 || { echo "pack failed" >> $LOG; exit 1; }
T=$(ls $S/t5-pack-6/orkestrel-test-*.tgz | head -1); echo "tarball $(basename $T) $(sha256sum $T | cut -c1-16)" >> $LOG
cd /home/user/veneer && git worktree add -q --detach $P 3203369 && cp -al /home/user/veneer/node_modules $P/node_modules
echo "replaced $(node -p "require('$P/node_modules/@orkestrel/test/package.json').version") (registry)" >> $LOG
rm -rf $P/node_modules/@orkestrel/test $P/node_modules/.vite && mkdir -p $P/node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C $P/node_modules/@orkestrel/test
echo "round-6 build markers: park outside $(grep -c 'x: -1' $P/node_modules/@orkestrel/test/dist/src/browser/index.js), bounded move $(grep -c -- '-box.top' $P/node_modules/@orkestrel/test/dist/src/browser/index.js)" >> $LOG
for p in journey:light-390 journey:dark-1280; do
  cd $P && CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "$p" > $S/t5-veneer-journey-6-${p#journey:}.log.txt 2>&1
  code=$?; echo "exit=$code" >> $S/t5-veneer-journey-6-${p#journey:}.log.txt; echo "$p exit=$code" >> $LOG
  sed 's/\x1b\[[0-9;]*m//g' $S/t5-veneer-journey-6-${p#journey:}.log.txt | grep -E "Tests |FAIL|AssertionError" | head -12 >> $LOG
done
f=$(ls -t $P/node_modules/.vite/vitest/*/deps/@orkestrel_test_browser.js | head -1); echo "active pre-bundle: park outside $(grep -c 'x: -1' $f), park at origin $(grep -c 'x: 0,' $f)" >> $LOG
echo "=== done" >> $LOG
