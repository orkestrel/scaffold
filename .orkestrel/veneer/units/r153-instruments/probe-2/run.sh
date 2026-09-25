#!/bin/bash
# Runs every readFormDifferences consumer on Chromium 141 with the identity check planted (check), then with the check
# forced to fire (plant), then restores tests/setupBrowser.ts byte-identically. Logs under this directory.
P=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/r153probe
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-r153 || exit 1
FILES="tests/src/styles/elements/button.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/navbar.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/pagination.test.ts tests/src/styles/components/accordion.test.ts"
for mode in check plant; do
  python3 $P/instrument.py $mode
  rm -rf node_modules/.vite
  npx vitest run --config configs/src/vite.styles.config.ts --no-cache $FILES > $P/probe-styles-$mode.log.txt 2>&1; echo "exit=$?" >> $P/probe-styles-$mode.log.txt
  npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts -t readFormDifferences > $P/probe-setup-$mode.log.txt 2>&1; echo "exit=$?" >> $P/probe-setup-$mode.log.txt
done
cp $P/setupBrowser.ts.orig tests/setupBrowser.ts
cmp tests/setupBrowser.ts $P/setupBrowser.ts.orig && echo "restored byte-identically" > $P/probe-restore.log.txt
git status --short >> $P/probe-restore.log.txt
