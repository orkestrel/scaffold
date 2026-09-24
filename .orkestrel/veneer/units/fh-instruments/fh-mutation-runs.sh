#!/usr/bin/env bash
# FRAME-HELPERS mutation runs: applies each named mutation, runs the command that must redden,
# records the result lines in fh-mutations.log.txt, and reverts the mutation.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
log=tmp/units/fh-mutations.log.txt
FOCUS='reveals the skip link|drives one list-group action|drives one menu item|reaches a collapsed accordion|reveals the focusable container|rings the Primary host'
count=0
run() {
  name=$1; shift
  count=$((count + 1))
  python3 tmp/units/fh-mutate.py "$name" apply >> $log || return
  echo "" >> $log
  echo "## mutation $name" >> $log
  echo "command: $*" >> $log
  out=tmp/units/fh-mutation-$count-$name.log.txt
  "$@" > $out 2>&1
  echo "exit $?" >> $log
  grep -E "Tests  |FAIL |AssertionError|^\+ +\"|^\[31m\+" $out | sed 's/\x1b\[[0-9;]*m//g' | head -40 >> $log
  python3 tmp/units/fh-mutate.py "$name" revert >> $log
}
run crop npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "frame lifts and focus frames"
run guard npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t "frame lifts and focus frames"
run guard npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "$FOCUS"
run drive npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "$FOCUS"
run park npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280 -t "$FOCUS"
echo "mutations done" >> $log
