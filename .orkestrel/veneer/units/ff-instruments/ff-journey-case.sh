#!/usr/bin/env bash
# Runs the journey at one variant, filtered to the cases whose names match a pattern, without
# capture, and writes its log under tmp/units.
# Usage: ff-journey-case.sh VARIANT LABEL PATTERN
set -u
cd /home/user/veneer-ff
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log="tmp/units/ff-case-$2-$1.log.txt"
echo "npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:$1* -t \"$3\"" > "$log"
npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1*" -t "$3" >> "$log" 2>&1
code=$?
echo "exit $code" >> "$log"
exit $code
