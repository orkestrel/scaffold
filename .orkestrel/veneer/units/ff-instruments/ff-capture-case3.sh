#!/usr/bin/env bash
# Runs one journey capture variant filtered to a case pattern, logging under tmp/units.
# Usage: ff-capture-case3.sh VARIANT LABEL PATTERN
set -u
cd /home/user/veneer-ff
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
log="tmp/units/ff-case3-$2-$1.log.txt"
echo "CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:$1* -t \"$3\"" > "$log"
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$1*" -t "$3" >> "$log" 2>&1
code=$?
echo "exit $code" >> "$log"
exit $code
