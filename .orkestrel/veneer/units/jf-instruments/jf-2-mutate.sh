#!/usr/bin/env bash
# Runs one named mutation of requireMatch through the setup:browser proof, then restores and compares bytes.
set -u
name=$1
cd /home/user/veneer-jf
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
SP=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
log=tmp/units/jf-2-mutation-$name.log.txt
cp tests/setupBrowser.ts $SP/setupBrowser.baseline.ts
sha256sum tests/setupBrowser.ts > $log
python3 $SP/jf2-mutate.py "$name" || { echo "mutation failed to apply" >> $log; exit 3; }
echo "--- mutation $name applied:" >> $log
diff $SP/setupBrowser.baseline.ts tests/setupBrowser.ts >> $log
npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts >> $log 2>&1
echo "exit=$?" >> $log
cp $SP/setupBrowser.baseline.ts tests/setupBrowser.ts
echo "--- restore:" >> $log
sha256sum tests/setupBrowser.ts >> $log
cmp $SP/setupBrowser.baseline.ts tests/setupBrowser.ts && echo "restore byte-identical: cmp exit=0" >> $log
