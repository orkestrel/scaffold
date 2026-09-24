#!/bin/bash
# Applies one textual mutation to src/browser/helpers.ts, runs the scoped capture suite, logs it
# under tmp/units/t5-2-mut-<name>.log.txt, and restores the final source from its saved copy.
cd /home/user/test-tf
export PATH=/opt/node22/bin:$PATH PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
name=$1; from=$2; to=$3
python3 - "$from" "$to" <<'PY'
import sys
p='/home/user/test-tf/src/browser/helpers.ts'
s=open(p).read()
assert s.count(sys.argv[1])==1, 'mutation site not unique'
open(p,'w').write(s.replace(sys.argv[1], sys.argv[2]))
PY
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame" > tmp/units/t5-2-mut-$name.log.txt 2>&1
echo "$name exit $?"
grep -E "^ FAIL|Tests  " tmp/units/t5-2-mut-$name.log.txt | sed 's/.*helpers.test.ts:[0-9:]* > //'
cp tmp/units/t5-2-helpers-final.ts.txt src/browser/helpers.ts
cmp -s tmp/units/t5-2-helpers-final.ts.txt src/browser/helpers.ts && echo restored
