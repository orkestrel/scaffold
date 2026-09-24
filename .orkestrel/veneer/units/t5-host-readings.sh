#!/bin/bash
# Orchestrator host readings for T5 TEST-FRAME: red on the base helpers.ts, green on the unit's, and three mutations.
# Runs in a probe worktree of Test at 80c419e with t5.diff applied; never touches /home/user/test-tf.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
P=$S/t5probe
LOG=$S/t5-host-readings.log.txt
: > $LOG
cd /home/user/test && git worktree add -q --detach $P 80c419e && cp -al /home/user/test/node_modules $P/node_modules
cd $P && git apply /home/user/scaffold/.orkestrel/veneer/units/t5.diff || { echo "apply failed" >> $LOG; exit 1; }
cp src/browser/helpers.ts $S/t5-helpers-unit.ts
run() { echo "=== $1" >> $LOG; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame" > $S/t5-run.txt 2>&1; echo "exit=$?" >> $LOG; grep -E "Tests |AssertionError|expected|FAIL" $S/t5-run.txt | head -8 >> $LOG; }
run green
git show 80c419e:src/browser/helpers.ts > src/browser/helpers.ts; run red-base
cp $S/t5-helpers-unit.ts src/browser/helpers.ts
python3 - <<'PY'
s=open('src/browser/helpers.ts').read(); open('src/browser/helpers.ts','w').write(s.replace(';will-change:transform}',';}'))
PY
run mutation-no-compositing; cp $S/t5-helpers-unit.ts src/browser/helpers.ts
python3 - <<'PY'
s=open('src/browser/helpers.ts').read(); old=": Math.ceil(element.getBoundingClientRect().bottom + window.scrollY),"; assert old in s
open('src/browser/helpers.ts','w').write(s.replace(old,": measureContent(),"))
PY
run mutation-content-edge; cp $S/t5-helpers-unit.ts src/browser/helpers.ts
python3 - <<'PY'
s=open('src/browser/helpers.ts').read(); old="if (element !== undefined && owner !== undefined) {"; assert old in s
open('src/browser/helpers.ts','w').write(s.replace(old,"if (false && element !== undefined && owner !== undefined) {"))
PY
run mutation-no-lift; cp $S/t5-helpers-unit.ts src/browser/helpers.ts
cmp src/browser/helpers.ts $S/t5-helpers-unit.ts && echo "=== restored" >> $LOG
echo "=== done" >> $LOG
