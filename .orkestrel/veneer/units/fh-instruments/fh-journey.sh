#!/usr/bin/env bash
# FRAME-HELPERS journey run: one capture variant, optionally filtered, logged under tmp/units.
# Usage: fh-journey.sh VARIANT LABEL [FILTER]
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-fh
variant=$1; label=$2; filter=$3
log=tmp/units/fh-journey-$label.log.txt
if [ -n "$filter" ]; then
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$variant" -t "$filter" > $log 2>&1
else
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$variant" > $log 2>&1
fi
echo "exit $?" >> $log
