#!/bin/bash
# FRAME-HELPERS landing verification on Veneer a947bc8 (the session branch merged with main e42b5fa): the suites the
# landing touches, the capture journey at dark-1280, and src:browser for the engine's Placement reading.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$S/fh-land-verify.log.txt; : > $LOG
cd /home/user/veneer || exit 1
echo "=== head $(git rev-parse --short HEAD)" >> $LOG
step() { name=$1; shift; "$@" > $S/fh-land-$name.log.txt 2>&1; e=$?; echo "=== $name exit=$e $(sed 's/\x1b\[[0-9;]*m//g' $S/fh-land-$name.log.txt | grep -E '^ +Tests ' | tail -1)" >> $LOG; }
step build npm run build
step setup npm run test:setup
step setup-browser npm run test:setup:browser
step guides npm run test:guides
step journey env CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:dark-1280
step src-browser npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
echo "=== done" >> $LOG
