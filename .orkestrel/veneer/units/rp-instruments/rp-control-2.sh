#!/bin/bash
# RP control 2: successor to rp-control.sh. Asks whether the new case distinguishes the parks with no frame written:
# applies rp.diff to a fresh Veneer worktree at 1ee0faf, deletes the case's FRAMES.place line, and runs the case on
# journey:light-390 first with the registry's @orkestrel/test 0.0.23 (park at the origin), then with the round-5
# tarball (park outside the page). Log: rp-control-2.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-rpctl2; LOG=$S/rp-control-2.log.txt; : > $LOG
cd /home/user/veneer && git worktree add -q --detach $P 1ee0faf && cp -al /home/user/veneer/node_modules $P/node_modules || exit 1
cd $P && git apply /home/user/scaffold/.orkestrel/veneer/units/rp.diff && sed -i "/await FRAMES.place('primary-parked', clone, wrapper)/d" tests/app/browser/integration.test.ts
echo "place lines left: $(grep -c "FRAMES.place('primary-parked'" tests/app/browser/integration.test.ts)" >> $LOG
run() { ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t "takes no mouseover event from the parked pointer" > $S/rp-control-2-$1.log.txt 2>&1; echo "$1 exit=$?" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/rp-control-2-$1.log.txt | grep -E "Tests |AssertionError" | head -3 >> $LOG; }
echo "test $(node -p "require('./node_modules/@orkestrel/test/package.json').version") park: $(grep -o 'x: -1, y: -1\|x: 0, y: 0' node_modules/@orkestrel/test/dist/src/browser/index.js | head -1)" >> $LOG
run registry
T=$(ls $S/t5-pack-5/orkestrel-test-*.tgz | head -1)
rm -rf node_modules/@orkestrel/test && mkdir -p node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C node_modules/@orkestrel/test
echo "test round-5 tarball park: $(grep -o 'x: -1, y: -1\|x: 0, y: 0' node_modules/@orkestrel/test/dist/src/browser/index.js | head -1)" >> $LOG
run round5
echo "=== done" >> $LOG
