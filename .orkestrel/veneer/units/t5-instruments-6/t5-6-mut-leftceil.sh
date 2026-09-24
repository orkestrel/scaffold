#!/bin/bash
# Settles the round-6 reviewer's R3: removes Math.ceil from the left axis of computeOffset in /home/user/test-tf's
# src/browser/helpers.ts, runs the computeOffset cases of the round-6 test file, and restores the source byte for byte
# (checked with cmp), recording the test file's digest before and after. Log: t5-6-mut-leftceil.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/t5-6-mut-leftceil.log.txt; : > $LOG
cd /home/user/test-tf || exit 1
cp src/browser/helpers.ts $S/t5-6-helpers-before-leftceil.ts.txt
echo "test digest before $(sha256sum tests/src/browser/helpers.test.ts | cut -c1-16)" >> $LOG
python3 - <<'PY'
p='src/browser/helpers.ts'; t=open(p).read()
old='Math.max(width - Math.ceil(box.right), -box.left)'; assert t.count(old)==1
open(p,'w').write(t.replace(old,'Math.max(width - box.right, -box.left)'))
PY
./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "computeOffset|moves the frame up and left|fitting box|fractional" > $S/t5-6-mut-leftceil-run.log.txt 2>&1
echo "mutated run exit=$?" >> $LOG; sed 's/\x1b\[[0-9;]*m//g' $S/t5-6-mut-leftceil-run.log.txt | grep -E "Tests |AssertionError|✗|×|FAIL" | head -8 >> $LOG
cp $S/t5-6-helpers-before-leftceil.ts.txt src/browser/helpers.ts; cmp -s $S/t5-6-helpers-before-leftceil.ts.txt src/browser/helpers.ts && echo "restored ok" >> $LOG
echo "test digest after $(sha256sum tests/src/browser/helpers.test.ts | cut -c1-16)" >> $LOG
