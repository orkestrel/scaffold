#!/bin/bash
# RP control 3: successor to rp-control-2.sh. Asks whether the new case distinguishes the parks when it shoots through
# the installed captureFrame function directly, with no portfolio frame and no CAPTURE variable (the gate chain's
# condition): applies rp.diff to a fresh Veneer worktree at 1ee0faf, replaces the case's FRAMES.place line with a
# captureFrame call writing under tmp/, and runs the case on journey:light-390 first with the registry's
# @orkestrel/test 0.0.23, then with the round-5 tarball. Log: rp-control-3.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
unset CAPTURE
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/veneer-rpctl3; LOG=$S/rp-control-3.log.txt; : > $LOG
cd /home/user/veneer && git worktree add -q --detach $P 1ee0faf && cp -al /home/user/veneer/node_modules $P/node_modules || exit 1
cd $P && git apply /home/user/scaffold/.orkestrel/veneer/units/rp.diff || exit 1
python3 - <<'PY'
p='tests/app/browser/integration.test.ts'
t=open(p).read()
old="await FRAMES.place('primary-parked', clone, wrapper)"
new="await captureFrame({ path: '../../../tmp/park/primary.png', width: window.innerWidth, height: window.innerHeight, element: clone })"
assert t.count(old)==1
t=t.replace(old,new)
t=t.replace("} from '@orkestrel/test/browser'", "\tcaptureFrame,\n} from '@orkestrel/test/browser'",1)
open(p,'w').write(t)
PY
echo "captureFrame calls: $(grep -c 'captureFrame({' tests/app/browser/integration.test.ts)" >> $LOG
run() { ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t "takes no mouseover event from the parked pointer" > $S/rp-control-3-$1.log.txt 2>&1; echo "$1 exit=$?" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/rp-control-3-$1.log.txt | grep -E "Tests |AssertionError|Error:" | head -4 >> $LOG; }
echo "build: $(node -p "require('./node_modules/@orkestrel/test/package.json').version") registry; park move $(grep -c 'x: -1' node_modules/@orkestrel/test/dist/src/browser/index.js) outside" >> $LOG
run registry
T=$(ls $S/t5-pack-5/orkestrel-test-*.tgz | head -1)
rm -rf node_modules/@orkestrel/test && mkdir -p node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C node_modules/@orkestrel/test
echo "build: round-5 tarball; park move $(grep -c 'x: -1' node_modules/@orkestrel/test/dist/src/browser/index.js) outside" >> $LOG
run round5
ls tmp/park >> $LOG 2>&1
echo "=== done" >> $LOG
